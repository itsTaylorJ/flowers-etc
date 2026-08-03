# Claude Code handoff

This folder is a complete deployable update to the Flowers Etc. static website with the approved Heritage Garden direction and the operating answers supplied through August 3, 2026.

This is the **v10 deployment source**. Copy the complete folder rather than mixing selected files with an older deployment. All eight asset-loading pages use the `?v=10` cache key.

## Important files

- `index.html` — Heritage Garden homepage, verified reviews, recent-work photography, and Facebook promotion.
- `services.html` — all confirmed services and operating terms in one customer-friendly page.
- `css/style.css` — palette, typography, navigation, responsive design, accessibility states, and shared page styles.
- `js/data.js` — central shop, catalog, pricing, hours, delivery rules, product photos, and gallery data.
- `js/cart.js` — cart, three delivery zones, weekday/Saturday timing, validation, and safe unsent-order behavior.
- `OPERATIONS-TRUTH.md` — approved business rules.
- `ASK-LISA.md` — unresolved owner questions that must not become public promises.
- `CURRENT-SITE-AUDIT.md` — design, content, conversion, accessibility, technical, and marketing findings.
- `PHOTO-PRODUCT-MAP.md` — curated photo choices, product mapping, and arrangement names to consider later.

## Before publishing order forms

Both Formspree endpoints were configured August 3, 2026: Contact Inquiries uses `mppaaaap` and Website Order Requests uses `mvkppppr`. They currently deliver to Taylor's testing inbox. After this package is deployed, submit one clearly labeled test through each live form and confirm both records and emails arrive. Before public launch, add and verify `cantontxflowersetc@gmail.com` in Formspree and change both forms' destination to the shop address.

## Logo

`images/logo.png` is the approved existing signage logo. No recolor has been made.

## What changed in this package

- Heritage Garden remains the locked visual direction.
- Six public indexable pages now have canonical URLs and complete Open Graph metadata. Product pages create product-specific canonical and social metadata at render time, while Cart and 404 remain excluded from indexing.
- The sitemap uses the working `designers-choice` product slug.
- Shop, Contact, and About now have a logical heading hierarchy; the smallest editorial eyebrow labels are 12px; and the Sympathy shop category reveals a concise guide to choosing family, service, and cemetery flowers.
- Homepage images have intrinsic dimensions, the hero image is preloaded, below-fold photography is lazy-loaded, and the large pink sympathy-wreath image was reduced without changing its visible composition.
- The confirmed customer email is `cantontxflowersetc@gmail.com`.
- Hours remain Monday–Friday 8 AM–5 PM and Saturday 8 AM–12 PM.
- Same-day cutoff remains 2:30 PM Monday–Friday and 10 AM Saturday.
- The cart includes a clear Remove action in addition to quantity controls.
- Standard products collect optional flower, color, and inventory requests before entering the cart; those instructions stay attached to the exact cart line and order summary.
- Custom products no longer expose Add to Cart and instead lead with “Call the Shop to Request This Design,” with text and inquiry alternatives.
- Fixed-price “Make it extra special” add-ons enter the cart and contribute to the subtotal. Variable inventory items use “Request current options,” remain visible in the order summary, and are explicitly excluded from the subtotal until a team member confirms availability and price. Bears and rabbits are combined as “Stuffed animal,” with selection explicitly dependent on current stock.
- Platform-dependent emoji icons were replaced with a consistent custom SVG set, and the enlarged product-image dialog is centered on desktop and mobile.
- The header keeps the cart at the right edge, adds a Shop category menu, gives Services a primary position, and uses Contact Us instead of Visit.
- `services.html` now covers delivery, funeral timing, Cemetery Replacement, weddings, events, custom work, plants, gifts, and balloon pricing.
- Cemetery Replacement is available to qualifying cemeteries within the same regular 35-mile delivery area, with no added delivery or placement fee. Customers choose the frequency. If an arrangement is damaged or removed, the site asks the family to call so the shop can review the situation case by case; it does not promise automatic free replacement.
- Event work is promoted only as a call-to-confirm service, not as fixed-price shop products.
- A curated set of 45 web-ready `.webp` photos was made from the source library without altering the originals. The pink rose vase leads Rose Bouquet, the bright cube and yellow-pink vase appear under Custom Arrangement in Everyday & Just Because, the previously mislabeled Holiday Centerpiece image is now under Casket Spray, Stuffed Animals has four distinct inventory views, and Wedding Flowers & Floral Design combines the former bouquet and package listings with five wedding images. The Our Work page contains 60 examples with category filters.
- The homepage includes verified Google/Facebook review excerpts and links, plus Facebook follow and message paths.
- Google currently shows 5.0 from 26 reviews; Facebook shows 92% recommended from 16 reviews. Do not rewrite or invent testimonials.
- The shop currently uses Payanywhere in person. Online payment remains a later-phase decision; the present site truthfully says it is not active yet. Future intent is secure checkout for fixed-price standard orders, while custom and inventory-dependent requests remain confirm-first and every order receives personal confirmation from a member of the Flowers Etc. team.

## Verified package inventory

- 116 files total.
- 26 products across five categories.
- 60 curated Our Work images.
- 17 unresolved owner questions, all contained in `ASK-LISA.md`.
- Two configured Formspree endpoints, awaiting post-deployment live tests and final transfer to the shop inbox.
