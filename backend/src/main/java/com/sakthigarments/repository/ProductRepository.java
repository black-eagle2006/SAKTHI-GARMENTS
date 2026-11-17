package com.sakthigarments.repository;

import com.sakthigarments.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCompanyId(Long companyId);
    List<Product> findByCompanyIdAndIsPublishedTrue(Long companyId);
    List<Product> findByIsPublishedTrue();
    Optional<Product> findBySku(String sku);
    Optional<Product> findBySlug(String slug);
    List<Product> findByCategoryIgnoreCaseAndIsPublishedTrue(String category);
    List<Product> findBySubcategoryIgnoreCaseAndIsPublishedTrue(String subcategory);
    List<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description);
}
