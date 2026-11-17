package com.sakthigarments.repository;

import com.sakthigarments.model.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    List<AuditLog> findByEntityNameAndEntityIdOrderByCreatedAtDesc(String entityName, Long entityId);
    List<AuditLog> findByUserIdOrderByCreatedAtDesc(Long userId);
}
