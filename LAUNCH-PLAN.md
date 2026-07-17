# Flowers Etc. — Launch Plan

The site is live for review at https://itstaylorj.github.io/flowers-etc/
"Launch" means: the owner starts telling customers about it. Everything below
is ordered — finish a phase before starting the next.

---

## Phase 1 — Content she must confirm (launch blockers)

These are things only the owner knows. Wrong info live is worse than no website.

- [ ] **Store hours** — the hours on the site right now are EXAMPLES, not real.
      Confirm and update `SHOP.hours` in `js/data.js`. ← most urgent
- [ ] **Every price** — all prices are our guesses. Have her read the Shop page
      and correct each one (marked `PRICE PLACEHOLDER` in `js/data.js`).
- [ ] **Delivery fees & area** — confirm the FAQ answer on the Services page.
- [ ] Owner name + year established (home page "since [YEAR]" badge, About page).
- [ ] Her story, in her voice (About page — 2 short paragraphs).
- [ ] 2–3 real reviews from her Facebook page (home page testimonials).
- [ ] FAQ answers read aloud to her — she'll want her own wording somewhere.

## Phase 2 — Photos (the site's biggest upgrade)

Shot list in `images/README.md`. Priority order:
1. One photo per Shop product (17 products)
2. 9+ gallery photos for Our Work
3. Storefront + owner photo (About), wedding + sympathy work (Services)

Rules: landscape orientation for products, square-ish for gallery,
under ~500 KB each (resize at squoosh.app). Add filenames in `js/data.js`.

## Phase 3 — Make the contact form real (15 minutes)

- [ ] Sign up at formspree.io with cantontxflowersetc@gmail.com (free tier)
- [ ] Create a form, copy the endpoint, replace `YOUR_FORM_ID` in `contact.html`
- [ ] Send a test inquiry; confirm it lands in the Gmail inbox
- [ ] Add the Google Maps embed to `contact.html` (instructions in the file)

## Phase 4 — Payments decision (owner researching — no rush)

The site already works without this: every product falls back to call/text.
When ready, compare:

|  | Stripe Payment Links | Square Online Checkout |
|---|---|---|
| Fee | 2.9% + 30¢ | 2.9% + 30¢ |
| Setup | Create link per product, paste into `buyLink` | Same idea, via Square dashboard |
| Best if | Online-only payments | She ever wants a card reader in the shop too |
| Payout | ~2 business days | ~1–2 business days |

**Recommendation:** if she might ever take cards in person, Square keeps
everything in one place. Either way: she creates the account herself (bank
details are involved), then we paste each product's payment link into
`buyLink` in `js/data.js` — Buy Now buttons appear automatically.
A shopping cart (Snipcart etc.) is a later upgrade only if phone volume demands it.

## Phase 5 — Pre-launch QA (we do this together, ~1 hour)

- [ ] Click every link/button on every page, on a phone
- [ ] Test tap-to-call and tap-to-text from a real phone
- [ ] Send a real text to (903) 567-7045 to prove texts arrive
- [ ] Test the contact form end to end
- [ ] Spelling pass with the owner
- [ ] Check the site on the slowest phone in the family (photo sizes!)
- [ ] Add Open Graph tags (og:image with her best arrangement photo) so
      links texted/shared on Facebook show a pretty preview card

## Phase 6 — Launch (marketing, in order of impact)

1. **Facebook post from the shop's page** announcing the website, pinned to top.
   Her existing followers are the warmest audience she has. Post a great photo +
   the link. Update the page's Website field + the About section.
2. **Google Business Profile** (deferred by choice — do it at launch): claim it,
   exact same name/address/phone as the site, add the site URL, upload 10+ photos,
   and start asking happy customers for Google reviews. For "florist near me"
   searches this outranks everything else we do.
3. **In-shop**: small sign or QR code at the register ("Order online anytime").
   QR on delivery cards too — every delivery recipient is a future customer.
4. **Local anchors**: ask the funeral homes she works with to list/link her;
   same for wedding venues and churches. In a small town these referrals beat ads.
5. **Facebook posts rhythm**: one photo of real work 2–3×/week. Every post
   quietly links the site. This also feeds the Gallery page with new photos.

## Phase 7 — After launch (keep it alive)

- Holiday banner calendar — set `SHOP.announcement` ~2 weeks ahead of:
  Valentine's, Easter, Mother's Day, prom season (spring), homecoming (fall),
  Thanksgiving, Christmas. Then turn it off after.
- Add new work to the Gallery monthly (fresh site = trust + better Google).
- Collect reviews steadily; rotate the best into the home page.
- Optional: free privacy-friendly analytics (GoatCounter or Cloudflare) if we
  want to see visitor counts. Skip Google Analytics — overkill here.
- Custom domain when she's ready (~$12/yr) — attaches to this same hosting
  with no rebuild; print materials should wait for this if possible.

---

## How updates work (the ongoing loop)

1. Owner gives feedback → we edit (usually just `js/data.js`)
2. `git commit` + `git push`
3. The live link updates in ~1 minute; she refreshes and sees it

Quick-edit map lives in `CUSTOMIZE.md`.
