import React from 'react';
import { MapPin, Phone, Mail, Award, CheckCircle2, Building2, Sparkles, MessageSquare } from 'lucide-react';
import { SAKTHI_BRAND_CONFIG } from '../data/productsData';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-white text-[#171717] font-poppins">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#A31C1B]" />
            <span>TIRUPPUR HERITAGE & MODERN MANUFACTURING</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#171717] leading-tight uppercase">
            SAKTHI GARMENTS <br />
            <span className="text-[#A31C1B]">YOUR DESIGN, OUR STITCH.</span>
          </h1>
          <p className="text-[#666666] text-base sm:text-lg leading-relaxed">
            Headquartered at KVR Nagar, Tiruppur — Tamil Nadu, SAKTHI GARMENTS represents the convergence
            of multi-generational knitwear craftsmanship with interactive 3D computer graphics and direct factory manufacturing.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-[#F7F7F5] p-8 rounded-3xl border border-[#E5E5E5] space-y-5 shadow-xs">
            <h3 className="font-bold text-xl text-[#171717]">
              Tiruppur: The Knitwear Capital of India
            </h3>
            <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
              Tiruppur produces over 90% of India&apos;s cotton knitwear exports, celebrated globally for yarn
              strength, colorfastness, and silky bio-wash finishes. SAKTHI GARMENTS empowers creators and businesses anywhere
              in the world to bypass middlemen and order bespoke custom garments directly from the factory floor.
            </p>
            <div className="pt-2 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-[#171717]">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>Zero intermediaries — Direct factory price quotes</span>
              </div>
              <div className="flex items-center gap-2 text-[#171717]">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>Sizes S through 3XL in stock for all core colorways</span>
              </div>
              <div className="flex items-center gap-2 text-[#171717]">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>Affordable ₹69 fabric swatch packs for pre-order quality checks</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#E5E5E5] space-y-6 shadow-sm">
            <h3 className="font-bold text-xl text-[#171717]">Direct Facility Coordinates</h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-[#A31C1B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#171717]">SAKTHI GARMENTS</p>
                  <p className="text-[#666666]">KVR Nagar (Near Chennai Bakes), Tiruppur, Tamil Nadu — 641604, India</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#06110C] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#171717]">Direct Factory Hotline</p>
                  <p className="text-[#666666]">{SAKTHI_BRAND_CONFIG.phoneDisplay}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#A31C1B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#171717]">Official Email</p>
                  <p className="text-[#666666]">{SAKTHI_BRAND_CONFIG.email}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href={`tel:${SAKTHI_BRAND_CONFIG.phone}`}
                  className="py-2.5 px-5 rounded-xl bg-[#06110C] hover:bg-[#A31C1B] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Us</span>
                </a>
                <a
                  href={`https://wa.me/91${SAKTHI_BRAND_CONFIG.phone}?text=Hello%20Sakthi%20Garments`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-5 rounded-xl bg-[#16A34A] hover:bg-[#15803d] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
