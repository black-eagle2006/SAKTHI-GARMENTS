package com.sakthigarments.dto;

import com.sakthigarments.model.Product;
import java.util.List;
import java.util.Map;

public class ProductDTOs {

    public static class ProductSectionDto {
        private String id;
        private String title;
        private String description;
        private int itemCount;
        private List<Product> products;

        public ProductSectionDto() {}

        public ProductSectionDto(String id, String title, String description, int itemCount, List<Product> products) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.itemCount = itemCount;
            this.products = products;
        }

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public int getItemCount() { return itemCount; }
        public void setItemCount(int itemCount) { this.itemCount = itemCount; }

        public List<Product> getProducts() { return products; }
        public void setProducts(List<Product> products) { this.products = products; }
    }

    public static class BrandConfigDto {
        private String companyName;
        private String tagline;
        private String logoText;
        private String phone;
        private String phoneFormatted;
        private String email;
        private String address;
        private String city;
        private String state;
        private String pincode;
        private String country;
        private String announcement;
        private Map<String, String> colors;

        public BrandConfigDto() {}

        public BrandConfigDto(String companyName, String tagline, String logoText, String phone, String phoneFormatted,
                              String email, String address, String city, String state, String pincode, String country,
                              String announcement, Map<String, String> colors) {
            this.companyName = companyName;
            this.tagline = tagline;
            this.logoText = logoText;
            this.phone = phone;
            this.phoneFormatted = phoneFormatted;
            this.email = email;
            this.address = address;
            this.city = city;
            this.state = state;
            this.pincode = pincode;
            this.country = country;
            this.announcement = announcement;
            this.colors = colors;
        }

        public String getCompanyName() { return companyName; }
        public void setCompanyName(String companyName) { this.companyName = companyName; }

        public String getTagline() { return tagline; }
        public void setTagline(String tagline) { this.tagline = tagline; }

        public String getLogoText() { return logoText; }
        public void setLogoText(String logoText) { this.logoText = logoText; }

        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }

        public String getPhoneFormatted() { return phoneFormatted; }
        public void setPhoneFormatted(String phoneFormatted) { this.phoneFormatted = phoneFormatted; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }

        public String getCity() { return city; }
        public void setCity(String city) { this.city = city; }

        public String getState() { return state; }
        public void setState(String state) { this.state = state; }

        public String getPincode() { return pincode; }
        public void setPincode(String pincode) { this.pincode = pincode; }

        public String getCountry() { return country; }
        public void setCountry(String country) { this.country = country; }

        public String getAnnouncement() { return announcement; }
        public void setAnnouncement(String announcement) { this.announcement = announcement; }

        public Map<String, String> getColors() { return colors; }
        public void setColors(Map<String, String> colors) { this.colors = colors; }
    }

    public static class ContactInquiryDto {
        private String name;
        private String email;
        private String phone;
        private String company;
        private String subject;
        private String message;
        private Integer estimatedQuantity;

        public ContactInquiryDto() {}

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }

        public String getCompany() { return company; }
        public void setCompany(String company) { this.company = company; }

        public String getSubject() { return subject; }
        public void setSubject(String subject) { this.subject = subject; }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }

        public Integer getEstimatedQuantity() { return estimatedQuantity; }
        public void setEstimatedQuantity(Integer estimatedQuantity) { this.estimatedQuantity = estimatedQuantity; }
    }
}

