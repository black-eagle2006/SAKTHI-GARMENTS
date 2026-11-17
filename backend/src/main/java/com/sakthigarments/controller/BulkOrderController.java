package com.sakthigarments.controller;

import com.sakthigarments.model.BulkOrderRequest;
import com.sakthigarments.repository.BulkOrderRequestRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bulk-orders")
@Tag(name = "Bulk Orders & Quotations", description = "High-volume factory inquiries, size distributions, and quotations")
public class BulkOrderController {

    private final BulkOrderRequestRepository bulkRepository;

    public BulkOrderController(BulkOrderRequestRepository bulkRepository) {
        this.bulkRepository = bulkRepository;
    }

    @PostMapping
    @Operation(summary = "Submit a bulk manufacturing enquiry to a garment mill")
    public ResponseEntity<BulkOrderRequest> createBulkOrder(@RequestBody BulkOrderRequest request) {
        return ResponseEntity.ok(bulkRepository.save(request));
    }

    @GetMapping("/company/{companyId}")
    @Operation(summary = "List bulk quotations requested for a garment manufacturer")
    public ResponseEntity<List<BulkOrderRequest>> getByCompany(@PathVariable Long companyId) {
        return ResponseEntity.ok(bulkRepository.findByCompanyIdOrderByCreatedAtDesc(companyId));
    }
}
