package com.sakthigarments.controller;

import com.sakthigarments.model.CompanyProfile;
import com.sakthigarments.service.CompanyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/companies")
@Tag(name = "Companies & Marketplace", description = "Discovery and profiles of Tiruppur garment mills")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping
    @Operation(summary = "List all approved garment manufacturers or search by keyword")
    public ResponseEntity<List<CompanyProfile>> getCompanies(@RequestParam(required = false) String search) {
        if (search != null && !search.trim().isEmpty()) {
            return ResponseEntity.ok(companyService.searchCompanies(search));
        }
        return ResponseEntity.ok(companyService.getAllApprovedCompanies());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get detailed company profile by ID")
    public ResponseEntity<CompanyProfile> getCompanyById(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.getCompanyById(id));
    }

    @GetMapping("/pincode/{pincode}")
    @Operation(summary = "Discover verified mills by delivery pincode")
    public ResponseEntity<List<CompanyProfile>> getCompaniesByPincode(@PathVariable String pincode) {
        return ResponseEntity.ok(companyService.getCompaniesByPincode(pincode));
    }

    @PostMapping
    @Operation(summary = "Register new garment mill / manufacturing partner")
    public ResponseEntity<CompanyProfile> registerCompany(@RequestBody CompanyProfile profile) {
        return ResponseEntity.ok(companyService.registerCompany(profile));
    }
}
