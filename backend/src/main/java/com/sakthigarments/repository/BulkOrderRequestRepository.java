package com.sakthigarments.repository;

import com.sakthigarments.model.BulkOrderRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BulkOrderRequestRepository extends JpaRepository<BulkOrderRequest, Long> {
    List<BulkOrderRequest> findByCompanyIdOrderByCreatedAtDesc(Long companyId);
    List<BulkOrderRequest> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
}
