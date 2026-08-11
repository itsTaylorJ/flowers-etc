# Sitewide Product Search Design

## Goal

Help customers find products such as roses, balloons, sympathy flowers, or birthday gifts from any page without relying solely on navigation categories.

## Scope

- Add one accessible search control to the shared site header on every page.
- Search products only; do not search informational pages, policies, or gallery entries.
- Match against product name, description, category, subcategory, flower list, and customer-facing options.
- Offer category shortcuts when the search matches a category name.
- Preserve the existing category navigation and Shop filters.

## Header Search Experience

- The header contains a clearly labelled search field with a search button.
- Typing at least two characters shows an accessible dropdown below the field.
- The dropdown shows up to five matching products, each with its image, name, and displayed price.
- A matching category appears as a shortcut before product results; for example, searching `sympathy` offers **Browse Sympathy & Funeral**.
- Selecting a product opens its product page.
- Selecting a category shortcut opens the corresponding filtered Shop view.
- Pressing Enter or selecting **View all results** opens the Shop page with the query in `?q=`.
- An empty-result dropdown says that no products matched and offers a link to browse all flowers.
- Escape closes the dropdown; focus and keyboard selection work without a mouse.

## Shop Results Experience

- `shop.html?q=<term>` reads the query and displays the matching products in the existing product grid.
- The query works together with the existing category and sympathy subcategory filters: a product must match both the selected filters and the search query.
- The Shop page shows the current search term, includes a clear-search action, and explains when no matching products are available.
- Searching does not change product data, prices, cart behavior, checkout, URLs for individual products, or the existing category buttons.

## Implementation Shape

- Add a small shared search helper in `js/main.js` so header suggestions and Shop-page filtering use identical matching logic.
- Add the search markup to the shared header renderer rather than duplicating page-specific markup.
- Add minimal responsive styles in `css/style.css`; the desktop field remains compact and the mobile header gets a full-width search row.
- Update `shop.html` only as needed to provide an accessible results summary near the existing filters.
- Add catalog tests for matching and query handling, plus browser checks for header suggestions, keyboard behavior, navigation, and filtered Shop results.

## Edge Cases

- Ignore blank or one-character input for suggestions.
- Normalize case and punctuation, and compare both a term and its simple singular form, so common phrasing such as `rose`, `roses`, `birthday`, and `mylar` remains easy to find.
- Use product fallback imagery exactly as the existing product grid does.
- Never render untrusted query text as HTML.

## Success Criteria

- A customer can begin a product search from every page.
- Typing `roses` exposes relevant Rose Bouquet products and a full-results route.
- Typing `sympathy` offers the Sympathy & Funeral category shortcut and matching products.
- Enter takes the customer to all matching Shop results.
- The feature works by keyboard, at mobile width, and does not disturb existing Shop filters or cart behavior.
