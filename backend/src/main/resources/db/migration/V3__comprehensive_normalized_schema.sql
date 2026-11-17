-- =============================================================================
-- SAKTHI GARMENTS — Normalized Relational Enterprise Schema (V3)
-- Comprehensive Schema Expansion & Migration from Legacy MongoDB to MySQL 8
-- =============================================================================

-- 1. ROLES & USER ROLE ASSIGNMENTS
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. CUSTOMER PROFILES & ADDRESSES
CREATE TABLE IF NOT EXISTS addresses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    landmark VARCHAR(150),
    city VARCHAR(80) NOT NULL,
    state VARCHAR(80) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    address_type VARCHAR(30) DEFAULT 'SHIPPING', -- SHIPPING, BILLING, FACTORY
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_address_pincode (pincode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS customer_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    default_shipping_address_id BIGINT NULL,
    gst_number VARCHAR(30),
    business_name VARCHAR(150),
    loyalty_points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (default_shipping_address_id) REFERENCES addresses(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. COMPANY DOCUMENTS (Compliance & Tiruppur Mill Verification)
CREATE TABLE IF NOT EXISTS company_documents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id BIGINT NOT NULL,
    document_type VARCHAR(50) NOT NULL, -- GST_CERTIFICATE, MSME_UDYAM, FACTORY_LICENSE, POLLUTION_BOARD
    document_name VARCHAR(180) NOT NULL,
    file_url VARCHAR(255) NOT NULL,
    verification_status VARCHAR(30) DEFAULT 'VERIFIED', -- PENDING, VERIFIED, REJECTED
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company_profiles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. PRODUCT VARIANTS, IMAGES & INVENTORY
CREATE TABLE IF NOT EXISTS product_variants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    sku VARCHAR(100) NOT NULL UNIQUE,
    size VARCHAR(20) NOT NULL, -- S, M, L, XL, XXL, XXXL
    color_name VARCHAR(60) NOT NULL,
    color_hex VARCHAR(20) NOT NULL,
    fabric_gsm INT NOT NULL DEFAULT 220,
    price_adjustment DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_variant_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS product_images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(150),
    display_order INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS inventory (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_variant_id BIGINT NOT NULL UNIQUE,
    warehouse_location VARCHAR(100) DEFAULT 'Sakthi Mill Central Warehouse, Tiruppur',
    quantity_available INT NOT NULL DEFAULT 500,
    quantity_reserved INT NOT NULL DEFAULT 0,
    safety_stock INT NOT NULL DEFAULT 50,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_variant_id) REFERENCES product_variants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. PRICING RULES (Tiered Volume Discounts & Surcharges)
CREATE TABLE IF NOT EXISTS pricing_rules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    rule_name VARCHAR(120) NOT NULL,
    rule_type VARCHAR(50) NOT NULL, -- VOLUME_DISCOUNT, FABRIC_SURCHARGE, PRINT_SURCHARGE
    min_quantity INT NOT NULL DEFAULT 1,
    max_quantity INT NULL,
    discount_percentage DECIMAL(5,2) DEFAULT 0.00,
    fixed_surcharge DECIMAL(10,2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. DESIGN LAYERS & TEMPLATES
CREATE TABLE IF NOT EXISTS design_layers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    layer_type VARCHAR(30) NOT NULL, -- TEXT, IMAGE, AI_ART, TEMPLATE
    layer_order INT NOT NULL DEFAULT 0,
    placement VARCHAR(20) DEFAULT 'FRONT', -- FRONT, BACK, SLEEVE
    content TEXT NOT NULL,
    font_family VARCHAR(60),
    font_size INT,
    color_hex VARCHAR(20),
    x_pos DOUBLE NOT NULL DEFAULT 1024.0,
    y_pos DOUBLE NOT NULL DEFAULT 1024.0,
    scale_val DOUBLE NOT NULL DEFAULT 1.0,
    rotation_val DOUBLE NOT NULL DEFAULT 0.0,
    opacity_val DOUBLE NOT NULL DEFAULT 1.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES design_projects(id) ON DELETE CASCADE,
    INDEX idx_layers_project (project_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS design_templates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(60) NOT NULL DEFAULT 'Streetwear',
    tags VARCHAR(255),
    preview_url VARCHAR(255),
    template_json LONGTEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. SHOPPING CARTS & CART ITEMS
CREATE TABLE IF NOT EXISTS carts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NULL,
    session_token VARCHAR(120) NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cart_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cart_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    variant_id BIGINT NULL,
    design_project_id BIGINT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    custom_attributes_json TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE SET NULL,
    FOREIGN KEY (design_project_id) REFERENCES design_projects(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. ORDER STATUS HISTORY, PAYMENTS, REFUNDS & SHIPMENTS
CREATE TABLE IF NOT EXISTS order_status_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    previous_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    comment TEXT,
    changed_by_user_id BIGINT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_order_status_history (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    payment_gateway VARCHAR(50) NOT NULL DEFAULT 'RAZORPAY',
    gateway_order_id VARCHAR(120),
    gateway_payment_id VARCHAR(120),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(40) NOT NULL DEFAULT 'COMPLETED', -- PENDING, COMPLETED, FAILED, REFUNDED
    signature_verified BOOLEAN DEFAULT TRUE,
    error_code VARCHAR(100),
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_payments_order (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS refunds (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    payment_id BIGINT NOT NULL,
    order_id BIGINT NOT NULL,
    refund_amount DECIMAL(10,2) NOT NULL,
    reason TEXT NOT NULL,
    gateway_refund_id VARCHAR(120),
    status VARCHAR(40) DEFAULT 'PROCESSED', -- PENDING, PROCESSED, FAILED
    initiated_by_user_id BIGINT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS shipments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL UNIQUE,
    tracking_number VARCHAR(100) NOT NULL UNIQUE,
    carrier_name VARCHAR(100) NOT NULL DEFAULT 'Blue Dart / India Post',
    carrier_service VARCHAR(80) DEFAULT 'Express Air Surface',
    dispatch_date TIMESTAMP NULL,
    estimated_delivery_date DATE NULL,
    actual_delivery_date TIMESTAMP NULL,
    shipment_status VARCHAR(50) NOT NULL DEFAULT 'IN_TRANSIT',
    tracking_history_json LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. B2B QUOTATIONS FOR BULK ORDERS
CREATE TABLE IF NOT EXISTS quotations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    bulk_order_request_id BIGINT NOT NULL,
    company_id BIGINT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    estimated_production_days INT DEFAULT 5,
    valid_until DATE,
    remarks TEXT,
    status VARCHAR(40) DEFAULT 'SUBMITTED', -- SUBMITTED, ACCEPTED, DECLINED, EXPIRED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bulk_order_request_id) REFERENCES bulk_order_requests(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES company_profiles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. NOTIFICATIONS, SUPPORT TICKETS & REVIEWS
CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(180) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50) DEFAULT 'ORDER_UPDATE', -- ORDER_UPDATE, QUOTE_RECEIVED, SYSTEM
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_notifications_user (user_id, is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS support_tickets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    ticket_number VARCHAR(60) NOT NULL UNIQUE,
    subject VARCHAR(200) NOT NULL,
    category VARCHAR(60) DEFAULT 'ORDER_ENQUIRY',
    priority VARCHAR(30) DEFAULT 'MEDIUM',
    status VARCHAR(40) DEFAULT 'OPEN', -- OPEN, IN_PROGRESS, RESOLVED, CLOSED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS support_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ticket_id BIGINT NOT NULL,
    sender_user_id BIGINT NOT NULL,
    sender_role VARCHAR(30) NOT NULL,
    message_body TEXT NOT NULL,
    attachment_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    order_id BIGINT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(150),
    review_text TEXT,
    is_verified_purchase BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,
    INDEX idx_reviews_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NULL,
    entity_name VARCHAR(100) NOT NULL,
    entity_id BIGINT NULL,
    action_type VARCHAR(50) NOT NULL, -- CREATE, UPDATE, DELETE, LOGIN, EXPORT
    old_values_json LONGTEXT,
    new_values_json LONGTEXT,
    ip_address VARCHAR(60),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_audit_entity (entity_name, entity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- SEED DATA FOR EXPANDED NORMALIZED ENTITIES
-- =============================================================================

-- Seed Standard Roles
INSERT INTO roles (id, name, description) VALUES
(1, 'ROLE_ADMIN', 'Platform Administrator with global oversight and approval controls'),
(2, 'ROLE_COMPANY', 'Tiruppur Mill Partner managing factory catalog, production queue, and quotes'),
(3, 'ROLE_CUSTOMER', 'Registered consumer or corporate apparel buyer')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Associate initial users with roles
INSERT INTO user_roles (user_id, role_id) VALUES
(1, 1),
(2, 2),
(3, 3)
ON DUPLICATE KEY UPDATE user_id = VALUES(user_id);

-- Seed Tiered Volume Pricing Rules
INSERT INTO pricing_rules (id, rule_name, rule_type, min_quantity, max_quantity, discount_percentage, fixed_surcharge, is_active) VALUES
(1, 'Single Unit Standard', 'VOLUME_DISCOUNT', 1, 9, 0.00, 0.00, TRUE),
(2, 'Starter Bulk Discount', 'VOLUME_DISCOUNT', 10, 49, 5.00, 0.00, TRUE),
(3, 'Wholesale Tier 1', 'VOLUME_DISCOUNT', 50, 99, 10.00, 0.00, TRUE),
(4, 'Commercial Tier 2', 'VOLUME_DISCOUNT', 100, 499, 20.00, 0.00, TRUE),
(5, 'Industrial Mill Direct', 'VOLUME_DISCOUNT', 500, NULL, 30.00, 0.00, TRUE),
(6, 'Front Chest Custom Print Surcharge', 'PRINT_SURCHARGE', 1, NULL, 0.00, 50.00, TRUE),
(7, 'Back Print Complex Surcharge', 'PRINT_SURCHARGE', 1, NULL, 0.00, 80.00, TRUE)
ON DUPLICATE KEY UPDATE rule_name = VALUES(rule_name);

-- Seed Design Templates
INSERT INTO design_templates (id, title, category, tags, preview_url, template_json, is_active) VALUES
(1, 'Tiruppur Heritage 1972', 'Heritage', 'tiruppur,cotton,vintage', 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400', '{"text":"TIRUPPUR COTTON 1972","font":"Impact","color":"#F59E0B"}', TRUE),
(2, 'Cyberpunk Weave Matrix', 'Streetwear', 'cyberpunk,futuristic,neon', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400', '{"text":"NEON TEXTILE LAB","font":"Orbitron","color":"#06B6D4"}', TRUE),
(3, 'Pure Minimalist Botanical', 'Minimalist', 'nature,clean,organic', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400', '{"text":"ORGANIC 220 GSM","font":"Montserrat","color":"#10B981"}', TRUE)
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Seed Product Variants and Inventory for Product 1 (Custom Bio-Wash T-Shirt)
INSERT INTO product_variants (id, product_id, sku, size, color_name, color_hex, fabric_gsm, price_adjustment) VALUES
(1, 1, 'SG-TS-001-S-BLK', 'S', 'Obsidian Black', '#0F172A', 220, 0.00),
(2, 1, 'SG-TS-001-M-BLK', 'M', 'Obsidian Black', '#0F172A', 220, 0.00),
(3, 1, 'SG-TS-001-L-BLK', 'L', 'Obsidian Black', '#0F172A', 220, 0.00),
(4, 1, 'SG-TS-001-XL-BLK', 'XL', 'Obsidian Black', '#0F172A', 220, 0.00),
(5, 1, 'SG-TS-001-M-WHT', 'M', 'Crisp White', '#FFFFFF', 220, 0.00),
(6, 1, 'SG-TS-001-L-WHT', 'L', 'Crisp White', '#FFFFFF', 220, 0.00)
ON DUPLICATE KEY UPDATE sku = VALUES(sku);

INSERT INTO inventory (id, product_variant_id, warehouse_location, quantity_available, quantity_reserved, safety_stock) VALUES
(1, 1, 'Sakthi Mill Central Warehouse, Tiruppur', 450, 0, 50),
(2, 2, 'Sakthi Mill Central Warehouse, Tiruppur', 600, 0, 50),
(3, 3, 'Sakthi Mill Central Warehouse, Tiruppur', 550, 0, 50),
(4, 4, 'Sakthi Mill Central Warehouse, Tiruppur', 400, 0, 50),
(5, 5, 'Sakthi Mill Central Warehouse, Tiruppur', 700, 0, 50),
(6, 6, 'Sakthi Mill Central Warehouse, Tiruppur', 650, 0, 50)
ON DUPLICATE KEY UPDATE warehouse_location = VALUES(warehouse_location);

-- Seed Company Compliance Documents for SAKTHI GARMENTS
INSERT INTO company_documents (id, company_id, document_type, document_name, file_url, verification_status) VALUES
(1, 1, 'GST_CERTIFICATE', 'Sakthi_Garments_GSTIN_33AAACS0000A1Z5.pdf', '/uploads/docs/sakthi_gst.pdf', 'VERIFIED'),
(2, 1, 'MSME_UDYAM', 'Udyam_Registration_UDYAM-TN-28-0001234.pdf', '/uploads/docs/sakthi_udyam.pdf', 'VERIFIED'),
(3, 1, 'FACTORY_LICENSE', 'Tamil_Nadu_Factories_Act_License_2026.pdf', '/uploads/docs/sakthi_license.pdf', 'VERIFIED')
ON DUPLICATE KEY UPDATE document_name = VALUES(document_name);
