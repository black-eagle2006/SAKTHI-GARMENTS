package com.sakthigarments.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "quotations")
public class Quotation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bulk_order_request_id", nullable = false)
    private Long bulkOrderRequestId;

    @Column(name = "company_id", nullable = false)
    private Long companyId;

    @Column(name = "unit_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "total_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @Column(name = "estimated_production_days")
    private Integer estimatedProductionDays = 5;

    @Column(name = "valid_until")
    private LocalDate validUntil;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @Column(length = 40)
    private String status = "SUBMITTED";

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Quotation() {}

    public Quotation(Long id, Long bulkOrderRequestId, Long companyId, BigDecimal unitPrice, BigDecimal totalPrice, Integer estimatedProductionDays, LocalDate validUntil, String remarks, String status) {
        this.id = id;
        this.bulkOrderRequestId = bulkOrderRequestId;
        this.companyId = companyId;
        this.unitPrice = unitPrice;
        this.totalPrice = totalPrice;
        this.estimatedProductionDays = estimatedProductionDays != null ? estimatedProductionDays : 5;
        this.validUntil = validUntil;
        this.remarks = remarks;
        this.status = status != null ? status : "SUBMITTED";
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getBulkOrderRequestId() { return bulkOrderRequestId; }
    public void setBulkOrderRequestId(Long bulkOrderRequestId) { this.bulkOrderRequestId = bulkOrderRequestId; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }

    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }

    public Integer getEstimatedProductionDays() { return estimatedProductionDays; }
    public void setEstimatedProductionDays(Integer estimatedProductionDays) { this.estimatedProductionDays = estimatedProductionDays; }

    public LocalDate getValidUntil() { return validUntil; }
    public void setValidUntil(LocalDate validUntil) { this.validUntil = validUntil; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
