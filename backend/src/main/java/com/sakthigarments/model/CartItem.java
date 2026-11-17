package com.sakthigarments.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cart_id", nullable = false)
    private Long cartId;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(name = "variant_id")
    private Long variantId;

    @Column(name = "design_project_id")
    private Long designProjectId;

    @Column(nullable = false)
    private Integer quantity = 1;

    @Column(name = "unit_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "custom_attributes_json", columnDefinition = "TEXT")
    private String customAttributesJson;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public CartItem() {}

    public CartItem(Long id, Long cartId, Long productId, Long variantId, Long designProjectId, Integer quantity, BigDecimal unitPrice, String customAttributesJson) {
        this.id = id;
        this.cartId = cartId;
        this.productId = productId;
        this.variantId = variantId;
        this.designProjectId = designProjectId;
        this.quantity = quantity != null ? quantity : 1;
        this.unitPrice = unitPrice;
        this.customAttributesJson = customAttributesJson;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCartId() { return cartId; }
    public void setCartId(Long cartId) { this.cartId = cartId; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public Long getVariantId() { return variantId; }
    public void setVariantId(Long variantId) { this.variantId = variantId; }

    public Long getDesignProjectId() { return designProjectId; }
    public void setDesignProjectId(Long designProjectId) { this.designProjectId = designProjectId; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }

    public String getCustomAttributesJson() { return customAttributesJson; }
    public void setCustomAttributesJson(String customAttributesJson) { this.customAttributesJson = customAttributesJson; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
