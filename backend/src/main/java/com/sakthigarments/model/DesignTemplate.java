package com.sakthigarments.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "design_templates")
public class DesignTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 60)
    private String category = "Streetwear";

    @Column(length = 255)
    private String tags;

    @Column(name = "preview_url")
    private String previewUrl;

    @Column(name = "template_json", columnDefinition = "LONGTEXT", nullable = false)
    private String templateJson;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public DesignTemplate() {}

    public DesignTemplate(Long id, String title, String category, String tags, String previewUrl, String templateJson, Boolean isActive) {
        this.id = id;
        this.title = title;
        this.category = category != null ? category : "Streetwear";
        this.tags = tags;
        this.previewUrl = previewUrl;
        this.templateJson = templateJson;
        this.isActive = isActive != null ? isActive : true;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }

    public String getPreviewUrl() { return previewUrl; }
    public void setPreviewUrl(String previewUrl) { this.previewUrl = previewUrl; }

    public String getTemplateJson() { return templateJson; }
    public void setTemplateJson(String templateJson) { this.templateJson = templateJson; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
