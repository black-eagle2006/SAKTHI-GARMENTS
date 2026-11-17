package com.sakthigarments.service;

import com.sakthigarments.dto.PricingDTOs.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class PricingService {

    @Value("${app.pricing.plain-tshirt-base-price:249.0}")
    private double plainTshirtBasePrice;

    @Value("${app.pricing.custom-tshirt-base-price:299.0}")
    private double customTshirtBasePrice;

    @Value("${app.pricing.sample-base-price:69.0}")
    private double sampleBasePrice;

    @Value("${app.pricing.front-layer-surcharge:50.0}")
    private double frontLayerSurcharge;

    @Value("${app.pricing.back-print-surcharge:80.0}")
    private double backPrintSurcharge;

    @Value("${app.pricing.gst-rate-percent:5.0}")
    private double gstRatePercent;

    @Value("${app.pricing.free-shipping-threshold:999.0}")
    private double freeShippingThreshold;

    @Value("${app.pricing.shipping-fee:50.0}")
    private double standardShippingFee;

    public PriceBreakdownResponse calculatePrice(PriceCalculationRequest request) {
        if (request == null || request.getItems() == null || request.getItems().isEmpty()) {
            return PriceBreakdownResponse.builder()
                    .baseGarmentPrice(BigDecimal.ZERO)
                    .customizationFee(BigDecimal.ZERO)
                    .quantityDiscount(BigDecimal.ZERO)
                    .subtotal(BigDecimal.ZERO)
                    .shippingFee(BigDecimal.ZERO)
                    .taxAmount(BigDecimal.ZERO)
                    .totalAmount(BigDecimal.ZERO)
                    .build();
        }

        double baseTotal = 0.0;
        double customizationTotal = 0.0;
        int totalQuantity = 0;

        for (CartItemPricingDTO item : request.getItems()) {
            if (item == null) {
                continue;
            }
            int qty = item.getQuantity() != null ? item.getQuantity() : 1;
            totalQuantity += qty;

            if ("SAMPLE".equalsIgnoreCase(item.getItemType())) {
                baseTotal += sampleBasePrice * qty;
            } else if ("PLAIN".equalsIgnoreCase(item.getItemType())) {
                baseTotal += plainTshirtBasePrice * qty;
            } else {
                // CUSTOM T-Shirt
                baseTotal += plainTshirtBasePrice * qty;
                double itemCustomFee = customTshirtBasePrice - plainTshirtBasePrice; // ₹50 initial custom setup

                // Front layer additions
                if (item.getFrontLayersCount() != null && item.getFrontLayersCount() > 1) {
                    itemCustomFee += (item.getFrontLayersCount() - 1) * frontLayerSurcharge;
                }

                // Back print additions
                if (item.getBackLayersCount() != null && item.getBackLayersCount() > 0) {
                    itemCustomFee += backPrintSurcharge + (item.getBackLayersCount() - 1) * 40.0;
                }

                customizationTotal += itemCustomFee * qty;
            }
        }

        double rawSubtotal = baseTotal + customizationTotal;

        // 10% quantity discount if ordering 5 or more items
        double discount = 0.0;
        if (totalQuantity >= 5) {
            discount = Math.round(rawSubtotal * 0.10);
        }

        double finalSubtotal = Math.max(0, rawSubtotal - discount);

        // Shipping fee: ₹50 or FREE above ₹999
        double shipping = (finalSubtotal >= freeShippingThreshold || finalSubtotal == 0) ? 0.0 : standardShippingFee;

        // GST: 5%
        double gst = Math.round(finalSubtotal * (gstRatePercent / 100.0));

        double total = finalSubtotal + shipping + gst;

        return PriceBreakdownResponse.builder()
                .baseGarmentPrice(BigDecimal.valueOf(baseTotal).setScale(2, RoundingMode.HALF_UP))
                .customizationFee(BigDecimal.valueOf(customizationTotal).setScale(2, RoundingMode.HALF_UP))
                .quantityDiscount(BigDecimal.valueOf(discount).setScale(2, RoundingMode.HALF_UP))
                .subtotal(BigDecimal.valueOf(finalSubtotal).setScale(2, RoundingMode.HALF_UP))
                .shippingFee(BigDecimal.valueOf(shipping).setScale(2, RoundingMode.HALF_UP))
                .taxAmount(BigDecimal.valueOf(gst).setScale(2, RoundingMode.HALF_UP))
                .totalAmount(BigDecimal.valueOf(total).setScale(2, RoundingMode.HALF_UP))
                .build();
    }
}
