package com.sakthigarments.controller;

import com.sakthigarments.dto.ProductDTOs.BrandConfigDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/brand")
@Tag(name = "Brand & Platform Configuration", description = "Sakthi Garments identity, contact numbers, and theme constants")
public class BrandConfigController {

    @GetMapping
    @Operation(summary = "Get official Sakthi Garments brand profile and theme metadata")
    public ResponseEntity<BrandConfigDto> getBrandConfig() {
        Map<String, String> colors = new LinkedHashMap<>();
        colors.put("black", "#000000");
        colors.put("skyBlue", "#38BDF8");
        colors.put("white", "#FFFFFF");
        colors.put("yellow", "#FACC15");

        BrandConfigDto config = new BrandConfigDto(
                "SAKTHI GARMENTS",
                "Your Design, Our Stitch.",
                "SG",
                "9361832472",
                "+91 93618 32472",
                "yagesh@gmail.com",
                "KVR Nagar, Main Textile Hub",
                "Tiruppur",
                "Tamil Nadu",
                "641604",
                "India",
                "UPTO 75% OFF + FREE SHIPPING ON BULK ORDERS ACROSS INDIA | DIRECT TIRUPPUR MILL PRICING",
                colors
        );

        return ResponseEntity.ok(config);
    }
}

