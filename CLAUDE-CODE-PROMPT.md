# Copy/paste into Claude Code

Update and deploy the Flowers Etc. GitHub Pages site using the current prepared handoff.

Source handoff folder:
`C:\Users\tjlan\Documents\Codex\2026-07-31\i-2\outputs\flowers-etc-claude-handoff`

Target Git repository:
`C:\Users\tjlan\Obsidian Vault\FlowerrsEtc\FlowersEtc`

Live site:
`https://itstaylorj.github.io/flowers-etc/`

Work carefully and complete the deployment end to end:

1. Read these source-of-truth files before making changes:
   - `CLAUDE-HANDOFF.md`
   - `OPERATIONS-TRUTH.md`
   - `ASK-LISA.md`
   - `CURRENT-SITE-AUDIT.md`
   - `PHOTO-PRODUCT-MAP.md`
   - `PHOTO-COVERAGE-PLAN.md`
2. Inspect the target repository's current branch, remote, and working-tree status. Preserve its `.git` folder and all user-supplied source assets, especially `images/incoming`, full-resolution originals, downloaded archives, and unrelated untracked files. Do not discard or overwrite unrelated user work.
3. Copy the prepared handoff files over their matching paths in the target repository. The handoff is the authority for the website HTML, CSS, JavaScript, documentation, and selected web-ready images.
4. Do not invent, infer, or silently change business facts. Leave questions in `ASK-LISA.md` unresolved unless the handoff explicitly marks them completed. Do not replace a `PRICE PLACEHOLDER` without Lisa's confirmation.
5. Keep both `YOUR_FORM_ID` placeholders until real Formspree endpoints are supplied and tested. The site must not claim an order or inquiry was sent if no real endpoint accepted it.
6. The shop currently uses Payanywhere in person. Keep the online-payment platform decision deferred: do not integrate, replace, or select a processor. The current cart prepares line items, totals, requests, and an order summary and must truthfully say online payment is not active yet. Preserve the future intent of secure online checkout for fixed-price standard orders, with custom and inventory-dependent requests remaining confirm-first.
7. Confirm the current catalog structure after copying:
   - 26 products total;
   - exactly one wedding product named `Wedding Flowers & Floral Design`;
   - the wedding listing includes bouquets, wedding-party flowers, ceremony flowers, reception installations, centerpieces, and five distinct wedding images;
   - both former URLs, `product.html?p=bridal-bouquet` and `product.html?p=full-wedding-package`, resolve to the combined wedding listing;
   - 60 images appear in Our Work, including the three new wedding/reception photographs.
8. Confirm the current ordering experience:
   - every non-custom product has an optional flower, color, item, or inventory-request field;
   - those instructions persist into the cart and the submitted/copied order summary;
   - every `order: "custom"` product has no product Add-to-cart action and instead shows `Call the Shop to Request This Design`;
   - exact-price Make It Special items enter the cart and affect the subtotal;
   - variable-price items such as Stuffed Animal use `Request current options`, appear as request-only lines, and are excluded from the subtotal until confirmed;
   - Stuffed Animal states that style, size, and color depend on current inventory;
   - minus, plus, and Remove controls work;
   - the substitution language mentions season, current shop stock, possible sourcing when lead time allows, equal-or-greater-value substitutions, and a member of the shop team calling before a significant change;
9. Verify JavaScript syntax for `js/data.js`, `js/main.js`, and `js/cart.js`.
10. Serve the target repository locally and test at desktop and phone widths. Check:
    - homepage layout, reviews, Facebook links, and current hero imagery;
    - Shop dropdown and all five category filters;
    - cart placement in the header;
    - Wedding Flowers & Floral Design and its five-image viewer;
    - product special instructions and Make It Special cart behavior;
    - phone-first custom-order CTAs;
    - centered enlarged-image dialogs on desktop and mobile;
    - consistent SVG interface icons with no distorted emoji glyphs;
    - Services anchors and confirmed service terms;
    - Our Work filters and all 60 images;
    - Casket Spray, Standing Spray, Cemetery Replacement, Prom & Homecoming, Rose Bouquet, Custom Arrangement, Stuffed Animals, and Plants & Dish Gardens galleries;
    - contact email, telephone, Facebook, and Messenger links;
    - no broken local links, missing images, console errors, or horizontal overflow.
11. Review the final diff before committing. Report and stop for any unexpected destructive or unrelated change; otherwise continue.
12. Commit the verified update with a clear message such as:
    `Deploy consolidated wedding catalog and ordering UX updates`
13. Push to the existing remote and branch, then wait for the GitHub Pages deployment to complete.
14. Open the live site and repeat focused checks for the homepage, Shop, combined wedding listing, Our Work, Services, Contact, and Cart. Use a cache-busting reload if GitHub Pages initially serves older assets.
15. Report:
    - branch and commit hash;
    - pushed remote;
    - live URL;
    - deployment result;
    - local and live verification results;
    - any unresolved Lisa questions, `PRICE PLACEHOLDER` values, Formspree setup, or payment-processing work.

Do not call the task complete if the push, GitHub Pages deployment, or live-site verification fails.
