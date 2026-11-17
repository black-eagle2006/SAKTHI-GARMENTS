package com.sakthigarments.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "entity_name", nullable = false, length = 100)
    private String entityName;

    @Column(name = "entity_id")
    private Long entityId;

    @Column(name = "action_type", nullable = false, length = 50)
    private String actionType; // CREATE, UPDATE, DELETE, LOGIN, EXPORT, MIGRATION

    @Column(name = "old_values_json", columnDefinition = "LONGTEXT")
    private String oldValuesJson;

    @Column(name = "new_values_json", columnDefinition = "LONGTEXT")
    private String newValuesJson;

    @Column(name = "ip_address", length = 60)
    private String ipAddress;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public AuditLog() {}

    public AuditLog(Long id, Long userId, String entityName, Long entityId, String actionType, String oldValuesJson, String newValuesJson, String ipAddress) {
        this.id = id;
        this.userId = userId;
        this.entityName = entityName;
        this.entityId = entityId;
        this.actionType = actionType;
        this.oldValuesJson = oldValuesJson;
        this.newValuesJson = newValuesJson;
        this.ipAddress = ipAddress;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getEntityName() { return entityName; }
    public void setEntityName(String entityName) { this.entityName = entityName; }

    public Long getEntityId() { return entityId; }
    public void setEntityId(Long entityId) { this.entityId = entityId; }

    public String getActionType() { return actionType; }
    public void setActionType(String actionType) { this.actionType = actionType; }

    public String getOldValuesJson() { return oldValuesJson; }
    public void setOldValuesJson(String oldValuesJson) { this.oldValuesJson = oldValuesJson; }

    public String getNewValuesJson() { return newValuesJson; }
    public void setNewValuesJson(String newValuesJson) { this.newValuesJson = newValuesJson; }

    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
