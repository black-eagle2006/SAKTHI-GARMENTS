# SAKTHI GARMENTS — REST API Specification

All REST endpoints are versioned under the `/api/v1` namespace. Interactive Swagger UI documentation is available at `http://localhost:8080/swagger-ui.html`.

---

## 1. Authentication Standards

Authenticated requests must include an HTTP `Authorization` header containing a valid Bearer token:

```http
Authorization: Bearer <jwt_access_token>
```

Tokens are valid for 24 hours from the time of issuance.

---

## 2. Authentication & Identity Endpoints

### 2.1 Register New Account
`POST /api/v1/auth/register`

Creates a new platform user with the role of `CUSTOMER` or `COMPANY`.

**Request Body**:
```json
{
  "fullName": "Kavitha Raman",
  "email": "kavitha@example.com",
  "password": "SecurePassword@123",
  "phoneNumber": "+91 98401 23456",
  "role": "CUSTOMER"
}
```

**Response (`201 Created`)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "type": "Bearer",
  "userId": 4,
  "email": "kavitha@example.com",
  "fullName": "Kavitha Raman",
  "role": "CUSTOMER"
}
```

---

### 2.2 User Login
`POST /api/v1/auth/login`

Authenticates credentials and returns a signed JWT token.

**Request Body**:
```json
{
  "email": "customer@sakthigarments.in",
  "password": "SakthiAdmin@2026"
}
```

**Response (`200 OK`)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "type": "Bearer",
  "userId": 3,
  "email": "customer@sakthigarments.in",
  "fullName": "Anandha Kumar",
  "role": "CUSTOMER"
}
```

---

### 2.3 Current User Profile
`GET /api/v1/auth/me` *(Requires Auth)*

Returns the authenticated user's profile and company linkage if applicable.

**Response (`200 OK`)**:
```json
{
  "id": 3,
  "email": "customer@sakthigarments.in",
  "fullName": "Anandha Kumar",
  "phoneNumber": "+91 98765 43210",
  "role": "CUSTOMER",
  "isActive": true,
  "companyId": null
}
```

---

## 3. Garment Customizer & 3D Studio Endpoints

### 3.1 Save 3D Customizer Project
`POST /api/v1/customizer/projects` *(Requires Auth)*

Persists garment parameters, 3D colorway, offscreen canvas layer hierarchy, and high-resolution print coordinates.

**Request Body**:
```json
{
  "productId": 1,
  "projectName": "Tiruppur Cyberpunk 2026",
  "garmentColor": "#111827",
  "fabricType": "100% Combed Cotton",
  "fabricGsm": 220,
  "designDataJson": "{\"layers\":[{\"id\":\"layer-1\",\"type\":\"text\",\"content\":\"TIRUPPUR KNIT\",\"x\":1024,\"y\":850,\"scale\":1.2,\"rotation\":0,\"color\":\"#F59E0B\",\"font\":\"Impact\"}]}",
  "thumbnailUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "printExportUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

**Response (`201 Created`)**:
```json
{
  "id": 12,
  "userId": 3,
  "productId": 1,
  "projectName": "Tiruppur Cyberpunk 2026",
  "garmentColor": "#111827",
  "fabricGsm": 220,
  "thumbnailUrl": "data:image/png;base64,...",
  "createdAt": "2026-10-16T11:25:00"
}
```

---

### 3.2 Fetch Pre-Built Design Templates
`GET /api/v1/customizer/templates`

Returns curated typography and graphic templates optimized for DTG printing.

**Response (`200 OK`)**:
```json
[
  {
    "id": "tpl-01",
    "title": "Tiruppur Heritage Typography",
    "category": "Streetwear",
    "thumbnail": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400",
    "layerData": {
      "type": "text",
      "content": "COTTON CAPITAL 1972",
      "font": "Montserrat",
      "color": "#FFFFFF"
    }
  }
]
```

---

## 4. Google Gemini Generative AI Endpoints

### 4.1 Generate Slogans & Micro-Copy
`POST /api/v1/ai/generate-slogan`

Synthesizes apparel slogans tailored to a given theme, niche, or vibe.

**Request Body**:
```json
{
  "theme": "Minimalist Streetwear",
  "vibe": "Edgy & Modern",
  "targetAudience": "Gen-Z Fashion Enthusiasts"
}
```

**Response (`200 OK`)**:
```json
{
  "theme": "Minimalist Streetwear",
  "slogans": [
    "RAW THREADS / HONEST WEAVE",
    "TIRUPPUR ENGINEERED",
    "ESSENTIAL NOISE",
    "SILENCE IN HEAVYWEIGHT 240 GSM",
    "UNBOUND MINIMALISM"
  ],
  "source": "GEMINI_1_5_FLASH"
}
```

---

### 4.2 Synthesize Prompt-Driven Artwork
`POST /api/v1/ai/generate-artwork`

Generates ready-to-print vector and raster artwork based on creative prompt instructions.

**Request Body**:
```json
{
  "prompt": "Geometric tiger face with neon Tamil typography and modern street accents",
  "style": "Cyberpunk Vector",
  "colorPalette": "Gold and Obsidian"
}
```

**Response (`200 OK`)**:
```json
{
  "artworkUrl": "data:image/svg+xml;utf8,...",
  "style": "Cyberpunk Vector",
  "aspectRatio": "1:1",
  "prompt": "Geometric tiger face with neon Tamil typography",
  "recommendedPlacement": "Front Chest Center"
}
```

---

### 4.3 Automated AI Design Critique
`POST /api/v1/ai/design-critique`

Evaluates color contrast, bleeding risks, and printability before final checkout.

**Request Body**:
```json
{
  "garmentColor": "#0F172A",
  "artworkDominantColor": "#1E293B",
  "hasSmallText": true,
  "fabricGsm": 220
}
```

**Response (`200 OK`)**:
```json
{
  "printabilityScore": 68,
  "contrastRating": "MODERATE_RISK",
  "recommendations": [
    "High risk of low contrast: Dark Slate artwork on Navy garment may blend into background under artificial lighting.",
    "Recommendation: Apply a 2px white or gold stroke/underbase to boost legibility.",
    "220 GSM Combed Cotton is ideal for high-definition Direct-To-Garment (DTG) printing."
  ],
  "suggestedPrintingMethod": "DTG with Dual White Underbase"
}
```

---

## 5. Server-Side Pricing Engine Endpoints

### 5.1 Calculate Deterministic Itemized Pricing
`POST /api/v1/pricing/calculate`

Computes mathematically tamper-proof order pricing including volume discounts and GST.

**Request Body**:
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 50,
      "size": "L",
      "hasFrontDecal": true,
      "hasBackDecal": false,
      "fabricGsm": 220
    }
  ]
}
```

**Response (`200 OK`)**:
```json
{
  "baseSubtotal": 14950.00,
  "frontSurcharge": 2500.00,
  "backSurcharge": 0.00,
  "volumeDiscountPercentage": 10.0,
  "discountAmount": 1745.00,
  "netSubtotal": 15705.00,
  "gstRatePercentage": 5.0,
  "gstAmount": 785.25,
  "shippingFee": 0.00,
  "finalTotal": 16490.25,
  "currency": "INR"
}
```

---

## 6. Checkout & Payment Endpoints

### 6.1 Initialize Order & Razorpay ID
`POST /api/v1/checkout/create-order` *(Requires Auth)*

Calculates server-side total, creates internal order record in `PENDING_PAYMENT`, and generates a Razorpay Order ID.

**Request Body**:
```json
{
  "items": [
    {
      "productId": 1,
      "designProjectId": 12,
      "size": "XL",
      "color": "Black",
      "quantity": 2
    }
  ],
  "shippingAddress": "Plot 42, Textile Park, Town Hall Road",
  "city": "Tiruppur",
  "state": "Tamil Nadu",
  "pincode": "641601",
  "contactPhone": "+91 94432 00000"
}
```

**Response (`201 Created`)**:
```json
{
  "orderId": 84,
  "orderNumber": "SG-2026-8812",
  "totalAmount": 732.90,
  "currency": "INR",
  "razorpayOrderId": "order_RZP881249128",
  "status": "PENDING_PAYMENT"
}
```

---

### 6.2 Verify Razorpay HMAC Signature
`POST /api/v1/checkout/verify-payment` *(Requires Auth)*

Verifies SHA-256 HMAC signature. On success, transitions order to `CONFIRMED` and queues for production.

**Request Body**:
```json
{
  "orderId": 84,
  "razorpayOrderId": "order_RZP881249128",
  "razorpayPaymentId": "pay_RZP99281726",
  "razorpaySignature": "4a7f23c91e84b..."
}
```

**Response (`200 OK`)**:
```json
{
  "success": true,
  "orderId": 84,
  "orderNumber": "SG-2026-8812",
  "status": "CONFIRMED",
  "trackingNumber": "SG-TRK-8812-IN",
  "message": "Payment verified successfully. Order scheduled for bio-wash and DTG production."
}
```

---

## 7. Order Fulfillment & Tracking Endpoints

### 7.1 Track Order by Tracking Code
`GET /api/v1/orders/track/{trackingNumber}`

Public endpoint allowing buyers to inspect live production milestones and courier status.

**Response (`200 OK`)**:
```json
{
  "orderNumber": "SG-2026-8812",
  "trackingNumber": "SG-TRK-8812-IN",
  "currentStatus": "IN_PRODUCTION",
  "carrier": "Blue Dart Express",
  "estimatedDelivery": "2026-10-20",
  "milestones": [
    { "stage": "ORDER_CONFIRMED", "timestamp": "2026-10-16T11:30:00", "completed": true },
    { "stage": "FABRIC_SELECTION", "timestamp": "2026-10-16T14:00:00", "completed": true },
    { "stage": "DTG_PRINTING", "timestamp": "2026-10-17T09:00:00", "completed": true },
    { "stage": "QUALITY_AUDIT", "timestamp": null, "completed": false },
    { "stage": "DISPATCHED", "timestamp": null, "completed": false },
    { "stage": "DELIVERED", "timestamp": null, "completed": false }
  ]
}
```

---

## 8. B2B Tiruppur Marketplace & Mill Endpoints

### 8.1 Search Tiruppur Mills by Geolocation Radius
`GET /api/v1/companies/nearby?latitude=11.1085&longitude=77.3411&radiusKm=15`

Searches certified textile manufacturers located within a specified radius of coordinates or pincode.

**Response (`200 OK`)**:
```json
[
  {
    "id": 1,
    "companyName": "SAKTHI GARMENTS",
    "contactPerson": "K. Sakthivel",
    "city": "Tiruppur",
    "pincode": "641601",
    "address": "Town Hall Road",
    "distanceKm": 0.0,
    "sampleAvailable": true,
    "samplePrice": 69.00,
    "publishedPriceRange": "₹249 - ₹499",
    "description": "Featured flagship textile manufacturer in Tiruppur. Specializing in 100% bio-washed combed cotton."
  }
]
```

---

### 8.2 Order Fabric Swatch Evaluation Pack (₹69)
`POST /api/v1/samples` *(Requires Auth)*

Dispatches a physical touch-and-feel fabric swatch pack containing combed cotton samples in assorted GSM weights.

**Request Body**:
```json
{
  "companyId": 1,
  "productId": 3,
  "shippingAddress": "14 MG Road, Indiranagar, Bengaluru, Karnataka - 560038"
}
```

**Response (`201 Created`)**:
```json
{
  "sampleRequestId": 18,
  "companyName": "SAKTHI GARMENTS",
  "samplePrice": 69.00,
  "status": "REQUESTED",
  "trackingNumber": "SG-SMP-9912-IN"
}
```
