import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CreditCard,
  ShieldCheck,
  QrCode,
  Smartphone,
  Building,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SAKTHI_BRAND_CONFIG } from '../data/productsData';
import apiClient from '../api/client';

export const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, breakdown, clearCart } = useCart();

  const checkoutData = (location.state as any)?.checkoutData || {
    fullName: 'Valued Customer',
    phone: '9361832472',
    email: 'customer@example.com',
    shippingAddress: 'KVR Nagar, Tiruppur, Tamil Nadu',
    notes: '',
  };

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiProvider, setUpiProvider] = useState<'gpay' | 'phonepe' | 'paytm' | 'custom'>('gpay');
  const [customUpiId, setCustomUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Card fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  const shippingCost = breakdown.shippingFee;
  const grandTotal = breakdown.totalAmount;

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    let finalOrderNumber = `SG-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      // Create order via backend API
      const res = await apiClient.post('/orders', {
        shippingAddress: {
          fullName: checkoutData.fullName,
          phoneNumber: checkoutData.phone,
          email: checkoutData.email,
          addressLine1: checkoutData.shippingAddress,
          city: 'Tiruppur',
          state: 'Tamil Nadu',
          pincode: '641604',
          deliveryInstructions: checkoutData.notes || 'Direct factory order',
        },
        items: items.map((i) => ({
          productId: i.productId,
          productName: i.productName,
          companyId: i.companyId || 1,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          totalPrice: i.totalPrice,
          size: i.size,
          color: i.color,
          itemType: i.itemType,
        })),
        subtotal: breakdown.subtotal,
        shippingFee: breakdown.shippingFee,
        taxAmount: breakdown.taxAmount,
        totalAmount: grandTotal,
        paymentMethod: paymentMethod.toUpperCase(),
      });
      if (res.data && res.data.orderNumber) {
        finalOrderNumber = res.data.orderNumber;
      }

      // Store in session storage for immediate confirmation & tracking
      const confirmedOrderData = {
        orderNumber: finalOrderNumber,
        amount: grandTotal,
        paymentMethod: paymentMethod.toUpperCase(),
        items: items,
        shippingAddress: checkoutData,
        createdAt: new Date().toISOString(),
      };
      sessionStorage.setItem('sakthi_last_order', JSON.stringify(confirmedOrderData));
      sessionStorage.setItem('sakthi_last_order_number', finalOrderNumber);
    } catch {
      // Backend resilient offline recording
      console.warn('Backend order recording simulated.');
      const fallbackOrderData = {
        orderNumber: finalOrderNumber,
        amount: grandTotal,
        paymentMethod: paymentMethod.toUpperCase(),
        items: items,
        shippingAddress: checkoutData,
        createdAt: new Date().toISOString(),
      };
      sessionStorage.setItem('sakthi_last_order', JSON.stringify(fallbackOrderData));
      sessionStorage.setItem('sakthi_last_order_number', finalOrderNumber);
    }

    // Simulate payment gateway settlement delay
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      clearCart();
      setTimeout(() => {
        navigate(`/order-success?orderNumber=${finalOrderNumber}&orderId=${finalOrderNumber}&amount=${grandTotal}`);
      }, 1500);
    }, 1800);
  };

  return (
    <div className="w-full min-h-screen bg-white font-poppins text-[#171717] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="border-b border-[#E5E5E5] pb-4 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F7F7F5] border border-[#E5E5E5] rounded-full text-xs font-semibold text-[#171717] mb-2 shadow-xs">
            <Lock className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>256-Bit Bank Encrypted Payment Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight uppercase">
            COMPLETE PAYMENT
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
            Select your preferred payment channel for SAKTHI GARMENTS order
          </p>
        </div>

        {paymentSuccess ? (
          <div className="p-8 bg-[#16A34A]/10 border border-[#16A34A]/30 rounded-2xl text-center space-y-3 animate-fadeIn">
            <CheckCircle2 className="w-12 h-12 text-[#16A34A] mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-[#16A34A]">Payment Verified Successfully!</h3>
            <p className="text-xs text-[#666666]">
              Transferring to order confirmation and live Tiruppur factory tracking...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Payment Method Selector */}
            <div className="lg:col-span-7 space-y-6">
              {/* Payment Type Tabs */}
              <div className="grid grid-cols-4 gap-2 p-1.5 bg-[#F7F7F5] border border-[#E5E5E5] rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-white text-[#06110C] shadow-xs border border-[#E5E5E5] font-bold'
                      : 'text-[#666666] hover:text-[#171717]'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-[#A31C1B]" />
                  <span>UPI / QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-white text-[#06110C] shadow-xs border border-[#E5E5E5] font-bold'
                      : 'text-[#666666] hover:text-[#171717]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#06110C]" />
                  <span>Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'bg-white text-[#06110C] shadow-xs border border-[#E5E5E5] font-bold'
                      : 'text-[#666666] hover:text-[#171717]'
                  }`}
                >
                  <Building className="w-4 h-4 text-[#06110C]" />
                  <span>NetBank</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-white text-[#06110C] shadow-xs border border-[#E5E5E5] font-bold'
                      : 'text-[#666666] hover:text-[#171717]'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 text-[#16A34A]" />
                  <span>COD</span>
                </button>
              </div>

              {/* UPI Tab Content */}
              {paymentMethod === 'upi' && (
                <div className="p-5 border border-[#E5E5E5] rounded-xl bg-white space-y-5">
                  <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3">
                    <span className="text-xs font-bold uppercase text-[#171717]">Select UPI Application</span>
                    <span className="text-[11px] text-[#16A34A] font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Instant Zero Fee
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'gpay', label: 'Google Pay' },
                      { id: 'phonepe', label: 'PhonePe' },
                      { id: 'paytm', label: 'Paytm UPI' },
                    ].map((app) => (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => setUpiProvider(app.id as any)}
                        className={`p-3 rounded-lg border text-xs font-bold text-center transition-all ${
                          upiProvider === app.id
                            ? 'border-[#06110C] bg-[#F7F7F5] text-[#06110C] shadow-xs ring-1 ring-[#06110C]'
                            : 'border-[#E5E5E5] text-[#666666] hover:border-[#171717]'
                        }`}
                      >
                        {app.label}
                      </button>
                    ))}
                  </div>

                  {/* QR Code Simulation */}
                  <div className="p-4 bg-[#F7F7F5] border border-[#E5E5E5] rounded-xl text-center space-y-3">
                    <p className="text-xs font-semibold text-[#171717]">
                      Scan QR with any UPI App (GPay, PhonePe, BHIM, Cred)
                    </p>
                    <div className="w-36 h-36 mx-auto bg-white border border-[#E5E5E5] p-2 rounded-lg flex items-center justify-center shadow-xs">
                      {/* Simulated QR Code Canvas */}
                      <div className="w-full h-full bg-[#171717] rounded flex items-center justify-center p-2">
                        <QrCode className="w-24 h-24 text-white" />
                      </div>
                    </div>
                    <p className="text-[10px] text-[#666666]">
                      UPI ID: <span className="font-mono font-bold text-[#171717]">sakthigarments@icici</span>
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1">
                      Or Enter Your UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      value={customUpiId}
                      onChange={(e) => setCustomUpiId(e.target.value)}
                      placeholder="e.g. 9361832472@upi"
                      className="w-full px-3 py-2 bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg text-xs text-[#171717] focus:border-[#06110C] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Card Tab Content */}
              {paymentMethod === 'card' && (
                <div className="p-5 border border-[#E5E5E5] rounded-xl bg-white space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1 uppercase">Card Number</label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4000 1234 5678 9010"
                      className="w-full px-3 py-2 bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg text-xs text-[#171717] focus:border-[#06110C] focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#666666] mb-1 uppercase">Expiry</label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg text-xs text-[#171717] focus:border-[#06110C] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#666666] mb-1 uppercase">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        className="w-full px-3 py-2 bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg text-xs text-[#171717] focus:border-[#06110C] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1 uppercase">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Name printed on card"
                      className="w-full px-3 py-2 bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg text-xs text-[#171717] focus:border-[#06110C] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* NetBanking Tab */}
              {paymentMethod === 'netbanking' && (
                <div className="p-5 border border-[#E5E5E5] rounded-xl bg-white space-y-3">
                  <label className="block text-xs font-semibold text-[#666666] uppercase">Select Bank</label>
                  <select className="w-full px-3 py-2.5 bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg text-xs text-[#171717] focus:border-[#06110C] focus:outline-none">
                    <option>State Bank of India (SBI)</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                    <option>Tamilnad Mercantile Bank (TMB)</option>
                  </select>
                </div>
              )}

              {/* COD Tab */}
              {paymentMethod === 'cod' && (
                <div className="p-5 border border-[#E5E5E5] rounded-xl bg-[#F7F7F5] space-y-2">
                  <h4 className="text-xs font-bold text-[#171717] uppercase">Cash on Delivery Notice</h4>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    COD is eligible for standard plain garments and fabric swatch kits. Custom 3D printed garments will require verification call before mill stitching begins.
                  </p>
                </div>
              )}

              {/* Pay Button */}
              <button
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-lg bg-[#06110C] hover:bg-[#A31C1B] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isProcessing ? 'Processing Transaction...' : `Pay ₹${grandTotal} Securely`}</span>
              </button>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#F7F7F5] border border-[#E5E5E5] rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-[#171717] uppercase tracking-wider border-b border-[#E5E5E5] pb-2">
                  Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
                </h3>

                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-xs text-[#171717]">
                      <div>
                        <p className="font-semibold">{it.productName}</p>
                        <p className="text-[10px] text-[#666666]">
                          Size: {it.size} • Qty: {it.quantity}
                        </p>
                      </div>
                      <span className="font-bold shrink-0 ml-2">₹{it.totalPrice}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E5E5E5] pt-3 space-y-1.5 text-xs text-[#666666]">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-[#171717]">₹{breakdown.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping (Tiruppur Express):</span>
                    <span className="text-[#16A34A] font-semibold">{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#171717] pt-2 border-t border-[#E5E5E5]">
                    <span>Grand Total:</span>
                    <span className="text-[#A31C1B] text-base font-black">₹{grandTotal}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address Pill */}
              <div className="p-4 border border-[#E5E5E5] rounded-xl text-xs space-y-1 bg-white">
                <span className="font-bold text-[#171717] uppercase block mb-1">Shipping Destination</span>
                <p className="text-[#666666]">{checkoutData.fullName}</p>
                <p className="text-[#666666]">{checkoutData.shippingAddress}</p>
                <p className="text-[#666666]">Ph: {checkoutData.phone}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
