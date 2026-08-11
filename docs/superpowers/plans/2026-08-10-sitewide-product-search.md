# Sitewide Product Search Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an accessible, product-only search to every FlowersEtc page, with instant header suggestions and complete filtered results on the Shop page.

**Architecture:** `js/main.js` gains a small pure search index/matcher shared by the header and `renderShop`. The shared header renders the search form and result dropdown on every page; `shop.html?q=` supplies the full results view while preserving category/subcategory filters.

**Tech Stack:** Static HTML, vanilla JavaScript, CSS, Node assertions, and the existing Playwright browser verifier.

## Global Constraints

- Search products only; do not search informational pages or gallery entries.
- Match name, description, categories, subcategories, flowers, and customer-facing product options.
- Do not add dependencies or change catalog prices, cart behavior, checkout, product URLs, or existing filters.
- Search matching is case- and punctuation-insensitive and compares simple singular/plural query forms.
- Suggestions begin at two characters, show at most five products, and never inject query text as HTML.
- All controls must support keyboard use, Escape dismissal, visible focus, and mobile layout.

---

### Task 1: Shared product-search helpers

**Files:**
- Modify: `js/main.js` near the shared header helpers
- Test: `tests/catalog-cart.test.js`

**Interfaces:**
- Produces: `window.searchProducts(query)` returning matching `PRODUCTS` entries in catalog order.
- Produces: `window.searchCategories(query)` returning matching `CATEGORIES` entries.
- Consumes: global `PRODUCTS`, `CATEGORIES`, and product fields already defined in `js/data.js`.

- [ ] **Step 1: Write failing catalog assertions**

```js
assert.deepEqual(
  JSON.parse(JSON.stringify(context.searchProducts("roses").map(product => product.name))),
  ["Classic Rose Bouquet", "Coral Rose Cube", "White Rose Cloud", "Pink Rose Vase"]
);
assert.deepEqual(
  JSON.parse(JSON.stringify(context.searchCategories("sympathy").map(category => category.id))),
  ["sympathy"]
);
assert.deepEqual(JSON.parse(JSON.stringify(context.searchProducts("!@#"))), []);
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node tests/catalog-cart.test.js`

Expected: failure because `searchProducts` and `searchCategories` do not exist.

- [ ] **Step 3: Add pure normalization and matching helpers**

```js
function searchTerms(value) {
  const normalized = String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  if (!normalized) return [];
  return [...new Set(normalized.split(/\s+/).flatMap(term =>
    term.length > 3 && term.endsWith("s") ? [term, term.slice(0, -1)] : [term]
  ))];
}

function productSearchText(product) {
  return [product.name, product.desc, product.category, product.subcat, ...(product.collections || []), ...(product.flowers || []), ...(product.colors || []), ...(product.orderOptions?.options || [])].join(" ").toLowerCase();
}

window.searchProducts = query => {
  const terms = searchTerms(query);
  return terms.length ? PRODUCTS.filter(product => terms.every(term => productSearchText(product).includes(term))) : [];
};
window.searchCategories = query => {
  const terms = searchTerms(query);
  return terms.length ? CATEGORIES.filter(category => terms.every(term => category.name.toLowerCase().includes(term))) : [];
};
```

- [ ] **Step 4: Run the catalog test and verify it passes**

Run: `node tests/catalog-cart.test.js`

Expected: `catalog/cart regression checks passed`.

- [ ] **Step 5: Commit this isolated change**

```bash
git add js/main.js tests/catalog-cart.test.js
git commit -m "feat: add product search helpers"
```

### Task 2: Header search and accessible suggestions

**Files:**
- Modify: `js/main.js` in `headerHTML` and directly after the current header event wiring
- Modify: `css/style.css` near header/nav styles and responsive media rules
- Test: `tests/browser-verify.js`

**Interfaces:**
- Consumes: `searchProducts(query)`, `searchCategories(query)`, `productUrl(product)`, `productMedia(product)`, and `priceHTML(product)`.
- Produces: header form `#site-search-form`, field `#site-search-input`, results list `#site-search-results` on every page.

- [ ] **Step 1: Write failing browser checks**

```js
await page.goto(`${base}/contact.html`, { waitUntil: "domcontentloaded" });
await page.locator("#site-search-input").fill("roses");
await page.locator("#site-search-results").waitFor();
assert.match(await page.locator("#site-search-results").innerText(), /Classic Rose Bouquet/);
assert.match(await page.locator("#site-search-results").innerText(), /View all results/);
await page.keyboard.press("Escape");
assert.equal(await page.locator("#site-search-results").isHidden(), true);
```

- [ ] **Step 2: Run browser verification and verify it fails**

Run the existing temporary local server, then:

```powershell
$env:NODE_PATH='C:\Users\tjlan\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules'
$env:BROWSER_EXECUTABLE_PATH='C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
& 'C:\Users\tjlan\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tests\browser-verify.js
```

Expected: failure because the header search elements do not exist.

- [ ] **Step 3: Render and wire the header search**

Add this form inside `.nav-wrap`, before the cart link:

```html
<form class="site-search" id="site-search-form" action="shop.html" role="search">
  <label class="sr-only" for="site-search-input">Search flowers and gifts</label>
  <input id="site-search-input" name="q" type="search" autocomplete="off" placeholder="Search flowers and gifts" aria-controls="site-search-results" aria-expanded="false">
  <button type="submit" aria-label="Search flowers and gifts">Search</button>
  <div id="site-search-results" class="site-search-results" role="listbox" hidden></div>
</form>
```

On `input`, require two query characters, render matching category links followed by five product links and a `shop.html?q=` all-results link. Use `textContent`/DOM APIs for user query text and existing escaped catalog content. Close on Escape, outside click, selection, and empty input; move focus through results with ArrowDown/ArrowUp and select with Enter.

- [ ] **Step 4: Style desktop and mobile search**

Add compact header styles that keep the dropdown positioned under the field, readable above navigation, and visually consistent with existing cream/forest/blush tokens. At the existing mobile breakpoint, place `.site-search` on its own full-width row and ensure the result dropdown remains within the viewport.

- [ ] **Step 5: Run browser verification and verify it passes**

Run: the same existing browser command from Step 2.

Expected: `browser verification passed`, including the new dropdown, Escape, and mobile checks.

- [ ] **Step 6: Commit this isolated change**

```bash
git add js/main.js css/style.css tests/browser-verify.js
git commit -m "feat: add header product search"
```

### Task 3: Shop query results and filter integration

**Files:**
- Modify: `shop.html` near `#filter-bar`
- Modify: `js/main.js` in `renderShop`
- Modify: `css/style.css` near filter styles
- Test: `tests/browser-verify.js`, `tests/catalog-cart.test.js`

**Interfaces:**
- Consumes: `?q=` query parameter and `searchProducts(query)`.
- Produces: `#shop-search-summary` with current-query/clear-search feedback.

- [ ] **Step 1: Write failing search-results checks**

```js
await page.goto(`${base}/shop.html?q=balloons`, { waitUntil: "domcontentloaded" });
assert.match(await page.locator("#shop-search-summary").innerText(), /balloons/i);
assert.equal(await page.locator(".product-card").count(), 1);
assert.match(await page.locator(".product-card").innerText(), /Balloon Bouquet/);
await page.goto(`${base}/shop.html?cat=sympathy&q=roses`, { waitUntil: "domcontentloaded" });
assert.equal(await page.locator(".product-card").count(), 0);
assert.match(await page.locator("#shop-search-summary").innerText(), /No products match/i);
```

- [ ] **Step 2: Run browser verification and verify it fails**

Run: the browser command in Task 2, Step 2.

Expected: failure because `#shop-search-summary` and `q` filtering are absent.

- [ ] **Step 3: Add query-aware Shop filtering**

Add a summary container above `#filter-bar`:

```html
<div id="shop-search-summary" class="shop-search-summary" aria-live="polite" hidden></div>
```

In `renderShop`, initialize `const currentQuery = params.get("q") || "";`. Preserve it in `shopUrl()` with `params.set("q", currentQuery)` whenever it is nonblank. In `drawGrid()`, filter with:

```js
const matchesQuery = product => !currentQuery || searchProducts(currentQuery).includes(product);
const filtered = PRODUCTS.filter(product => inCategory(product) && inSub(product) && matchesQuery(product));
```

Render a text-only summary containing the query, result count, and a `shop.html` clear-search link. When no products match, keep the grid empty and provide the existing custom-order contact path below the summary instead of inventing a second catalog.

- [ ] **Step 4: Style the summary and empty state**

Add minimal styles for a compact result summary and clear link that fit between the sympathy guide and existing filter bar, with no layout shift on pages without a query.

- [ ] **Step 5: Run complete validation**

Run:

```powershell
node --check js\main.js
node tests\catalog-cart.test.js
# Start the repository preview server, then run tests\browser-verify.js with the bundled NODE_PATH and Edge path.
git diff --check
```

Expected: syntax check succeeds, catalog output says `catalog/cart regression checks passed`, browser output says `browser verification passed`, and `git diff --check` is empty.

- [ ] **Step 6: Update shared context and commit**

Add one concise bullet to `C:\Users\tjlan\Obsidian Vault\FlowersEtc\Handoffs\Current Handoff.md` describing the sitewide product search and `shop.html?q=` behavior. Then commit:

```bash
git add shop.html js/main.js css/style.css tests/catalog-cart.test.js tests/browser-verify.js
git commit -m "feat: add searchable shop results"
```

### Task 4: Publish and verify the live site

**Files:**
- No additional source files expected

**Interfaces:**
- Consumes: completed local commits on the approved branch.
- Produces: GitHub Pages deployment from `main`.

- [ ] **Step 1: Inspect the final branch state**

```bash
git status --short --branch
git log --oneline -3
```

Expected: no unintended files and every intended change committed.

- [ ] **Step 2: Push and wait for GitHub Pages**

```bash
git push origin main
```

- [ ] **Step 3: Verify the published source and user journey**

Check `https://itstaylorj.github.io/flowers-etc/` with a cache-busting query. Confirm the live `main.js` contains the search controls and matcher, and use a browser to confirm header search on a non-Shop page, dropdown product selection, category shortcut, Enter-to-results behavior, and mobile layout.

- [ ] **Step 4: Report completion accurately**

List commits, changed files, test outputs, live verification result, and any item that could not be verified.
