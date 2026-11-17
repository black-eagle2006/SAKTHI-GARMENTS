package com.sakthigarments.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "pricing_rules")
public class PricingRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rule_name", nullable = false, length = 120)
    private String ruleName;

    @Column(name = "rule_type", nullable = false, length = 50)
    private String ruleType; // VOLUME_DISCOUNT, FABRIC_SURCHARGE, PRINT_SURCHARGE

    @Column(name = "min_quantity", nullable = false)
    private Integer minQuantity = 1;

    @Column(name = "max_quantity")
    private Integer maxQuantity;

    @Column(name = "discount_percentage", precision = 5, scale = 2)
    private BigDecimal discountPercentage = BigDecimal.ZERO;

    @Column(name = "fixed_surcharge", precision = 10, scale = 2)
    private BigDecimal fixedSurcharge = BigDecimal.ZERO;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public PricingRule() {}

    public PricingRule(Long id, String ruleName, String ruleType, Integer minQuantity, Integer maxQuantity, BigDecimal discountPercentage, BigDecimal fixedSurcharge, Boolean isActive) {
        this.id = id;
        this.ruleName = ruleName;
        this.ruleType = ruleType;
        this.minQuantity = minQuantity != null ? minQuantity : 1;
        this.maxQuantity = maxQuantity;
        this.discountPercentage = discountPercentage != null ? discountPercentage : BigDecimal.ZERO;
        this.fixedSurcharge = fixedSurcharge != null ? fixedSurcharge : BigDecimal.ZERO;
        this.isActive = isActive != null ? isActive : true;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRuleName() { return ruleName; }
    public void setRuleName(String ruleName) { this.ruleName = ruleName; }

    public String getRuleType() { return ruleType; }
    public void setRuleType(String ruleType) { this.ruleType = ruleType; }

    public Integer getMinQuantity() { return minQuantity; }
    public void setMinQuantity(Integer minQuantity) { this.minQuantity = minQuantity; }

    public Integer getMaxQuantity() { return maxQuantity; }
    public void setMaxQuantity(Integer maxQuantity) { this.maxQuantity = maxQuantity; }

    public BigDecimal getDiscountPercentage() { return discountPercentage; }
    public void setDiscountPercentage(BigDecimal discountPercentage) { this.discountPercentage = discountPercentage; }

    public BigDecimal getFixedSurcharge() { return fixedSurcharge; }
    public void setFixedSurcharge(BigDecimal fixedSurcharge) { this.fixedSurcharge = fixedSurcharge; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
