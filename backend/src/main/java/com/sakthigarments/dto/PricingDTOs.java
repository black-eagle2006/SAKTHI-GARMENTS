package com.sakthigarments.dto;

import java.math.BigDecimal;
import java.util.List;

public class PricingDTOs {

    public static class CartItemPricingDTO {
        private Long productId;
        private Integer quantity;
        private String itemType; // CUSTOM, PLAIN, SAMPLE
        private Integer frontLayersCount;
        private Integer backLayersCount;

        public CartItemPricingDTO() {}

        public CartItemPricingDTO(Long productId, Integer quantity, String itemType, Integer frontLayersCount, Integer backLayersCount) {
            this.productId = productId;
            this.quantity = quantity;
            this.itemType = itemType;
            this.frontLayersCount = frontLayersCount;
            this.backLayersCount = backLayersCount;
        }

        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }

        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }

        public String getItemType() { return itemType; }
        public void setItemType(String itemType) { this.itemType = itemType; }

        public Integer getFrontLayersCount() { return frontLayersCount; }
        public void setFrontLayersCount(Integer frontLayersCount) { this.frontLayersCount = frontLayersCount; }

        public Integer getBackLayersCount() { return backLayersCount; }
        public void setBackLayersCount(Integer backLayersCount) { this.backLayersCount = backLayersCount; }

        public static CartItemPricingDTOBuilder builder() { return new CartItemPricingDTOBuilder(); }

        public static class CartItemPricingDTOBuilder {
            private Long productId;
            private Integer quantity;
            private String itemType;
            private Integer frontLayersCount;
            private Integer backLayersCount;

            public CartItemPricingDTOBuilder productId(Long productId) { this.productId = productId; return this; }
            public CartItemPricingDTOBuilder quantity(Integer quantity) { this.quantity = quantity; return this; }
            public CartItemPricingDTOBuilder itemType(String itemType) { this.itemType = itemType; return this; }
            public CartItemPricingDTOBuilder frontLayersCount(Integer frontLayersCount) { this.frontLayersCount = frontLayersCount; return this; }
            public CartItemPricingDTOBuilder backLayersCount(Integer backLayersCount) { this.backLayersCount = backLayersCount; return this; }
            public CartItemPricingDTO build() {
                return new CartItemPricingDTO(productId, quantity, itemType, frontLayersCount, backLayersCount);
            }
        }
    }

    public static class PriceCalculationRequest {
        private List<CartItemPricingDTO> items;

        public PriceCalculationRequest() {}
        public PriceCalculationRequest(List<CartItemPricingDTO> items) { this.items = items; }

        public List<CartItemPricingDTO> getItems() { return items; }
        public void setItems(List<CartItemPricingDTO> items) { this.items = items; }

        public static PriceCalculationRequestBuilder builder() { return new PriceCalculationRequestBuilder(); }

        public static class PriceCalculationRequestBuilder {
            private List<CartItemPricingDTO> items;
            public PriceCalculationRequestBuilder items(List<CartItemPricingDTO> items) { this.items = items; return this; }
            public PriceCalculationRequest build() { return new PriceCalculationRequest(items); }
        }
    }

    public static class PriceBreakdownResponse {
        private BigDecimal baseGarmentPrice;
        private BigDecimal customizationFee;
        private BigDecimal quantityDiscount;
        private BigDecimal subtotal;
        private BigDecimal shippingFee;
        private BigDecimal taxAmount;
        private BigDecimal totalAmount;

        public PriceBreakdownResponse() {}

        public PriceBreakdownResponse(BigDecimal baseGarmentPrice, BigDecimal customizationFee, BigDecimal quantityDiscount, BigDecimal subtotal, BigDecimal shippingFee, BigDecimal taxAmount, BigDecimal totalAmount) {
            this.baseGarmentPrice = baseGarmentPrice;
            this.customizationFee = customizationFee;
            this.quantityDiscount = quantityDiscount;
            this.subtotal = subtotal;
            this.shippingFee = shippingFee;
            this.taxAmount = taxAmount;
            this.totalAmount = totalAmount;
        }

        public BigDecimal getBaseGarmentPrice() { return baseGarmentPrice; }
        public void setBaseGarmentPrice(BigDecimal baseGarmentPrice) { this.baseGarmentPrice = baseGarmentPrice; }

        public BigDecimal getCustomizationFee() { return customizationFee; }
        public void setCustomizationFee(BigDecimal customizationFee) { this.customizationFee = customizationFee; }

        public BigDecimal getQuantityDiscount() { return quantityDiscount; }
        public void setQuantityDiscount(BigDecimal quantityDiscount) { this.quantityDiscount = quantityDiscount; }

        public BigDecimal getSubtotal() { return subtotal; }
        public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }

        public BigDecimal getShippingFee() { return shippingFee; }
        public void setShippingFee(BigDecimal shippingFee) { this.shippingFee = shippingFee; }

        public BigDecimal getTaxAmount() { return taxAmount; }
        public void setTaxAmount(BigDecimal taxAmount) { this.taxAmount = taxAmount; }

        public BigDecimal getTotalAmount() { return totalAmount; }
        public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

        public static PriceBreakdownResponseBuilder builder() { return new PriceBreakdownResponseBuilder(); }

        public static class PriceBreakdownResponseBuilder {
            private BigDecimal baseGarmentPrice;
            private BigDecimal customizationFee;
            private BigDecimal quantityDiscount;
            private BigDecimal subtotal;
            private BigDecimal shippingFee;
            private BigDecimal taxAmount;
            private BigDecimal totalAmount;

            public PriceBreakdownResponseBuilder baseGarmentPrice(BigDecimal baseGarmentPrice) { this.baseGarmentPrice = baseGarmentPrice; return this; }
            public PriceBreakdownResponseBuilder customizationFee(BigDecimal customizationFee) { this.customizationFee = customizationFee; return this; }
            public PriceBreakdownResponseBuilder quantityDiscount(BigDecimal quantityDiscount) { this.quantityDiscount = quantityDiscount; return this; }
            public PriceBreakdownResponseBuilder subtotal(BigDecimal subtotal) { this.subtotal = subtotal; return this; }
            public PriceBreakdownResponseBuilder shippingFee(BigDecimal shippingFee) { this.shippingFee = shippingFee; return this; }
            public PriceBreakdownResponseBuilder taxAmount(BigDecimal taxAmount) { this.taxAmount = taxAmount; return this; }
            public PriceBreakdownResponseBuilder totalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; return this; }
            public PriceBreakdownResponse build() {
                return new PriceBreakdownResponse(baseGarmentPrice, customizationFee, quantityDiscount, subtotal, shippingFee, taxAmount, totalAmount);
            }
        }
    }
}
