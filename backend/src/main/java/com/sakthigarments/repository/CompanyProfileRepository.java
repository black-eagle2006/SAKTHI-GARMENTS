package com.sakthigarments.repository;

import com.sakthigarments.model.CompanyProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyProfileRepository extends JpaRepository<CompanyProfile, Long> {

    List<CompanyProfile> findByApprovalStatus(String approvalStatus);

    Optional<CompanyProfile> findByUserId(Long userId);

    @Query("SELECT c FROM CompanyProfile c WHERE c.approvalStatus = 'APPROVED' AND " +
           "(LOWER(c.companyName) LIKE LOWER(CONCAT('%', :term, '%')) OR " +
           "LOWER(c.city) LIKE LOWER(CONCAT('%', :term, '%')) OR " +
           "c.pincode LIKE CONCAT('%', :term, '%'))")
    List<CompanyProfile> searchApprovedCompanies(@Param("term") String term);

    List<CompanyProfile> findByPincodeAndApprovalStatus(String pincode, String approvalStatus);
}
