package com.sakthigarments.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "shipments")
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", nullable = false, unique = true)
    private Long orderId;

    @Column(name = "tracking_number", nullable = false, unique = true, length = 100)
    private String trackingNumber;

    @Column(name = "carrier_name", nullable = false, length = 100)
    private String carrierName = "Blue Dart / India Post";

    @Column(name = "carrier_service", length = 80)
    private String carrierService = "Express Air Surface";

    @Column(name = "dispatch_date")
    private LocalDateTime dispatchDate;

    @Column(name = "estimated_delivery_date")
    private LocalDate estimatedDeliveryDate;

    @Column(name = "actual_delivery_date")
    private LocalDateTime actualDeliveryDate;

    @Column(name = "shipment_status", nullable = false, length = 50)
    private String shipmentStatus = "IN_TRANSIT";

    @Column(name = "tracking_history_json", columnDefinition = "LONGTEXT")
    private String trackingHistoryJson;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Shipment() {}

    public Shipment(Long id, Long orderId, String trackingNumber, String carrierName, String carrierService, LocalDateTime dispatchDate, LocalDate estimatedDeliveryDate, String shipmentStatus, String trackingHistoryJson) {
        this.id = id;
        this.orderId = orderId;
        this.trackingNumber = trackingNumber;
        this.carrierName = carrierName != null ? carrierName : "Blue Dart / India Post";
        this.carrierService = carrierService != null ? carrierService : "Express Air Surface";
        this.dispatchDate = dispatchDate;
        this.estimatedDeliveryDate = estimatedDeliveryDate;
        this.shipmentStatus = shipmentStatus != null ? shipmentStatus : "IN_TRANSIT";
        this.trackingHistoryJson = trackingHistoryJson;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public String getTrackingNumber() { return trackingNumber; }
    public void setTrackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; }

    public String getCarrierName() { return carrierName; }
    public void setCarrierName(String carrierName) { this.carrierName = carrierName; }

    public String getCarrierService() { return carrierService; }
    public void setCarrierService(String carrierService) { this.carrierService = carrierService; }

    public LocalDateTime getDispatchDate() { return dispatchDate; }
    public void setDispatchDate(LocalDateTime dispatchDate) { this.dispatchDate = dispatchDate; }

    public LocalDate getEstimatedDeliveryDate() { return estimatedDeliveryDate; }
    public void setEstimatedDeliveryDate(LocalDate estimatedDeliveryDate) { this.estimatedDeliveryDate = estimatedDeliveryDate; }

    public LocalDateTime getActualDeliveryDate() { return actualDeliveryDate; }
    public void setActualDeliveryDate(LocalDateTime actualDeliveryDate) { this.actualDeliveryDate = actualDeliveryDate; }

    public String getShipmentStatus() { return shipmentStatus; }
    public void setShipmentStatus(String shipmentStatus) { this.shipmentStatus = shipmentStatus; }

    public String getTrackingHistoryJson() { return trackingHistoryJson; }
    public void setTrackingHistoryJson(String trackingHistoryJson) { this.trackingHistoryJson = trackingHistoryJson; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
