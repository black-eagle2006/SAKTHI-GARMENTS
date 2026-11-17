package com.sakthigarments.service;

import com.sakthigarments.config.JwtTokenProvider;
import com.sakthigarments.dto.AuthDTOs.*;
import com.sakthigarments.exception.BadRequestException;
import com.sakthigarments.exception.ResourceNotFoundException;
import com.sakthigarments.model.CompanyProfile;
import com.sakthigarments.model.User;
import com.sakthigarments.repository.CompanyProfileRepository;
import com.sakthigarments.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final CompanyProfileRepository companyProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(
            UserRepository userRepository,
            CompanyProfileRepository companyProfileRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.companyProfileRepository = companyProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new BadRequestException("Invalid email or password."));

        if (!user.getIsActive()) {
            throw new BadRequestException("This account is currently suspended.");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BadRequestException("Invalid email or password.");
        }

        String token = tokenProvider.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .user(mapToUserDTO(user))
                .message("Login successful.")
                .build();
    }

    @Transactional
    public AuthResponse registerCustomer(RegisterCustomerRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new BadRequestException("Email is already registered.");
        }

        User user = User.builder()
                .email(email)
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role("CUSTOMER")
                .isActive(true)
                .build();

        user = userRepository.save(user);
        String token = tokenProvider.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .user(mapToUserDTO(user))
                .message("Customer account created successfully.")
                .build();
    }

    @Transactional
    public AuthResponse registerCompany(RegisterCompanyRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new BadRequestException("Email is already registered.");
        }

        User user = User.builder()
                .email(email)
                .fullName(request.getContactPerson())
                .phoneNumber(request.getPhoneNumber())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role("COMPANY")
                .isActive(true)
                .build();

        user = userRepository.save(user);

        CompanyProfile profile = CompanyProfile.builder()
                .userId(user.getId())
                .companyName(request.getCompanyName())
                .contactPerson(request.getContactPerson())
                .email(email)
                .phoneNumber(request.getPhoneNumber())
                .address(request.getAddress())
                .city(request.getCity() != null ? request.getCity() : "Tiruppur")
                .state(request.getState() != null ? request.getState() : "Tamil Nadu")
                .pincode(request.getPincode() != null ? request.getPincode() : "641601")
                .approvalStatus("PENDING")
                .build();

        profile = companyProfileRepository.save(profile);
        user.setCompanyId(profile.getId());
        userRepository.save(user);

        return AuthResponse.builder()
                .message("Garment Company registered successfully. Application is pending administrator verification.")
                .build();
    }

    public UserDTO getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return mapToUserDTO(user);
    }

    private UserDTO mapToUserDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .companyId(user.getCompanyId())
                .build();
    }
}
