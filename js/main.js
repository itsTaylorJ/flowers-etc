/* ============================================================
   FLOWERS ETC — SITE LOGIC
   You should rarely need to edit this file. All content lives
   in js/data.js.
   ============================================================ */

(function () {
  /* ---------- Header & footer (rendered once, used on every page) ---------- */
  const page = document.body.dataset.page || "";

  const announcementHTML = SHOP.announcement
    ? `<div class="announce">🌸 ${SHOP.announcement}</div>`
    : "";

  const headerHTML = `
    ${announcementHTML}
    <div class="topbar">
      🌸 Call or text to order: <a href="tel:${SHOP.phoneHref}">${SHOP.phone}</a>
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
          <a href="gallery.html"  data-nav="gallery">Our Work</a>
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
            Call or text: <a href="tel:${SHOP.phoneHref}">${SHOP.phone}</a><br>
            <a href="mailto:${SHOP.email}">${SHOP.email}</a></p>
          </div>
          <div>
            <h4>Visit</h4>
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
  document.querySelectorAll("[data-shop-sms]").forEach(el => {
    el.setAttribute("href", "sms:" + SHOP.phoneHref);
    if (!el.textContent.trim()) el.textContent = "Text " + SHOP.phone;
  });
  document.querySelectorAll("[data-shop-mail]").forEach(el => {
    el.setAttribute("href", "mailto:" + SHOP.email);
    if (!el.textContent.trim()) el.textContent = SHOP.email;
  });

  /* ---------- Helpers ---------- */
  window.formatPrice = p => (typeof p === "number" ? "$" + p.toFixed(0) : p);

  window.productMedia = p =>
    p.image
      ? `<img class="p-photo" src="images/${p.image}" alt="${p.name}">`
      : `<div class="ph"><span class="ph-icon">✿</span><span>Photo coming soon</span></div>`;

  // URL-friendly id for a product, e.g. "Casket Spray" -> "casket-spray"
  window.slugify = s =>
    s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  window.productBySlug = slug => PRODUCTS.find(p => slugify(p.name) === slug);
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
    const html = `<div class="announce">🌸 ${season.banner}</div>`;
    if (bar) bar.outerHTML = html;
    else document.getElementById("site-header").insertAdjacentHTML("afterbegin", html);
  }
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
          <a class="p-media-link" href="${productUrl(p)}" aria-label="${p.name} details">
            ${productMedia(p)}
          </a>
          <div class="p-body">
            <div class="p-cat">${catName(p.category)}</div>
            <h3><a class="p-title-link" href="${productUrl(p)}">${p.name}</a></h3>
            <div class="p-price">${priceHTML(p)}</div>
            ${p.order === "custom" ? `<span class="badge-custom">Custom — call to order</span>` : ""}
            <p class="p-desc">${p.desc}</p>
            <div class="p-actions">
              <a class="btn btn-primary btn-sm" href="${productUrl(p)}">View Details</a>
              <button class="btn btn-outline btn-sm" data-order="${PRODUCTS.indexOf(p)}">
                ${p.order === "buy" && p.buyLink ? "Buy Now" : "Quick Order"}
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

  const colorsHTML = p.colors && p.colors.length
    ? `<div class="m-colors"><strong>Color options:</strong><br>
       ${p.colors.map(c => `<span class="chip">${c}</span>`).join("")}</div>`
    : "";

  const addonsHTML = typeof ADDONS !== "undefined" && ADDONS.length
    ? `<div class="m-addons"><strong>Popular add-ons — just ask when you order:</strong>
       ${ADDONS.map(a => `${a.name} <em>(${a.price})</em>`).join(" · ")}</div>`
    : "";

  backdrop.innerHTML = `
    <div class="modal">
      <button class="m-close" aria-label="Close">✕</button>
      <h3>${p.name}</h3>
      <div class="m-price">${priceHTML(p)}</div>
      <p>${p.desc}</p>
      <p style="margin-bottom:14px;"><a href="${productUrl(p)}" style="font-weight:700;">See full details &amp; add-ons →</a></p>
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
      <div class="m-photos">📸 Have a photo of something you love — a Pinterest find, a past
        arrangement, the dress? <a href="sms:${SHOP.phoneHref}">Text it to us</a> or
        <a href="mailto:${SHOP.email}?subject=Reference photos for my order">email it</a>
        and we'll design from it.</div>
      <div class="m-actions">
        ${canBuyOnline ? `<a class="btn btn-primary" href="${p.buyLink}" target="_blank" rel="noopener">Buy Now — Secure Checkout</a>` : ""}
        <a class="btn ${canBuyOnline ? "btn-outline" : "btn-primary"}" href="tel:${SHOP.phoneHref}">📞 Call ${SHOP.phone}</a>
        <a class="btn btn-outline" href="sms:${SHOP.phoneHref}">💬 Text Us Your Order</a>
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
  gridEl.innerHTML = GALLERY.map(g => `
    <figure class="gallery-card">
      ${g.image
        ? `<img src="images/${g.image}" alt="${g.caption}" loading="lazy">`
        : `<div class="ph"><span class="ph-icon">✿</span><span>Photo coming soon</span></div>`}
      <figcaption>
        <span class="g-tag">${g.tag}</span>
        ${g.caption}
      </figcaption>
    </figure>`).join("");
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

  const cat = CATEGORIES.find(c => c.id === p.category) || {};
  const r = resolvePrice(p);
  const canBuyOnline = p.order === "buy" && p.buyLink;

  /* --- photos: main + any extras --- */
  const shots = [p.image, ...(p.photos || [])].filter(Boolean);
  const mainShot = shots.length
    ? `<img id="pd-main" src="images/${shots[0]}" alt="${p.name}">`
    : `<div class="ph" style="aspect-ratio:1/1;"><span class="ph-icon">✿</span><span>Photo coming soon</span></div>`;
  const thumbs = shots.length > 1
    ? `<div class="pd-thumbs">${shots
        .map((s, i) => `<button class="pd-thumb ${i === 0 ? "active" : ""}" data-src="images/${s}">
             <img src="images/${s}" alt="${p.name} photo ${i + 1}"></button>`)
        .join("")}</div>`
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

  /* --- add-ons --- */
  const addonsHTML = typeof ADDONS !== "undefined" && ADDONS.length
    ? `<div class="pd-block pd-addons">
         <h3>Make it extra special</h3>
         <ul class="pd-addon-list">
           ${ADDONS.map(a => `
             <li>
               <span class="pd-addon-name">${a.name}${a.customizable ? ` <em>customizable</em>` : ""}</span>
               <span class="pd-addon-price">${a.price}</span>
             </li>`).join("")}
         </ul>
         ${typeof ADDON_PROMISE !== "undefined"
            ? `<div class="pd-promise"><strong>📞 We always confirm before we create.</strong> ${ADDON_PROMISE}</div>`
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
        </div>

        <div class="pd-info">
          <div class="p-cat">${cat.name || ""}</div>
          <h1>${p.name}</h1>
          <div class="pd-price">${priceHTML(p)}</div>
          ${p.order === "custom" ? `<span class="badge-custom">Custom — we design it with you</span>` : ""}
          <p class="pd-desc">${p.desc}</p>

          ${sizesHTML}
          ${flowersHTML}
          ${colorsHTML}

          <div class="pd-actions">
            ${canBuyOnline ? `<a class="btn btn-primary" href="${p.buyLink}" target="_blank" rel="noopener">Buy Now — Secure Checkout</a>` : ""}
            <a class="btn ${canBuyOnline ? "btn-outline" : "btn-primary"}" href="tel:${SHOP.phoneHref}">📞 Call ${SHOP.phone}</a>
            <a class="btn btn-blush" href="sms:${SHOP.phoneHref}">💬 Text Us Your Order</a>
            <a class="btn btn-outline" href="contact.html?arrangement=${encodeURIComponent(p.name)}">Send an Inquiry</a>
          </div>

          <div class="pd-reassure">
            <div><strong>Same-day delivery</strong> on orders by 2:30 PM</div>
            <div><strong>Hand-delivered</strong> across ${SHOP.deliveryArea}</div>
            <div><strong>A real person</strong> answers — ${SHOP.ownerName} or one of our girls</div>
          </div>

          ${addonsHTML}

          <div class="pd-photos-note">📸 Have a picture of something you love? Text or email it over and
            we'll design from it — <a href="sms:${SHOP.phoneHref}">text ${SHOP.phone}</a> or
            <a href="mailto:${SHOP.email}?subject=Reference photo for ${encodeURIComponent(p.name)}">email us</a>.</div>
        </div>
      </div>
    </div>
    ${relatedHTML}`;

  // thumbnail switching
  const main = document.getElementById("pd-main");
  rootEl.querySelectorAll(".pd-thumb").forEach(t =>
    t.addEventListener("click", () => {
      if (main) main.src = t.dataset.src;
      rootEl.querySelectorAll(".pd-thumb").forEach(x => x.classList.remove("active"));
      t.classList.add("active");
    })
  );

  // Product structured data for Google
  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.desc,
    brand: { "@type": "Brand", name: SHOP.name },
    ...(p.image ? { image: location.origin + location.pathname.replace(/product\.html$/, "") + "images/" + p.image } : {}),
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
