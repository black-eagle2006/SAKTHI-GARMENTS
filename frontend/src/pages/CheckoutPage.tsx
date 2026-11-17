import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Lock, MapPin, Truck, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { SAKTHI_BRAND_CONFIG } from '../data/productsData';

export const CheckoutPage: React.FC = () => {
  const { items, breakdown } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: user?.fullName || '',
    phone: user?.phoneNumber || '',
    email: user?.email || '',
    doorNo: '',
    street: '',
    city: 'Tiruppur',
    state: 'Tamil Nadu',
    pincode: '641604',
    notes: '',
  });

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.doorNo || !address.street || !address.pincode) {
      alert('Please fill in your recipient name, phone, door number, street, and pincode.');
      return;
    }

    const fullShippingAddress = `${address.doorNo}, ${address.street}, ${address.city}, ${address.state} - ${address.pincode}`;

    navigate('/payment', {
      state: {
        checkoutData: {
          fullName: address.fullName,
          phone: address.phone,
          email: address.email,
          shippingAddress: fullShippingAddress,
          notes: address.notes,
        },
      },
    });
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white font-poppins text-[#171717]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E5E5E5] pb-4 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F7F7F5] border border-[#E5E5E5] rounded-full text-xs font-semibold text-[#171717] mb-2 shadow-xs">
            <Lock className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Direct Mill Dispatch Checkout</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#171717] uppercase tracking-tight">
            CHECKOUT DETAILS
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
            Step 1 of 2: Shipping Destination Information
          </p>
        </div>

        <form onSubmit={handleProceedToPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Shipping Address Inputs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-[#E5E5E5] bg-[#F7F7F5] space-y-4">
              <h3 className="font-bold text-sm uppercase text-[#171717] flex items-center gap-2 border-b border-[#E5E5E5] pb-3">
                <MapPin className="w-4 h-4 text-[#A31C1B]" />
                <span>Shipping Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-[#666666] block mb-1 font-semibold uppercase">Recipient Name *</label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C]"
                    placeholder="e.g. S. Arunkumar"
                  />
                </div>

                <div>
                  <label className="text-[#666666] block mb-1 font-semibold uppercase">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C]"
                    placeholder="e.g. 9361832472"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="text-[#666666] block mb-1 font-semibold uppercase">Email Address (For Invoicing)</label>
                <input
                  type="email"
                  value={address.email}
                  onChange={(e) => setAddress({ ...address, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C]"
                  placeholder="e.g. arun@gmail.com"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-[#666666] block mb-1 font-semibold uppercase">Flat / Door No / Building *</label>
                  <input
                    type="text"
                    required
                    value={address.doorNo}
                    onChange={(e) => setAddress({ ...address, doorNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C]"
                    placeholder="e.g. Door No. 14/B, 2nd Floor"
                  />
                </div>
                <div>
                  <label className="text-[#666666] block mb-1 font-semibold uppercase">Street / Landmark *</label>
                  <input
                    type="text"
                    required
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C]"
                    placeholder="e.g. KVR Nagar, Near Chennai Bakes"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-[#666666] block mb-1 font-semibold uppercase">City *</label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C]"
                  />
                </div>
                <div>
                  <label className="text-[#666666] block mb-1 font-semibold uppercase">State *</label>
                  <input
                    type="text"
                    required
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C]"
                  />
                </div>
                <div>
                  <label className="text-[#666666] block mb-1 font-semibold uppercase">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C]"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="text-[#666666] block mb-1 font-semibold uppercase">Delivery Notes / Tailoring Remarks</label>
                <textarea
                  rows={2}
                  value={address.notes}
                  onChange={(e) => setAddress({ ...address, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C] resize-none"
                  placeholder="Special instructions for tailoring or logistics dispatch..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-[#06110C] hover:bg-[#A31C1B] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Continue to Payment (UPI, Cards, NetBanking)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5 bg-[#F7F7F5] border border-[#E5E5E5] rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-sm uppercase text-[#171717] border-b border-[#E5E5E5] pb-3">
              Order Items ({items.length})
            </h3>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map((it) => (
                <div key={it.id} className="flex justify-between items-start text-xs border-b border-[#E5E5E5] pb-2">
                  <div>
                    <p className="font-bold text-[#171717]">{it.productName}</p>
                    <p className="text-[10px] text-[#666666]">
                      Size: {it.size} | Qty: {it.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-[#171717]">₹{it.totalPrice}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 space-y-1.5 text-xs text-[#666666]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-[#171717]">₹{breakdown.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-[#16A34A] font-semibold">{breakdown.shippingFee === 0 ? 'FREE' : `₹${breakdown.shippingFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%):</span>
                <span className="font-semibold text-[#171717]">₹{breakdown.taxAmount}</span>
              </div>
              <div className="border-t border-[#E5E5E5] pt-3 flex justify-between items-center text-sm font-bold text-[#171717]">
                <span>Total Amount:</span>
                <span className="text-[#A31C1B] text-lg font-black">₹{breakdown.totalAmount}</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
