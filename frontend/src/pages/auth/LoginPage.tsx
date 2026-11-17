import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SAKTHI_BRAND_CONFIG } from '../../data/productsData';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/customer/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setErrorMsg(res.message || 'Invalid credentials.');
    }
  };

  // Quick autofill demo logins for evaluation convenience
  const autofill = (role: 'customer' | 'company' | 'admin') => {
    if (role === 'customer') {
      setEmail('customer@sakthigarments.in');
      setPassword('Customer@123');
    } else if (role === 'company') {
      setEmail('admin@sakthigarments.in');
      setPassword('SakthiAdmin@2026');
    } else {
      setEmail('superadmin@sakthigarments.in');
      setPassword('Admin@Sakthi2026');
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#F7F7F5] text-[#171717] flex items-center justify-center px-4 font-poppins">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E5E5E5] max-w-md w-full shadow-md relative">
        <div className="text-center mb-8 space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2 group">
            <div className="w-10 h-10 rounded-xl bg-[#06110C] border border-[#171717] flex items-center justify-center font-bold text-white text-base shadow-xs group-hover:border-[#A31C1B] transition-colors">
              SG
            </div>
            <div className="text-left leading-tight">
              <span className="font-extrabold text-lg text-[#171717]">SAKTHI </span>
              <span className="font-extrabold text-lg text-[#A31C1B]">GARMENTS</span>
            </div>
          </Link>
          <h1 className="text-2xl font-black text-[#171717]">Sign In</h1>
          <p className="text-xs text-[#666666]">Access your 3D customization studio & orders</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-[#A31C1B]/10 border border-[#A31C1B]/20 text-[#A31C1B] text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#666666] mb-1 font-semibold">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#A3A3A3] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] placeholder-[#A3A3A3] focus:outline-none focus:border-[#06110C] focus:bg-white text-xs transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1 font-semibold">
              <label className="text-[#666666]">Password</label>
              <Link to="/forgot-password" className="text-[#A31C1B] hover:underline text-[11px]">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#A3A3A3] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] placeholder-[#A3A3A3] focus:outline-none focus:border-[#06110C] focus:bg-white text-xs transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            id="login-submit-btn"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#06110C] hover:bg-[#A31C1B] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Credentials */}
        <div className="mt-6 pt-4 border-t border-[#E5E5E5] space-y-2">
          <p className="text-[10px] text-[#A3A3A3] uppercase tracking-wider text-center font-semibold">
            Development Quick Autofill
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => autofill('customer')}
              className="flex-1 py-1.5 rounded-lg bg-[#F7F7F5] hover:bg-[#E5E5E5] text-[10px] text-[#171717] font-semibold border border-[#E5E5E5] transition-colors"
            >
              Customer
            </button>
            <button
              onClick={() => autofill('company')}
              className="flex-1 py-1.5 rounded-lg bg-[#F7F7F5] hover:bg-[#E5E5E5] text-[10px] text-[#06110C] font-semibold border border-[#E5E5E5] transition-colors"
            >
              Mill Portal
            </button>
            <button
              onClick={() => autofill('admin')}
              className="flex-1 py-1.5 rounded-lg bg-[#F7F7F5] hover:bg-[#E5E5E5] text-[10px] text-[#A31C1B] font-semibold border border-[#E5E5E5] transition-colors"
            >
              Admin
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-[#666666] mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-[#A31C1B] font-bold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
