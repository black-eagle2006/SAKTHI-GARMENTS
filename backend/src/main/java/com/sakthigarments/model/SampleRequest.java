package com.sakthigarments.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "sample_requests")
public class SampleRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "company_id", nullable = false)
    private Long companyId;

    @Column(name = "sample_type", nullable = false, length = 100)
    private String sampleType = "Fabric Swatch Sample";

    @Column(nullable = false)
    private Integer quantity = 1;

    @Column(nullable = false)
    private BigDecimal price = new BigDecimal("69.00");

    @Column(name = "payment_status", nullable = false, length = 30)
    private String paymentStatus = "COMPLETED";

    @Column(name = "fulfilment_status", nullable = false, length = 40)
    private String fulfilmentStatus = "REQUESTED"; // REQUESTED, DISPATCHED, DELIVERED

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public SampleRequest() {}

    public SampleRequest(Long id, Long customerId, Long companyId, String sampleType, Integer quantity, BigDecimal price, String paymentStatus, String fulfilmentStatus) {
        this.id = id;
        this.customerId = customerId;
        this.companyId = companyId;
        this.sampleType = sampleType != null ? sampleType : "Fabric Swatch Sample";
        this.quantity = quantity != null ? quantity : 1;
        this.price = price != null ? price : new BigDecimal("69.00");
        this.paymentStatus = paymentStatus != null ? paymentStatus : "COMPLETED";
        this.fulfilmentStatus = fulfilmentStatus != null ? fulfilmentStatus : "REQUESTED";
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getSampleType() { return sampleType; }
    public void setSampleType(String sampleType) { this.sampleType = sampleType; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getFulfilmentStatus() { return fulfilmentStatus; }
    public void setFulfilmentStatus(String fulfilmentStatus) { this.fulfilmentStatus = fulfilmentStatus; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static SampleRequestBuilder builder() { return new SampleRequestBuilder(); }

    public static class SampleRequestBuilder {
        private Long id;
        private Long customerId;
        private Long companyId;
        private String sampleType = "Fabric Swatch Sample";
        private Integer quantity = 1;
        private BigDecimal price = new BigDecimal("69.00");
        private String paymentStatus = "COMPLETED";
        private String fulfilmentStatus = "REQUESTED";

        public SampleRequestBuilder id(Long id) { this.id = id; return this; }
        public SampleRequestBuilder customerId(Long customerId) { this.customerId = customerId; return this; }
        public SampleRequestBuilder companyId(Long companyId) { this.companyId = companyId; return this; }
        public SampleRequestBuilder sampleType(String sampleType) { this.sampleType = sampleType; return this; }
        public SampleRequestBuilder quantity(Integer quantity) { this.quantity = quantity; return this; }
        public SampleRequestBuilder price(BigDecimal price) { this.price = price; return this; }
        public SampleRequestBuilder paymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; return this; }
        public SampleRequestBuilder fulfilmentStatus(String fulfilmentStatus) { this.fulfilmentStatus = fulfilmentStatus; return this; }

        public SampleRequest build() {
            return new SampleRequest(id, customerId, companyId, sampleType, quantity, price, paymentStatus, fulfilmentStatus);
        }
    }
}
