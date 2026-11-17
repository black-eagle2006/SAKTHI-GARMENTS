import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Package,
  ArrowRight,
  Layers,
  Sparkles,
  Truck,
  Copy,
  Check,
  MapPin,
  Calendar,
  Phone,
  Clock,
  Printer,
  ChevronRight,
} from 'lucide-react';
import apiClient from '../api/client';
import { SAKTHI_BRAND_CONFIG } from '../data/productsData';

export const OrderSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const urlOrderNumber =
    searchParams.get('orderNumber') ||
    searchParams.get('orderId') ||
    sessionStorage.getItem('sakthi_last_order_number') ||
    'SG-579873';

  const [orderNumber] = useState<string>(urlOrderNumber);
  const [copied, setCopied] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Try loading from sessionStorage first
    try {
      const stored = sessionStorage.getItem('sakthi_last_order');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.orderNumber === orderNumber || !orderNumber) {
          setOrderDetails(parsed);
          setIsLoading(false);
        }
      }
    } catch {
      // Ignore JSON parse errors
    }

    // 2. Fetch official order confirmation from backend API
    apiClient
      .get(`/orders/track/${orderNumber}`)
      .then((res) => {
        if (res.data) {
          setOrderDetails(res.data);
        }
      })
      .catch(() => {
        // Fallback gracefully maintains session cached order
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [orderNumber]);

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const items = orderDetails?.items || [
    {
      productName: 'Sakthi Custom 3D T-Shirt',
      size: 'L',
      color: '#171717',
      quantity: 1,
      unitPrice: orderDetails?.totalAmount || 349,
      totalPrice: orderDetails?.totalAmount || 349,
    },
  ];

  const totalAmount = orderDetails?.totalAmount || orderDetails?.amount || 349;
  const shippingAddress = orderDetails?.shippingAddressLine || orderDetails?.shippingAddress?.shippingAddress || 'KVR Nagar, Tiruppur, Tamil Nadu — 641604';
  const recipientName = orderDetails?.shippingFullName || orderDetails?.shippingAddress?.fullName || 'Valued Customer';
  const recipientPhone = orderDetails?.shippingPhone || orderDetails?.shippingAddress?.phone || SAKTHI_BRAND_CONFIG.phone;

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#F7F7F5] text-[#171717] font-poppins px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Main Confirmation Hero Card */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E5E5E5] text-center space-y-6 shadow-md relative overflow-hidden">
          {/* Top Brand Accent Ribbon */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#06110C] via-[#A31C1B] to-[#06110C]" />

          {/* Green Check Circle */}
          <div className="w-20 h-20 rounded-full bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center mx-auto border-2 border-[#16A34A]/30 shadow-xs animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#16A34A]/10 text-[#16A34A] rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span>Order Confirmed & Payment Received</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#171717] uppercase tracking-tight">
              THANK YOU FOR YOUR ORDER!
            </h1>
            <p className="text-xs sm:text-sm text-[#666666] mt-2 max-w-md mx-auto leading-relaxed">
              Your custom garment order has been verified and registered at our stitching mill in{' '}
              <strong className="text-[#171717]">KVR Nagar, Tiruppur</strong>.
            </p>
          </div>

          {/* Order Reference Box with Copy Button */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F7F5] border border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-[10px] text-[#666666] uppercase tracking-wider font-bold">
                Order Reference & Tracking Code
              </p>
              <p className="font-mono font-black text-xl sm:text-2xl text-[#06110C] tracking-wide mt-0.5">
                {orderNumber}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyOrderNumber}
              className="py-2 px-3.5 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#171717] text-xs font-semibold text-[#171717] flex items-center gap-1.5 transition-colors shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span className="text-[#16A34A]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#666666]" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* BIG PROMINENT TRACK ORDER BUTTON */}
          <div className="space-y-3 pt-1">
            <Link
              to={`/track/${orderNumber}`}
              id="track-order-btn"
              className="w-full py-4 px-6 rounded-xl bg-[#06110C] hover:bg-[#A31C1B] text-white text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 active:scale-95 group"
            >
              <Truck className="w-5 h-5 text-[#FACC15] group-hover:translate-x-1 transition-transform" />
              <span>Track Order Live Confirmation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-[11px] text-[#666666] flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#A31C1B]" />
              <span>Live production stages updated from our Tiruppur factory floor</span>
            </p>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E5E5] space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#171717] flex items-center gap-2">
              <Package className="w-4 h-4 text-[#A31C1B]" />
              <span>Garment Order Confirmation Summary</span>
            </h2>
            <span className="text-xs font-bold text-[#16A34A] bg-[#16A34A]/10 px-2.5 py-0.5 rounded-full">
              Status: Confirmed
            </span>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            {items.map((item: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5]"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-lg border border-[#E5E5E5] shadow-inner shrink-0"
                    style={{ backgroundColor: item.color || '#171717' }}
                    title={`Garment Shade: ${item.color}`}
                  />
                  <div>
                    <p className="font-bold text-xs text-[#171717]">{item.productName || 'Custom 3D T-Shirt'}</p>
                    <p className="text-[11px] text-[#666666]">
                      Size: <strong className="text-[#171717]">{item.size || 'L'}</strong> • Qty:{' '}
                      <strong className="text-[#171717]">{item.quantity || 1}</strong>
                    </p>
                  </div>
                </div>

                <span className="text-xs font-black text-[#A31C1B]">
                  ₹{item.totalPrice || item.unitPrice || totalAmount}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing & Destination Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#E5E5E5] text-xs">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#666666] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#06110C]" /> Shipping Destination
              </span>
              <p className="font-bold text-[#171717]">{recipientName}</p>
              <p className="text-[#666666] text-[11px] leading-relaxed">{shippingAddress}</p>
              <p className="text-[#666666] text-[11px]">Phone: {recipientPhone}</p>
            </div>

            <div className="space-y-1 sm:text-right">
              <span className="text-[10px] uppercase font-bold text-[#666666] block">Payment Summary</span>
              <p className="text-[#666666]">
                Method: <strong className="text-[#171717]">{orderDetails?.paymentMethod || 'UPI / Instant'}</strong>
              </p>
              <p className="text-[#666666]">Estimated Dispatch: 24 - 48 Hours</p>
              <p className="text-sm font-black text-[#171717] pt-1">
                Total Paid: <span className="text-[#A31C1B] text-base">₹{totalAmount}</span>
              </p>
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-3 border-t border-[#E5E5E5] flex flex-wrap items-center justify-between gap-3 text-xs">
            <Link
              to="/customizer"
              className="py-2 px-4 rounded-lg bg-[#F7F7F5] hover:bg-[#E5E5E5] border border-[#E5E5E5] font-semibold text-[#171717] transition-colors"
            >
              Customize Another T-Shirt
            </Link>

            <a
              href={`https://wa.me/91${SAKTHI_BRAND_CONFIG.phone}?text=Hello%20Sakthi%20Garments%2C%20I%20have%20confirmed%20order%20${orderNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 rounded-lg bg-[#16A34A]/10 hover:bg-[#16A34A]/20 text-[#16A34A] border border-[#16A34A]/30 font-bold transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Confirm on WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
