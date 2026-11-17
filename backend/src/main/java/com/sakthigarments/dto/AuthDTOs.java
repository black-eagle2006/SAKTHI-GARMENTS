package com.sakthigarments.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDTOs {

    public static class LoginRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Valid email is required")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;

        public LoginRequest() {}

        public LoginRequest(String email, String password) {
            this.email = email;
            this.password = password;
        }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public static LoginRequestBuilder builder() { return new LoginRequestBuilder(); }

        public static class LoginRequestBuilder {
            private String email;
            private String password;

            public LoginRequestBuilder email(String email) { this.email = email; return this; }
            public LoginRequestBuilder password(String password) { this.password = password; return this; }
            public LoginRequest build() { return new LoginRequest(email, password); }
        }
    }

    public static class RegisterCustomerRequest {
        @NotBlank(message = "Full name is required")
        private String fullName;

        @NotBlank(message = "Email is required")
        @Email(message = "Valid email is required")
        private String email;

        private String phoneNumber;

        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must be at least 6 characters")
        private String password;

        public RegisterCustomerRequest() {}

        public RegisterCustomerRequest(String fullName, String email, String phoneNumber, String password) {
            this.fullName = fullName;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.password = password;
        }

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPhoneNumber() { return phoneNumber; }
        public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public static RegisterCustomerRequestBuilder builder() { return new RegisterCustomerRequestBuilder(); }

        public static class RegisterCustomerRequestBuilder {
            private String fullName;
            private String email;
            private String phoneNumber;
            private String password;

            public RegisterCustomerRequestBuilder fullName(String fullName) { this.fullName = fullName; return this; }
            public RegisterCustomerRequestBuilder email(String email) { this.email = email; return this; }
            public RegisterCustomerRequestBuilder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
            public RegisterCustomerRequestBuilder password(String password) { this.password = password; return this; }
            public RegisterCustomerRequest build() { return new RegisterCustomerRequest(fullName, email, phoneNumber, password); }
        }
    }

    public static class RegisterCompanyRequest {
        @NotBlank(message = "Company name is required")
        private String companyName;

        @NotBlank(message = "Contact person is required")
        private String contactPerson;

        @NotBlank(message = "Email is required")
        @Email(message = "Valid email is required")
        private String email;

        @NotBlank(message = "Phone number is required")
        private String phoneNumber;

        @NotBlank(message = "Address is required")
        private String address;

        private String city;
        private String state;
        private String pincode;

        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must be at least 6 characters")
        private String password;

        public RegisterCompanyRequest() {}

        public RegisterCompanyRequest(String companyName, String contactPerson, String email, String phoneNumber, String address, String city, String state, String pincode, String password) {
            this.companyName = companyName;
            this.contactPerson = contactPerson;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.address = address;
            this.city = city;
            this.state = state;
            this.pincode = pincode;
            this.password = password;
        }

        public String getCompanyName() { return companyName; }
        public void setCompanyName(String companyName) { this.companyName = companyName; }

        public String getContactPerson() { return contactPerson; }
        public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPhoneNumber() { return phoneNumber; }
        public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }

        public String getCity() { return city; }
        public void setCity(String city) { this.city = city; }

        public String getState() { return state; }
        public void setState(String state) { this.state = state; }

        public String getPincode() { return pincode; }
        public void setPincode(String pincode) { this.pincode = pincode; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public static RegisterCompanyRequestBuilder builder() { return new RegisterCompanyRequestBuilder(); }

        public static class RegisterCompanyRequestBuilder {
            private String companyName;
            private String contactPerson;
            private String email;
            private String phoneNumber;
            private String address;
            private String city;
            private String state;
            private String pincode;
            private String password;

            public RegisterCompanyRequestBuilder companyName(String companyName) { this.companyName = companyName; return this; }
            public RegisterCompanyRequestBuilder contactPerson(String contactPerson) { this.contactPerson = contactPerson; return this; }
            public RegisterCompanyRequestBuilder email(String email) { this.email = email; return this; }
            public RegisterCompanyRequestBuilder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
            public RegisterCompanyRequestBuilder address(String address) { this.address = address; return this; }
            public RegisterCompanyRequestBuilder city(String city) { this.city = city; return this; }
            public RegisterCompanyRequestBuilder state(String state) { this.state = state; return this; }
            public RegisterCompanyRequestBuilder pincode(String pincode) { this.pincode = pincode; return this; }
            public RegisterCompanyRequestBuilder password(String password) { this.password = password; return this; }
            public RegisterCompanyRequest build() {
                return new RegisterCompanyRequest(companyName, contactPerson, email, phoneNumber, address, city, state, pincode, password);
            }
        }
    }

    public static class AuthResponse {
        private String token;
        private String tokenType;
        private UserDTO user;
        private String message;

        public AuthResponse() {}

        public AuthResponse(String token, String tokenType, UserDTO user, String message) {
            this.token = token;
            this.tokenType = tokenType;
            this.user = user;
            this.message = message;
        }

        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }

        public String getTokenType() { return tokenType; }
        public void setTokenType(String tokenType) { this.tokenType = tokenType; }

        public UserDTO getUser() { return user; }
        public void setUser(UserDTO user) { this.user = user; }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }

        public static AuthResponseBuilder builder() { return new AuthResponseBuilder(); }

        public static class AuthResponseBuilder {
            private String token;
            private String tokenType;
            private UserDTO user;
            private String message;

            public AuthResponseBuilder token(String token) { this.token = token; return this; }
            public AuthResponseBuilder tokenType(String tokenType) { this.tokenType = tokenType; return this; }
            public AuthResponseBuilder user(UserDTO user) { this.user = user; return this; }
            public AuthResponseBuilder message(String message) { this.message = message; return this; }
            public AuthResponse build() { return new AuthResponse(token, tokenType, user, message); }
        }
    }

    public static class UserDTO {
        private Long id;
        private String email;
        private String fullName;
        private String phoneNumber;
        private String role;
        private Long companyId;

        public UserDTO() {}

        public UserDTO(Long id, String email, String fullName, String phoneNumber, String role, Long companyId) {
            this.id = id;
            this.email = email;
            this.fullName = fullName;
            this.phoneNumber = phoneNumber;
            this.role = role;
            this.companyId = companyId;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }

        public String getPhoneNumber() { return phoneNumber; }
        public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }

        public Long getCompanyId() { return companyId; }
        public void setCompanyId(Long companyId) { this.companyId = companyId; }

        public static UserDTOBuilder builder() { return new UserDTOBuilder(); }

        public static class UserDTOBuilder {
            private Long id;
            private String email;
            private String fullName;
            private String phoneNumber;
            private String role;
            private Long companyId;

            public UserDTOBuilder id(Long id) { this.id = id; return this; }
            public UserDTOBuilder email(String email) { this.email = email; return this; }
            public UserDTOBuilder fullName(String fullName) { this.fullName = fullName; return this; }
            public UserDTOBuilder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
            public UserDTOBuilder role(String role) { this.role = role; return this; }
            public UserDTOBuilder companyId(Long companyId) { this.companyId = companyId; return this; }
            public UserDTO build() { return new UserDTO(id, email, fullName, phoneNumber, role, companyId); }
        }
    }
}
