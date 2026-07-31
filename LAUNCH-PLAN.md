# Flowers Etc. — Launch Plan

The site is live for review at https://itstaylorj.github.io/flowers-etc/
"Launch" means: the owner starts telling customers about it. Everything below
is ordered — finish a phase before starting the next.

---

## Phase 1 — Content she must confirm (launch blockers)

These are things only the owner knows. Wrong info live is worse than no website.

- [x] **Store hours** — confirmed: Mon–Fri 8–5, Sat 8–12, Sun closed (done)
- [x] **Most prices confirmed by Lisa** — Sunshine $95, Garden Romance $95,
      Birthday $50, Get Well from $40, casket from $325, wreaths/hearts
      $175–$400+, cross $125–$225, cemetery $50, prom $15–$45, keepsakes from $8,
      Peaceful Garden from $75 (done)
- [ ] Still `PRICE PLACEHOLDER` in `js/data.js`: Rose Bouquet sizes (45/75/135
      + holiday tiers), Memorial Lantern $45, Plants & Dish Gardens from $45,
      balloon add-on $6, Standing Spray from $150
- [x] **Delivery fees & area** — $5 Canton / $10 out of town / $15 extended towns,
      30-mile radius, 2:30 PM same-day cutoff (done)
- [x] Payment methods — cash, check, debit/credit, Zelle (done)
- [x] Wedding terms — 2 months ahead, 50% retainer, balance 2 weeks prior (done)
- [x] Funeral homes list + cemetery subscription service (done)
- [x] Owner name — Lisa Thompson (done)
- [x] Her story (About page — written; have Lisa read and approve it)
- [x] Real reviews — 3 Google reviews live on the home page (done)
- [ ] FAQ answers read aloud to her — she'll want her own wording somewhere.

## Phase 2 — Photos (the site's biggest upgrade)

DONE (first pass): Lisa emailed 78 photos → 19 placed on products + 12 in the
Our Work gallery. Originals kept in `images/incoming/` (git-ignored) for re-swapping.

⚠️ Those emailed photos are LOW-RESOLUTION (~640px) — email compressed them.
Good enough for cards/gallery, but for crisp results (and any large/hero use)
get the FULL-SIZE originals from Lisa via Google Drive/Dropbox or text as
"Actual Size", then re-save over the same filenames in `images/`.

Still needs photos (currently showing placeholders):
- [ ] Holiday Centerpiece
- [ ] Fruit Basket, Coffee Basket, Candy Basket
- [ ] Stuffed Animals, Friendship Gifts
- [ ] Storefront + a photo of Lisa (About page — still placeholder art)
- [ ] Optional: add a "Plants & Dish Gardens" product (Lisa sent several nice
      dish-garden photos with no matching product yet: IMG_0367/0012/0504)

## Phase 3 — Make the forms real (20 minutes)

- [ ] Sign up at formspree.io with cantontxflowersetc@gmail.com (free tier)
- [ ] Create a form, copy the endpoint, replace `YOUR_FORM_ID` in BOTH
      `contact.html` (inquiries) and `js/cart.js` → `ORDER_FORM_ACTION` (orders)
- [ ] Send a test inquiry AND a test cart order; confirm both land in Gmail
- [x] Google Maps embed on the contact page (done)
- [x] Full online ordering: cart + checkout at cart.html — order placed online,
      payment taken on Lisa's confirmation call (done). Online CARD payment
      still comes with the Phase 4 Stripe/Square decision.

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
