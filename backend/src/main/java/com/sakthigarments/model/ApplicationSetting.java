package com.sakthigarments.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "application_settings")
public class ApplicationSetting {

    @Id
    @Column(name = "setting_key", length = 100)
    private String settingKey;

    @Column(name = "setting_value", columnDefinition = "TEXT", nullable = false)
    private String settingValue;

    @Column(length = 255)
    private String description;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public ApplicationSetting() {}

    public ApplicationSetting(String settingKey, String settingValue, String description) {
        this.settingKey = settingKey;
        this.settingValue = settingValue;
        this.description = description;
    }

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public String getSettingKey() { return settingKey; }
    public void setSettingKey(String settingKey) { this.settingKey = settingKey; }

    public String getSettingValue() { return settingValue; }
    public void setSettingValue(String settingValue) { this.settingValue = settingValue; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static ApplicationSettingBuilder builder() { return new ApplicationSettingBuilder(); }

    public static class ApplicationSettingBuilder {
        private String settingKey;
        private String settingValue;
        private String description;

        public ApplicationSettingBuilder settingKey(String settingKey) { this.settingKey = settingKey; return this; }
        public ApplicationSettingBuilder settingValue(String settingValue) { this.settingValue = settingValue; return this; }
        public ApplicationSettingBuilder description(String description) { this.description = description; return this; }

        public ApplicationSetting build() {
            return new ApplicationSetting(settingKey, settingValue, description);
        }
    }
}
