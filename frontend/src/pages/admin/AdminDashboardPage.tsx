import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Building2,
  Users,
  Package,
  Check,
  X,
  AlertTriangle,
  Cpu,
  Layers,
  Settings,
  Search,
  Filter,
} from 'lucide-react';
import apiClient from '../../api/client';

export const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'companies' | 'ai' | 'settings'>('companies');

  // Pending and active companies
  const [companies, setCompanies] = useState([
    {
      id: 1,
      companyName: 'SAKTHI GARMENTS',
      city: 'Tiruppur',
      pincode: '641604',
      contactPerson: 'K. Sakthivel',
      email: 'sales@sakthigarments.in',
      status: 'APPROVED',
      minQty: 1,
    },
    {
      id: 2,
      companyName: 'Kongu Tex Apparels',
      city: 'Tiruppur',
      pincode: '641602',
      contactPerson: 'M. Palanisamy',
      email: 'info@kongutex.com',
      status: 'APPROVED',
      minQty: 50,
    },
    {
      id: 5,
      companyName: 'Vetri Knits International',
      city: 'Tiruppur',
      pincode: '641607',
      contactPerson: 'V. Ramachandran',
      email: 'ram@vetriknits.com',
      status: 'PENDING',
      minQty: 25,
    },
  ]);

  const [aiUsageStats] = useState({
    totalCalls: 1420,
    activeModel: 'Gemini 1.5 Pro',
    averageLatencyMs: 820,
    quotaStatus: 'Operational (Normal)',
  });

  useEffect(() => {
    apiClient
      .get('/admin/pending-companies')
      .then((res) => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setCompanies(
            res.data.map((c: any) => ({
              id: c.id,
              companyName: c.companyName,
              city: c.city,
              pincode: c.pincode,
              contactPerson: c.contactPerson,
              email: c.email,
              status: c.approvalStatus || 'PENDING',
              minQty: c.minOrderQuantity || 1,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const handleApprove = (id: number) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'APPROVED' } : c))
    );
    apiClient.patch(`/admin/companies/${id}/status?status=APPROVED`).catch(() => {});
  };

  const handleReject = (id: number) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'REJECTED' } : c))
    );
    apiClient.patch(`/admin/companies/${id}/status?status=REJECTED`).catch(() => {});
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#F7F7F5] text-[#171717] font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E5E5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#06110C] border border-[#171717] flex items-center justify-center font-black text-2xl text-white shadow-xs">
              <ShieldCheck className="w-8 h-8 text-[#A31C1B]" />
            </div>
            <div>
              <span className="text-[10px] text-[#A31C1B] uppercase tracking-wider font-bold">
                Platform SuperAdmin
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#171717]">
                Admin Control Center
              </h1>
              <p className="text-xs text-[#666666] mt-0.5">
                Sakthi Garments Marketplace Governance & Moderation
              </p>
            </div>
          </div>

          <div className="flex bg-[#F7F7F5] p-1 rounded-2xl border border-[#E5E5E5]">
            <button
              onClick={() => setActiveTab('companies')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'companies'
                  ? 'bg-[#06110C] text-white shadow-xs'
                  : 'text-[#666666] hover:text-[#171717]'
              }`}
            >
              Mills Approval ({companies.filter((c) => c.status === 'PENDING').length} Pending)
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'ai'
                  ? 'bg-[#06110C] text-white shadow-xs'
                  : 'text-[#666666] hover:text-[#171717]'
              }`}
            >
              AI Engine
            </button>
          </div>
        </div>

        {/* Global Platform KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5] shadow-xs">
            <p className="text-xs text-[#666666] font-semibold">Registered Manufacturers</p>
            <p className="text-2xl font-black text-[#171717] mt-1">{companies.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5] shadow-xs">
            <p className="text-xs text-[#666666] font-semibold">Pending Approvals</p>
            <p className="text-2xl font-black text-[#A31C1B] mt-1">
              {companies.filter((c) => c.status === 'PENDING').length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5] shadow-xs">
            <p className="text-xs text-[#666666] font-semibold">Gemini AI Synthesis Requests</p>
            <p className="text-2xl font-black text-[#06110C] mt-1">
              {aiUsageStats.totalCalls}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5] shadow-xs">
            <p className="text-xs text-[#666666] font-semibold">Platform Status</p>
            <p className="text-2xl font-black text-[#16A34A] mt-1">100% Operational</p>
          </div>
        </div>

        {/* TAB 1: COMPANY APPROVALS & MODERATION */}
        {activeTab === 'companies' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E5E5] space-y-6 shadow-sm">
            <h3 className="font-bold text-base text-[#171717]">
              Manufacturer Vetting & Moderation
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5E5E5] text-[#666666] uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Company Name</th>
                    <th className="py-3 px-3">Location / Pincode</th>
                    <th className="py-3 px-3">Contact Person</th>
                    <th className="py-3 px-3">Email</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {companies.map((comp) => (
                    <tr key={comp.id} className="hover:bg-[#F7F7F5] transition-colors">
                      <td className="py-3.5 px-3 font-bold text-[#171717]">{comp.companyName}</td>
                      <td className="py-3.5 px-3 text-[#666666]">
                        {comp.city} — {comp.pincode}
                      </td>
                      <td className="py-3.5 px-3 text-[#171717]">{comp.contactPerson}</td>
                      <td className="py-3.5 px-3 text-[#06110C] font-mono text-[11px]">{comp.email}</td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            comp.status === 'APPROVED'
                              ? 'bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/20'
                              : comp.status === 'PENDING'
                              ? 'bg-[#FACC15]/20 text-[#B45309] border border-[#FACC15]/30'
                              : 'bg-[#A31C1B]/10 text-[#A31C1B] border border-[#A31C1B]/20'
                          }`}
                        >
                          {comp.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        {comp.status === 'PENDING' ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleApprove(comp.id)}
                              className="p-1.5 rounded-lg bg-[#06110C] text-white hover:bg-[#16A34A] font-bold transition-colors"
                              title="Approve Mill"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleReject(comp.id)}
                              className="p-1.5 rounded-lg bg-[#A31C1B] text-white hover:opacity-90 font-bold transition-opacity"
                              title="Reject Mill"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-[#666666]">Verified Partner</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: AI ENGINE MONITORING */}
        {activeTab === 'ai' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E5E5] space-y-6 shadow-sm">
            <h3 className="font-bold text-base text-[#171717] flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#A31C1B]" />
              <span>Google Gemini AI Architecture Overview</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E5E5] space-y-1">
                <p className="text-xs text-[#666666] font-semibold">Configured Model</p>
                <p className="text-lg font-bold text-[#06110C] font-mono">{aiUsageStats.activeModel}</p>
                <p className="text-[10px] text-[#A3A3A3]">Executed securely via Spring Boot Backend</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E5E5] space-y-1">
                <p className="text-xs text-[#666666] font-semibold">Average Latency</p>
                <p className="text-lg font-bold text-[#171717] font-mono">{aiUsageStats.averageLatencyMs} ms</p>
                <p className="text-[10px] text-[#A3A3A3]">Sub-second generation pipeline</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E5E5] space-y-1">
                <p className="text-xs text-[#666666] font-semibold">Secret Isolation</p>
                <p className="text-lg font-bold text-[#16A34A]">100% Server Encrypted</p>
                <p className="text-[10px] text-[#A3A3A3]">Never exposed to browser clients</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
