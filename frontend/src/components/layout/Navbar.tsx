import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Phone,
  MessageSquare,
  ShoppingBag,
  Sparkles,
  Search,
  Menu,
  X,
  ChevronDown,
  Building2,
  Compass,
  Layers,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { SAKTHI_BRAND_CONFIG, ALL_PRODUCTS } from '../../data/productsData';
import { productsApi, mapBackendProductToItem } from '../../api/productsApi';
import { AnnouncementBar } from '../storefront/AnnouncementBar';
import { MegaMenu } from '../storefront/MegaMenu';
import { AccountDropdown } from '../storefront/AccountDropdown';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof ALL_PRODUCTS>([]);
  const [searchOpen, setSearchOpen] = useState(false);

  // Handle sticky header scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Live search handler with API query and instant local fallback
  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.trim().length > 1) {
      // 1. Instant local search
      const localFiltered = ALL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.category.toLowerCase().includes(q.toLowerCase()) ||
          p.subcategory.toLowerCase().includes(q.toLowerCase())
      ).slice(0, 8);
      setSearchResults(localFiltered);
      setSearchOpen(true);

      // 2. Query backend API asynchronously
      productsApi
        .getProducts({ search: q })
        .then((backendProds) => {
          if (backendProds && backendProds.length > 0) {
            const mapped = backendProds.map((bp, i) => {
              const localMatch = ALL_PRODUCTS.find((lp) => lp.slug === bp.slug);
              const item = mapBackendProductToItem(bp, i + 1);
              if (localMatch) {
                item.image = localMatch.image;
                item.imageHover = localMatch.imageHover;
              }
              return item;
            });
            setSearchResults(mapped.slice(0, 8));
          }
        })
        .catch(() => {
          // Gracefully maintain local filtered list
        });
    } else {
      setSearchResults([]);
      setSearchOpen(false);
    }
  };

  return (
    <header className="w-full font-poppins relative z-40 bg-white shadow-sm transition-all duration-200">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      {!isSticky && <AnnouncementBar />}

      {/* 2. MAIN HEADER (Logo, Contact, Account, Cart) */}
      <div
        className={`w-full bg-white border-b border-[#E5E5E5] ${
          isSticky ? 'fixed top-0 left-0 right-0 z-50 shadow-md animate-fadeIn' : 'relative'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Left: Contact hotline & WhatsApp chat (desktop) */}
            <div className="hidden lg:flex items-center gap-5 text-xs text-[#171717]">
              <a
                href={`tel:${SAKTHI_BRAND_CONFIG.phone}`}
                className="flex items-center gap-1.5 hover:text-[#A31C1B] transition-colors"
                title="Customer Hotline"
              >
                <div className="w-6 h-6 rounded-full bg-[#06110C] flex items-center justify-center text-white">
                  <Phone className="w-3 h-3" />
                </div>
                <span className="font-medium">{SAKTHI_BRAND_CONFIG.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/91${SAKTHI_BRAND_CONFIG.phone}?text=Hello%20Sakthi%20Garments`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#16A34A] transition-colors"
                title="WhatsApp Chat Desk"
              >
                <div className="w-6 h-6 rounded-full bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A]">
                  <MessageSquare className="w-3 h-3" />
                </div>
                <span className="uppercase font-semibold text-[11px] tracking-wider text-[#16A34A]">
                  chat with us
                </span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#171717] hover:text-[#A31C1B] focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Center: SAKTHI GARMENTS Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-lg bg-[#06110C] border border-[#171717] flex items-center justify-center shadow-sm group-hover:border-[#A31C1B] transition-colors">
                <span className="font-poppins font-black text-lg text-white tracking-wider">SG</span>
              </div>
              <div className="text-left">
                <div className="font-poppins font-black text-lg sm:text-xl text-[#171717] tracking-tight flex items-center gap-1 leading-none">
                  <span>SAKTHI</span>
                  <span className="text-[#A31C1B]">GARMENTS</span>
                </div>
                <p className="text-[10px] text-[#666666] tracking-wider uppercase font-medium mt-0.5">
                  {SAKTHI_BRAND_CONFIG.tagline}
                </p>
              </div>
            </Link>

            {/* Right: Search, Account Dropdown & Cart */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search Bar (desktop) */}
              <div className="relative hidden md:block w-48 lg:w-64">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search 65+ products..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F7F7F5] border border-[#E5E5E5] rounded-full text-[#171717] placeholder-[#A3A3A3] focus:outline-none focus:border-[#06110C] focus:bg-white transition-all"
                  />
                  <Search className="w-3.5 h-3.5 text-[#A3A3A3] absolute left-2.5 pointer-events-none" />
                </div>

                {/* Search Results Dropdown */}
                {searchOpen && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-lg shadow-xl border border-[#E5E5E5] py-2 z-50 max-h-80 overflow-y-auto">
                    <p className="text-[10px] uppercase font-semibold text-[#666666] px-3 pb-1 border-b border-[#F7F7F5]">
                      Matching Products ({searchResults.length})
                    </p>
                    {searchResults.map((p) => (
                      <Link
                        key={p.id}
                        to={`/products/info/${p.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center justify-between px-3 py-1.5 hover:bg-[#F7F7F5] text-xs transition-colors"
                      >
                        <span className="font-medium text-[#171717] truncate">{p.name}</span>
                        <span className="text-[#A31C1B] font-semibold shrink-0 ml-2">₹ {p.price}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Account Dropdown */}
              <AccountDropdown />

              {/* Shopping Cart Button */}
              <Link
                to="/cart"
                className="relative p-2 rounded-full hover:bg-[#F7F7F5] text-[#171717] transition-colors"
                title="View Cart"
              >
                <ShoppingBag className="w-5 h-5 text-[#171717]" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#A31C1B] text-[10px] font-bold text-white flex items-center justify-center shadow">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* 3. PRIMARY NAVIGATION BAR (Desktop) */}
          <nav className="hidden lg:flex items-center justify-center gap-8 py-2.5 border-t border-[#E5E5E5] text-xs font-semibold uppercase tracking-wider text-[#171717]">
            {/* Products Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
            >
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className="flex items-center gap-1 text-[#171717] hover:text-[#A31C1B] py-1 transition-colors"
              >
                <span>PRODUCTS</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* 3D Customizer */}
            <Link
              to="/customizer"
              className="flex items-center gap-1.5 text-[#171717] hover:text-[#A31C1B] py-1 transition-colors group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A31C1B] group-hover:scale-110 transition-transform" />
              <span>3D CUSTOMIZER</span>
            </Link>

            {/* AI Assistant */}
            <Link
              to="/ai-assistant"
              className="flex items-center gap-1.5 text-[#06110C] hover:text-[#A31C1B] py-1 transition-colors group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#16A34A] group-hover:scale-110 transition-transform" />
              <span>AI ASSISTANT</span>
            </Link>

            {/* Tiruppur Mills */}
            <Link
              to="/tiruppur-mills"
              className="hover:text-[#A31C1B] py-1 transition-colors"
            >
              TIRUPPUR MILLS
            </Link>

            {/* Fabric Samples */}
            <Link
              to="/fabric-samples"
              className="hover:text-[#A31C1B] py-1 transition-colors"
            >
              FABRIC SAMPLES
            </Link>

            {/* Design Templates */}
            <Link
              to="/design-templates"
              className="hover:text-[#A31C1B] py-1 transition-colors"
            >
              DESIGN TEMPLATES
            </Link>

            {/* Track Order */}
            <Link
              to="/track"
              className="text-[#06110C] hover:text-[#A31C1B] py-1 transition-colors font-bold"
            >
              TRACK ORDER
            </Link>
          </nav>
        </div>

        {/* 4. MEGA MENU CONTAINER */}
        <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
      </div>

      {/* 5. MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#000000]/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-4/5 max-w-sm h-full bg-white text-[#212529] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[#06110C] text-white font-bold flex items-center justify-center text-sm">
                    SG
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#171717]">SAKTHI GARMENTS</p>
                    <p className="text-[10px] text-[#666666]">{SAKTHI_BRAND_CONFIG.tagline}</p>
                  </div>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1">
                  <X className="w-5 h-5 text-[#666666]" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search catalog..."
                  className="w-full pl-8 pr-3 py-2 text-xs bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] rounded-lg focus:outline-none focus:border-[#06110C]"
                />
                <Search className="w-3.5 h-3.5 text-[#A3A3A3] absolute left-2.5 top-2.5" />
              </div>

              {/* Nav Links */}
              <div className="space-y-3 text-sm font-medium">
                <Link
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[#171717] border-b border-[#F7F7F5] font-semibold"
                >
                  PRODUCTS (65 Items)
                </Link>
                <Link
                  to="/customizer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 text-[#06110C] font-bold border-b border-[#F7F7F5]"
                >
                  <span>3D CUSTOMIZER</span>
                  <Sparkles className="w-4 h-4 text-[#A31C1B]" />
                </Link>
                <Link
                  to="/ai-assistant"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 text-[#06110C] font-bold border-b border-[#F7F7F5]"
                >
                  <span>AI ASSISTANT</span>
                  <Sparkles className="w-4 h-4 text-[#16A34A]" />
                </Link>
                <Link
                  to="/tiruppur-mills"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[#171717] border-b border-[#F7F7F5]"
                >
                  TIRUPPUR MILLS
                </Link>
                <Link
                  to="/fabric-samples"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[#171717] border-b border-[#F7F7F5]"
                >
                  FABRIC SAMPLES
                </Link>
                <Link
                  to="/design-templates"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[#171717] border-b border-[#F7F7F5]"
                >
                  DESIGN TEMPLATES
                </Link>
                <Link
                  to="/track"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[#A31C1B] font-bold"
                >
                  TRACK ORDER
                </Link>
              </div>
            </div>

            {/* Mobile Footer Contact */}
            <div className="pt-6 border-t border-[#E5E5E5] text-xs text-[#666666] space-y-2">
              <p className="font-semibold text-[#171717]">Need Assistance?</p>
              <p>Hotline: {SAKTHI_BRAND_CONFIG.phoneDisplay}</p>
              <p>Email: {SAKTHI_BRAND_CONFIG.email}</p>
              <p>{SAKTHI_BRAND_CONFIG.location}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
