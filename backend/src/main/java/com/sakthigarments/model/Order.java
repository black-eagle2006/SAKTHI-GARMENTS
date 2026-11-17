package com.sakthigarments.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_number", nullable = false, unique = true, length = 60)
    private String orderNumber;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "company_id", nullable = false)
    private Long companyId;

    @Column(nullable = false, length = 40)
    private String status = "ORDER_CONFIRMED";

    @Column(nullable = false)
    private BigDecimal subtotal;

    @Column(name = "shipping_fee", nullable = false)
    private BigDecimal shippingFee = BigDecimal.ZERO;

    @Column(name = "tax_amount", nullable = false)
    private BigDecimal taxAmount = BigDecimal.ZERO;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    @Column(name = "payment_method", nullable = false, length = 40)
    private String paymentMethod = "RAZORPAY";

    @Column(name = "payment_status", nullable = false, length = 30)
    private String paymentStatus = "COMPLETED";

    @Column(name = "razorpay_order_id", length = 100)
    private String razorpayOrderId;

    @Column(name = "razorpay_payment_id", length = 100)
    private String razorpayPaymentId;

    @Column(name = "tracking_number", length = 100)
    private String trackingNumber;

    @Column(name = "courier_name", length = 100)
    private String courierName;

    @Column(name = "shipping_full_name", length = 120)
    private String shippingFullName;

    @Column(name = "shipping_phone", length = 30)
    private String shippingPhone;

    @Column(name = "shipping_email", length = 150)
    private String shippingEmail;

    @Column(name = "shipping_address_line", columnDefinition = "TEXT")
    private String shippingAddressLine;

    @Column(name = "shipping_city", length = 80)
    private String shippingCity;

    @Column(name = "shipping_state", length = 80)
    private String shippingState;

    @Column(name = "shipping_pincode", length = 20)
    private String shippingPincode;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Order() {}

    public Order(Long id, String orderNumber, Long customerId, Long companyId, String status, BigDecimal subtotal, BigDecimal shippingFee, BigDecimal taxAmount, BigDecimal totalAmount, String paymentMethod, String paymentStatus, String razorpayOrderId, String razorpayPaymentId, String trackingNumber, String courierName, String shippingFullName, String shippingPhone, String shippingEmail, String shippingAddressLine, String shippingCity, String shippingState, String shippingPincode, List<OrderItem> items) {
        this.id = id;
        this.orderNumber = orderNumber;
        this.customerId = customerId;
        this.companyId = companyId;
        this.status = status != null ? status : "ORDER_CONFIRMED";
        this.subtotal = subtotal;
        this.shippingFee = shippingFee != null ? shippingFee : BigDecimal.ZERO;
        this.taxAmount = taxAmount != null ? taxAmount : BigDecimal.ZERO;
        this.totalAmount = totalAmount;
        this.paymentMethod = paymentMethod != null ? paymentMethod : "RAZORPAY";
        this.paymentStatus = paymentStatus != null ? paymentStatus : "COMPLETED";
        this.razorpayOrderId = razorpayOrderId;
        this.razorpayPaymentId = razorpayPaymentId;
        this.trackingNumber = trackingNumber;
        this.courierName = courierName;
        this.shippingFullName = shippingFullName;
        this.shippingPhone = shippingPhone;
        this.shippingEmail = shippingEmail;
        this.shippingAddressLine = shippingAddressLine;
        this.shippingCity = shippingCity;
        this.shippingState = shippingState;
        this.shippingPincode = shippingPincode;
        this.items = items != null ? items : new ArrayList<>();
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

    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }

    public BigDecimal getShippingFee() { return shippingFee; }
    public void setShippingFee(BigDecimal shippingFee) { this.shippingFee = shippingFee; }

    public BigDecimal getTaxAmount() { return taxAmount; }
    public void setTaxAmount(BigDecimal taxAmount) { this.taxAmount = taxAmount; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getRazorpayOrderId() { return razorpayOrderId; }
    public void setRazorpayOrderId(String razorpayOrderId) { this.razorpayOrderId = razorpayOrderId; }

    public String getRazorpayPaymentId() { return razorpayPaymentId; }
    public void setRazorpayPaymentId(String razorpayPaymentId) { this.razorpayPaymentId = razorpayPaymentId; }

    public String getTrackingNumber() { return trackingNumber; }
    public void setTrackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; }

    public String getCourierName() { return courierName; }
    public void setCourierName(String courierName) { this.courierName = courierName; }

    public String getShippingFullName() { return shippingFullName; }
    public void setShippingFullName(String shippingFullName) { this.shippingFullName = shippingFullName; }

    public String getShippingPhone() { return shippingPhone; }
    public void setShippingPhone(String shippingPhone) { this.shippingPhone = shippingPhone; }

    public String getShippingEmail() { return shippingEmail; }
    public void setShippingEmail(String shippingEmail) { this.shippingEmail = shippingEmail; }

    public String getShippingAddressLine() { return shippingAddressLine; }
    public void setShippingAddressLine(String shippingAddressLine) { this.shippingAddressLine = shippingAddressLine; }

    public String getShippingCity() { return shippingCity; }
    public void setShippingCity(String shippingCity) { this.shippingCity = shippingCity; }

    public String getShippingState() { return shippingState; }
    public void setShippingState(String shippingState) { this.shippingState = shippingState; }

    public String getShippingPincode() { return shippingPincode; }
    public void setShippingPincode(String shippingPincode) { this.shippingPincode = shippingPincode; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static OrderBuilder builder() { return new OrderBuilder(); }

    public static class OrderBuilder {
        private Long id;
        private String orderNumber;
        private Long customerId;
        private Long companyId;
        private String status = "ORDER_CONFIRMED";
        private BigDecimal subtotal;
        private BigDecimal shippingFee = BigDecimal.ZERO;
        private BigDecimal taxAmount = BigDecimal.ZERO;
        private BigDecimal totalAmount;
        private String paymentMethod = "RAZORPAY";
        private String paymentStatus = "COMPLETED";
        private String razorpayOrderId;
        private String razorpayPaymentId;
        private String trackingNumber;
        private String courierName;
        private String shippingFullName;
        private String shippingPhone;
        private String shippingEmail;
        private String shippingAddressLine;
        private String shippingCity;
        private String shippingState;
        private String shippingPincode;
        private List<OrderItem> items = new ArrayList<>();

        public OrderBuilder id(Long id) { this.id = id; return this; }
        public OrderBuilder orderNumber(String orderNumber) { this.orderNumber = orderNumber; return this; }
        public OrderBuilder customerId(Long customerId) { this.customerId = customerId; return this; }
        public OrderBuilder companyId(Long companyId) { this.companyId = companyId; return this; }
        public OrderBuilder status(String status) { this.status = status; return this; }
        public OrderBuilder subtotal(BigDecimal subtotal) { this.subtotal = subtotal; return this; }
        public OrderBuilder shippingFee(BigDecimal shippingFee) { this.shippingFee = shippingFee; return this; }
        public OrderBuilder taxAmount(BigDecimal taxAmount) { this.taxAmount = taxAmount; return this; }
        public OrderBuilder totalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; return this; }
        public OrderBuilder paymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; return this; }
        public OrderBuilder paymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; return this; }
        public OrderBuilder razorpayOrderId(String razorpayOrderId) { this.razorpayOrderId = razorpayOrderId; return this; }
        public OrderBuilder razorpayPaymentId(String razorpayPaymentId) { this.razorpayPaymentId = razorpayPaymentId; return this; }
        public OrderBuilder trackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; return this; }
        public OrderBuilder courierName(String courierName) { this.courierName = courierName; return this; }
        public OrderBuilder shippingFullName(String shippingFullName) { this.shippingFullName = shippingFullName; return this; }
        public OrderBuilder shippingPhone(String shippingPhone) { this.shippingPhone = shippingPhone; return this; }
        public OrderBuilder shippingEmail(String shippingEmail) { this.shippingEmail = shippingEmail; return this; }
        public OrderBuilder shippingAddressLine(String shippingAddressLine) { this.shippingAddressLine = shippingAddressLine; return this; }
        public OrderBuilder shippingCity(String shippingCity) { this.shippingCity = shippingCity; return this; }
        public OrderBuilder shippingState(String shippingState) { this.shippingState = shippingState; return this; }
        public OrderBuilder shippingPincode(String shippingPincode) { this.shippingPincode = shippingPincode; return this; }
        public OrderBuilder items(List<OrderItem> items) { this.items = items; return this; }

        public Order build() {
            return new Order(id, orderNumber, customerId, companyId, status, subtotal, shippingFee, taxAmount, totalAmount, paymentMethod, paymentStatus, razorpayOrderId, razorpayPaymentId, trackingNumber, courierName, shippingFullName, shippingPhone, shippingEmail, shippingAddressLine, shippingCity, shippingState, shippingPincode, items);
        }
    }
}
