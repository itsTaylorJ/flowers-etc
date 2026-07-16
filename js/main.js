/* ============================================================
   FLOWERS ETC — SITE LOGIC
   You should rarely need to edit this file. All content lives
   in js/data.js.
   ============================================================ */

(function () {
  /* ---------- Header & footer (rendered once, used on every page) ---------- */
  const page = document.body.dataset.page || "";

  const headerHTML = `
    <div class="topbar">
      🌸 Call us to order: <a href="tel:${SHOP.phoneHref}">${SHOP.phone}</a>
      &nbsp;·&nbsp; Local delivery to ${SHOP.deliveryArea}
    </div>
    <header class="site">
      <div class="nav-wrap">
        <a class="brand" href="index.html">
          <span class="brand-flower">✿</span>
          <span class="brand-name">${SHOP.name}</span>
        </a>
        <button class="nav-toggle" aria-label="Open menu">☰</button>
        <nav class="main-nav">
          <a href="index.html"    data-nav="home">Home</a>
          <a href="shop.html"     data-nav="shop">Shop Flowers</a>
          <a href="services.html" data-nav="services">Services</a>
          <a href="about.html"    data-nav="about">About Us</a>
          <a href="contact.html"  data-nav="contact">Contact</a>
        </nav>
      </div>
    </header>`;

  const socialLinks = [
    SHOP.facebook ? `<li><a href="${SHOP.facebook}" target="_blank" rel="noopener">Facebook</a></li>` : "",
    SHOP.instagram ? `<li><a href="${SHOP.instagram}" target="_blank" rel="noopener">Instagram</a></li>` : "",
  ].join("");

  const footerHTML = `
    <footer class="site">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h4>${SHOP.name}</h4>
            <p>${SHOP.tagline}</p>
            <p style="margin-top:10px;">${SHOP.address}<br>${SHOP.cityStateZip}<br>
            <a href="tel:${SHOP.phoneHref}">${SHOP.phone}</a></p>
          </div>
          <div>
            <h4>Visit</h4>
            <ul>
              <li><a href="shop.html">Shop Flowers</a></li>
              <li><a href="services.html">Our Services</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="contact.html">Contact</a></li>
              ${socialLinks}
            </ul>
          </div>
          <div>
            <h4>Hours</h4>
            <ul>
              ${SHOP.hours.map(h => `<li>${h.days}: ${h.time}</li>`).join("")}
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          © ${new Date().getFullYear()} ${SHOP.name} · ${SHOP.cityStateZip} · All rights reserved
        </div>
      </div>
    </footer>`;

  document.getElementById("site-header").innerHTML = headerHTML;
  document.getElementById("site-footer").innerHTML = footerHTML;

  // Highlight the current page in the nav
  const active = document.querySelector(`[data-nav="${page}"]`);
  if (active) active.classList.add("active");

  // Mobile menu
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("nav.main-nav");
  toggle.addEventListener("click", () => nav.classList.toggle("open"));

  /* ---------- Fill any element marked with data-shop ---------- */
  // e.g. <span data-shop="phone"></span> becomes the phone number
  document.querySelectorAll("[data-shop]").forEach(el => {
    const key = el.dataset.shop;
    if (SHOP[key] !== undefined) el.textContent = SHOP[key];
  });
  document.querySelectorAll("[data-shop-tel]").forEach(el => {
    el.setAttribute("href", "tel:" + SHOP.phoneHref);
    if (!el.textContent.trim()) el.textContent = SHOP.phone;
  });

  /* ---------- Helpers ---------- */
  window.formatPrice = p => (typeof p === "number" ? "$" + p.toFixed(0) : p);

  window.productMedia = p =>
    p.image
      ? `<img class="p-photo" src="images/${p.image}" alt="${p.name}">`
      : `<div class="ph"><span class="ph-icon">✿</span><span>Photo coming soon</span></div>`;
})();

/* ============================================================
   PRODUCT GRID + FILTERS (shop page)
   ============================================================ */
function renderShop(gridEl, filterEl) {
  const params = new URLSearchParams(location.search);
  let current = params.get("cat") || "all";

  function drawFilters() {
    const btns = [{ id: "all", name: "All Flowers" }, ...CATEGORIES];
    filterEl.innerHTML = btns
      .map(c => `<button class="filter-btn ${c.id === current ? "active" : ""}" data-cat="${c.id}">${c.name}</button>`)
      .join("");
    filterEl.querySelectorAll(".filter-btn").forEach(b =>
      b.addEventListener("click", () => {
        current = b.dataset.cat;
        history.replaceState(null, "", current === "all" ? "shop.html" : `shop.html?cat=${current}`);
        drawFilters();
        drawGrid();
      })
    );
  }

  function drawGrid() {
    const items = PRODUCTS.filter(p => current === "all" || p.category === current);
    const catName = id => (CATEGORIES.find(c => c.id === id) || {}).name || "";
    gridEl.innerHTML = items
      .map((p, i) => `
        <article class="product-card">
          ${productMedia(p)}
          <div class="p-body">
            <div class="p-cat">${catName(p.category)}</div>
            <h3>${p.name}</h3>
            <div class="p-price">${formatPrice(p.price)}</div>
            ${p.order === "custom" ? `<span class="badge-custom">Custom — call to order</span>` : ""}
            <p class="p-desc">${p.desc}</p>
            <div class="p-actions">
              <button class="btn btn-primary btn-sm" data-order="${PRODUCTS.indexOf(p)}">
                ${p.order === "buy" && p.buyLink ? "Buy Now" : p.order === "buy" ? "Order This" : "Call to Order"}
              </button>
            </div>
          </div>
        </article>`)
      .join("");

    gridEl.querySelectorAll("[data-order]").forEach(b =>
      b.addEventListener("click", () => openOrderModal(PRODUCTS[+b.dataset.order]))
    );
  }

  drawFilters();
  drawGrid();
}

/* ============================================================
   ORDER MODAL
   - "buy" products with a buyLink  → Buy Now button (payment link)
   - "buy" without a link yet       → phone + inquiry fallback
   - "custom" products              → phone-first with explanation
   ============================================================ */
function openOrderModal(p) {
  let backdrop = document.querySelector(".modal-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    document.body.appendChild(backdrop);
    backdrop.addEventListener("click", e => {
      if (e.target === backdrop) backdrop.classList.remove("open");
    });
  }

  const canBuyOnline = p.order === "buy" && p.buyLink;
  const inquiryHref = `contact.html?arrangement=${encodeURIComponent(p.name)}`;

  backdrop.innerHTML = `
    <div class="modal">
      <button class="m-close" aria-label="Close">✕</button>
      <h3>${p.name}</h3>
      <div class="m-price">${formatPrice(p.price)}</div>
      <p>${p.desc}</p>
      ${
        p.order === "custom"
          ? `<div class="m-phone-note">This arrangement is made to order. Give us a quick call so we can
             talk through colors, sizing, and delivery — we love getting the details just right.</div>`
          : canBuyOnline
          ? ""
          : `<div class="m-phone-note">Online checkout for this arrangement is coming soon — for now,
             call us and we'll take your order over the phone in just a minute or two.</div>`
      }
      <div class="m-actions">
        ${canBuyOnline ? `<a class="btn btn-primary" href="${p.buyLink}" target="_blank" rel="noopener">Buy Now — Secure Checkout</a>` : ""}
        <a class="btn ${canBuyOnline ? "btn-outline" : "btn-primary"}" href="tel:${SHOP.phoneHref}">📞 Call ${SHOP.phone}</a>
        <a class="btn btn-outline" href="${inquiryHref}">Send an Inquiry Instead</a>
      </div>
    </div>`;

  backdrop.querySelector(".m-close").addEventListener("click", () => backdrop.classList.remove("open"));
  backdrop.classList.add("open");
}

/* ============================================================
   CONTACT PAGE — prefill the arrangement field from ?arrangement=
   ============================================================ */
function initContactForm() {
  const params = new URLSearchParams(location.search);
  const arrangement = params.get("arrangement");
  const field = document.getElementById("arrangement");
  if (arrangement && field) {
    field.value = arrangement;
    const msg = document.getElementById("message");
    if (msg && !msg.value) {
      msg.value = `Hi! I'm interested in ordering the "${arrangement}" arrangement.`;
    }
  }
}
