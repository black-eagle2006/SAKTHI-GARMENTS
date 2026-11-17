package com.sakthigarments.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "design_projects")
public class DesignProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(name = "tshirt_color", nullable = false, length = 30)
    private String tshirtColor = "#FFFFFF";

    @Lob
    @Column(name = "front_layers_json", columnDefinition = "LONGTEXT")
    private String frontLayersJson;

    @Lob
    @Column(name = "back_layers_json", columnDefinition = "LONGTEXT")
    private String backLayersJson;

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public DesignProject() {}

    public DesignProject(Long id, Long userId, String title, String tshirtColor, String frontLayersJson, String backLayersJson, String thumbnailUrl) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.tshirtColor = tshirtColor != null ? tshirtColor : "#FFFFFF";
        this.frontLayersJson = frontLayersJson;
        this.backLayersJson = backLayersJson;
        this.thumbnailUrl = thumbnailUrl;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getTshirtColor() { return tshirtColor; }
    public void setTshirtColor(String tshirtColor) { this.tshirtColor = tshirtColor; }

    public String getFrontLayersJson() { return frontLayersJson; }
    public void setFrontLayersJson(String frontLayersJson) { this.frontLayersJson = frontLayersJson; }

    public String getBackLayersJson() { return backLayersJson; }
    public void setBackLayersJson(String backLayersJson) { this.backLayersJson = backLayersJson; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static DesignProjectBuilder builder() { return new DesignProjectBuilder(); }

    public static class DesignProjectBuilder {
        private Long id;
        private Long userId;
        private String title;
        private String tshirtColor = "#FFFFFF";
        private String frontLayersJson;
        private String backLayersJson;
        private String thumbnailUrl;

        public DesignProjectBuilder id(Long id) { this.id = id; return this; }
        public DesignProjectBuilder userId(Long userId) { this.userId = userId; return this; }
        public DesignProjectBuilder title(String title) { this.title = title; return this; }
        public DesignProjectBuilder tshirtColor(String tshirtColor) { this.tshirtColor = tshirtColor; return this; }
        public DesignProjectBuilder frontLayersJson(String frontLayersJson) { this.frontLayersJson = frontLayersJson; return this; }
        public DesignProjectBuilder backLayersJson(String backLayersJson) { this.backLayersJson = backLayersJson; return this; }
        public DesignProjectBuilder thumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; return this; }

        public DesignProject build() {
            return new DesignProject(id, userId, title, tshirtColor, frontLayersJson, backLayersJson, thumbnailUrl);
        }
    }
}
