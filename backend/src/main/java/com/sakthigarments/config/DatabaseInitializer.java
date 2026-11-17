package com.sakthigarments.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sakthigarments.migration.MongoToMySqlMigrationService;
import com.sakthigarments.model.ApplicationSetting;
import com.sakthigarments.model.CompanyProfile;
import com.sakthigarments.model.Product;
import com.sakthigarments.model.User;
import com.sakthigarments.repository.ApplicationSettingRepository;
import com.sakthigarments.repository.CompanyProfileRepository;
import com.sakthigarments.repository.ProductRepository;
import com.sakthigarments.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DatabaseInitializer.class);

    private final UserRepository userRepo;
    private final CompanyProfileRepository companyRepo;
    private final ProductRepository productRepo;
    private final ApplicationSettingRepository settingRepo;
    private final PasswordEncoder passwordEncoder;
    private final MongoToMySqlMigrationService migrationService;

    public DatabaseInitializer(
            UserRepository userRepo,
            CompanyProfileRepository companyRepo,
            ProductRepository productRepo,
            ApplicationSettingRepository settingRepo,
            PasswordEncoder passwordEncoder,
            MongoToMySqlMigrationService migrationService) {
        this.userRepo = userRepo;
        this.companyRepo = companyRepo;
        this.productRepo = productRepo;
        this.settingRepo = settingRepo;
        this.passwordEncoder = passwordEncoder;
        this.migrationService = migrationService;
    }

    @Override
    public void run(String... args) {
        CompanyProfile savedSakthi = null;

        if (companyRepo.count() == 0) {
            log.info("Database is unseeded. Initializing default Tiruppur companies, products, settings, and users...");

            // 1. Seed Flagship Tiruppur Company
            CompanyProfile sakthi = CompanyProfile.builder()
                    .companyName("SAKTHI GARMENTS")
                    .contactPerson("K. Sakthivel")
                    .email("yagesh@gmail.com")
                    .phoneNumber("+91 93618 32472")
                    .address("KVR Nagar")
                    .city("Tiruppur")
                    .state("Tamil Nadu")
                    .pincode("641604")
                    .latitude(11.1085)
                    .longitude(77.3411)
                    .approvalStatus("APPROVED")
                    .minOrderQuantity(1)
                    .customizationAvailable(true)
                    .bulkOrderSupport(true)
                    .sampleAvailable(true)
                    .samplePrice(new BigDecimal("69.00"))
                    .estimatedProductionDays(3)
                    .publishedPriceRange("₹249 - ₹499")
                    .description("Featured flagship textile manufacturer in Tiruppur. Specializing in 100% bio-washed combed cotton, luxury oversized silhouettes, screen printing, and instant DTG 3D customization.")
                    .build();
            savedSakthi = companyRepo.save(sakthi);

            CompanyProfile kongu = CompanyProfile.builder()
                    .companyName("Kongu Tex Apparels")
                    .contactPerson("M. Palanisamy")
                    .email("info@kongutex.com")
                    .phoneNumber("+91 98422 11223")
                    .address("Avinashi Road")
                    .city("Tiruppur")
                    .state("Tamil Nadu")
                    .pincode("641602")
                    .latitude(11.1120)
                    .longitude(77.3480)
                    .approvalStatus("APPROVED")
                    .minOrderQuantity(50)
                    .customizationAvailable(true)
                    .bulkOrderSupport(true)
                    .sampleAvailable(true)
                    .samplePrice(new BigDecimal("69.00"))
                    .estimatedProductionDays(5)
                    .publishedPriceRange("₹199 - ₹380")
                    .description("Export-grade sports performance polo shirts, dry-fit micro-polyester blends, and corporate uniform printing.")
                    .build();
            companyRepo.save(kongu);

            CompanyProfile annamalai = CompanyProfile.builder()
                    .companyName("Annamalai Organic Exports")
                    .contactPerson("S. Annamalai")
                    .email("exports@annamalaitex.com")
                    .phoneNumber("+91 97890 33445")
                    .address("Palladam Road")
                    .city("Tiruppur")
                    .state("Tamil Nadu")
                    .pincode("641604")
                    .latitude(11.0950)
                    .longitude(77.3320)
                    .approvalStatus("APPROVED")
                    .minOrderQuantity(100)
                    .customizationAvailable(true)
                    .bulkOrderSupport(true)
                    .sampleAvailable(true)
                    .samplePrice(new BigDecimal("89.00"))
                    .estimatedProductionDays(7)
                    .publishedPriceRange("₹280 - ₹550")
                    .description("GOTS-certified sustainable organic cotton knitwear. Specialists in acid wash and vintage oversized streetwear.")
                    .build();
            companyRepo.save(annamalai);

            // 2. Seed Default Application Settings
            settingRepo.save(new ApplicationSetting("sample_starting_price_inr", "69.00", "Default starting price for cloth sample swatch packs"));
            settingRepo.save(new ApplicationSetting("gst_percentage_rate", "5.00", "GST tax percentage applicable on garments in India"));
            settingRepo.save(new ApplicationSetting("free_shipping_threshold_inr", "999.00", "Cart threshold for zero shipping cost"));
            settingRepo.save(new ApplicationSetting("standard_shipping_fee_inr", "50.00", "Standard logistics shipping fee for orders below threshold"));
            settingRepo.save(new ApplicationSetting("platform_name", "SAKTHI GARMENTS", "Official Brand and Marketplace Identifier"));

            // 3. Seed Standard Accounts
            String commonHash = passwordEncoder.encode("SakthiAdmin@2026");

            User superAdmin = User.builder()
                    .email("superadmin@sakthigarments.in")
                    .passwordHash(commonHash)
                    .fullName("Super Administrator")
                    .phoneNumber("+91 93618 32472")
                    .role("ADMIN")
                    .isActive(true)
                    .build();
            userRepo.save(superAdmin);

            User millAdmin = User.builder()
                    .email("yagesh@gmail.com")
                    .passwordHash(commonHash)
                    .fullName("K. Sakthivel")
                    .phoneNumber("+91 93618 32472")
                    .role("COMPANY")
                    .companyId(savedSakthi.getId())
                    .isActive(true)
                    .build();
            userRepo.save(millAdmin);

            User customer = User.builder()
                    .email("customer@sakthigarments.in")
                    .passwordHash(commonHash)
                    .fullName("Anandha Kumar")
                    .phoneNumber("+91 98765 43210")
                    .role("CUSTOMER")
                    .isActive(true)
                    .build();
            userRepo.save(customer);

            log.info("Default seed companies, settings, and users populated.");

            // 4. Run MongoDB to MySQL data migration from JSON fixtures if present
            try {
                log.info("Triggering initial MongoDB to MySQL migration from fixtures...");
                migrationService.executeMigration(false);
            } catch (Exception e) {
                log.warn("Auto-migration during startup completed with warnings: {}", e.getMessage());
            }
        } else {
            // Ensure Sakthi Garments company profile has updated brand details
            companyRepo.findAll().stream()
                    .filter(c -> "SAKTHI GARMENTS".equalsIgnoreCase(c.getCompanyName()))
                    .findFirst()
                    .ifPresent(c -> {
                        c.setEmail("yagesh@gmail.com");
                        c.setPhoneNumber("+91 93618 32472");
                        c.setAddress("KVR Nagar");
                        companyRepo.save(c);
                    });
        }

        // Seed 65 canonical catalog products from data/products.json if not yet fully seeded
        if (productRepo.count() < 65) {
            log.info("Current product count is {}. Loading full Phase 1 catalog from data/products.json...", productRepo.count());
            try {
                Resource resource = new ClassPathResource("data/products.json");
                if (resource.exists()) {
                    Long targetCompanyId = companyRepo.findAll().stream()
                            .filter(c -> "SAKTHI GARMENTS".equalsIgnoreCase(c.getCompanyName()))
                            .map(CompanyProfile::getId)
                            .findFirst()
                            .orElse(1L);

                    ObjectMapper mapper = new ObjectMapper();
                    List<Map<String, Object>> prods = mapper.readValue(
                            resource.getInputStream(),
                            new TypeReference<List<Map<String, Object>>>() {}
                    );

                    int added = 0;
                    for (Map<String, Object> item : prods) {
                        String slug = (String) item.get("slug");
                        if (slug != null && productRepo.findBySlug(slug).isEmpty()) {
                            Product p = Product.builder()
                                    .companyId(targetCompanyId)
                                    .name((String) item.get("name"))
                                    .sku((String) item.get("sku"))
                                    .slug(slug)
                                    .category((String) item.get("category"))
                                    .subcategory((String) item.get("subcategory"))
                                    .description((String) item.get("description"))
                                    .garmentType((String) item.get("garmentType"))
                                    .fabric((String) item.get("fabric"))
                                    .fabricGsm(item.get("fabricGsm") instanceof Number ? ((Number) item.get("fabricGsm")).intValue() : 220)
                                    .fit((String) item.get("fit"))
                                    .sleeveType((String) item.get("sleeveType"))
                                    .basePrice(item.get("basePrice") instanceof Number ? BigDecimal.valueOf(((Number) item.get("basePrice")).doubleValue()) : new BigDecimal("299.00"))
                                    .minOrderQuantity(item.get("minOrderQuantity") instanceof Number ? ((Number) item.get("minOrderQuantity")).intValue() : 1)
                                    .stockQuantity(item.get("stockQuantity") instanceof Number ? ((Number) item.get("stockQuantity")).intValue() : 1000)
                                    .isCustomizable(Boolean.TRUE.equals(item.get("isCustomizable")))
                                    .sampleAvailable(Boolean.TRUE.equals(item.get("sampleAvailable")))
                                    .samplePrice(new BigDecimal("69.00"))
                                    .isPublished(true)
                                    .imageUrl((String) item.get("imageUrl"))
                                    .build();
                            productRepo.save(p);
                            added++;
                        }
                    }
                    log.info("Seeded {} new catalog products from data/products.json. Total count in DB: {}", added, productRepo.count());
                } else {
                    log.warn("data/products.json classpath resource not found.");
                }
            } catch (Exception e) {
                log.error("Failed to seed catalog products from data/products.json: {}", e.getMessage(), e);
            }
        }
    }
}
