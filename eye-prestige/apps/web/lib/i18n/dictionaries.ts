export type Locale = "en" | "bn";

export interface Dictionary {
  // Header
  menu: string;
  search: string;
  bag: string;

  // Navigation
  nav: {
    trackOrder: string;
    helpFaq: string;
    contact: string;
  };

  // Search
  searchPlaceholder: string;
  popularSearch: string;

  // Hero
  hero: {
    eyebrow1: string;
    headline1: string;
    subtitle1: string;
    eyebrow2: string;
    headline2: string;
    subtitle2: string;
    eyebrow3: string;
    headline3: string;
    subtitle3: string;
    cta: string;
  };

  // Homepage
  home: {
    collection: string;
    explore: string;
    viewAll: string;
    brandStoryEyebrow: string;
    brandStoryTitle: string;
    brandStoryDesc: string;
    brandStoryCta: string;
  };

  // Shop
  shop: {
    title: string;
    breadcrumbHome: string;
    showing: string;
    styles: string;
    all: string;
    filter: string;
    sort: string;
    loadMore: string;
    remaining: string;
    allSeen: string;
    noMatch: string;
    noMatchDesc: string;
    clearFilters: string;
    shape: string;
    priceRange: string;
    apply: string;
    active: string;
    applyFilters: string;
    clearAll: string;
    sortFeatured: string;
    sortPriceLow: string;
    sortPriceHigh: string;
    sortName: string;
  };

  // Product Detail
  product: {
    description: string;
    descriptionText: string;
    quantity: string;
    addToBag: string;
    moreForYou: string;
    prescription: string;
    rxUpload: string;
    rxUploadDesc: string;
    rxManual: string;
    rxManualDesc: string;
    rxLater: string;
    rxLaterDesc: string;
    rxUploadPlaceholder: string;
    rxUploadFormats: string;
    rightEye: string;
    leftEye: string;
  };

  // Cart
  cart: {
    title: string;
    items: string;
    empty: string;
    emptyDesc: string;
    startShopping: string;
    subtotal: string;
    shippingNote: string;
    checkout: string;
    remove: string;
  };

  // Checkout
  checkout: {
    title: string;
    contactInfo: string;
    phonePlaceholder: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    shippingAddress: string;
    districtPlaceholder: string;
    areaPlaceholder: string;
    addressPlaceholder: string;
    paymentMethod: string;
    cod: string;
    codDesc: string;
    bkash: string;
    bkashDesc: string;
    nagad: string;
    nagadDesc: string;
    card: string;
    cardDesc: string;
    orderSummary: string;
    shipping: string;
    total: string;
    confirmOrder: string;
    bagEmpty: string;
    goToShop: string;
    prescriptionNote: string;
  };

  // Order confirmation
  order: {
    complete: string;
    orderNumber: string;
    status: string;
    pending: string;
    smsNote: string;
    continueShopping: string;
    createAccount: string;
    createAccountDesc: string;
  };

  // Footer
  footer: {
    tagline: string;
    shopTitle: string;
    customerCare: string;
    contactUs: string;
    faq: string;
    trackOrder: string;
    sizeGuide: string;
    warranty: string;
    shippingReturns: string;
    shippingPolicy: string;
    returnsExchanges: string;
    contactTitle: string;
    newsletter: string;
    newsletterDesc: string;
    emailPlaceholder: string;
    noSpam: string;
    copyright: string;
    privacy: string;
    terms: string;
    accessibility: string;
  };

  // Categories
  categories: {
    sunglasses: string;
    optical: string;
    bluecut: string;
    nightdrive: string;
    daywear: string;
    threein1: string;
  };

  // Misc
  wishlist: string;
  quickAdd: string;
  language: string;
}

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    menu: "Menu",
    search: "Search",
    bag: "Bag",

    nav: {
      trackOrder: "Track Order",
      helpFaq: "Help & FAQs",
      contact: "Contact",
    },

    searchPlaceholder: "What are you looking for?",
    popularSearch: "Popular Searches",

    hero: {
      eyebrow1: "NEW COLLECTION 2026",
      headline1: "SEE THE WORLD\nDIFFERENTLY",
      subtitle1: "Modern Eyewear for Everyday Icons",
      eyebrow2: "NIGHT DRIVE",
      headline2: "SAFE DRIVE,\nCLEAR VISION",
      subtitle2: "Crafted for night driving confidence",
      eyebrow3: "SCREEN PROTECTION",
      headline3: "BLUECUT\nCOLLECTION",
      subtitle3: "Protect your eyes from screen glare",
      cta: "Shop Now",
    },

    home: {
      collection: "COLLECTION",
      explore: "EXPLORE",
      viewAll: "View All",
      brandStoryEyebrow: "BRAND STORY",
      brandStoryTitle: "CRAFTED FOR CLARITY,\nDESIGNED FOR YOU.",
      brandStoryDesc:
        "It's not just eyewear -- it's a reflection of your personality. Every frame is crafted with a blend of precision and style.",
      brandStoryCta: "Learn More",
    },

    shop: {
      title: "SHOP ALL",
      breadcrumbHome: "Home",
      showing: "Showing",
      styles: "styles",
      all: "All",
      filter: "Filter",
      sort: "Sort",
      loadMore: "Load More",
      remaining: "remaining",
      allSeen: "You've seen every style in this view.",
      noMatch: "No matches found",
      noMatchDesc: "Adjust your filters or browse all styles.",
      clearFilters: "Clear All Filters",
      shape: "Shape",
      priceRange: "Price Range",
      apply: "Apply",
      active: "active",
      applyFilters: "Apply Filters",
      clearAll: "Clear All",
      sortFeatured: "Featured",
      sortPriceLow: "Price: Low to High",
      sortPriceHigh: "Price: High to Low",
      sortName: "Name: A -- Z",
    },

    product: {
      description: "Description",
      descriptionText:
        "Premium quality eyewear crafted with precision. Lightweight frame ensures all-day comfort. UV400 protection with anti-scratch coating.",
      quantity: "Quantity",
      addToBag: "Add to Bag",
      moreForYou: "More for You",
      prescription: "Add Prescription",
      rxUpload: "Upload Image",
      rxUploadDesc: "Take a photo of your doctor's prescription",
      rxManual: "Enter Power",
      rxManualDesc: "Enter SPH, CYL, Axis values manually",
      rxLater: "Provide Later",
      rxLaterDesc: "Send via WhatsApp/call after ordering",
      rxUploadPlaceholder: "Select or drag an image",
      rxUploadFormats: "JPG, PNG, PDF (Max 5MB)",
      rightEye: "Right Eye (OD)",
      leftEye: "Left Eye (OS)",
    },

    cart: {
      title: "YOUR BAG",
      items: "items",
      empty: "Your bag is empty",
      emptyDesc: "Add your favorite eyewear",
      startShopping: "Start Shopping",
      subtotal: "Subtotal",
      shippingNote: "Shipping calculated at checkout",
      checkout: "Proceed to Checkout",
      remove: "Remove",
    },

    checkout: {
      title: "CHECKOUT",
      contactInfo: "Contact Information",
      phonePlaceholder: "Phone (01XXXXXXXXX)",
      namePlaceholder: "Your name",
      emailPlaceholder: "Email (optional)",
      shippingAddress: "Shipping Address",
      districtPlaceholder: "District",
      areaPlaceholder: "Area / Thana",
      addressPlaceholder: "Full address",
      paymentMethod: "Payment Method",
      cod: "Cash on Delivery",
      codDesc: "Pay when you receive the product",
      bkash: "bKash",
      bkashDesc: "Pay via mobile",
      nagad: "Nagad",
      nagadDesc: "Pay via mobile",
      card: "Card Payment",
      cardDesc: "Credit/Debit card",
      orderSummary: "Order Summary",
      shipping: "Shipping",
      total: "Total",
      confirmOrder: "Confirm Order",
      bagEmpty: "Bag is empty",
      goToShop: "Go to Shop",
      prescriptionNote: "Your cart has prescription items",
    },

    order: {
      complete: "Order Complete!",
      orderNumber: "Order Number",
      status: "Status",
      pending: "Pending",
      smsNote:
        "An SMS confirmation will be sent to your phone. Contact us on WhatsApp for any questions about your order.",
      continueShopping: "Continue Shopping",
      createAccount: "Create Account",
      createAccountDesc: "for order history and faster checkout",
    },

    footer: {
      tagline:
        "Premium eyewear crafted for everyday confidence. Style, clarity, and comfort -- delivered to your door across Bangladesh.",
      shopTitle: "Shop",
      customerCare: "Customer Care",
      contactUs: "Contact Us",
      faq: "FAQs",
      trackOrder: "Track Your Order",
      sizeGuide: "Size & Fit Guide",
      warranty: "Warranty",
      shippingReturns: "Shipping & Returns",
      shippingPolicy: "Shipping Policy",
      returnsExchanges: "Returns & Exchanges",
      contactTitle: "Contact",
      newsletter: "Stay Connected",
      newsletterDesc:
        "Get early access to new collections, offers, and exclusive updates.",
      emailPlaceholder: "Your email address",
      noSpam: "No spam. Unsubscribe anytime.",
      copyright: "2026 Eye Prestige. All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
      accessibility: "Accessibility",
    },

    categories: {
      sunglasses: "Sunglasses",
      optical: "Optical",
      bluecut: "Bluecut",
      nightdrive: "Night Drive",
      daywear: "Day Wear",
      threein1: "3 In 1",
    },

    wishlist: "Add to wishlist",
    quickAdd: "Quick add",
    language: "BN",
  },

  bn: {
    menu: "মেনু",
    search: "সার্চ",
    bag: "ব্যাগ",

    nav: {
      trackOrder: "Order Track করুন",
      helpFaq: "সাহায্য ও FAQ",
      contact: "যোগাযোগ",
    },

    searchPlaceholder: "কী খুঁজছেন?",
    popularSearch: "জনপ্রিয় সার্চ",

    hero: {
      eyebrow1: "নতুন কালেকশন ২০২৬",
      headline1: "পৃথিবীকে দেখুন\nঅন্যভাবে",
      subtitle1: "আধুনিক চশমা, প্রতিদিনের সঙ্গী",
      eyebrow2: "নাইট ড্রাইভ",
      headline2: "নিরাপদ ড্রাইভ,\nস্বচ্ছ দৃষ্টি",
      subtitle2: "রাতের গাড়ি চালানোর জন্য তৈরি",
      eyebrow3: "স্ক্রিন প্রোটেকশন",
      headline3: "BLUECUT\nকালেকশন",
      subtitle3: "আপনার চোখকে স্ক্রিনের আলো থেকে রক্ষা করুন",
      cta: "এখনই দেখুন",
    },

    home: {
      collection: "কালেকশন",
      explore: "এক্সপ্লোর",
      viewAll: "সব দেখুন",
      brandStoryEyebrow: "ব্র্যান্ড স্টোরি",
      brandStoryTitle: "স্বচ্ছতার জন্য তৈরি,\nআপনার জন্য ডিজাইন।",
      brandStoryDesc:
        "এটা শুধু চশমা না -- এটা আপনার personality র reflection। প্রতিটি frame তৈরি হয়েছে precision আর style এর মিশ্রণে।",
      brandStoryCta: "আরো জানুন",
    },

    shop: {
      title: "সব প্রোডাক্ট",
      breadcrumbHome: "হোম",
      showing: "দেখাচ্ছে",
      styles: "টি স্টাইল",
      all: "সব",
      filter: "ফিল্টার",
      sort: "সর্ট",
      loadMore: "আরো দেখুন",
      remaining: "বাকি আছে",
      allSeen: "এই ভিউতে সব স্টাইল দেখা হয়ে গেছে।",
      noMatch: "কোনো ম্যাচ পাওয়া যায়নি",
      noMatchDesc: "ফিল্টার adjust করুন বা সব স্টাইল ব্রাউজ করুন।",
      clearFilters: "সব ফিল্টার মুছুন",
      shape: "শেইপ",
      priceRange: "মূল্য সীমা",
      apply: "প্রয়োগ",
      active: "সক্রিয়",
      applyFilters: "ফিল্টার প্রয়োগ করুন",
      clearAll: "সব মুছুন",
      sortFeatured: "ফিচার্ড",
      sortPriceLow: "মূল্য: কম থেকে বেশি",
      sortPriceHigh: "মূল্য: বেশি থেকে কম",
      sortName: "নাম: A -- Z",
    },

    product: {
      description: "বিবরণ",
      descriptionText:
        "প্রিমিয়াম কোয়ালিটি চশমা, precision এ তৈরি। হালকা ফ্রেম সারাদিনের আরাম নিশ্চিত করে। UV400 প্রোটেকশন ও anti-scratch coating সহ।",
      quantity: "পরিমাণ",
      addToBag: "ব্যাগে যোগ করুন",
      moreForYou: "আপনার জন্য আরো",
      prescription: "Prescription দিন",
      rxUpload: "ছবি Upload করুন",
      rxUploadDesc: "Doctor এর prescription এর ছবি তুলুন",
      rxManual: "Power লিখুন",
      rxManualDesc: "SPH, CYL, Axis manually enter করুন",
      rxLater: "পরে দিব",
      rxLaterDesc: "Order এর পরে WhatsApp/call এ জানাবেন",
      rxUploadPlaceholder: "ছবি select করুন বা drag করুন",
      rxUploadFormats: "JPG, PNG, PDF (সর্বোচ্চ 5MB)",
      rightEye: "ডান চোখ (OD)",
      leftEye: "বাম চোখ (OS)",
    },

    cart: {
      title: "আপনার ব্যাগ",
      items: "আইটেম",
      empty: "আপনার ব্যাগ খালি",
      emptyDesc: "পছন্দের চশমা যোগ করুন",
      startShopping: "Shopping শুরু করুন",
      subtotal: "সাবটোটাল",
      shippingNote: "Shipping charge checkout এ দেখুন",
      checkout: "Checkout করুন",
      remove: "মুছুন",
    },

    checkout: {
      title: "CHECKOUT",
      contactInfo: "যোগাযোগ তথ্য",
      phonePlaceholder: "ফোন (01XXXXXXXXX)",
      namePlaceholder: "আপনার নাম",
      emailPlaceholder: "ইমেইল (ঐচ্ছিক)",
      shippingAddress: "ডেলিভারি ঠিকানা",
      districtPlaceholder: "জেলা",
      areaPlaceholder: "এলাকা / থানা",
      addressPlaceholder: "সম্পূর্ণ ঠিকানা",
      paymentMethod: "পেমেন্ট পদ্ধতি",
      cod: "Cash on Delivery",
      codDesc: "প্রোডাক্ট পেলে টাকা দিবেন",
      bkash: "bKash",
      bkashDesc: "মোবাইলে পে করুন",
      nagad: "Nagad",
      nagadDesc: "মোবাইলে পে করুন",
      card: "Card Payment",
      cardDesc: "Credit/Debit card",
      orderSummary: "অর্ডার সারাংশ",
      shipping: "শিপিং",
      total: "সর্বমোট",
      confirmOrder: "Order confirm করুন",
      bagEmpty: "ব্যাগ খালি",
      goToShop: "Shop এ ফিরে যান",
      prescriptionNote: "আপনার cart এ prescription আইটেম আছে",
    },

    order: {
      complete: "Order সম্পন্ন!",
      orderNumber: "অর্ডার নম্বর",
      status: "স্ট্যাটাস",
      pending: "পেন্ডিং",
      smsNote:
        "আপনার ফোনে SMS confirmation পাঠানো হবে। Order সম্পর্কে যেকোনো প্রশ্নে আমাদের WhatsApp এ জানান।",
      continueShopping: "Shopping চালিয়ে যান",
      createAccount: "Account তৈরি করুন",
      createAccountDesc: "order history আর দ্রুত checkout এর জন্য",
    },

    footer: {
      tagline:
        "প্রতিদিনের আত্মবিশ্বাসের জন্য প্রিমিয়াম চশমা। স্টাইল, স্বচ্ছতা আর আরাম -- সারা বাংলাদেশে আপনার দোরগোড়ায়।",
      shopTitle: "শপ",
      customerCare: "কাস্টমার কেয়ার",
      contactUs: "যোগাযোগ করুন",
      faq: "জিজ্ঞাসা (FAQ)",
      trackOrder: "Order Track করুন",
      sizeGuide: "সাইজ ও ফিটিং গাইড",
      warranty: "ওয়ারেন্টি",
      shippingReturns: "শিপিং ও রিটার্ন",
      shippingPolicy: "শিপিং পলিসি",
      returnsExchanges: "রিটার্ন ও এক্সচেঞ্জ",
      contactTitle: "যোগাযোগ",
      newsletter: "আমাদের সাথে যুক্ত থাকুন",
      newsletterDesc:
        "নতুন কালেকশন, অফার আর exclusive আপডেট সবার আগে পান।",
      emailPlaceholder: "আপনার ইমেইল",
      noSpam: "No spam। যেকোনো সময় unsubscribe করতে পারবেন।",
      copyright: "২০২৬ Eye Prestige। সর্বস্বত্ব সংরক্ষিত।",
      privacy: "গোপনীয়তা",
      terms: "শর্তাবলী",
      accessibility: "অ্যাক্সেসিবিলিটি",
    },

    categories: {
      sunglasses: "সানগ্লাস",
      optical: "অপটিক্যাল",
      bluecut: "ব্লুকাট",
      nightdrive: "নাইট ড্রাইভ",
      daywear: "ডে ওয়্যার",
      threein1: "৩ ইন ১",
    },

    wishlist: "Wishlist এ যোগ করুন",
    quickAdd: "দ্রুত যোগ করুন",
    language: "EN",
  },
};
