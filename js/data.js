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
  deliveryArea: "Canton and surrounding towns — up to 30 miles",
  facebook: "",                       // paste full URL to show a Facebook link, leave "" to hide
  instagram: "",                      // same for Instagram

  // Announcement banner — shows at the very top of every page when not "".
  // Leave "" and the seasonal banners below will fill it in automatically.
  announcement: "",

  // Shown wherever we name specific flowers, so customers know
  // seasonal swaps can happen. Set to "" to hide it everywhere.
  substitutionNote:
    "Flowers are seasonal, so if something isn't at its best the day we design, " +
    "we'll substitute a similar bloom of equal or greater value — always matching " +
    "the style and colors you chose. If it's a big change, we'll call you first.",

  // Shown on every product — the "make it yours" invitation. Set "" to hide.
  customizeNote:
    "Don't see quite what you had in mind? Don't hesitate to give us a call — " +
    "we can customize this arrangement to be whatever you want it to be. " +
    "(Additional fees may apply depending on the changes.)",

  // Shown on every product — the ordering-notice heads-up. Set "" to hide.
  noticeNote:
    "We prefer at least 24 hours' notice on orders so we can make sure the " +
    "flowers you want are in stock. If something isn't available, we'll contact " +
    "you right away and work out the perfect substitute together.",
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
    blurb: "Gift baskets, plants, stuffed animals, and keepsakes to make it extra special.",
  },
];

/* ------------------------------------------------------------
   PRODUCTS
   Each product needs:
     name      — display name
     category  — one of the category ids above
     price     — number, or a string like "From $85" / "$175 – $400+"
     desc      — one or two sentences
     image     — filename inside the /images folder ("" = elegant placeholder;
                 products without a photo automatically sort to the bottom)
     order     — "buy"    → shows a Buy Now button (uses buyLink)
                 "custom" → shows Call to Order (phone) + inquiry option
     buyLink   — Stripe/Square payment link URL (only for order: "buy";
                 leave "" until the payment account is set up — the button
                 will show "Call to Order" as a fallback automatically)

   Optional extras:
     flowers   — the actual flowers pictured, e.g. flowers: ["Roses", "Stock"]
     colors    — color choices, e.g. colors: ["Red & white", "You choose"]
     sizes     — price tiers, e.g. sizes: [{ label: "Dozen", price: 75 }, ...]
                 (when present, the card shows "From $<lowest>")
     photos    — extra photo filenames for the detail-page gallery
     notice    — a product-specific ordering note shown prominently,
                 e.g. "Please allow at least 24 hours."
     salePrice — TEMPORARY promo price. Overrides everything and shows the
                 old price struck through. Delete the line to end the sale.
     saleNote  — small badge for the sale, e.g. "Mother's Day Special"
   ------------------------------------------------------------ */
const PRODUCTS = [
  // ——— Everyday & Just Because ———
  {
    name: "Rose Bouquet",
    category: "everyday",
    price: 75,
    sizes: [
      { label: "Half Dozen", price: 45 },   // PRICE PLACEHOLDER — confirm with Lisa
      { label: "Dozen",      price: 75 },   // PRICE PLACEHOLDER
      { label: "Two Dozen",  price: 135 },  // PRICE PLACEHOLDER
    ],
    desc: "Classic long-stem roses arranged with baby's breath and fresh greenery — timeless, romantic, and never the wrong answer.",
    flowers: ["Long-stem roses", "Baby's breath", "Pittosporum & leatherleaf greenery"],
    colors: ["Classic red", "Blush pink", "White & ivory", "Yellow", "Mixed colors"],
    image: "rose-bouquet.jpg",
    order: "buy",
    buyLink: "",
  },
  {
    name: "Sunshine Morning",
    category: "everyday",
    price: 95,
    desc: "A big armful of sunshine — a cheerful mix of gladiolus and roses that brightens a room the second you set it down.",
    flowers: ["Roses", "Gladiolus", "Alstroemeria", "Bear grass & ruscus greenery"],
    image: "sunshine-morning.jpg",
    order: "buy",
    buyLink: "",
  },
  {
    name: "Garden Romance",
    category: "everyday",
    price: 95,
    desc: "Roses, hydrangeas, and snapdragons tucked in with fresh eucalyptus — soft, sweet, and our most-loved anniversary arrangement.",
    flowers: ["Roses", "Hydrangea", "Snapdragons", "Eucalyptus"],
    image: "garden-romance.jpg",
    order: "buy",
    buyLink: "",
    colors: ["Classic red", "Blush & ivory", "Bright mix"],
  },
  {
    name: "Birthday Blooms",
    category: "everyday",
    price: 50,
    desc: "Peach roses and cheerful green button mums all dressed up with a bow — the birthday gift that gets the loudest \"oh my goodness!\"",
    flowers: ["Peach roses", "Hot pink spray roses", "Green button mums", "Peach snapdragons", "White & purple lisianthus"],
    image: "birthday-blooms.jpg",
    order: "buy",
    buyLink: "",
  },
  {
    name: "Get Well Soon",
    category: "everyday",
    price: "From $40",
    desc: "Peach roses and bold pink gerbera daisies over a cloud of hydrangea — cheerful, fresh, and impossible to walk past without smiling.",
    flowers: ["Peach roses", "Peach spray roses", "Hot pink gerbera daisies", "Green hydrangea", "Mini carnations"],
    image: "get-well-soon.jpg",
    order: "buy",
    buyLink: "",
  },
  {
    name: "Designer's Choice",
    category: "everyday",
    price: "From $50",
    desc: "Tell us the occasion and your budget — we'll design something beautiful with the freshest flowers in the shop that day.",
    flowers: ["Whatever is freshest — garden roses, stock, hydrangea, berries and seasonal blooms"],
    image: "designers-choice.jpg",
    order: "custom",
    buyLink: "",
  },

  // ——— Sympathy & Funeral ———
  {
    name: "Casket Spray",
    category: "sympathy",
    price: "From $325",
    desc: "Dozens and dozens of soft roses laid together like a blanket — about as tender and loving a tribute as we know how to make. Pricing goes up with your flower selection, and we deliver directly to the funeral home.",
    flowers: ["Roses (light pink, blush & cream)", "White waxflower", "Silver dollar eucalyptus", "Salal & palm greenery"],
    image: "casket-spray.jpg",
    photos: ["gallery-01.jpg", "gallery-04.jpg", "gallery-14.jpg"],
    order: "custom",
    buyLink: "",
    notice: "Typically a custom order — please request at least 24 hours in advance.",
    colors: ["White & ivory", "Soft pastels", "Red & white", "Golden yellow & blue", "Family's choice"],
  },
  {
    name: "Standing Spray",
    category: "sympathy",
    price: "From $150",
    desc: "A traditional standing tribute on an easel, designed in the family's chosen colors — bright and dignified at the front of the service.",
    flowers: ["Sunflowers", "Green button poms", "Yellow spider mums", "White gladiolus", "Seeded eucalyptus & palm"],
    image: "standing-spray.jpg",
    photos: ["gallery-08.jpg"],
    order: "custom",
    buyLink: "",
    colors: ["White & ivory", "Soft pastels", "Bright & cheerful", "Family's choice"],
  },
  {
    name: "Peaceful Garden Basket",
    category: "sympathy",
    price: "From $75",
    desc: "Sunshine-yellow roses set against true-blue delphinium in a woven basket — bright, warm, and full of good memories.",
    flowers: ["Yellow roses", "Blue delphinium", "White stock", "Purple statice", "Baby's breath"],
    image: "peaceful-garden-basket.jpg",
    photos: ["gallery-13.jpg"],
    order: "buy",
    buyLink: "",
  },
  {
    name: "Sympathy Wreaths & Hearts",
    category: "sympathy",
    price: "$175 – $400+",
    desc: "A tender tribute on a standing easel — offered as a classic round wreath or an open heart, fresh or lasting silk, in the colors your family chooses. Pricing varies with your flower selection.",
    flowers: ["Oriental lilies", "Roses & spray roses", "Carnations", "White stock", "Waxflower", "Baby's breath", "Seeded eucalyptus"],
    image: "sympathy-wreath.jpg",
    photos: ["memory-heart.jpg", "gallery-10.jpg", "gallery-05.jpg"],
    order: "custom",
    buyLink: "",
    notice: "Please request at least 24 hours in advance so we can gather the right flowers.",
    colors: ["White & ivory", "Soft pastels", "Fall tones", "Red", "Family's choice"],
  },
  {
    name: "Memory Cross",
    category: "sympathy",
    price: "$125 – $225",
    desc: "A standing cross of roses, lilies and golden mums that says everything a hard day makes hard to say. Available fresh or in lasting silk.",
    flowers: ["Roses (red, pink & coral)", "Orange asiatic lilies", "Yellow cushion mums", "Bronze spider mums", "Carnations", "Pine cones"],
    image: "memory-cross.jpg",
    order: "custom",
    buyLink: "",
    colors: ["White & ivory", "Soft pastels", "Fall tones", "Family's choice"],
  },
  {
    name: "Cemetery Flowers & Subscriptions",
    category: "sympathy",
    price: 50,
    desc: "Lasting silk arrangements designed for cemetery vases — beautiful through every Texas season, in any colors you'd like. And with our cemetery subscription, you pick the months, how often, and the flowers: you pick the dates — birthdays, holidays, anniversaries — and we place a fresh silk arrangement at your loved one's resting place, then send you a photo each time so you know it's been done.",
    flowers: ["Silk roses & rosebuds", "Silk sunflowers", "Silk hydrangea & delphinium", "Seasonal silk blooms in your colors"],
    image: "silk-cemetery-arrangement.jpg",
    photos: ["cemetery-subscription.jpg", "cemetery-vase-flowers.jpg"],
    order: "custom",
    buyLink: "",
    colors: ["Spring pastels", "Bright mixed", "Sunflowers & blue", "Red & white", "Fall tones", "Your choice"],
  },
  {
    name: "Standing Wooden Cross",
    category: "sympathy",
    price: 50,
    desc: "A sturdy whitewashed standing cross with hand-forged-look ironwork, made to sit on a mantel and quietly keep watch.",
    flowers: [],
    image: "standing-wooden-cross.jpg",
    order: "buy",
    buyLink: "",
  },
  {
    name: "Memorial Wind Chimes",
    category: "sympathy",
    price: 40,
    desc: "A soothing keepsake the family will hear for years to come, with an engraved pendant — a gentle way to remember.",
    flowers: [],
    image: "memorial-wind-chimes.jpg",
    order: "buy",
    buyLink: "",
  },
  {
    name: "Memorial Lantern",
    category: "sympathy",
    price: 45,   // PRICE PLACEHOLDER — confirm with Lisa
    desc: "A softly lit keepsake lantern with a comforting cardinal verse — a gentle light to keep near in the days ahead.",
    flowers: [],
    image: "memorial-lantern.jpg",
    order: "buy",
    buyLink: "",
  },
  {
    name: "Wall Crosses & Keepsakes",
    category: "sympathy",
    price: "From $8",
    desc: "Little reminders that the ones we love never really leave us — crosses, plaques and keepsakes for shelf or nightstand. Our keepsake inventory rotates often, so you're welcome to order online — but please call to confirm we have what you want, or we might just have something even more fitting for you!",
    flowers: [],
    image: "wall-crosses-keepsakes.jpg",
    order: "buy",
    buyLink: "",
  },

  // ——— Weddings & Events ———
  {
    name: "Bridal Bouquet",
    category: "wedding",
    price: "From $125",
    desc: "Blush roses with pops of blue delphinium and thistle, hand-tied with trailing greenery — made for walking down the aisle. Designed around your colors, style, and season.",
    flowers: ["Blush & light pink roses", "Peach spray roses", "Blue delphinium", "Alstroemeria", "Blue thistle", "Cream stock", "Italian ruscus & eucalyptus"],
    image: "bridal-bouquet.jpg",
    order: "custom",
    buyLink: "",
    notice: "Wedding orders are custom, made over the phone — please order about 1 month ahead. A 50% deposit holds your date, with the balance due 2 weeks before the ceremony. Exceptions possible depending on the size of the order — just ask!",
    colors: ["Blush & ivory", "All white", "Bright & bold", "Your wedding colors"],
  },
  {
    name: "Full Wedding Package",
    category: "wedding",
    price: "By consultation",
    desc: "Bouquets, boutonnieres, corsages, ceremony and reception flowers — everything for your day, handled by one trusted local florist. Consultations are always free.",
    flowers: ["Designed entirely around your colors and season"],
    image: "full-wedding-package.jpg",
    order: "custom",
    buyLink: "",
    notice: "Wedding orders are custom, made over the phone — please order about 1 month ahead. A 50% deposit holds your date, with the balance due 2 weeks before the ceremony. Exceptions possible depending on the size of the order — just ask!",
  },

  // ——— Seasonal & Holiday ———
  {
    name: "Prom & Homecoming",
    category: "seasonal",
    price: "$15 – $45",
    desc: "Petal-soft tulips gathered with delicate waxflower and a little sparkle — corsages and boutonnieres made to match. Bring us a photo of the dress!",
    flowers: ["Blush pink tulips", "White waxflower", "Bouvardia florets", "Italian ruscus greenery"],
    image: "prom-homecoming.jpg",
    photos: ["gallery-11.jpg"],
    order: "custom",
    buyLink: "",
    colors: ["Blush pink", "White", "Match the dress", "School colors"],
  },
  {
    name: "Holiday Centerpiece",
    category: "seasonal",
    price: 55,
    desc: "Seasonal greens, candles, and fresh blooms for your table.",
    flowers: [],
    image: "",
    order: "buy",
    buyLink: "",
  },

  // ——— Gifts & Extras ———
  {
    name: "Plants & Dish Gardens",
    category: "extras",
    price: "From $45",   // PRICE PLACEHOLDER — confirm with Lisa
    desc: "A cheerful mix of easy-care green plants with a ladybug or two hiding inside — the gift that keeps growing long after the card is read. A favorite for get-well and sympathy alike.",
    flowers: ["Peace lily", "Schefflera", "Peperomia", "Pothos & ivy", "Croton"],
    image: "plants-dish-gardens.jpg",
    photos: ["plants-dish-gardens-2.jpg"],
    order: "buy",
    buyLink: "",
  },
  {
    name: "Fruit Basket",
    category: "extras",
    price: "From $125",
    desc: "A generous basket of fresh fruit and goodies, customized to the recipient's tastes — and we happily work around any allergies.",
    flowers: [],
    image: "",
    order: "custom",
    buyLink: "",
  },
  {
    name: "Coffee Basket",
    category: "extras",
    price: "From $100",
    desc: "For the coffee lover — brews, treats, and cozy extras, put together just for them.",
    flowers: [],
    image: "",
    order: "custom",
    buyLink: "",
  },
  {
    name: "Candy Basket",
    category: "extras",
    price: "From $75",
    desc: "Sweets galore, customized to what they love — allergies happily accommodated.",
    flowers: [],
    image: "",
    order: "custom",
    buyLink: "",
  },
  {
    name: "Stuffed Animals",
    category: "extras",
    price: "From $15",
    desc: "Stuffed bears from $15 and rabbits from $20 — adorable on their own or riding along with an arrangement.",
    flowers: [],
    image: "",
    order: "custom",
    buyLink: "",
  },
  {
    name: "Friendship Gifts",
    category: "extras",
    price: "From $20",
    desc: "Sweet little \"thinking of you\" gifts for the friend who always shows up — we'll help you pick the perfect one.",
    flowers: [],
    image: "",
    order: "custom",
    buyLink: "",
  },
  {
    name: "Vase Collection",
    category: "extras",
    price: "Varies",
    desc: "From bud vases to statement pieces, we match the vase to the size and style of your arrangement. Keepsake and premium styles available — just ask.",
    flowers: [],
    image: "vase-collection.jpg",
    order: "custom",
    buyLink: "",
  },
];

/* ------------------------------------------------------------
   ADD-ONS — shown on every product's detail page and order popup.
     name         — what it is
     price        — what it costs
     customizable — true adds a small "can be customized" note
   ------------------------------------------------------------ */
const ADDONS = [
  { name: "Hand-written card message", price: "Free", customizable: true },
  { name: "Personalized ribbon (your colors & wording)", price: "$5 per ribbon", customizable: true },
  { name: "Stuffed bear", price: "From $15", customizable: false },
  { name: "Stuffed rabbit", price: "From $20", customizable: false },
  { name: "Memorial keepsake (cross, plaque, lantern)", price: "From $8", customizable: true },
  { name: "Mylar balloon", price: "From $6", customizable: false },   // PRICE PLACEHOLDER
  { name: "Upgraded keepsake vase", price: "Ask us", customizable: true },
];

// Shown wherever add-ons appear — the promise that a real person confirms
// the details before anything gets made.
const ADDON_PROMISE =
  "Our selection of bears, keepsakes and ribbon colors changes with what's in the " +
  "shop, and most can be customized to what you have in mind. Any order with add-ons " +
  "gets a quick follow-up call from us to confirm every detail — colors, wording, " +
  "sizing — so what arrives is exactly what you pictured.";

/* ------------------------------------------------------------
   SEASONS — automatic holiday pricing & banners.

   Dates are "MM-DD" and turn themselves ON and OFF every year, so you
   never have to remember to change holiday prices back afterward.

   prices:  override a product's price during the season. For a product
            with sizes, use { "Size Label": price }.
   banner:  message shown at the top of every page during the season.
   enabled: set false to switch a season off without deleting it.
   ------------------------------------------------------------ */
const SEASONS = [
  {
    name: "Valentine's Day",
    start: "02-01",
    end: "02-15",
    enabled: true,
    banner: "Valentine's Day orders are open — roses go fast, so call early!",
    prices: {
      "Rose Bouquet": { "Half Dozen": 60, "Dozen": 95, "Two Dozen": 175 },  // PRICE PLACEHOLDER — confirm with Lisa
    },
  },
  {
    name: "Mother's Day",
    start: "05-01",
    end: "05-12",
    enabled: true,
    banner: "Mother's Day is coming — order early so we can get her the best blooms.",
    prices: {
      "Rose Bouquet": { "Half Dozen": 55, "Dozen": 85, "Two Dozen": 155 },  // PRICE PLACEHOLDER — confirm with Lisa
    },
  },
  {
    name: "Prom Season",
    start: "03-15",
    end: "05-15",
    enabled: true,
    banner: "Prom season is here — bring us a photo of the dress and we'll match it.",
    prices: {},
  },
  {
    name: "Christmas",
    start: "11-25",
    end: "12-25",
    enabled: true,
    banner: "Christmas centerpieces and wreaths — order early for the holidays.",
    prices: {},
  },
];

/* ------------------------------------------------------------
   GALLERY — the "Our Work" page.
   ------------------------------------------------------------ */
const GALLERY = [
  { image: "gallery-01.jpg", caption: "Golden roses, white callas and blue delphinium casket spray", tag: "Sympathy" },
  { image: "gallery-02.jpg", caption: "All-white casket spray with a well-worn cowboy hat", tag: "Sympathy" },
  { image: "gallery-03.jpg", caption: "Red roses and blue delphinium with Texas flags", tag: "Sympathy" },
  { image: "gallery-04.jpg", caption: "Lilies and antique-pink roses in soft lavender tones", tag: "Sympathy" },
  { image: "gallery-05.jpg", caption: "A heart of golden roses edged in blue", tag: "Sympathy" },
  { image: "gallery-06.jpg", caption: "Autumn lilies, roses and tulips in full color", tag: "Sympathy" },
  { image: "gallery-07.jpg", caption: "White lilies, hydrangea and roses with curly willow", tag: "Arrangements" },
  { image: "gallery-08.jpg", caption: "Yellow roses rising through blue and white", tag: "Sympathy" },
  { image: "gallery-09.jpg", caption: "Pink lilies and roses with deep purple stock", tag: "Everyday" },
  { image: "gallery-10.jpg", caption: "White carnation heart with a spray of pink roses", tag: "Sympathy" },
  { image: "gallery-11.jpg", caption: "Blush tulip corsage with pearls and ribbon", tag: "Prom" },
  { image: "gallery-12.jpg", caption: "Spring bouquet with a balloon bunch", tag: "Everyday" },
  { image: "gallery-13.jpg", caption: "Snowy lilies and glads with deep red carnations", tag: "Sympathy" },
  { image: "gallery-14.jpg", caption: "Ivory roses and callas cascading with soft greens", tag: "Sympathy" },
  { image: "gallery-15.jpg", caption: "Cemetery vase flowers in lasting silk", tag: "Silk" },
];
