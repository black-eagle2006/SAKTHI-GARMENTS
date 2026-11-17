package com.sakthigarments.repository;

import com.sakthigarments.model.DesignLayer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DesignLayerRepository extends JpaRepository<DesignLayer, Long> {
    List<DesignLayer> findByProjectIdOrderByLayerOrderAsc(Long projectId);
    void deleteByProjectId(Long projectId);
}
