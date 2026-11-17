package com.sakthigarments.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .headers(headers -> headers.frameOptions(frame -> frame.disable())) // For H2 console
            .authorizeHttpRequests(auth -> auth
                // Public Documentation & Health Endpoints
                .requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**", "/actuator/**", "/h2-console/**").permitAll()

                // Public Static Assets & Frontend SPA Routes
                .requestMatchers(
                    "/",
                    "/index.html",
                    "/assets/**",
                    "/favicon.ico",
                    "/favicon.svg",
                    "/icons.svg",
                    "/*.svg",
                    "/*.png",
                    "/*.jpg",
                    "/*.jpeg",
                    "/*.ico",
                    "/*.json",
                    "/error",
                    "/home",
                    "/products",
                    "/products/**",
                    "/customizer",
                    "/customizer/**",
                    "/tiruppur-mills",
                    "/tiruppur-mills/**",
                    "/marketplace",
                    "/marketplace/**",
                    "/fabric-samples",
                    "/fabric-samples/**",
                    "/design-templates",
                    "/design-templates/**",
                    "/ai-assistant",
                    "/ai-assistant/**",
                    "/cart",
                    "/checkout",
                    "/checkout/**",
                    "/payment",
                    "/payment/**",
                    "/order-success",
                    "/order-success/**",
                    "/track",
                    "/track/**",
                    "/explore",
                    "/how-it-works",
                    "/about",
                    "/about-us",
                    "/contact",
                    "/contact-us",
                    "/faq",
                    "/order-tracking",
                    "/order-tracking/**",
                    "/login",
                    "/signup",
                    "/register",
                    "/terms",
                    "/privacy",
                    "/privacy-policy",
                    "/refund-policy",
                    "/shipping-policy",
                    "/customer/**",
                    "/company/**"
                ).permitAll()

                // Public Auth & Core Feature Endpoints
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers("/api/v1/brand/**").permitAll()
                .requestMatchers("/api/v1/companies/**").permitAll()
                .requestMatchers("/api/v1/products/**").permitAll()
                .requestMatchers("/api/v1/pricing/**").permitAll()
                .requestMatchers("/api/v1/ai/**").permitAll()
                .requestMatchers("/api/v1/samples/**").permitAll()
                .requestMatchers("/api/v1/orders/**").permitAll()
                .requestMatchers("/api/v1/customizer/**").permitAll()
                .requestMatchers("/api/v1/design-templates/**").permitAll()
                .requestMatchers("/api/v1/templates/**").permitAll()
                .requestMatchers("/api/v1/reviews/**").permitAll()
                .requestMatchers("/api/v1/support/**").permitAll()
                .requestMatchers("/api/v1/checkout/**").permitAll()

                // Role Protected Endpoints
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/v1/company/**").hasAnyRole("COMPANY", "ADMIN")

                // All other API requests require authentication
                .requestMatchers("/api/**").authenticated()
                .anyRequest().permitAll()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(
                "http://localhost:5173",
                "http://localhost:3000",
                "http://127.0.0.1:5173"
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept", "X-Requested-With"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
