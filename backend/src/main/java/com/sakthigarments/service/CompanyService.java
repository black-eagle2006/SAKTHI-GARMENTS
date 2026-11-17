package com.sakthigarments.service;

import com.sakthigarments.exception.ResourceNotFoundException;
import com.sakthigarments.model.CompanyProfile;
import com.sakthigarments.repository.CompanyProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    private final CompanyProfileRepository companyRepository;

    public CompanyService(CompanyProfileRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public List<CompanyProfile> getAllApprovedCompanies() {
        return companyRepository.findByApprovalStatus("APPROVED");
    }

    public CompanyProfile getCompanyById(Long id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Garment Company not found with id: " + id));
    }

    public List<CompanyProfile> searchCompanies(String term) {
        if (term == null || term.trim().isEmpty()) {
            return getAllApprovedCompanies();
        }
        return companyRepository.searchApprovedCompanies(term.trim());
    }

    public List<CompanyProfile> getCompaniesByPincode(String pincode) {
        return companyRepository.findByPincodeAndApprovalStatus(pincode, "APPROVED");
    }

    public List<CompanyProfile> getPendingApprovals() {
        return companyRepository.findByApprovalStatus("PENDING");
    }

    public CompanyProfile updateApprovalStatus(Long companyId, String status) {
        CompanyProfile company = getCompanyById(companyId);
        company.setApprovalStatus(status.toUpperCase());
        return companyRepository.save(company);
    }

    public CompanyProfile registerCompany(CompanyProfile profile) {
        if (profile.getApprovalStatus() == null) {
            profile.setApprovalStatus("APPROVED");
        }
        if (profile.getMinOrderQuantity() == null) {
            profile.setMinOrderQuantity(10);
        }
        if (profile.getCustomizationAvailable() == null) {
            profile.setCustomizationAvailable(true);
        }
        if (profile.getBulkOrderSupport() == null) {
            profile.setBulkOrderSupport(true);
        }
        if (profile.getSampleAvailable() == null) {
            profile.setSampleAvailable(true);
        }
        return companyRepository.save(profile);
    }
}
