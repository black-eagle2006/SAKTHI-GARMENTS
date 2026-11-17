package com.sakthigarments.controller;

import com.sakthigarments.dto.ProductDTOs.ProductSectionDto;
import com.sakthigarments.model.Product;
import com.sakthigarments.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@Tag(name = "Product Catalog", description = "Garment styles, blank inventory, and fabric specifications")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    @Operation(summary = "List all published catalog products, with optional search and category filter")
    public ResponseEntity<List<Product>> getAllProducts(
            @RequestParam(required = false) Long companyId,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {

        if (search != null && !search.trim().isEmpty()) {
            return ResponseEntity.ok(productService.searchProducts(search));
        }

        if (category != null && !category.trim().isEmpty()) {
            return ResponseEntity.ok(productService.getProductsByCategory(category));
        }

        if (companyId != null) {
            return ResponseEntity.ok(productService.getProductsByCompany(companyId));
        }

        return ResponseEntity.ok(productService.getAllPublishedProducts());
    }

    @GetMapping("/sections")
    @Operation(summary = "Get products grouped into the 15 canonical category sections")
    public ResponseEntity<List<ProductSectionDto>> getProductSections() {
        return ResponseEntity.ok(productService.getProductSections());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get single product details by ID")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/slug/{slug}")
    @Operation(summary = "Get single product details by slug")
    public ResponseEntity<Product> getProductBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(productService.getProductBySlug(slug));
    }
}
