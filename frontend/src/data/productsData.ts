// SAKTHI GARMENTS — Authoritative Central Product Data
// Auto-generated directly from the Phase 1 Approved Reference Analysis
// Company: SAKTHI GARMENTS | Town Hall Road / KVR Nagar, Tiruppur — 641601
// Phone: 9361832472 | Email: yagesh@gmail.com

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  sectionTitle: string;
  sectionAnchor: string;
  price: number;
  originalPrice: number;
  fabric: string;
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  image: string;
  imageHover: string;
  customizable: boolean;
  bulkDiscountEligible: boolean;
  minOrderQty: number;
}

export interface ProductCategorySection {
  order: number;
  containerId: string;
  sectionAnchor: string;
  title: string;
  categoryGroup: string;
  subcategory: string;
  productCount: number;
  products: ProductItem[];
}

export const SAKTHI_BRAND_CONFIG = {
  companyName: "SAKTHI GARMENTS",
  tagline: "Your Design, Our Stitch.",
  phone: "9361832472",
  phoneDisplay: "+91 93618 32472",
  email: "yagesh@gmail.com",
  location: "KVR Nagar (Near Chennai Bakes), Tiruppur, Tamil Nadu, India — 641604",
  announcementText: "Get 10% Off on your First Purchase. Use Code - SAKTHI10 • Discounts start from 10+ quantity orders",
  bulkNoticeText: "Discounts start from 10+ quantity orders — Direct Tiruppur Manufacturer Pricing",
  colors: {
    charcoal: "#171717",
    forest: "#06110C",
    crimson: "#A31C1B",
    white: "#FFFFFF",
    offWhite: "#F7F7F5",
    lightGray: "#E5E5E5",
    mutedGray: "#A3A3A3",
    black: "#171717",
    skyBlue: "#38BDF8",
    yellow: "#FACC15",
  }
};

export const STANDARD_COLORS = [
  {
    "name": "Pure White",
    "hex": "#FFFFFF"
  },
  {
    "name": "Obsidian Black",
    "hex": "#0B0F19"
  },
  {
    "name": "Sky Blue",
    "hex": "#38BDF8"
  },
  {
    "name": "Deep Navy",
    "hex": "#1E293B"
  },
  {
    "name": "Heather Melange",
    "hex": "#64748B"
  },
  {
    "name": "Crimson Red",
    "hex": "#DC2626"
  },
  {
    "name": "Forest Emerald",
    "hex": "#059669"
  },
  {
    "name": "Sakthi Yellow",
    "hex": "#FACC15"
  }
];

export const PRODUCT_SECTIONS: ProductCategorySection[] = [
  {
    "order": 1,
    "containerId": "c-apparel",
    "sectionAnchor": "c-polos",
    "title": "MEN'S / UNISEX > POLOS",
    "categoryGroup": "MEN'S / UNISEX",
    "subcategory": "POLOS",
    "productCount": 7,
    "products": [
      {
        "id": "sg-prod-001",
        "slug": "performance-polo",
        "name": "Performance Polo",
        "category": "MEN'S / UNISEX",
        "subcategory": "POLOS",
        "sectionTitle": "MEN'S / UNISEX > POLOS",
        "sectionAnchor": "c-polos",
        "price": 422,
        "originalPrice": 459,
        "fabric": "100% Bio-Washed Combed Cotton Honeycomb Matty Pique (230 GSM)",
        "description": "Premium quality Performance Polo manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/performance-polo.jpg",
        "imageHover": "./products/performance-polo-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-002",
        "slug": "activewear-polo",
        "name": "Activewear Polo",
        "category": "MEN'S / UNISEX",
        "subcategory": "POLOS",
        "sectionTitle": "MEN'S / UNISEX > POLOS",
        "sectionAnchor": "c-polos",
        "price": 339,
        "originalPrice": 369,
        "fabric": "100% Micro-Polyester Moisture-Wicking DryFit Mesh (160 GSM)",
        "description": "Premium quality Activewear Polo manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/activewear-polo.jpg",
        "imageHover": "./products/activewear-polo-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-003",
        "slug": "polyester-cotton-polo-t-shirt",
        "name": "Polyester Cotton Polo T-Shirt",
        "category": "MEN'S / UNISEX",
        "subcategory": "POLOS",
        "sectionTitle": "MEN'S / UNISEX > POLOS",
        "sectionAnchor": "c-polos",
        "price": 404,
        "originalPrice": 439,
        "fabric": "100% Bio-Washed Combed Cotton Honeycomb Matty Pique (230 GSM)",
        "description": "Premium quality Polyester Cotton Polo T-Shirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/polyester-cotton-polo-t-shirt.jpg",
        "imageHover": "./products/polyester-cotton-polo-t-shirt-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-004",
        "slug": "the-heavy-polo",
        "name": "The Heavy Polo",
        "category": "MEN'S / UNISEX",
        "subcategory": "POLOS",
        "sectionTitle": "MEN'S / UNISEX > POLOS",
        "sectionAnchor": "c-polos",
        "price": 542,
        "originalPrice": 589,
        "fabric": "100% Bio-Washed Combed Cotton Honeycomb Matty Pique (230 GSM)",
        "description": "Premium quality The Heavy Polo manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/the-heavy-polo.jpg",
        "imageHover": "./products/the-heavy-polo-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-005",
        "slug": "lightweight-polo",
        "name": "Lightweight Polo",
        "category": "MEN'S / UNISEX",
        "subcategory": "POLOS",
        "sectionTitle": "MEN'S / UNISEX > POLOS",
        "sectionAnchor": "c-polos",
        "price": 376,
        "originalPrice": 409,
        "fabric": "100% Bio-Washed Combed Cotton Honeycomb Matty Pique (230 GSM)",
        "description": "Premium quality Lightweight Polo manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/lightweight-polo.jpg",
        "imageHover": "./products/lightweight-polo-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-006",
        "slug": "sustainable-polo",
        "name": "Sustainable Polo",
        "category": "MEN'S / UNISEX",
        "subcategory": "POLOS",
        "sectionTitle": "MEN'S / UNISEX > POLOS",
        "sectionAnchor": "c-polos",
        "price": 367,
        "originalPrice": 399,
        "fabric": "100% Bio-Washed Combed Cotton Honeycomb Matty Pique (230 GSM)",
        "description": "Premium quality Sustainable Polo manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/sustainable-polo.jpg",
        "imageHover": "./products/sustainable-polo-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-007",
        "slug": "pure-cotton-collared-t-shirt",
        "name": "Pure Cotton Collared T-Shirt",
        "category": "MEN'S / UNISEX",
        "subcategory": "POLOS",
        "sectionTitle": "MEN'S / UNISEX > POLOS",
        "sectionAnchor": "c-polos",
        "price": 449,
        "originalPrice": 488,
        "fabric": "100% Bio-Washed Combed Cotton Single Jersey (220 GSM)",
        "description": "Premium quality Pure Cotton Collared T-Shirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/pure-cotton-collared-t-shirt.jpg",
        "imageHover": "./products/pure-cotton-collared-t-shirt-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      }
    ]
  },
  {
    "order": 2,
    "containerId": "c-apparel",
    "sectionAnchor": "c-round-neck-tees1",
    "title": "MEN'S / UNISEX > ROUND NECK TEES",
    "categoryGroup": "MEN'S / UNISEX",
    "subcategory": "ROUND NECK TEES",
    "productCount": 5,
    "products": [
      {
        "id": "sg-prod-008",
        "slug": "pure-cotton-round-neck-t-shirt",
        "name": "Pure Cotton Round Neck T-Shirt",
        "category": "MEN'S / UNISEX",
        "subcategory": "ROUND NECK TEES",
        "sectionTitle": "MEN'S / UNISEX > ROUND NECK TEES",
        "sectionAnchor": "c-round-neck-tees1",
        "price": 275,
        "originalPrice": 299,
        "fabric": "100% Bio-Washed Combed Cotton Single Jersey (220 GSM)",
        "description": "Premium quality Pure Cotton Round Neck T-Shirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/pure-cotton-round-neck-t-shirt.jpg",
        "imageHover": "./products/pure-cotton-round-neck-t-shirt-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-009",
        "slug": "sustainable-round-neck-t-shirts",
        "name": "Sustainable Round Neck T-shirts",
        "category": "MEN'S / UNISEX",
        "subcategory": "ROUND NECK TEES",
        "sectionTitle": "MEN'S / UNISEX > ROUND NECK TEES",
        "sectionAnchor": "c-round-neck-tees1",
        "price": 293,
        "originalPrice": 318,
        "fabric": "100% Bio-Washed Combed Cotton Single Jersey (220 GSM)",
        "description": "Premium quality Sustainable Round Neck T-shirts manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/sustainable-round-neck-t-shirts.jpg",
        "imageHover": "./products/sustainable-round-neck-t-shirts-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-010",
        "slug": "premium-lycra-cotton-round-neck-t-shirt",
        "name": "Premium Lycra Cotton Round Neck T-Shirt",
        "category": "MEN'S / UNISEX",
        "subcategory": "ROUND NECK TEES",
        "sectionTitle": "MEN'S / UNISEX > ROUND NECK TEES",
        "sectionAnchor": "c-round-neck-tees1",
        "price": 399,
        "originalPrice": 434,
        "fabric": "95% Combed Cotton, 5% Spandex Bio-Washed Stretch (200 GSM)",
        "description": "Premium quality Premium Lycra Cotton Round Neck T-Shirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/premium-lycra-cotton-round-neck-t-shirt.jpg",
        "imageHover": "./products/premium-lycra-cotton-round-neck-t-shirt-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-011",
        "slug": "supima-cotton-round-neck-t-shirt",
        "name": "Supima Cotton Round Neck T-Shirt",
        "category": "MEN'S / UNISEX",
        "subcategory": "ROUND NECK TEES",
        "sectionTitle": "MEN'S / UNISEX > ROUND NECK TEES",
        "sectionAnchor": "c-round-neck-tees1",
        "price": 500,
        "originalPrice": 543,
        "fabric": "100% Long-Staple Luxury Supima Cotton (190 GSM)",
        "description": "Premium quality Supima Cotton Round Neck T-Shirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/supima-cotton-round-neck-t-shirt.jpg",
        "imageHover": "./products/supima-cotton-round-neck-t-shirt-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-012",
        "slug": "pure-cotton-plus-sized-roundneck-t-shirts",
        "name": "Pure Cotton Plus-Sized Roundneck T-shirts",
        "category": "MEN'S / UNISEX",
        "subcategory": "ROUND NECK TEES",
        "sectionTitle": "MEN'S / UNISEX > ROUND NECK TEES",
        "sectionAnchor": "c-round-neck-tees1",
        "price": 345,
        "originalPrice": 375,
        "fabric": "100% Bio-Washed Combed Cotton Single Jersey (220 GSM)",
        "description": "Premium quality Pure Cotton Plus-Sized Roundneck T-shirts manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "XXL",
          "3XL",
          "4XL",
          "5XL",
          "6XL",
          "7XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/pure-cotton-plus-sized-roundneck-t-shirts.jpg",
        "imageHover": "./products/pure-cotton-plus-sized-roundneck-t-shirts-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      }
    ]
  },
  {
    "order": 3,
    "containerId": "c-apparel",
    "sectionAnchor": "c-oversized-tees4",
    "title": "MEN'S / UNISEX > OVERSIZED TEES",
    "categoryGroup": "MEN'S / UNISEX",
    "subcategory": "OVERSIZED TEES",
    "productCount": 4,
    "products": [
      {
        "id": "sg-prod-013",
        "slug": "acid-wash-oversize-t-shirt",
        "name": "Acid Wash Oversize T-Shirt",
        "category": "MEN'S / UNISEX",
        "subcategory": "OVERSIZED TEES",
        "sectionTitle": "MEN'S / UNISEX > OVERSIZED TEES",
        "sectionAnchor": "c-oversized-tees4",
        "price": 562,
        "originalPrice": 611,
        "fabric": "240 GSM Heavyweight Terry Bio-Washed Cotton with Acid Tint",
        "description": "Premium quality Acid Wash Oversize T-Shirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/acid-wash-oversize-t-shirt.jpg",
        "imageHover": "./products/acid-wash-oversize-t-shirt-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-014",
        "slug": "optic-wash-oversize-t-shirt",
        "name": "Optic Wash Oversize T-Shirt",
        "category": "MEN'S / UNISEX",
        "subcategory": "OVERSIZED TEES",
        "sectionTitle": "MEN'S / UNISEX > OVERSIZED TEES",
        "sectionAnchor": "c-oversized-tees4",
        "price": 504,
        "originalPrice": 548,
        "fabric": "220 GSM Dense Combed Cotton with Vintage Mineral Enzyme Wash",
        "description": "Premium quality Optic Wash Oversize T-Shirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/optic-wash-oversize-t-shirt.jpg",
        "imageHover": "./products/optic-wash-oversize-t-shirt-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-015",
        "slug": "dense-oversize-t-shirt",
        "name": "Dense Oversize T-Shirt",
        "category": "MEN'S / UNISEX",
        "subcategory": "OVERSIZED TEES",
        "sectionTitle": "MEN'S / UNISEX > OVERSIZED TEES",
        "sectionAnchor": "c-oversized-tees4",
        "price": 420,
        "originalPrice": 456,
        "fabric": "240 GSM Luxury Heavyweight Combed Cotton Single Jersey",
        "description": "Premium quality Dense Oversize T-Shirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/dense-oversize-t-shirt.jpg",
        "imageHover": "./products/dense-oversize-t-shirt-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-016",
        "slug": "pure-cotton-oversized-roundneck-t-shirt",
        "name": "Pure Cotton Oversized Roundneck T-shirt",
        "category": "MEN'S / UNISEX",
        "subcategory": "OVERSIZED TEES",
        "sectionTitle": "MEN'S / UNISEX > OVERSIZED TEES",
        "sectionAnchor": "c-oversized-tees4",
        "price": 302,
        "originalPrice": 328,
        "fabric": "240 GSM Luxury Heavyweight Combed Cotton Single Jersey",
        "description": "Premium quality Pure Cotton Oversized Roundneck T-shirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/pure-cotton-oversized-roundneck-t-shirt.jpg",
        "imageHover": "./products/pure-cotton-oversized-roundneck-t-shirt-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      }
    ]
  },
  {
    "order": 4,
    "containerId": "c-apparel",
    "sectionAnchor": "c-other-styles",
    "title": "MEN'S / UNISEX > OTHER STYLES",
    "categoryGroup": "MEN'S / UNISEX",
    "subcategory": "OTHER STYLES",
    "productCount": 6,
    "products": [
      {
        "id": "sg-prod-017",
        "slug": "pure-cotton-v-neck-t-shirt",
        "name": "Pure Cotton V Neck T-Shirt",
        "category": "MEN'S / UNISEX",
        "subcategory": "OTHER STYLES",
        "sectionTitle": "MEN'S / UNISEX > OTHER STYLES",
        "sectionAnchor": "c-other-styles",
        "price": 239,
        "originalPrice": 260,
        "fabric": "100% Bio-Washed Combed Cotton Single Jersey (220 GSM)",
        "description": "Premium quality Pure Cotton V Neck T-Shirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/pure-cotton-v-neck-t-shirt.jpg",
        "imageHover": "./products/pure-cotton-v-neck-t-shirt-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-018",
        "slug": "pure-cotton-long-sleeve-t-shirt",
        "name": "Pure Cotton Long Sleeve T-Shirt",
        "category": "MEN'S / UNISEX",
        "subcategory": "OTHER STYLES",
        "sectionTitle": "MEN'S / UNISEX > OTHER STYLES",
        "sectionAnchor": "c-other-styles",
        "price": 343,
        "originalPrice": 373,
        "fabric": "100% Bio-Washed Combed Cotton Single Jersey (220 GSM)",
        "description": "Premium quality Pure Cotton Long Sleeve T-Shirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/pure-cotton-long-sleeve-t-shirt.jpg",
        "imageHover": "./products/pure-cotton-long-sleeve-t-shirt-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-019",
        "slug": "polyester-activewear-jersey",
        "name": "Polyester Activewear Jersey",
        "category": "MEN'S / UNISEX",
        "subcategory": "OTHER STYLES",
        "sectionTitle": "MEN'S / UNISEX > OTHER STYLES",
        "sectionAnchor": "c-other-styles",
        "price": 151,
        "originalPrice": 164,
        "fabric": "100% Micro-Polyester Moisture-Wicking DryFit Mesh (160 GSM)",
        "description": "Premium quality Polyester Activewear Jersey manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/polyester-activewear-jersey.jpg",
        "imageHover": "./products/polyester-activewear-jersey-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-020",
        "slug": "pure-cotton-raglan-t-shirt",
        "name": "Pure Cotton Raglan T-Shirt",
        "category": "MEN'S / UNISEX",
        "subcategory": "OTHER STYLES",
        "sectionTitle": "MEN'S / UNISEX > OTHER STYLES",
        "sectionAnchor": "c-other-styles",
        "price": 262,
        "originalPrice": 285,
        "fabric": "100% Bio-Washed Combed Cotton Single Jersey (220 GSM)",
        "description": "Premium quality Pure Cotton Raglan T-Shirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/pure-cotton-raglan-t-shirt.jpg",
        "imageHover": "./products/pure-cotton-raglan-t-shirt-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-021",
        "slug": "tank-top",
        "name": "Tank Top",
        "category": "MEN'S / UNISEX",
        "subcategory": "OTHER STYLES",
        "sectionTitle": "MEN'S / UNISEX > OTHER STYLES",
        "sectionAnchor": "c-other-styles",
        "price": 209,
        "originalPrice": 227,
        "fabric": "100% Bio-Washed Combed Cotton Single Jersey (220 GSM)",
        "description": "Premium quality Tank Top manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/tank-top.jpg",
        "imageHover": "./products/tank-top-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-022",
        "slug": "promotional-t-shirts",
        "name": "Promotional T-shirts",
        "category": "MEN'S / UNISEX",
        "subcategory": "OTHER STYLES",
        "sectionTitle": "MEN'S / UNISEX > OTHER STYLES",
        "sectionAnchor": "c-other-styles",
        "price": 145,
        "originalPrice": 158,
        "fabric": "100% Bio-Washed Combed Cotton Single Jersey (220 GSM)",
        "description": "Premium quality Promotional T-shirts manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/promotional-t-shirts.jpg",
        "imageHover": "./products/promotional-t-shirts-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      }
    ]
  },
  {
    "order": 5,
    "containerId": "c-apparel",
    "sectionAnchor": "c-shirts",
    "title": "MEN'S / UNISEX > SHIRTS",
    "categoryGroup": "MEN'S / UNISEX",
    "subcategory": "SHIRTS",
    "productCount": 1,
    "products": [
      {
        "id": "sg-prod-023",
        "slug": "classic-button-down-shirt",
        "name": "Classic Button Down Shirt",
        "category": "MEN'S / UNISEX",
        "subcategory": "SHIRTS",
        "sectionTitle": "MEN'S / UNISEX > SHIRTS",
        "sectionAnchor": "c-shirts",
        "price": 792,
        "originalPrice": 861,
        "fabric": "100% Bio-Washed Combed Cotton Single Jersey (220 GSM)",
        "description": "Premium quality Classic Button Down Shirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/classic-button-down-shirt.jpg",
        "imageHover": "./products/classic-button-down-shirt-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      }
    ]
  },
  {
    "order": 6,
    "containerId": "c-apparel",
    "sectionAnchor": "c-bottoms",
    "title": "MEN'S / UNISEX > BOTTOMS",
    "categoryGroup": "MEN'S / UNISEX",
    "subcategory": "BOTTOMS",
    "productCount": 2,
    "products": [
      {
        "id": "sg-prod-024",
        "slug": "pure-cotton-shorts",
        "name": "Pure Cotton Shorts",
        "category": "MEN'S / UNISEX",
        "subcategory": "BOTTOMS",
        "sectionTitle": "MEN'S / UNISEX > BOTTOMS",
        "sectionAnchor": "c-bottoms",
        "price": 409,
        "originalPrice": 445,
        "fabric": "280 GSM Cotton-Poly Unbrushed Terry Loop Knit",
        "description": "Premium quality Pure Cotton Shorts manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/pure-cotton-shorts.jpg",
        "imageHover": "./products/pure-cotton-shorts-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-025",
        "slug": "pure-cotton-joggers",
        "name": "Pure Cotton Joggers",
        "category": "MEN'S / UNISEX",
        "subcategory": "BOTTOMS",
        "sectionTitle": "MEN'S / UNISEX > BOTTOMS",
        "sectionAnchor": "c-bottoms",
        "price": 612,
        "originalPrice": 665,
        "fabric": "280 GSM Cotton-Poly Unbrushed Terry Loop Knit",
        "description": "Premium quality Pure Cotton Joggers manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/pure-cotton-joggers.jpg",
        "imageHover": "./products/pure-cotton-joggers-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      }
    ]
  },
  {
    "order": 7,
    "containerId": "c-apparel",
    "sectionAnchor": "c-womens",
    "title": "APPAREL > WOMEN'S",
    "categoryGroup": "APPAREL",
    "subcategory": "WOMEN'S",
    "productCount": 3,
    "products": [
      {
        "id": "sg-prod-026",
        "slug": "women-s-polo",
        "name": "Women's Polo",
        "category": "APPAREL",
        "subcategory": "WOMEN'S",
        "sectionTitle": "APPAREL > WOMEN'S",
        "sectionAnchor": "c-womens",
        "price": 333,
        "originalPrice": 362,
        "fabric": "100% Bio-Washed Combed Cotton Honeycomb Matty Pique (230 GSM)",
        "description": "Premium quality Women's Polo manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/women-s-polo.jpg",
        "imageHover": "./products/women-s-polo-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-027",
        "slug": "women-s-pure-cotton-round-neck-t-shirt",
        "name": "Women's Pure Cotton Round Neck T-shirt",
        "category": "APPAREL",
        "subcategory": "WOMEN'S",
        "sectionTitle": "APPAREL > WOMEN'S",
        "sectionAnchor": "c-womens",
        "price": 242,
        "originalPrice": 263,
        "fabric": "100% Bio-Washed Combed Cotton Single Jersey (220 GSM)",
        "description": "Premium quality Women's Pure Cotton Round Neck T-shirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/women-s-pure-cotton-round-neck-t-shirt.jpg",
        "imageHover": "./products/women-s-pure-cotton-round-neck-t-shirt-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-028",
        "slug": "pure-cotton-round-neck-crop-tops",
        "name": "Pure Cotton Round Neck Crop Tops",
        "category": "APPAREL",
        "subcategory": "WOMEN'S",
        "sectionTitle": "APPAREL > WOMEN'S",
        "sectionAnchor": "c-womens",
        "price": 210,
        "originalPrice": 228,
        "fabric": "100% Combed Compact Cotton Rib-Knit (180 GSM)",
        "description": "Premium quality Pure Cotton Round Neck Crop Tops manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/pure-cotton-round-neck-crop-tops.jpg",
        "imageHover": "./products/pure-cotton-round-neck-crop-tops-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      }
    ]
  },
  {
    "order": 8,
    "containerId": "c-apparel",
    "sectionAnchor": "c-infant",
    "title": "KIDS > INFANT",
    "categoryGroup": "KIDS",
    "subcategory": "INFANT",
    "productCount": 2,
    "products": [
      {
        "id": "sg-prod-029",
        "slug": "infant-romper",
        "name": "Infant Romper",
        "category": "KIDS",
        "subcategory": "INFANT",
        "sectionTitle": "KIDS > INFANT",
        "sectionAnchor": "c-infant",
        "price": 229,
        "originalPrice": 249,
        "fabric": "100% Organic Hypoallergenic Combed Interlock Cotton (190 GSM, OEKO-TEX Standard 100)",
        "description": "Premium quality Infant Romper manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "0-3M",
          "3-6M",
          "6-12M",
          "12-18M"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/infant-romper.jpg",
        "imageHover": "./products/infant-romper-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-030",
        "slug": "infant-bibs",
        "name": "Infant Bibs",
        "category": "KIDS",
        "subcategory": "INFANT",
        "sectionTitle": "KIDS > INFANT",
        "sectionAnchor": "c-infant",
        "price": 106,
        "originalPrice": 115,
        "fabric": "100% Organic Hypoallergenic Combed Interlock Cotton (190 GSM, OEKO-TEX Standard 100)",
        "description": "Premium quality Infant Bibs manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "0-3M",
          "3-6M",
          "6-12M",
          "12-18M"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/infant-bibs.jpg",
        "imageHover": "./products/infant-bibs.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      }
    ]
  },
  {
    "order": 9,
    "containerId": "c-apparel",
    "sectionAnchor": "c-kids-teens",
    "title": "KIDS > KIDS & TEENS",
    "categoryGroup": "KIDS",
    "subcategory": "KIDS & TEENS",
    "productCount": 5,
    "products": [
      {
        "id": "sg-prod-031",
        "slug": "kids-full-sleeve-t-shirt",
        "name": "Kids Full Sleeve T-Shirt",
        "category": "KIDS",
        "subcategory": "KIDS & TEENS",
        "sectionTitle": "KIDS > KIDS & TEENS",
        "sectionAnchor": "c-kids-teens",
        "price": 239,
        "originalPrice": 260,
        "fabric": "100% Bio-Washed Combed Cotton Single Jersey (220 GSM)",
        "description": "Premium quality Kids Full Sleeve T-Shirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "3-4Y",
          "5-6Y",
          "7-8Y",
          "9-10Y",
          "11-12Y",
          "13-14Y"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/kids-full-sleeve-t-shirt.jpg",
        "imageHover": "./products/kids-full-sleeve-t-shirt-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-032",
        "slug": "kids-tank-top",
        "name": "Kids Tank Top",
        "category": "KIDS",
        "subcategory": "KIDS & TEENS",
        "sectionTitle": "KIDS > KIDS & TEENS",
        "sectionAnchor": "c-kids-teens",
        "price": 178,
        "originalPrice": 193,
        "fabric": "100% Bio-Washed Combed Cotton Single Jersey (220 GSM)",
        "description": "Premium quality Kids Tank Top manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "3-4Y",
          "5-6Y",
          "7-8Y",
          "9-10Y",
          "11-12Y",
          "13-14Y"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/kids-tank-top.jpg",
        "imageHover": "./products/kids-tank-top-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-033",
        "slug": "kids-polo-t-shirt",
        "name": "Kids Polo T-Shirt",
        "category": "KIDS",
        "subcategory": "KIDS & TEENS",
        "sectionTitle": "KIDS > KIDS & TEENS",
        "sectionAnchor": "c-kids-teens",
        "price": 383,
        "originalPrice": 416,
        "fabric": "100% Bio-Washed Combed Cotton Honeycomb Matty Pique (230 GSM)",
        "description": "Premium quality Kids Polo T-Shirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "3-4Y",
          "5-6Y",
          "7-8Y",
          "9-10Y",
          "11-12Y",
          "13-14Y"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/kids-polo-t-shirt.jpg",
        "imageHover": "./products/kids-polo-t-shirt-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-034",
        "slug": "kids-joggers",
        "name": "Kids Joggers",
        "category": "KIDS",
        "subcategory": "KIDS & TEENS",
        "sectionTitle": "KIDS > KIDS & TEENS",
        "sectionAnchor": "c-kids-teens",
        "price": 417,
        "originalPrice": 453,
        "fabric": "280 GSM Cotton-Poly Unbrushed Terry Loop Knit",
        "description": "Premium quality Kids Joggers manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "3-4Y",
          "5-6Y",
          "7-8Y",
          "9-10Y",
          "11-12Y",
          "13-14Y"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/kids-joggers.jpg",
        "imageHover": "./products/kids-joggers-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-035",
        "slug": "kids-round-neck-t-shirt",
        "name": "Kids Round Neck T-shirt",
        "category": "KIDS",
        "subcategory": "KIDS & TEENS",
        "sectionTitle": "KIDS > KIDS & TEENS",
        "sectionAnchor": "c-kids-teens",
        "price": 217,
        "originalPrice": 236,
        "fabric": "100% Bio-Washed Combed Cotton Single Jersey (220 GSM)",
        "description": "Premium quality Kids Round Neck T-shirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "3-4Y",
          "5-6Y",
          "7-8Y",
          "9-10Y",
          "11-12Y",
          "13-14Y"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/kids-round-neck-t-shirt.jpg",
        "imageHover": "./products/kids-round-neck-t-shirt-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      }
    ]
  },
  {
    "order": 10,
    "containerId": "c-accessories",
    "sectionAnchor": "c-accessories",
    "title": "ACCESSORIES",
    "categoryGroup": "ACCESSORIES",
    "subcategory": "ACCESSORIES",
    "productCount": 6,
    "products": [
      {
        "id": "sg-prod-036",
        "slug": "apron",
        "name": "Apron",
        "category": "ACCESSORIES",
        "subcategory": "ACCESSORIES",
        "sectionTitle": "ACCESSORIES",
        "sectionAnchor": "c-accessories",
        "price": 287,
        "originalPrice": 312,
        "fabric": "100% Bio-Washed Combed Cotton Single Jersey (220 GSM)",
        "description": "Premium quality Apron manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "One Size / Universal"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/apron.jpg",
        "imageHover": "./products/apron-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-037",
        "slug": "beanies",
        "name": "Beanies",
        "category": "ACCESSORIES",
        "subcategory": "ACCESSORIES",
        "sectionTitle": "ACCESSORIES",
        "sectionAnchor": "c-accessories",
        "price": 332,
        "originalPrice": 361,
        "fabric": "100% Heavy Twill Cotton / Structured Breathable Poly Mesh",
        "description": "Premium quality Beanies manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "One Size / Universal"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/beanies.jpg",
        "imageHover": "./products/beanies-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-038",
        "slug": "premium-trucker-caps",
        "name": "Premium Trucker Caps",
        "category": "ACCESSORIES",
        "subcategory": "ACCESSORIES",
        "sectionTitle": "ACCESSORIES",
        "sectionAnchor": "c-accessories",
        "price": 311,
        "originalPrice": 338,
        "fabric": "100% Heavy Twill Cotton / Structured Breathable Poly Mesh",
        "description": "Premium quality Premium Trucker Caps manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "One Size / Universal"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/premium-trucker-caps.jpg",
        "imageHover": "./products/premium-trucker-caps-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-039",
        "slug": "premium-baseball-caps",
        "name": "Premium Baseball Caps",
        "category": "ACCESSORIES",
        "subcategory": "ACCESSORIES",
        "sectionTitle": "ACCESSORIES",
        "sectionAnchor": "c-accessories",
        "price": 311,
        "originalPrice": 338,
        "fabric": "100% Heavy Twill Cotton / Structured Breathable Poly Mesh",
        "description": "Premium quality Premium Baseball Caps manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "One Size / Universal"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/premium-baseball-caps.jpg",
        "imageHover": "./products/premium-baseball-caps-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-040",
        "slug": "bucket-hat",
        "name": "Bucket Hat",
        "category": "ACCESSORIES",
        "subcategory": "ACCESSORIES",
        "sectionTitle": "ACCESSORIES",
        "sectionAnchor": "c-accessories",
        "price": 418,
        "originalPrice": 454,
        "fabric": "100% Heavy Twill Cotton / Structured Breathable Poly Mesh",
        "description": "Premium quality Bucket Hat manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "One Size / Universal"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/bucket-hat.jpg",
        "imageHover": "./products/bucket-hat-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-041",
        "slug": "face-masks",
        "name": "Face Masks",
        "category": "ACCESSORIES",
        "subcategory": "ACCESSORIES",
        "sectionTitle": "ACCESSORIES",
        "sectionAnchor": "c-accessories",
        "price": 84,
        "originalPrice": 91,
        "fabric": "100% Bio-Washed Combed Cotton Single Jersey (220 GSM)",
        "description": "Premium quality Face Masks manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "One Size / Universal"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/face-masks.jpg",
        "imageHover": "./products/face-masks-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      }
    ]
  },
  {
    "order": 11,
    "containerId": "c-all-season-wear",
    "sectionAnchor": "c-adult",
    "title": "JACKETS & PULLOVERS > ADULTS",
    "categoryGroup": "JACKETS & PULLOVERS",
    "subcategory": "ADULTS",
    "productCount": 10,
    "products": [
      {
        "id": "sg-prod-042",
        "slug": "optic-wash-hoodie",
        "name": "Optic Wash Hoodie",
        "category": "JACKETS & PULLOVERS",
        "subcategory": "ADULTS",
        "sectionTitle": "JACKETS & PULLOVERS > ADULTS",
        "sectionAnchor": "c-adult",
        "price": 899,
        "originalPrice": 977,
        "fabric": "220 GSM Dense Combed Cotton with Vintage Mineral Enzyme Wash",
        "description": "Premium quality Optic Wash Hoodie manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/optic-wash-hoodie.jpg",
        "imageHover": "./products/optic-wash-hoodie-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-043",
        "slug": "heavyweight-hoodie",
        "name": "Heavyweight Hoodie",
        "category": "JACKETS & PULLOVERS",
        "subcategory": "ADULTS",
        "sectionTitle": "JACKETS & PULLOVERS > ADULTS",
        "sectionAnchor": "c-adult",
        "price": 864,
        "originalPrice": 939,
        "fabric": "340 GSM 100% Brushed Cotton French Terry Fleece with Pre-Shrunk Bio-Wash",
        "description": "Premium quality Heavyweight Hoodie manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/heavyweight-hoodie.jpg",
        "imageHover": "./products/heavyweight-hoodie.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-044",
        "slug": "sustainable-dual-tone-hoodie",
        "name": "Sustainable Dual Tone Hoodie",
        "category": "JACKETS & PULLOVERS",
        "subcategory": "ADULTS",
        "sectionTitle": "JACKETS & PULLOVERS > ADULTS",
        "sectionAnchor": "c-adult",
        "price": 613,
        "originalPrice": 666,
        "fabric": "340 GSM 100% Brushed Cotton French Terry Fleece with Pre-Shrunk Bio-Wash",
        "description": "Premium quality Sustainable Dual Tone Hoodie manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/sustainable-dual-tone-hoodie.jpg",
        "imageHover": "./products/sustainable-dual-tone-hoodie.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-045",
        "slug": "high-neck-zipper-hoodie",
        "name": "High Neck Zipper Hoodie",
        "category": "JACKETS & PULLOVERS",
        "subcategory": "ADULTS",
        "sectionTitle": "JACKETS & PULLOVERS > ADULTS",
        "sectionAnchor": "c-adult",
        "price": 581,
        "originalPrice": 632,
        "fabric": "340 GSM 100% Brushed Cotton French Terry Fleece with Pre-Shrunk Bio-Wash",
        "description": "Premium quality High Neck Zipper Hoodie manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/high-neck-zipper-hoodie.jpg",
        "imageHover": "./products/high-neck-zipper-hoodie.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-046",
        "slug": "zipper-jacket",
        "name": "Zipper Jacket",
        "category": "JACKETS & PULLOVERS",
        "subcategory": "ADULTS",
        "sectionTitle": "JACKETS & PULLOVERS > ADULTS",
        "sectionAnchor": "c-adult",
        "price": 768,
        "originalPrice": 835,
        "fabric": "340 GSM 100% Brushed Cotton French Terry Fleece with Pre-Shrunk Bio-Wash",
        "description": "Premium quality Zipper Jacket manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/zipper-jacket.jpg",
        "imageHover": "./products/zipper-jacket.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-047",
        "slug": "quarter-zip-jacket",
        "name": "Quarter Zip Jacket",
        "category": "JACKETS & PULLOVERS",
        "subcategory": "ADULTS",
        "sectionTitle": "JACKETS & PULLOVERS > ADULTS",
        "sectionAnchor": "c-adult",
        "price": 689,
        "originalPrice": 749,
        "fabric": "340 GSM 100% Brushed Cotton French Terry Fleece with Pre-Shrunk Bio-Wash",
        "description": "Premium quality Quarter Zip Jacket manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/quarter-zip-jacket.jpg",
        "imageHover": "./products/quarter-zip-jacket-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-048",
        "slug": "crew-neck-sweatshirt",
        "name": "Crew Neck Sweatshirt",
        "category": "JACKETS & PULLOVERS",
        "subcategory": "ADULTS",
        "sectionTitle": "JACKETS & PULLOVERS > ADULTS",
        "sectionAnchor": "c-adult",
        "price": 541,
        "originalPrice": 588,
        "fabric": "340 GSM 100% Brushed Cotton French Terry Fleece with Pre-Shrunk Bio-Wash",
        "description": "Premium quality Crew Neck Sweatshirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/crew-neck-sweatshirt.jpg",
        "imageHover": "./products/crew-neck-sweatshirt-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-049",
        "slug": "pure-cotton-hoodie",
        "name": "Pure Cotton Hoodie",
        "category": "JACKETS & PULLOVERS",
        "subcategory": "ADULTS",
        "sectionTitle": "JACKETS & PULLOVERS > ADULTS",
        "sectionAnchor": "c-adult",
        "price": 654,
        "originalPrice": 711,
        "fabric": "340 GSM 100% Brushed Cotton French Terry Fleece with Pre-Shrunk Bio-Wash",
        "description": "Premium quality Pure Cotton Hoodie manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/pure-cotton-hoodie.jpg",
        "imageHover": "./products/pure-cotton-hoodie-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-050",
        "slug": "pure-cotton-hoodie-with-zip",
        "name": "Pure Cotton Hoodie With Zip",
        "category": "JACKETS & PULLOVERS",
        "subcategory": "ADULTS",
        "sectionTitle": "JACKETS & PULLOVERS > ADULTS",
        "sectionAnchor": "c-adult",
        "price": 719,
        "originalPrice": 781,
        "fabric": "340 GSM 100% Brushed Cotton French Terry Fleece with Pre-Shrunk Bio-Wash",
        "description": "Premium quality Pure Cotton Hoodie With Zip manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/pure-cotton-hoodie-with-zip.jpg",
        "imageHover": "./products/pure-cotton-hoodie-with-zip-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-051",
        "slug": "pure-cotton-varsity-jacket",
        "name": "Pure Cotton Varsity Jacket",
        "category": "JACKETS & PULLOVERS",
        "subcategory": "ADULTS",
        "sectionTitle": "JACKETS & PULLOVERS > ADULTS",
        "sectionAnchor": "c-adult",
        "price": 819,
        "originalPrice": 890,
        "fabric": "340 GSM 100% Brushed Cotton French Terry Fleece with Pre-Shrunk Bio-Wash",
        "description": "Premium quality Pure Cotton Varsity Jacket manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/pure-cotton-varsity-jacket.jpg",
        "imageHover": "./products/pure-cotton-varsity-jacket-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      }
    ]
  },
  {
    "order": 12,
    "containerId": "c-all-season-wear",
    "sectionAnchor": "c-kids-1",
    "title": "JACKETS & PULLOVERS > KIDS",
    "categoryGroup": "JACKETS & PULLOVERS",
    "subcategory": "KIDS",
    "productCount": 2,
    "products": [
      {
        "id": "sg-prod-052",
        "slug": "kids-zipper-hoodie",
        "name": "Kids Zipper Hoodie",
        "category": "JACKETS & PULLOVERS",
        "subcategory": "KIDS",
        "sectionTitle": "JACKETS & PULLOVERS > KIDS",
        "sectionAnchor": "c-kids-1",
        "price": 690,
        "originalPrice": 750,
        "fabric": "340 GSM 100% Brushed Cotton French Terry Fleece with Pre-Shrunk Bio-Wash",
        "description": "Premium quality Kids Zipper Hoodie manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "3-4Y",
          "5-6Y",
          "7-8Y",
          "9-10Y",
          "11-12Y",
          "13-14Y"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/kids-zipper-hoodie.jpg",
        "imageHover": "./products/kids-zipper-hoodie-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-053",
        "slug": "pure-cotton-kid-s-hoodies",
        "name": "Pure Cotton Kid's Hoodies",
        "category": "JACKETS & PULLOVERS",
        "subcategory": "KIDS",
        "sectionTitle": "JACKETS & PULLOVERS > KIDS",
        "sectionAnchor": "c-kids-1",
        "price": 602,
        "originalPrice": 654,
        "fabric": "340 GSM 100% Brushed Cotton French Terry Fleece with Pre-Shrunk Bio-Wash",
        "description": "Premium quality Pure Cotton Kid's Hoodies manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/pure-cotton-kid-s-hoodies.jpg",
        "imageHover": "./products/pure-cotton-kid-s-hoodies-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      }
    ]
  },
  {
    "order": 13,
    "containerId": "c-stationery",
    "sectionAnchor": "c-stationery",
    "title": "STATIONERY",
    "categoryGroup": "STATIONERY",
    "subcategory": "STATIONERY",
    "productCount": 2,
    "products": [
      {
        "id": "sg-prod-054",
        "slug": "poster",
        "name": "Poster",
        "category": "STATIONERY",
        "subcategory": "STATIONERY",
        "sectionTitle": "STATIONERY",
        "sectionAnchor": "c-stationery",
        "price": 124,
        "originalPrice": 135,
        "fabric": "300 GSM Archival Matte Cardstock with Micro-Pigment Ink",
        "description": "Premium quality Poster manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "One Size / Universal"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/poster.jpg",
        "imageHover": "./products/poster-back.jpg",
        "customizable": false,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-055",
        "slug": "mouse-pad",
        "name": "Mouse Pad",
        "category": "STATIONERY",
        "subcategory": "STATIONERY",
        "sectionTitle": "STATIONERY",
        "sectionAnchor": "c-stationery",
        "price": 124,
        "originalPrice": 135,
        "fabric": "High-Density Non-Slip Textured Rubber Base with Smooth Lycra Speed Surface",
        "description": "Premium quality Mouse Pad manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "One Size / Universal"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/mouse-pad.jpg",
        "imageHover": "./products/mouse-pad-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      }
    ]
  },
  {
    "order": 14,
    "containerId": "c-miscellaneous",
    "sectionAnchor": "c-miscellaneous",
    "title": "MISCELLANEOUS",
    "categoryGroup": "MISCELLANEOUS",
    "subcategory": "MISCELLANEOUS",
    "productCount": 4,
    "products": [
      {
        "id": "sg-prod-056",
        "slug": "enamel-mug",
        "name": "Enamel Mug",
        "category": "MISCELLANEOUS",
        "subcategory": "MISCELLANEOUS",
        "sectionTitle": "MISCELLANEOUS",
        "sectionAnchor": "c-miscellaneous",
        "price": 260,
        "originalPrice": 283,
        "fabric": "Grade-A Ceramic / High-Gloss Poly-Coated Enamel (350ml)",
        "description": "Premium quality Enamel Mug manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "One Size / Universal"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/enamel-mug.jpg",
        "imageHover": "./products/enamel-mug-back.jpg",
        "customizable": false,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-057",
        "slug": "idea-cafe-suction-mug",
        "name": "Idea Cafe Suction Mug",
        "category": "MISCELLANEOUS",
        "subcategory": "MISCELLANEOUS",
        "sectionTitle": "MISCELLANEOUS",
        "sectionAnchor": "c-miscellaneous",
        "price": 741,
        "originalPrice": 805,
        "fabric": "Grade-A Ceramic / High-Gloss Poly-Coated Enamel (350ml)",
        "description": "Premium quality Idea Cafe Suction Mug manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "One Size / Universal"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/idea-cafe-suction-mug.jpg",
        "imageHover": "./products/idea-cafe-suction-mug-back.jpg",
        "customizable": false,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-058",
        "slug": "tote-bag",
        "name": "Tote Bag",
        "category": "MISCELLANEOUS",
        "subcategory": "MISCELLANEOUS",
        "sectionTitle": "MISCELLANEOUS",
        "sectionAnchor": "c-miscellaneous",
        "price": 236,
        "originalPrice": 256,
        "fabric": "300 GSM Heavyweight Natural Unbleached Cotton Canvas",
        "description": "Premium quality Tote Bag manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "One Size / Universal"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/tote-bag.jpg",
        "imageHover": "./products/tote-bag-back.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-059",
        "slug": "ceramic-mug",
        "name": "Ceramic Mug",
        "category": "MISCELLANEOUS",
        "subcategory": "MISCELLANEOUS",
        "sectionTitle": "MISCELLANEOUS",
        "sectionAnchor": "c-miscellaneous",
        "price": 169,
        "originalPrice": 184,
        "fabric": "Grade-A Ceramic / High-Gloss Poly-Coated Enamel (350ml)",
        "description": "Premium quality Ceramic Mug manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "One Size / Universal"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/ceramic-mug.jpg",
        "imageHover": "./products/ceramic-mug-back.jpg",
        "customizable": false,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      }
    ]
  },
  {
    "order": 15,
    "containerId": "c-branded-merchandise",
    "sectionAnchor": "c-branded-merchandise",
    "title": "BRANDED MERCHANDISE",
    "categoryGroup": "BRANDED MERCHANDISE",
    "subcategory": "BRANDED MERCHANDISE",
    "productCount": 6,
    "products": [
      {
        "id": "sg-prod-060",
        "slug": "rare-rabbit-signature-round-neck-t-shirt",
        "name": "Rare Rabbit Signature Round Neck T-Shirt",
        "category": "BRANDED MERCHANDISE",
        "subcategory": "BRANDED MERCHANDISE",
        "sectionTitle": "BRANDED MERCHANDISE",
        "sectionAnchor": "c-branded-merchandise",
        "price": 845,
        "originalPrice": 919,
        "fabric": "100% Bio-Washed Combed Cotton Single Jersey (220 GSM)",
        "description": "Premium quality Rare Rabbit Signature Round Neck T-Shirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/rare-rabbit-signature-round-neck-t-shirt.jpg",
        "imageHover": "./products/rare-rabbit-signature-round-neck-t-shirt.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-061",
        "slug": "rare-rabbit-signature-polo-t-shirt",
        "name": "Rare Rabbit Signature Polo T-Shirt",
        "category": "BRANDED MERCHANDISE",
        "subcategory": "BRANDED MERCHANDISE",
        "sectionTitle": "BRANDED MERCHANDISE",
        "sectionAnchor": "c-branded-merchandise",
        "price": 1256,
        "originalPrice": 1365,
        "fabric": "100% Bio-Washed Combed Cotton Honeycomb Matty Pique (230 GSM)",
        "description": "Premium quality Rare Rabbit Signature Polo T-Shirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/rare-rabbit-signature-polo-t-shirt.jpg",
        "imageHover": "./products/rare-rabbit-signature-polo-t-shirt.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-062",
        "slug": "rare-rabbit-sweatshirt",
        "name": "Rare Rabbit Sweatshirt",
        "category": "BRANDED MERCHANDISE",
        "subcategory": "BRANDED MERCHANDISE",
        "sectionTitle": "BRANDED MERCHANDISE",
        "sectionAnchor": "c-branded-merchandise",
        "price": 2141,
        "originalPrice": 2327,
        "fabric": "340 GSM 100% Brushed Cotton French Terry Fleece with Pre-Shrunk Bio-Wash",
        "description": "Premium quality Rare Rabbit Sweatshirt manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/rare-rabbit-sweatshirt.jpg",
        "imageHover": "./products/rare-rabbit-sweatshirt.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-063",
        "slug": "rare-rabbit-cotton-polo",
        "name": "Rare Rabbit Cotton Polo",
        "category": "BRANDED MERCHANDISE",
        "subcategory": "BRANDED MERCHANDISE",
        "sectionTitle": "BRANDED MERCHANDISE",
        "sectionAnchor": "c-branded-merchandise",
        "price": 1204,
        "originalPrice": 1309,
        "fabric": "100% Bio-Washed Combed Cotton Honeycomb Matty Pique (230 GSM)",
        "description": "Premium quality Rare Rabbit Cotton Polo manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/rare-rabbit-cotton-polo.jpg",
        "imageHover": "./products/rare-rabbit-cotton-polo.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-064",
        "slug": "rare-rabbit-shirts-mens",
        "name": "Rare Rabbit Shirts (Mens)",
        "category": "BRANDED MERCHANDISE",
        "subcategory": "BRANDED MERCHANDISE",
        "sectionTitle": "BRANDED MERCHANDISE",
        "sectionAnchor": "c-branded-merchandise",
        "price": 1537,
        "originalPrice": 1671,
        "fabric": "100% Bio-Washed Combed Cotton Single Jersey (220 GSM)",
        "description": "Premium quality Rare Rabbit Shirts (Mens) manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/rare-rabbit-shirts-mens.jpg",
        "imageHover": "./products/rare-rabbit-shirts-mens.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      },
      {
        "id": "sg-prod-065",
        "slug": "yupoong-caps-collection",
        "name": "Yupoong Caps/Collection",
        "category": "BRANDED MERCHANDISE",
        "subcategory": "BRANDED MERCHANDISE",
        "sectionTitle": "BRANDED MERCHANDISE",
        "sectionAnchor": "c-branded-merchandise",
        "price": 689,
        "originalPrice": 749,
        "fabric": "100% Heavy Twill Cotton / Structured Breathable Poly Mesh",
        "description": "Premium quality Yupoong Caps/Collection manufactured by SAKTHI GARMENTS in Tiruppur. Crafted from high-grade bio-washed yarn, optimized for DTG/Screen custom printing, embroidery, and daily luxury comfort.",
        "sizes": [
          "One Size / Universal"
        ],
        "colors": [
          {
            "name": "Pure White",
            "hex": "#FFFFFF"
          },
          {
            "name": "Obsidian Black",
            "hex": "#0B0F19"
          },
          {
            "name": "Sky Blue",
            "hex": "#38BDF8"
          },
          {
            "name": "Deep Navy",
            "hex": "#1E293B"
          },
          {
            "name": "Heather Melange",
            "hex": "#64748B"
          },
          {
            "name": "Crimson Red",
            "hex": "#DC2626"
          },
          {
            "name": "Forest Emerald",
            "hex": "#059669"
          },
          {
            "name": "Sakthi Yellow",
            "hex": "#FACC15"
          }
        ],
        "image": "./products/yupoong-caps-collection.jpg",
        "imageHover": "./products/yupoong-caps-collection.jpg",
        "customizable": true,
        "bulkDiscountEligible": true,
        "minOrderQty": 1
      }
    ]
  }
];

export const ALL_PRODUCTS: ProductItem[] = PRODUCT_SECTIONS.flatMap(s => s.products);

export const getProductBySlug = (slug: string): ProductItem | undefined => {
  return ALL_PRODUCTS.find(p => p.slug === slug);
};

export const getProductsByCategory = (cat: string): ProductItem[] => {
  return ALL_PRODUCTS.filter(p => p.category.toLowerCase().includes(cat.toLowerCase()) || p.subcategory.toLowerCase().includes(cat.toLowerCase()));
};
