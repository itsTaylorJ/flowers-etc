/* ============================================================
   FLOWERS ETC — SITE LOGIC
   You should rarely need to edit this file. All content lives
   in js/data.js.
   ============================================================ */

(function () {
  const iconPaths = {
    flower: '<path d="M12 21v-8"/><path d="M12 13c-4.2 0-6.5-2.2-6.5-5.7 3.7-.2 6 1.7 6.5 5.7Z"/><path d="M12 13c4.2 0 6.5-2.2 6.5-5.7-3.7-.2-6 1.7-6.5 5.7Z"/><path d="M12 8.2c-2.4-1.9-2.5-4.3 0-6.2 2.5 1.9 2.4 4.3 0 6.2Z"/>',
    cart: '<circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M3 4h2l2.4 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    chevronDown: '<path d="m7 9 5 5 5-5"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    camera: '<path d="M4 8h3l1.5-2h7L17 8h3v11H4Z"/><circle cx="12" cy="13" r="3.2"/>',
    phone: '<path d="M7.2 3.8 4.5 5.2c-.8.4-1.1 1.3-.8 2.1 2.2 6 6.9 10.7 12.9 12.9.8.3 1.7 0 2.1-.8l1.4-2.7-4.1-2-1.1 1.6c-2.8-1.3-5-3.5-6.3-6.3l1.6-1.1-2-4.1Z"/>',
    message: '<path d="M4 5h16v11H9l-5 4Z"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    gift: '<path d="M4 10h16v10H4ZM3 7h18v3H3ZM12 7v13"/><path d="M12 7H8.5a2.5 2.5 0 1 1 2.5-2.5V7Zm0 0h3.5A2.5 2.5 0 1 0 13 4.5V7Z"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m4 7 8 6 8-6"/>',
    person: '<circle cx="12" cy="8" r="3.5"/><path d="M5 21c.6-4.4 3-6.5 7-6.5s6.4 2.1 7 6.5"/>',
    shop: '<path d="M4 10v10h16V10M3 10l2-6h14l2 6"/><path d="M3 10c0 1.5 1 2.5 2.5 2.5S8 11.5 8 10c0 1.5 1 2.5 2.5 2.5S13 11.5 13 10c0 1.5 1 2.5 2.5 2.5S18 11.5 18 10c0 1.5 1 2.5 2.5 2.5S23 11.5 23 10M9 20v-5h6v5"/>',
    star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h.01"/>',
  };
  window.siteIcon = (name, className = "") =>
    `<svg class="ui-icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${iconPaths[name] || iconPaths.info}</svg>`;

  /* ---------- Header & footer (rendered once, used on every page) ---------- */
  const page = document.body.dataset.page || "";

  const announcementHTML = SHOP.announcement
    ? `<div class="announce">${siteIcon("flower")}<span>${SHOP.announcement}</span></div>`
    : "";

  const headerHTML = `
    ${announcementHTML}
    <div class="topbar">
      <span>Flowers made in Canton</span>
      <span>Call or text <a href="tel:${SHOP.phoneHref}">${SHOP.phone}</a></span>
      <span>Local East Texas delivery</span>
    </div>
    <header class="site">
      <div class="nav-wrap">
        <a class="brand" href="index.html" aria-label="Flowers Etc. home">
          <img src="images/logo.png" width="1203" height="484" alt="Flowers Etc.">
        </a>
        <nav class="main-nav" id="main-navigation">
          <div class="nav-dropdown">
            <button class="nav-shop-toggle" type="button" data-nav="shop" aria-expanded="false" aria-controls="shop-navigation">Shop ${siteIcon("chevronDown")}</button>
            <div class="nav-submenu" id="shop-navigation">
              <a href="shop.html">Shop all flowers</a>
              <a href="shop.html?cat=sympathy">Sympathy &amp; funeral</a>
              <a href="shop.html?cat=everyday">Everyday flowers</a>
              <a href="shop.html?cat=gifts">Plants &amp; gifts</a>
              <a href="shop.html?cat=wedding">Wedding, prom &amp; personal flowers</a>
            </div>
          </div>
          <a href="services.html" data-nav="services">Services</a>
          <a href="gallery.html" data-nav="gallery">Our Work</a>
          <a href="about.html" data-nav="about">Lisa's Story</a>
          <a href="contact.html" data-nav="contact">Contact Us</a>
        </nav>
        <a class="cart-btn" href="cart.html" aria-label="Your order">${siteIcon("cart")}<span id="cart-count"></span></a>
        <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="main-navigation">${siteIcon("menu")}</button>
      </div>
    </header>`;

  const socialLinks = [
    SHOP.facebook ? `<li><a href="${SHOP.facebook}" target="_blank" rel="noopener noreferrer">Follow on Facebook</a></li>` : "",
    SHOP.facebookMessenger ? `<li><a href="${SHOP.facebookMessenger}" target="_blank" rel="noopener noreferrer">Message us on Facebook</a></li>` : "",
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
            Call or text: <a href="tel:${SHOP.phoneHref}">${SHOP.phone}</a>
            ${SHOP.email ? `<br><a href="mailto:${SHOP.email}">${SHOP.email}</a>` : ""}</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="shop.html">Shop Flowers</a></li>
              <li><a href="gallery.html">Our Work</a></li>
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
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  // Shop category menu: click/touch friendly, keyboard dismissible, and nested on mobile.
  const shopMenu = document.querySelector(".nav-dropdown");
  const shopToggle = document.querySelector(".nav-shop-toggle");
  const closeShopMenu = () => {
    shopMenu.classList.remove("open");
    shopToggle.setAttribute("aria-expanded", "false");
  };
  shopToggle.addEventListener("click", () => {
    const open = shopMenu.classList.toggle("open");
    shopToggle.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", event => {
    if (!shopMenu.contains(event.target)) closeShopMenu();
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    closeShopMenu();
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      if (shopMenu.classList.contains("open")) {
        closeShopMenu();
        shopToggle.focus();
      } else if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        toggle.focus();
      }
    }
  });

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
  document.querySelectorAll("[data-shop-sms]").forEach(el => {
    el.setAttribute("href", "sms:" + SHOP.phoneHref);
    if (!el.textContent.trim()) el.textContent = "Text " + SHOP.phone;
  });
  document.querySelectorAll("[data-shop-mail]").forEach(el => {
    if (!SHOP.email) {
      const container = el.closest(".email-only") || el;
      container.hidden = true;
      return;
    }
    el.setAttribute("href", "mailto:" + SHOP.email);
    if (!el.textContent.trim()) el.textContent = SHOP.email;
  });
  document.querySelectorAll("[data-icon]").forEach(el => {
    el.innerHTML = siteIcon(el.dataset.icon);
  });
  document.querySelectorAll("[data-rating-stars]").forEach(el => {
    const count = Math.max(0, Math.min(5, Number(el.dataset.ratingStars) || 0));
    el.innerHTML = Array.from({ length: count }, () => siteIcon("star")).join("");
  });

  /* ---------- Helpers ---------- */
  window.formatPrice = p => (typeof p === "number" ? "$" + p.toFixed(0) : p);

  window.productMedia = p =>
    p.image
      ? `<img class="p-photo" src="images/${p.image}" alt="${p.name}" loading="lazy" decoding="async">`
      : `<div class="ph"><span class="ph-icon">${siteIcon("flower")}</span><span>Photo coming soon</span></div>`;

  // URL-friendly id for a product, e.g. "Casket Spray" -> "casket-spray"
  window.slugify = s =>
    s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  window.productBySlug = slug => {
    const aliases = {
      "cemetery-flowers-and-subscriptions": "cemetery-flower-replacement",
      "designers-choice": "custom-arrangement",
      "bridal-bouquet": "wedding-flowers-and-floral-design",
      "full-wedding-package": "wedding-flowers-and-floral-design",
      // Catalog reconstruction: retired listings point to their successors.
      "rose-bouquet": "classic-red-rose-arrangement",
      "sunshine-morning": "golden-morning",
      "garden-romance": "blush-rose-vase",
      "birthday-blooms": "purple-birthday-basket",
      "get-well-soon": "coral-gerbera-garden",
      "casket-spray": "gentle-pink-garden",
      "standing-spray": "sunflower-farewell",
      "sympathy-wreaths-and-hearts": "blush-remembrance-wreath",
      "memory-cross": "cross-of-color",
      "standing-wooden-cross": "standing-cross-keepsake",
      "wall-crosses-and-keepsakes": "memorial-plaques",
      "friendship-gifts": "friendship-keepsakes",
      "plants-and-dish-gardens": "classic-dish-garden",
      "prom-and-homecoming": "blush-tulip-corsage",
      "peaceful-garden-basket": "garden-sympathy-basket",
    };
    const resolvedSlug = aliases[slug] || slug;
    return PRODUCTS.find(p => slugify(p.name) === resolvedSlug);
  };
  window.productUrl = p => `product.html?p=${slugify(p.name)}`;

  /* ---------- Seasonal pricing engine ----------
     Seasons are date ranges in data.js that switch themselves on and off.
     Price priority:  salePrice (manual)  >  season override  >  base price
  ------------------------------------------------------------------- */
  function todayMMDD() {
    const d = new Date();
    return String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  window.activeSeason = function () {
    if (typeof SEASONS === "undefined") return null;
    const t = todayMMDD();
    return (
      SEASONS.find(s => {
        if (s.enabled === false) return false;
        // normal range, or one that wraps the new year (e.g. 12-20 → 01-05)
        return s.start <= s.end ? t >= s.start && t <= s.end : t >= s.start || t <= s.end;
      }) || null
    );
  };

  // Returns { price, was, badge, sizes } — `was` is the struck-through old price
  window.resolvePrice = function (p) {
    const season = activeSeason();
    const override = season && season.prices ? season.prices[p.name] : undefined;

    // Products with size tiers
    if (p.sizes && p.sizes.length) {
      const sizes = p.sizes.map(s => {
        const seasonal = override && typeof override === "object" ? override[s.label] : undefined;
        const price = seasonal !== undefined ? seasonal : s.price;
        return { label: s.label, price, was: seasonal !== undefined && seasonal !== s.price ? s.price : null };
      });
      const low = Math.min(...sizes.map(s => s.price));
      return {
        price: "From $" + low,
        was: null,
        badge: override ? season.name + " pricing" : null,
        sizes,
      };
    }

    // Manual sale wins over everything
    if (p.salePrice !== undefined && p.salePrice !== null) {
      return {
        price: formatPrice(p.salePrice),
        was: formatPrice(p.price),
        badge: p.saleNote || "Sale",
        sizes: null,
      };
    }

    if (override !== undefined && typeof override !== "object") {
      return {
        price: formatPrice(override),
        was: override !== p.price ? formatPrice(p.price) : null,
        badge: season.name + " pricing",
        sizes: null,
      };
    }

    return { price: formatPrice(p.price), was: null, badge: null, sizes: null };
  };

  // Price block markup shared by cards and the detail page
  window.priceHTML = function (p) {
    const r = resolvePrice(p);
    return (
      `<span class="price-now">${r.price}</span>` +
      (r.was ? ` <span class="price-was">${r.was}</span>` : "") +
      (r.badge ? ` <span class="price-badge">${r.badge}</span>` : "")
    );
  };

  /* ---------- Seasonal banner (fills in when no manual announcement) ---------- */
  const season = activeSeason();
  if (!SHOP.announcement && season && season.banner) {
    const bar = document.querySelector(".announce");
    const html = `<div class="announce">${siteIcon("flower")}<span>${season.banner}</span></div>`;
    if (bar) bar.outerHTML = html;
    else document.getElementById("site-header").insertAdjacentHTML("afterbegin", html);
  }
})();

/* ============================================================
   PRODUCT GRID + FILTERS (shop page)
   ============================================================ */
function renderShop(gridEl, filterEl) {
  const params = new URLSearchParams(location.search);
  // Older links used the retired "seasonal" and "extras" category ids.
  const catAliases = { seasonal: "everyday", extras: "gifts" };
  const rawCat = params.get("cat") || "all";
  let current = catAliases[rawCat] || rawCat;
  let currentSub = params.get("sub") || "all";
  const sympathyGuide = document.getElementById("sympathy-guide");

  // Sub-filter bar (Sympathy & funeral only) lives right under the category bar.
  let subFilterEl = document.getElementById("sub-filter-bar");
  if (!subFilterEl) {
    subFilterEl = document.createElement("div");
    subFilterEl.id = "sub-filter-bar";
    subFilterEl.className = "sub-filter-bar";
    subFilterEl.setAttribute("aria-label", "Sympathy & funeral categories");
    filterEl.insertAdjacentElement("afterend", subFilterEl);
  }

  function shopUrl() {
    if (current === "all") return "shop.html";
    let url = `shop.html?cat=${current}`;
    if (current === "sympathy" && currentSub !== "all") url += `&sub=${currentSub}`;
    return url;
  }

  function drawFilters() {
    const btns = [{ id: "all", name: "All Flowers & Gifts" }, ...CATEGORIES];
    filterEl.innerHTML = btns
      .map(c => `<button class="filter-btn ${c.id === current ? "active" : ""}" data-cat="${c.id}">${c.name}</button>`)
      .join("");
    filterEl.querySelectorAll(".filter-btn").forEach(b =>
      b.addEventListener("click", () => {
        current = b.dataset.cat;
        currentSub = "all";
        history.replaceState(null, "", shopUrl());
        drawFilters();
        drawSubFilters();
        drawGrid();
      })
    );
  }

  function drawSubFilters() {
    if (current !== "sympathy" || typeof SYMPATHY_SUBCATS === "undefined") {
      subFilterEl.hidden = true;
      subFilterEl.innerHTML = "";
      return;
    }
    subFilterEl.hidden = false;
    subFilterEl.innerHTML = SYMPATHY_SUBCATS
      .map(s => `<button class="filter-btn ${s.id === currentSub ? "active" : ""}" data-sub="${s.id}" aria-pressed="${s.id === currentSub}">${s.name}</button>`)
      .join("");
    subFilterEl.querySelectorAll(".filter-btn").forEach(b =>
      b.addEventListener("click", () => {
        currentSub = b.dataset.sub;
        history.replaceState(null, "", shopUrl());
        drawSubFilters();
        drawGrid();
      })
    );
  }

  function drawGrid() {
    if (sympathyGuide) sympathyGuide.hidden = current !== "sympathy";
    const inCategory = p => current === "all" || p.category === current || (p.collections || []).includes(current);
    const inSub = p => current !== "sympathy" || currentSub === "all" || p.subcat === currentSub;
    const filtered = PRODUCTS.filter(p => inCategory(p) && inSub(p));
    // Products still waiting on photos sink to the bottom (they stay
    // orderable — a "coming soon" card gets people asking).
    const items = [...filtered.filter(p => p.image), ...filtered.filter(p => !p.image)];
    const catName = id => (CATEGORIES.find(c => c.id === id) || {}).name || "";
    gridEl.innerHTML = items
      .map((p, i) => `
        <article class="product-card">
          <a class="p-media-link" href="${productUrl(p)}" aria-label="${p.name} details">
            ${productMedia(p)}
          </a>
          <div class="p-body">
            <div class="p-cat">${catName(p.category)}</div>
            <h3><a class="p-title-link" href="${productUrl(p)}">${p.name}</a></h3>
            <div class="p-price">${priceHTML(p)}</div>
            ${p.draft ? `<span class="badge-draft">Draft listing — pending Lisa's approval</span>` : ""}
            ${p.order === "custom" ? `<span class="badge-custom">Custom — call to order</span>` : ""}
            <p class="p-desc">${p.desc}</p>
            <div class="p-actions">
              ${p.order === "custom"
                ? `<a class="btn btn-primary btn-sm" href="tel:${SHOP.phoneHref}">${siteIcon("phone")} Call the Shop to Request This Design</a>`
                : `<a class="btn btn-primary btn-sm" href="${productUrl(p)}">Choose Details</a>`}
              <a class="btn btn-outline btn-sm" href="${productUrl(p)}">View Details</a>
            </div>
          </div>
        </article>`)
      .join("");

    gridEl.querySelectorAll("[data-order]").forEach(b =>
      b.addEventListener("click", () => openOrderModal(PRODUCTS[+b.dataset.order]))
    );
  }

  drawFilters();
  drawSubFilters();
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

  const colorsHTML = p.colors && p.colors.length
    ? `<div class="m-colors"><strong>Color options:</strong><br>
       ${p.colors.map(c => `<span class="chip">${c}</span>`).join("")}</div>`
    : "";

  const addonsHTML = typeof ADDONS !== "undefined" && ADDONS.length
    ? `<div class="m-addons"><strong>Popular add-ons:</strong>
       ${ADDONS.map(a => `${a.name} <em>(${a.price})</em>`).join(" · ")}</div>`
    : "";

  backdrop.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="Order ${p.name}">
      <button class="m-close" aria-label="Close">${siteIcon("close")}</button>
      <h3>${p.name}</h3>
      <div class="m-price">${priceHTML(p)}</div>
      <p>${p.desc}</p>
      <p style="margin-bottom:14px;"><a href="${productUrl(p)}" style="font-weight:700;">See full details &amp; add-ons →</a></p>
      ${p.notice ? `<div class="m-notice">${siteIcon("clock")}<span>${p.notice}</span></div>` : ""}
      ${colorsHTML}
      ${
        p.order === "custom"
          ? `<div class="m-phone-note">This one is made to order. Call or text us so we can
             talk through colors, sizing, and delivery — we love getting the details just right.</div>`
          : canBuyOnline
          ? ""
          : `<div class="m-phone-note">Online checkout for this arrangement is coming soon — for now,
             call or text us and we'll take your order in just a minute or two.</div>`
      }
      ${addonsHTML}
      ${SHOP.customizeNote ? `<div class="m-customize">${siteIcon("flower")}<span>${SHOP.customizeNote}</span></div>` : ""}
      <div class="m-photos">${siteIcon("camera")}<span>Have a photo of something you love — a Pinterest find, a past
        arrangement, or the dress? <a href="sms:${SHOP.phoneHref}">Text it to us</a>
        and we'll use it as design direction.</span></div>
      ${p.order !== "custom" ? `<div class="m-instructions">
        <label for="m-instructions">Flower, color, or item requests <span>(optional)</span></label>
        <textarea id="m-instructions" maxlength="500" placeholder="Preferred flowers or colors, a stuffed animal request, or anything our team should check for you..."></textarea>
        <small>A member of our team will confirm availability before the order is finalized.</small>
      </div>` : ""}
      <div class="m-actions">
        ${p.order === "custom"
          ? `<a class="btn btn-primary" href="tel:${SHOP.phoneHref}">${siteIcon("phone")} Call the Shop to Request This Design</a>`
          : `<button class="btn btn-primary" data-cart-add="${p.name}" data-instructions="#m-instructions">${siteIcon("cart")} Add to Cart — Order Online</button>`}
        ${canBuyOnline ? `<a class="btn btn-outline" href="${p.buyLink}" target="_blank" rel="noopener">Buy Now — Secure Checkout</a>` : ""}
        <a class="btn btn-outline" href="sms:${SHOP.phoneHref}">${siteIcon("message")} ${p.order === "custom" ? "Text Us About This Design" : "Text Us Your Order"}</a>
        <a class="btn btn-outline" href="${inquiryHref}">Send an Inquiry Instead</a>
      </div>
    </div>`;

  backdrop.querySelector(".m-close").addEventListener("click", () => backdrop.classList.remove("open"));
  backdrop.classList.add("open");
}

/* ============================================================
   GALLERY GRID (Our Work page)
   ============================================================ */
function renderGallery(gridEl) {
  const controls = document.getElementById("gallery-filters");
  const tags = [...new Set(GALLERY.map(g => g.tag))];
  const draw = activeTag => {
    gridEl.innerHTML = GALLERY.filter(g => !activeTag || g.tag === activeTag).map(g => `
    <figure class="gallery-card">
      ${g.image
        ? `<img src="images/${g.image}" alt="${g.caption}" loading="lazy">`
        : `<div class="ph"><span class="ph-icon">${siteIcon("flower")}</span><span>Photo coming soon</span></div>`}
      <figcaption>
        <span class="g-tag">${g.tag}</span>
        ${g.caption}
      </figcaption>
    </figure>`).join("");
  };

  draw("");
  if (!controls) return;
  controls.innerHTML = [`<button type="button" class="active" data-gallery-tag="" aria-pressed="true">All work</button>`]
    .concat(tags.map(tag => `<button type="button" data-gallery-tag="${tag}" aria-pressed="false">${tag}</button>`))
    .join("");
  controls.addEventListener("click", e => {
    const button = e.target.closest("[data-gallery-tag]");
    if (!button) return;
    controls.querySelectorAll("button").forEach(item => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    draw(button.getAttribute("data-gallery-tag"));
  });
}

/* ============================================================
   PRODUCT DETAIL PAGE (product.html?p=slug)
   ============================================================ */
function renderProductPage(rootEl) {
  const slug = new URLSearchParams(location.search).get("p") || "";
  const p = productBySlug(slug);

  // Unknown product — never echo the raw URL value back into the page
  if (!p) {
    rootEl.innerHTML = `
      <div class="container" style="padding:70px 22px; text-align:center;">
        <h1>We couldn't find that one</h1>
        <p style="margin:12px 0 24px; color:#5A665F;">It may have been renamed or is no longer offered.</p>
        <a class="btn btn-primary" href="shop.html">Browse All Flowers</a>
      </div>`;
    return;
  }

  document.title = `${p.name} — Flowers Etc. | Canton, TX`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", p.desc);

  // GitHub Pages serves one static product.html file. Static social crawlers
  // receive the honest generic fallback in product.html; browsers and search
  // engines that render JavaScript receive canonical, product-specific metadata.
  const canonicalURL = new URL(productUrl(p), location.href).href;
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalURL;

  const setOpenGraph = (property, content) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("property", property);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  };
  setOpenGraph("og:title", `${p.name} — Flowers Etc.`);
  setOpenGraph("og:description", p.desc);
  setOpenGraph("og:type", "product");
  setOpenGraph("og:url", canonicalURL);
  if (p.image) {
    setOpenGraph("og:image", new URL(`images/${p.image}`, location.href).href);
    setOpenGraph("og:image:alt", `${p.name} designed by Flowers Etc. in Canton, Texas`);
  }

  const cat = CATEGORIES.find(c => c.id === p.category) || {};
  const r = resolvePrice(p);
  const canBuyOnline = p.order === "buy" && p.buyLink;

  /* --- photos: main + truthful examples or rotating inventory --- */
  const shotFiles = [p.image, ...(p.photos || [])].filter(Boolean);
  const galleryKind = p.galleryKind === "inventory" ? "inventory" : "examples";
  const galleryCopy = galleryKind === "inventory"
    ? {
        title: "Shop inventory examples",
        primary: "Representative item from Flowers Etc. Call to confirm the exact style currently available.",
        extra: "Past or current Flowers Etc. inventory. Styles rotate, so our team will confirm the exact item before the order is made.",
      }
    : {
        title: "Past work & style examples",
        primary: "Representative Flowers Etc. design. Every arrangement is made by hand, so flowers, colors, and shape may vary.",
        extra: "Past Flowers Etc. work for style inspiration. Flower availability, colors, scale, and exact design will vary.",
      };
  const shots = shotFiles.map((src, i) => ({
    src,
    alt: i === 0
      ? `${p.name} designed by Flowers Etc. in Canton, Texas`
      : `${p.name} ${galleryKind === "inventory" ? "inventory" : "style"} example ${i + 1} from Flowers Etc.`,
    caption: i === 0 ? galleryCopy.primary : galleryCopy.extra,
  }));
  const mainShot = shots.length
    ? `<div class="pd-stage">
         <button type="button" class="pd-main-button" id="pd-open-photo" aria-label="Open a larger view of ${p.name}" aria-describedby="pd-photo-caption">
           <img id="pd-main" src="images/${shots[0].src}" alt="${shots[0].alt}" decoding="async">
           <span class="pd-zoom-hint" aria-hidden="true">View larger</span>
         </button>
         ${shots.length > 1 ? `<button type="button" class="pd-gallery-arrow pd-gallery-prev" data-gallery-step="-1" aria-label="Previous ${p.name} photo">‹</button>
         <button type="button" class="pd-gallery-arrow pd-gallery-next" data-gallery-step="1" aria-label="Next ${p.name} photo">›</button>` : ""}
       </div>`
    : `<div class="ph" style="aspect-ratio:1/1;"><span class="ph-icon">${siteIcon("flower")}</span><span>Photo coming soon</span></div>`;
  const thumbs = shots.length > 1
    ? `<div class="pd-thumbs" aria-label="Choose a ${p.name} photo">${shots
        .map((shot, i) => `<button type="button" class="pd-thumb ${i === 0 ? "active" : ""}" data-index="${i}" aria-label="Show ${p.name} photo ${i + 1}" aria-current="${i === 0 ? "true" : "false"}">
             <img src="images/${shot.src}" alt="" loading="lazy" decoding="async"></button>`)
        .join("")}</div>`
    : "";
  const photoSummary = shots.length
    ? `<div class="pd-photo-summary">
         <div><strong>${galleryCopy.title}</strong><span id="pd-photo-count">1 of ${shots.length}</span></div>
         <p id="pd-photo-caption" aria-live="polite">${shots[0].caption}</p>
       </div>`
    : "";
  const lightboxHTML = shots.length
    ? `<dialog class="pd-lightbox" id="pd-lightbox" aria-labelledby="pd-lightbox-title">
         <div class="pd-lightbox-shell">
           <h2 id="pd-lightbox-title" class="sr-only">${p.name} photo gallery</h2>
           <button type="button" class="pd-lightbox-close" aria-label="Close larger photo">Close</button>
           <img id="pd-lightbox-image" src="images/${shots[0].src}" alt="${shots[0].alt}">
           <div class="pd-lightbox-footer">
             ${shots.length > 1 ? `<button type="button" data-lightbox-step="-1" aria-label="Previous photo">← Previous</button>` : "<span></span>"}
             <p id="pd-lightbox-caption">${shots[0].caption}</p>
             ${shots.length > 1 ? `<button type="button" data-lightbox-step="1" aria-label="Next photo">Next →</button>` : "<span></span>"}
           </div>
         </div>
       </dialog>`
    : "";

  /* --- sizes --- */
  const sizesHTML = r.sizes
    ? `<div class="pd-block">
         <h3>Choose a size</h3>
         <div class="pd-sizes">
           ${r.sizes.map((s, i) => `
             <label class="pd-size">
               <input type="radio" name="pdsize" value="${s.label}" ${i === 1 || r.sizes.length === 1 ? "checked" : ""}>
               <span class="pd-size-label">${s.label}</span>
               <span class="pd-size-price">$${s.price}${s.was ? ` <s>$${s.was}</s>` : ""}</span>
             </label>`).join("")}
         </div>
       </div>`
    : "";

  /* --- design coverage / size guidance (catalog-reconstruction listings) --- */
  const coverageHTML = p.coverageOptions && p.coverageOptions.length
    ? `<div class="pd-block">
         <h3>${p.coverageLabel || "Options"}</h3>
         <ul class="pd-flowers">${p.coverageOptions.map(o => `<li>${o}</li>`).join("")}</ul>
         <p class="pd-sub">Mention the direction you'd like in your requests below — a member of our team will confirm the exact ${(p.coverageLabel || "details").toLowerCase()} and final price with you before anything is made.</p>
       </div>`
    : "";

  /* --- flowers --- */
  const flowersHTML = p.flowers && p.flowers.length
    ? `<div class="pd-block">
         <h3>What's in it</h3>
         <ul class="pd-flowers">${p.flowers.map(f => `<li>${f}</li>`).join("")}</ul>
         ${SHOP.substitutionNote ? `<p class="pd-sub">${SHOP.substitutionNote}</p>` : ""}
       </div>`
    : "";

  /* --- colors --- */
  const colorsHTML = p.colors && p.colors.length
    ? `<div class="pd-block">
         <h3>Color options</h3>
         <div>${p.colors.map(c => `<span class="chip">${c}</span>`).join("")}</div>
       </div>`
    : "";

  const instructionsHTML = p.order !== "custom"
    ? `<div class="pd-block pd-instructions">
         <label for="pd-instructions">Flower, color, or item requests <span>(optional)</span></label>
         <textarea id="pd-instructions" maxlength="500" placeholder="Preferred flowers or colors, a stuffed animal request, or anything our team should check for you..."></textarea>
         <small>Requests depend on season and current inventory. A member of our team will confirm what is available before the order is finalized.</small>
       </div>`
    : "";

  /* --- add-ons --- */
  const addonsHTML = typeof ADDONS !== "undefined" && ADDONS.length
    ? `<div class="pd-block pd-addons">
         <h3>Make it extra special</h3>
         <ul class="pd-addon-list">
           ${ADDONS.map((a, index) => `
             <li>
               <div class="pd-addon-copy">
                 <span class="pd-addon-name">${a.name}${a.customizable ? ` <em>customizable</em>` : ""}</span>
                 ${a.note ? `<small>${a.note}</small>` : ""}
               </div>
               <span class="pd-addon-price">${a.price}</span>
               <button type="button" class="pd-addon-add${a.requestOnly ? " is-request" : ""}" data-addon-add="${index}">${a.requestOnly ? "Request current options" : a.amount === 0 ? "Add free" : `Add $${a.amount}`}</button>
             </li>`).join("")}
         </ul>
         ${typeof ADDON_PROMISE !== "undefined"
            ? `<div class="pd-promise"><strong>${siteIcon("phone")} We always confirm before we create.</strong> ${ADDON_PROMISE}</div>`
            : ""}
       </div>`
    : "";

  /* --- related --- */
  const related = PRODUCTS.filter(x => x.category === p.category && x.name !== p.name).slice(0, 4);
  const relatedHTML = related.length
    ? `<section class="block" style="border-top:1px solid var(--line);">
         <div class="container">
           <div class="section-head"><div class="flourish">You might also like</div><h2>More ${cat.name || "Flowers"}</h2></div>
           <div class="product-grid">
             ${related.map(x => `
               <article class="product-card">
                 <a class="p-media-link" href="${productUrl(x)}">${productMedia(x)}</a>
                 <div class="p-body">
                   <h3><a class="p-title-link" href="${productUrl(x)}">${x.name}</a></h3>
                   <div class="p-price">${priceHTML(x)}</div>
                   <p class="p-desc">${x.desc}</p>
                   <div class="p-actions"><a class="btn btn-outline btn-sm" href="${productUrl(x)}">View Details</a></div>
                 </div>
               </article>`).join("")}
           </div>
         </div>
       </section>`
    : "";

  rootEl.innerHTML = `
    <div class="container">
      <nav class="pd-crumbs">
        <a href="shop.html">Shop</a> ›
        <a href="shop.html?cat=${p.category}">${cat.name || ""}</a> ›
        <span>${p.name}</span>
      </nav>

      <div class="pd-wrap">
        <div class="pd-media">
          ${mainShot}
          ${thumbs}
          ${photoSummary}
        </div>

        <div class="pd-info">
          <div class="p-cat">${cat.name || ""}</div>
          <h1>${p.name}</h1>
          <div class="pd-price">${priceHTML(p)}</div>
          ${p.draft ? `<div class="pd-draft-note">${siteIcon("info")}<span>${p.draftNote || "This listing is being finalized: the name and starting price are drafts awaiting Lisa's approval. A member of our team confirms every detail and the final price with you before any order is completed."}</span></div>` : ""}
          ${p.order === "custom" ? `<span class="badge-custom">Custom — we design it with you</span>` : ""}
          <p class="pd-desc">${p.desc}</p>
          ${p.notice ? `<div class="pd-notice">${siteIcon("clock")}<span>${p.notice}</span></div>` : ""}

          ${sizesHTML}
          ${coverageHTML}
          ${flowersHTML}
          ${colorsHTML}
          ${instructionsHTML}

          <div class="pd-actions">
            ${p.order === "custom"
              ? `<a class="btn btn-primary" href="tel:${SHOP.phoneHref}">${siteIcon("phone")} Call the Shop to Request This Design</a>
                 <a class="btn btn-outline" href="sms:${SHOP.phoneHref}">${siteIcon("message")} Text Us About This Design</a>
                 <a class="btn btn-outline" href="contact.html?arrangement=${encodeURIComponent(p.name)}">Send a Custom-Order Inquiry</a>`
              : `<button class="btn btn-primary" data-cart-add="${p.name}" data-instructions="#pd-instructions">${siteIcon("cart")} Add to Cart — Order Online</button>
                 ${canBuyOnline ? `<a class="btn btn-outline" href="${p.buyLink}" target="_blank" rel="noopener">Buy Now — Secure Checkout</a>` : ""}
                 <a class="btn btn-blush" href="tel:${SHOP.phoneHref}">${siteIcon("phone")} Call ${SHOP.phone}</a>
                 <a class="btn btn-outline" href="sms:${SHOP.phoneHref}">${siteIcon("message")} Text Us Your Order</a>
                 <a class="btn btn-outline" href="contact.html?arrangement=${encodeURIComponent(p.name)}">Send an Inquiry</a>`}
          </div>

          <div class="pd-reassure">
            <div><strong>Same-day requests</strong> by 2:30 PM weekdays · 10 AM Saturday</div>
            <div><strong>Hand-delivered</strong> across ${SHOP.deliveryArea}</div>
            <div><strong>A real person</strong> from our Canton shop answers</div>
          </div>

          <div class="pd-block pd-goodtoknow">
            <h3>Good to know</h3>
            ${SHOP.customizeNote ? `<div class="pd-gtk-item">${siteIcon("flower")}<p>${SHOP.customizeNote}</p></div>` : ""}
            ${SHOP.noticeNote ? `<div class="pd-gtk-item">${siteIcon("clock")}<p>${SHOP.noticeNote}</p></div>` : ""}
            ${SHOP.deliveryPhotoNote ? `<div class="pd-gtk-item">${siteIcon("camera")}<p>${SHOP.deliveryPhotoNote}</p></div>` : ""}
          </div>

          ${addonsHTML}

          <div class="pd-photos-note">${siteIcon("camera")}<span>Have a picture of something you love? Text it to
            <a href="sms:${SHOP.phoneHref}">${SHOP.phone}</a> and we'll use it as design direction.</span></div>
        </div>
      </div>
    </div>
    ${lightboxHTML}
    ${relatedHTML}`;

  // Product gallery: thumbnail, arrow, keyboard, lightbox and mobile swipe controls.
  const main = document.getElementById("pd-main");
  const photoCaption = document.getElementById("pd-photo-caption");
  const photoCount = document.getElementById("pd-photo-count");
  const lightbox = document.getElementById("pd-lightbox");
  const lightboxImage = document.getElementById("pd-lightbox-image");
  const lightboxCaption = document.getElementById("pd-lightbox-caption");
  let activeShot = 0;
  let gallerySwipeHandled = false;

  const setShot = index => {
    if (!shots.length) return;
    activeShot = (index + shots.length) % shots.length;
    const shot = shots[activeShot];
    if (main) {
      main.src = `images/${shot.src}`;
      main.alt = shot.alt;
    }
    if (photoCaption) photoCaption.textContent = shot.caption;
    if (photoCount) photoCount.textContent = `${activeShot + 1} of ${shots.length}`;
    rootEl.querySelectorAll(".pd-thumb").forEach(thumb => {
      const selected = Number(thumb.dataset.index) === activeShot;
      thumb.classList.toggle("active", selected);
      thumb.setAttribute("aria-current", selected ? "true" : "false");
    });
    if (lightboxImage) {
      lightboxImage.src = `images/${shot.src}`;
      lightboxImage.alt = shot.alt;
    }
    if (lightboxCaption) lightboxCaption.textContent = shot.caption;
  };

  rootEl.querySelectorAll(".pd-thumb").forEach(thumb =>
    thumb.addEventListener("click", () => setShot(Number(thumb.dataset.index)))
  );
  rootEl.querySelectorAll("[data-gallery-step]").forEach(button =>
    button.addEventListener("click", () => setShot(activeShot + Number(button.dataset.galleryStep)))
  );
  rootEl.querySelectorAll("[data-lightbox-step]").forEach(button =>
    button.addEventListener("click", () => setShot(activeShot + Number(button.dataset.lightboxStep)))
  );

  const openPhoto = document.getElementById("pd-open-photo");
  if (openPhoto && lightbox) openPhoto.addEventListener("click", () => {
    if (gallerySwipeHandled) {
      gallerySwipeHandled = false;
      return;
    }
    setShot(activeShot);
    lightbox.showModal();
  });
  const closePhoto = rootEl.querySelector(".pd-lightbox-close");
  if (closePhoto && lightbox) closePhoto.addEventListener("click", () => lightbox.close());
  if (lightbox) {
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft") setShot(activeShot - 1);
      if (event.key === "ArrowRight") setShot(activeShot + 1);
    });
  }

  const stage = rootEl.querySelector(".pd-stage");
  if (stage && shots.length > 1) {
    let touchStartX = 0;
    let touchStartY = 0;
    stage.addEventListener("touchstart", event => {
      touchStartX = event.changedTouches[0].clientX;
      touchStartY = event.changedTouches[0].clientY;
    }, { passive: true });
    stage.addEventListener("touchend", event => {
      const deltaX = event.changedTouches[0].clientX - touchStartX;
      const deltaY = event.changedTouches[0].clientY - touchStartY;
      if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
        gallerySwipeHandled = true;
        setShot(activeShot + (deltaX < 0 ? 1 : -1));
        window.setTimeout(() => { gallerySwipeHandled = false; }, 500);
      }
    }, { passive: true });
  }

  // Product structured data for Google
  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.desc,
    brand: { "@type": "Brand", name: SHOP.name },
    ...(shots.length ? { image: shots.map(shot => location.origin + location.pathname.replace(/product\.html$/, "") + "images/" + shot.src) } : {}),
    ...(typeof p.price === "number"
      ? { offers: { "@type": "Offer", price: p.price, priceCurrency: "USD", availability: "https://schema.org/InStock" } }
      : {}),
  };
  const tag = document.createElement("script");
  tag.type = "application/ld+json";
  tag.textContent = JSON.stringify(ld);
  document.head.appendChild(tag);
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
