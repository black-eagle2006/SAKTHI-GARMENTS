import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { User as UserIcon, Building2, Lock, Mail, Phone, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SignUpPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { registerCustomer, registerCompany } = useAuth();

  const [roleTab, setRoleTab] = useState<'customer' | 'company'>(
    searchParams.get('role') === 'company' ? 'company' : 'customer'
  );

  // Customer Form State
  const [customerForm, setCustomerForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  // Company Form State
  const [companyForm, setCompanyForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: 'Tiruppur',
    state: 'Tamil Nadu',
    pincode: '641601',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    const res = await registerCustomer(customerForm);
    setLoading(false);
    if (res.success) {
      navigate('/customer/dashboard');
    } else {
      setErrorMsg(res.message || 'Registration failed.');
    }
  };

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    const res = await registerCompany(companyForm);
    setLoading(false);
    if (res.success) {
      setSuccessMsg(
        res.message ||
          'Your garment company has been submitted for verification. An administrator will review your application.'
      );
    } else {
      setErrorMsg(res.message || 'Company registration failed.');
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#F7F7F5] text-[#171717] flex items-center justify-center px-4 font-poppins">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E5E5E5] max-w-lg w-full shadow-md relative">
        <div className="text-center mb-6 space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2 group">
            <div className="w-10 h-10 rounded-xl bg-[#06110C] border border-[#171717] flex items-center justify-center font-bold text-white text-base shadow-xs group-hover:border-[#A31C1B] transition-colors">
              SG
            </div>
            <div className="text-left leading-tight">
              <span className="font-extrabold text-lg text-[#171717]">SAKTHI </span>
              <span className="font-extrabold text-lg text-[#A31C1B]">GARMENTS</span>
            </div>
          </Link>
          <h1 className="text-2xl font-black text-[#171717]">Create Account</h1>
          <p className="text-xs text-[#666666]">Join India&apos;s premier textile customization ecosystem</p>
        </div>

        {/* Role Tab Selector */}
        <div className="flex bg-[#F7F7F5] p-1 rounded-2xl border border-[#E5E5E5] mb-6">
          <button
            type="button"
            onClick={() => {
              setRoleTab('customer');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              roleTab === 'customer'
                ? 'bg-[#06110C] text-white shadow-xs'
                : 'text-[#666666] hover:text-[#171717]'
            }`}
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>Customer / Creator</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setRoleTab('company');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              roleTab === 'company'
                ? 'bg-[#06110C] text-white shadow-xs'
                : 'text-[#666666] hover:text-[#171717]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Garment Manufacturer</span>
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-[#A31C1B]/10 border border-[#A31C1B]/20 text-[#A31C1B] text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-4 rounded-xl bg-[#06110C]/5 border border-[#06110C]/20 text-[#06110C] text-xs text-center space-y-2">
            <p className="font-bold">{successMsg}</p>
            <Link to="/login" className="inline-block text-[#A31C1B] underline font-semibold">
              Return to Login
            </Link>
          </div>
        )}

        {!successMsg && roleTab === 'customer' && (
          <form onSubmit={handleCustomerSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#666666] mb-1 font-semibold">Full Name *</label>
              <input
                type="text"
                required
                value={customerForm.fullName}
                onChange={(e) => setCustomerForm({ ...customerForm, fullName: e.target.value })}
                placeholder="e.g. Anandha Kumar"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C] focus:bg-white text-xs transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#666666] mb-1 font-semibold">Email Address *</label>
              <input
                type="email"
                required
                value={customerForm.email}
                onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C] focus:bg-white text-xs transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#666666] mb-1 font-semibold">Phone Number</label>
              <input
                type="tel"
                value={customerForm.phoneNumber}
                onChange={(e) => setCustomerForm({ ...customerForm, phoneNumber: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C] focus:bg-white text-xs transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#666666] mb-1 font-semibold">Password *</label>
              <input
                type="password"
                required
                minLength={6}
                value={customerForm.password}
                onChange={(e) => setCustomerForm({ ...customerForm, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C] focus:bg-white text-xs transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#06110C] hover:bg-[#A31C1B] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'Creating Account...' : 'Register as Customer'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {!successMsg && roleTab === 'company' && (
          <form onSubmit={handleCompanySubmit} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#666666] mb-1 font-semibold">Company / Mill Name *</label>
                <input
                  type="text"
                  required
                  value={companyForm.companyName}
                  onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                  placeholder="e.g. Texora Apparels"
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C] focus:bg-white text-xs transition-colors"
                />
              </div>
              <div>
                <label className="block text-[#666666] mb-1 font-semibold">Contact Person *</label>
                <input
                  type="text"
                  required
                  value={companyForm.contactPerson}
                  onChange={(e) => setCompanyForm({ ...companyForm, contactPerson: e.target.value })}
                  placeholder="Managing Partner"
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C] focus:bg-white text-xs transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#666666] mb-1 font-semibold">Work Email *</label>
                <input
                  type="email"
                  required
                  value={companyForm.email}
                  onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                  placeholder="factory@texora.com"
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C] focus:bg-white text-xs transition-colors"
                />
              </div>
              <div>
                <label className="block text-[#666666] mb-1 font-semibold">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={companyForm.phoneNumber}
                  onChange={(e) => setCompanyForm({ ...companyForm, phoneNumber: e.target.value })}
                  placeholder="+91 94432 00000"
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C] focus:bg-white text-xs transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#666666] mb-1 font-semibold">Factory Address *</label>
              <input
                type="text"
                required
                value={companyForm.address}
                onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                placeholder="SF No. 120, Rayapuram"
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C] focus:bg-white text-xs transition-colors"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[#666666] mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={companyForm.city}
                  onChange={(e) => setCompanyForm({ ...companyForm, city: e.target.value })}
                  className="w-full px-2.5 py-2 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C] focus:bg-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[#666666] mb-1">State *</label>
                <input
                  type="text"
                  required
                  value={companyForm.state}
                  onChange={(e) => setCompanyForm({ ...companyForm, state: e.target.value })}
                  className="w-full px-2.5 py-2 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C] focus:bg-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[#666666] mb-1">Pincode *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={companyForm.pincode}
                  onChange={(e) => setCompanyForm({ ...companyForm, pincode: e.target.value })}
                  className="w-full px-2.5 py-2 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C] focus:bg-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#666666] mb-1 font-semibold">Portal Password *</label>
              <input
                type="password"
                required
                minLength={6}
                value={companyForm.password}
                onChange={(e) => setCompanyForm({ ...companyForm, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C] focus:bg-white text-xs"
              />
            </div>

            <div className="p-3 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[11px] text-[#666666] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#A31C1B] shrink-0 mt-0.5" />
              <span>Company applications require Administrator verification before accepting public orders.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#06110C] hover:bg-[#A31C1B] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'Submitting Application...' : 'Register Garment Company'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-center text-xs text-[#666666] mt-6">
          Already registered?{' '}
          <Link to="/login" className="text-[#A31C1B] font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
