package com.sakthigarments.controller;

import com.sakthigarments.model.SampleRequest;
import com.sakthigarments.repository.SampleRequestRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/samples")
@Tag(name = "Cloth Samples (₹69)", description = "Physical cloth swatch sample orders for pre-production evaluation")
public class SampleRequestController {

    private final SampleRequestRepository sampleRepository;

    public SampleRequestController(SampleRequestRepository sampleRepository) {
        this.sampleRepository = sampleRepository;
    }

    @PostMapping
    @Operation(summary = "Order a ₹69 cloth sample pack")
    public ResponseEntity<SampleRequest> createSample(@RequestBody SampleRequest sampleRequest) {
        return ResponseEntity.ok(sampleRepository.save(sampleRequest));
    }

    @GetMapping("/company/{companyId}")
    @Operation(summary = "List swatch requests for a specific manufacturer")
    public ResponseEntity<List<SampleRequest>> getByCompany(@PathVariable Long companyId) {
        return ResponseEntity.ok(sampleRepository.findByCompanyIdOrderByCreatedAtDesc(companyId));
    }
}
