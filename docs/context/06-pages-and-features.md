# EYE PRESTIGE -- Pages & Features

## Page Specifications

---

### 1. Homepage (`/`)

**Sections (top to bottom, matching mockup):**

1. **Sticky Header**
   - Left: hamburger icon + "MENU" label
   - Center: EYE PRESTIGE logo (infinity glasses icon)
   - Right: search icon + bag icon with item count badge
   - Frosted glass effect on scroll

2. **Hero Banner**
   - Full-width card with 3:4 aspect ratio (mobile)
   - Grayscale lifestyle image with dark gradient scrim
   - Overlay text: eyebrow tag, headline ("SEE THE WORLD DIFFERENTLY"), subtitle, CTA button
   - Swipeable carousel of hero banners (dots indicator)

3. **Lens Divider**
   - Decorative separator with lens/circle SVG motif between sections

4. **Explore Categories**
   - Eyebrow: "COLLECTION"
   - Title: "EXPLORE" (Fraunces serif)
   - 3-column grid of category tiles
   - Each tile: portrait image, dark gradient, category label at bottom
   - 6 tiles: Sunglasses, Optical, Bluecut, Night Drive, Day Wear, 3 In 1
   - Clicking a tile navigates to `/shop?category=<key>`

5. **Category Product Carousels**
   - One horizontal carousel per category
   - Section header: category name (serif) + "View All" link with arrow
   - Product cards: image, wishlist heart, name, price
   - Cards are 43% viewport width, scroll-snap aligned
   - On desktop: can become a 4-5 column grid

6. **Brand Story Block**
   - Dark or accent background section
   - Eyebrow: "BRAND STORY"
   - Headline: "CRAFTED FOR CLARITY, DESIGNED FOR YOU."
   - Short description text
   - "LEARN MORE" CTA button

7. **Footer**
   - Dark (#111110) background
   - Logo + brand blurb
   - Social links row (Facebook, Instagram, YouTube, TikTok)
   - Columns: Shop, Customer Care, Shipping & Returns, Contact
   - Newsletter signup form
   - Copyright + legal links (Privacy, Terms, Accessibility)

**Navigation Drawer (slide from left):**
- Category links in large serif text
- Footer links: Track Order, Help & FAQs, Contact
- Close button

**Search Overlay (slide from top):**
- Search input with serif font placeholder
- Suggested search chips: "Aviator", "Bluecut", "Under 2000", etc.

---

### 2. Shop All / Product Listing (`/shop`)

**Layout:**

1. **Breadcrumb**
   - Home > Shop All

2. **Page Header**
   - Title: "SHOP ALL" (Fraunces)
   - Result count: "Showing 30 styles"
   - Optional filter description

3. **Sticky Category Bar** (below header, sticks below main header)
   - Horizontal scrollable pill row: All, Sunglasses, Optical, Bluecut, Night Drive, Day Wear, 3 In 1
   - Active pill: dark bg, white text
   - Filter + Sort bar below pills:
     - "FILTER" button with active filter count badge
     - "SORT" button with current sort label

4. **Product Grid**
   - 2-column grid (mobile), 3-4 columns (desktop)
   - 12px gap
   - Each card:
     - Product image on bone background (1:1.15 aspect)
     - Wishlist heart button (top-right)
     - Quick-add button (bottom-right, dark circle with + icon)
     - Shape label (eyebrow style)
     - Product name
     - Price in BDT

5. **Load More**
   - "Load More (X remaining)" outline button
   - Or "You've seen every style in this view" when all loaded

6. **Empty State**
   - Shown when filters match no products
   - Icon + "No matches found" + "Adjust your filters or explore all styles" + "Clear All Filters" button

**Filter Bottom Sheet:**
- Shape filter: chip toggles (Round, Square, Aviator, Cat-Eye, Rectangle)
- Price range: chip toggles (Under 1500, 1500-3000, 3000+)
- Clear All + Apply buttons in sticky footer

**Sort Bottom Sheet:**
- Radio-style list: Featured, Price Low to High, Price High to Low, Name A-Z

---

### 3. Product Detail (`/shop/[slug]`)

**Layout:**

1. **Product Image Gallery**
   - Swipeable image carousel with dots
   - Tap to zoom/fullscreen
   - Images on bone background

2. **Product Info**
   - Category eyebrow (e.g., "SUNGLASSES")
   - Product name (Fraunces serif, large)
   - Price: BDT amount, compare-at price with strikethrough if on sale
   - Shape badge

3. **Variant Selector** (if variants exist)
   - Color swatches or frame option chips
   - Selected variant updates image and price

4. **Prescription Section** (if prescriptionRequired)
   - Three-option selector:
     a. Upload prescription image (camera/file picker)
     b. Enter manually (SPH, CYL, Axis, PD form for each eye)
     c. "Pore dibo" (I'll provide later) -- note that they can send via WhatsApp

5. **Quantity Selector**
   - Minus / count / Plus buttons

6. **Add to Cart Button**
   - Full-width solid dark button: "BAG E JOKTO KORUN" (Add to Bag)
   - Shows loading state while adding

7. **Product Description**
   - Expandable/collapsible sections:
     - Description
     - Features & Materials
     - Size & Fit Guide

8. **Related Products**
   - "APNAR JONNO ARO" (More for You) -- horizontal carousel of same-category products

---

### 4. Cart (`/cart`)

**Layout:**

1. **Page Header**
   - "YOUR BAG" (Fraunces)
   - Item count

2. **Cart Items**
   - Product image thumbnail
   - Name, variant, shape
   - Prescription badge (if applicable)
   - Price
   - Quantity adjuster (- / count / +)
   - Remove button (X icon)

3. **Cart Summary**
   - Subtotal
   - Shipping: "Checkout e dekhben" (See at checkout) or calculated
   - Total
   - "CHECKOUT KORUN" (Proceed to Checkout) solid button

4. **Empty Cart**
   - Bag icon + "Apnar bag khali" (Your bag is empty) + "SHOPPING SHURU KORUN" (Start Shopping) button

---

### 5. Checkout (`/checkout`)

**Guest-first design -- no login wall.**

**Steps (single-page or accordion style):**

1. **Contact Info**
   - Phone number (required, BD format 01XXXXXXXXX)
   - Name (required)
   - Email (optional)
   - "Already have an account? Login" link

2. **Shipping Address**
   - Division dropdown (Dhaka, Chittagong, Rajshahi, Khulna, Barisal, Sylhet, Rangpur, Mymensingh)
   - District dropdown (filtered by division)
   - Area / Thana (text input)
   - Full address (textarea)
   - Postal code (optional)

3. **Prescription** (shown only if cart has prescription items)
   - Upload / Manual entry / Later options
   - Same form as product detail page

4. **Payment Method**
   - Radio cards for each option:
     - COD icon + "Cash on Delivery" + "Product pele taka diben"
     - bKash icon + "bKash" + "Mobile e pay korun"
     - Nagad icon + "Nagad" + "Mobile e pay korun"
     - Card icon + "Card Payment" + "Credit/Debit card"

5. **Order Summary**
   - Collapsible item list
   - Subtotal, Shipping (calculated by division), Discount, Total
   - "ORDER CONFIRM KORUN" button (solid dark, full-width)

6. **Post-Order**
   - Redirect to order confirmation page
   - If bKash/Nagad/SSL: redirect to payment gateway first, then confirmation

---

### 6. Order Confirmation (`/order/[orderNumber]`)

- Success checkmark icon
- "Order shomporkkito!" (Order complete!)
- Order number prominently displayed
- Order summary with items and total
- Shipping address
- Payment status
- "Track your order" info
- "Account create korun?" prompt with benefits (order history, faster checkout)
- "SHOPPING CONTINUE KORUN" button back to homepage

---

### 7. Account Dashboard (`/account`)

**Only accessible after phone OTP login.**

- Welcome message with name
- Quick stats: total orders, active orders
- Recent orders list
- Saved addresses
- Wishlist
- Edit profile
- Logout

---

### 8. Admin Panel (`/admin`)

**Separate layout, dark sidebar navigation.**

**Dashboard:**
- Orders today (count + revenue)
- Pending orders count
- Low stock alerts
- Revenue chart (last 7/30 days)
- Recent orders table

**Products:**
- Table view: image, name, category, price, stock, status
- Add/Edit form with image upload, variant management
- Bulk stock update

**Orders:**
- Table: order number, customer, items, total, status, date
- Filter by status, date range, search
- Detail view: items, shipping, payment, prescription
- Status update dropdown
- Print invoice/receipt

**Prescriptions:**
- Queue of pending prescriptions
- View uploaded image
- Approve / Reject with notes

**Customers:**
- List with search
- Customer detail with order history

**Inventory:**
- Stock levels table
- Low stock highlights
- Quick stock update inline
