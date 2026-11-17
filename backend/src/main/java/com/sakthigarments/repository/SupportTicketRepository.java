package com.sakthigarments.repository;

import com.sakthigarments.model.SupportTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> {
    List<SupportTicket> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<SupportTicket> findByTicketNumber(String ticketNumber);
    List<SupportTicket> findByStatus(String status);
}
