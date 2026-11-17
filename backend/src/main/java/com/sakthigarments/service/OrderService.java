package com.sakthigarments.service;

import com.sakthigarments.dto.OrderDTOs.*;
import com.sakthigarments.exception.BadRequestException;
import com.sakthigarments.exception.ResourceNotFoundException;
import com.sakthigarments.model.Order;
import com.sakthigarments.model.OrderItem;
import com.sakthigarments.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Transactional
    public Order createOrder(CreateOrderRequest request, Long customerId) {
        if (request == null || request.getItems() == null || request.getItems().isEmpty()) {
            throw new BadRequestException("Order must contain at least one item.");
        }

        // Generate human-friendly order reference (e.g. SG-842109)
        String orderNumber = "SG-" + (Math.abs(UUID.randomUUID().getLeastSignificantBits()) % 900000 + 100000);

        Long companyId = 1L; // SAKTHI GARMENTS default flagship
        if (request.getItems().get(0) != null && request.getItems().get(0).getCompanyId() != null) {
            companyId = request.getItems().get(0).getCompanyId();
        }

        OrderAddressInput shipping = request.getShippingAddress();

        Order order = Order.builder()
                .orderNumber(orderNumber)
                .customerId(customerId)
                .companyId(companyId)
                .status("ORDER_CONFIRMED")
                .subtotal(request.getSubtotal() != null ? request.getSubtotal() : BigDecimal.ZERO)
                .shippingFee(request.getShippingFee() != null ? request.getShippingFee() : BigDecimal.ZERO)
                .taxAmount(request.getTaxAmount() != null ? request.getTaxAmount() : BigDecimal.ZERO)
                .totalAmount(request.getTotalAmount() != null ? request.getTotalAmount() : BigDecimal.ZERO)
                .paymentMethod(request.getPaymentMethod() != null ? request.getPaymentMethod() : "RAZORPAY")
                .paymentStatus("COMPLETED")
                .shippingFullName(shipping != null ? shipping.getFullName() : null)
                .shippingPhone(shipping != null ? shipping.getPhoneNumber() : null)
                .shippingEmail(shipping != null ? shipping.getEmail() : null)
                .shippingAddressLine(shipping != null ? shipping.getAddressLine1() : null)
                .shippingCity(shipping != null && shipping.getCity() != null ? shipping.getCity() : "Tiruppur")
                .shippingState(shipping != null && shipping.getState() != null ? shipping.getState() : "Tamil Nadu")
                .shippingPincode(shipping != null && shipping.getPincode() != null ? shipping.getPincode() : "641601")
                .items(new ArrayList<>())
                .build();

        for (OrderItemInput itemInput : request.getItems()) {
            if (itemInput == null) {
                continue;
            }
            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .productId(itemInput.getProductId())
                    .productName(itemInput.getProductName() != null ? itemInput.getProductName() : "Custom T-Shirt")
                    .size(itemInput.getSize() != null ? itemInput.getSize() : "L")
                    .color(itemInput.getColor() != null ? itemInput.getColor() : "#FFFFFF")
                    .quantity(itemInput.getQuantity() != null ? itemInput.getQuantity() : 1)
                    .unitPrice(itemInput.getUnitPrice() != null ? itemInput.getUnitPrice() : BigDecimal.valueOf(299))
                    .totalPrice(itemInput.getTotalPrice() != null ? itemInput.getTotalPrice() : BigDecimal.valueOf(299))
                    .itemType(itemInput.getItemType() != null ? itemInput.getItemType() : "CUSTOM")
                    .build();
            order.getItems().add(orderItem);
        }

        return orderRepository.save(order);
    }

    public Order getOrderByNumber(String identifier) {
        if (identifier == null || identifier.trim().isEmpty()) {
            throw new BadRequestException("Order reference or tracking code cannot be empty.");
        }
        return orderRepository.findByOrderNumber(identifier.trim())
                .or(() -> orderRepository.findByTrackingNumber(identifier.trim()))
                .orElseThrow(() -> new ResourceNotFoundException("Order reference or tracking code not found: " + identifier));
    }

    public List<Order> getOrdersByCustomer(Long customerId) {
        if (customerId == null) {
            return List.of();
        }
        return orderRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);
    }

    public List<Order> getOrdersByCompany(Long companyId) {
        if (companyId == null) {
            return List.of();
        }
        return orderRepository.findByCompanyIdOrderByCreatedAtDesc(companyId);
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, OrderStatusUpdateRequest request) {
        if (orderId == null) {
            throw new BadRequestException("Order ID cannot be null.");
        }
        if (request == null) {
            throw new BadRequestException("Status update request cannot be null.");
        }
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        if (request.getStatus() != null && !request.getStatus().trim().isEmpty()) {
            order.setStatus(request.getStatus().trim().toUpperCase());
        }
        if (request.getCourierName() != null) {
            order.setCourierName(request.getCourierName());
        }
        if (request.getTrackingNumber() != null) {
            order.setTrackingNumber(request.getTrackingNumber());
        }

        return orderRepository.save(order);
    }
}
