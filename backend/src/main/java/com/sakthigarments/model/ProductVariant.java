package com.sakthigarments.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "product_variants")
public class ProductVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(nullable = false, unique = true, length = 100)
    private String sku;

    @Column(nullable = false, length = 20)
    private String size;

    @Column(name = "color_name", nullable = false, length = 60)
    private String colorName;

    @Column(name = "color_hex", nullable = false, length = 20)
    private String colorHex;

    @Column(name = "fabric_gsm", nullable = false)
    private Integer fabricGsm = 220;

    @Column(name = "price_adjustment", precision = 10, scale = 2)
    private BigDecimal priceAdjustment = BigDecimal.ZERO;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public ProductVariant() {}

    public ProductVariant(Long id, Long productId, String sku, String size, String colorName, String colorHex, Integer fabricGsm, BigDecimal priceAdjustment) {
        this.id = id;
        this.productId = productId;
        this.sku = sku;
        this.size = size;
        this.colorName = colorName;
        this.colorHex = colorHex;
        this.fabricGsm = fabricGsm != null ? fabricGsm : 220;
        this.priceAdjustment = priceAdjustment != null ? priceAdjustment : BigDecimal.ZERO;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public String getColorName() { return colorName; }
    public void setColorName(String colorName) { this.colorName = colorName; }

    public String getColorHex() { return colorHex; }
    public void setColorHex(String colorHex) { this.colorHex = colorHex; }

    public Integer getFabricGsm() { return fabricGsm; }
    public void setFabricGsm(Integer fabricGsm) { this.fabricGsm = fabricGsm; }

    public BigDecimal getPriceAdjustment() { return priceAdjustment; }
    public void setPriceAdjustment(BigDecimal priceAdjustment) { this.priceAdjustment = priceAdjustment; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
