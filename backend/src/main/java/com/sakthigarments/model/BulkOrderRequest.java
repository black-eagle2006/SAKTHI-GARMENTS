package com.sakthigarments.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bulk_order_requests")
public class BulkOrderRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "company_id", nullable = false)
    private Long companyId;

    @Column(name = "garment_type", nullable = false, length = 100)
    private String garmentType;

    @Column(name = "total_quantity", nullable = false)
    private Integer totalQuantity;

    @Column(name = "size_breakdown_json", columnDefinition = "TEXT")
    private String sizeBreakdownJson;

    @Column(name = "customization_notes", columnDefinition = "TEXT")
    private String customizationNotes;

    @Column(nullable = false, length = 40)
    private String status = "PENDING"; // PENDING, QUOTED, ACCEPTED, REJECTED, CONVERTED

    @Column(name = "quoted_price")
    private BigDecimal quotedPrice;

    @Column(name = "company_notes", columnDefinition = "TEXT")
    private String companyNotes;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public BulkOrderRequest() {}

    public BulkOrderRequest(Long id, Long customerId, Long companyId, String garmentType, Integer totalQuantity, String sizeBreakdownJson, String customizationNotes, String status, BigDecimal quotedPrice, String companyNotes) {
        this.id = id;
        this.customerId = customerId;
        this.companyId = companyId;
        this.garmentType = garmentType;
        this.totalQuantity = totalQuantity;
        this.sizeBreakdownJson = sizeBreakdownJson;
        this.customizationNotes = customizationNotes;
        this.status = status != null ? status : "PENDING";
        this.quotedPrice = quotedPrice;
        this.companyNotes = companyNotes;
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

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getGarmentType() { return garmentType; }
    public void setGarmentType(String garmentType) { this.garmentType = garmentType; }

    public Integer getTotalQuantity() { return totalQuantity; }
    public void setTotalQuantity(Integer totalQuantity) { this.totalQuantity = totalQuantity; }

    public String getSizeBreakdownJson() { return sizeBreakdownJson; }
    public void setSizeBreakdownJson(String sizeBreakdownJson) { this.sizeBreakdownJson = sizeBreakdownJson; }

    public String getCustomizationNotes() { return customizationNotes; }
    public void setCustomizationNotes(String customizationNotes) { this.customizationNotes = customizationNotes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public BigDecimal getQuotedPrice() { return quotedPrice; }
    public void setQuotedPrice(BigDecimal quotedPrice) { this.quotedPrice = quotedPrice; }

    public String getCompanyNotes() { return companyNotes; }
    public void setCompanyNotes(String companyNotes) { this.companyNotes = companyNotes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static BulkOrderRequestBuilder builder() { return new BulkOrderRequestBuilder(); }

    public static class BulkOrderRequestBuilder {
        private Long id;
        private Long customerId;
        private Long companyId;
        private String garmentType;
        private Integer totalQuantity;
        private String sizeBreakdownJson;
        private String customizationNotes;
        private String status = "PENDING";
        private BigDecimal quotedPrice;
        private String companyNotes;

        public BulkOrderRequestBuilder id(Long id) { this.id = id; return this; }
        public BulkOrderRequestBuilder customerId(Long customerId) { this.customerId = customerId; return this; }
        public BulkOrderRequestBuilder companyId(Long companyId) { this.companyId = companyId; return this; }
        public BulkOrderRequestBuilder garmentType(String garmentType) { this.garmentType = garmentType; return this; }
        public BulkOrderRequestBuilder totalQuantity(Integer totalQuantity) { this.totalQuantity = totalQuantity; return this; }
        public BulkOrderRequestBuilder sizeBreakdownJson(String sizeBreakdownJson) { this.sizeBreakdownJson = sizeBreakdownJson; return this; }
        public BulkOrderRequestBuilder customizationNotes(String customizationNotes) { this.customizationNotes = customizationNotes; return this; }
        public BulkOrderRequestBuilder status(String status) { this.status = status; return this; }
        public BulkOrderRequestBuilder quotedPrice(BigDecimal quotedPrice) { this.quotedPrice = quotedPrice; return this; }
        public BulkOrderRequestBuilder companyNotes(String companyNotes) { this.companyNotes = companyNotes; return this; }

        public BulkOrderRequest build() {
            return new BulkOrderRequest(id, customerId, companyId, garmentType, totalQuantity, sizeBreakdownJson, customizationNotes, status, quotedPrice, companyNotes);
        }
    }
}
