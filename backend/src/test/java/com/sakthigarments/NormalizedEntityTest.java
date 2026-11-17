package com.sakthigarments;

import com.sakthigarments.model.*;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

public class NormalizedEntityTest {

    @Test
    public void testRoleEntity() {
        Role role = new Role(1L, "ROLE_ADMIN", "Administrator Role");
        assertEquals(1L, role.getId());
        assertEquals("ROLE_ADMIN", role.getName());
        assertEquals("Administrator Role", role.getDescription());
    }

    @Test
    public void testCustomerProfileAndAddressEntities() {
        Address addr = new Address(10L, 3L, "Town Hall Road", "Near Clock Tower", "Old Bus Stand", "Tiruppur", "Tamil Nadu", "641601", "SHIPPING", true);
        assertEquals(10L, addr.getId());
        assertEquals("641601", addr.getPincode());
        assertTrue(addr.getIsDefault());

        CustomerProfile cp = new CustomerProfile(5L, 3L, 10L, "33AAACS0000A1Z5", "Sakthi Retailers", 150);
        assertEquals(3L, cp.getUserId());
        assertEquals(10L, cp.getDefaultShippingAddressId());
        assertEquals(150, cp.getLoyaltyPoints());
    }

    @Test
    public void testProductVariantAndInventoryEntities() {
        ProductVariant variant = new ProductVariant(1L, 1L, "SG-TS-BLK-M", "M", "Obsidian Black", "#0F172A", 220, BigDecimal.ZERO);
        assertEquals("SG-TS-BLK-M", variant.getSku());
        assertEquals(220, variant.getFabricGsm());

        Inventory inv = new Inventory(1L, 1L, "Sakthi Central Warehouse", 500, 20, 50);
        assertEquals(500, inv.getQuantityAvailable());
        assertEquals(20, inv.getQuantityReserved());
        assertEquals(50, inv.getSafetyStock());
    }

    @Test
    public void testPricingRuleEntity() {
        PricingRule rule = new PricingRule(1L, "Industrial Volume Tier", "VOLUME_DISCOUNT", 100, 499, BigDecimal.valueOf(20.0), BigDecimal.ZERO, true);
        assertEquals("VOLUME_DISCOUNT", rule.getRuleType());
        assertEquals(BigDecimal.valueOf(20.0), rule.getDiscountPercentage());
        assertTrue(rule.getIsActive());
    }

    @Test
    public void testDesignLayerAndTemplateEntities() {
        DesignLayer layer = new DesignLayer(1L, 5L, "TEXT", 1, "FRONT", "TIRUPPUR KNIT", "Impact", 48, "#F59E0B", 1024.0, 1024.0, 1.0, 0.0, 1.0);
        assertEquals("TIRUPPUR KNIT", layer.getContent());
        assertEquals("FRONT", layer.getPlacement());

        DesignTemplate template = new DesignTemplate(1L, "Vintage Streetwear", "Streetwear", "vintage,tamil", "/preview.png", "{}", true);
        assertEquals("Vintage Streetwear", template.getTitle());
        assertTrue(template.getIsActive());
    }

    @Test
    public void testPaymentAndShipmentEntities() {
        Payment pay = new Payment(1L, 100L, "RAZORPAY", "order_123", "pay_456", BigDecimal.valueOf(999.00), "INR", "COMPLETED", true);
        assertEquals("order_123", pay.getGatewayOrderId());
        assertEquals("COMPLETED", pay.getStatus());
        assertTrue(pay.getSignatureVerified());

        Shipment shipment = new Shipment(1L, 100L, "SG-TRK-9901-IN", "Blue Dart Express", "Air Express", null, LocalDate.now().plusDays(3), "IN_TRANSIT", "[]");
        assertEquals("SG-TRK-9901-IN", shipment.getTrackingNumber());
        assertEquals("IN_TRANSIT", shipment.getShipmentStatus());
    }
}
