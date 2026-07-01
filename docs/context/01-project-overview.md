# EYE PRESTIGE -- Project Overview

## Brand
**EYE PRESTIGE** is a Bangladesh-based eyewear e-commerce brand selling eyeglasses and sunglasses. The brand positions itself as modern, premium, and accessible -- "Modern Eyewear for Everyday Icons."

**Reference site:** urbalandbd.com (for Bangla-English language mix pattern and local e-commerce UX)

## Target Audience
- Young professionals and students in Bangladesh (18-40)
- People looking for affordable premium eyewear
- Customers who prefer quick, hassle-free ordering (especially mobile users)
- Both Bangla and English speaking customers

## Core Goals
1. **Frictionless ordering** -- customers can place orders as guests (phone + name + address). Optional account creation for order history.
2. **Bangla-English mix** -- UI labels, product descriptions, and CTAs use a natural Bangla-English mix (Banglish). Example: "Order korte Shop e jan" instead of pure English or pure Bangla.
3. **Mobile-first** -- primary traffic will be mobile. Design and build mobile-first, responsive to desktop.
4. **No emoji** -- use SVG icons throughout. The brand is minimal and clean.
5. **Fast checkout** -- minimize steps between product discovery and order placement.

## Product Categories
| Key         | Display Name  | Description                                    |
|-------------|---------------|------------------------------------------------|
| sunglasses  | Sunglasses    | Fashion and UV protection sunglasses           |
| optical     | Optical       | Prescription eyeglasses (requires Rx upload)   |
| bluecut     | Bluecut       | Blue light filtering glasses for screen use    |
| nightdrive  | Night Drive   | Anti-glare glasses for night driving           |
| daywear     | Day Wear      | Everyday casual eyewear                        |
| threein1    | 3 In 1        | Convertible frames with interchangeable lenses |

## Product Attributes
- Name
- Price (BDT -- Bangladeshi Taka)
- Category (one of the 6 above)
- Shape (Round, Square, Aviator, Cat-Eye, Rectangle)
- Images (multiple per product)
- Description
- Color/variant options
- Stock status
- Prescription required (boolean, for optical/bluecut)

## Payment Methods
All four supported:
1. **Cash on Delivery (COD)** -- default, most popular in BD
2. **bKash** -- mobile financial service
3. **Nagad** -- mobile financial service
4. **SSL Commerz** -- credit/debit card gateway

## Order Flow (Guest-friendly)
1. Browse/search products
2. Add to cart
3. Checkout: enter name, phone, address (no account required)
4. If optical/bluecut: upload prescription image OR enter power values (SPH, CYL, Axis) OR choose to provide later via WhatsApp/call
5. Select payment method
6. Place order
7. Order confirmation via SMS + optional WhatsApp notification
8. Optional: create account post-purchase to track future orders

## Prescription Handling
For Optical and Bluecut categories:
- Upload prescription image (photo of doctor's prescription)
- Manual entry form: Left eye (SPH, CYL, Axis, PD), Right eye (SPH, CYL, Axis, PD)
- "I'll provide later" option -- customer contacts via WhatsApp/phone after ordering

## Admin Requirements
Full admin panel:
- Dashboard (orders today, revenue, stock alerts)
- Product management (CRUD, images, variants, stock)
- Order management (status updates, payment tracking)
- Inventory tracking
- Customer list
- Prescription review (view uploaded prescriptions per order)
- Basic analytics

## Tech Stack
- **Frontend:** Next.js (App Router, TypeScript)
- **Backend:** NestJS (TypeScript, REST API)
- **Database:** PostgreSQL (via Prisma ORM)
- **Styling:** Tailwind CSS (matching the design system colors)
- **Icons:** Lucide React (SVG icon library, no emoji)
- **Image hosting:** Cloudinary or local uploads
- **Auth:** NextAuth.js (optional account, phone-based OTP for BD market)
- **Admin:** Separate Next.js admin app or admin routes within same app
