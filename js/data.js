/* ============================================================
   FLOWERS ETC — SITE DATA
   This is the ONE file to edit when the shop owner gives feedback.
   Change shop info, categories, products, prices, and photos here.
   ============================================================ */

const SHOP = {
  name: "Flowers Etc.",
  tagline: "Fresh flowers, arranged with love, right here in town.",
  phone: "[PHONE NUMBER]",            // e.g. "(555) 123-4567"
  phoneHref: "[PHONE-DIGITS]",        // e.g. "5551234567" — used for tap-to-call links
  email: "[EMAIL ADDRESS]",
  address: "[STREET ADDRESS]",
  cityStateZip: "[CITY, STATE ZIP]",
  hours: [
    { days: "Monday – Friday", time: "9:00 AM – 5:30 PM" },
    { days: "Saturday",        time: "9:00 AM – 1:00 PM" },
    { days: "Sunday",          time: "Closed" },
  ],
  // Shown on the home page — edit freely
  established: "[YEAR]",              // e.g. "1998"
  ownerName: "[OWNER NAME]",
  deliveryArea: "[TOWN NAME] and surrounding communities",
  facebook: "",                       // paste full URL to show a Facebook link, leave "" to hide
  instagram: "",                      // same for Instagram
};

/* ------------------------------------------------------------
   CATEGORIES — id must match the "category" field on products.
   Add, remove, or rename freely; the shop page updates itself.
   ------------------------------------------------------------ */
const CATEGORIES = [
  {
    id: "everyday",
    name: "Everyday & Just Because",
    blurb: "Birthdays, anniversaries, get-well wishes, or no reason at all.",
  },
  {
    id: "sympathy",
    name: "Sympathy & Funeral",
    blurb: "Thoughtful tributes to honor and remember a loved one.",
  },
  {
    id: "wedding",
    name: "Weddings & Events",
    blurb: "From bridal bouquets to full venue flowers — let's plan together.",
  },
  {
    id: "seasonal",
    name: "Seasonal & Holiday",
    blurb: "Fresh designs for every season and celebration on the calendar.",
  },
];

/* ------------------------------------------------------------
   PRODUCTS
   Each product needs:
     name      — display name
     category  — one of the category ids above
     price     — number, or a string like "From $85" for custom work
     desc      — one or two sentences
     image     — filename inside the /images folder ("" = elegant placeholder)
     order     — "buy"    → shows a Buy Now button (uses buyLink)
                 "custom" → shows Call to Order (phone) + inquiry option
     buyLink   — Stripe/Square payment link URL (only for order: "buy";
                 leave "" until the payment account is set up — the button
                 will show "Call to Order" as a fallback automatically)
   ------------------------------------------------------------ */
const PRODUCTS = [
  // ——— Everyday & Just Because ———
  {
    name: "Sunshine Morning",
    category: "everyday",
    price: 45,
    desc: "A cheerful mix of sunflowers, daisies, and seasonal blooms in a clear glass vase.",
    image: "",
    order: "buy",
    buyLink: "",
  },
  {
    name: "Garden Romance",
    category: "everyday",
    price: 65,
    desc: "Roses, lisianthus, and soft greenery — our most-loved anniversary arrangement.",
    image: "",
    order: "buy",
    buyLink: "",
  },
  {
    name: "Get Well Soon",
    category: "everyday",
    price: 40,
    desc: "Bright, uplifting blooms delivered with a hand-written card.",
    image: "",
    order: "buy",
    buyLink: "",
  },
  {
    name: "Designer's Choice",
    category: "everyday",
    price: "From $50",
    desc: "Tell us the occasion and your budget — we'll design something beautiful with the freshest flowers in the shop.",
    image: "",
    order: "custom",
    buyLink: "",
  },

  // ——— Sympathy & Funeral ———
  {
    name: "Peaceful Garden Basket",
    category: "sympathy",
    price: 75,
    desc: "A gentle arrangement of white and cream blooms in a woven basket.",
    image: "",
    order: "buy",
    buyLink: "",
  },
  {
    name: "Standing Spray",
    category: "sympathy",
    price: "From $150",
    desc: "A traditional standing tribute, personalized with the family's chosen colors and flowers.",
    image: "",
    order: "custom",
    buyLink: "",
  },
  {
    name: "Casket Spray",
    category: "sympathy",
    price: "From $225",
    desc: "Designed with care and delivered directly to the funeral home. Please call so we can get every detail right.",
    image: "",
    order: "custom",
    buyLink: "",
  },

  // ——— Weddings & Events ———
  {
    name: "Bridal Bouquet",
    category: "wedding",
    price: "From $125",
    desc: "Your dream bouquet, designed around your colors, style, and season. Consultations are always free.",
    image: "",
    order: "custom",
    buyLink: "",
  },
  {
    name: "Full Wedding Package",
    category: "wedding",
    price: "By consultation",
    desc: "Bouquets, boutonnieres, ceremony and reception flowers — everything for your day, handled by one trusted local florist.",
    image: "",
    order: "custom",
    buyLink: "",
  },

  // ——— Seasonal & Holiday ———
  {
    name: "Holiday Centerpiece",
    category: "seasonal",
    price: 55,
    desc: "Seasonal greens, candles, and fresh blooms for your table.",
    image: "",
    order: "buy",
    buyLink: "",
  },
  {
    name: "Prom & Homecoming",
    category: "seasonal",
    price: "From $25",
    desc: "Corsages and boutonnieres made to match — bring us a photo of the dress!",
    image: "",
    order: "custom",
    buyLink: "",
  },
];
