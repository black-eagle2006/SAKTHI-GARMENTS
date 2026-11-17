package com.sakthigarments.repository;

import com.sakthigarments.model.ApplicationSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationSettingRepository extends JpaRepository<ApplicationSetting, String> {
}
