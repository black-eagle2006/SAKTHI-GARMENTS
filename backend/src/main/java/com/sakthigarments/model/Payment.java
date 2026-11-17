package com.sakthigarments.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @Column(name = "payment_gateway", nullable = false, length = 50)
    private String paymentGateway = "RAZORPAY";

    @Column(name = "gateway_order_id", length = 120)
    private String gatewayOrderId;

    @Column(name = "gateway_payment_id", length = 120)
    private String gatewayPaymentId;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(length = 10)
    private String currency = "INR";

    @Column(nullable = false, length = 40)
    private String status = "COMPLETED"; // PENDING, COMPLETED, FAILED, REFUNDED

    @Column(name = "signature_verified")
    private Boolean signatureVerified = true;

    @Column(name = "error_code", length = 100)
    private String errorCode;

    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Payment() {}

    public Payment(Long id, Long orderId, String paymentGateway, String gatewayOrderId, String gatewayPaymentId, BigDecimal amount, String currency, String status, Boolean signatureVerified) {
        this.id = id;
        this.orderId = orderId;
        this.paymentGateway = paymentGateway != null ? paymentGateway : "RAZORPAY";
        this.gatewayOrderId = gatewayOrderId;
        this.gatewayPaymentId = gatewayPaymentId;
        this.amount = amount;
        this.currency = currency != null ? currency : "INR";
        this.status = status != null ? status : "COMPLETED";
        this.signatureVerified = signatureVerified != null ? signatureVerified : true;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public String getPaymentGateway() { return paymentGateway; }
    public void setPaymentGateway(String paymentGateway) { this.paymentGateway = paymentGateway; }

    public String getGatewayOrderId() { return gatewayOrderId; }
    public void setGatewayOrderId(String gatewayOrderId) { this.gatewayOrderId = gatewayOrderId; }

    public String getGatewayPaymentId() { return gatewayPaymentId; }
    public void setGatewayPaymentId(String gatewayPaymentId) { this.gatewayPaymentId = gatewayPaymentId; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Boolean getSignatureVerified() { return signatureVerified; }
    public void setSignatureVerified(Boolean signatureVerified) { this.signatureVerified = signatureVerified; }

    public String getErrorCode() { return errorCode; }
    public void setErrorCode(String errorCode) { this.errorCode = errorCode; }

    public String getErrorMessage() { return errorMessage; }
    public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
