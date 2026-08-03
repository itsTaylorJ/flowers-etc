# Flowers Etc. website audit

Updated August 3, 2026 after reviewing the live GitHub Pages site, the deployable handoff, the full new photo library, customer reviews, current local competitors, and the v10 technical/accessibility pass.

## Honest verdict

The site does **not** need another visual overhaul. Heritage Garden is the right foundation: it feels rooted, personal, East Texas, and more distinctive than a template florist catalog. The next gains come from proof, clarity, and trust—better real-work photography, simpler navigation, accurate operating details, stronger service pages, and a reliable order-request path.

The brand should feel “established hometown florist with excellent taste,” not luxury-for-luxury’s-sake. The forest, cream, berry, and aged-gold palette does that well. The existing signage logo should remain unchanged for now.

## What is already strong

- The homepage speaks like a local shop, not a national flower wire service.
- Lisa’s history with the business gives the ownership story continuity and credibility.
- Heritage Garden balances rustic warmth with a restrained premium edge.
- Phone, text, hours, same-day cutoffs, delivery radius, and delivery fees are unusually clear.
- The substitution language sets honest expectations without making the work sound generic.
- The ordering interface now carries product-specific requests into the cart, treats add-ons as real line items, and clearly separates standard online-order products from custom phone-first work.
- Interface emoji have been replaced with consistent SVG icons, and the enlarged product viewer is centered responsively.
- Sympathy and Cemetery Replacement can become a meaningful differentiator because the site explains the service and timing calmly.
- The catalog already has multiple choices in every category. Seasonal and Gifts & Extras are thinner visually than Everyday and Sympathy, but they are not single-option categories.

## Changes completed in this package

1. Moved the cart to the right edge of the header.
2. Replaced six equally weighted navigation choices with Shop, Services, Our Work, Lisa’s Story, and Contact Us.
3. Added a Shop category menu while keeping the filters on the Shop page.
4. Built a complete Services page for delivery, funeral and sympathy work, Cemetery Replacement, weddings, custom work, events, plants and gifts, wearables, seasonal work, and balloon service.
5. Published confirmed funeral, wedding, Cemetery Replacement, delivery-photo, facility, and balloon facts.
6. Added verified Google and Facebook review excerpts with direct source links.
7. Added Facebook follow and message paths as a real customer channel.
8. Curated 45 web-ready photos from the reviewed source library. Original files were left untouched.
9. Expanded Our Work to 60 filterable examples and added relevant, non-duplicated photos to individual product pages.
10. Preserved the cart’s minus, plus, and explicit Remove controls.
11. Fixed the Contact page’s email binding so the confirmed address renders correctly.
12. Added lazy loading and asynchronous decoding to catalog images.
13. Added canonical and social-sharing metadata to all six indexable public pages, plus product-specific metadata generated from the catalog.
14. Corrected the Designer's Choice sitemap URL and retained Cart/404 as non-indexable utility pages.
15. Added intrinsic homepage image dimensions, hero-image preloading, and a smaller visually equivalent sympathy-wreath asset to reduce avoidable layout shift and transfer weight.
16. Corrected Shop, Contact, and About heading structure and increased the smallest editorial labels to 12px.
17. Added calm, contextual guidance that appears only when a customer opens the Sympathy shop category.
18. Published the confirmed Cemetery Replacement area, no-fee placement rule, customer-selected frequency, and case-by-case response to damage or removal without promising automatic replacement.

## Competitive position

[All Canton Floral](https://www.allcantonfloral.com/) has a polished, conventional ecommerce advantage: immediate seasonal products, product prices, same-day delivery language, and a broad wedding/events promise. Trying to imitate that catalog would make Flowers Etc. look like the smaller version of a competitor.

Flowers Etc. should win a different way:

- Show unmistakably real local work rather than syndicated catalog photography.
- Make it easier to get calm human help for funeral, cemetery, and custom orders.
- Be more transparent about delivery area, cutoff times, fees, substitutions, and the confirmation process.
- Use Lisa’s long relationship with the shop as continuity—not a “brand-new business” story.
- Let Facebook remain the fast-moving stream of current work while the website curates the best of it.

Other visible competitors and directory results include Botanica Florist, Billie Rose Floral, and newer local operators. The search landscape is cluttered with stale and duplicated listings, so clean local-business data matters as much as on-site design.

## Highest-priority work still remaining

### 1. Make the order request actually arrive

The Contact Inquiries and Website Order Requests Formspree endpoints are now configured and temporarily deliver to Taylor's testing inbox. Deploy this package, submit one clearly labeled test through each live form, and verify both the Formspree records and notification emails. Before public launch, verify `cantontxflowersetc@gmail.com` in Formspree and make it the destination for both forms.

### 2. Put the site on a shop-owned domain

The GitHub Pages URL is functional but not premium customer-facing branding. A domain such as `flowersetccanton.com`—subject to availability and Lisa’s approval—would improve trust, memorability, local search ownership, and future portability.

### 3. Resolve price placeholders

Do not silently turn estimates into promises. The remaining list is in `ASK-LISA.md`: Rose Bouquet tiers, holiday rose tiers, Memorial Lantern, Plants & Dish Gardens, and Standing Spray.

### 4. Clean up external business listings

The website now uses the confirmed 8–5 weekday and 8–12 Saturday hours, but [Birdeye](https://reviews.birdeye.com/flowers-etc-169952815220940) and other directory pages still surface older hours and older ownership-era information. Claim or update Google Business Profile, Facebook, Birdeye where possible, Yelp/Yellow Pages, WeddingWire, and other visible directories so address, hours, owner story, phone, URL, and photos agree.

There is also an old [WeddingWire profile](https://www.weddingwire.com/biz/flowers-etc-canton/9b3babbf7571da24.html) with a mixed 3.6 rating from four ownership-era reviews. It should not be hidden or misrepresented. Claim the profile if possible, update the ownership/context and portfolio, and respond professionally where the platform allows.

### 5. Establish a sustainable photo workflow

Use Facebook for recency and the site for curation. Add only finished work that is sharp, well lit, unobstructed, and consistent with what the current team is proud to recreate. Photograph one front view, one detail view, and one scale/context view when practical.

For homepage and product-card hero use, prefer original-resolution files. Many Facebook downloads are only 360–640 pixels and are good for gallery tiles or secondary thumbnails, not large banners.

## Content and conversion strategy

- Keep “Call or text” prominent until payment is added.
- Call the current cart an order request in customer-facing copy. Nothing should imply instant payment or guaranteed inventory.
- Use exact prices when confirmed; use “from” or “call for pricing” when size and flower choice materially change the total.
- Keep event work on Services until Lisa confirms packages, lead times, and repeatable pricing.
- Keep funeral information gentle and procedural. Customers in grief need fewer choices, not more copy.
- Ask for a review after successful delivery, especially when a customer requests a delivery photo. Link directly to Google first; Facebook second.
- Add a short “What happens next” sequence near the cart once Formspree is live: submit request, a member of the shop team confirms design/delivery, payment is arranged, and the arrangement is created and delivered.

## Accessibility and technical notes

- The new Shop menu supports click/touch, Escape dismissal, focus states, and mobile expansion.
- Shop, Contact, and About follow a logical h1/h2/h3 structure, including a programmatic heading for the product grid and contact methods.
- The smallest editorial eyebrow and service-kicker labels are 12px rather than 10px.
- The Sympathy category guide is hidden when irrelevant and exposed with an accessible labelled region when selected.
- Gallery filters expose selected state; product thumbnails now have descriptive button labels.
- Cart quantity changes and Remove are distinct controls.
- Image alt text describes the design or purpose without keyword stuffing.
- New photos are compressed WebP files and are not upscaled.
- Public indexable pages have canonical and Open Graph metadata; Cart and 404 remain intentionally excluded from search indexing.
- The shop currently uses Payanywhere in person. Online payment remains intentionally deferred; do not integrate or replace a processor until product/pricing operations and the request workflow are stable.

## Recommended sequence

1. Deploy this package for Lisa’s review.
2. Have Lisa answer `ASK-LISA.md` and approve the new photo selection.
3. Complete the live Formspree tests and move both forms to the verified shop inbox.
4. Correct external business listings and add the final website URL.
5. Purchase/connect a shop-owned domain.
6. Add basic analytics and conversion events for call, text, inquiry, Facebook message, and cart submission.
7. Collect fresh Google reviews and current-owner portfolio photos.
8. Only then evaluate online payment, starting with the small set of fixed-price, repeatable products.
