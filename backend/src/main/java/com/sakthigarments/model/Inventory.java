package com.sakthigarments.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_variant_id", nullable = false, unique = true)
    private Long productVariantId;

    @Column(name = "warehouse_location", length = 100)
    private String warehouseLocation = "Sakthi Mill Central Warehouse, Tiruppur";

    @Column(name = "quantity_available", nullable = false)
    private Integer quantityAvailable = 500;

    @Column(name = "quantity_reserved", nullable = false)
    private Integer quantityReserved = 0;

    @Column(name = "safety_stock", nullable = false)
    private Integer safetyStock = 50;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Inventory() {}

    public Inventory(Long id, Long productVariantId, String warehouseLocation, Integer quantityAvailable, Integer quantityReserved, Integer safetyStock) {
        this.id = id;
        this.productVariantId = productVariantId;
        this.warehouseLocation = warehouseLocation != null ? warehouseLocation : "Sakthi Mill Central Warehouse, Tiruppur";
        this.quantityAvailable = quantityAvailable != null ? quantityAvailable : 500;
        this.quantityReserved = quantityReserved != null ? quantityReserved : 0;
        this.safetyStock = safetyStock != null ? safetyStock : 50;
    }

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProductVariantId() { return productVariantId; }
    public void setProductVariantId(Long productVariantId) { this.productVariantId = productVariantId; }

    public String getWarehouseLocation() { return warehouseLocation; }
    public void setWarehouseLocation(String warehouseLocation) { this.warehouseLocation = warehouseLocation; }

    public Integer getQuantityAvailable() { return quantityAvailable; }
    public void setQuantityAvailable(Integer quantityAvailable) { this.quantityAvailable = quantityAvailable; }

    public Integer getQuantityReserved() { return quantityReserved; }
    public void setQuantityReserved(Integer quantityReserved) { this.quantityReserved = quantityReserved; }

    public Integer getSafetyStock() { return safetyStock; }
    public void setSafetyStock(Integer safetyStock) { this.safetyStock = safetyStock; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
