const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const storage = new Map();
const noop = () => {};
const element = () => ({
  addEventListener: noop,
  appendChild: noop,
  classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
  closest: () => null,
  contains: () => false,
  getAttribute: () => null,
  parentElement: { classList: { toggle: noop } },
  querySelector: () => element(),
  querySelectorAll: () => [],
  remove: noop,
  setAttribute: noop,
  style: {},
  textContent: "",
  value: "",
});

const document = {
  body: { dataset: {}, appendChild: noop },
  createElement: element,
  getElementById: () => element(),
  querySelector: selector => selector === "nav.main-nav" ? element() : element(),
  querySelectorAll: () => [],
  addEventListener: noop,
};

const context = vm.createContext({
  console,
  document,
  history: { replaceState: noop },
  location: { href: "https://example.test/product.html", search: "" },
  localStorage: {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, value),
  },
  navigator: {},
  setTimeout: noop,
  URL,
  URLSearchParams,
  window: null,
});
context.window = context;

for (const file of ["js/data.js", "js/main.js", "js/cart.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
}

const runtime = vm.runInContext("({ PRODUCTS, ADDONS, SEASONS })", context);
const product = name => {
  const match = runtime.PRODUCTS.find(item => item.name === name);
  assert.ok(match, `missing product: ${name}`);
  return match;
};

assert.equal(product("Meadow Gold Sympathy Arrangement").subcat, "service");
assert.equal(product("Soft Garden Basket").designType, "Fresh flower basket");
assert.equal(product("Blush Garden Bouquet").category, "wedding");
assert.equal(product("Blush Garden Bouquet").price, "From $145");
assert.equal(product("Blush Garden Bouquet").order, "custom");
assert.equal(product("Greenery Casket Spray").subcat, "casket");
assert.equal(product("Greenery Casket Spray").price, 450);

const balloonBouquet = product("Balloon Bouquet");
assert.equal(balloonBouquet.category, "gifts");
assert.equal(balloonBouquet.order, "buy");
assert.equal(balloonBouquet.image, "balloon-bouquet.png");
assert.equal(fs.existsSync(path.join(root, "images", balloonBouquet.image)), true);
assert.deepEqual(
  JSON.parse(JSON.stringify(balloonBouquet.balloonOptions)),
  {
    latex: { label: "Latex balloons", amount: 2, defaultQty: 4 },
    mylar: { label: "Mylar balloons", amount: 5, defaultQty: 2 },
  }
);

for (const [name, price] of [
  ["Coral Rose Cube", "From $65"],
  ["White Rose Cloud", "From $65"],
  ["Pink Rose Vase", "From $55"],
  ["Green Garden Basket", "From $60"],
]) assert.equal(product(name).price, price);

assert.deepEqual(
  JSON.parse(JSON.stringify(product("Classic Rose Bouquet").sizes)),
  [
    { label: "Half Dozen", price: 55 },
    { label: "Dozen", price: 85 },
    { label: "Two Dozen", price: 165 },
  ]
);
const roses = product("Classic Rose Bouquet");
assert.deepEqual(
  JSON.parse(JSON.stringify(roses.photos || [])),
  ["rose-bouquet-example-2.webp", "rose-bouquet-example-1.webp"]
);
assert.deepEqual(
  JSON.parse(JSON.stringify(roses.orderOptions.options)),
  ["Red", "Pink", "Yellow", "White", "Special Request — 24 hours notice required"]
);
assert.match(roses.desc, /normally (?:kept in stock|stocked)/i);
assert.match(roses.desc, /24 hours/i);
assert.ok(runtime.SEASONS.every(season => !season.prices["Classic Rose Bouquet"]));

const cemetery = product("Custom Cemetery Flowers");
assert.equal(cemetery.price, 50);
assert.equal(cemetery.order, "buy");
assert.ok(cemetery.photos.length >= 4);
assert.ok(cemetery.photos.includes("cemetery-headstone-saddle.webp"));
assert.match(cemetery.desc, /flower types/i);
assert.match(cemetery.desc, /colors/i);
assert.match(cemetery.desc, /headstone saddles/i);
assert.equal(runtime.PRODUCTS.some(item => /headstone saddle/i.test(item.name)), false);

assert.ok(product("Blush Garden Bouquet").photos.includes("blush-garden-bouquet-example.webp"));

const urn = product("Serene White Urn Tribute");
assert.equal(urn.category, "sympathy");
assert.equal(urn.subcat, "service");
assert.equal(urn.price, "From $400");
assert.equal(urn.order, "buy");

for (const slug of [
  "blue-iris-remembrance",
  "sunflower-blue-cemetery-flowers",
  "bright-garden-cemetery-flowers",
  "golden-blue-cemetery-flowers",
  "cemetery-flower-replacement",
]) assert.equal(context.productBySlug(slug).name, "Custom Cemetery Flowers");
assert.equal(context.productBySlug("casket-spray").name, "Gentle Pink Garden");
assert.equal(context.productBySlug("greenery-planter").name, "Greenery Casket Spray");
assert.equal(context.productBySlug("classic-red-rose-arrangement").name, "Classic Rose Bouquet");

storage.set("flowersetc_cart", JSON.stringify([
  { name: "Meadow Gold Easel", qty: 1 },
  { name: "Soft Garden Vase", qty: 1 },
  { name: "Greenery Planter", qty: 1 },
  { name: "Sunflower Blue Cemetery Flowers", qty: 1 },
  { name: "Classic Red Rose Arrangement", size: "Dozen", qty: 1 },
  { name: "Blush Garden Vase", qty: 1 },
]));
assert.deepEqual(
  JSON.parse(JSON.stringify(context.cartItems().map(item => item.name))),
  ["Meadow Gold Sympathy Arrangement", "Soft Garden Basket", "Greenery Casket Spray", "Custom Cemetery Flowers", "Classic Rose Bouquet", "Blush Garden Bouquet"]
);
const migratedConsultation = context.cartItems().at(-1);
assert.equal(context.cartLinePrice(migratedConsultation), null);
assert.equal(context.cartAdd("Blush Garden Bouquet", "", "", "product"), false);

storage.set("flowersetc_cart", "[]");
assert.equal(context.cartAdd("Classic Rose Bouquet", "Dozen", "Rose color: Red", "product"), true);
assert.equal(context.cartAdd("Classic Rose Bouquet", "Dozen", "Rose color: Pink", "product"), true);
const roseLines = context.cartItems();
assert.equal(roseLines.length, 2);
assert.deepEqual(
  JSON.parse(JSON.stringify(roseLines.map(item => item.instructions))),
  ["Rose color: Red", "Rose color: Pink"]
);

storage.set("flowersetc_cart", "[]");
assert.equal(context.cartAdd("Full Size Specialty Card", "", "Birthday", "addon"), true);
assert.equal(context.cartAdd("Full Size Specialty Card", "", "Sympathy", "addon"), true);
const specialtyCards = context.cartItems();
assert.equal(specialtyCards.length, 2);
assert.deepEqual(
  JSON.parse(JSON.stringify(specialtyCards.map(item => item.instructions))),
  ["Birthday", "Sympathy"]
);
assert.equal(specialtyCards.reduce((sum, item) => sum + context.cartLinePrice(item) * item.qty, 0), 6);
assert.equal(runtime.ADDONS.find(item => item.name === "Hand-written card message").amount, 0);

storage.set("flowersetc_cart", "[]");
assert.equal(context.cartAdd("Latex balloon — shop supplied, helium included", "", "", "addon", 6), true);
assert.equal(context.cartItems()[0].qty, 6);

storage.set("flowersetc_cart", "[]");
assert.equal(context.cartAdd(
  "Balloon Bouquet",
  "",
  "Latex balloons: 4\nMylar balloons: 2",
  "product",
  1,
  { latex: 4, mylar: 2 }
), true);
const configuredBouquet = context.cartItems()[0];
assert.equal(context.cartLinePrice(configuredBouquet), 18);
assert.equal(configuredBouquet.balloonLatex, 4);
assert.equal(configuredBouquet.balloonMylar, 2);

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
assert.match(sitemap, /product\.html\?p=custom-cemetery-flowers/);
assert.match(sitemap, /product\.html\?p=classic-rose-bouquet/);
assert.match(sitemap, /product\.html\?p=serene-white-urn-tribute/);
assert.doesNotMatch(sitemap, /product\.html\?p=classic-red-rose-arrangement/);
for (const stale of [
  "blue-iris-remembrance",
  "sunflower-blue-cemetery-flowers",
  "bright-garden-cemetery-flowers",
  "golden-blue-cemetery-flowers",
  "cemetery-flower-replacement",
]) assert.doesNotMatch(sitemap, new RegExp(`product\\.html\\?p=${stale}`));

console.log("catalog/cart regression checks passed");
