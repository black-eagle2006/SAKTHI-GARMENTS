package com.sakthigarments.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "company_profiles")
public class CompanyProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "company_name", nullable = false, length = 180)
    private String companyName;

    @Column(name = "contact_person", nullable = false, length = 120)
    private String contactPerson;

    @Column(nullable = false, length = 180)
    private String email;

    @Column(name = "phone_number", nullable = false, length = 30)
    private String phoneNumber;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String address;

    @Column(nullable = false, length = 80)
    private String city = "Tiruppur";

    @Column(nullable = false, length = 80)
    private String state = "Tamil Nadu";

    @Column(nullable = false, length = 20)
    private String pincode = "641601";

    private Double latitude;
    private Double longitude;

    @Column(name = "business_registration_no", length = 100)
    private String businessRegistrationNo;

    @Column(name = "approval_status", nullable = false, length = 30)
    private String approvalStatus = "PENDING"; // PENDING, APPROVED, REJECTED, SUSPENDED

    @Column(name = "min_order_quantity", nullable = false)
    private Integer minOrderQuantity = 1;

    @Column(name = "customization_available", nullable = false)
    private Boolean customizationAvailable = true;

    @Column(name = "bulk_order_support", nullable = false)
    private Boolean bulkOrderSupport = true;

    @Column(name = "sample_available", nullable = false)
    private Boolean sampleAvailable = true;

    @Column(name = "sample_price", nullable = false)
    private BigDecimal samplePrice = new BigDecimal("69.00");

    @Column(name = "estimated_production_days", nullable = false)
    private Integer estimatedProductionDays = 3;

    @Column(name = "published_price_range", length = 50)
    private String publishedPriceRange = "₹249 - ₹499";

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public CompanyProfile() {}

    public CompanyProfile(Long id, Long userId, String companyName, String contactPerson, String email, String phoneNumber, String address, String city, String state, String pincode, Double latitude, Double longitude, String businessRegistrationNo, String approvalStatus, Integer minOrderQuantity, Boolean customizationAvailable, Boolean bulkOrderSupport, Boolean sampleAvailable, BigDecimal samplePrice, Integer estimatedProductionDays, String publishedPriceRange, String description, String logoUrl) {
        this.id = id;
        this.userId = userId;
        this.companyName = companyName;
        this.contactPerson = contactPerson;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.city = city != null ? city : "Tiruppur";
        this.state = state != null ? state : "Tamil Nadu";
        this.pincode = pincode != null ? pincode : "641601";
        this.latitude = latitude;
        this.longitude = longitude;
        this.businessRegistrationNo = businessRegistrationNo;
        this.approvalStatus = approvalStatus != null ? approvalStatus : "PENDING";
        this.minOrderQuantity = minOrderQuantity != null ? minOrderQuantity : 1;
        this.customizationAvailable = customizationAvailable != null ? customizationAvailable : true;
        this.bulkOrderSupport = bulkOrderSupport != null ? bulkOrderSupport : true;
        this.sampleAvailable = sampleAvailable != null ? sampleAvailable : true;
        this.samplePrice = samplePrice != null ? samplePrice : new BigDecimal("69.00");
        this.estimatedProductionDays = estimatedProductionDays != null ? estimatedProductionDays : 3;
        this.publishedPriceRange = publishedPriceRange != null ? publishedPriceRange : "₹249 - ₹499";
        this.description = description;
        this.logoUrl = logoUrl;
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

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public String getBusinessRegistrationNo() { return businessRegistrationNo; }
    public void setBusinessRegistrationNo(String businessRegistrationNo) { this.businessRegistrationNo = businessRegistrationNo; }

    public String getApprovalStatus() { return approvalStatus; }
    public void setApprovalStatus(String approvalStatus) { this.approvalStatus = approvalStatus; }

    public Integer getMinOrderQuantity() { return minOrderQuantity; }
    public void setMinOrderQuantity(Integer minOrderQuantity) { this.minOrderQuantity = minOrderQuantity; }

    public Boolean getCustomizationAvailable() { return customizationAvailable; }
    public void setCustomizationAvailable(Boolean customizationAvailable) { this.customizationAvailable = customizationAvailable; }

    public Boolean getBulkOrderSupport() { return bulkOrderSupport; }
    public void setBulkOrderSupport(Boolean bulkOrderSupport) { this.bulkOrderSupport = bulkOrderSupport; }

    public Boolean getSampleAvailable() { return sampleAvailable; }
    public void setSampleAvailable(Boolean sampleAvailable) { this.sampleAvailable = sampleAvailable; }

    public BigDecimal getSamplePrice() { return samplePrice; }
    public void setSamplePrice(BigDecimal samplePrice) { this.samplePrice = samplePrice; }

    public Integer getEstimatedProductionDays() { return estimatedProductionDays; }
    public void setEstimatedProductionDays(Integer estimatedProductionDays) { this.estimatedProductionDays = estimatedProductionDays; }

    public String getPublishedPriceRange() { return publishedPriceRange; }
    public void setPublishedPriceRange(String publishedPriceRange) { this.publishedPriceRange = publishedPriceRange; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static CompanyProfileBuilder builder() { return new CompanyProfileBuilder(); }

    public static class CompanyProfileBuilder {
        private Long id;
        private Long userId;
        private String companyName;
        private String contactPerson;
        private String email;
        private String phoneNumber;
        private String address;
        private String city = "Tiruppur";
        private String state = "Tamil Nadu";
        private String pincode = "641601";
        private Double latitude;
        private Double longitude;
        private String businessRegistrationNo;
        private String approvalStatus = "PENDING";
        private Integer minOrderQuantity = 1;
        private Boolean customizationAvailable = true;
        private Boolean bulkOrderSupport = true;
        private Boolean sampleAvailable = true;
        private BigDecimal samplePrice = new BigDecimal("69.00");
        private Integer estimatedProductionDays = 3;
        private String publishedPriceRange = "₹249 - ₹499";
        private String description;
        private String logoUrl;

        public CompanyProfileBuilder id(Long id) { this.id = id; return this; }
        public CompanyProfileBuilder userId(Long userId) { this.userId = userId; return this; }
        public CompanyProfileBuilder companyName(String companyName) { this.companyName = companyName; return this; }
        public CompanyProfileBuilder contactPerson(String contactPerson) { this.contactPerson = contactPerson; return this; }
        public CompanyProfileBuilder email(String email) { this.email = email; return this; }
        public CompanyProfileBuilder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
        public CompanyProfileBuilder address(String address) { this.address = address; return this; }
        public CompanyProfileBuilder city(String city) { this.city = city; return this; }
        public CompanyProfileBuilder state(String state) { this.state = state; return this; }
        public CompanyProfileBuilder pincode(String pincode) { this.pincode = pincode; return this; }
        public CompanyProfileBuilder latitude(Double latitude) { this.latitude = latitude; return this; }
        public CompanyProfileBuilder longitude(Double longitude) { this.longitude = longitude; return this; }
        public CompanyProfileBuilder businessRegistrationNo(String businessRegistrationNo) { this.businessRegistrationNo = businessRegistrationNo; return this; }
        public CompanyProfileBuilder approvalStatus(String approvalStatus) { this.approvalStatus = approvalStatus; return this; }
        public CompanyProfileBuilder minOrderQuantity(Integer minOrderQuantity) { this.minOrderQuantity = minOrderQuantity; return this; }
        public CompanyProfileBuilder customizationAvailable(Boolean customizationAvailable) { this.customizationAvailable = customizationAvailable; return this; }
        public CompanyProfileBuilder bulkOrderSupport(Boolean bulkOrderSupport) { this.bulkOrderSupport = bulkOrderSupport; return this; }
        public CompanyProfileBuilder sampleAvailable(Boolean sampleAvailable) { this.sampleAvailable = sampleAvailable; return this; }
        public CompanyProfileBuilder samplePrice(BigDecimal samplePrice) { this.samplePrice = samplePrice; return this; }
        public CompanyProfileBuilder estimatedProductionDays(Integer estimatedProductionDays) { this.estimatedProductionDays = estimatedProductionDays; return this; }
        public CompanyProfileBuilder publishedPriceRange(String publishedPriceRange) { this.publishedPriceRange = publishedPriceRange; return this; }
        public CompanyProfileBuilder description(String description) { this.description = description; return this; }
        public CompanyProfileBuilder logoUrl(String logoUrl) { this.logoUrl = logoUrl; return this; }

        public CompanyProfile build() {
            return new CompanyProfile(id, userId, companyName, contactPerson, email, phoneNumber, address, city, state, pincode, latitude, longitude, businessRegistrationNo, approvalStatus, minOrderQuantity, customizationAvailable, bulkOrderSupport, sampleAvailable, samplePrice, estimatedProductionDays, publishedPriceRange, description, logoUrl);
        }
    }
}
