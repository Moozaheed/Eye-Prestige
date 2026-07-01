# EYE PRESTIGE -- Architecture

## Tech Stack

| Layer        | Technology                | Purpose                              |
|--------------|---------------------------|--------------------------------------|
| Frontend     | Next.js 15 (App Router)   | SSR/SSG storefront, SEO, performance |
| Backend API  | NestJS                    | REST API, business logic, auth       |
| Database     | PostgreSQL                | Primary data store                   |
| ORM          | Prisma                    | Type-safe database access            |
| Styling      | Tailwind CSS 4            | Utility-first CSS, design tokens     |
| Icons        | Lucide React              | SVG icon library (no emoji)          |
| Auth         | Phone OTP (custom)        | BD-friendly, no email required       |
| Payments     | bKash, Nagad, SSL Commerz | BD payment gateways                  |
| File Upload  | Cloudinary / S3           | Product images, prescriptions        |
| SMS          | BulkSMS BD / Twilio       | Order confirmations, OTP             |
| Deployment   | VPS / Docker              | Single server or cloud               |

## Monorepo Structure

```
eye-prestige/
|-- apps/
|   |-- web/                    # Next.js storefront (customer-facing)
|   |   |-- app/
|   |   |   |-- (storefront)/   # Route group for public pages
|   |   |   |   |-- page.tsx              # Homepage
|   |   |   |   |-- shop/
|   |   |   |   |   |-- page.tsx          # Shop All (product listing)
|   |   |   |   |   |-- [slug]/
|   |   |   |   |   |   |-- page.tsx      # Product detail
|   |   |   |   |-- cart/
|   |   |   |   |   |-- page.tsx          # Cart page
|   |   |   |   |-- checkout/
|   |   |   |   |   |-- page.tsx          # Checkout (guest-friendly)
|   |   |   |   |-- order/
|   |   |   |   |   |-- [id]/
|   |   |   |   |   |   |-- page.tsx      # Order confirmation / tracking
|   |   |   |   |-- account/
|   |   |   |   |   |-- page.tsx          # Optional account dashboard
|   |   |   |   |   |-- orders/
|   |   |   |   |   |   |-- page.tsx      # Order history
|   |   |   |-- (admin)/        # Route group for admin panel
|   |   |   |   |-- admin/
|   |   |   |   |   |-- page.tsx          # Dashboard
|   |   |   |   |   |-- products/
|   |   |   |   |   |   |-- page.tsx      # Product list
|   |   |   |   |   |   |-- new/
|   |   |   |   |   |   |   |-- page.tsx  # Add product
|   |   |   |   |   |   |-- [id]/
|   |   |   |   |   |   |   |-- page.tsx  # Edit product
|   |   |   |   |   |-- orders/
|   |   |   |   |   |   |-- page.tsx      # Order management
|   |   |   |   |   |   |-- [id]/
|   |   |   |   |   |   |   |-- page.tsx  # Order detail
|   |   |   |   |   |-- customers/
|   |   |   |   |   |   |-- page.tsx      # Customer list
|   |   |   |   |   |-- inventory/
|   |   |   |   |   |   |-- page.tsx      # Stock management
|   |   |   |-- layout.tsx
|   |   |   |-- globals.css
|   |   |-- components/
|   |   |   |-- layout/
|   |   |   |   |-- Header.tsx
|   |   |   |   |-- Footer.tsx
|   |   |   |   |-- MobileNav.tsx
|   |   |   |   |-- SearchOverlay.tsx
|   |   |   |-- product/
|   |   |   |   |-- ProductCard.tsx
|   |   |   |   |-- ProductGrid.tsx
|   |   |   |   |-- ProductCarousel.tsx
|   |   |   |   |-- CategoryTile.tsx
|   |   |   |   |-- FilterSheet.tsx
|   |   |   |   |-- SortSheet.tsx
|   |   |   |   |-- PrescriptionForm.tsx
|   |   |   |-- cart/
|   |   |   |   |-- CartItem.tsx
|   |   |   |   |-- CartSummary.tsx
|   |   |   |-- checkout/
|   |   |   |   |-- GuestForm.tsx
|   |   |   |   |-- PaymentSelector.tsx
|   |   |   |   |-- AddressForm.tsx
|   |   |   |-- home/
|   |   |   |   |-- HeroBanner.tsx
|   |   |   |   |-- ExploreGrid.tsx
|   |   |   |   |-- CategorySection.tsx
|   |   |   |   |-- BrandStory.tsx
|   |   |   |-- ui/
|   |   |   |   |-- Button.tsx
|   |   |   |   |-- Chip.tsx
|   |   |   |   |-- BottomSheet.tsx
|   |   |   |   |-- Input.tsx
|   |   |   |   |-- Badge.tsx
|   |   |-- lib/
|   |   |   |-- api.ts              # API client for NestJS backend
|   |   |   |-- cart.ts             # Cart state (zustand or context)
|   |   |   |-- utils.ts
|   |   |-- public/
|   |   |   |-- fonts/
|   |   |   |-- images/
|   |   |   |   |-- logo-black.png
|   |   |   |   |-- logo-white.png
|   |   |   |   |-- logo-icon.png
|   |   |-- tailwind.config.ts
|   |   |-- next.config.ts
|   |   |-- package.json
|   |
|   |-- api/                    # NestJS backend
|   |   |-- src/
|   |   |   |-- main.ts
|   |   |   |-- app.module.ts
|   |   |   |-- products/
|   |   |   |   |-- products.module.ts
|   |   |   |   |-- products.controller.ts
|   |   |   |   |-- products.service.ts
|   |   |   |   |-- dto/
|   |   |   |   |   |-- create-product.dto.ts
|   |   |   |   |   |-- update-product.dto.ts
|   |   |   |   |   |-- product-query.dto.ts
|   |   |   |-- orders/
|   |   |   |   |-- orders.module.ts
|   |   |   |   |-- orders.controller.ts
|   |   |   |   |-- orders.service.ts
|   |   |   |   |-- dto/
|   |   |   |   |   |-- create-order.dto.ts
|   |   |   |   |   |-- update-order-status.dto.ts
|   |   |   |-- auth/
|   |   |   |   |-- auth.module.ts
|   |   |   |   |-- auth.controller.ts
|   |   |   |   |-- auth.service.ts
|   |   |   |   |-- guards/
|   |   |   |   |   |-- jwt.guard.ts
|   |   |   |   |   |-- admin.guard.ts
|   |   |   |-- customers/
|   |   |   |   |-- customers.module.ts
|   |   |   |   |-- customers.controller.ts
|   |   |   |   |-- customers.service.ts
|   |   |   |-- payments/
|   |   |   |   |-- payments.module.ts
|   |   |   |   |-- payments.controller.ts
|   |   |   |   |-- payments.service.ts
|   |   |   |   |-- providers/
|   |   |   |   |   |-- bkash.provider.ts
|   |   |   |   |   |-- nagad.provider.ts
|   |   |   |   |   |-- sslcommerz.provider.ts
|   |   |   |-- prescriptions/
|   |   |   |   |-- prescriptions.module.ts
|   |   |   |   |-- prescriptions.controller.ts
|   |   |   |   |-- prescriptions.service.ts
|   |   |   |-- upload/
|   |   |   |   |-- upload.module.ts
|   |   |   |   |-- upload.controller.ts
|   |   |   |   |-- upload.service.ts
|   |   |   |-- sms/
|   |   |   |   |-- sms.module.ts
|   |   |   |   |-- sms.service.ts
|   |   |   |-- prisma/
|   |   |   |   |-- prisma.module.ts
|   |   |   |   |-- prisma.service.ts
|   |   |-- prisma/
|   |   |   |-- schema.prisma
|   |   |   |-- seed.ts
|   |   |   |-- migrations/
|   |   |-- package.json
|   |   |-- nest-cli.json
|
|-- packages/
|   |-- shared/                 # Shared types between frontend and backend
|   |   |-- types/
|   |   |   |-- product.ts
|   |   |   |-- order.ts
|   |   |   |-- customer.ts
|   |   |   |-- prescription.ts
|   |   |-- package.json
|
|-- package.json                # Root workspace config
|-- turbo.json                  # Turborepo config (optional)
|-- docker-compose.yml          # PostgreSQL + app for dev
|-- .env.example
```

## API Base URL Pattern
- Development: `http://localhost:3001/api/v1`
- Production: `https://api.eyeprestige.com/v1`

## Frontend Routing

| Route                    | Page                   | Auth Required |
|--------------------------|------------------------|---------------|
| `/`                      | Homepage               | No            |
| `/shop`                  | Shop All (listing)     | No            |
| `/shop/[slug]`           | Product Detail         | No            |
| `/cart`                  | Shopping Cart          | No            |
| `/checkout`              | Checkout               | No            |
| `/order/[id]`            | Order Confirmation     | No            |
| `/account`               | Account Dashboard      | Yes           |
| `/account/orders`        | Order History          | Yes           |
| `/admin`                 | Admin Dashboard        | Admin         |
| `/admin/products`        | Product Management     | Admin         |
| `/admin/orders`          | Order Management       | Admin         |
| `/admin/customers`       | Customer List          | Admin         |
| `/admin/inventory`       | Stock Management       | Admin         |

## Key Architecture Decisions

1. **Monorepo** -- keeps frontend, backend, and shared types in sync
2. **Server Components** -- Next.js App Router with server components for product pages (SEO), client components for interactive parts (cart, filters)
3. **Cart in localStorage** -- cart state persisted client-side, no auth required to add items
4. **Guest checkout as default** -- phone number is the primary identifier, account creation is post-purchase optional
5. **Phone OTP auth** -- Bangladesh users prefer phone over email; OTP via SMS
6. **Image optimization** -- Next.js Image component with Cloudinary loader for responsive product images
7. **ISR for product pages** -- Incremental Static Regeneration for product detail pages, on-demand revalidation when admin edits
