package com.sakthigarments.repository;

import com.sakthigarments.model.PricingRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PricingRuleRepository extends JpaRepository<PricingRule, Long> {
    List<PricingRule> findByIsActiveTrue();
    List<PricingRule> findByRuleTypeAndIsActiveTrue(String ruleType);
}
