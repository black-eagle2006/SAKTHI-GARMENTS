package com.sakthigarments;

import com.sakthigarments.dto.PricingDTOs.*;
import com.sakthigarments.service.PricingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.math.BigDecimal;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

public class PricingServiceTest {

    private PricingService pricingService;

    @BeforeEach
    public void setup() {
        pricingService = new PricingService();
        ReflectionTestUtils.setField(pricingService, "plainTshirtBasePrice", 249.0);
        ReflectionTestUtils.setField(pricingService, "customTshirtBasePrice", 299.0);
        ReflectionTestUtils.setField(pricingService, "sampleBasePrice", 69.0);
        ReflectionTestUtils.setField(pricingService, "frontLayerSurcharge", 50.0);
        ReflectionTestUtils.setField(pricingService, "backPrintSurcharge", 80.0);
        ReflectionTestUtils.setField(pricingService, "gstRatePercent", 5.0);
        ReflectionTestUtils.setField(pricingService, "freeShippingThreshold", 999.0);
        ReflectionTestUtils.setField(pricingService, "standardShippingFee", 50.0);
    }

    @Test
    public void testPlainTshirtCalculation() {
        CartItemPricingDTO item = CartItemPricingDTO.builder()
                .productId(1L)
                .quantity(1)
                .itemType("PLAIN")
                .build();

        PriceCalculationRequest req = PriceCalculationRequest.builder()
                .items(Collections.singletonList(item))
                .build();

        PriceBreakdownResponse res = pricingService.calculatePrice(req);

        assertNotNull(res);
        assertEquals(new BigDecimal("249.00"), res.getBaseGarmentPrice());
        assertEquals(new BigDecimal("0.00"), res.getCustomizationFee());
        // Shipping fee should be ₹50 since 249 < 999
        assertEquals(new BigDecimal("50.00"), res.getShippingFee());
        // GST: 5% of 249 = 12.45 rounded to 12.00
        assertEquals(new BigDecimal("12.00"), res.getTaxAmount());
        // Total: 249 + 50 + 12 = 311.00
        assertEquals(new BigDecimal("311.00"), res.getTotalAmount());
    }

    @Test
    public void testSampleClothSwatchCalculation() {
        CartItemPricingDTO sampleItem = CartItemPricingDTO.builder()
                .productId(3L)
                .quantity(1)
                .itemType("SAMPLE")
                .build();

        PriceCalculationRequest req = PriceCalculationRequest.builder()
                .items(Collections.singletonList(sampleItem))
                .build();

        PriceBreakdownResponse res = pricingService.calculatePrice(req);

        assertNotNull(res);
        assertEquals(new BigDecimal("69.00"), res.getBaseGarmentPrice());
        assertEquals(new BigDecimal("0.00"), res.getCustomizationFee());
        assertEquals(new BigDecimal("50.00"), res.getShippingFee());
        assertEquals(new BigDecimal("3.00"), res.getTaxAmount()); // 5% of 69 is ~3
        assertEquals(new BigDecimal("122.00"), res.getTotalAmount());
    }

    @Test
    public void testCustomTshirtWithLayersAndQuantityDiscount() {
        // 5 units: triggers 10% volume discount, and subtotal > 999 triggers free shipping
        CartItemPricingDTO item = CartItemPricingDTO.builder()
                .productId(1L)
                .quantity(5)
                .itemType("CUSTOM")
                .frontLayersCount(2) // 1 extra layer = +₹50
                .backLayersCount(1)  // back print = +₹80
                .build();

        PriceCalculationRequest req = PriceCalculationRequest.builder()
                .items(Collections.singletonList(item))
                .build();

        PriceBreakdownResponse res = pricingService.calculatePrice(req);

        assertNotNull(res);
        // Base garment: 249 * 5 = 1245.00
        assertEquals(new BigDecimal("1245.00"), res.getBaseGarmentPrice());
        // Custom fee per shirt: 50 (base custom) + 50 (extra front) + 80 (back) = 180 * 5 = 900
        assertEquals(new BigDecimal("900.00"), res.getCustomizationFee());
        // Raw subtotal = 2145. 10% discount = 215. Final subtotal = 1930.
        assertEquals(new BigDecimal("215.00"), res.getQuantityDiscount());
        assertEquals(new BigDecimal("1930.00"), res.getSubtotal());
        // Shipping is FREE because subtotal > 999
        assertEquals(new BigDecimal("0.00"), res.getShippingFee());
        // GST: 5% of 1930 = 97
        assertEquals(new BigDecimal("97.00"), res.getTaxAmount());
        // Total: 1930 + 0 + 97 = 2027.00
        assertEquals(new BigDecimal("2027.00"), res.getTotalAmount());
    }
}
