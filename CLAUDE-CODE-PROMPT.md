# Copy/paste into Claude Code

Update and deploy the Flowers Etc. GitHub Pages site using this prepared handoff:

Source package:
`C:\Users\tjlan\Documents\Codex\2026-07-31\i-2\outputs\flowers-etc-claude-handoff`

Target repository:
`C:\Users\tjlan\Obsidian Vault\FlowerrsEtc\FlowersEtc`

Please do the following carefully:

1. Read `CLAUDE-HANDOFF.md`, `OPERATIONS-TRUTH.md`, `ASK-LISA.md`, `CURRENT-SITE-AUDIT.md`, and `PHOTO-PRODUCT-MAP.md` before changing anything.
2. Check the target repository’s current branch and status. Preserve its `.git` folder and all user-supplied source assets, especially `images/incoming`, the full-resolution originals in `images`, and the downloaded ZIP files. Do not delete untracked originals.
3. Copy the prepared handoff files over their matching paths in the target repository. This should update the HTML, CSS, JavaScript, documentation, and add the selected `.webp` images.
4. Do not invent or change business facts. Keep everything in `ASK-LISA.md` unresolved. Do not change any remaining `PRICE PLACEHOLDER` value without Lisa’s confirmation.
5. Keep both `YOUR_FORM_ID` placeholders until real Formspree endpoints are supplied and tested. Do not make the UI claim an inquiry or order was sent when it was not.
6. Keep payment processing deferred.
7. Verify JavaScript syntax for `js/data.js`, `js/main.js`, and `js/cart.js`.
8. Serve the target repository locally and test at desktop and phone widths:
   - homepage reviews and Facebook links;
   - Shop dropdown and all five category filters;
   - cart at the right side of the header;
   - minus, plus, and Remove cart controls;
   - Services page anchors and confirmed terms;
   - 53-image gallery and its filters;
   - Casket Spray, Standing Spray, Cemetery Replacement, Prom & Homecoming, Designer’s Choice, and Plants & Dish Gardens photo galleries;
   - Contact email and Facebook links;
   - no broken local links, missing images, console errors, or horizontal overflow.
9. Review the final diff and report any unexpected or unrelated change before committing.
10. Commit with a clear message such as:
   `Complete services, reviews, navigation, and curated photo update`
11. Push to the existing remote/branch and confirm the GitHub Pages deployment completes.
12. Open the live site and spot-check the same key paths. Report the commit hash, live URL, verification results, and any unresolved items. Do not call the task complete if deployment or live verification fails.
