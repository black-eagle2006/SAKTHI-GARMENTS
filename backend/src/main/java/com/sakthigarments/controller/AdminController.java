package com.sakthigarments.controller;

import com.sakthigarments.model.CompanyProfile;
import com.sakthigarments.repository.OrderRepository;
import com.sakthigarments.repository.UserRepository;
import com.sakthigarments.service.CompanyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@Tag(name = "Administrator Governance", description = "Company approvals, platform overview, and moderation")
public class AdminController {

    private final CompanyService companyService;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public AdminController(
            CompanyService companyService,
            UserRepository userRepository,
            OrderRepository orderRepository) {
        this.companyService = companyService;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }

    @GetMapping("/pending-companies")
    @Operation(summary = "Get list of garment companies awaiting SuperAdmin approval")
    public ResponseEntity<List<CompanyProfile>> getPendingCompanies() {
        return ResponseEntity.ok(companyService.getPendingApprovals());
    }

    @PatchMapping("/companies/{id}/status")
    @Operation(summary = "Approve, reject, or suspend a garment manufacturer")
    public ResponseEntity<CompanyProfile> updateCompanyStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return ResponseEntity.ok(companyService.updateApprovalStatus(id, status));
    }

    @GetMapping("/metrics")
    @Operation(summary = "SuperAdmin platform KPI dashboard overview")
    public ResponseEntity<Map<String, Object>> getPlatformMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalUsers", userRepository.count());
        metrics.put("approvedCompanies", companyService.getAllApprovedCompanies().size());
        metrics.put("pendingApprovals", companyService.getPendingApprovals().size());
        metrics.put("totalOrders", orderRepository.count());
        metrics.put("status", "100% Operational");
        return ResponseEntity.ok(metrics);
    }
}
