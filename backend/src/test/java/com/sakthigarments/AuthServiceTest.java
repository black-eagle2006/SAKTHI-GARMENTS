package com.sakthigarments;

import com.sakthigarments.config.JwtTokenProvider;
import com.sakthigarments.dto.AuthDTOs.*;
import com.sakthigarments.exception.BadRequestException;
import com.sakthigarments.model.User;
import com.sakthigarments.repository.CompanyProfileRepository;
import com.sakthigarments.repository.UserRepository;
import com.sakthigarments.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AuthServiceTest {

    private UserRepository userRepository;
    private CompanyProfileRepository companyRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider tokenProvider;
    private AuthService authService;

    @BeforeEach
    public void setup() {
        userRepository = Mockito.mock(UserRepository.class);
        companyRepository = Mockito.mock(CompanyProfileRepository.class);
        passwordEncoder = new BCryptPasswordEncoder();
        // Use real JwtTokenProvider instance (no bytecode proxy needed)
        tokenProvider = new JwtTokenProvider("sakthi_garments_ultra_secure_jwt_signing_secret_key_tiruppur_2026_super_long_key", 86400000L);

        authService = new AuthService(userRepository, companyRepository, passwordEncoder, tokenProvider);
    }

    @Test
    public void testSuccessfulLogin() {
        String rawPassword = "Customer@123";
        String encoded = passwordEncoder.encode(rawPassword);

        User mockUser = User.builder()
                .id(1L)
                .email("customer@sakthigarments.in")
                .passwordHash(encoded)
                .fullName("Anandha Kumar")
                .role("CUSTOMER")
                .isActive(true)
                .build();

        when(userRepository.findByEmail("customer@sakthigarments.in")).thenReturn(Optional.of(mockUser));

        LoginRequest req = LoginRequest.builder()
                .email("customer@sakthigarments.in")
                .password(rawPassword)
                .build();

        AuthResponse res = authService.login(req);

        assertNotNull(res);
        assertNotNull(res.getToken());
        assertTrue(tokenProvider.validateToken(res.getToken()));
        assertEquals("CUSTOMER", res.getUser().getRole());
    }

    @Test
    public void testInvalidPasswordThrowsException() {
        User mockUser = User.builder()
                .id(1L)
                .email("customer@sakthigarments.in")
                .passwordHash(passwordEncoder.encode("CorrectPassword"))
                .role("CUSTOMER")
                .isActive(true)
                .build();

        when(userRepository.findByEmail("customer@sakthigarments.in")).thenReturn(Optional.of(mockUser));

        LoginRequest req = LoginRequest.builder()
                .email("customer@sakthigarments.in")
                .password("WrongPassword")
                .build();

        assertThrows(BadRequestException.class, () -> authService.login(req));
    }

    @Test
    public void testDuplicateEmailRegistrationThrowsException() {
        when(userRepository.existsByEmail("existing@sakthigarments.in")).thenReturn(true);

        RegisterCustomerRequest req = RegisterCustomerRequest.builder()
                .email("existing@sakthigarments.in")
                .fullName("Test User")
                .password("Password123")
                .build();

        assertThrows(BadRequestException.class, () -> authService.registerCustomer(req));
    }
}
