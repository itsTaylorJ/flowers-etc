/* ============================================================
   FLOWERS ETC — SITE DATA
   This is the ONE file to edit when the shop owner gives feedback.
   Change shop info, categories, products, prices, and photos here.
   ============================================================ */

const SHOP = {
  name: "Flowers Etc.",
  tagline: "Fresh & silk flowers for weddings, funerals & special occasions.",
  phone: "(903) 567-7045",
  phoneHref: "9035677045",            // digits only — used for tap-to-call and text links
  email: "cantontxflowersetc@gmail.com",
  address: "1200 S Trade Days Blvd, Ste 150",
  cityStateZip: "Canton, TX 75103",
  hours: [
    { days: "Monday – Friday", time: "8:00 AM – 5:00 PM" },
    { days: "Saturday",        time: "8:00 AM – 12:00 PM" },
    { days: "Sunday",          time: "Closed" },
  ],
  // Shown on the home page — edit freely
  established: "",                    // optional year, e.g. "1998" — currently unused (site avoids dates)
  ownerName: "Lisa Thompson",
  deliveryArea: "Canton and surrounding communities",
  facebook: "",                       // paste full URL to show a Facebook link, leave "" to hide
  instagram: "",                      // same for Instagram

  // Announcement banner — shows at the very top of every page when not "".
  // Great for holidays: "Order early for Valentine's Day — call today!"
  announcement: "",
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
  {
    id: "extras",
    name: "Gifts & Extras",
    blurb: "Gift baskets, stuffed animals, vases, and keepsakes to make it extra special.",
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
   Optional:
     colors    — list of color options, shown in the order popup,
                 e.g. colors: ["Red & white", "Soft pastels", "You choose"]
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
    colors: ["Classic red", "Blush & ivory", "Bright mix"],
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
    colors: ["White & ivory", "Soft pastels", "Red & white", "Family's choice"],
  },
  {
    name: "Sympathy Wreath",
    category: "sympathy",
    price: "From $95",   // PRICE PLACEHOLDER — confirm with owner
    desc: "A classic circular tribute in fresh or silk flowers, on an easel stand or sized for a door or headstone.",
    image: "",
    order: "custom",
    buyLink: "",
    colors: ["White & ivory", "Soft pastels", "Fall tones", "Family's choice"],
  },
  {
    name: "Memory Heart",
    category: "sympathy",
    price: "From $85",   // PRICE PLACEHOLDER — confirm with owner
    desc: "A flower heart the family keeps in remembrance — often designed in silk so it lasts for years. Beautiful for funerals, anniversaries of loss, or memorial days.",
    image: "",
    order: "custom",
    buyLink: "",
    colors: ["White & ivory", "Soft pastels", "Red", "Family's choice"],
  },
  {
    name: "Memory Cross",
    category: "sympathy",
    price: "From $85",   // PRICE PLACEHOLDER — confirm with owner
    desc: "A standing or keepsake cross of flowers, made to honor a loved one's faith. Available in fresh or lasting silk.",
    image: "",
    order: "custom",
    buyLink: "",
    colors: ["White & ivory", "Soft pastels", "Family's choice"],
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

  // ——— Gifts & Extras ———
  {
    name: "Gift Basket",
    category: "extras",
    price: "From $40",   // PRICE PLACEHOLDER — confirm with owner
    desc: "Snacks, sweets, and little luxuries arranged in a keepsake basket. Tell us the occasion and your budget — we'll fill it beautifully.",
    image: "",
    order: "custom",
    buyLink: "",
  },
  {
    name: "Stuffed Animals",
    category: "extras",
    price: "From $15",   // PRICE PLACEHOLDER — confirm with owner
    desc: "Bears and friends in different sizes and styles — adorable on their own or riding along with an arrangement.",
    image: "",
    order: "custom",
    buyLink: "",
  },
  {
    name: "Vase Collection",
    category: "extras",
    price: "Varies",
    desc: "From bud vases to statement pieces, we match the vase to the size and style of your arrangement. Keepsake and premium styles available — just ask.",
    image: "",
    order: "custom",
    buyLink: "",
  },
];

/* ------------------------------------------------------------
   ADD-ONS — shown inside the order popup on every arrangement
   ("Popular add-ons — just ask when you order").
   When online payments are set up, these become real checkbox
   add-ons at checkout. Prices are placeholders — confirm with owner.
   ------------------------------------------------------------ */
const ADDONS = [
  { name: "Hand-written card message", price: "Free" },
  { name: "Custom ribbon — your colors & wording", price: "From $5" },
  { name: "Stuffed animal", price: "From $15" },
  { name: "Mylar balloon", price: "From $6" },
  { name: "Upgraded keepsake vase", price: "Ask us" },
];

/* ------------------------------------------------------------
   GALLERY — the "Our Work" page.
   Add one entry per photo:
     image   — filename inside /images ("" shows a placeholder card)
     caption — short line under the photo
     tag     — small label, e.g. "Wedding", "Sympathy", "Everyday"
   Add or remove entries freely; the page lays itself out.
   ------------------------------------------------------------ */
const GALLERY = [
  { image: "", caption: "Bridal bouquet in blush and ivory", tag: "Wedding" },
  { image: "", caption: "Standing spray with roses and lilies", tag: "Sympathy" },
  { image: "", caption: "Birthday brights in a glass vase", tag: "Everyday" },
  { image: "", caption: "Reception centerpieces", tag: "Wedding" },
  { image: "", caption: "Fall porch arrangement", tag: "Seasonal" },
  { image: "", caption: "Prom corsage and boutonniere set", tag: "Prom" },
  { image: "", caption: "Casket spray in soft pastels", tag: "Sympathy" },
  { image: "", caption: "Silk arrangement keepsake", tag: "Silk" },
  { image: "", caption: "Just-because wildflower bundle", tag: "Everyday" },
];
