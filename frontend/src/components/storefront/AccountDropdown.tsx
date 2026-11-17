import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogIn, UserPlus, LogOut, LayoutDashboard, Truck, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AccountDropdown: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN') return '/admin/dashboard';
    if (user.role === 'COMPANY') return '/company/dashboard';
    return '/customer/dashboard';
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <div className="relative font-poppins" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs text-[#171717] hover:text-[#A31C1B] font-semibold py-1 px-2.5 rounded transition-colors group cursor-pointer"
        aria-expanded={isOpen}
      >
        <User className="w-3.5 h-3.5 text-[#06110C] group-hover:text-[#A31C1B] transition-colors" />
        <span>{isAuthenticated && user ? user.fullName?.split(' ')[0] : 'SIGN IN'}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E5E5E5] py-2 z-50 text-xs text-[#171717] animate-fadeIn">
          {isAuthenticated && user ? (
            <div className="border-b border-[#E5E5E5] pb-2 mb-2 px-4">
              <p className="font-bold text-sm text-[#171717] truncate">{user.fullName}</p>
              <p className="text-[11px] text-[#666666] truncate">{user.email}</p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] font-semibold text-[10px] rounded-full uppercase">
                {user.role}
              </span>
            </div>
          ) : null}

          {isAuthenticated ? (
            <>
              <Link
                to={getDashboardPath()}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-[#F7F7F5] hover:text-[#A31C1B] transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#06110C]" />
                <span>My Dashboard</span>
              </Link>
              <Link
                to="/customer/orders"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-[#F7F7F5] hover:text-[#A31C1B] transition-colors"
              >
                <Truck className="w-3.5 h-3.5 text-[#06110C]" />
                <span>Order Tracking</span>
              </Link>
              <div className="border-t border-[#E5E5E5] my-1"></div>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2 px-4 py-2 text-[#A31C1B] hover:bg-[#A31C1B]/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-[#F7F7F5] hover:text-[#A31C1B] transition-colors font-medium text-[#171717]"
              >
                <LogIn className="w-3.5 h-3.5 text-[#06110C]" />
                <span>Customer Login</span>
              </Link>
              <Link
                to="/login?role=company"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-[#F7F7F5] hover:text-[#A31C1B] transition-colors text-[#171717]"
              >
                <Shield className="w-3.5 h-3.5 text-[#A31C1B]" />
                <span>Manufacturer / Mill Login</span>
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-[#F7F7F5] hover:text-[#A31C1B] transition-colors text-[#171717]"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#06110C]" />
                <span>Create New Account</span>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
