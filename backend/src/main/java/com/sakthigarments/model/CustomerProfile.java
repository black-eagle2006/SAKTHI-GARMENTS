package com.sakthigarments.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "customer_profiles")
public class CustomerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;

    @Column(name = "default_shipping_address_id")
    private Long defaultShippingAddressId;

    @Column(name = "gst_number", length = 30)
    private String gstNumber;

    @Column(name = "business_name", length = 150)
    private String businessName;

    @Column(name = "loyalty_points")
    private Integer loyaltyPoints = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public CustomerProfile() {}

    public CustomerProfile(Long id, Long userId, Long defaultShippingAddressId, String gstNumber, String businessName, Integer loyaltyPoints) {
        this.id = id;
        this.userId = userId;
        this.defaultShippingAddressId = defaultShippingAddressId;
        this.gstNumber = gstNumber;
        this.businessName = businessName;
        this.loyaltyPoints = loyaltyPoints != null ? loyaltyPoints : 0;
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

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getDefaultShippingAddressId() { return defaultShippingAddressId; }
    public void setDefaultShippingAddressId(Long defaultShippingAddressId) { this.defaultShippingAddressId = defaultShippingAddressId; }

    public String getGstNumber() { return gstNumber; }
    public void setGstNumber(String gstNumber) { this.gstNumber = gstNumber; }

    public String getBusinessName() { return businessName; }
    public void setBusinessName(String businessName) { this.businessName = businessName; }

    public Integer getLoyaltyPoints() { return loyaltyPoints; }
    public void setLoyaltyPoints(Integer loyaltyPoints) { this.loyaltyPoints = loyaltyPoints; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
