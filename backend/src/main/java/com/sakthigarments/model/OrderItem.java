package com.sakthigarments.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private Order order;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_name", nullable = false, length = 200)
    private String productName;

    @Column(nullable = false, length = 20)
    private String size;

    @Column(nullable = false, length = 40)
    private String color;

    @Column(nullable = false)
    private Integer quantity = 1;

    @Column(name = "unit_price", nullable = false)
    private BigDecimal unitPrice;

    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice;

    @Column(name = "item_type", nullable = false, length = 30)
    private String itemType = "CUSTOM";

    public OrderItem() {}

    public OrderItem(Long id, Order order, Long productId, String productName, String size, String color, Integer quantity, BigDecimal unitPrice, BigDecimal totalPrice, String itemType) {
        this.id = id;
        this.order = order;
        this.productId = productId;
        this.productName = productName;
        this.size = size;
        this.color = color;
        this.quantity = quantity != null ? quantity : 1;
        this.unitPrice = unitPrice;
        this.totalPrice = totalPrice;
        this.itemType = itemType != null ? itemType : "CUSTOM";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

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

    public static OrderItemBuilder builder() { return new OrderItemBuilder(); }

    public static class OrderItemBuilder {
        private Long id;
        private Order order;
        private Long productId;
        private String productName;
        private String size;
        private String color;
        private Integer quantity = 1;
        private BigDecimal unitPrice;
        private BigDecimal totalPrice;
        private String itemType = "CUSTOM";

        public OrderItemBuilder id(Long id) { this.id = id; return this; }
        public OrderItemBuilder order(Order order) { this.order = order; return this; }
        public OrderItemBuilder productId(Long productId) { this.productId = productId; return this; }
        public OrderItemBuilder productName(String productName) { this.productName = productName; return this; }
        public OrderItemBuilder size(String size) { this.size = size; return this; }
        public OrderItemBuilder color(String color) { this.color = color; return this; }
        public OrderItemBuilder quantity(Integer quantity) { this.quantity = quantity; return this; }
        public OrderItemBuilder unitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; return this; }
        public OrderItemBuilder totalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; return this; }
        public OrderItemBuilder itemType(String itemType) { this.itemType = itemType; return this; }

        public OrderItem build() {
            return new OrderItem(id, order, productId, productName, size, color, quantity, unitPrice, totalPrice, itemType);
        }
    }
}
