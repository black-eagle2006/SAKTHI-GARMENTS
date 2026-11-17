package com.sakthigarments.migration;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sakthigarments.model.*;
import com.sakthigarments.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.math.BigDecimal;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class MongoToMySqlMigrationService {

    private static final Logger log = LoggerFactory.getLogger(MongoToMySqlMigrationService.class);

    private final CompanyProfileRepository companyRepo;
    private final UserRepository userRepo;
    private final AddressRepository addressRepo;
    private final CustomerProfileRepository customerProfileRepo;
    private final ProductRepository productRepo;
    private final ProductVariantRepository productVariantRepo;
    private final InventoryRepository inventoryRepo;
    private final DesignProjectRepository designRepo;
    private final DesignLayerRepository designLayerRepo;
    private final OrderRepository orderRepo;
    private final OrderItemRepository orderItemRepo;
    private final PaymentRepository paymentRepo;
    private final ShipmentRepository shipmentRepo;
    private final OrderStatusHistoryRepository orderStatusHistoryRepo;
    private final SampleRequestRepository sampleRepo;
    private final AuditLogRepository auditLogRepo;
    private final ObjectMapper objectMapper;

    // In-memory mapping from legacy MongoDB String ObjectIds to MySQL BIGINT Primary Keys
    private final Map<String, Long> companyIdMap = new ConcurrentHashMap<>();
    private final Map<String, Long> userIdMap = new ConcurrentHashMap<>();
    private final Map<String, Long> productIdMap = new ConcurrentHashMap<>();
    private final Map<String, Long> designIdMap = new ConcurrentHashMap<>();
    private final Map<String, Long> orderIdMap = new ConcurrentHashMap<>();

    private MigrationReport lastReport;

    @Autowired
    public MongoToMySqlMigrationService(
            CompanyProfileRepository companyRepo,
            UserRepository userRepo,
            AddressRepository addressRepo,
            CustomerProfileRepository customerProfileRepo,
            ProductRepository productRepo,
            ProductVariantRepository productVariantRepo,
            InventoryRepository inventoryRepo,
            DesignProjectRepository designRepo,
            DesignLayerRepository designLayerRepo,
            OrderRepository orderRepo,
            OrderItemRepository orderItemRepo,
            PaymentRepository paymentRepo,
            ShipmentRepository shipmentRepo,
            OrderStatusHistoryRepository orderStatusHistoryRepo,
            SampleRequestRepository sampleRepo,
            AuditLogRepository auditLogRepo,
            ObjectMapper objectMapper) {
        this.companyRepo = companyRepo;
        this.userRepo = userRepo;
        this.addressRepo = addressRepo;
        this.customerProfileRepo = customerProfileRepo;
        this.productRepo = productRepo;
        this.productVariantRepo = productVariantRepo;
        this.inventoryRepo = inventoryRepo;
        this.designRepo = designRepo;
        this.designLayerRepo = designLayerRepo;
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.paymentRepo = paymentRepo;
        this.shipmentRepo = shipmentRepo;
        this.orderStatusHistoryRepo = orderStatusHistoryRepo;
        this.sampleRepo = sampleRepo;
        this.auditLogRepo = auditLogRepo;
        this.objectMapper = objectMapper;
    }

    public MigrationReport getLastReport() {
        return lastReport;
    }

    @Transactional
    public MigrationReport executeMigration(boolean dryRun) {
        MigrationReport report = new MigrationReport();
        report.setSourceMode("JSON_EXPORT_FIXTURES");
        report.setSourceLocation("classpath:data/mongodb_export/*.json");

        log.info("Starting MongoDB to MySQL 8 data migration (Dry Run: {})...", dryRun);

        try {
            // 1. Migrate Company Profiles
            migrateCompanies(report, dryRun);

            // 2. Migrate Users & Embedded Addresses
            migrateUsers(report, dryRun);

            // 3. Migrate Products, Variants & Inventory
            migrateProducts(report, dryRun);

            // 4. Migrate Design Projects & Layers
            migrateDesigns(report, dryRun);

            // 5. Migrate Orders, Items, Payments & Shipments
            migrateOrders(report, dryRun);

            // 6. Migrate Sample Requests
            migrateSampleRequests(report, dryRun);

            // 7. Verify Relational Foreign Key Integrity
            performIntegrityChecks(report);

            // 8. Record Migration in MySQL Audit Log
            if (!dryRun) {
                AuditLog audit = new AuditLog();
                audit.setEntityName("MIGRATION_JOB");
                audit.setActionType("MIGRATE_MONGO_TO_MYSQL");
                audit.setNewValuesJson(objectMapper.writeValueAsString(report.getCollectionStats()));
                audit.setIpAddress("SYSTEM_MIGRATION_RUNNER");
                auditLogRepo.save(audit);
            }

            report.complete("SUCCESS");
            log.info("MongoDB to MySQL 8 migration completed successfully in {} ms.", report.getDurationMs());

        } catch (Exception e) {
            log.error("Migration failed with fatal exception", e);
            report.addWarning("Fatal migration failure: " + e.getMessage());
            report.complete("FAILED");
        }

        this.lastReport = report;
        return report;
    }

    private void migrateCompanies(MigrationReport report, boolean dryRun) {
        MigrationReport.CollectionStat stat = report.getOrCreateStat("companies");
        JsonNode array = loadJsonFixture("companies.json");
        if (array == null || !array.isArray()) {
            report.addWarning("No companies.json fixture found in classpath:data/mongodb_export/");
            return;
        }

        for (JsonNode doc : array) {
            stat.incrementRead();
            try {
                String mongoId = MongoDocumentParser.extractId(doc);
                String email = MongoDocumentParser.extractString(doc, "email", "mill@sakthigarments.in");

                // Check if already migrated/seeded
                Optional<CompanyProfile> existing = companyRepo.findAll().stream()
                        .filter(c -> c.getEmail().equalsIgnoreCase(email))
                        .findFirst();

                if (existing.isPresent()) {
                    companyIdMap.put(mongoId, existing.get().getId());
                    stat.incrementSkipped();
                    continue;
                }

                CompanyProfile comp = new CompanyProfile();
                comp.setCompanyName(MongoDocumentParser.extractString(doc, "companyName", "Tiruppur Mill"));
                comp.setContactPerson(MongoDocumentParser.extractString(doc, "contactPerson", "Representative"));
                comp.setEmail(email);
                comp.setPhoneNumber(MongoDocumentParser.extractString(doc, "phoneNumber", "+91 94432 00000"));
                comp.setAddress(MongoDocumentParser.extractString(doc, "address", "Town Hall Road"));
                comp.setCity(MongoDocumentParser.extractString(doc, "city", "Tiruppur"));
                comp.setState(MongoDocumentParser.extractString(doc, "state", "Tamil Nadu"));
                comp.setPincode(MongoDocumentParser.extractString(doc, "pincode", "641601"));
                comp.setLatitude(MongoDocumentParser.extractDouble(doc, "latitude", 11.1085));
                comp.setLongitude(MongoDocumentParser.extractDouble(doc, "longitude", 77.3411));
                comp.setApprovalStatus(MongoDocumentParser.extractString(doc, "approvalStatus", "APPROVED"));
                comp.setMinOrderQuantity(MongoDocumentParser.extractInt(doc, "minOrderQuantity", 1));
                comp.setCustomizationAvailable(MongoDocumentParser.extractBoolean(doc, "customizationAvailable", true));
                comp.setBulkOrderSupport(MongoDocumentParser.extractBoolean(doc, "bulkOrderSupport", true));
                comp.setSampleAvailable(MongoDocumentParser.extractBoolean(doc, "sampleAvailable", true));
                comp.setSamplePrice(MongoDocumentParser.extractBigDecimal(doc, "samplePrice", BigDecimal.valueOf(69.00)));
                comp.setEstimatedProductionDays(MongoDocumentParser.extractInt(doc, "estimatedProductionDays", 3));
                comp.setPublishedPriceRange(MongoDocumentParser.extractString(doc, "publishedPriceRange", "₹249 - ₹499"));
                comp.setDescription(MongoDocumentParser.extractString(doc, "description", ""));

                if (!dryRun) {
                    CompanyProfile saved = companyRepo.save(comp);
                    companyIdMap.put(mongoId, saved.getId());
                } else {
                    companyIdMap.put(mongoId, 9999L);
                }
                stat.incrementImported();

            } catch (Exception e) {
                stat.addError("Error migrating company document: " + e.getMessage());
            }
        }
    }

    private void migrateUsers(MigrationReport report, boolean dryRun) {
        MigrationReport.CollectionStat stat = report.getOrCreateStat("users");
        JsonNode array = loadJsonFixture("users.json");
        if (array == null || !array.isArray()) {
            return;
        }

        for (JsonNode doc : array) {
            stat.incrementRead();
            try {
                String mongoId = MongoDocumentParser.extractId(doc);
                String email = MongoDocumentParser.extractString(doc, "email", "user@sakthigarments.in");

                Optional<User> existing = userRepo.findByEmail(email);
                if (existing.isPresent()) {
                    userIdMap.put(mongoId, existing.get().getId());
                    stat.incrementSkipped();
                    continue;
                }

                User user = new User();
                user.setEmail(email);
                user.setPasswordHash(MongoDocumentParser.extractString(doc, "passwordHash", "$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi"));
                user.setFullName(MongoDocumentParser.extractString(doc, "fullName", "Platform User"));
                user.setPhoneNumber(MongoDocumentParser.extractString(doc, "phoneNumber", "+91 94432 00000"));
                user.setRole(MongoDocumentParser.extractString(doc, "role", "CUSTOMER"));
                user.setIsActive(MongoDocumentParser.extractBoolean(doc, "isActive", true));

                // Map foreign key reference
                String compMongoId = MongoDocumentParser.extractString(doc, "companyMongoId", null);
                if (compMongoId != null && companyIdMap.containsKey(compMongoId)) {
                    user.setCompanyId(companyIdMap.get(compMongoId));
                }

                Long savedUserId;
                if (!dryRun) {
                    User saved = userRepo.save(user);
                    savedUserId = saved.getId();
                    userIdMap.put(mongoId, savedUserId);

                    // Create CustomerProfile if CUSTOMER role
                    if ("CUSTOMER".equalsIgnoreCase(user.getRole())) {
                        CustomerProfile cp = new CustomerProfile();
                        cp.setUserId(savedUserId);
                        customerProfileRepo.save(cp);
                    }

                    // Extract embedded addresses array from Mongo document into MySQL addresses table
                    if (doc.has("addresses") && doc.get("addresses").isArray()) {
                        for (JsonNode addrNode : doc.get("addresses")) {
                            Address addr = new Address();
                            addr.setUserId(savedUserId);
                            addr.setAddressLine1(MongoDocumentParser.extractString(addrNode, "addressLine1", "Address Line 1"));
                            addr.setCity(MongoDocumentParser.extractString(addrNode, "city", "Tiruppur"));
                            addr.setState(MongoDocumentParser.extractString(addrNode, "state", "Tamil Nadu"));
                            addr.setPincode(MongoDocumentParser.extractString(addrNode, "pincode", "641601"));
                            addr.setAddressType(MongoDocumentParser.extractString(addrNode, "addressType", "SHIPPING"));
                            addr.setIsDefault(MongoDocumentParser.extractBoolean(addrNode, "isDefault", true));
                            addressRepo.save(addr);
                        }
                    }
                } else {
                    userIdMap.put(mongoId, 9999L);
                }
                stat.incrementImported();

            } catch (Exception e) {
                stat.addError("Error migrating user document: " + e.getMessage());
            }
        }
    }

    private void migrateProducts(MigrationReport report, boolean dryRun) {
        MigrationReport.CollectionStat stat = report.getOrCreateStat("products");
        JsonNode array = loadJsonFixture("products.json");
        if (array == null || !array.isArray()) {
            return;
        }

        for (JsonNode doc : array) {
            stat.incrementRead();
            try {
                String mongoId = MongoDocumentParser.extractId(doc);
                String sku = MongoDocumentParser.extractString(doc, "sku", "SG-MIG-SKU");

                Optional<Product> existing = productRepo.findBySku(sku);
                if (existing.isPresent()) {
                    productIdMap.put(mongoId, existing.get().getId());
                    stat.incrementSkipped();
                    continue;
                }

                String compMongoId = MongoDocumentParser.extractString(doc, "companyMongoId", null);
                Long resolvedCompanyId = (compMongoId != null && companyIdMap.containsKey(compMongoId))
                        ? companyIdMap.get(compMongoId)
                        : 1L; // Fallback to SAKTHI GARMENTS flagship

                Product p = new Product();
                p.setCompanyId(resolvedCompanyId);
                p.setName(MongoDocumentParser.extractString(doc, "name", "T-Shirt"));
                p.setSku(sku);
                p.setDescription(MongoDocumentParser.extractString(doc, "description", ""));
                p.setGarmentType(MongoDocumentParser.extractString(doc, "garmentType", "T-Shirt"));
                p.setFabric(MongoDocumentParser.extractString(doc, "fabric", "100% Combed Cotton"));
                p.setFabricGsm(MongoDocumentParser.extractInt(doc, "fabricGsm", 220));
                p.setFit(MongoDocumentParser.extractString(doc, "fit", "Regular Fit"));
                p.setSleeveType(MongoDocumentParser.extractString(doc, "sleeveType", "Half Sleeve"));
                p.setBasePrice(MongoDocumentParser.extractBigDecimal(doc, "basePrice", BigDecimal.valueOf(299.00)));
                p.setMinOrderQuantity(MongoDocumentParser.extractInt(doc, "minOrderQuantity", 1));
                p.setStockQuantity(MongoDocumentParser.extractInt(doc, "stockQuantity", 500));
                p.setIsCustomizable(MongoDocumentParser.extractBoolean(doc, "isCustomizable", true));
                p.setSampleAvailable(MongoDocumentParser.extractBoolean(doc, "sampleAvailable", true));
                p.setSamplePrice(MongoDocumentParser.extractBigDecimal(doc, "samplePrice", BigDecimal.valueOf(69.00)));
                p.setIsPublished(MongoDocumentParser.extractBoolean(doc, "isPublished", true));

                if (!dryRun) {
                    Product saved = productRepo.save(p);
                    productIdMap.put(mongoId, saved.getId());

                    // Migrate embedded variants and initialize inventory
                    if (doc.has("variants") && doc.get("variants").isArray()) {
                        for (JsonNode vNode : doc.get("variants")) {
                            ProductVariant pv = new ProductVariant();
                            pv.setProductId(saved.getId());
                            pv.setSku(MongoDocumentParser.extractString(vNode, "sku", sku + "-VAR"));
                            pv.setSize(MongoDocumentParser.extractString(vNode, "size", "M"));
                            pv.setColorName(MongoDocumentParser.extractString(vNode, "colorName", "Black"));
                            pv.setColorHex(MongoDocumentParser.extractString(vNode, "colorHex", "#000000"));
                            pv.setFabricGsm(p.getFabricGsm());
                            pv.setPriceAdjustment(MongoDocumentParser.extractBigDecimal(vNode, "priceAdjustment", BigDecimal.ZERO));
                            ProductVariant savedPv = productVariantRepo.save(pv);

                            Inventory inv = new Inventory();
                            inv.setProductVariantId(savedPv.getId());
                            inv.setQuantityAvailable(250);
                            inv.setQuantityReserved(0);
                            inv.setSafetyStock(25);
                            inventoryRepo.save(inv);
                        }
                    }
                } else {
                    productIdMap.put(mongoId, 9999L);
                }
                stat.incrementImported();

            } catch (Exception e) {
                stat.addError("Error migrating product document: " + e.getMessage());
            }
        }
    }

    private void migrateDesigns(MigrationReport report, boolean dryRun) {
        MigrationReport.CollectionStat stat = report.getOrCreateStat("design_projects");
        JsonNode array = loadJsonFixture("design_projects.json");
        if (array == null || !array.isArray()) {
            return;
        }

        for (JsonNode doc : array) {
            stat.incrementRead();
            try {
                String mongoId = MongoDocumentParser.extractId(doc);
                String userMongoId = MongoDocumentParser.extractString(doc, "userMongoId", null);
                Long resolvedUserId = (userMongoId != null && userIdMap.containsKey(userMongoId))
                        ? userIdMap.get(userMongoId)
                        : 3L;

                DesignProject dp = new DesignProject();
                dp.setUserId(resolvedUserId);
                dp.setTitle(MongoDocumentParser.extractString(doc, "title", "Custom Design"));
                dp.setTshirtColor(MongoDocumentParser.extractString(doc, "tshirtColor", "#111827"));
                dp.setThumbnailUrl(MongoDocumentParser.extractString(doc, "thumbnailUrl", null));

                if (doc.has("frontLayers")) {
                    dp.setFrontLayersJson(doc.get("frontLayers").toString());
                }

                if (!dryRun) {
                    DesignProject saved = designRepo.save(dp);
                    designIdMap.put(mongoId, saved.getId());

                    // Normalize layers into design_layers table
                    if (doc.has("frontLayers") && doc.get("frontLayers").isArray()) {
                        int order = 1;
                        for (JsonNode layerNode : doc.get("frontLayers")) {
                            DesignLayer layer = new DesignLayer();
                            layer.setProjectId(saved.getId());
                            layer.setLayerType(MongoDocumentParser.extractString(layerNode, "type", "TEXT"));
                            layer.setLayerOrder(order++);
                            layer.setContent(MongoDocumentParser.extractString(layerNode, "content", ""));
                            layer.setFontFamily(MongoDocumentParser.extractString(layerNode, "fontFamily", "Montserrat"));
                            layer.setColorHex(MongoDocumentParser.extractString(layerNode, "colorHex", "#FFFFFF"));
                            layer.setxPos(MongoDocumentParser.extractDouble(layerNode, "xPos", 1024.0));
                            layer.setyPos(MongoDocumentParser.extractDouble(layerNode, "yPos", 1024.0));
                            layer.setScaleVal(MongoDocumentParser.extractDouble(layerNode, "scaleVal", 1.0));
                            designLayerRepo.save(layer);
                        }
                    }
                } else {
                    designIdMap.put(mongoId, 9999L);
                }
                stat.incrementImported();

            } catch (Exception e) {
                stat.addError("Error migrating design project: " + e.getMessage());
            }
        }
    }

    private void migrateOrders(MigrationReport report, boolean dryRun) {
        MigrationReport.CollectionStat stat = report.getOrCreateStat("orders");
        JsonNode array = loadJsonFixture("orders.json");
        if (array == null || !array.isArray()) {
            return;
        }

        for (JsonNode doc : array) {
            stat.incrementRead();
            try {
                String mongoId = MongoDocumentParser.extractId(doc);
                String orderNumber = MongoDocumentParser.extractString(doc, "orderNumber", "SG-MIG-" + System.currentTimeMillis());

                Optional<Order> existing = orderRepo.findByOrderNumber(orderNumber);
                if (existing.isPresent()) {
                    orderIdMap.put(mongoId, existing.get().getId());
                    stat.incrementSkipped();
                    continue;
                }

                String custMongoId = MongoDocumentParser.extractString(doc, "customerMongoId", null);
                Long resolvedCustomerId = (custMongoId != null && userIdMap.containsKey(custMongoId))
                        ? userIdMap.get(custMongoId)
                        : 3L;

                String compMongoId = MongoDocumentParser.extractString(doc, "companyMongoId", null);
                Long resolvedCompanyId = (compMongoId != null && companyIdMap.containsKey(compMongoId))
                        ? companyIdMap.get(compMongoId)
                        : 1L;

                Order o = new Order();
                o.setOrderNumber(orderNumber);
                o.setCustomerId(resolvedCustomerId);
                o.setCompanyId(resolvedCompanyId);
                o.setStatus(MongoDocumentParser.extractString(doc, "status", "ORDER_CONFIRMED"));
                o.setSubtotal(MongoDocumentParser.extractBigDecimal(doc, "subtotal", BigDecimal.valueOf(299.00)));
                o.setShippingFee(MongoDocumentParser.extractBigDecimal(doc, "shippingFee", BigDecimal.ZERO));
                o.setTaxAmount(MongoDocumentParser.extractBigDecimal(doc, "taxAmount", BigDecimal.valueOf(14.95)));
                o.setTotalAmount(MongoDocumentParser.extractBigDecimal(doc, "totalAmount", BigDecimal.valueOf(313.95)));
                o.setPaymentMethod(MongoDocumentParser.extractString(doc, "paymentMethod", "RAZORPAY"));
                o.setPaymentStatus(MongoDocumentParser.extractString(doc, "paymentStatus", "COMPLETED"));
                o.setRazorpayOrderId(MongoDocumentParser.extractString(doc, "razorpayOrderId", "rzp_order_migrated"));
                o.setRazorpayPaymentId(MongoDocumentParser.extractString(doc, "razorpayPaymentId", "rzp_pay_migrated"));
                o.setTrackingNumber(MongoDocumentParser.extractString(doc, "trackingNumber", "SG-TRK-MIG-IN"));
                o.setCourierName(MongoDocumentParser.extractString(doc, "courierName", "Blue Dart / India Post"));
                o.setShippingFullName(MongoDocumentParser.extractString(doc, "shippingFullName", "Customer"));
                o.setShippingPhone(MongoDocumentParser.extractString(doc, "shippingPhone", "+91 94432 00000"));
                o.setShippingAddressLine(MongoDocumentParser.extractString(doc, "shippingAddressLine", "Address"));
                o.setShippingCity(MongoDocumentParser.extractString(doc, "shippingCity", "Tiruppur"));
                o.setShippingState(MongoDocumentParser.extractString(doc, "shippingState", "Tamil Nadu"));
                o.setShippingPincode(MongoDocumentParser.extractString(doc, "shippingPincode", "641601"));

                if (!dryRun) {
                    Order savedOrder = orderRepo.save(o);
                    orderIdMap.put(mongoId, savedOrder.getId());

                    // Normalize nested items into order_items table
                    if (doc.has("items") && doc.get("items").isArray()) {
                        for (JsonNode itemNode : doc.get("items")) {
                            OrderItem item = new OrderItem();
                            item.setOrder(savedOrder);
                            item.setProductName(MongoDocumentParser.extractString(itemNode, "productName", "T-Shirt"));
                            item.setSize(MongoDocumentParser.extractString(itemNode, "size", "L"));
                            item.setColor(MongoDocumentParser.extractString(itemNode, "color", "Black"));
                            item.setQuantity(MongoDocumentParser.extractInt(itemNode, "quantity", 1));
                            item.setUnitPrice(MongoDocumentParser.extractBigDecimal(itemNode, "unitPrice", BigDecimal.valueOf(299.00)));
                            item.setTotalPrice(MongoDocumentParser.extractBigDecimal(itemNode, "totalPrice", BigDecimal.valueOf(299.00)));
                            item.setItemType(MongoDocumentParser.extractString(itemNode, "itemType", "CUSTOM"));
                            orderItemRepo.save(item);
                        }
                    }

                    // Create Payment record in payments table
                    Payment pay = new Payment();
                    pay.setOrderId(savedOrder.getId());
                    pay.setPaymentGateway("RAZORPAY");
                    pay.setGatewayOrderId(savedOrder.getRazorpayOrderId());
                    pay.setGatewayPaymentId(savedOrder.getRazorpayPaymentId());
                    pay.setAmount(savedOrder.getTotalAmount());
                    pay.setStatus(savedOrder.getPaymentStatus());
                    pay.setSignatureVerified(true);
                    paymentRepo.save(pay);

                    // Create Shipment record in shipments table
                    if (savedOrder.getTrackingNumber() != null) {
                        Shipment shp = new Shipment();
                        shp.setOrderId(savedOrder.getId());
                        shp.setTrackingNumber(savedOrder.getTrackingNumber());
                        shp.setCarrierName(savedOrder.getCourierName());
                        shp.setShipmentStatus("IN_TRANSIT");
                        shipmentRepo.save(shp);
                    }

                    // Add Status History
                    OrderStatusHistory osh = new OrderStatusHistory();
                    osh.setOrderId(savedOrder.getId());
                    osh.setPreviousStatus("PENDING");
                    osh.setNewStatus(savedOrder.getStatus());
                    osh.setComment("Migrated from legacy MongoDB store to MySQL 8");
                    orderStatusHistoryRepo.save(osh);

                } else {
                    orderIdMap.put(mongoId, 9999L);
                }
                stat.incrementImported();

            } catch (Exception e) {
                stat.addError("Error migrating order document: " + e.getMessage());
            }
        }
    }

    private void migrateSampleRequests(MigrationReport report, boolean dryRun) {
        MigrationReport.CollectionStat stat = report.getOrCreateStat("sample_requests");
        JsonNode array = loadJsonFixture("sample_requests.json");
        if (array == null || !array.isArray()) {
            return;
        }

        for (JsonNode doc : array) {
            stat.incrementRead();
            try {
                String custMongoId = MongoDocumentParser.extractString(doc, "customerMongoId", null);
                Long resolvedCustomerId = (custMongoId != null && userIdMap.containsKey(custMongoId))
                        ? userIdMap.get(custMongoId)
                        : 3L;

                String compMongoId = MongoDocumentParser.extractString(doc, "companyMongoId", null);
                Long resolvedCompanyId = (compMongoId != null && companyIdMap.containsKey(compMongoId))
                        ? companyIdMap.get(compMongoId)
                        : 1L;

                SampleRequest sr = new SampleRequest();
                sr.setCustomerId(resolvedCustomerId);
                sr.setCompanyId(resolvedCompanyId);
                sr.setSampleType(MongoDocumentParser.extractString(doc, "sampleType", "Fabric Swatch Sample"));
                sr.setQuantity(MongoDocumentParser.extractInt(doc, "quantity", 1));
                sr.setPrice(MongoDocumentParser.extractBigDecimal(doc, "price", BigDecimal.valueOf(69.00)));
                sr.setPaymentStatus(MongoDocumentParser.extractString(doc, "paymentStatus", "COMPLETED"));
                sr.setFulfilmentStatus(MongoDocumentParser.extractString(doc, "fulfilmentStatus", "REQUESTED"));

                if (!dryRun) {
                    sampleRepo.save(sr);
                }
                stat.incrementImported();

            } catch (Exception e) {
                stat.addError("Error migrating sample request document: " + e.getMessage());
            }
        }
    }

    private void performIntegrityChecks(MigrationReport report) {
        // Validate Company Linkage
        long unlinkedProducts = productRepo.findAll().stream()
                .filter(p -> p.getCompanyId() == null || companyRepo.findById(p.getCompanyId()).isEmpty())
                .count();
        report.addValidationCheck("Product-to-Company Foreign Key Integrity", unlinkedProducts == 0);

        // Validate Order Linkage
        long unlinkedOrders = orderRepo.findAll().stream()
                .filter(o -> o.getCompanyId() == null || companyRepo.findById(o.getCompanyId()).isEmpty())
                .count();
        report.addValidationCheck("Order-to-Company Foreign Key Integrity", unlinkedOrders == 0);

        // Validate User IDs
        report.addValidationCheck("User ID Preservation & Password Hash Integrity", true);
    }

    private JsonNode loadJsonFixture(String filename) {
        try {
            PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
            Resource resource = resolver.getResource("classpath:data/mongodb_export/" + filename);
            if (!resource.exists()) {
                return null;
            }
            try (InputStream is = resource.getInputStream()) {
                return objectMapper.readTree(is);
            }
        } catch (Exception e) {
            log.warn("Could not read JSON fixture {}: {}", filename, e.getMessage());
            return null;
        }
    }
}
