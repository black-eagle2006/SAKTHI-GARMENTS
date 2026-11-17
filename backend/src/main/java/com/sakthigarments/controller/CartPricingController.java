package com.sakthigarments.controller;

import com.sakthigarments.dto.PricingDTOs.*;
import com.sakthigarments.service.PricingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/pricing")
@Tag(name = "Pricing Engine", description = "Server-side price calculation, tax verification, and volume discounts")
public class CartPricingController {

    private final PricingService pricingService;

    public CartPricingController(PricingService pricingService) {
        this.pricingService = pricingService;
    }

    @PostMapping("/calculate")
    @Operation(summary = "Calculate authoritative quote with base garment, print zones, shipping, and GST")
    public ResponseEntity<PriceBreakdownResponse> calculateQuote(@RequestBody PriceCalculationRequest request) {
        return ResponseEntity.ok(pricingService.calculatePrice(request));
    }
}
