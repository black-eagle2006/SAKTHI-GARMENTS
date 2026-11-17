package com.sakthigarments.repository;

import com.sakthigarments.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderNumber(String orderNumber);
    Optional<Order> findByTrackingNumber(String trackingNumber);
    List<Order> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
    List<Order> findByCompanyIdOrderByCreatedAtDesc(Long companyId);
    List<Order> findByCompanyIdAndStatus(Long companyId, String status);
}
