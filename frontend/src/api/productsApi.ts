import apiClient from './client';
import { ProductItem, ProductCategorySection } from '../data/productsData';

export interface BackendProduct {
  id: number;
  companyId: number;
  name: string;
  sku: string;
  slug: string;
  category: string;
  subcategory: string;
  description: string;
  garmentType: string;
  fabric: string;
  fabricGsm: number;
  fit: string;
  sleeveType: string;
  basePrice: number;
  minOrderQuantity: number;
  stockQuantity: number;
  isCustomizable: boolean;
  sampleAvailable: boolean;
  samplePrice: number;
  isPublished: boolean;
  imageUrl?: string;
}

export interface BackendSection {
  id: string;
  title: string;
  description: string;
  itemCount: number;
  products: BackendProduct[];
}

export interface BrandConfig {
  companyName: string;
  tagline: string;
  logoText: string;
  phone: string;
  phoneFormatted: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  announcement: string;
  colors: Record<string, string>;
}

export interface ContactInquiryPayload {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject?: string;
  message: string;
  estimatedQuantity?: number;
}

// Map backend product to storefront ProductItem
export const mapBackendProductToItem = (p: BackendProduct, fallbackIndex: number = 1): ProductItem => {
  return {
    id: `sg-prod-${p.id || fallbackIndex}`,
    slug: p.slug,
    name: p.name,
    category: p.category,
    subcategory: p.subcategory || p.category,
    sectionTitle: p.category,
    sectionAnchor: `c-${p.slug}`,
    price: p.basePrice,
    originalPrice: Math.round(p.basePrice * 1.15),
    fabric: `${p.fabric || '100% Combed Cotton'} (${p.fabricGsm || 220} GSM)`,
    description: p.description || '',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Obsidian Black', hex: '#0B0F19' },
      { name: 'Sky Blue', hex: '#38BDF8' },
      { name: 'Sakthi Yellow', hex: '#FACC15' },
    ],
    image: p.imageUrl || `./products/${p.slug}.jpg`,
    imageHover: `./products/${p.slug}-back.jpg`,
    customizable: p.isCustomizable,
    bulkDiscountEligible: true,
    minOrderQty: p.minOrderQuantity || 1,
  };
};

export const productsApi = {
  // Fetch all 15 canonical sections with their products
  async getSections(): Promise<BackendSection[]> {
    const res = await apiClient.get<BackendSection[]>('/products/sections');
    return res.data;
  },

  // Fetch list of products with optional query
  async getProducts(params?: { search?: string; category?: string; companyId?: number }): Promise<BackendProduct[]> {
    const res = await apiClient.get<BackendProduct[]>('/products', { params });
    return res.data;
  },

  // Fetch product by slug
  async getProductBySlug(slug: string): Promise<BackendProduct> {
    const res = await apiClient.get<BackendProduct>(`/products/slug/${encodeURIComponent(slug)}`);
    return res.data;
  },

  // Fetch brand configuration
  async getBrandConfig(): Promise<BrandConfig> {
    const res = await apiClient.get<BrandConfig>('/brand');
    return res.data;
  },

  // Submit contact inquiry
  async submitContact(payload: ContactInquiryPayload): Promise<{ referenceId: string; status: string; message: string }> {
    const res = await apiClient.post('/support/contact', payload);
    return res.data;
  },
};

export default productsApi;

