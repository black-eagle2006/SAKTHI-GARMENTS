package com.sakthigarments.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(nullable = false, length = 180)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(name = "notification_type", length = 50)
    private String notificationType = "ORDER_UPDATE"; // ORDER_UPDATE, QUOTE_RECEIVED, SYSTEM

    @Column(name = "is_read")
    private Boolean isRead = false;

    @Column(name = "action_url")
    private String actionUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Notification() {}

    public Notification(Long id, Long userId, String title, String message, String notificationType, Boolean isRead, String actionUrl) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.message = message;
        this.notificationType = notificationType != null ? notificationType : "ORDER_UPDATE";
        this.isRead = isRead != null ? isRead : false;
        this.actionUrl = actionUrl;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getNotificationType() { return notificationType; }
    public void setNotificationType(String notificationType) { this.notificationType = notificationType; }

    public Boolean getIsRead() { return isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }

    public String getActionUrl() { return actionUrl; }
    public void setActionUrl(String actionUrl) { this.actionUrl = actionUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
