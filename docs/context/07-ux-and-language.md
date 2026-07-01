# EYE PRESTIGE -- UX & Language Guidelines

## Language Style: Bangla-English Mix (Banglish)

The site follows the **urbalandbd.com** style -- a natural mix of Bangla and English that feels conversational and approachable. English is used for brand terms, product names, and technical words. Bangla is used for action verbs, helper text, and everyday phrases.

**Write in Bangla script for Bangla words, not transliteration.**

### Examples by Context

| Context              | English (Don't)               | Banglish (Do)                              |
|----------------------|-------------------------------|--------------------------------------------|
| CTA: Add to cart     | "Add to Bag"                  | "ব্যাগে যোগ করুন"                           |
| CTA: Shop now        | "Shop Now"                    | "এখনই দেখুন"                                |
| CTA: Checkout        | "Proceed to Checkout"         | "Checkout করুন"                             |
| CTA: Place order     | "Place Order"                 | "Order confirm করুন"                        |
| CTA: View all        | "View All"                    | "সব দেখুন"                                  |
| CTA: Continue shop   | "Continue Shopping"           | "Shopping চালিয়ে যান"                       |
| Empty cart           | "Your bag is empty"           | "আপনার Bag খালি"                            |
| Search placeholder   | "Search products..."          | "কী খুঁজছেন?"                               |
| Filter label         | "Filter"                      | "Filter"  (English OK for UI controls)      |
| Sort label           | "Sort"                        | "Sort"    (English OK for UI controls)      |
| Price label          | "$245"                        | "৳ ২,৪৫০" or "2,450 টাকা"                  |
| Shipping info        | "See at checkout"             | "Checkout এ দেখুন"                          |
| Newsletter           | "Join the list"               | "আমাদের সাথে যুক্ত থাকুন"                    |
| Success              | "Order placed!"               | "Order সম্পন্ন!"                             |
| Prescription later   | "I'll provide later"          | "পরে দিব"                                   |
| Login prompt         | "Already have an account?"    | "Account আছে? Login করুন"                   |
| Track order          | "Track Your Order"            | "Order Track করুন"                          |

### Rules
1. **Product names stay in English** -- "Riviera", "Wayfarer Noir", "Screen Shield"
2. **Category names stay in English** -- "Sunglasses", "Optical", "Bluecut", "Night Drive", "Day Wear", "3 In 1"
3. **Brand terms stay in English** -- "Eye Prestige", "Bag", "Wishlist", "Filter", "Sort"
4. **Action verbs in Bangla** -- "করুন" (do/proceed), "দেখুন" (see/view), "যোগ করুন" (add)
5. **Descriptive text in mix** -- blend naturally, don't force either language
6. **Navigation labels** can be English -- Menu, Shop, Account, Search
7. **Price format:** `৳ 2,450` (Taka symbol + comma-separated number) or `2,450 টাকা`

### Tone
- Approachable and confident, not overly formal
- Premium but not snobbish
- Brief and action-oriented
- Like talking to a knowledgeable friend at a cool eyewear shop

## UX Principles

### 1. Zero-Friction Ordering
- **No account wall.** Cart and checkout work without login.
- **Minimal required fields:** Name, Phone, Address, Payment method. That's it.
- **Phone number is king.** Primary identifier, used for OTP, order tracking, and communication.
- **One-page checkout.** All steps visible on a single scrollable page, not multi-step wizard.
- **Smart defaults:** COD pre-selected (most common in BD), Dhaka pre-selected for division.

### 2. Mobile-First
- Touch targets: minimum 44x44px
- Bottom sheets for filters/sort (thumb-friendly)
- Swipeable carousels, not paginated grids on mobile
- Sticky header stays accessible
- Cart accessible from every page via header bag icon
- WhatsApp floating button for quick support

### 3. Speed
- Product images: Next.js Image with lazy loading, blur placeholders
- ISR for product pages (instant load, fresh data)
- Skeleton loaders for dynamic content
- Minimal JS bundle -- use Server Components where possible

### 4. Trust Signals (for BD Market)
- Cash on Delivery prominently featured
- Phone number visible in header/footer for direct contact
- WhatsApp chat button (floating)
- Order tracking by phone number + order number (no login needed)
- Clear return/exchange policy
- Real product photos (not just stock images)

### 5. Icons, Not Emoji
- Use Lucide React icons throughout
- Key icons needed:
  - Menu (hamburger)
  - Search (magnifying glass)
  - Shopping bag
  - Heart (wishlist)
  - Plus (quick add)
  - Arrow right (CTAs, navigation)
  - X / Close
  - Filter (sliders)
  - Sort (arrows up-down)
  - Phone
  - MapPin
  - Truck (shipping)
  - CreditCard
  - Upload (prescription)
  - Eye (brand motif)
  - Check (success)
  - ChevronDown (dropdowns)
  - Minus / Plus (quantity)
  - Trash (remove)
  - User (account)
  - Package (orders)
  - Star (featured)
  - AlertCircle (low stock)

## Responsive Breakpoints

| Breakpoint | Width    | Layout Changes                              |
|------------|----------|---------------------------------------------|
| Mobile     | < 640px  | 2-col grid, carousels, bottom sheets        |
| Tablet     | 640-1024 | 3-col grid, side filters, larger cards      |
| Desktop    | > 1024   | 4-col grid, sidebar filters, max-width 1280 |
| Wide       | > 1440   | 5-col grid, centered with max-width 1440    |

## Accessibility
- All interactive elements keyboard-navigable
- aria-labels on icon-only buttons
- Color contrast meets WCAG AA (ink on paper = excellent contrast)
- Focus-visible outlines
- Alt text on all product images
- Screen reader announcements for cart updates, filter changes
