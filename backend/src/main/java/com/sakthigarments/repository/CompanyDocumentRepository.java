package com.sakthigarments.repository;

import com.sakthigarments.model.CompanyDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CompanyDocumentRepository extends JpaRepository<CompanyDocument, Long> {
    List<CompanyDocument> findByCompanyId(Long companyId);
    List<CompanyDocument> findByVerificationStatus(String verificationStatus);
}
