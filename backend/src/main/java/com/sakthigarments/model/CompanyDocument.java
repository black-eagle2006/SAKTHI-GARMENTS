package com.sakthigarments.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "company_documents")
public class CompanyDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_id", nullable = false)
    private Long companyId;

    @Column(name = "document_type", nullable = false, length = 50)
    private String documentType; // GST_CERTIFICATE, MSME_UDYAM, FACTORY_LICENSE, POLLUTION_BOARD

    @Column(name = "document_name", nullable = false, length = 180)
    private String documentName;

    @Column(name = "file_url", nullable = false)
    private String fileUrl;

    @Column(name = "verification_status", length = 30)
    private String verificationStatus = "VERIFIED";

    @Column(name = "uploaded_at")
    private LocalDateTime uploadedAt;

    public CompanyDocument() {}

    public CompanyDocument(Long id, Long companyId, String documentType, String documentName, String fileUrl, String verificationStatus) {
        this.id = id;
        this.companyId = companyId;
        this.documentType = documentType;
        this.documentName = documentName;
        this.fileUrl = fileUrl;
        this.verificationStatus = verificationStatus != null ? verificationStatus : "VERIFIED";
    }

    @PrePersist
    protected void onCreate() {
        this.uploadedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getDocumentType() { return documentType; }
    public void setDocumentType(String documentType) { this.documentType = documentType; }

    public String getDocumentName() { return documentName; }
    public void setDocumentName(String documentName) { this.documentName = documentName; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }

    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
}
