# Flowers Etc. — Customization Cheat Sheet

Almost everything the shop owner will ask you to change lives in **one file**:
`js/data.js`. Open it in any text editor.

## Common feedback → where to change it

| She says... | You edit... |
|---|---|
| "The phone number / hours / address are wrong" | `SHOP` object at the top of `js/data.js` |
| "Change a price" / "rename an arrangement" | That product's entry in `PRODUCTS` in `js/data.js` |
| "Add a new arrangement" | Copy any product block in `PRODUCTS`, paste, edit |
| "Remove an arrangement" | Delete its block from `PRODUCTS` |
| "Add / rename a category" | `CATEGORIES` in `js/data.js` (product `category` must match the `id`) |
| "Add color choices to a product" | Add `colors: ["Red", "Pastels", ...]` to that product in `js/data.js` |
| "Change the add-ons (stuffed animals, ribbons, balloons...)" | `ADDONS` in `js/data.js` — shown with cart controls on every product page |
| "List the flowers in an arrangement" | Add `flowers: ["Roses", "Lilies", ...]` to that product |
| "Offer sizes (half dozen / dozen)" | Add `sizes: [{label:"Dozen", price:75}, ...]` to that product |
| "Put something on sale right now" | Add `salePrice: 55` (and optional `saleNote: "Spring Special"`) to that product. Delete the line to end the sale. |
| "Raise rose prices for Valentine's" | Already automatic — see `SEASONS` in `js/data.js` |
| "Change the customize-anything note" | `SHOP.customizeNote` in `js/data.js` — shows on every product |
| "Change the 24-hour notice wording" | `SHOP.noticeNote` in `js/data.js` — shows on every product |
| "Special notice on one product" (24h, deposits...) | Add `notice: "..."` to that product — shows highlighted on its page and popup |
| "Products without photos" | They automatically sort to the bottom of the shop grid; add an `image:` and they move up |

## Seasonal pricing (the `SEASONS` list in `js/data.js`)

Seasons hold date ranges written as `MM-DD`. They turn themselves **on and off
every year** — so holiday prices can never get stuck on in July.

```js
{
  name: "Valentine's Day",
  start: "02-01", end: "02-15",
  enabled: true,
  banner: "Valentine's Day orders are open — call early!",
  prices: {
    "Rose Bouquet": { "Half Dozen": 60, "Dozen": 95, "Two Dozen": 175 },
    "Garden Romance": 85,
  },
}
```

- `banner` shows a pink bar at the top of every page during that window.
- `prices` overrides only the products you list; everything else stays normal.
- For a product with sizes, give a price per size label. Otherwise just a number.
- Set `enabled: false` to switch a season off without deleting it.
- A manual `salePrice` on a product always beats the seasonal price.

## Product detail pages

Every product automatically gets its own page — no file to create. The link is
`product.html?p=<product-name-in-dashes>`, e.g. `product.html?p=rose-bouquet`.
Rename a product and its link changes to match. These pages are shareable
(a member of the shop team can text one to a customer) and Google can index each one.
| "I don't like the colors" | The `:root` block at the top of `css/style.css` — change the hex codes |
| "Different fonts" | Same `:root` block (`--font-head`, `--font-body`) + the Google Fonts `<link>` in each page's `<head>` |
| "Change the wording on the home page" | `index.html` — the text is plain HTML |
| "Update our story" | `about.html` — look for the PLACEHOLDER STORY comment |
| "Put a holiday banner on the site" | `SHOP.announcement` in `js/data.js` — set text to show it, `""` to hide |
| "Add a photo to Our Work" | `GALLERY` at the bottom of `js/data.js` — one entry per photo |
| "Change the FAQ answers" | `services.html` — the FAQ section is plain HTML |

## Adding her photos

1. Save the photo into the `images/` folder (e.g. `sunshine-morning.jpg`)
2. In `js/data.js`, set that product's `image` field: `image: "sunshine-morning.jpg"`
3. Done — the "Photo coming soon" placeholder disappears automatically.

Tips: landscape orientation (wider than tall) works best for product cards;
keep files under ~500 KB so pages load fast (resize at squoosh.app if needed).

## Turning on online payments (later)

The shop currently uses Payanywhere for in-person payment. Do not choose, connect,
or replace a payment platform yet. Finish the catalog, confirmed pricing, inventory
workflow, Formspree delivery, and order testing first.

When the shop is ready, evaluate whether Payanywhere supports the desired online
checkout or whether another platform is a better fit. Fixed-price, repeatable products
can then use secure online checkout. Products meant to stay phone-only (casket sprays,
weddings, and other custom work) keep `order: "custom"` and remain confirm-first.

## Online ordering (the cart)

Customers can add any standard `order: "buy"` product to the cart from its detail
page after entering optional flower, color, inventory, or stuffed-animal requests.
Custom `order: "custom"` products never show an Add to Cart action; they direct the
customer to call the shop, text, or send a custom-order inquiry. “Make it extra special”
items with exact prices enter the cart as paid line items and contribute to the subtotal.
Inventory-dependent options use `amount: null` with `requestOnly: true`; their button
says “Request current options,” they remain visible in the order summary, and they are
explicitly excluded from the subtotal until a team member confirms availability and price.

The current site states that online payment is not active yet. After the endpoint is
connected, a member of the Flowers Etc. team receives the order request and calls or
texts to confirm availability, details, and payment. Later, fixed-price standard orders
can be charged through secure online checkout while custom and request-only items stay
confirm-first.

- To receive orders by email: create a Formspree form (same account as the
  contact form) and paste its URL into `ORDER_FORM_ACTION` at the top of
  `js/cart.js`. Until then, checkout preserves the cart and displays a copyable
  order summary with call and text options. It never claims the request was sent.
- When the shop chooses its future online payment approach, it can plug into this
  same checkout flow without rebuilding the catalog.
- Call, text, and inquiry options stay available everywhere alongside the cart.

## Making the contact form actually send

The form currently preserves the inquiry as copyable text and tells the customer
to call or text. For real form delivery:

1. Sign up at **formspree.io** using **cantontxflowersetc@gmail.com**
2. Create a form, copy the endpoint URL
3. In `contact.html`, replace `YOUR_FORM_ID` in the form's `action` attribute

## Adding the Google Map

Search the shop on Google Maps → **Share → Embed a map** → copy the iframe →
paste it into `contact.html` where the map placeholder comment is.

## Remaining placeholders to fill in

Search the project for `[` to find them all. Currently:
- `js/data.js`: confirmed customer-facing email and shop hours live here
- `index.html`: three real customer testimonials
- `about.html`: the shop's real story (two paragraphs)
