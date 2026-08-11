const assert = require("node:assert/strict");
const { chromium } = require("playwright");

const base = "http://127.0.0.1:8765";

(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.BROWSER_EXECUTABLE_PATH ? { executablePath: process.env.BROWSER_EXECUTABLE_PATH } : {}),
  });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  page.on("console", message => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", error => errors.push(error.message));

  await page.goto(`${base}/contact.html`, { waitUntil: "domcontentloaded" });
  assert.ok((await page.locator("body").innerText()).length > 500, "contact page should render meaningful content");
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);
  let cards = await page.locator(".info-card").evaluateAll(nodes => nodes.map(node => {
    const r = node.getBoundingClientRect();
    const icon = node.querySelector(".i-icon").getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, iconCenter: icon.x + icon.width / 2, cardCenter: r.x + r.width / 2 };
  }));
  assert.equal(cards.length, 5);
  assert.equal(new Set(cards.slice(0, 3).map(card => Math.round(card.y))).size, 1, "desktop first row should contain three cards");
  assert.equal(new Set(cards.slice(3).map(card => Math.round(card.y))).size, 1, "desktop second row should contain two cards");
  cards.forEach(card => assert.ok(Math.abs(card.iconCenter - card.cardCenter) < 2, "contact icon should be centered"));

  await page.setViewportSize({ width: 820, height: 1000 });
  await page.reload({ waitUntil: "domcontentloaded" });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: "domcontentloaded" });
  const mobileOverflow = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    media620: matchMedia("(max-width: 620px)").matches,
    grid: (() => { const node = document.querySelector(".info-grid"); const rect = node.getBoundingClientRect(); return { x: rect.x, width: rect.width, columns: getComputedStyle(node).gridTemplateColumns }; })(),
    offenders: [...document.querySelectorAll("body *")]
      .map(node => ({ node: `${node.tagName.toLowerCase()}${node.id ? `#${node.id}` : ""}${node.className && typeof node.className === "string" ? `.${node.className.trim().replace(/\s+/g, ".")}` : ""}`, ...node.getBoundingClientRect().toJSON() }))
      .filter(rect => rect.right > document.documentElement.clientWidth + 1 || rect.left < -1)
      .slice(0, 12),
  }));
  if (mobileOverflow.scrollWidth > mobileOverflow.viewport) console.error("mobile overflow diagnostics", mobileOverflow);
  assert.equal(mobileOverflow.scrollWidth <= mobileOverflow.viewport, true);
  cards = await page.locator(".info-card").evaluateAll(nodes => nodes.map(node => Math.round(node.getBoundingClientRect().x)));
  assert.equal(new Set(cards).size, 1, "mobile contact cards should use one aligned column");
  assert.equal(await page.locator(".info-card:last-child").evaluate(node => getComputedStyle(node).justifySelf), "stretch", "mobile final contact card should stretch normally");

  await page.setViewportSize({ width: 1280, height: 900 });
  const aliases = {
    "meadow-gold-easel": "Meadow Gold Sympathy Arrangement",
    "soft-garden-vase": "Soft Garden Basket",
    "blush-garden-vase": "Blush Garden Bouquet",
    "greenery-planter": "Greenery Casket Spray",
    "blue-iris-remembrance": "Custom Cemetery Flowers",
    "sunflower-blue-cemetery-flowers": "Custom Cemetery Flowers",
    "bright-garden-cemetery-flowers": "Custom Cemetery Flowers",
    "golden-blue-cemetery-flowers": "Custom Cemetery Flowers",
    "cemetery-flower-replacement": "Custom Cemetery Flowers",
    "classic-red-rose-arrangement": "Classic Rose Bouquet",
    "casket-spray": "Gentle Pink Garden",
  };
  for (const [slug, expected] of Object.entries(aliases)) {
    console.log(`checking alias ${slug}`);
    await page.goto(`${base}/product.html?p=${slug}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(250);
    if (!await page.locator("h1").count()) {
      throw new Error(`${slug} did not render an h1; browser errors: ${errors.join(" | ")}; body: ${(await page.locator("body").innerText()).slice(0, 500)}`);
    }
    assert.equal((await page.locator("h1").innerText()).trim(), expected, `${slug} should resolve safely`);
  }

  await page.goto(`${base}/product.html?p=custom-cemetery-flowers`, { waitUntil: "domcontentloaded" });
  assert.match(await page.locator("body").innerText(), /flower types, colors, and style you request/i);
  assert.equal(await page.locator(".pd-thumb").count(), 8, "cemetery listing should show all available example images");
  assert.ok(await page.locator('.pd-thumb img[src$="cemetery-headstone-saddle.webp"]').count(), "cemetery gallery should include the headstone saddle example");
  await page.locator('.pd-thumb:has(img[src$="cemetery-headstone-saddle.webp"])').click();
  assert.deepEqual(
    await page.locator("#pd-main").evaluate(img => [img.naturalWidth, img.naturalHeight]),
    [2027, 776],
    "cemetery saddle should use the approved replacement image"
  );
  assert.ok(await page.locator('[data-cart-add="Custom Cemetery Flowers"]').count(), "cemetery listing should be directly purchasable");

  await page.goto(`${base}/product.html?p=classic-rose-bouquet`, { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator(".pd-thumb").count(), 3, "rose listing should show its primary image and two examples");
  assert.ok(await page.locator('.pd-thumb img[src$="rose-bouquet-example-2.webp"]').count());
  assert.ok(await page.locator('.pd-thumb img[src$="rose-bouquet-example-1.webp"]').count());
  assert.match(await page.locator(".pd-thumb").nth(1).locator("img").getAttribute("src"), /rose-bouquet-example-2\.webp$/);
  assert.equal(await page.getByRole("heading", { name: "Color options" }).count(), 0, "rose choices should not be duplicated as a separate color list");
  assert.deepEqual(await page.locator("#pd-order-option option").allTextContents(), ["Red", "Pink", "Yellow", "White", "Special Request — 24 hours notice required"]);
  await page.locator("#pd-order-option").selectOption("Pink");
  await page.locator('[data-cart-add="Classic Rose Bouquet"]').click();
  await page.goto(`${base}/cart.html`, { waitUntil: "domcontentloaded" });
  assert.match(await page.locator(".cart-line-instructions").innerText(), /Rose color: Pink/);

  await page.goto(`${base}/product.html?p=serene-white-urn-tribute`, { waitUntil: "domcontentloaded" });
  assert.equal((await page.locator("h1").innerText()).trim(), "Serene White Urn Tribute");
  assert.match(await page.locator("body").innerText(), /From \$400/);

  await page.evaluate(() => localStorage.removeItem("flowersetc_cart"));
  await page.goto(`${base}/product.html?p=balloon-bouquet`, { waitUntil: "domcontentloaded" });
  assert.equal((await page.locator("h1").innerText()).trim(), "Balloon Bouquet");
  assert.match(await page.locator("#pd-main").getAttribute("src"), /balloon-bouquet\.png$/);
  assert.equal(await page.locator('[data-balloon-qty="latex"]').inputValue(), "0");
  assert.equal(await page.locator('[data-balloon-qty="mylar"]').inputValue(), "0");
  assert.match(await page.locator("[data-balloon-total]").innerText(), /\$0/);
  assert.equal(await page.locator('[data-cart-add="Balloon Bouquet"]').isDisabled(), true);
  await page.locator('[data-balloon-step="latex:1"]').click();
  assert.match(await page.locator("[data-balloon-total]").innerText(), /\$2/);
  assert.equal(await page.locator('[data-cart-add="Balloon Bouquet"]').isDisabled(), false);
  await page.locator('[data-cart-add="Balloon Bouquet"]').click();
  await page.goto(`${base}/cart.html`, { waitUntil: "domcontentloaded" });
  assert.match(await page.locator(".cart-line-instructions").innerText(), /Latex balloons: 1/);
  assert.match(await page.locator(".cart-line-instructions").innerText(), /Mylar balloons: 0/);
  assert.match(await page.locator(".cart-line-price").innerText(), /\$2/);

  await page.goto(`${base}/product.html?p=blush-garden-bouquet`, { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator(".pd-thumb").count(), 2, "blush wedding bouquet should show its primary image and bridal example");
  assert.ok(await page.locator('.pd-thumb img[src$="blush-garden-bouquet-example.webp"]').count());
  assert.equal(await page.locator('[data-cart-add="Blush Garden Bouquet"]').count(), 0, "consultation-only product page should not offer direct add to cart");

  await page.route("https://formspree.io/**", route => route.fulfill({ status: 500, body: "test interception" }));
  const future = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
  await page.evaluate(() => localStorage.setItem("flowersetc_cart", JSON.stringify([{ name: "Blush Garden Vase", qty: 1 }])));
  await page.goto(`${base}/cart.html`, { waitUntil: "domcontentloaded" });
  assert.equal((await page.locator(".cart-line-name").innerText()).trim(), "Blush Garden Bouquet");
  assert.match(await page.locator(".cart-line-kind").innerText(), /Consultation only · we'll call to design this with you/i);
  assert.match(await page.locator(".cart-totals").innerText(), /Items subtotal\s*\$0/);
  assert.doesNotMatch(await page.locator(".cart-line-price").innerText(), /\$\d/);
  await page.locator("#co-name").fill("Verification Test");
  await page.locator("#co-phone").fill("9035550100");
  await page.locator("#co-date").fill(future);
  await page.locator('#checkout-form button[type="submit"]').click();
  await page.locator("#unsent-order-summary").waitFor();
  const consultationSummary = await page.locator("#unsent-order-summary").inputValue();
  assert.match(consultationSummary, /1 × Blush Garden Bouquet — CONSULTATION ONLY · we'll call to design this with you/i);

  await page.evaluate(() => localStorage.removeItem("flowersetc_cart"));
  await page.goto(`${base}/product.html?p=coral-rose-cube`, { waitUntil: "domcontentloaded" });
  assert.ok(await page.getByText("Hand-written card message", { exact: false }).count(), "free handwritten card add-on should remain");
  assert.equal(await page.locator("[data-addon-qty]").count(), 10, "every product-page add-on should have a quantity selector");
  assert.deepEqual(await page.locator("[data-addon-qty]").evaluateAll(inputs => inputs.map(input => input.value)), Array(10).fill("0"));
  assert.equal(await page.locator("[data-addon-add]").evaluateAll(buttons => buttons.every(button => button.disabled)), true, "add-ons should start unselected");
  const latexAddon = page.locator('[data-addon-qty="5"]');
  await page.locator('[data-addon-step="5:1"]').click();
  await page.locator('[data-addon-step="5:1"]').click();
  assert.equal(await latexAddon.inputValue(), "2");
  assert.equal(await page.locator('[data-addon-add="5"]').isDisabled(), false);
  await page.locator('[data-addon-add="5"]').click();
  assert.match(await page.locator(".cart-toast").innerText(), /2 × Latex balloon — shop supplied, helium included/i);
  const specialtySelect = page.locator('[data-addon-option="1"]');
  assert.deepEqual(await specialtySelect.locator("option").allTextContents(), ["Birthday", "Sympathy", "Other"]);
  await specialtySelect.selectOption("Birthday");
  await page.locator('[data-addon-step="1:1"]').click();
  await page.locator('[data-addon-add="1"]').click();
  await specialtySelect.selectOption("Sympathy");
  await page.locator('[data-addon-add="1"]').click();

  await page.goto(`${base}/cart.html`, { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator(".cart-line-name").count(), 3, "different specialty occasions and the balloon add-on should remain distinct lines");
  assert.deepEqual(await page.locator(".cart-line-instructions").allTextContents(), ["Occasion: Birthday", "Occasion: Sympathy"]);
  assert.equal(await page.locator(".cart-line-name", { hasText: "Latex balloon — shop supplied, helium included" }).count(), 1);
  // 2 specialty cards at $3 + 2 latex balloons at $2. This expectation was left at
  // $12 when add-on selections began starting at zero; $10 is the verified total.
  assert.match(await page.locator(".cart-totals").innerText(), /Items subtotal\s*\$10/);
  assert.ok(await page.locator("#co-card").count(), "free checkout card-message textarea should remain");
  await page.locator("#co-name").fill("Verification Test");
  await page.locator("#co-phone").fill("9035550100");
  await page.locator("#co-date").fill(future);
  await page.locator('#checkout-form button[type="submit"]').click();
  await page.locator("#unsent-order-summary").waitFor();
  const summary = await page.locator("#unsent-order-summary").inputValue();
  assert.match(summary, /Card occasion: Birthday/);
  assert.match(summary, /Card occasion: Sympathy/);

  for (const [slug, expectedWidth, expectedHeight] of [
    ["golden-rose-farewell", 1350, 1800],
    ["peaceful-white-service-tribute", 1350, 1800],
    ["peace-lily-plant", 1350, 1800],
    ["red-and-white-photo-wreath", 1332, 1800],
    ["orchid-urn-tribute", 1448, 1086],
    ["serene-white-urn-tribute", 1081, 1455],
  ]) {
    await page.goto(`${base}/product.html?p=${slug}`, { waitUntil: "domcontentloaded" });
    const dimensions = await page.locator("#pd-main").evaluate(img => ({ width: img.naturalWidth, height: img.naturalHeight }));
    assert.deepEqual(dimensions, { width: expectedWidth, height: expectedHeight }, `${slug} should retain full-resolution dimensions`);
  }

  /* ---------- sitewide product search ---------- */
  // The header search must work from a non-Shop page.
  await page.goto(`${base}/contact.html`, { waitUntil: "domcontentloaded" });
  await page.locator("#site-search-input").fill("balloons");
  await page.locator("#site-search-results").waitFor();
  const suggestions = await page.locator("#site-search-results").innerText();
  assert.match(suggestions, /Balloon Bouquet/);
  assert.match(suggestions, /View all results/);

  // One character stays quiet; two characters open the list.
  await page.locator("#site-search-input").fill("b");
  assert.equal(await page.locator("#site-search-results").isHidden(), true);
  await page.locator("#site-search-input").fill("balloons");
  assert.equal(await page.locator("#site-search-results").isHidden(), false);

  // A matching category is offered as a shortcut.
  await page.locator("#site-search-input").fill("sympathy");
  await page.locator("#site-search-results").waitFor();
  assert.match(await page.locator("#site-search-results").innerText(), /Browse Sympathy/i);

  // Escape closes the dropdown.
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("#site-search-results").isHidden(), true);

  // Keyboard: ArrowDown moves into the results and Enter follows the option.
  await page.locator("#site-search-input").fill("mylar");
  await page.locator("#site-search-results").waitFor();
  await page.keyboard.press("ArrowDown");
  await Promise.all([page.waitForURL(/product\.html\?p=balloon-bouquet/), page.keyboard.press("Enter")]);

  // An unmatched query explains itself and still offers a way to browse.
  await page.goto(`${base}/contact.html`, { waitUntil: "domcontentloaded" });
  await page.locator("#site-search-input").fill("zzzznotathing");
  await page.locator("#site-search-results").waitFor();
  assert.match(await page.locator("#site-search-results").innerText(), /No products match/i);

  // Enter with no highlighted option submits to the Shop results.
  await page.locator("#site-search-input").fill("balloons");
  await Promise.all([page.waitForURL(/shop\.html\?q=balloons/), page.keyboard.press("Enter")]);
  assert.match(await page.locator("#shop-search-summary").innerText(), /balloons/i);
  assert.equal(await page.locator(".product-card").count(), 2);

  // Shop results combine the query with the existing category filters.
  await page.goto(`${base}/shop.html?q=mylar`, { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator(".product-card").count(), 1);
  assert.match(await page.locator(".product-card").innerText(), /Balloon Bouquet/);
  await page.goto(`${base}/shop.html?cat=sympathy&q=mylar`, { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator(".product-card").count(), 0);
  assert.match(await page.locator("#shop-search-summary").innerText(), /No products match/i);
  // Clearing the search keeps the shopper in the same category.
  assert.match(await page.locator(".shop-search-clear").getAttribute("href"), /shop\.html\?cat=sympathy/);
  // Category buttons keep the active query.
  await page.goto(`${base}/shop.html?q=balloons`, { waitUntil: "domcontentloaded" });
  await page.locator('#filter-bar .filter-btn:has-text("Plants & gifts")').click();
  assert.match(page.url(), /q=balloons/);
  // Pages without a query show no summary at all.
  await page.goto(`${base}/shop.html`, { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator("#shop-search-summary").isHidden(), true);

  // Mobile: the search occupies its own full-width row inside the header.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/index.html`, { waitUntil: "domcontentloaded" });
  const searchBox = await page.locator("#site-search-form").boundingBox();
  assert.ok(searchBox.width > 260, `mobile search should span the header row, got ${searchBox.width}`);
  assert.equal(
    await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1),
    true,
    "mobile header search must not cause horizontal overflow"
  );
  await page.setViewportSize({ width: 1280, height: 900 });

  const sitemap = await (await page.request.get(`${base}/sitemap.xml`)).text();
  assert.match(sitemap, /custom-cemetery-flowers/);
  assert.match(sitemap, /classic-rose-bouquet/);
  assert.match(sitemap, /serene-white-urn-tribute/);
  assert.doesNotMatch(sitemap, /product\.html\?p=classic-red-rose-arrangement/);
  for (const slug of ["blue-iris-remembrance", "sunflower-blue-cemetery-flowers", "bright-garden-cemetery-flowers", "golden-blue-cemetery-flowers", "cemetery-flower-replacement"])
    assert.doesNotMatch(sitemap, new RegExp(`product\\.html\\?p=${slug}`));

  const unexpectedErrors = errors.filter(message => !/Failed to load resource: the server responded with a status of 500/.test(message));
  assert.deepEqual(unexpectedErrors, [], `browser errors: ${unexpectedErrors.join(" | ")}`);
  await browser.close();
  console.log("browser verification passed");
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
