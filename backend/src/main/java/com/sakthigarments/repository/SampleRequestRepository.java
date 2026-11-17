package com.sakthigarments.repository;

import com.sakthigarments.model.SampleRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SampleRequestRepository extends JpaRepository<SampleRequest, Long> {
    List<SampleRequest> findByCompanyIdOrderByCreatedAtDesc(Long companyId);
    List<SampleRequest> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
}
