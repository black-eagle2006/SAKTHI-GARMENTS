package com.sakthigarments.controller;

import com.sakthigarments.dto.OrderDTOs.*;
import com.sakthigarments.model.Order;
import com.sakthigarments.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@Tag(name = "Order Tracking & Fulfillment", description = "Live tracking, production workflow, and status management")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/track/{orderNumber}")
    @Operation(summary = "Public tracking of order status, production stages, and courier details")
    public ResponseEntity<Order> trackOrder(@PathVariable String orderNumber) {
        return ResponseEntity.ok(orderService.getOrderByNumber(orderNumber));
    }

    @GetMapping("/company/{companyId}")
    @Operation(summary = "Get incoming orders for a specific garment manufacturer")
    public ResponseEntity<List<Order>> getOrdersByCompany(@PathVariable Long companyId) {
        return ResponseEntity.ok(orderService.getOrdersByCompany(companyId));
    }

    @GetMapping("/customer/{customerId}")
    @Operation(summary = "Get order history for a specific customer")
    public ResponseEntity<List<Order>> getOrdersByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(orderService.getOrdersByCustomer(customerId));
    }

    @PatchMapping("/{orderId}/status")
    @Operation(summary = "Update production workflow status and courier tracking AWB")
    public ResponseEntity<Order> updateStatus(
            @PathVariable Long orderId,
            @RequestBody OrderStatusUpdateRequest request) {
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, request));
    }

    @PostMapping
    @Operation(summary = "Create customer or guest order")
    public ResponseEntity<Order> createOrderDirect(@RequestBody CreateOrderRequest request) {
        return ResponseEntity.ok(orderService.createOrder(request, null));
    }
}
