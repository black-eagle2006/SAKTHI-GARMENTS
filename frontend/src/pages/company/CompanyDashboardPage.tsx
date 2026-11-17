import React, { useState, useEffect } from 'react';
import {
  Building2,
  Package,
  Layers,
  Clock,
  CheckCircle2,
  Truck,
  Plus,
  AlertCircle,
  TrendingUp,
  FileText,
  Save,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OrderStatus } from '../../types';
import apiClient from '../../api/client';

export const CompanyDashboardPage: React.FC = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'quotations'>('orders');

  // Manufacturing orders
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'SG-842199',
      customerName: 'Anandha Kumar',
      productName: 'Sakthi Bio-Wash Custom T-Shirt',
      size: 'L',
      color: '#FFFFFF',
      quantity: 1,
      status: 'IN_PRODUCTION' as OrderStatus,
      totalAmount: 399,
      trackingNumber: 'TFT-7712390',
      courierName: 'Tiruppur FastTrack Express',
    },
    {
      id: 2,
      orderNumber: 'SG-902181',
      customerName: 'Priya Sundaram',
      productName: 'Fabric Swatch Sample Pack',
      size: 'Sample',
      color: 'Assorted Swatches',
      quantity: 1,
      status: 'ACCEPTED' as OrderStatus,
      totalAmount: 69,
      trackingNumber: '',
      courierName: '',
    },
    {
      id: 3,
      orderNumber: 'SG-618820',
      customerName: 'Karthik Raja',
      productName: 'Plain Oversized Cotton Crew',
      size: 'XL',
      color: '#171717',
      quantity: 5,
      status: 'READY_TO_SHIP' as OrderStatus,
      totalAmount: 1495,
      trackingNumber: 'BLUEDART-882190',
      courierName: 'Blue Dart Express',
    },
  ]);

  // Inventory Stock
  const [inventory, setInventory] = useState([
    { size: 'S', color: 'Pure White', stock: 150, reorderLevel: 30 },
    { size: 'M', color: 'Pure White', stock: 280, reorderLevel: 50 },
    { size: 'L', color: 'Pure White', stock: 320, reorderLevel: 50 },
    { size: 'XL', color: 'Pure White', stock: 190, reorderLevel: 40 },
    { size: 'XXL', color: 'Pure White', stock: 95, reorderLevel: 25 },
    { size: 'XXXL', color: 'Pure White', stock: 45, reorderLevel: 20 },
    { size: 'L', color: 'Pitch Black', stock: 240, reorderLevel: 50 },
    { size: 'XL', color: 'Forest Green', stock: 110, reorderLevel: 30 },
  ]);

  const [trackingModalOrder, setTrackingModalOrder] = useState<any | null>(null);
  const [courierInput, setCourierInput] = useState('Tiruppur FastTrack Express');
  const [awbInput, setAwbInput] = useState('');

  useEffect(() => {
    const compId = user?.companyId || 1;
    apiClient
      .get(`/orders/company/${compId}`)
      .then((res) => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setOrders(
            res.data.map((o: any) => ({
              id: o.id,
              orderNumber: o.orderNumber,
              customerName: o.shippingFullName || 'Customer',
              productName: o.items?.[0]?.productName || 'Sakthi Bio-Wash Custom T-Shirt',
              size: o.items?.[0]?.size || 'L',
              color: o.items?.[0]?.color || '#FFFFFF',
              quantity: o.items?.[0]?.quantity || 1,
              status: o.status as OrderStatus,
              totalAmount: o.totalAmount,
              trackingNumber: o.trackingNumber || '',
              courierName: o.courierName || '',
            }))
          );
        }
      })
      .catch(() => {});
  }, [user]);

  const updateOrderStatus = (orderId: number, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    apiClient.patch(`/orders/${orderId}/status`, { status: newStatus }).catch(() => {});
  };

  const handleSaveShipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingModalOrder) return;
    const finalTracking = awbInput || 'TFT-' + Math.floor(100000 + Math.random() * 900000);
    setOrders((prev) =>
      prev.map((o) =>
        o.id === trackingModalOrder.id
          ? {
              ...o,
              status: 'SHIPPED',
              courierName: courierInput,
              trackingNumber: finalTracking,
            }
          : o
      )
    );
    apiClient
      .patch(`/orders/${trackingModalOrder.id}/status`, {
        status: 'SHIPPED',
        courierName: courierInput,
        trackingNumber: finalTracking,
      })
      .catch(() => {});
    setTrackingModalOrder(null);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#F7F7F5] text-[#171717] font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E5E5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#06110C] border border-[#171717] flex items-center justify-center font-black text-2xl text-white shadow-xs">
              <Building2 className="w-8 h-8 text-[#A31C1B]" />
            </div>
            <div>
              <span className="text-[10px] text-[#A31C1B] uppercase tracking-wider font-bold">
                Manufacturer Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#171717]">
                SAKTHI GARMENTS
              </h1>
              <p className="text-xs text-[#666666] mt-0.5">
                KVR Nagar, Tiruppur — 641604 • Direct Mill Unit
              </p>
            </div>
          </div>

          <div className="flex bg-[#F7F7F5] p-1 rounded-2xl border border-[#E5E5E5]">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-[#06110C] text-white shadow-xs'
                  : 'text-[#666666] hover:text-[#171717]'
              }`}
            >
              Live Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'inventory'
                  ? 'bg-[#06110C] text-white shadow-xs'
                  : 'text-[#666666] hover:text-[#171717]'
              }`}
            >
              Inventory Matrix
            </button>
          </div>
        </div>

        {/* Manufacturing KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5] shadow-xs">
            <p className="text-xs text-[#666666] font-semibold">Orders in Production</p>
            <p className="text-2xl font-black text-[#06110C] mt-1">
              {orders.filter((o) => o.status === 'IN_PRODUCTION').length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5] shadow-xs">
            <p className="text-xs text-[#666666] font-semibold">Ready to Ship</p>
            <p className="text-2xl font-black text-[#A31C1B] mt-1">
              {orders.filter((o) => o.status === 'READY_TO_SHIP').length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5] shadow-xs">
            <p className="text-xs text-[#666666] font-semibold">Sample Swatch Orders</p>
            <p className="text-2xl font-black text-[#171717] mt-1">12 Orders</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5] shadow-xs">
            <p className="text-xs text-[#666666] font-semibold">Gross Factory Sales</p>
            <p className="text-2xl font-black text-[#16A34A] mt-1">₹42,850</p>
          </div>
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E5E5] space-y-6 shadow-sm">
            <h3 className="font-bold text-base text-[#171717]">Production Orders & Workflows</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5E5E5] text-[#666666] uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Order Ref</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Garment & Spec</th>
                    <th className="py-3 px-3">Total</th>
                    <th className="py-3 px-3">Current Status</th>
                    <th className="py-3 px-3">Production Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#F7F7F5] transition-colors">
                      <td className="py-3.5 px-3 font-mono font-bold text-[#06110C]">{ord.orderNumber}</td>
                      <td className="py-3.5 px-3 font-medium text-[#171717]">{ord.customerName}</td>
                      <td className="py-3.5 px-3">
                        <p className="text-[#171717] font-medium">{ord.productName}</p>
                        <p className="text-[10px] text-[#666666]">
                          Qty: {ord.quantity} • Size: {ord.size}
                        </p>
                      </td>
                      <td className="py-3.5 px-3 font-bold text-[#171717]">₹{ord.totalAmount}</td>
                      <td className="py-3.5 px-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717]">
                          {ord.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5">
                          {ord.status === 'ACCEPTED' && (
                            <button
                              onClick={() => updateOrderStatus(ord.id, 'IN_PRODUCTION')}
                              className="px-2.5 py-1 rounded-lg bg-[#06110C] text-white hover:bg-[#A31C1B] text-[11px] font-semibold transition-colors"
                            >
                              Start Production
                            </button>
                          )}
                          {ord.status === 'IN_PRODUCTION' && (
                            <button
                              onClick={() => updateOrderStatus(ord.id, 'READY_TO_SHIP')}
                              className="px-2.5 py-1 rounded-lg bg-[#06110C] text-white hover:bg-[#A31C1B] text-[11px] font-semibold transition-colors"
                            >
                              QC Passed & Pack
                            </button>
                          )}
                          {ord.status === 'READY_TO_SHIP' && (
                            <button
                              onClick={() => setTrackingModalOrder(ord)}
                              className="px-2.5 py-1 rounded-lg bg-[#06110C] text-white hover:bg-[#16A34A] text-[11px] font-bold flex items-center gap-1 transition-colors"
                            >
                              <Truck className="w-3 h-3" />
                              <span>Dispatch</span>
                            </button>
                          )}
                          {ord.status === 'SHIPPED' && (
                            <span className="text-[10px] text-[#16A34A] font-mono font-semibold">
                              AWB: {ord.trackingNumber}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY MATRIX */}
        {activeTab === 'inventory' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E5E5] space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#171717]">Raw Garment Stock Matrix</h3>
              <span className="text-xs text-[#06110C] font-semibold">100% Combed Bio-Wash Blank Inventory</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {inventory.map((inv, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E5E5] space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#171717]">Size: {inv.size}</span>
                    <span className="text-[#666666]">{inv.color}</span>
                  </div>
                  <div className="flex items-baseline justify-between pt-2">
                    <span className="text-2xl font-black text-[#06110C]">{inv.stock}</span>
                    <span className="text-[10px] text-[#A3A3A3]">Units in Warehouse</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* DISPATCH / AWB MODAL */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-50 bg-[#171717]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E5] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-[#171717]">Ship Order #{trackingModalOrder.orderNumber}</h3>
            <p className="text-xs text-[#666666]">Enter shipment tracking credentials for the customer.</p>

            <form onSubmit={handleSaveShipment} className="space-y-4 text-xs">
              <div>
                <label className="text-[#666666] block mb-1 font-semibold">Courier Partner</label>
                <input
                  type="text"
                  required
                  value={courierInput}
                  onChange={(e) => setCourierInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C]"
                />
              </div>

              <div>
                <label className="text-[#666666] block mb-1 font-semibold">Tracking Number / AWB</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TFT-8491203"
                  value={awbInput}
                  onChange={(e) => setAwbInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTrackingModalOrder(null)}
                  className="flex-1 py-2.5 rounded-xl bg-[#F7F7F5] hover:bg-[#E5E5E5] text-[#666666] font-semibold border border-[#E5E5E5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#06110C] hover:bg-[#A31C1B] text-white font-bold transition-colors"
                >
                  Confirm Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboardPage;
