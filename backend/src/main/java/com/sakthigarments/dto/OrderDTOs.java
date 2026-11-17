package com.sakthigarments.dto;

import java.math.BigDecimal;
import java.util.List;

public class OrderDTOs {

    public static class OrderItemInput {
        private Long productId;
        private String productName;
        private Long companyId;
        private String size;
        private String color;
        private Integer quantity;
        private BigDecimal unitPrice;
        private BigDecimal totalPrice;
        private String itemType;

        public OrderItemInput() {}

        public OrderItemInput(Long productId, String productName, Long companyId, String size, String color, Integer quantity, BigDecimal unitPrice, BigDecimal totalPrice, String itemType) {
            this.productId = productId;
            this.productName = productName;
            this.companyId = companyId;
            this.size = size;
            this.color = color;
            this.quantity = quantity;
            this.unitPrice = unitPrice;
            this.totalPrice = totalPrice;
            this.itemType = itemType;
        }

        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }

        public String getProductName() { return productName; }
        public void setProductName(String productName) { this.productName = productName; }

        public Long getCompanyId() { return companyId; }
        public void setCompanyId(Long companyId) { this.companyId = companyId; }

        public String getSize() { return size; }
        public void setSize(String size) { this.size = size; }

        public String getColor() { return color; }
        public void setColor(String color) { this.color = color; }

        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }

        public BigDecimal getUnitPrice() { return unitPrice; }
        public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }

        public BigDecimal getTotalPrice() { return totalPrice; }
        public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }

        public String getItemType() { return itemType; }
        public void setItemType(String itemType) { this.itemType = itemType; }

        public static OrderItemInputBuilder builder() { return new OrderItemInputBuilder(); }

        public static class OrderItemInputBuilder {
            private Long productId;
            private String productName;
            private Long companyId;
            private String size;
            private String color;
            private Integer quantity;
            private BigDecimal unitPrice;
            private BigDecimal totalPrice;
            private String itemType;

            public OrderItemInputBuilder productId(Long productId) { this.productId = productId; return this; }
            public OrderItemInputBuilder productName(String productName) { this.productName = productName; return this; }
            public OrderItemInputBuilder companyId(Long companyId) { this.companyId = companyId; return this; }
            public OrderItemInputBuilder size(String size) { this.size = size; return this; }
            public OrderItemInputBuilder color(String color) { this.color = color; return this; }
            public OrderItemInputBuilder quantity(Integer quantity) { this.quantity = quantity; return this; }
            public OrderItemInputBuilder unitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; return this; }
            public OrderItemInputBuilder totalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; return this; }
            public OrderItemInputBuilder itemType(String itemType) { this.itemType = itemType; return this; }
            public OrderItemInput build() {
                return new OrderItemInput(productId, productName, companyId, size, color, quantity, unitPrice, totalPrice, itemType);
            }
        }
    }

    public static class OrderAddressInput {
        private String fullName;
        private String phoneNumber;
        private String email;
        private String addressLine1;
        private String addressLine2;
        private String city;
        private String state;
        private String pincode;
        private String deliveryInstructions;

        public OrderAddressInput() {}

        public OrderAddressInput(String fullName, String phoneNumber, String email, String addressLine1, String addressLine2, String city, String state, String pincode, String deliveryInstructions) {
            this.fullName = fullName;
            this.phoneNumber = phoneNumber;
            this.email = email;
            this.addressLine1 = addressLine1;
            this.addressLine2 = addressLine2;
            this.city = city;
            this.state = state;
            this.pincode = pincode;
            this.deliveryInstructions = deliveryInstructions;
        }

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }

        public String getPhoneNumber() { return phoneNumber; }
        public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getAddressLine1() { return addressLine1; }
        public void setAddressLine1(String addressLine1) { this.addressLine1 = addressLine1; }

        public String getAddressLine2() { return addressLine2; }
        public void setAddressLine2(String addressLine2) { this.addressLine2 = addressLine2; }

        public String getCity() { return city; }
        public void setCity(String city) { this.city = city; }

        public String getState() { return state; }
        public void setState(String state) { this.state = state; }

        public String getPincode() { return pincode; }
        public void setPincode(String pincode) { this.pincode = pincode; }

        public String getDeliveryInstructions() { return deliveryInstructions; }
        public void setDeliveryInstructions(String deliveryInstructions) { this.deliveryInstructions = deliveryInstructions; }

        public static OrderAddressInputBuilder builder() { return new OrderAddressInputBuilder(); }

        public static class OrderAddressInputBuilder {
            private String fullName;
            private String phoneNumber;
            private String email;
            private String addressLine1;
            private String addressLine2;
            private String city;
            private String state;
            private String pincode;
            private String deliveryInstructions;

            public OrderAddressInputBuilder fullName(String fullName) { this.fullName = fullName; return this; }
            public OrderAddressInputBuilder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
            public OrderAddressInputBuilder email(String email) { this.email = email; return this; }
            public OrderAddressInputBuilder addressLine1(String addressLine1) { this.addressLine1 = addressLine1; return this; }
            public OrderAddressInputBuilder addressLine2(String addressLine2) { this.addressLine2 = addressLine2; return this; }
            public OrderAddressInputBuilder city(String city) { this.city = city; return this; }
            public OrderAddressInputBuilder state(String state) { this.state = state; return this; }
            public OrderAddressInputBuilder pincode(String pincode) { this.pincode = pincode; return this; }
            public OrderAddressInputBuilder deliveryInstructions(String deliveryInstructions) { this.deliveryInstructions = deliveryInstructions; return this; }
            public OrderAddressInput build() {
                return new OrderAddressInput(fullName, phoneNumber, email, addressLine1, addressLine2, city, state, pincode, deliveryInstructions);
            }
        }
    }

    public static class CreateOrderRequest {
        private OrderAddressInput shippingAddress;
        private List<OrderItemInput> items;
        private BigDecimal subtotal;
        private BigDecimal shippingFee;
        private BigDecimal taxAmount;
        private BigDecimal totalAmount;
        private String paymentMethod;

        public CreateOrderRequest() {}

        public CreateOrderRequest(OrderAddressInput shippingAddress, List<OrderItemInput> items, BigDecimal subtotal, BigDecimal shippingFee, BigDecimal taxAmount, BigDecimal totalAmount, String paymentMethod) {
            this.shippingAddress = shippingAddress;
            this.items = items;
            this.subtotal = subtotal;
            this.shippingFee = shippingFee;
            this.taxAmount = taxAmount;
            this.totalAmount = totalAmount;
            this.paymentMethod = paymentMethod;
        }

        public OrderAddressInput getShippingAddress() { return shippingAddress; }
        public void setShippingAddress(OrderAddressInput shippingAddress) { this.shippingAddress = shippingAddress; }

        public List<OrderItemInput> getItems() { return items; }
        public void setItems(List<OrderItemInput> items) { this.items = items; }

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

        public static CreateOrderRequestBuilder builder() { return new CreateOrderRequestBuilder(); }

        public static class CreateOrderRequestBuilder {
            private OrderAddressInput shippingAddress;
            private List<OrderItemInput> items;
            private BigDecimal subtotal;
            private BigDecimal shippingFee;
            private BigDecimal taxAmount;
            private BigDecimal totalAmount;
            private String paymentMethod;

            public CreateOrderRequestBuilder shippingAddress(OrderAddressInput shippingAddress) { this.shippingAddress = shippingAddress; return this; }
            public CreateOrderRequestBuilder items(List<OrderItemInput> items) { this.items = items; return this; }
            public CreateOrderRequestBuilder subtotal(BigDecimal subtotal) { this.subtotal = subtotal; return this; }
            public CreateOrderRequestBuilder shippingFee(BigDecimal shippingFee) { this.shippingFee = shippingFee; return this; }
            public CreateOrderRequestBuilder taxAmount(BigDecimal taxAmount) { this.taxAmount = taxAmount; return this; }
            public CreateOrderRequestBuilder totalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; return this; }
            public CreateOrderRequestBuilder paymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; return this; }
            public CreateOrderRequest build() {
                return new CreateOrderRequest(shippingAddress, items, subtotal, shippingFee, taxAmount, totalAmount, paymentMethod);
            }
        }
    }

    public static class OrderStatusUpdateRequest {
        private String status;
        private String courierName;
        private String trackingNumber;
        private String notes;

        public OrderStatusUpdateRequest() {}

        public OrderStatusUpdateRequest(String status, String courierName, String trackingNumber, String notes) {
            this.status = status;
            this.courierName = courierName;
            this.trackingNumber = trackingNumber;
            this.notes = notes;
        }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public String getCourierName() { return courierName; }
        public void setCourierName(String courierName) { this.courierName = courierName; }

        public String getTrackingNumber() { return trackingNumber; }
        public void setTrackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; }

        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }

        public static OrderStatusUpdateRequestBuilder builder() { return new OrderStatusUpdateRequestBuilder(); }

        public static class OrderStatusUpdateRequestBuilder {
            private String status;
            private String courierName;
            private String trackingNumber;
            private String notes;

            public OrderStatusUpdateRequestBuilder status(String status) { this.status = status; return this; }
            public OrderStatusUpdateRequestBuilder courierName(String courierName) { this.courierName = courierName; return this; }
            public OrderStatusUpdateRequestBuilder trackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; return this; }
            public OrderStatusUpdateRequestBuilder notes(String notes) { this.notes = notes; return this; }
            public OrderStatusUpdateRequest build() {
                return new OrderStatusUpdateRequest(status, courierName, trackingNumber, notes);
            }
        }
    }
}
