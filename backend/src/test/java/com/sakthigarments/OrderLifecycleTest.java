package com.sakthigarments;

import com.sakthigarments.dto.OrderDTOs.*;
import com.sakthigarments.model.Order;
import com.sakthigarments.repository.OrderRepository;
import com.sakthigarments.service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class OrderLifecycleTest {

    private OrderRepository orderRepository;
    private OrderService orderService;

    @BeforeEach
    public void setup() {
        orderRepository = Mockito.mock(OrderRepository.class);
        orderService = new OrderService(orderRepository);
    }

    @Test
    public void testCreateOrderSavesWithOrderNumber() {
        OrderItemInput item = OrderItemInput.builder()
                .productId(1L)
                .productName("Sakthi Bio-Wash Custom T-Shirt")
                .companyId(1L)
                .size("L")
                .color("#FFFFFF")
                .quantity(1)
                .unitPrice(BigDecimal.valueOf(299))
                .totalPrice(BigDecimal.valueOf(299))
                .itemType("CUSTOM")
                .build();

        OrderAddressInput address = OrderAddressInput.builder()
                .fullName("Anandha Kumar")
                .phoneNumber("+91 98765 43210")
                .addressLine1("Town Hall Road")
                .city("Tiruppur")
                .state("Tamil Nadu")
                .pincode("641601")
                .build();

        CreateOrderRequest request = CreateOrderRequest.builder()
                .items(Collections.singletonList(item))
                .shippingAddress(address)
                .subtotal(BigDecimal.valueOf(299))
                .shippingFee(BigDecimal.valueOf(50))
                .taxAmount(BigDecimal.valueOf(15))
                .totalAmount(BigDecimal.valueOf(364))
                .paymentMethod("RAZORPAY")
                .build();

        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> {
            Order o = invocation.getArgument(0);
            o.setId(101L);
            return o;
        });

        Order created = orderService.createOrder(request, 1L);

        assertNotNull(created);
        assertNotNull(created.getOrderNumber());
        assertTrue(created.getOrderNumber().startsWith("SG-"));
        assertEquals("ORDER_CONFIRMED", created.getStatus());
        assertEquals(BigDecimal.valueOf(364), created.getTotalAmount());
    }

    @Test
    public void testStatusTransitionToShippedWithAWB() {
        Order mockOrder = Order.builder()
                .id(101L)
                .orderNumber("SG-842109")
                .status("READY_TO_SHIP")
                .build();

        when(orderRepository.findById(101L)).thenReturn(Optional.of(mockOrder));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        OrderStatusUpdateRequest req = OrderStatusUpdateRequest.builder()
                .status("SHIPPED")
                .courierName("Tiruppur FastTrack Express")
                .trackingNumber("TFT-8819203")
                .build();

        Order updated = orderService.updateOrderStatus(101L, req);

        assertEquals("SHIPPED", updated.getStatus());
        assertEquals("Tiruppur FastTrack Express", updated.getCourierName());
        assertEquals("TFT-8819203", updated.getTrackingNumber());
    }
}
