package com.sakthigarments;

import com.sakthigarments.controller.BrandConfigController;
import com.sakthigarments.controller.ProductController;
import com.sakthigarments.controller.SupportController;
import com.sakthigarments.dto.ProductDTOs.*;
import com.sakthigarments.model.Product;
import com.sakthigarments.repository.ProductRepository;
import com.sakthigarments.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ProductCatalogApiTest {

    private ProductRepository productRepository;
    private ProductService productService;
    private ProductController productController;
    private BrandConfigController brandConfigController;
    private SupportController supportController;

    @BeforeEach
    public void setup() {
        productRepository = mock(ProductRepository.class);
        productService = new ProductService(productRepository);
        productController = new ProductController(productService);
        brandConfigController = new BrandConfigController();
        supportController = new SupportController();
    }

    @Test
    public void testBrandConfigEndpoint() {
        ResponseEntity<BrandConfigDto> res = brandConfigController.getBrandConfig();
        assertNotNull(res);
        BrandConfigDto brand = res.getBody();
        assertNotNull(brand);
        assertEquals("SAKTHI GARMENTS", brand.getCompanyName());
        assertEquals("Your Design, Our Stitch.", brand.getTagline());
        assertEquals("9361832472", brand.getPhone());
        assertEquals("yagesh@gmail.com", brand.getEmail());
        assertTrue(brand.getAddress().contains("KVR Nagar"));
        assertEquals("#38BDF8", brand.getColors().get("skyBlue"));
    }

    @Test
    public void testSupportContactInquiryEndpoint() {
        ContactInquiryDto inquiry = new ContactInquiryDto();
        inquiry.setName("Ramesh");
        inquiry.setEmail("ramesh@example.com");
        inquiry.setPhone("9876543210");
        inquiry.setMessage("Need 100 bulk customized hoodies.");
        inquiry.setEstimatedQuantity(100);

        ResponseEntity<Map<String, Object>> res = supportController.submitContactInquiry(inquiry);
        assertNotNull(res);
        Map<String, Object> body = res.getBody();
        assertNotNull(body);
        assertEquals("RECEIVED", body.get("status"));
        assertTrue(body.get("referenceId").toString().startsWith("INQ-"));
        assertTrue(body.get("message").toString().contains("9361832472"));
    }

    @Test
    public void testProductSlugLookup() {
        Product sample = Product.builder()
                .id(10L)
                .name("Men's Classic Round Neck T-Shirt")
                .slug("mens-classic-round-neck-t-shirt")
                .sku("SG-CAT-001")
                .category("Round Neck T-Shirts")
                .subcategory("Men's Round Neck T-Shirts")
                .basePrice(new BigDecimal("275.00"))
                .isPublished(true)
                .build();

        when(productRepository.findBySlug("mens-classic-round-neck-t-shirt"))
                .thenReturn(Optional.of(sample));

        ResponseEntity<Product> res = productController.getProductBySlug("mens-classic-round-neck-t-shirt");
        assertNotNull(res);
        Product p = res.getBody();
        assertNotNull(p);
        assertEquals("mens-classic-round-neck-t-shirt", p.getSlug());
        assertEquals("Round Neck T-Shirts", p.getCategory());
        assertEquals(new BigDecimal("275.00"), p.getBasePrice());
    }

    @Test
    public void testProductSectionsGrouping() {
        Product p1 = Product.builder()
                .id(1L)
                .name("Classic Pique Polo T-Shirt")
                .slug("classic-pique-polo-t-shirt")
                .category("MEN'S / UNISEX")
                .subcategory("POLOS")
                .isPublished(true)
                .build();

        Product p2 = Product.builder()
                .id(2L)
                .name("Men's Classic Round Neck T-Shirt")
                .slug("mens-classic-round-neck-t-shirt")
                .category("MEN'S / UNISEX")
                .subcategory("ROUND NECK TEES")
                .isPublished(true)
                .build();

        when(productRepository.findByIsPublishedTrue()).thenReturn(Arrays.asList(p1, p2));

        ResponseEntity<List<ProductSectionDto>> res = productController.getProductSections();
        assertNotNull(res);
        List<ProductSectionDto> sections = res.getBody();
        assertNotNull(sections);
        assertEquals(15, sections.size()); // Exactly 15 canonical reference sections

        // Verify first section is MEN'S / UNISEX > POLOS
        ProductSectionDto sec1 = sections.get(0);
        assertEquals("MEN'S / UNISEX > POLOS", sec1.getTitle());
        assertEquals(1, sec1.getItemCount());
        assertEquals("classic-pique-polo-t-shirt", sec1.getProducts().get(0).getSlug());

        // Verify second section is MEN'S / UNISEX > ROUND NECK TEES
        ProductSectionDto sec2 = sections.get(1);
        assertEquals("MEN'S / UNISEX > ROUND NECK TEES", sec2.getTitle());
        assertEquals(1, sec2.getItemCount());
        assertEquals("mens-classic-round-neck-t-shirt", sec2.getProducts().get(0).getSlug());
    }
}

