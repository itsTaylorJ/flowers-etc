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
  const specialtySelect = page.locator('[data-addon-option="1"]');
  assert.deepEqual(await specialtySelect.locator("option").allTextContents(), ["Birthday", "Sympathy", "Other"]);
  await specialtySelect.selectOption("Birthday");
  await page.locator('[data-addon-add="1"]').click();
  await specialtySelect.selectOption("Sympathy");
  await page.locator('[data-addon-add="1"]').click();

  await page.goto(`${base}/cart.html`, { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator(".cart-line-name").count(), 2, "different specialty occasions should remain distinct lines");
  assert.deepEqual(await page.locator(".cart-line-instructions").allTextContents(), ["Occasion: Birthday", "Occasion: Sympathy"]);
  assert.match(await page.locator(".cart-totals").innerText(), /Items subtotal\s*\$6/);
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
