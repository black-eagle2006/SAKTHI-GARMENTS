package com.sakthigarments.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_id", nullable = false)
    private Long companyId;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, unique = true, length = 100)
    private String sku;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "garment_type", nullable = false, length = 60)
    private String garmentType = "T-Shirt";

    @Column(nullable = false, length = 100)
    private String fabric = "100% Combed Cotton";

    @Column(name = "fabric_gsm", nullable = false)
    private Integer fabricGsm = 220;

    @Column(nullable = false, length = 50)
    private String fit = "Regular Fit";

    @Column(name = "sleeve_type", nullable = false, length = 50)
    private String sleeveType = "Half Sleeve";

    @Column(name = "base_price", nullable = false)
    private BigDecimal basePrice = new BigDecimal("249.00");

    @Column(name = "min_order_quantity", nullable = false)
    private Integer minOrderQuantity = 1;

    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity = 500;

    @Column(name = "is_customizable", nullable = false)
    private Boolean isCustomizable = true;

    @Column(name = "sample_available", nullable = false)
    private Boolean sampleAvailable = true;

    @Column(name = "sample_price", nullable = false)
    private BigDecimal samplePrice = new BigDecimal("69.00");

    @Column(name = "is_published", nullable = false)
    private Boolean isPublished = true;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(length = 150)
    private String slug;

    @Column(length = 100)
    private String category;

    @Column(length = 100)
    private String subcategory;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Product() {}

    public Product(Long id, Long companyId, String name, String sku, String description, String garmentType, String fabric, Integer fabricGsm, String fit, String sleeveType, BigDecimal basePrice, Integer minOrderQuantity, Integer stockQuantity, Boolean isCustomizable, Boolean sampleAvailable, BigDecimal samplePrice, Boolean isPublished, String imageUrl) {
        this.id = id;
        this.companyId = companyId;
        this.name = name;
        this.sku = sku;
        this.description = description;
        this.garmentType = garmentType != null ? garmentType : "T-Shirt";
        this.fabric = fabric != null ? fabric : "100% Combed Cotton";
        this.fabricGsm = fabricGsm != null ? fabricGsm : 220;
        this.fit = fit != null ? fit : "Regular Fit";
        this.sleeveType = sleeveType != null ? sleeveType : "Half Sleeve";
        this.basePrice = basePrice != null ? basePrice : new BigDecimal("249.00");
        this.minOrderQuantity = minOrderQuantity != null ? minOrderQuantity : 1;
        this.stockQuantity = stockQuantity != null ? stockQuantity : 500;
        this.isCustomizable = isCustomizable != null ? isCustomizable : true;
        this.sampleAvailable = sampleAvailable != null ? sampleAvailable : true;
        this.samplePrice = samplePrice != null ? samplePrice : new BigDecimal("69.00");
        this.isPublished = isPublished != null ? isPublished : true;
        this.imageUrl = imageUrl;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getGarmentType() { return garmentType; }
    public void setGarmentType(String garmentType) { this.garmentType = garmentType; }

    public String getFabric() { return fabric; }
    public void setFabric(String fabric) { this.fabric = fabric; }

    public Integer getFabricGsm() { return fabricGsm; }
    public void setFabricGsm(Integer fabricGsm) { this.fabricGsm = fabricGsm; }

    public String getFit() { return fit; }
    public void setFit(String fit) { this.fit = fit; }

    public String getSleeveType() { return sleeveType; }
    public void setSleeveType(String sleeveType) { this.sleeveType = sleeveType; }

    public BigDecimal getBasePrice() { return basePrice; }
    public void setBasePrice(BigDecimal basePrice) { this.basePrice = basePrice; }

    public Integer getMinOrderQuantity() { return minOrderQuantity; }
    public void setMinOrderQuantity(Integer minOrderQuantity) { this.minOrderQuantity = minOrderQuantity; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }

    public Boolean getIsCustomizable() { return isCustomizable; }
    public void setIsCustomizable(Boolean isCustomizable) { this.isCustomizable = isCustomizable; }

    public Boolean getSampleAvailable() { return sampleAvailable; }
    public void setSampleAvailable(Boolean sampleAvailable) { this.sampleAvailable = sampleAvailable; }

    public BigDecimal getSamplePrice() { return samplePrice; }
    public void setSamplePrice(BigDecimal samplePrice) { this.samplePrice = samplePrice; }

    public Boolean getIsPublished() { return isPublished; }
    public void setIsPublished(Boolean isPublished) { this.isPublished = isPublished; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSubcategory() { return subcategory; }
    public void setSubcategory(String subcategory) { this.subcategory = subcategory; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static ProductBuilder builder() { return new ProductBuilder(); }

    public static class ProductBuilder {
        private Long id;
        private Long companyId;
        private String name;
        private String sku;
        private String description;
        private String garmentType = "T-Shirt";
        private String fabric = "100% Combed Cotton";
        private Integer fabricGsm = 220;
        private String fit = "Regular Fit";
        private String sleeveType = "Half Sleeve";
        private BigDecimal basePrice = new BigDecimal("249.00");
        private Integer minOrderQuantity = 1;
        private Integer stockQuantity = 500;
        private Boolean isCustomizable = true;
        private Boolean sampleAvailable = true;
        private BigDecimal samplePrice = new BigDecimal("69.00");
        private Boolean isPublished = true;
        private String imageUrl;
        private String slug;
        private String category;
        private String subcategory;

        public ProductBuilder id(Long id) { this.id = id; return this; }
        public ProductBuilder companyId(Long companyId) { this.companyId = companyId; return this; }
        public ProductBuilder name(String name) { this.name = name; return this; }
        public ProductBuilder sku(String sku) { this.sku = sku; return this; }
        public ProductBuilder description(String description) { this.description = description; return this; }
        public ProductBuilder garmentType(String garmentType) { this.garmentType = garmentType; return this; }
        public ProductBuilder fabric(String fabric) { this.fabric = fabric; return this; }
        public ProductBuilder fabricGsm(Integer fabricGsm) { this.fabricGsm = fabricGsm; return this; }
        public ProductBuilder fit(String fit) { this.fit = fit; return this; }
        public ProductBuilder sleeveType(String sleeveType) { this.sleeveType = sleeveType; return this; }
        public ProductBuilder basePrice(BigDecimal basePrice) { this.basePrice = basePrice; return this; }
        public ProductBuilder minOrderQuantity(Integer minOrderQuantity) { this.minOrderQuantity = minOrderQuantity; return this; }
        public ProductBuilder stockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; return this; }
        public ProductBuilder isCustomizable(Boolean isCustomizable) { this.isCustomizable = isCustomizable; return this; }
        public ProductBuilder sampleAvailable(Boolean sampleAvailable) { this.sampleAvailable = sampleAvailable; return this; }
        public ProductBuilder samplePrice(BigDecimal samplePrice) { this.samplePrice = samplePrice; return this; }
        public ProductBuilder isPublished(Boolean isPublished) { this.isPublished = isPublished; return this; }
        public ProductBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public ProductBuilder slug(String slug) { this.slug = slug; return this; }
        public ProductBuilder category(String category) { this.category = category; return this; }
        public ProductBuilder subcategory(String subcategory) { this.subcategory = subcategory; return this; }

        public Product build() {
            Product p = new Product(id, companyId, name, sku, description, garmentType, fabric, fabricGsm, fit, sleeveType, basePrice, minOrderQuantity, stockQuantity, isCustomizable, sampleAvailable, samplePrice, isPublished, imageUrl);
            p.setSlug(slug);
            p.setCategory(category);
            p.setSubcategory(subcategory);
            return p;
        }
    }
}
