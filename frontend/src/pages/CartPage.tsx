import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, Sparkles, Package, ShieldCheck, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, breakdown, itemCount } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-white font-poppins text-[#171717] flex items-center justify-center px-4">
        <div className="p-10 sm:p-14 rounded-2xl border border-[#E5E5E5] bg-[#F7F7F5] text-center max-w-md w-full space-y-6 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-white border border-[#E5E5E5] text-[#06110C] flex items-center justify-center mx-auto shadow-xs">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#171717]">Your Cart is Empty</h2>
          <p className="text-xs text-[#666666] leading-relaxed">
            Customize a bespoke 3D T-shirt in our interactive studio or order a ₹69 fabric swatch sample from Tiruppur.
          </p>
          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              to="/customizer"
              className="py-3 px-6 rounded-lg bg-[#06110C] hover:bg-[#A31C1B] text-xs font-bold text-white shadow-xs transition-colors"
            >
              Start 3D Customizer
            </Link>
            <Link
              to="/products"
              className="py-3 px-6 rounded-lg bg-white border border-[#E5E5E5] hover:bg-[#E5E5E5] text-xs font-semibold text-[#171717] transition-colors"
            >
              Explore 65 Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white font-poppins text-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E5E5]">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#171717] uppercase tracking-tight">Shopping Cart</h1>
            <p className="text-xs text-[#666666] mt-1">
              Direct factory order fulfillment from KVR Nagar, Tiruppur
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-[#A31C1B] hover:underline"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-[#E5E5E5] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs hover:border-[#171717] transition-all"
              >
                {/* Item Details */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-xl border border-[#E5E5E5] flex items-center justify-center shrink-0 shadow-inner"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.itemType === 'CUSTOM' ? (
                      <Sparkles className="w-5 h-5 text-[#A31C1B]" />
                    ) : item.itemType === 'SAMPLE' ? (
                      <Package className="w-5 h-5 text-[#06110C]" />
                    ) : null}
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-[#171717]">{item.productName}</h3>
                    <p className="text-xs text-[#A31C1B] font-medium">{item.companyName}</p>
                    <div className="flex items-center gap-3 text-[11px] text-[#666666] mt-1">
                      <span>Size: <strong className="text-[#171717]">{item.size}</strong></span>
                      <span>•</span>
                      <span>Color: <strong className="text-[#171717]">{item.color}</strong></span>
                      <span>•</span>
                      <span>Type: <strong className="text-[#06110C] uppercase">{item.itemType}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Price */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E5E5E5]">
                  <div className="flex items-center bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg p-0.5">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded bg-white text-[#171717] font-bold text-xs hover:bg-[#E5E5E5]"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-xs text-[#171717]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded bg-white text-[#171717] font-bold text-xs hover:bg-[#E5E5E5]"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-black text-sm text-[#171717]">₹{item.totalPrice}</p>
                    <p className="text-[10px] text-[#666666]">₹{item.unitPrice} each</p>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-[#A31C1B] hover:text-[#851615] hover:bg-[#A31C1B]/10 rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Link
                to="/products"
                className="text-xs font-semibold text-[#06110C] hover:text-[#A31C1B] flex items-center gap-1.5"
              >
                <span>&larr; Continue Exploring Products</span>
              </Link>
            </div>
          </div>

          {/* Cart Summary Card */}
          <div className="lg:col-span-4 bg-[#F7F7F5] border border-[#E5E5E5] rounded-2xl p-6 shadow-xs space-y-5">
            <h3 className="font-bold text-sm uppercase tracking-wider text-[#171717] border-b border-[#E5E5E5] pb-3">
              Order Calculation
            </h3>

            <div className="space-y-2 text-xs text-[#666666]">
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} items):</span>
                <span className="font-semibold text-[#171717]">₹{breakdown.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping (Tiruppur Mill):</span>
                <span className="text-[#16A34A] font-semibold">{breakdown.shippingFee === 0 ? 'FREE' : `₹${breakdown.shippingFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Applicable GST (5%):</span>
                <span className="font-semibold text-[#171717]">₹{breakdown.taxAmount}</span>
              </div>
              <div className="border-t border-[#E5E5E5] pt-3 flex justify-between items-center text-sm font-bold text-[#171717]">
                <span>Total Amount:</span>
                <span className="text-[#A31C1B] text-lg font-black">₹{breakdown.totalAmount}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-lg bg-[#06110C] hover:bg-[#A31C1B] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center text-[10px] text-[#666666] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Direct Factory Guarantee • 100% Quality Inspected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
