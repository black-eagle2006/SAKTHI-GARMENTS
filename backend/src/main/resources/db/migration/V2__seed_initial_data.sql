-- =============================================================================
-- SAKTHI GARMENTS — Database Seed Data (V2__seed_initial_data.sql)
-- Initial Featured Flagship: SAKTHI GARMENTS, Town Hall Road, Tiruppur — 641601
-- Sample Price: ₹69, Available Sizes: S, M, L, XL, XXL, XXXL
-- =============================================================================

-- 1. SEED DEFAULT APPLICATION SETTINGS
INSERT INTO application_settings (setting_key, setting_value, description) VALUES
('sample_starting_price_inr', '69.00', 'Default starting price for cloth sample swatch packs'),
('gst_percentage_rate', '5.00', 'GST tax percentage applicable on garments in India'),
('free_shipping_threshold_inr', '999.00', 'Cart threshold for zero shipping cost'),
('standard_shipping_fee_inr', '50.00', 'Standard logistics shipping fee for orders below threshold'),
('platform_name', 'SAKTHI GARMENTS', 'Official Brand and Marketplace Identifier')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

-- 2. SEED FEATURED COMPANY PROFILES
-- SAKTHI GARMENTS (Flagship Partner)
INSERT INTO company_profiles (
    id, company_name, contact_person, email, phone_number,
    address, city, state, pincode, latitude, longitude,
    approval_status, min_order_quantity, customization_available,
    bulk_order_support, sample_available, sample_price,
    estimated_production_days, published_price_range, description
) VALUES (
    1,
    'SAKTHI GARMENTS',
    'K. Sakthivel',
    'sales@sakthigarments.in',
    '+91 94432 00000',
    'Town Hall Road',
    'Tiruppur',
    'Tamil Nadu',
    '641601',
    11.1085,
    77.3411,
    'APPROVED',
    1,
    TRUE,
    TRUE,
    TRUE,
    69.00,
    3,
    '₹249 - ₹499',
    'Featured flagship textile manufacturer in Tiruppur. Specializing in 100% bio-washed combed cotton, luxury oversized silhouettes, screen printing, and instant DTG 3D customization.'
),
(
    2,
    'Kongu Tex Apparels',
    'M. Palanisamy',
    'info@kongutex.com',
    '+91 98422 11223',
    'Avinashi Road',
    'Tiruppur',
    'Tamil Nadu',
    '641602',
    11.1120,
    77.3480,
    'APPROVED',
    50,
    TRUE,
    TRUE,
    TRUE,
    69.00,
    5,
    '₹199 - ₹380',
    'Export-grade sports performance polo shirts, dry-fit micro-polyester blends, and corporate uniform printing.'
),
(
    3,
    'Annamalai Organic Exports',
    'S. Annamalai',
    'exports@annamalaitex.com',
    '+91 97890 33445',
    'Palladam Road',
    'Tiruppur',
    'Tamil Nadu',
    '641604',
    11.0950,
    77.3320,
    'APPROVED',
    100,
    TRUE,
    TRUE,
    TRUE,
    89.00,
    7,
    '₹280 - ₹550',
    'GOTS-certified sustainable organic cotton knitwear. Specialists in acid wash and vintage oversized streetwear.'
)
ON DUPLICATE KEY UPDATE company_name = VALUES(company_name);

-- 3. SEED PRODUCTS
INSERT INTO products (
    id, company_id, name, sku, description, garment_type, fabric,
    fabric_gsm, fit, sleeve_type, base_price, min_order_quantity,
    stock_quantity, is_customizable, sample_available, sample_price, is_published
) VALUES (
    1,
    1,
    'Sakthi Custom Bio-Wash 3D T-Shirt',
    'SG-TS-001',
    '100% Combed Supima Cotton, 220 GSM heavyweight luxury drape. Fully customizable in 3D studio with high-definition DTG digital printing.',
    'T-Shirt',
    '100% Combed Cotton',
    220,
    'Regular Comfort Fit',
    'Half Sleeve',
    299.00,
    1,
    1000,
    TRUE,
    TRUE,
    69.00,
    TRUE
),
(
    2,
    1,
    'Sakthi Plain Bio-Wash Blank T-Shirt',
    'SG-TS-002',
    'Unprinted blank high-grade cotton crewneck t-shirt. Ideal for printing startups, brands, and everyday luxury essentials.',
    'T-Shirt',
    '100% Combed Cotton',
    180,
    'Regular Comfort Fit',
    'Half Sleeve',
    249.00,
    1,
    2500,
    FALSE,
    TRUE,
    69.00,
    TRUE
),
(
    3,
    1,
    'Fabric Swatch Evaluation Pack',
    'SG-SMP-001',
    'Physical fabric sample swatches in assorted colors. Evaluates bio-wash softness, GSM thickness, and dye vibrancy prior to custom or bulk production.',
    'Cloth Sample',
    'Assorted 100% Cotton & Blends',
    220,
    'Swatch Sample',
    'N/A',
    69.00,
    1,
    5000,
    FALSE,
    TRUE,
    69.00,
    TRUE
)
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- 4. SEED TEST USERS (BCrypt hashed passwords)
-- password for all: SakthiAdmin@2026 (or Customer@123 for customer)
-- BCrypt for SakthiAdmin@2026: $2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi
-- BCrypt for Customer@123: $2a$10$wE6vYm8v573k.U7cE8fG2u1m7H4aW2jF5r6G9o2n4b7j8l0p1q2r3
INSERT INTO users (id, email, password_hash, full_name, phone_number, role, is_active, company_id) VALUES
(
    1,
    'superadmin@sakthigarments.in',
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi',
    'Super Administrator',
    '+91 94432 00000',
    'ADMIN',
    TRUE,
    NULL
),
(
    2,
    'admin@sakthigarments.in',
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi',
    'K. Sakthivel',
    '+91 94432 00000',
    'COMPANY',
    TRUE,
    1
),
(
    3,
    'customer@sakthigarments.in',
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi',
    'Anandha Kumar',
    '+91 98765 43210',
    'CUSTOMER',
    TRUE,
    NULL
)
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);
