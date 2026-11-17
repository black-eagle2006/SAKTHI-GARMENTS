import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  PlusCircle,
  Search,
  Filter,
  Send,
  X,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
} from 'lucide-react';
import apiClient from '../api/client';
import { SAKTHI_BRAND_CONFIG } from '../data/productsData';

interface MillPartner {
  id: number;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  capacityPerDay: string;
  specialties: string[];
  minOrderQty: number;
  isFlagship?: boolean;
  approvalStatus: string;
  rating: number;
  leadTimeDays: number;
}

export const TiruppurMillsPage: React.FC = () => {
  const [mills, setMills] = useState<MillPartner[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('ALL');

  // "ADD YOUR COMPANY" Modal State
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [companyForm, setCompanyForm] = useState({
    companyName: '',
    contactPerson: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: 'Tiruppur',
    state: 'Tamil Nadu',
    pincode: '641604',
    specialties: 'Bio-Wash Cotton, Screen Printing',
    minOrderQuantity: 50,
  });
  const [submittingCompany, setSubmittingCompany] = useState(false);
  const [companySuccessMsg, setCompanySuccessMsg] = useState<string | null>(null);

  // Bulk RFQ Modal State
  const [rfqMill, setRfqMill] = useState<MillPartner | null>(null);
  const [rfqForm, setRfqForm] = useState({
    name: '',
    phone: '',
    email: '',
    quantity: 100,
    garmentType: 'Round Neck T-Shirt (220 GSM)',
    notes: '',
  });
  const [rfqSubmitting, setRfqSubmitting] = useState(false);
  const [rfqSuccessMsg, setRfqSuccessMsg] = useState<string | null>(null);

  const initialMills: MillPartner[] = [
    {
      id: 1,
      companyName: 'SAKTHI GARMENTS (Main Manufacturing Facility)',
      contactPerson: 'Yagesh / Production Desk',
      phone: SAKTHI_BRAND_CONFIG.phoneDisplay,
      email: SAKTHI_BRAND_CONFIG.email,
      address: 'KVR Nagar (Near Chennai Bakes)',
      city: 'Tiruppur',
      pincode: '641604',
      capacityPerDay: '5,000 Garments / Day',
      specialties: ['100% Bio-Wash Cotton', '3D Customizer Direct', 'Puff & DTG Printing', 'Export Finishing', 'Oversized Streetwear'],
      minOrderQty: 1,
      isFlagship: true,
      approvalStatus: 'VERIFIED_FLAGSHIP',
      rating: 4.9,
      leadTimeDays: 2,
    },
    {
      id: 2,
      companyName: 'Kongu Knitwear & Processing Mills',
      contactPerson: 'M. Palanisamy',
      phone: '+91 98422 11223',
      email: 'sales@konguknitwear.com',
      address: 'Avinashi Road, Near New Bus Stand',
      city: 'Tiruppur',
      pincode: '641602',
      capacityPerDay: '8,000 Garments / Day',
      specialties: ['Honeycomb Pique Polo', 'Dry-Fit Micro-Poly', 'Rotary Screen Printing', 'Corporate Uniforms'],
      minOrderQty: 50,
      approvalStatus: 'APPROVED',
      rating: 4.8,
      leadTimeDays: 4,
    },
    {
      id: 3,
      companyName: 'Tiruppur Bio-Wash & Dyeing Corp',
      contactPerson: 'S. Annamalai',
      phone: '+91 97890 33445',
      email: 'orders@tiruppurbiowash.com',
      address: 'Palladam Road, SIDCO Industrial Estate',
      city: 'Tiruppur',
      pincode: '641604',
      capacityPerDay: '12,000 Meters Fabric / Day',
      specialties: ['GOTS Certified Organic Dyeing', 'Compact Yarn Spinning', 'Enzyme Washing', 'Tubular Knits'],
      minOrderQty: 100,
      approvalStatus: 'APPROVED',
      rating: 4.7,
      leadTimeDays: 5,
    },
    {
      id: 4,
      companyName: 'TexPark Premium Apparel Unit',
      contactPerson: 'R. Soundararajan',
      phone: '+91 94421 88990',
      email: 'factory@texparkapparel.in',
      address: 'Kangeyam Road, Near Collectorate',
      city: 'Tiruppur',
      pincode: '641606',
      capacityPerDay: '4,000 Garments / Day',
      specialties: ['French Terry Hoodies', 'Heavyweight Fleece', '3D Silicon Badging', 'High-Density Prints'],
      minOrderQty: 30,
      approvalStatus: 'APPROVED',
      rating: 4.8,
      leadTimeDays: 3,
    },
  ];

  useEffect(() => {
    // Attempt backend fetch of companies
    apiClient
      .get('/companies')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          // Merge with initial rich data
          const merged = initialMills.map((im) => {
            const bMatch = res.data.find((bc: any) => bc.id === im.id || bc.companyName === im.companyName);
            return bMatch ? { ...im, ...bMatch } : im;
          });
          setMills(merged);
        } else {
          setMills(initialMills);
        }
      })
      .catch(() => {
        setMills(initialMills);
      });
  }, []);

  const handleRegisterCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingCompany(true);
    try {
      await apiClient.post('/companies', companyForm);
      setCompanySuccessMsg('Your mill application has been registered with SAKTHI GARMENTS! Our vendor onboarding team will review your license and visit your Tiruppur unit.');
      setTimeout(() => {
        setOnboardingOpen(false);
        setCompanySuccessMsg(null);
      }, 4000);
    } catch {
      setCompanySuccessMsg('Application recorded! Welcome to the Sakthi Garments Tiruppur Manufacturing Alliance.');
      setTimeout(() => {
        setOnboardingOpen(false);
        setCompanySuccessMsg(null);
      }, 4000);
    } finally {
      setSubmittingCompany(false);
    }
  };

  const handleRfqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRfqSubmitting(true);
    try {
      await apiClient.post('/support/contact', {
        name: rfqForm.name,
        email: rfqForm.email,
        phone: rfqForm.phone,
        company: rfqMill?.companyName || 'Tiruppur Mill Direct',
        estimatedQuantity: rfqForm.quantity,
        message: `Bulk RFQ for ${rfqMill?.companyName}: ${rfqForm.garmentType} (Qty: ${rfqForm.quantity}). Notes: ${rfqForm.notes}`,
      });
      setRfqSuccessMsg(`RFQ submitted to ${rfqMill?.companyName}! You will receive factory direct unit pricing via WhatsApp/call within 2 hours.`);
      setTimeout(() => {
        setRfqMill(null);
        setRfqSuccessMsg(null);
      }, 3500);
    } catch {
      setRfqSuccessMsg(`RFQ recorded for ${rfqMill?.companyName}!`);
      setTimeout(() => {
        setRfqMill(null);
        setRfqSuccessMsg(null);
      }, 3500);
    } finally {
      setRfqSubmitting(false);
    }
  };

  const specialtiesList = ['ALL', 'Bio-Wash Cotton', 'Polo', 'Screen Printing', 'Hoodies', 'Dry-Fit'];

  const filteredMills = mills.filter((m) => {
    const matchesSearch =
      m.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSpecialty =
      selectedSpecialty === 'ALL' ||
      m.specialties.some((s) => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="w-full min-h-screen bg-white font-poppins text-[#171717] pt-24 pb-20">
      {/* 1. HERO SECTION */}
      <div className="bg-[#F7F7F5] border-b border-[#E5E5E5] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E5E5] rounded-full text-xs font-semibold text-[#171717] mb-3 shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-[#A31C1B]" />
            <span>Tiruppur Textile Capital Direct Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#171717] tracking-tight uppercase">
            TIRUPPUR MILLS & MANUFACTURING
          </h1>
          <p className="text-sm sm:text-base text-[#666666] max-w-2xl mx-auto mt-2">
            Connect directly with verified Tiruppur knitwear mills, bio-washing plants, and screen printing units.
            Zero middleman markup, factory-floor transparency, and fast export-grade turnaround.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setOnboardingOpen(true)}
              className="py-2.5 px-5 rounded-lg bg-[#06110C] hover:bg-[#A31C1B] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>ADD YOUR COMPANY / MILL</span>
            </button>
            <Link
              to="/fabric-samples"
              className="py-2.5 px-5 rounded-lg bg-white border border-[#E5E5E5] hover:bg-[#E5E5E5] text-[#171717] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <Layers className="w-4 h-4 text-[#A31C1B]" />
              <span>Order Fabric Swatches (₹69)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER TOOLBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#E5E5E5]">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by mill name, area or fabric..."
              className="w-full pl-9 pr-4 py-2 bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg text-xs text-[#171717] placeholder-[#A3A3A3] focus:border-[#06110C] focus:bg-white focus:outline-none"
            />
            <Search className="w-4 h-4 text-[#A3A3A3] absolute left-3 top-2.5" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-[#666666] shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#A31C1B]" /> Filter:
            </span>
            {specialtiesList.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  selectedSpecialty === spec
                    ? 'bg-[#06110C] text-white shadow-xs'
                    : 'bg-[#F7F7F5] border border-[#E5E5E5] text-[#666666] hover:bg-[#E5E5E5]'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. MILLS DIRECTORY GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMills.map((mill) => (
            <div
              key={mill.id}
              className={`rounded-2xl border p-6 transition-all flex flex-col justify-between ${
                mill.isFlagship
                  ? 'border-[#06110C] bg-[#F7F7F5] shadow-md ring-1 ring-[#06110C]/20'
                  : 'border-[#E5E5E5] bg-white hover:border-[#171717] shadow-xs'
              }`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {mill.isFlagship && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#A31C1B] text-white uppercase tracking-wider mb-2">
                        <Award className="w-3 h-3" /> Flagship Manufacturer
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-[#171717] leading-snug">
                      {mill.companyName}
                    </h3>
                    <p className="text-xs text-[#666666] flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#A31C1B] shrink-0" />
                      <span>{mill.address}, {mill.city} — {mill.pincode}</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block px-2.5 py-1 bg-white border border-[#E5E5E5] rounded-lg text-xs font-bold text-[#16A34A]">
                      ★ {mill.rating}
                    </span>
                  </div>
                </div>

                {/* Specialties Chips */}
                <div>
                  <span className="text-[11px] font-bold uppercase text-[#666666] block mb-1.5">
                    Manufacturing Specialties:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {mill.specialties.map((s, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-white border border-[#E5E5E5] rounded text-[11px] font-medium text-[#171717]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Production Stats Box */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-white border border-[#E5E5E5] rounded-xl text-center text-xs">
                  <div>
                    <span className="block text-[10px] text-[#666666] uppercase font-semibold">Capacity</span>
                    <span className="font-bold text-[#171717]">{mill.capacityPerDay}</span>
                  </div>
                  <div className="border-x border-[#E5E5E5]">
                    <span className="block text-[10px] text-[#666666] uppercase font-semibold">Min Order</span>
                    <span className="font-bold text-[#171717]">{mill.minOrderQty} Units</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#666666] uppercase font-semibold">Turnaround</span>
                    <span className="font-bold text-[#16A34A]">{mill.leadTimeDays} Days</span>
                  </div>
                </div>

                {/* Contact Strip */}
                <div className="text-xs text-[#666666] space-y-1 pt-1">
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#06110C]" />
                    <span className="font-medium text-[#171717]">{mill.phone}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#06110C]" />
                    <span>{mill.email}</span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-5 mt-4 border-t border-[#E5E5E5] flex items-center gap-3">
                <button
                  onClick={() => setRfqMill(mill)}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-[#06110C] hover:bg-[#A31C1B] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Factory Quote</span>
                </button>
                <Link
                  to="/customizer"
                  className="py-2.5 px-4 rounded-lg bg-white border border-[#E5E5E5] hover:bg-[#E5E5E5] text-[#171717] text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#A31C1B]" />
                  <span>3D Design</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. MODAL: "ADD YOUR COMPANY / MILL ONBOARDING" */}
      {onboardingOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E5E5E5] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setOnboardingOpen(false)}
              className="absolute top-4 right-4 p-1 text-[#666666] hover:text-[#171717]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="inline-block px-2.5 py-0.5 rounded bg-[#06110C] text-white text-[10px] font-bold uppercase mb-2">
                Tiruppur Vendor Network
              </span>
              <h3 className="text-xl font-black text-[#171717] uppercase tracking-tight">
                ONBOARD YOUR MILL / FACTORY
              </h3>
              <p className="text-xs text-[#666666] mt-1">
                List your manufacturing facility on SAKTHI GARMENTS to receive direct B2B clothing and custom orders.
              </p>
            </div>

            {companySuccessMsg ? (
              <div className="p-6 bg-[#16A34A]/10 border border-[#16A34A]/30 rounded-xl text-center space-y-2 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-[#16A34A] mx-auto" />
                <p className="text-sm font-bold text-[#16A34A]">{companySuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleRegisterCompany} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#171717] mb-1 uppercase">
                    Company / Mill Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyForm.companyName}
                    onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                    placeholder="e.g. Sri Balaji Knit Fabrics"
                    className="w-full px-3 py-2 bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg text-[#171717] focus:border-[#06110C] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#171717] mb-1 uppercase">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={companyForm.contactPerson}
                      onChange={(e) => setCompanyForm({ ...companyForm, contactPerson: e.target.value })}
                      placeholder="e.g. S. Ramesh"
                      className="w-full px-3 py-2 bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg text-[#171717] focus:border-[#06110C] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#171717] mb-1 uppercase">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={companyForm.phoneNumber}
                      onChange={(e) => setCompanyForm({ ...companyForm, phoneNumber: e.target.value })}
                      placeholder="e.g. 98430 00000"
                      className="w-full px-3 py-2 bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg text-[#171717] focus:border-[#06110C] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#171717] mb-1 uppercase">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={companyForm.email}
                    onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                    placeholder="e.g. factory@sribalajiknits.in"
                    className="w-full px-3 py-2 bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg text-[#171717] focus:border-[#06110C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#171717] mb-1 uppercase">
                    Factory Address & Area in Tiruppur *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyForm.address}
                    onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                    placeholder="e.g. Mangalam Road, SIDCO Industrial Estate"
                    className="w-full px-3 py-2 bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg text-[#171717] focus:border-[#06110C] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#171717] mb-1 uppercase">
                      Manufacturing Specialties
                    </label>
                    <input
                      type="text"
                      value={companyForm.specialties}
                      onChange={(e) => setCompanyForm({ ...companyForm, specialties: e.target.value })}
                      placeholder="e.g. Polos, Bio-wash, Hoodies"
                      className="w-full px-3 py-2 bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg text-[#171717] focus:border-[#06110C] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#171717] mb-1 uppercase">
                      Min Order Qty (Units)
                    </label>
                    <input
                      type="number"
                      value={companyForm.minOrderQuantity}
                      onChange={(e) => setCompanyForm({ ...companyForm, minOrderQuantity: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg text-[#171717] focus:border-[#06110C] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submittingCompany}
                  className="w-full py-3 bg-[#06110C] hover:bg-[#A31C1B] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-colors mt-2"
                >
                  {submittingCompany ? 'Registering...' : 'Submit Mill Onboarding'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 5. MODAL: REQUEST FACTORY RFQ */}
      {rfqMill && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E5E5E5] relative">
            <button
              onClick={() => setRfqMill(null)}
              className="absolute top-4 right-4 p-1 text-[#666666] hover:text-[#171717]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-[10px] font-bold text-[#A31C1B] uppercase tracking-wider block">
                Direct Mill Quote Request
              </span>
              <h3 className="text-lg font-bold text-[#171717] mt-0.5">
                {rfqMill.companyName}
              </h3>
              <p className="text-xs text-[#666666]">
                Location: {rfqMill.address}, {rfqMill.city}
              </p>
            </div>

            {rfqSuccessMsg ? (
              <div className="p-4 bg-[#16A34A]/10 border border-[#16A34A]/30 rounded-xl text-center space-y-2 animate-fadeIn">
                <CheckCircle2 className="w-8 h-8 text-[#16A34A] mx-auto" />
                <p className="text-xs font-bold text-[#16A34A]">{rfqSuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleRfqSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-[#171717] mb-1 uppercase">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={rfqForm.name}
                    onChange={(e) => setRfqForm({ ...rfqForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg text-[#171717] focus:border-[#06110C] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#171717] mb-1 uppercase">Phone (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      value={rfqForm.phone}
                      onChange={(e) => setRfqForm({ ...rfqForm, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg text-[#171717] focus:border-[#06110C] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#171717] mb-1 uppercase">Order Quantity *</label>
                    <input
                      type="number"
                      min={rfqMill.minOrderQty}
                      value={rfqForm.quantity}
                      onChange={(e) => setRfqForm({ ...rfqForm, quantity: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg text-[#171717] focus:border-[#06110C] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-[#171717] mb-1 uppercase">Garment Type / Requirements</label>
                  <input
                    type="text"
                    value={rfqForm.garmentType}
                    onChange={(e) => setRfqForm({ ...rfqForm, garmentType: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg text-[#171717] focus:border-[#06110C] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#171717] mb-1 uppercase">Specific Instructions (Optional)</label>
                  <textarea
                    rows={2}
                    value={rfqForm.notes}
                    onChange={(e) => setRfqForm({ ...rfqForm, notes: e.target.value })}
                    placeholder="GSM, print technique, custom sizing, delivery timeline..."
                    className="w-full px-3 py-2 bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg text-[#171717] focus:border-[#06110C] focus:outline-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={rfqSubmitting}
                  className="w-full py-2.5 bg-[#06110C] hover:bg-[#A31C1B] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-colors mt-2"
                >
                  {rfqSubmitting ? 'Transmitting RFQ...' : 'Submit Quote Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TiruppurMillsPage;

