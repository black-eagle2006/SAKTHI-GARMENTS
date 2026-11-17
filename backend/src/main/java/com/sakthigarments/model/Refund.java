package com.sakthigarments.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "refunds")
public class Refund {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "payment_id", nullable = false)
    private Long paymentId;

    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @Column(name = "refund_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal refundAmount;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String reason;

    @Column(name = "gateway_refund_id", length = 120)
    private String gatewayRefundId;

    @Column(length = 40)
    private String status = "PROCESSED";

    @Column(name = "initiated_by_user_id")
    private Long initiatedByUserId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Refund() {}

    public Refund(Long id, Long paymentId, Long orderId, BigDecimal refundAmount, String reason, String gatewayRefundId, String status, Long initiatedByUserId) {
        this.id = id;
        this.paymentId = paymentId;
        this.orderId = orderId;
        this.refundAmount = refundAmount;
        this.reason = reason;
        this.gatewayRefundId = gatewayRefundId;
        this.status = status != null ? status : "PROCESSED";
        this.initiatedByUserId = initiatedByUserId;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getPaymentId() { return paymentId; }
    public void setPaymentId(Long paymentId) { this.paymentId = paymentId; }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public BigDecimal getRefundAmount() { return refundAmount; }
    public void setRefundAmount(BigDecimal refundAmount) { this.refundAmount = refundAmount; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getGatewayRefundId() { return gatewayRefundId; }
    public void setGatewayRefundId(String gatewayRefundId) { this.gatewayRefundId = gatewayRefundId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getInitiatedByUserId() { return initiatedByUserId; }
    public void setInitiatedByUserId(Long initiatedByUserId) { this.initiatedByUserId = initiatedByUserId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
