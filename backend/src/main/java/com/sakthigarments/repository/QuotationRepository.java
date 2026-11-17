package com.sakthigarments.repository;

import com.sakthigarments.model.Quotation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuotationRepository extends JpaRepository<Quotation, Long> {
    List<Quotation> findByBulkOrderRequestId(Long bulkOrderRequestId);
    List<Quotation> findByCompanyId(Long companyId);
}
