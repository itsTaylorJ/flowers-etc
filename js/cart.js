/* ============================================================
   FLOWERS ETC — CART & ONLINE CHECKOUT
   Customers build an order fully online. Payment is confirmed on
   the follow-up call until online card payment (Stripe/Square)
   is connected — then it plugs into this same flow.

   SETUP: to receive orders by email, create a Formspree form and
   put its URL in ORDER_FORM_ACTION below (same as the contact
   form). Until then, checkout falls back to opening the
   customer's email app with the full order written out.
   ============================================================ */

const ORDER_FORM_ACTION = "https://formspree.io/f/YOUR_FORM_ID";
const CART_KEY = "flowersetc_cart";

/* ---------- storage ---------- */
function cartItems() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (e) { return []; }
}
function cartSave(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  cartBadge();
}
function cartCount() {
  return cartItems().reduce((n, i) => n + i.qty, 0);
}

/* ---------- price helpers ---------- */
// Numeric price for a cart line, or null if it's quoted-by-phone
function cartLinePrice(item) {
  const p = PRODUCTS.find(x => x.name === item.name);
  if (!p) return null;
  const r = resolvePrice(p);
  if (item.size && r.sizes) {
    const s = r.sizes.find(x => x.label === item.size);
    return s ? s.price : null;
  }
  // resolvePrice returns strings like "$45" or "From $95" — only exact
  // numbers count toward the online subtotal
  const solo = /^\$(\d+)$/.exec(r.price);
  return solo ? +solo[1] : null;
}

/* ---------- actions ---------- */
function cartAdd(name, size) {
  const items = cartItems();
  const hit = items.find(i => i.name === name && i.size === (size || ""));
  if (hit) hit.qty += 1;
  else items.push({ name, size: size || "", qty: 1 });
  cartSave(items);
  cartToast(name);
}
function cartSetQty(index, qty) {
  const items = cartItems();
  if (!items[index]) return;
  items[index].qty = Math.max(0, qty);
  if (items[index].qty === 0) items.splice(index, 1);
  cartSave(items);
}
function cartClear() { cartSave([]); }

/* ---------- header badge ---------- */
function cartBadge() {
  const el = document.getElementById("cart-count");
  if (!el) return;
  const n = cartCount();
  el.textContent = n > 0 ? n : "";
  el.parentElement.classList.toggle("has-items", n > 0);
}

/* ---------- "added" toast ---------- */
function cartToast(name) {
  let t = document.querySelector(".cart-toast");
  if (t) t.remove();
  t = document.createElement("div");
  t.className = "cart-toast";
  t.innerHTML = `✓ <strong></strong> added to your order &nbsp;·&nbsp; <a href="cart.html">Review &amp; Checkout →</a>`;
  t.querySelector("strong").textContent = name;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add("show"), 20);
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 400); }, 4200);
}

/* ---------- wire up any [data-cart-add] buttons ---------- */
document.addEventListener("click", e => {
  const btn = e.target.closest("[data-cart-add]");
  if (!btn) return;
  const name = btn.getAttribute("data-cart-add");
  // if a size picker is on the page, honor the selected size
  const sizeInput = document.querySelector('input[name="pdsize"]:checked');
  const p = PRODUCTS.find(x => x.name === name);
  const size = p && p.sizes && p.sizes.length
    ? (sizeInput ? sizeInput.value : p.sizes[Math.min(1, p.sizes.length - 1)].label)
    : "";
  cartAdd(name, size);
});

document.addEventListener("DOMContentLoaded", cartBadge);
cartBadge();

/* ============================================================
   CART + CHECKOUT PAGE (cart.html)
   ============================================================ */
function renderCartPage(rootEl) {
  // Only render items that match the real product catalog (drops stale
  // entries after renames, and never echoes untrusted localStorage text)
  const items = cartItems().filter(i => {
    const p = PRODUCTS.find(x => x.name === i.name);
    if (!p) return false;
    if (i.size && !(p.sizes || []).some(s => s.label === i.size)) i.size = "";
    return true;
  });
  if (items.length !== cartItems().length) cartSave(items);

  if (!items.length) {
    rootEl.innerHTML = `
      <div class="container" style="padding:70px 22px; text-align:center;">
        <div style="font-size:2.6rem;">🌸</div>
        <h1>Your order is empty</h1>
        <p style="margin:12px 0 26px; color:#5A665F;">Let's fix that — every arrangement is made by hand, just for you.</p>
        <a class="btn btn-primary" href="shop.html">Browse Our Flowers</a>
        <p style="margin-top:26px; font-size:0.92rem; color:#7C8981;">
          Rather order with a person? Call or text us at
          <a href="tel:${SHOP.phoneHref}" style="font-weight:700;">${SHOP.phone}</a>.
        </p>
      </div>`;
    return;
  }

  const lines = items.map((item, idx) => {
    const p = PRODUCTS.find(x => x.name === item.name);
    const price = cartLinePrice(item);
    const img = p && p.image
      ? `<img src="images/${p.image}" alt="${item.name}">`
      : `<div class="ph" style="width:100%;height:100%;"><span class="ph-icon">✿</span></div>`;
    return `
      <div class="cart-line">
        <a class="cart-thumb" href="${p ? productUrl(p) : "shop.html"}">${img}</a>
        <div class="cart-line-info">
          <a class="cart-line-name" href="${p ? productUrl(p) : "shop.html"}">${item.name}</a>
          ${item.size ? `<div class="cart-line-size">${item.size}</div>` : ""}
          <div class="cart-line-price">${
            price !== null ? "$" + price * item.qty : "Priced with you by phone"
          }</div>
        </div>
        <div class="cart-qty">
          <button data-qty="${idx}" data-d="-1" aria-label="One less">−</button>
          <span>${item.qty}</span>
          <button data-qty="${idx}" data-d="1" aria-label="One more">+</button>
        </div>
      </div>`;
  }).join("");

  const subtotal = items.reduce((s, i) => {
    const pr = cartLinePrice(i);
    return pr !== null ? s + pr * i.qty : s;
  }, 0);
  const hasQuoted = items.some(i => cartLinePrice(i) === null);

  const addonBoxes = (typeof ADDONS !== "undefined" ? ADDONS : []).map((a, i) => `
    <label class="co-addon">
      <input type="checkbox" name="addon" value="${a.name} (${a.price})">
      <span>${a.name}</span><em>${a.price}</em>
    </label>`).join("");

  rootEl.innerHTML = `
    <div class="container">
      <div class="section-head" style="margin-bottom:28px;">
        <div class="flourish">Almost there</div>
        <h2>Your Order</h2>
      </div>

      <div class="cart-wrap">
        <div class="cart-items">
          ${lines}
          <div class="cart-totals">
            <div><span>Items subtotal</span><strong>$${subtotal}</strong></div>
            ${hasQuoted ? `<div class="cart-quoted"><span>+ custom-priced items</span><em>confirmed with you by phone</em></div>` : ""}
            <div id="cart-delivery-row" style="display:none;"><span>Delivery</span><strong id="cart-delivery-fee"></strong></div>
            <div class="cart-grand"><span>Estimated total</span><strong id="cart-grand">$${subtotal}</strong></div>
          </div>
          <p class="cart-reassure">💐 <strong>Nothing is charged online.</strong> We'll call or text to
          confirm every detail — and take payment — before we make a single stem. Cash, check,
          debit &amp; credit cards, and Zelle accepted.</p>
          <p class="cart-alt">Customer needs change — if you'd rather finish this order with a person,
            <a href="tel:${SHOP.phoneHref}">call</a> or <a href="sms:${SHOP.phoneHref}">text us</a>
            at ${SHOP.phone}, or <a href="contact.html">send an inquiry</a> instead. We're easy.</p>
        </div>

        <form class="form-card co-form" id="checkout-form">
          <h3 style="font-size:1.6rem; margin-bottom:16px;">Checkout</h3>
          <div class="form-grid">
            <div>
              <label for="co-name">Your Name *</label>
              <input type="text" id="co-name" required>
            </div>
            <div>
              <label for="co-phone">Phone (for confirmation) *</label>
              <input type="tel" id="co-phone" required>
            </div>
            <div class="full">
              <label for="co-email">Email</label>
              <input type="email" id="co-email">
            </div>
            <div class="full">
              <label for="co-method">Pickup or Delivery? *</label>
              <select id="co-method" required>
                <option value="Pickup at the shop (free)">Pickup at the shop — free</option>
                <option value="Delivery in Canton (+$5)" data-fee="5">Delivery in Canton — $5</option>
                <option value="Delivery just out of town (+$10)" data-fee="10">Delivery just out of town — $10</option>
                <option value="Delivery to Wills Point / Grand Saline / Van / Mabank / Martins Mill / Ben Wheeler (+$15)" data-fee="15">Wills Point, Grand Saline, Van, Mabank, Martins Mill &amp; Ben Wheeler — $15</option>
                <option value="Not sure — call me">Not sure — we'll figure it out on the call</option>
              </select>
            </div>
            <div class="full co-delivery" style="display:none;">
              <label for="co-recipient">Recipient name (who is this going to?)</label>
              <input type="text" id="co-recipient">
            </div>
            <div class="full co-delivery" style="display:none;">
              <label for="co-address">Delivery address</label>
              <input type="text" id="co-address" placeholder="Street address, town — funeral home or church name works too">
            </div>
            <div>
              <label for="co-date">Date needed</label>
              <input type="date" id="co-date">
            </div>
            <div>
              <label for="co-occasion">Occasion</label>
              <input type="text" id="co-occasion" placeholder="Birthday, sympathy, just because...">
            </div>
            <div class="full">
              <label for="co-card">Card message (free, hand-written)</label>
              <textarea id="co-card" placeholder="What should the card say?"></textarea>
            </div>
            <div class="full">
              <label>Add-ons (we'll confirm details &amp; pricing on the call)</label>
              <div class="co-addons">${addonBoxes}</div>
            </div>
            <div class="full">
              <label for="co-notes">Anything else? Colors, substitutions, special requests...</label>
              <textarea id="co-notes"></textarea>
            </div>
            <div class="full">
              <button type="submit" class="btn btn-primary" style="width:100%;">Place My Order</button>
            </div>
          </div>
          <p class="form-note">By placing your order you're reserving it — we'll call or text
          shortly to confirm everything and take payment. ${SHOP.noticeNote}</p>
        </form>
      </div>
    </div>`;

  /* qty buttons */
  rootEl.querySelectorAll("[data-qty]").forEach(b =>
    b.addEventListener("click", () => {
      const i = +b.getAttribute("data-qty");
      cartSetQty(i, cartItems()[i].qty + +b.getAttribute("data-d"));
      renderCartPage(rootEl);
    })
  );

  /* delivery fee → estimated total */
  const methodSel = rootEl.querySelector("#co-method");
  const updateFee = () => {
    const opt = methodSel.selectedOptions[0];
    const fee = opt ? +(opt.getAttribute("data-fee") || 0) : 0;
    const isDelivery = opt && opt.value.startsWith("Delivery");
    rootEl.querySelectorAll(".co-delivery").forEach(d => (d.style.display = isDelivery ? "" : "none"));
    const row = rootEl.querySelector("#cart-delivery-row");
    row.style.display = fee ? "flex" : "none";
    rootEl.querySelector("#cart-delivery-fee").textContent = "$" + fee;
    rootEl.querySelector("#cart-grand").textContent = "$" + (subtotal + fee) + (hasQuoted ? " + custom items" : "");
  };
  methodSel.addEventListener("change", updateFee);
  updateFee();

  /* submit */
  rootEl.querySelector("#checkout-form").addEventListener("submit", async e => {
    e.preventDefault();
    const v = id => (rootEl.querySelector("#" + id) || {}).value || "";
    const addons = [...rootEl.querySelectorAll('input[name="addon"]:checked')].map(a => a.value);
    const orderLines = cartItems().map(i => {
      const pr = cartLinePrice(i);
      return `• ${i.qty} × ${i.name}${i.size ? " (" + i.size + ")" : ""} — ${pr !== null ? "$" + pr * i.qty : "price TBD"}`;
    });
    const summary = [
      "NEW ONLINE ORDER — Flowers Etc. website",
      "",
      "ITEMS:", ...orderLines,
      "Items subtotal: $" + subtotal + (hasQuoted ? " (plus custom-priced items)" : ""),
      "",
      "CUSTOMER: " + v("co-name"),
      "Phone: " + v("co-phone"),
      "Email: " + (v("co-email") || "—"),
      "Method: " + v("co-method"),
      "Recipient: " + (v("co-recipient") || "—"),
      "Address: " + (v("co-address") || "—"),
      "Date needed: " + (v("co-date") || "—"),
      "Occasion: " + (v("co-occasion") || "—"),
      "Card message: " + (v("co-card") || "—"),
      "Add-ons: " + (addons.length ? addons.join("; ") : "none"),
      "Notes: " + (v("co-notes") || "—"),
    ].join("\n");

    let sent = false;
    if (!ORDER_FORM_ACTION.includes("YOUR_FORM_ID")) {
      try {
        const res = await fetch(ORDER_FORM_ACTION, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ _subject: "🌸 New online order from " + v("co-name"), order: summary }),
        });
        sent = res.ok;
      } catch (err) { sent = false; }
    }

    if (!sent) {
      // fallback: open the customer's email app with the whole order written out
      location.href = `mailto:${SHOP.email}?subject=${encodeURIComponent("Online order from " + v("co-name"))}&body=${encodeURIComponent(summary)}`;
    }

    cartClear();
    rootEl.innerHTML = `
      <div class="container" style="padding:70px 22px; text-align:center; max-width:640px;">
        <div style="font-size:2.8rem;">💐</div>
        <h1>${sent ? "Your order is in!" : "One more tap — hit Send"}</h1>
        <p style="margin:14px 0 8px; color:#5A665F; line-height:1.7;">
          ${sent
            ? "Thank you! We'll call or text you shortly to confirm every detail and take payment — nothing has been charged online."
            : "Your email app just opened with your whole order written out — press <strong>Send</strong> and it's on its way to us. We'll call or text you to confirm every detail and take payment."}
        </p>
        <p style="margin-bottom:28px; color:#5A665F;">Need it fast or thought of something?
          Call or text <a href="tel:${SHOP.phoneHref}" style="font-weight:700;">${SHOP.phone}</a>.</p>
        <a class="btn btn-primary" href="shop.html">Keep Browsing</a>
      </div>`;
    window.scrollTo(0, 0);
  });
}
