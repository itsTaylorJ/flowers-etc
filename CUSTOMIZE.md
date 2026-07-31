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
| "Change the add-ons (bears, ribbons, balloons...)" | `ADDONS` in `js/data.js` — shown on every product page |
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
(Lisa can text one to a customer) and Google can index each one.
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

## Turning on online payments (when she's ready)

1. She creates a free **Stripe** (stripe.com) or **Square** account herself
   (this needs her bank details, so she should do this part).
2. In Stripe: Payment Links → create a link per arrangement (name + price).
3. Paste each link into that product's `buyLink` field in `js/data.js`.
4. The "Call to Order" fallback automatically becomes a real **Buy Now — Secure Checkout** button.

Products meant to stay phone-only (casket sprays, weddings) keep `order: "custom"` — they never show a buy button.

## Making the contact form actually send

The form currently falls back to opening the visitor's email app. For real
form delivery:

1. Sign up at **formspree.io** with the shop's email (free: 50 messages/month)
2. Create a form, copy the endpoint URL
3. In `contact.html`, replace `YOUR_FORM_ID` in the form's `action` attribute

## Adding the Google Map

Search the shop on Google Maps → **Share → Embed a map** → copy the iframe →
paste it into `contact.html` where the map placeholder comment is.

## Remaining placeholders to fill in

Search the project for `[` to find them all. Currently:
- `js/data.js`: phone, email, address, hours, owner name, year established, delivery area
- `index.html`: three real customer testimonials
- `about.html`: the shop's real story (two paragraphs)
