package com.sakthigarments.repository;

import com.sakthigarments.model.DesignTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DesignTemplateRepository extends JpaRepository<DesignTemplate, Long> {
    List<DesignTemplate> findByIsActiveTrue();
    List<DesignTemplate> findByCategoryAndIsActiveTrue(String category);
}
