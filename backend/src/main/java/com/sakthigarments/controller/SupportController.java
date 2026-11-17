package com.sakthigarments.controller;

import com.sakthigarments.dto.ProductDTOs.ContactInquiryDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/support")
@Tag(name = "Customer Support", description = "Customer tickets, inquiries, and help requests")
public class SupportController {

    @PostMapping("/tickets")
    @Operation(summary = "Submit a support inquiry or general message")
    public ResponseEntity<Map<String, Object>> submitTicket(@RequestBody Map<String, Object> ticketData) {
        Map<String, Object> res = new HashMap<>();
        res.put("ticketId", "TKT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        res.put("status", "RECEIVED");
        res.put("message", "Your inquiry has been received by the Tiruppur customer desk.");
        return ResponseEntity.ok(res);
    }

    @PostMapping("/contact")
    @Operation(summary = "Submit a direct contact/inquiry request from the storefront")
    public ResponseEntity<Map<String, Object>> submitContactInquiry(@RequestBody ContactInquiryDto inquiry) {
        Map<String, Object> res = new HashMap<>();
        String refId = "INQ-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        res.put("referenceId", refId);
        res.put("status", "RECEIVED");
        res.put("message", "Thank you, " + (inquiry.getName() != null ? inquiry.getName() : "Customer") + "! Our Tiruppur mill team at 9361832472 will contact you shortly.");
        res.put("inquiry", inquiry);
        return ResponseEntity.ok(res);
    }
}
