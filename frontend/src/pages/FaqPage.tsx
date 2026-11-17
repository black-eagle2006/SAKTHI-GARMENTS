import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Package, Sparkles } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the ₹69 Cloth Sample Order?',
      a: 'The ₹69 sample allows creators, fashion designers, and bulk buyers to order physical fabric swatches from our featured Tiruppur mills (including SAKTHI GARMENTS) to evaluate yarn weight (180/220 GSM), softness, bio-wash finish, and dye fastness before committing to custom or bulk production.',
    },
    {
      q: 'How does the 3D T-Shirt Customizer convert into real print files?',
      a: 'Our 3D customizer tracks decal coordinate matrices, dimensions, and typography styles. When an order is placed, the backend renders 300 DPI high-resolution CMYK vectors matching the exact front, back, and sleeve coordinates for industrial Direct-to-Garment (DTG) or screen-printing frames.',
    },
    {
      q: 'What sizes are available?',
      a: 'Standard Indian and international knitwear sizing: S (38"), M (40"), L (42"), XL (44"), XXL (46"), and 3XL (48"). Both regular comfort fit and trendy luxury oversized boxy fits are supported.',
    },
    {
      q: 'What is the Minimum Order Quantity (MOQ)?',
      a: 'For personalized custom T-shirts and samples, the MOQ is 1 piece. For bulk industrial manufacturing orders directly from partner mills, MOQs start from 25 to 50 pieces with scaled quantity discounts.',
    },
    {
      q: 'Can garment companies register to partner with Sakthi Garments?',
      a: 'Yes. Verified garment manufacturers in Tiruppur and surrounding textile clusters can register as a Garment Company via our Tiruppur Mills portal. Once verified and approved by the SuperAdmin, you can publish product catalogs, manage blank stock, and fulfill incoming orders.',
    },
    {
      q: 'How does the Google Gemini AI integration work?',
      a: 'Our backend connects directly to Google Gemini. You enter a natural-language description of your apparel vision, and Gemini suggests coordinated typography pairings, palette aesthetics, and artwork concepts which can be mapped directly to the 3D model with one click.',
    },
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white text-[#171717] font-poppins">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#A31C1B]" />
            <span>KNOWLEDGE DESK</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#171717] uppercase">
            Frequently Asked Questions
          </h1>
          <p className="text-[#666666] text-base leading-relaxed">
            Everything you need to know about 3D customization, ₹69 fabric swatches, sizing, and direct Tiruppur manufacturing.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((f, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#F7F7F5] rounded-2xl border border-[#E5E5E5] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#E5E5E5]/40 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold text-[#171717] flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#A31C1B] shrink-0" />
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#666666] transition-transform shrink-0 ${
                      isOpen ? 'rotate-180 text-[#06110C]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-[#666666] leading-relaxed border-t border-[#E5E5E5] bg-white">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
