# Flowers Etc. Website Audit and Growth Roadmap

**Prepared:** July 31, 2026  
**Live site:** https://itstaylorj.github.io/flowers-etc/  
**Repository:** https://github.com/itsTaylorJ/flowers-etc  
**Scope:** Source files, live experience, visual design, UX, ordering, accessibility, performance, SEO, content, product strategy, maintainability, local competition, and launch planning. Online payment is intentionally last priority.

## Executive verdict

Flowers Etc. has a promising foundation and a real chance to become the best florist website in its immediate market. The strongest parts are not technical: Lisa's story, the shop's local knowledge, the compassionate sympathy copy, transparent delivery information, cemetery care, and the use of real work instead of a generic national catalog. Those are difficult for competitors to copy.

The site is not ready to be promoted as a dependable online ordering channel yet. Its two forms still use placeholder endpoints. If the fallback email draft opens, the cart is cleared even though the customer may never send the email. The site also contains unconfirmed prices and contradictory operational promises. This is a trust and order-loss problem, not a payment problem. Payment should remain late in the roadmap; reliable order intake must come first.

Visually, the teal-and-blush identity is coherent and welcoming, but the experience still looks like a polished prototype. The illustrated logo dominates the home hero while category, storefront, owner, and service areas still display placeholders. Product photography is real and valuable, but low-resolution, inconsistently cropped, and not yet presented with the discipline expected from a premium retailer.

The recommended position is:

> **Canton's personal florist—designed here, confirmed by a real person, and delivered with small-town care.**

Premium should mean trustworthy, thoughtful, and beautifully edited—not expensive-looking decoration. Flowers Etc. can beat larger catalogs by showing Lisa's actual work, setting honest expectations, confirming substitutions, and making difficult orders feel calm and personal.

## What was reviewed and verified

- All nine HTML pages, the stylesheet, all three production JavaScript files, sitemap, robots file, Git configuration, local preview files, project documentation, and published/working media.
- The live home, shop, product, and cart pages at desktop and 390px mobile widths.
- Core pages returned HTTP 200, rendered without observed console errors, and showed no horizontal overflow at 390px in the automated render.
- The local branch is clean and aligned with `origin/main` at commit `f2542d3`.
- 42 published image files total about 3.37 MB. The ignored incoming media library contains 136 assets totaling about 89.36 MB, including archives, video, originals, and duplicates.
- Automated Lighthouse scoring could not be completed because the audit runner could not attach to the sandboxed browser. No Lighthouse or Core Web Vitals score is claimed in this report. Findings are based on rendered-page checks, measurable markup/assets, code inspection, and manual visual review.

## What is already good

### Brand and customer experience

- The voice feels like a real Canton shop. The best copy is specific, warm, and rooted in community rather than generic florist language.
- Lisa's story gives the brand a person, history, and reason to choose local.
- Sympathy and cemetery content is unusually thoughtful. The cemetery subscription with placement photos is a genuine differentiator.
- Call, text, inquiry, pickup, and delivery paths respect how small-town customers actually buy.
- Delivery fees, cutoff times, substitutions, card messages, and custom work are explained more openly than on many florist websites.
- Real shop work is more credible than a wire-service catalog. This is strategically important.

### Design

- The teal, ivory, blush, and serif typography form a coherent identity that matches the logo.
- Layout spacing, card construction, rounded controls, and page-to-page consistency are solid.
- Desktop presentation is calm and uncluttered. Mobile layouts reflow without horizontal overflow in the tested 390px viewport.
- The product page gives customers flowers, colors, sizes, add-ons, delivery reassurance, and alternatives to online ordering.

### Code and maintainability

- The no-framework static architecture is appropriate for a small florist. It is inexpensive, fast to host, and has little dependency risk.
- `js/data.js` centralizes shop information, categories, products, pricing, add-ons, seasons, and gallery content. That is the right maintainability decision.
- The catalog is data-driven, seasonal pricing is centralized, and local storage preserves a working cart between pages.
- Product input is treated as trusted catalog data; unknown URL slugs and stale cart values are not echoed into the page.
- `robots.txt`, `sitemap.xml`, a custom 404 page, homepage florist schema, product schema, and `noindex` on the cart are all useful foundations.
- The repository is clean, the incoming originals are ignored, and published image files are reasonably small individually.

### Accessibility baseline

- Pages declare English, form controls generally have labels, product images have alt text, icon-only primary controls have accessible names, and native buttons/links are used in most places.
- No missing `alt` attributes were found in the rendered core pages.
- No visible unnamed buttons were found in the rendered core pages.

## Critical issues—fix before sending customers to order online

### 1. Orders and inquiries are not reliably submitted

`contact.html` and `js/cart.js` still contain `YOUR_FORM_ID`. Their fallback opens the visitor's email application. Many users have no local email client configured, and opening a draft is not proof that an order reached Lisa.

The cart is then cleared immediately after attempting the fallback, before the customer has pressed Send. A customer can lose the order and reasonably believe it was placed.

**Recommendation:** Connect and test two separate order/inquiry endpoints. Show a success state only after a server confirms receipt. When submission fails, preserve the cart, display Lisa's phone/text options, and offer a copyable order summary. Do not call this payment; it is dependable order intake.

### 2. The live site contains operational contradictions

Examples:

- The launch plan says weddings need two months; the live site and product notice say about one month.
- The launch plan says a 30-mile delivery radius; the live site repeatedly says 35 miles.
- The user-confirmed scope excludes event work, while category labels, metadata, service copy, and wedding products repeatedly advertise “Events.”
- “Same-day arrangements are usually no problem” competes with the repeated preference for 24 hours' notice.
- External business listings currently show weekday hours around 10 AM–5 PM and Saturday closed, while the site says 8 AM–5 PM and Saturday 8 AM–noon. The site may be correct, but Lisa must reconcile every public listing so customers do not encounter conflicting hours. [Flowers Etc. listing snapshot](https://reviews.birdeye.com/flowers-etc-169952815220940)

**Recommendation:** Create one approved operations sheet signed off by Lisa and make the site, Google Business Profile, Facebook, documentation, schema, and voicemail match it.

### 3. Unconfirmed prices are presented as real prices

The source marks rose tiers, holiday tiers, memorial lantern, plants/dish gardens, standing spray, and balloon add-on prices as placeholders. Customers cannot distinguish these from approved prices. Automatic seasonal overrides can make an unconfirmed holiday price appear live without review.

**Recommendation:** Add an explicit `status` or `published` field. Unapproved products/prices should be hidden or labeled “Call for current pricing,” not silently published. Require Lisa's seasonal sign-off before each holiday window is enabled.

## High-priority findings

### Ordering and conversion

1. **Too many equal calls to action.** A product page stacks Add to Cart, Call, Text, Inquiry, and sometimes Buy Now with equal visual weight. This creates hesitation. Use one primary action—“Request this arrangement”—with Call/Text as quieter alternatives.
2. **“Fully online” is not accurate yet.** The FAQ says customers can order fully online, but order delivery is not configured and payment/confirmation happen later. Call it “Send an order request online; Lisa confirms details and payment.”
3. **Delivery can pass with only a ZIP code.** The form visually marks the address required, but validation accepts either a full address or a valid ZIP. That is insufficient to fulfill an order.
4. **Pickup can be submitted without a date.** “Date needed” is marked required but is only enforced for delivery.
5. **Past dates are selectable.** The date input has no minimum date.
6. **Exact delivery time is overpromised.** Florists generally work with windows, especially on holidays and funeral schedules. Use “preferred window” and state that timing is confirmed.
7. **Canton delivery can be understated.** ZIP 75103 adds $5 even though the copy says some addresses outside town are $10. The estimated total can be wrong.
8. **Quoted orders display awkward totals.** A cart of custom items can show `$0 + custom items`, which feels broken. Use “Estimate provided by Lisa” and omit a dollar total until confirmed.
9. **No privacy/cancellation policy.** The form collects customer and recipient contact/address information. Add a short privacy notice plus delivery, cancellation, substitution, and refund policies.
10. **No durable confirmation.** Add an order-request number, on-screen summary, and emailed copy when the backend is connected.

### Visual design and merchandising

1. **Placeholders dominate the experience.** All five homepage occasion cards, the owner/storefront areas, and service imagery are placeholders despite a substantial photo library. This is the clearest reason the site still feels unfinished.
2. **The hero does not sell flowers.** It sells the illustrated logo. Keep the logo in the header, but use one exceptional real arrangement or Lisa-at-work image in the hero.
3. **Photography lacks a premium standard.** Published photos are mostly 312–640px wide, show mixed backgrounds and lighting, and are forced into square crops. They are authentic, but upscaling and inconsistent composition reduce perceived value.
4. **The gallery is sympathy-heavy.** Nine of 15 entries are tagged Sympathy. That proves an important capability but makes the brand feel funeral-first. Balance it with birthdays, weddings, plants, seasonal pieces, silk work, and Lisa designing.
5. **Products without photos remain orderable.** Holiday centerpiece and several gifts show placeholders. Keep them as drafts until price, availability, and photography are approved.
6. **The blush/white pairing fails contrast.** White text on `#E48AA8` is approximately 2.47:1; normal text requires 4.5:1. Gold `#DCA24E` on the ivory background is about 2.14:1. Several muted text colors also fall below 4.5:1. Preserve the palette but darken text/interactive variants.
7. **The design is pleasant but slightly generic.** The script flourishes, pastel gradients, emojis, and rounded pills are friendly, but too many together can feel templated. Use fewer scripts/emojis, more texture from real photography, and clearer typographic hierarchy.

### Accessibility

1. Most pages have no semantic `<main>` landmark. Home and shop rendered with zero `<main>` elements.
2. No skip-to-content link is provided.
3. Links and buttons lack a consistent global `:focus-visible` style. Only form fields have a custom focus state.
4. Four related-product image links on the tested product page had no accessible name.
5. The mobile menu does not update `aria-expanded`, announce state, close with Escape, or move focus predictably.
6. Cart toast messages are not announced with `aria-live`.
7. Checkout errors are not a live alert, are not associated with fields, and do not focus the first invalid control.
8. The dead modal implementation has no dialog semantics, focus trap, focus return, or Escape handling.
9. Many inline/footer links measure under the WCAG 2.2 24px target height. Inline-text exceptions apply in some cases, but navigation and utility actions should be comfortably larger.
10. No reduced-motion rule is present.

Target WCAG 2.2 AA before the promotional launch.

### SEO and local discovery

1. Only the homepage has Open Graph metadata, and it intentionally lacks `og:image`. Shared links will not look premium.
2. Interior pages lack canonical URLs and social metadata.
3. Product pages all begin from the same `product.html` document; title/description/schema are replaced with JavaScript. This is workable but less robust than pre-rendered product pages and poor for social previews.
4. Product links are generated from names. Renaming a product breaks old links, sitemap entries, and saved carts. Give every product a permanent `id`/`slug` independent of its display name.
5. The sitemap is manually maintained and can drift from `PRODUCTS`. Generate it from catalog data or add a release checklist check.
6. Product schema marks numeric-price products `InStock` even when price/availability may be unconfirmed. Only publish offers that Lisa has approved.
7. LocalBusiness schema needs `sameAs` links, a confirmed service area, and consistent hours. Add social/profile URLs once approved.
8. A GitHub Pages subdomain is fine for review but not a premium customer-facing identity. Purchase a simple custom domain before printing QR codes or marketing collateral.
9. Create dedicated, useful local landing content for sympathy delivery, cemetery flowers, wedding flowers, and same-day Canton delivery. Avoid thin doorway pages for every town.
10. Google Business Profile consistency and reviews will matter more locally than writing a large blog.

### Performance and resilience

1. The shop eagerly loads 21 product images; none use lazy loading. Add `loading="lazy"` below the first row and explicit width/height.
2. Product pages eagerly load the main image plus related-product images.
3. Published files are individually small, but their low source resolution is not a performance victory if they look soft. Obtain full-size originals, create responsive AVIF/WebP/JPEG outputs, and serve appropriate sizes with `srcset`.
4. Three Google font families and multiple weights add requests. Keep the brand serif and a body family; use the script font sparingly or self-host a subset.
5. Navigation/footer/shop content depends entirely on JavaScript injection. A single early script failure leaves key content empty. Pre-render core navigation and product cards or add graceful fallback markup.
6. No automated link, accessibility, catalog-schema, or smoke tests exist. A small pre-deploy check is sufficient; a large framework is unnecessary.

## Content and product strategy

### Recommended information architecture

**Primary navigation**

- Shop
- Sympathy
- Weddings
- Cemetery Care
- About Lisa
- Contact
- Order icon

“Services” is vague. Promote the three high-trust custom services directly. Do not advertise events if Flowers Etc. is not taking them.

**Shop organization**

Lead with customer intent:

1. Best Sellers
2. Birthday
3. Sympathy & Funeral
4. Anniversary & Love
5. Get Well
6. Just Because / Thank You
7. Plants & Gifts
8. Prom & Homecoming
9. Seasonal

Weddings and cemetery subscriptions should have dedicated guided pages rather than behaving like ordinary cart products. Add product-type filters later only if the catalog becomes large.

### Recommended home-page order

1. Seasonal/same-day announcement with a truthful cutoff.
2. Real-photo hero: “Hand-designed flowers from your Canton florist,” with Shop Same-Day Flowers as primary action and Call Lisa as secondary.
3. Six occasion shortcuts using real images.
4. Four to six approved best sellers with clear “shown at” price tiers.
5. The Flowers Etc. promise: made here, honest substitutions, handwritten card, local delivery, real-person confirmation.
6. Cemetery Care feature—this is defensible local differentiation.
7. Wedding consultation feature with Lisa's real work.
8. Verified reviews linked to the public review profile.
9. Lisa's story and a real portrait/workbench image.
10. Service area, hours, map/directions, and final contact CTA.

### Product-page model

- Use 3–5 consistent photos where available.
- State “Photo shows Deluxe at $X” so standard/deluxe/premium expectations are clear.
- Put the substitution promise directly beside the main image and price.
- Show one primary “Request this arrangement” action.
- Collect size, color direction, date, delivery/pickup, card, and add-ons in a short progressive flow.
- Keep Call/Text visible, but not as three additional full-width primary buttons.
- Ask whether the customer wants a delivery photo when operationally appropriate.
- Do not expose a price or “In stock” claim until Lisa approves it.

### Tone recommendations

Keep the neighborly warmth. Remove wording that can sound unprofessional, exclusive, or difficult to guarantee:

- Replace “Lisa or one of our girls” with “Lisa or a member of our design team.”
- Confirm before promising “the coffee's usually on.”
- Replace “you pick the delivery time” with “choose a preferred delivery window; we confirm availability.”
- Use “retainer” or Lisa's chosen term consistently, not a mix of deposit/retainer.
- Use “request an order” until submission is reliable and accepted.

## Competitive assessment

### Direct competitor: All Canton Floral

[All Canton Floral](https://www.allcantonfloral.com/) has stronger current ecommerce, more explicit occasion/sympathy taxonomy, seasonal merchandising, product tiers, and a large add-on flow. Its homepage uses richer photography and immediately communicates “Local Florist Serving Canton & East Texas.” A sample product offers Standard/Deluxe/Premium plus bears, balloons, chocolates, candles, vase upgrades, and tips. [Pink Perfection product](https://www.allcantonfloral.com/catalog/product/boutique/pink-perfection/)

Its weaknesses are a dated, cramped mobile presentation, long pages, generic catalog photography/copy, and less personal differentiation. Public review snapshots include praise for online ordering and cemetery delivery, but also complaints about bouquet fullness, “premium” photo expectations, missing card attribution, and store signage. These reviews are a sample, not a final verdict, but they identify expectations Flowers Etc. should design around. [All Canton Floral review snapshot](https://reviews.birdeye.com/all-canton-floral-169952814932398)

**How Flowers Etc. can win:** show actual local work, label exactly which tier is pictured, confirm card attribution, offer a delivery photo when appropriate, communicate substitutions honestly, and make the mobile ordering request calmer and simpler.

### Nearby competitor: The Green House, Wills Point

[The Green House](https://www.thegreenhousewillspoint.com/) competes for Canton delivery and has decades of legacy, a large Teleflora-style catalog, online payment, extensive gift inventory, and strong name recognition. Its official site lists Canton among its served areas and promotes a long list of flowers, plants, gifts, funeral designs, and wedding/event planning. [The Green House business and delivery information](https://www.thegreenhousewillspoint.com/about-us)

Its weaknesses are generic wire-service merchandising, dense/outdated site structure, and possible catalog/operations drift. A recent public review snapshot specifically complains that a casket price shown online was no longer valid; other reviews praise empathy, phone service, and same-day accommodation. Again, this is directional evidence rather than a verdict. [The Green House review snapshot](https://reviews.birdeye.com/the-green-house-inc-169953942948467)

**How Flowers Etc. can win:** approved current prices, a smaller curated catalog, Lisa's real designs, clear “starting at/shown at” language, and a better custom-order conversation.

### Search competitors and order gatherers

National landing pages compete for “Canton flower delivery” with hundreds of products, same-day language, and large category filters. For example, [La Tulipe's Canton page](https://latulipeflowers.com/shop/texas-florist/canton-flower-delivery/) advertises 291 products and local-partner fulfillment.

Flowers Etc. should not imitate that volume. The winning message is direct-local value: no order-gatherer middleman, actual Canton designers, transparent service area, real photos, and accountability after delivery.

### Competitive position to own

| Dimension | Flowers Etc. opportunity | All Canton Floral | The Green House / networks |
|---|---|---|---|
| Local personality | Strongest potential through Lisa | Moderate | Low to moderate |
| Working ecommerce | Not reliable yet | Strong | Strong |
| Product breadth | Curated but uneven | Broad | Very broad |
| Actual local work | Strong opportunity | Mixed presentation | Often catalog-led |
| Mobile simplicity | Good foundation | Cramped/dated | Dense/template-led |
| Sympathy/cemetery care | Strong differentiator | Strong catalog | Strong legacy |
| Price transparency | Good intent; placeholders must be removed | Tiered | Risk of stale listings |
| Premium trust | Can lead through confirmation and honesty | Inconsistent expectation signals | Legacy-driven |

## File-by-file disposition

### Keep and improve

- `js/data.js`: Keep as the source of truth. Add permanent IDs/slugs, `published`, approval status, shown tier, availability, and last-confirmed date.
- `css/style.css`: Keep, but create accessible color tokens, global focus states, reduced motion, and smaller component sections.
- `index.html`: Rebuild hero/categories around real photography and a clearer value proposition.
- `shop.html`, `product.html`, `cart.html`: Keep; simplify calls to action and make the request flow reliable.
- `services.html`: Keep only if renamed/restructured; remove event claims and split high-value services into dedicated pages/sections.
- `about.html`: Keep; obtain Lisa's approval and real portrait/store images.
- `gallery.html`: Keep; rebalance categories and make images link to related offerings where sensible.
- `contact.html`: Keep; connect the form, add privacy language, and clarify response expectations.
- `404.html`, `robots.txt`, `sitemap.xml`: Keep; generate sitemap/product metadata from approved catalog data.
- `CUSTOMIZE.md` and `LAUNCH-PLAN.md`: Keep but reconcile contradictions and remove stale instructions.

### Fix or remove if unused

- `.claude/launch.json`: Its runtime path points to `C:/Users/tjlan/Obsidian Vault/FlowersEtc/...`, not the current `FlowerrsEtc/FlowersEtc` location. Fix it or delete the `.claude` preview helper if it is no longer used.
- `openOrderModal()` and its `[data-order]` event wiring in `js/main.js`: No rendered shop element uses `data-order`; this appears to be dead code from an earlier order-modal design. Remove after confirming no page calls it.
- `images/gallery-15.jpg` and `images/cemetery-vase-flowers.jpg`: They are byte-for-byte duplicates. Keep one canonical asset and update references, unless separate filenames are intentionally useful for content management.
- `images/incoming/`: Do not delete blindly. After verifying every archive has been extracted and backed up, move the full-resolution source library to a clearly named media archive outside the production working tree. Deduplicate the duplicate extracted files and redundant zip bundles.
- Placeholder products: Do not delete Lisa's ideas. Add `published: false` and hide them from customers until photography, availability, and price are approved.
- Stale documentation statements: The launch plan's distance, wedding lead time, photo counts, and setup state need revision. `CUSTOMIZE.md` also overstates how reliably dynamic product pages are indexed/shared.

## Information Lisa must confirm

Treat every item below as subject to change until Lisa approves it:

### Business operations

- Exact public hours, holiday hours, phone, text capability, email, address formatting, and social URLs.
- Delivery radius, towns, ZIPs, rural-route limits, funeral-home exceptions, fees, cutoff times, and delivery windows.
- Whether Saturday delivery/pickup is available and whether Sunday funeral exceptions exist.
- Missed-recipient, porch/weather, hospital, funeral-home, and cemetery delivery procedures.
- Whether delivery photos are automatic, by request, or cemetery-subscription only.

### Products and pricing

- Every placeholder price and all holiday price tiers.
- Which products are actually repeatable versus photo inspiration/custom work.
- The size/tier shown in every product photo and what changes between tiers.
- Seasonal availability, substitution policy, add-on inventory, and add-on prices.
- Pickup/delivery minimums, taxes, tips, cancellation/refund policy, and remake policy.
- Which placeholder gift products should launch and which should remain drafts.

### Services and brand

- Confirm no event work, and define exactly what wedding work remains offered.
- Wedding lead time, consultation process, retainer, balance deadline, delivery/setup scope, and cancellation terms.
- Cemetery subscription price, frequency, service area, replacement/weather policy, and photo confirmation.
- Lisa's story, owner portrait, storefront/interior images, team wording, and coffee invitation.
- Permission and preferred attribution for reviews/photos.
- A short promise Lisa is comfortable keeping on every order.

## Prioritized roadmap—payment stays last

### Phase 0: Lisa truth session (one meeting)

1. Review the confirmation list above.
2. Resolve hours, delivery, wedding timing, service scope, pricing, and policies.
3. Mark every catalog item Approved, Draft, Seasonal, or Retired.
4. Choose the promise: real local design, honest substitutions, personal confirmation, and delivery-photo option.

**Exit condition:** one approved operations/catalog sheet exists.

### Phase 1: Make order requests dependable

1. Connect separate inquiry and order endpoints.
2. Fix cart preservation and success/error states.
3. Enforce address/date validation; prevent past/Sunday dates where appropriate.
4. Replace exact-time promises with confirmation-based windows.
5. Add privacy, cancellation, delivery, and substitution summaries.
6. Run real test orders on iPhone, Android, desktop, and with no local email client.

**Exit condition:** Lisa receives every test request, the customer retains a confirmation, and nothing implies payment occurred.

### Phase 2: Curate the catalog and structure

1. Add permanent product IDs/slugs and publication status.
2. Hide draft/no-photo/unconfirmed-price products.
3. Reorganize shopping by occasion; separate weddings and cemetery care into guided pages.
4. Simplify product actions to one primary request flow.
5. Add shown-tier language and set accurate expectations.

**Exit condition:** every visible product can be fulfilled at the displayed starting price and expectation.

### Phase 3: Premium visual production

1. Obtain full-resolution originals from Lisa.
2. Create a consistent shot list: hero, Lisa at work, storefront, cooler/shop, delivery, six occasions, products, weddings, cemetery care.
3. Standardize crops, color correction, backgrounds, and responsive image outputs.
4. Refresh the color system for WCAG contrast; reduce emoji/script usage.
5. Rebuild the homepage in the recommended order and rebalance the gallery.

**Exit condition:** no customer-facing placeholder remains and the first mobile screen communicates local florist, real work, location, and next action.

### Phase 4: Accessibility, SEO, and technical hardening

1. Add main landmarks, skip link, focus-visible states, menu state/keyboard handling, live announcements, and accessible errors.
2. Add canonical/social metadata and unique share images.
3. Pre-render or generate stable product pages and sitemap entries.
4. Update schema using only approved business/product data.
5. Lazy-load/responsively serve images and reduce font overhead.
6. Add automated link, catalog, accessibility, and browser smoke checks.

**Exit condition:** WCAG 2.2 AA automated checks are clean, manual keyboard testing passes, and core pages have verified metadata.

### Phase 5: Local launch and marketing

1. Move to a custom domain.
2. Reconcile and fully populate Google Business Profile; match name/address/phone/hours everywhere.
3. Add 15–25 excellent real photos and the website link to Google/Facebook.
4. Ask happy customers for reviews with a simple printed/text follow-up.
5. Build referral links with funeral homes, churches, wedding venues, and local organizations.
6. Create QR cards for deliveries and the counter only after the domain is final.
7. Post real work consistently; reuse it on the gallery and seasonal homepage.
8. Track calls, texts, order requests, completion rate, average order value, and repeat customers with privacy-respecting analytics.

**Exit condition:** local profiles are consistent, the domain is permanent, and Lisa has a simple weekly content/review routine.

### Phase 6: Payment—last priority

Only after the order-request flow and catalog have proven themselves:

1. Review 20–30 real order requests to learn where pricing, delivery, substitutions, and add-ons create exceptions.
2. Decide which approved repeatable products can be prepaid and which remain consultation-based.
3. Choose Square if Lisa wants unified in-store and online payments; otherwise compare Stripe/Square based on her actual workflow and current fees at that time.
4. Test taxes, delivery, refunds, receipts, duplicate submission, and failed-payment recovery.
5. Keep weddings, complex sympathy work, and unusual custom pieces confirmation-first if that serves customers better.

Payment should automate a mature process, not define an immature one.

## Recommended first ten actions

1. Hold the Lisa truth session.
2. Remove event-work claims.
3. Connect and test the two form endpoints.
4. Fix cart clearing and validation.
5. Hide every unapproved/no-photo product.
6. Reconcile all public hours and delivery details.
7. Replace homepage/service placeholders with the strongest existing real photos.
8. Simplify product CTAs and label shown price tiers.
9. Correct contrast, landmarks, focus, menu state, and form errors.
10. Obtain full-resolution photography and choose the custom domain.

## Bottom line

Flowers Etc. should not try to become the largest flower catalog in East Texas. It should become the most trustworthy flower shop to order from in Canton.

The competitive advantage is Lisa: her judgment, her actual work, her familiarity with the community, and the feeling that someone capable is taking care of the details. The website succeeds when it makes that care visible, sets honest expectations, and never loses an order. Build that first. Make it beautiful second. Let payment come only when the business process is ready for it.
