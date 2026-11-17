export type UserRole = 'CUSTOMER' | 'COMPANY' | 'ADMIN';

export interface User {
  id: number;
  email: string;
  fullName: string;
  phoneNumber?: string;
  role: UserRole;
  isActive: boolean;
  avatarUrl?: string;
  companyId?: number;
  companyStatus?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
  createdAt?: string;
}

export interface Company {
  id: number;
  companyName: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  businessRegistrationNo?: string;
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
  minOrderQuantity: number;
  customizationAvailable: boolean;
  bulkOrderSupport: boolean;
  sampleAvailable: boolean;
  samplePrice?: number;
  estimatedProductionDays: number;
  logoUrl?: string;
  description?: string;
  publishedPriceRange?: string;
  distanceKm?: number;
}

export interface ProductVariant {
  id: number;
  size: string; // S, M, L, XL, XXL, XXXL
  colorHex: string;
  colorName: string;
  stockQuantity: number;
  priceAdjustment: number;
}

export interface Product {
  id: number;
  companyId: number;
  companyName?: string;
  name: string;
  sku: string;
  description: string;
  garmentType: string; // T-Shirt, Polo, Oversized, Hoodie
  fabric: string; // 100% Cotton, Poly-Cotton, Supima
  fabricGsm: number; // 180, 220, 240
  fit: string; // Regular, Oversized, Slim
  sleeveType: string; // Half Sleeve, Full Sleeve, Sleeveless
  basePrice: number;
  minOrderQuantity: number;
  availableSizes: string[];
  colorVariants: string[];
  stockQuantity: number;
  imageUrl?: string;
  isCustomizable: boolean;
  sampleAvailable: boolean;
  samplePrice?: number;
  isPublished: boolean;
}

export interface DecalLayer {
  id: string;
  type: 'text' | 'image';
  content: string; // text string or data URL
  x: number; // 0 to 1
  y: number; // 0 to 1
  scale: number;
  rotation: number;
  color?: string;
  fontFamily?: string;
  fontSize?: number;
  textAlign?: 'left' | 'center' | 'right';
  locked?: boolean;
  side: 'front' | 'back' | 'leftSleeve' | 'rightSleeve';
}

export interface DesignProject {
  id?: number;
  userId?: number;
  title: string;
  tshirtColor: string;
  frontLayers: DecalLayer[];
  backLayers: DecalLayer[];
  leftSleeveLayers?: DecalLayer[];
  rightSleeveLayers?: DecalLayer[];
  thumbnailUrl?: string;
  selectedCompanyId?: number;
  selectedProductId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface DesignTemplate {
  id: number;
  title: string;
  category: string;
  tags: string[];
  thumbnailUrl: string;
  tshirtColor: string;
  frontLayers: DecalLayer[];
  backLayers: DecalLayer[];
  isPopular?: boolean;
}

export interface CartItem {
  id: string; // client UUID or backend id
  productId: number;
  productName: string;
  companyId: number;
  companyName: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  itemType: 'CUSTOM' | 'PLAIN' | 'SAMPLE';
  designProject?: DesignProject;
  sampleDescription?: string;
}

export interface PriceBreakdown {
  baseGarmentPrice: number;
  customizationFee: number;
  quantityDiscount: number;
  subtotal: number;
  shippingFee: number;
  taxAmount: number; // GST
  totalAmount: number;
}

export type OrderStatus =
  | 'PENDING_PAYMENT'
  | 'PAYMENT_CONFIRMED'
  | 'ORDER_CONFIRMED'
  | 'AWAITING_COMPANY_ACCEPTANCE'
  | 'ACCEPTED'
  | 'IN_PRODUCTION'
  | 'QUALITY_CHECK'
  | 'READY_TO_SHIP'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUND_PENDING'
  | 'REFUNDED';

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  itemType: string;
  designProjectId?: number;
  designThumbnailUrl?: string;
}

export interface OrderAddress {
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  deliveryInstructions?: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  customerName: string;
  customerEmail: string;
  companyId: number;
  companyName: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: OrderAddress;
  subtotal: number;
  shippingFee: number;
  taxAmount: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  trackingNumber?: string;
  courierName?: string;
  estimatedDeliveryDate?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BulkOrderRequest {
  id: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyId: number;
  companyName: string;
  garmentType: string;
  totalQuantity: number;
  sizeBreakdown: Record<string, number>; // e.g. { S: 20, M: 50, L: 80 }
  colorBreakdown: string;
  targetBudget?: number;
  requiredDeliveryDate: string;
  customizationNotes: string;
  status: 'PENDING' | 'QUOTED' | 'ACCEPTED' | 'REJECTED' | 'CONVERTED';
  quotedPrice?: number;
  companyNotes?: string;
  createdAt: string;
}

export interface SampleRequest {
  id: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  companyId: number;
  companyName: string;
  productId?: number;
  sampleType: string; // Fabric Swatch, Plain Garment Sample
  quantity: number;
  price: number; // e.g., ₹69
  shippingAddress: OrderAddress;
  paymentStatus: string;
  fulfilmentStatus: 'REQUESTED' | 'DISPATCHED' | 'DELIVERED';
  trackingNumber?: string;
  createdAt: string;
}

export interface SupportTicket {
  id: number;
  userId: number;
  userEmail: string;
  subject: string;
  category: 'ORDER' | 'CUSTOMIZATION' | 'PAYMENT' | 'QUALITY' | 'OTHER';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  messages: {
    id: number;
    senderId: number;
    senderName: string;
    senderRole: UserRole;
    message: string;
    createdAt: string;
  }[];
  createdAt: string;
}

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: 'ORDER' | 'APPROVAL' | 'PAYMENT' | 'SUPPORT' | 'SYSTEM';
  isRead: boolean;
  linkUrl?: string;
  createdAt: string;
}
