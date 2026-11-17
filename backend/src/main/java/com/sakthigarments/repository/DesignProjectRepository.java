package com.sakthigarments.repository;

import com.sakthigarments.model.DesignProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DesignProjectRepository extends JpaRepository<DesignProject, Long> {
    List<DesignProject> findByUserIdOrderByUpdatedAtDesc(Long userId);
}
