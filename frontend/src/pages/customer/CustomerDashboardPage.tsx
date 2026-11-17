import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Sparkles,
  Layers,
  Clock,
  ChevronRight,
  User,
  ShoppingBag,
  ExternalLink,
  Plus,
  Compass,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/client';

export const CustomerDashboardPage: React.FC = () => {
  const { user } = useAuth();

  const [orders, setOrders] = useState<any[]>(() => {
    try {
      const local = localStorage.getItem('sakthi_local_orders');
      if (local) return JSON.parse(local);
    } catch {}
    return [
      {
        id: 101,
        orderNumber: 'SG-842199',
        companyName: 'SAKTHI GARMENTS (Tiruppur)',
        status: 'IN_PRODUCTION',
        totalAmount: 399,
        itemsCount: 1,
        createdAt: '2026-10-14',
      },
      {
        id: 102,
        orderNumber: 'SG-710442',
        companyName: 'SAKTHI GARMENTS (Tiruppur)',
        status: 'DELIVERED',
        totalAmount: 69,
        itemsCount: 1,
        createdAt: '2026-10-10',
      },
    ];
  });

  const [savedDesigns, setSavedDesigns] = useState<any[]>(() => {
    try {
      const local = localStorage.getItem('sakthi_local_designs');
      if (local) return JSON.parse(local);
    } catch {}
    return [
      {
        id: 1,
        title: 'Minimalist Combed Cotton Print',
        tshirtColor: '#171717',
        createdAt: '2026-10-15',
        layersCount: 3,
      },
      {
        id: 2,
        title: 'Sakthi Bio-Wash Oversize',
        tshirtColor: '#FFFFFF',
        createdAt: '2026-10-13',
        layersCount: 2,
      },
    ];
  });

  useEffect(() => {
    if (user?.id) {
      apiClient
        .get(`/orders/customer/${user.id}`)
        .then((res) => {
          if (res.data && Array.isArray(res.data) && res.data.length > 0) {
            setOrders(res.data);
          }
        })
        .catch(() => {});
    }
  }, [user?.id]);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#F7F7F5] text-[#171717] font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E5E5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#06110C] border border-[#171717] flex items-center justify-center font-black text-2xl text-white shadow-xs">
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <span className="text-[10px] text-[#A31C1B] uppercase tracking-wider font-bold">
                Customer Space
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#171717]">
                Welcome, {user?.fullName || 'Creator'}!
              </h1>
              <p className="text-xs text-[#666666] mt-0.5">{user?.email}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              to="/customizer"
              className="px-5 py-2.5 rounded-xl bg-[#06110C] hover:bg-[#A31C1B] text-xs font-bold text-white uppercase tracking-wider shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#FACC15]" />
              <span>Launch 3D Studio</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5] shadow-xs">
            <p className="text-xs text-[#666666] font-semibold">Active Orders</p>
            <p className="text-2xl font-black text-[#06110C] mt-1">
              {orders.filter((o) => o.status !== 'DELIVERED').length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5] shadow-xs">
            <p className="text-xs text-[#666666] font-semibold">Saved 3D Designs</p>
            <p className="text-2xl font-black text-[#171717] mt-1">
              {savedDesigns.length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5] shadow-xs">
            <p className="text-xs text-[#666666] font-semibold">Cloth Samples</p>
            <p className="text-2xl font-black text-[#A31C1B] mt-1">
              ₹69 Swatch Pack
            </p>
          </div>
        </div>

        {/* Grid: Recent Orders & Saved Designs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Orders Column */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#E5E5E5] space-y-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
              <h3 className="font-bold text-base text-[#171717] flex items-center gap-2">
                <Package className="w-4 h-4 text-[#A31C1B]" />
                <span>Recent Production Orders</span>
              </h3>
              <span className="text-xs text-[#666666] font-medium">{orders.length} Total</span>
            </div>

            <div className="space-y-3">
              {orders.map((ord) => (
                <div
                  key={ord.orderNumber}
                  className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E5E5] hover:border-[#171717] transition-all flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#171717]">{ord.orderNumber}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white border border-[#E5E5E5] text-[#171717]">
                        {ord.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#666666] mt-1">{ord.companyName}</p>
                    <p className="text-[10px] text-[#A3A3A3]">Ordered: {ord.createdAt}</p>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <div>
                      <p className="text-sm font-bold text-[#171717]">₹{ord.totalAmount}</p>
                    </div>
                    <Link
                      to={`/track/${ord.orderNumber}`}
                      className="p-2 rounded-xl bg-white hover:bg-[#06110C] hover:text-white text-[#171717] border border-[#E5E5E5] transition-colors"
                      title="Track Order"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved 3D Designs Column */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E5E5E5] space-y-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
              <h3 className="font-bold text-base text-[#171717] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A31C1B]" />
                <span>Saved 3D Projects</span>
              </h3>
              <Link
                to="/customizer"
                className="text-xs text-[#A31C1B] font-bold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New</span>
              </Link>
            </div>

            <div className="space-y-3">
              {savedDesigns.map((des) => (
                <div
                  key={des.id}
                  className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E5E5] hover:border-[#171717] transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-xl border border-[#E5E5E5] shrink-0 shadow-xs"
                      style={{ backgroundColor: des.tshirtColor }}
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#171717] group-hover:text-[#A31C1B] transition-colors">
                        {des.title}
                      </h4>
                      <p className="text-[10px] text-[#666666] mt-0.5">
                        {des.layersCount || 2} Custom Decals • {des.createdAt}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/customizer"
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#06110C] hover:text-white text-xs font-semibold text-[#171717] border border-[#E5E5E5] transition-colors"
                  >
                    Open in 3D
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
