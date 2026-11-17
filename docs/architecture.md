# SAKTHI GARMENTS — System Architecture & Design Manual

## 1. Architectural Philosophy

SAKTHI GARMENTS is built on the principles of **high visual luxury**, **mathematical deterministic accuracy**, and **operational resilience**. The platform directly connects the textile industrial ecosystem of Tiruppur with global and domestic buyers through high-performance real-time 3D graphics, generative AI, and transactional reliability.

```mermaid
graph TB
    subgraph ClientLayer ["Client Layer (React 18 + Three.js)"]
        UI[Tailwind CSS & Framer Motion UI]
        R3F[React Three Fiber Canvas]
        CustomizerCtx[Customizer State & Decal Pipeline]
        CartCtx[Cart & Pricing Context]
        AuthCtx[JWT Auth Session State]
    end

    subgraph GatewayLayer ["Reverse Proxy & Web Server"]
        Nginx[Nginx HTTP/2 Proxy]
        ViteDev[Vite Proxy (Dev)]
    end

    subgraph BackendLayer ["Spring Boot 3.3.4 Enterprise Core"]
        Security[Spring Security 6 + JwtFilter]
        Controllers[REST API Controllers]
        
        subgraph DomainServices ["Domain Services"]
            PricingSvc[Deterministic Pricing Engine]
            OrderSvc[Order & Fulfillment Lifecycle]
            GeminiSvc[Gemini AI Client & Fallback Engine]
            PaymentSvc[Razorpay Payment & Verification Engine]
            AuthSvc[User Auth & BCrypt Service]
        end
        
        Repositories[Spring Data JPA Repositories]
    end

    subgraph DataLayer ["Persistence & External Services"]
        Flyway[Flyway Schema Migrations]
        MySQL[(MySQL 8.0 / H2 Memory)]
        GeminiAPI[Google Gemini 1.5 Flash API]
        RazorpayAPI[Razorpay Payment Gateway]
    end

    UI --> Nginx
    R3F --> CustomizerCtx
    Nginx --> Security
    ViteDev --> Security
    Security --> Controllers
    Controllers --> DomainServices
    DomainServices --> Repositories
    Repositories --> MySQL
    GeminiSvc --> GeminiAPI
    PaymentSvc --> RazorpayAPI
    Flyway --> MySQL
```

---

## 2. Frontend 3D Graphics & Rendering Pipeline

### 2.1 Procedural T-Shirt Mesh Geometry
Rather than relying on heavy, unoptimized external `.gltf` or `.obj` files that suffer from slow download times, texture misalignment, and rigid UV unwrapping, SAKTHI GARMENTS utilizes an **anatomical procedural 3D model** crafted directly in Three.js and React Three Fiber:
- **Torso**: Sculpted cylinder with anatomical tapering at the waist, ergonomic chest curvature, and soft rounded shoulders.
- **Sleeves**: Dual angled truncated cones with ergonomic cuff rings matched to standard half-sleeve apparel geometry.
- **Ribbed Collar**: Circular torus geometry with custom radial thickness matching 1x1 rib-knit cotton necklines.
- **Bottom Hem**: Subtle toroidal piping creating the realistic rolled hem of a luxury combed cotton t-shirt.

### 2.2 Procedural Micro-Weave Fabric Bump Mapping
Realistic fabric texture is synthesized on demand via HTML5 2D Canvas in `frontend/src/three/proceduralTextures.ts`:
- Generates a seamless 512×512 normal/bump map mimicking 220 GSM single-jersey combed cotton knit patterns.
- High-frequency sinusoidal wave interlacing creates micro-crevices that catch specular light naturally.
- Zero network latency and zero asset download overhead.

### 2.3 Dynamic Multi-Layer Decal Texture Projection
The customizer supports multiple concurrent design layers (text slogans, uploaded brand logos, Gemini AI artwork, and pre-designed vector graphics):
- **Canvas Decal Compositor**: An offscreen high-resolution 2048×2048 HTML5 canvas synthesizes active layers in their user-defined z-index hierarchy.
- **Dynamic Decal Mapping**: The composited texture is dynamically projected onto the front or back chest printable zone of the procedural mesh using Three.js `CanvasTexture` with `LinearFilter` and `SRGBColorSpace`.
- **High-Resolution Print Pack Generator**: When the user exports or saves a design, the engine generates both a 3D composite preview thumbnail and an isolated 300 DPI transparent PNG containing exact pixel coordinates for the factory DTG printer.

### 2.4 Cinematic Lighting & Studio Ambience
The 3D studio (`frontend/src/three/StudioLighting.tsx`) simulates a professional apparel photography studio:
- **Key Light**: High-intensity directional warm light positioned at 45° with soft shadow casting.
- **Fill Light**: Cool, diffuse directional light balancing harsh shadows on the opposite flank.
- **Rim Light (Back)**: High-altitude backlight emphasizing the silhouette edges of the garment against the backdrop.
- **Hemisphere Ambient**: Gradient sky/ground reflection ensuring natural ambient illumination.

### 2.5 6-Scene GSAP Scroll Choreo (Landing Experience)
The homepage hero canvas features a unified 3D canvas tied to the window scroll position via GSAP `ScrollTrigger`:
1. **Scene 1 (Hero Entrance)**: Macro camera angle inspecting the microscopic cotton weave texture.
2. **Scene 2 (360° Craftsmanship Spin)**: Smooth orbital rotation demonstrating seamless fit and bio-wash drape.
3. **Scene 3 (Exploded Customizer Layers)**: The decal separates forward from the fabric in 3D space, visualizing DTG print layers.
4. **Scene 4 (Tiruppur Origin)**: Camera pulls back with warm atmospheric lighting reflecting the heritage mills of Tamil Nadu.
5. **Scene 5 (B2B Swatch Showcase)**: Smooth transition to the physical sample swatch pack (starting at ₹69).
6. **Scene 6 (Call-to-Action)**: Studio locks into front-center view ready for immediate customization.

---

## 3. Backend Architecture

### 3.1 Layered Clean Architecture
The Spring Boot backend enforces strict boundary separation across packages:
- `com.sakthigarments.config`: Security filters, CORS policies, JWT token verification, and Swagger OpenAPI metadata.
- `com.sakthigarments.controller`: HTTP routing, query parsing, payload validation (`@Valid`), and standardized JSON envelope formatting.
- `com.sakthigarments.dto`: Strongly typed request/response data transfer objects decoupling internal entity structures from external public APIs.
- `com.sakthigarments.model`: JPA entities mapping relational tables with database constraints and audit timestamps.
- `com.sakthigarments.repository`: Spring Data JPA data access interfaces leveraging indexed queries and transactional scopes.
- `com.sakthigarments.service`: Core business rules, deterministic pricing calculations, AI synthesizers, and payment signatures.
- `com.sakthigarments.exception`: Centralized `@RestControllerAdvice` converting exceptions to RFC 7807 Problem Details.

### 3.2 Deterministic Pricing Engine
To guarantee zero price manipulation, client-provided total amounts are strictly ignored during checkout. Pricing is computed server-side in `PricingService`:

$$\text{Subtotal} = (\text{BasePrice} + \text{GSM Premium} + \text{FrontSurcharge} + \text{BackSurcharge}) \times \text{Quantity} \times (1 - \text{DiscountRate})$$

$$\text{Tax (GST 5\%)} = \text{Subtotal} \times 0.05$$

$$\text{Shipping Fee} = \begin{cases} 0.00 & \text{if Subtotal} \ge 999.00 \\ 50.00 & \text{otherwise} \end{cases}$$

$$\text{Final Total} = \text{Subtotal} + \text{Tax} + \text{Shipping Fee}$$

**Tiered Bulk Volume Discount Matrix**:
- 1 – 9 units: 0% discount
- 10 – 49 units: 5% discount
- 50 – 99 units: 10% discount
- 100 – 499 units: 20% discount
- 500+ units: 30% discount

### 3.3 Google Gemini AI Integration & Fallback Strategy
`GeminiAiService` communicates via HTTPS REST with Google's Generative Language API (`gemini-1.5-flash`):
- **Resilience Guarantee**: If the user has not configured `GEMINI_API_KEY`, or if Google's API exceeds the 10-second timeout threshold, the service seamlessly falls back to an intelligent built-in semantic design engine. The application **never** crashes or returns HTTP 500 due to AI availability.
- **Design Critique Prompting**: Analyzes hex color contrast ratios against selected fabric shades and outputs structured ratings for visual punch, fabric bleeding risk, and printing recommendations.

---

## 4. Security Architecture

1. **Stateless JWT Authentication**:
   - Access tokens signed using HMAC SHA-256 with a 256-bit cryptographically secure secret.
   - Tokens carry user subject, authorities/roles (`ROLE_ADMIN`, `ROLE_COMPANY`, `ROLE_CUSTOMER`), and 24-hour expiration.
   - `JwtAuthenticationFilter` intercepts requests, validates the signature, and sets the `SecurityContext`.

2. **Password Security**:
   - All passwords hashed using the BCrypt strong hashing algorithm with default work factor 10.
   - Plaintext passwords never logged or persisted.

3. **Payment Integrity**:
   - Razorpay orders created on the backend with exact integer paise amounts.
   - Post-payment verification validates the cryptographic HMAC SHA-256 signature calculated from `order_id + "|" + payment_id` against the secret key.
   - Unverified payments are permanently locked in `PAYMENT_FAILED` status.

4. **Cross-Origin Resource Sharing (CORS)**:
   - Configured in `SecurityConfig` to restrict unauthorized external cross-origin exploitation while allowing local development ports (`5173`, `3000`).
