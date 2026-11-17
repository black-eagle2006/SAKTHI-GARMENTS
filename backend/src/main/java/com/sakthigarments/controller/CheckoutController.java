package com.sakthigarments.controller;

import com.sakthigarments.dto.OrderDTOs.*;
import com.sakthigarments.model.Order;
import com.sakthigarments.service.OrderService;
import com.sakthigarments.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/checkout")
@Tag(name = "Checkout & Orders", description = "Placing custom garment orders and initializing payment gateway orders")
public class CheckoutController {

    private final OrderService orderService;
    private final PaymentService paymentService;

    public CheckoutController(OrderService orderService, PaymentService paymentService) {
        this.orderService = orderService;
        this.paymentService = paymentService;
    }

    @PostMapping("/orders")
    @Operation(summary = "Submit shipping details and finalize customer order")
    public ResponseEntity<Order> createOrder(
            @RequestBody CreateOrderRequest request,
            Authentication authentication) {
        // Customer ID can be resolved from session if authenticated, or guest (null)
        Long customerId = null;
        Order order = orderService.createOrder(request, customerId);
        return ResponseEntity.ok(order);
    }

    @PostMapping("/init-payment")
    @Operation(summary = "Create Razorpay gateway payment order")
    public ResponseEntity<Map<String, Object>> initPayment(
            @RequestBody Map<String, Object> paymentPayload) {
        java.math.BigDecimal amount = new java.math.BigDecimal(paymentPayload.getOrDefault("amount", 299).toString());
        String receipt = (String) paymentPayload.getOrDefault("receipt", "SG-" + System.currentTimeMillis());
        return ResponseEntity.ok(paymentService.createGatewayOrder(amount, receipt));
    }
}
