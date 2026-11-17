-- =============================================================================
-- SAKTHI GARMENTS — Database Initialization Schema (V1__init_schema.sql)
-- Multi-Company Marketplace, 3D T-Shirt Customizer, AI Studio & Industrial Orders
-- =============================================================================

-- 1. USERS & AUTHENTICATION
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(180) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(30),
    role VARCHAR(30) NOT NULL DEFAULT 'CUSTOMER', -- CUSTOMER, COMPANY, ADMIN
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    company_id BIGINT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_email (email),
    INDEX idx_users_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. GARMENT COMPANY PROFILES (Featured: SAKTHI GARMENTS, Tiruppur)
CREATE TABLE IF NOT EXISTS company_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NULL,
    company_name VARCHAR(180) NOT NULL,
    contact_person VARCHAR(120) NOT NULL,
    email VARCHAR(180) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(80) NOT NULL DEFAULT 'Tiruppur',
    state VARCHAR(80) NOT NULL DEFAULT 'Tamil Nadu',
    pincode VARCHAR(20) NOT NULL DEFAULT '641601',
    latitude DOUBLE NULL,
    longitude DOUBLE NULL,
    business_registration_no VARCHAR(100),
    approval_status VARCHAR(30) NOT NULL DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED, SUSPENDED
    min_order_quantity INT NOT NULL DEFAULT 1,
    customization_available BOOLEAN NOT NULL DEFAULT TRUE,
    bulk_order_support BOOLEAN NOT NULL DEFAULT TRUE,
    sample_available BOOLEAN NOT NULL DEFAULT TRUE,
    sample_price DECIMAL(10,2) NOT NULL DEFAULT 69.00,
    estimated_production_days INT NOT NULL DEFAULT 3,
    published_price_range VARCHAR(50) DEFAULT '₹249 - ₹499',
    description TEXT,
    logo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_companies_city_pincode (city, pincode),
    INDEX idx_companies_status (approval_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. PRODUCTS CATALOG
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id BIGINT NOT NULL,
    name VARCHAR(200) NOT NULL,
    sku VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    garment_type VARCHAR(60) NOT NULL DEFAULT 'T-Shirt',
    fabric VARCHAR(100) NOT NULL DEFAULT '100% Combed Cotton',
    fabric_gsm INT NOT NULL DEFAULT 220,
    fit VARCHAR(50) NOT NULL DEFAULT 'Regular Fit',
    sleeve_type VARCHAR(50) NOT NULL DEFAULT 'Half Sleeve',
    base_price DECIMAL(10,2) NOT NULL DEFAULT 249.00,
    min_order_quantity INT NOT NULL DEFAULT 1,
    stock_quantity INT NOT NULL DEFAULT 500,
    is_customizable BOOLEAN NOT NULL DEFAULT TRUE,
    sample_available BOOLEAN NOT NULL DEFAULT TRUE,
    sample_price DECIMAL(10,2) NOT NULL DEFAULT 69.00,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company_profiles(id) ON DELETE CASCADE,
    INDEX idx_products_company (company_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. SAVED 3D DESIGN PROJECTS
CREATE TABLE IF NOT EXISTS design_projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NULL,
    title VARCHAR(150) NOT NULL,
    tshirt_color VARCHAR(30) NOT NULL DEFAULT '#FFFFFF',
    front_layers_json LONGTEXT,
    back_layers_json LONGTEXT,
    thumbnail_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_designs_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. ORDERS & SHIPMENTS
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(60) NOT NULL UNIQUE,
    customer_id BIGINT NULL,
    company_id BIGINT NOT NULL,
    status VARCHAR(40) NOT NULL DEFAULT 'ORDER_CONFIRMED',
    subtotal DECIMAL(10,2) NOT NULL,
    shipping_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(40) NOT NULL DEFAULT 'RAZORPAY',
    payment_status VARCHAR(30) NOT NULL DEFAULT 'COMPLETED',
    razorpay_order_id VARCHAR(100),
    razorpay_payment_id VARCHAR(100),
    tracking_number VARCHAR(100),
    courier_name VARCHAR(100),
    shipping_full_name VARCHAR(120),
    shipping_phone VARCHAR(30),
    shipping_email VARCHAR(150),
    shipping_address_line TEXT,
    shipping_city VARCHAR(80),
    shipping_state VARCHAR(80),
    shipping_pincode VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company_profiles(id),
    INDEX idx_orders_status (status),
    INDEX idx_orders_number (order_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. ORDER ITEMS
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NULL,
    product_name VARCHAR(200) NOT NULL,
    size VARCHAR(20) NOT NULL,
    color VARCHAR(40) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    item_type VARCHAR(30) NOT NULL DEFAULT 'CUSTOM',
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. BULK ORDERS & QUOTATIONS
CREATE TABLE IF NOT EXISTS bulk_order_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT NULL,
    company_id BIGINT NOT NULL,
    garment_type VARCHAR(100) NOT NULL,
    total_quantity INT NOT NULL,
    size_breakdown_json TEXT,
    customization_notes TEXT,
    status VARCHAR(40) NOT NULL DEFAULT 'PENDING',
    quoted_price DECIMAL(10,2) NULL,
    company_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company_profiles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. SAMPLE REQUESTS (₹69 Starting Swatch Flow)
CREATE TABLE IF NOT EXISTS sample_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT NULL,
    company_id BIGINT NOT NULL,
    sample_type VARCHAR(100) NOT NULL DEFAULT 'Fabric Swatch Sample',
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL DEFAULT 69.00,
    payment_status VARCHAR(30) NOT NULL DEFAULT 'COMPLETED',
    fulfilment_status VARCHAR(40) NOT NULL DEFAULT 'REQUESTED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company_profiles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. PLATFORM APPLICATION SETTINGS
CREATE TABLE IF NOT EXISTS application_settings (
    setting_key VARCHAR(100) PRIMARY KEY,
    setting_value TEXT NOT NULL,
    description VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
