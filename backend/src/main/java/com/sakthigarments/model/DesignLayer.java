package com.sakthigarments.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "design_layers")
public class DesignLayer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_id", nullable = false)
    private Long projectId;

    @Column(name = "layer_type", nullable = false, length = 30)
    private String layerType; // TEXT, IMAGE, AI_ART, TEMPLATE

    @Column(name = "layer_order", nullable = false)
    private Integer layerOrder = 0;

    @Column(length = 20)
    private String placement = "FRONT";

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "font_family", length = 60)
    private String fontFamily;

    @Column(name = "font_size")
    private Integer fontSize;

    @Column(name = "color_hex", length = 20)
    private String colorHex;

    @Column(name = "x_pos", nullable = false)
    private Double xPos = 1024.0;

    @Column(name = "y_pos", nullable = false)
    private Double yPos = 1024.0;

    @Column(name = "scale_val", nullable = false)
    private Double scaleVal = 1.0;

    @Column(name = "rotation_val", nullable = false)
    private Double rotationVal = 0.0;

    @Column(name = "opacity_val", nullable = false)
    private Double opacityVal = 1.0;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public DesignLayer() {}

    public DesignLayer(Long id, Long projectId, String layerType, Integer layerOrder, String placement, String content, String fontFamily, Integer fontSize, String colorHex, Double xPos, Double yPos, Double scaleVal, Double rotationVal, Double opacityVal) {
        this.id = id;
        this.projectId = projectId;
        this.layerType = layerType;
        this.layerOrder = layerOrder != null ? layerOrder : 0;
        this.placement = placement != null ? placement : "FRONT";
        this.content = content;
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.colorHex = colorHex;
        this.xPos = xPos != null ? xPos : 1024.0;
        this.yPos = yPos != null ? yPos : 1024.0;
        this.scaleVal = scaleVal != null ? scaleVal : 1.0;
        this.rotationVal = rotationVal != null ? rotationVal : 0.0;
        this.opacityVal = opacityVal != null ? opacityVal : 1.0;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getLayerType() { return layerType; }
    public void setLayerType(String layerType) { this.layerType = layerType; }

    public Integer getLayerOrder() { return layerOrder; }
    public void setLayerOrder(Integer layerOrder) { this.layerOrder = layerOrder; }

    public String getPlacement() { return placement; }
    public void setPlacement(String placement) { this.placement = placement; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getFontFamily() { return fontFamily; }
    public void setFontFamily(String fontFamily) { this.fontFamily = fontFamily; }

    public Integer getFontSize() { return fontSize; }
    public void setFontSize(Integer fontSize) { this.fontSize = fontSize; }

    public String getColorHex() { return colorHex; }
    public void setColorHex(String colorHex) { this.colorHex = colorHex; }

    public Double getxPos() { return xPos; }
    public void setxPos(Double xPos) { this.xPos = xPos; }

    public Double getyPos() { return yPos; }
    public void setyPos(Double yPos) { this.yPos = yPos; }

    public Double getScaleVal() { return scaleVal; }
    public void setScaleVal(Double scaleVal) { this.scaleVal = scaleVal; }

    public Double getRotationVal() { return rotationVal; }
    public void setRotationVal(Double rotationVal) { this.rotationVal = rotationVal; }

    public Double getOpacityVal() { return opacityVal; }
    public void setOpacityVal(Double opacityVal) { this.opacityVal = opacityVal; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
