package com.sakthigarments.service;

import com.sakthigarments.dto.ProductDTOs.ProductSectionDto;
import com.sakthigarments.exception.BadRequestException;
import com.sakthigarments.exception.ResourceNotFoundException;
import com.sakthigarments.model.Product;
import com.sakthigarments.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllPublishedProducts() {
        return productRepository.findByIsPublishedTrue();
    }

    public List<Product> getProductsByCompany(Long companyId) {
        return productRepository.findByCompanyIdAndIsPublishedTrue(companyId);
    }

    public Product getProductById(Long id) {
        if (id == null) {
            throw new BadRequestException("Product ID cannot be null.");
        }
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public Product getProductBySlug(String slug) {
        if (slug == null || slug.trim().isEmpty()) {
            throw new BadRequestException("Product slug cannot be empty.");
        }
        return productRepository.findBySlug(slug.trim())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with slug: " + slug));
    }

    public List<Product> getProductsByCategory(String category) {
        if (category == null || category.trim().isEmpty()) {
            return getAllPublishedProducts();
        }
        return productRepository.findByCategoryIgnoreCaseAndIsPublishedTrue(category.trim());
    }

    public List<Product> searchProducts(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllPublishedProducts();
        }
        String q = query.trim();
        return productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(q, q)
                .stream()
                .filter(p -> Boolean.TRUE.equals(p.getIsPublished()))
                .collect(Collectors.toList());
    }

    public List<ProductSectionDto> getProductSections() {
        List<Product> all = getAllPublishedProducts();

        // 15 canonical reference sections matching Phase 1 detailed DOM sequence
        String[][] canonicalSections = {
            {"c-polos", "MEN'S / UNISEX > POLOS", "POLOS", "Classic piqué and combed cotton polo t-shirts for corporate, event, and casual wear."},
            {"c-round-neck-tees1", "MEN'S / UNISEX > ROUND NECK TEES", "ROUND NECK TEES", "Everyday bio-washed combed cotton round neck tees engineered for vibrant printing."},
            {"c-oversized-tees4", "MEN'S / UNISEX > OVERSIZED TEES", "OVERSIZED TEES", "Heavyweight 240+ GSM drop-shoulder boxy silhouette tees for streetwear brands."},
            {"c-other-styles", "MEN'S / UNISEX > OTHER STYLES", "OTHER STYLES", "V-neck, full sleeve, and specialized cuts crafted from premium Tiruppur cotton."},
            {"c-shirts", "MEN'S / UNISEX > SHIRTS", "SHIRTS", "Smart formal and casual woven shirts suitable for office branding and uniforms."},
            {"c-bottoms", "MEN'S / UNISEX > BOTTOMS", "BOTTOMS", "Comfortable cotton french terry joggers and track pants with adjustable drawstrings."},
            {"c-womens", "APPAREL > WOMEN'S", "WOMEN'S", "Flattering crop tops, regular tees, and boyfriend fits tailored for women."},
            {"c-infant", "KIDS > INFANT", "INFANT", "Ultra-soft OEKO-TEX certified hypoallergenic organic cotton baby onesies and rompers."},
            {"c-kids-teens", "KIDS > KIDS & TEENS", "KIDS & TEENS", "Durable colorfast tees and clothing sets designed for kids and teenagers."},
            {"c-accessories", "ACCESSORIES", "ACCESSORIES", "Embroidered twill snapback caps, bucket hats, and promotional merchandise."},
            {"c-adult", "JACKETS & PULLOVERS > ADULTS", "ADULTS", "Winter fleece pullovers, zip hoodies, bomber jackets, and varsity outerwear."},
            {"c-kids-1", "JACKETS & PULLOVERS > KIDS", "KIDS", "Warm and cozy fleece sweatshirts and winter hoodies for children."},
            {"c-stationery", "STATIONERY", "STATIONERY", "Corporate notebooks, desk stationery, and customized office accessories."},
            {"c-miscellaneous", "MISCELLANEOUS", "MISCELLANEOUS", "Ceramic coffee mugs, mouse pads, and promotional merchandise."},
            {"c-branded-merchandise", "BRANDED MERCHANDISE", "BRANDED MERCHANDISE", "Premium co-branded corporate gifts, custom tote bags, and accessories."}
        };

        List<ProductSectionDto> sections = new ArrayList<>();
        for (String[] sec : canonicalSections) {
            String sectionId = sec[0];
            String title = sec[1];
            String matchKey = sec[2];
            String desc = sec[3];

            List<Product> prods = all.stream()
                    .filter(p -> {
                        if (p.getSubcategory() != null && p.getSubcategory().equalsIgnoreCase(matchKey)) {
                            if ("KIDS".equalsIgnoreCase(matchKey) && p.getCategory() != null) {
                                return p.getCategory().contains("JACKETS");
                            }
                            return true;
                        }
                        if (p.getCategory() != null && p.getCategory().equalsIgnoreCase(matchKey)) {
                            return true;
                        }
                        return false;
                    })
                    .collect(Collectors.toList());

            sections.add(new ProductSectionDto(sectionId, title, desc, prods.size(), prods));
        }

        return sections;
    }

    public Product saveProduct(Product product) {
        if (product == null) {
            throw new BadRequestException("Product entity cannot be null.");
        }
        return productRepository.save(product);
    }

    public List<Product> saveAllProducts(List<Product> products) {
        return productRepository.saveAll(products);
    }
}
