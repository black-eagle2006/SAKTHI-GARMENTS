package com.sakthigarments;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sakthigarments.migration.MigrationReport;
import com.sakthigarments.migration.MongoDocumentParser;
import com.sakthigarments.migration.MongoToMySqlMigrationService;
import com.sakthigarments.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class MongoToMySqlMigrationTest {

    private ObjectMapper objectMapper;
    private MongoToMySqlMigrationService migrationService;

    private CompanyProfileRepository companyRepo;
    private UserRepository userRepo;
    private AddressRepository addressRepo;
    private CustomerProfileRepository customerProfileRepo;
    private ProductRepository productRepo;
    private ProductVariantRepository productVariantRepo;
    private InventoryRepository inventoryRepo;
    private DesignProjectRepository designRepo;
    private DesignLayerRepository designLayerRepo;
    private OrderRepository orderRepo;
    private OrderItemRepository orderItemRepo;
    private PaymentRepository paymentRepo;
    private ShipmentRepository shipmentRepo;
    private OrderStatusHistoryRepository orderStatusHistoryRepo;
    private SampleRequestRepository sampleRepo;
    private AuditLogRepository auditLogRepo;

    @BeforeEach
    public void setup() {
        objectMapper = new ObjectMapper();
        companyRepo = Mockito.mock(CompanyProfileRepository.class);
        userRepo = Mockito.mock(UserRepository.class);
        addressRepo = Mockito.mock(AddressRepository.class);
        customerProfileRepo = Mockito.mock(CustomerProfileRepository.class);
        productRepo = Mockito.mock(ProductRepository.class);
        productVariantRepo = Mockito.mock(ProductVariantRepository.class);
        inventoryRepo = Mockito.mock(InventoryRepository.class);
        designRepo = Mockito.mock(DesignProjectRepository.class);
        designLayerRepo = Mockito.mock(DesignLayerRepository.class);
        orderRepo = Mockito.mock(OrderRepository.class);
        orderItemRepo = Mockito.mock(OrderItemRepository.class);
        paymentRepo = Mockito.mock(PaymentRepository.class);
        shipmentRepo = Mockito.mock(ShipmentRepository.class);
        orderStatusHistoryRepo = Mockito.mock(OrderStatusHistoryRepository.class);
        sampleRepo = Mockito.mock(SampleRequestRepository.class);
        auditLogRepo = Mockito.mock(AuditLogRepository.class);

        migrationService = new MongoToMySqlMigrationService(
                companyRepo, userRepo, addressRepo, customerProfileRepo,
                productRepo, productVariantRepo, inventoryRepo, designRepo,
                designLayerRepo, orderRepo, orderItemRepo, paymentRepo,
                shipmentRepo, orderStatusHistoryRepo, sampleRepo, auditLogRepo,
                objectMapper
        );
    }

    @Test
    public void testMongoDocumentParserExtractsObjectId() throws Exception {
        String json = "{\"_id\": {\"$oid\": \"64b8f0010000000000000001\"}, \"companyName\": \"Sakthi Garments\"}";
        JsonNode node = objectMapper.readTree(json);

        String id = MongoDocumentParser.extractId(node);
        assertEquals("64b8f0010000000000000001", id);

        String companyName = MongoDocumentParser.extractString(node, "companyName", "Default");
        assertEquals("Sakthi Garments", companyName);
    }

    @Test
    public void testMongoDocumentParserExtractsDateAndNumbers() throws Exception {
        String json = "{" +
                "\"createdAt\": {\"$date\": \"2024-03-15T10:30:00Z\"}," +
                "\"price\": 299.50," +
                "\"quantity\": 25," +
                "\"isActive\": true" +
                "}";
        JsonNode node = objectMapper.readTree(json);

        LocalDateTime date = MongoDocumentParser.extractDate(node, "createdAt");
        assertNotNull(date);
        assertEquals(2024, date.getYear());
        assertEquals(3, date.getMonthValue());
        assertEquals(15, date.getDayOfMonth());

        BigDecimal price = MongoDocumentParser.extractBigDecimal(node, "price", BigDecimal.ZERO);
        assertEquals(BigDecimal.valueOf(299.50), price);

        Integer qty = MongoDocumentParser.extractInt(node, "quantity", 0);
        assertEquals(25, qty);

        Boolean isActive = MongoDocumentParser.extractBoolean(node, "isActive", false);
        assertTrue(isActive);
    }

    @Test
    public void testExecuteMigrationDryRunParsesAllFixtures() {
        MigrationReport report = migrationService.executeMigration(true);

        assertNotNull(report);
        assertEquals("SUCCESS", report.getStatus());
        assertTrue(report.getDurationMs() >= 0);

        // Verify collection stats populated from json export fixtures
        assertNotNull(report.getCollectionStats().get("companies"));
        assertTrue(report.getCollectionStats().get("companies").getReadCount() > 0);

        assertNotNull(report.getCollectionStats().get("users"));
        assertTrue(report.getCollectionStats().get("users").getReadCount() > 0);

        assertNotNull(report.getCollectionStats().get("products"));
        assertTrue(report.getCollectionStats().get("products").getReadCount() > 0);

        assertNotNull(report.getCollectionStats().get("design_projects"));
        assertTrue(report.getCollectionStats().get("design_projects").getReadCount() > 0);

        assertNotNull(report.getCollectionStats().get("orders"));
        assertTrue(report.getCollectionStats().get("orders").getReadCount() > 0);

        // Verify markdown report generation
        String markdown = report.toMarkdown();
        assertNotNull(markdown);
        assertTrue(markdown.contains("MongoDB to MySQL 8 Migration Execution Report"));
        assertTrue(markdown.contains("companies"));
        assertTrue(markdown.contains("orders"));
    }
}
