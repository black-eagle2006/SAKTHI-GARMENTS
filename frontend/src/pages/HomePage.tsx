import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Palette,
  Layers,
  Building2,
  CheckCircle2,
  Package,
  RotateCw,
  ShoppingBag,
  Star,
  ChevronRight,
  Phone,
  MessageSquare,
  Award,
} from 'lucide-react';
import { SAKTHI_BRAND_CONFIG, PRODUCT_SECTIONS } from '../data/productsData';

export const HomePage: React.FC = () => {
  const [activeGarmentShade, setActiveGarmentShade] = useState('#171717');

  const colorOptions = [
    { name: 'Pitch Black', hex: '#171717' },
    { name: 'Pure White', hex: '#FFFFFF' },
    { name: 'Forest Green', hex: '#06110C' },
    { name: 'Crimson Red', hex: '#A31C1B' },
    { name: 'Sky Blue', hex: '#38BDF8' },
    { name: 'Deep Navy', hex: '#1E293B' },
  ];

  const valuePillars = [
    {
      icon: <Sparkles className="w-5 h-5 text-[#A31C1B]" />,
      title: 'Real-Time 3D Customizer',
      desc: 'Inspect custom typography, logos, decals, and sleeve prints from 360° interactive viewports.',
    },
    {
      icon: <Layers className="w-5 h-5 text-[#06110C]" />,
      title: '₹69 Fabric Swatch Kits',
      desc: 'Touch yarn weave, test GSM weight, and evaluate colorfastness before committing to bulk runs.',
    },
    {
      icon: <Building2 className="w-5 h-5 text-[#A31C1B]" />,
      title: 'Tiruppur Direct Manufacturing',
      desc: 'Zero retail markup. Direct production at KVR Nagar stitching facilities with tiered wholesale pricing.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#06110C]" />,
      title: '100% Bio-Wash Combed Cotton',
      desc: 'Silicone-softened zero-shrinkage yarn tailored to international luxury streetwear standards.',
    },
  ];

  // Pick top 8 featured product lines
  const featuredProducts = PRODUCT_SECTIONS.flatMap((s) => s.products).slice(0, 8);

  return (
    <div className="w-full min-h-screen bg-white font-poppins text-[#171717]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#A31C1B] animate-pulse" />
              <span>DIRECT FROM TIRUPPUR • TEXTILE CAPITAL OF INDIA</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#171717] tracking-tight leading-[1.08] uppercase">
              YOUR DESIGN, <br />
              <span className="text-[#A31C1B]">OUR STITCH.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#666666] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Custom T-shirt design, tailoring, printing, and direct manufacturing platform.
              Craft your bespoke streetwear, corporate uniform, or sports apparel in our live 3D customizer.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/customizer"
                className="w-full sm:w-auto py-3.5 px-8 rounded-lg bg-[#06110C] hover:bg-[#A31C1B] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#FACC15]" />
                <span>START 3D CUSTOMIZER</span>
              </Link>
              <Link
                to="/products"
                className="w-full sm:w-auto py-3.5 px-8 rounded-lg bg-[#F7F7F5] hover:bg-[#E5E5E5] border border-[#E5E5E5] text-[#171717] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>EXPLORE 65 PRODUCTS</span>
                <ArrowRight className="w-4 h-4 text-[#A31C1B]" />
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 border-t border-[#E5E5E5] grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <span className="text-2xl font-black text-[#171717]">65+</span>
                <p className="text-[11px] text-[#666666] uppercase font-semibold">Garment Styles</p>
              </div>
              <div>
                <span className="text-2xl font-black text-[#A31C1B]">₹69</span>
                <p className="text-[11px] text-[#666666] uppercase font-semibold">Fabric Samples</p>
              </div>
              <div>
                <span className="text-2xl font-black text-[#06110C]">5,000+</span>
                <p className="text-[11px] text-[#666666] uppercase font-semibold">Daily Mill Capacity</p>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Interactive Garment Preview Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#F7F7F5] border border-[#E5E5E5] rounded-3xl p-6 sm:p-8 shadow-md relative">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#A31C1B] tracking-wider block">
                    3D Studio Ready
                  </span>
                  <h3 className="font-bold text-sm text-[#171717]">Heavy Bio-Wash Cotton Polo</h3>
                </div>
                <span className="px-2.5 py-1 bg-white border border-[#E5E5E5] rounded-full text-xs font-bold text-[#171717]">
                  ₹399
                </span>
              </div>

              {/* Garment Image Showcase */}
              <div className="relative aspect-square rounded-2xl bg-white border border-[#E5E5E5] overflow-hidden flex items-center justify-center p-4 shadow-inner">
                <img
                  src="/products/heavy-polo.jpg"
                  alt="Sakthi Garments Polo"
                  className="w-full h-full object-contain"
                  onError={(e: any) => {
                    e.target.src = 'https://cdn.yourdesignstore.in/uploads/yds/productImages/full/heavy-polo.jpg';
                  }}
                />
                <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-[#06110C]/90 text-white text-[10px] font-semibold backdrop-blur-xs">
                    360° Customizer Available
                  </span>
                </div>
              </div>

              {/* Color Selector */}
              <div className="mt-5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#666666]">Choose Garment Shade:</span>
                  <span className="font-mono text-[11px] font-bold text-[#171717]">{activeGarmentShade}</span>
                </div>
                <div className="flex items-center gap-2">
                  {colorOptions.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setActiveGarmentShade(c.hex)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        activeGarmentShade === c.hex ? 'border-[#06110C] scale-110 shadow-sm' : 'border-[#E5E5E5]'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              <Link
                to="/customizer?garment=heavy-polo"
                className="w-full mt-5 py-3 rounded-xl bg-[#06110C] hover:bg-[#A31C1B] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
                <span>Customize This in 3D</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PILLARS SECTION */}
      <section className="bg-[#F7F7F5] border-t border-b border-[#E5E5E5] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#A31C1B] uppercase tracking-wider block mb-1">
              Why Sakthi Garments
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight uppercase">
              ENGINEERED FOR PREMIUM COUTURE & BULK ACCURACY
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuePillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-xs hover:border-[#171717] transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F7F7F5] border border-[#E5E5E5] flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h3 className="font-bold text-sm text-[#171717]">{pillar.title}</h3>
                <p className="text-xs text-[#666666] leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED APPAREL COLLECTIONS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#E5E5E5]">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#171717] uppercase">
              Featured Factory Collections
            </h2>
            <p className="text-xs text-[#666666] mt-0.5">
              Top requested customizable styles from our Tiruppur mill floor
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs font-bold text-[#06110C] hover:text-[#A31C1B] flex items-center gap-1 group"
          >
            <span>View All 65 Styles</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#171717] transition-all flex flex-col justify-between group"
            >
              <div className="aspect-square bg-[#F7F7F5] overflow-hidden relative">
                <img
                  src={p.image || `/products/${p.slug}.jpg`}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e: any) => {
                    e.target.src = `https://cdn.yourdesignstore.in/uploads/yds/productImages/full/${p.slug}.jpg`;
                  }}
                />
              </div>

              <div className="p-4 space-y-2">
                <Link
                  to={`/products/info/${p.slug}`}
                  className="font-semibold text-xs text-[#171717] hover:text-[#A31C1B] line-clamp-1 block transition-colors"
                >
                  {p.name}
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#171717]">₹{p.price}</span>
                  <span className="text-[10px] text-[#16A34A] font-semibold">Bulk Eligible</span>
                </div>
                <div className="pt-2 flex items-center gap-1.5">
                  <Link
                    to={`/customizer?garment=${p.slug}&name=${encodeURIComponent(p.name)}`}
                    className="flex-1 py-1.5 bg-[#06110C] hover:bg-[#A31C1B] text-white text-[10px] font-bold uppercase rounded text-center transition-colors"
                  >
                    3D Custom
                  </Link>
                  <Link
                    to={`/products/info/${p.slug}`}
                    className="py-1.5 px-2 bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] text-[10px] font-bold rounded hover:bg-[#E5E5E5] transition-colors"
                  >
                    Info
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TIRUPPUR MANUFACTURING DESK CALLOUT */}
      <section className="bg-[#06110C] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#A31C1B] uppercase tracking-wider">
              Need Bulk Factory Production?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
              CONNECT DIRECTLY WITH SAKTHI GARMENTS
            </h2>
            <p className="text-xs sm:text-sm text-[#A3A3A3] max-w-xl">
              Factory direct support in KVR Nagar (Near Chennai Bakes), Tiruppur. Contact us via phone, WhatsApp, or email for immediate quotes.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`tel:${SAKTHI_BRAND_CONFIG.phone}`}
              className="py-3 px-5 rounded-lg bg-white text-[#06110C] hover:bg-[#A31C1B] hover:text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call {SAKTHI_BRAND_CONFIG.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/91${SAKTHI_BRAND_CONFIG.phone}?text=Hello%20Sakthi%20Garments`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
