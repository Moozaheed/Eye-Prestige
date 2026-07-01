# EYE PRESTIGE -- Data Models

## Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─────────────── PRODUCTS ───────────────

model Category {
  id          String    @id @default(cuid())
  key         String    @unique   // sunglasses, optical, bluecut, nightdrive, daywear, threein1
  name        String               // Display name: "Sunglasses", "3 In 1"
  nameBn      String?              // Bangla name (optional)
  description String?
  image       String?              // Category cover image URL
  sortOrder   Int       @default(0)
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Product {
  id                  String           @id @default(cuid())
  name                String
  nameBn              String?          // Bangla name
  slug                String           @unique
  description         String?
  descriptionBn       String?
  price               Int              // Price in BDT (paisa-free, whole taka)
  compareAtPrice      Int?             // Original price for showing discount
  shape               Shape
  categoryId          String
  category            Category         @relation(fields: [categoryId], references: [id])
  images              ProductImage[]
  variants            ProductVariant[]
  prescriptionRequired Boolean         @default(false)
  featured            Boolean          @default(false)
  isActive            Boolean          @default(true)
  stock               Int              @default(0)
  sku                 String?          @unique
  orderItems          OrderItem[]
  wishlistItems       WishlistItem[]
  createdAt           DateTime         @default(now())
  updatedAt           DateTime         @updatedAt

  @@index([categoryId])
  @@index([shape])
  @@index([isActive, featured])
}

enum Shape {
  ROUND
  SQUARE
  AVIATOR
  CAT_EYE
  RECTANGLE
}

model ProductImage {
  id        String  @id @default(cuid())
  url       String
  alt       String?
  sortOrder Int     @default(0)
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model ProductVariant {
  id        String      @id @default(cuid())
  name      String      // e.g., "Black Frame", "Tortoise"
  color     String?     // Hex color code
  price     Int?        // Override price, null = use product price
  stock     Int         @default(0)
  sku       String?     @unique
  image     String?     // Variant-specific image
  productId String
  product   Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  orderItems OrderItem[]
}

// ─────────────── CUSTOMERS ───────────────

model Customer {
  id            String        @id @default(cuid())
  phone         String        @unique   // Primary identifier: 01XXXXXXXXX
  name          String?
  email         String?       @unique
  passwordHash  String?                 // Optional, for account creation
  addresses     Address[]
  orders        Order[]
  wishlistItems WishlistItem[]
  role          Role          @default(CUSTOMER)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

enum Role {
  CUSTOMER
  ADMIN
}

model Address {
  id          String    @id @default(cuid())
  label       String?   // "Home", "Office"
  fullName    String
  phone       String
  division    String    // Dhaka, Chittagong, etc.
  district    String
  area        String    // Thana/Upazila
  address     String    // Full street address
  postalCode  String?
  isDefault   Boolean   @default(false)
  customerId  String
  customer    Customer  @relation(fields: [customerId], references: [id], onDelete: Cascade)
  orders      Order[]
}

model WishlistItem {
  id         String   @id @default(cuid())
  customerId String
  customer   Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)
  productId  String
  product    Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  createdAt  DateTime @default(now())

  @@unique([customerId, productId])
}

// ─────────────── ORDERS ───────────────

model Order {
  id              String          @id @default(cuid())
  orderNumber     String          @unique  // EP-20260622-XXXX format
  status          OrderStatus     @default(PENDING)
  paymentMethod   PaymentMethod
  paymentStatus   PaymentStatus   @default(UNPAID)
  paymentRef      String?                  // Transaction ID from gateway

  // Guest order fields (no account required)
  guestName       String?
  guestPhone      String?
  guestEmail      String?

  // Linked customer (if logged in)
  customerId      String?
  customer        Customer?       @relation(fields: [customerId], references: [id])

  // Shipping address (snapshot at order time)
  addressId       String?
  address         Address?        @relation(fields: [addressId], references: [id])
  shippingName    String
  shippingPhone   String
  shippingDivision String
  shippingDistrict String
  shippingArea    String
  shippingAddress String
  shippingPostal  String?

  // Amounts
  subtotal        Int             // Sum of item prices
  shippingCost    Int             @default(0)
  discount        Int             @default(0)
  total           Int             // subtotal + shipping - discount

  // Items
  items           OrderItem[]
  prescription    Prescription?

  // Notes
  customerNote    String?
  adminNote       String?

  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt

  @@index([status])
  @@index([guestPhone])
  @@index([customerId])
  @@index([createdAt])
}

enum OrderStatus {
  PENDING         // Just placed
  CONFIRMED       // Admin confirmed
  PROCESSING      // Being prepared (prescription review, lens cutting)
  SHIPPED         // Handed to courier
  DELIVERED       // Customer received
  CANCELLED       // Cancelled
  RETURNED        // Returned
}

enum PaymentMethod {
  COD
  BKASH
  NAGAD
  SSLCOMMERZ
}

enum PaymentStatus {
  UNPAID
  PAID
  REFUNDED
  FAILED
}

model OrderItem {
  id          String          @id @default(cuid())
  orderId     String
  order       Order           @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId   String
  product     Product         @relation(fields: [productId], references: [id])
  variantId   String?
  variant     ProductVariant? @relation(fields: [variantId], references: [id])
  quantity    Int
  unitPrice   Int             // Price at time of order
  totalPrice  Int             // unitPrice * quantity

  // Snapshot for historical accuracy
  productName String
  productImage String?
}

// ─────────────── PRESCRIPTIONS ───────────────

model Prescription {
  id              String              @id @default(cuid())
  orderId         String              @unique
  order           Order               @relation(fields: [orderId], references: [id], onDelete: Cascade)
  type            PrescriptionType
  imageUrl        String?             // Uploaded prescription photo
  // Manual entry fields
  rightSph        String?
  rightCyl        String?
  rightAxis       String?
  leftSph         String?
  leftCyl         String?
  leftAxis        String?
  pd              String?             // Pupillary distance
  additionalNotes String?
  status          PrescriptionStatus  @default(PENDING)
  reviewedBy      String?             // Admin who reviewed
  createdAt       DateTime            @default(now())
  updatedAt       DateTime            @updatedAt
}

enum PrescriptionType {
  UPLOAD          // Customer uploaded image
  MANUAL          // Customer entered values
  LATER           // Will provide via WhatsApp/call
}

enum PrescriptionStatus {
  PENDING
  REVIEWED
  APPROVED
  REJECTED       // Needs re-upload
}
```

## Key Design Decisions

1. **Phone as primary identifier** -- `Customer.phone` is unique; email is optional. Matches BD user behavior.
2. **Guest orders** -- Orders can be placed without a `customerId`. Guest info stored directly on the Order.
3. **Address snapshot** -- Shipping address fields are denormalized on Order so changes to saved addresses don't affect historical orders.
4. **Price in whole BDT** -- No decimal handling needed. `Int` type for BDT amounts.
5. **Order number format** -- `EP-YYYYMMDD-XXXX` (e.g., `EP-20260622-0001`) for human-readable tracking.
6. **Prescription linked to Order** -- Each order with prescription items gets one prescription record. Reviewed by admin before processing.
7. **Product variants** -- Color/frame variants with optional price override and stock tracking per variant.
