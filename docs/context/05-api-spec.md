# EYE PRESTIGE -- API Specification

Base URL: `/api/v1`

## Public Endpoints (No Auth)

### Products

```
GET    /products                    # List products (paginated, filterable)
       ?category=sunglasses
       ?shape=ROUND,AVIATOR
       ?minPrice=500&maxPrice=3000
       ?search=riviera
       ?sort=price_asc|price_desc|name|newest|featured
       ?page=1&limit=12

GET    /products/:slug              # Single product with images, variants
GET    /products/featured           # Featured products for homepage
GET    /categories                  # All categories with product counts
GET    /categories/:key/products    # Products by category key
```

### Orders (Guest)

```
POST   /orders                      # Place order (guest or authenticated)
       Body: {
         items: [{ productId, variantId?, quantity }],
         shipping: { name, phone, division, district, area, address, postalCode? },
         paymentMethod: "COD" | "BKASH" | "NAGAD" | "SSLCOMMERZ",
         prescription?: {
           type: "UPLOAD" | "MANUAL" | "LATER",
           imageUrl?: string,
           rightSph?, rightCyl?, rightAxis?,
           leftSph?, leftCyl?, leftAxis?,
           pd?, additionalNotes?
         },
         customerNote?: string
       }
       Response: { orderId, orderNumber, paymentUrl? }

GET    /orders/:orderNumber/track   # Track order by order number + phone
       ?phone=01XXXXXXXXX
```

### Search

```
GET    /search?q=keyword            # Full-text search across products
       Response: { products: [...], total }
```

### Payments (Callbacks)

```
POST   /payments/bkash/callback     # bKash IPN
POST   /payments/nagad/callback     # Nagad IPN
POST   /payments/ssl/success        # SSL Commerz success redirect
POST   /payments/ssl/fail           # SSL Commerz fail redirect
POST   /payments/ssl/cancel         # SSL Commerz cancel redirect
POST   /payments/ssl/ipn            # SSL Commerz IPN
```

### Upload

```
POST   /upload/prescription         # Upload prescription image
       Content-Type: multipart/form-data
       Body: { file }
       Response: { url }
```

## Authenticated Endpoints (Customer)

### Auth

```
POST   /auth/send-otp              # Send OTP to phone
       Body: { phone: "01XXXXXXXXX" }

POST   /auth/verify-otp            # Verify OTP and get JWT
       Body: { phone, otp }
       Response: { accessToken, customer }

POST   /auth/register              # Create account (post-purchase)
       Body: { phone, name, password? }

GET    /auth/me                    # Current customer profile
PATCH  /auth/me                    # Update profile
```

### Customer Orders

```
GET    /customer/orders             # My order history
GET    /customer/orders/:id         # My order detail
```

### Addresses

```
GET    /customer/addresses          # Saved addresses
POST   /customer/addresses          # Add address
PATCH  /customer/addresses/:id      # Update address
DELETE /customer/addresses/:id      # Remove address
```

### Wishlist

```
GET    /customer/wishlist           # My wishlist
POST   /customer/wishlist           # Add to wishlist
       Body: { productId }
DELETE /customer/wishlist/:productId # Remove from wishlist
```

## Admin Endpoints (Admin Auth Required)

### Dashboard

```
GET    /admin/dashboard             # Today's orders, revenue, stock alerts
       Response: {
         ordersToday, revenueToday, pendingOrders,
         lowStockProducts, recentOrders: [...]
       }
```

### Product Management

```
GET    /admin/products              # All products (paginated, with drafts)
POST   /admin/products              # Create product
GET    /admin/products/:id          # Product detail (admin view)
PATCH  /admin/products/:id          # Update product
DELETE /admin/products/:id          # Soft delete / deactivate

POST   /admin/products/:id/images   # Add images
DELETE /admin/products/:id/images/:imageId

POST   /admin/products/:id/variants # Add variant
PATCH  /admin/products/:id/variants/:variantId
DELETE /admin/products/:id/variants/:variantId
```

### Order Management

```
GET    /admin/orders                # All orders (filterable by status, date)
       ?status=PENDING,CONFIRMED
       ?from=2026-06-01&to=2026-06-22
       ?search=EP-20260622

GET    /admin/orders/:id            # Full order detail with prescription
PATCH  /admin/orders/:id/status     # Update order status
       Body: { status: "CONFIRMED", adminNote? }

PATCH  /admin/orders/:id/payment    # Update payment status
       Body: { paymentStatus: "PAID", paymentRef? }
```

### Prescription Review

```
GET    /admin/prescriptions         # Pending prescriptions
PATCH  /admin/prescriptions/:id     # Review prescription
       Body: { status: "APPROVED" | "REJECTED", note? }
```

### Customer Management

```
GET    /admin/customers             # All customers (paginated)
GET    /admin/customers/:id         # Customer detail with orders
```

### Inventory

```
GET    /admin/inventory             # Stock levels for all products
PATCH  /admin/inventory/:productId  # Update stock
       Body: { stock: 50 }
GET    /admin/inventory/low-stock   # Products below threshold
```

## Response Format

All responses follow:
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 12,
    "total": 48,
    "totalPages": 4
  }
}
```

Error responses:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Phone number is required",
    "details": [...]
  }
}
```

## Rate Limiting
- Public endpoints: 100 requests/minute per IP
- OTP send: 3 requests/10 minutes per phone number
- Admin endpoints: 300 requests/minute per admin
