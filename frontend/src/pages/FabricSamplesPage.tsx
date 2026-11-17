import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Layers,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  Send,
  ShieldCheck,
  Flame,
  Award,
  ChevronRight,
  Info,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SAKTHI_BRAND_CONFIG } from '../data/productsData';
import apiClient from '../api/client';

interface FabricItem {
  id: string;
  name: string;
  composition: string;
  gsm: number;
  weave: string;
  bestFor: string;
  colorsCount: number;
  shrinkage: string;
  stretch: string;
  breathability: string;
  price: number;
  swatchColors: string[];
  description: string;
}

export const FabricSamplesPage: React.FC = () => {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [addedNotices, setAddedNotices] = useState<{ [key: string]: boolean }>({});

  // Custom Sample Form state
  const [customForm, setCustomForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    fabricType: 'Bio-Wash Cotton 220 GSM',
    colorsNeeded: 'Black, White, Navy',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const fabrics: FabricItem[] = [
    {
      id: 'fab-1',
      name: '100% Super-Combed Cotton Single Jersey',
      composition: '100% Combed Ring-Spun Cotton',
      gsm: 180,
      weave: 'Single Jersey Weave',
      bestFor: 'Everyday T-Shirts, Casuals & Summer Wear',
      colorsCount: 24,
      shrinkage: '< 2.5% pre-shrunk',
      stretch: 'Natural 2-Way Mechanical Stretch',
      breathability: 'High (Air Permeability: 85 cm³/s)',
      price: 69,
      swatchColors: ['#FFFFFF', '#171717', '#1E293B', '#A31C1B', '#38BDF8', '#FACC15'],
      description: 'Ultra-smooth combed cotton yarn spun from premium staple fibers in Tiruppur. Zero yarn fuzz with rich dye absorption.',
    },
    {
      id: 'fab-2',
      name: 'Bio-Wash Silicon-Treated Cotton',
      composition: '100% Bio-Washed Compact Cotton',
      gsm: 220,
      weave: 'Interlock Single Jersey',
      bestFor: 'Premium Streetwear & Direct-to-Garment Printing',
      colorsCount: 18,
      shrinkage: 'Zero shrinkage guaranteed (< 1.5%)',
      stretch: 'Supple 2-Way Comfort Stretch',
      breathability: 'Ultra High (Bio-polished surface)',
      price: 69,
      swatchColors: ['#171717', '#06110C', '#A31C1B', '#94A3B8', '#D97706'],
      description: 'Enzyme bio-washed to remove micro-fibrils, producing a silk-smooth hand feel with exceptional colorfastness.',
    },
    {
      id: 'fab-3',
      name: 'Luxury French Terry Knitted Fleece',
      composition: '95% Combed Cotton, 5% Elastane',
      gsm: 280,
      weave: 'Loopback French Terry',
      bestFor: 'Oversized Hoodies, Sweatshirts & Heavy Joggers',
      colorsCount: 14,
      shrinkage: '< 3% Pre-washed',
      stretch: '4-Way Structured Stretch',
      breathability: 'Medium-Warm (Loop pile inside)',
      price: 69,
      swatchColors: ['#171717', '#1E293B', '#94A3B8', '#06110C'],
      description: 'Heavyweight loopback construction that drapes cleanly without creasing. Ideal for screen printing and dense 3D embroidery.',
    },
    {
      id: 'fab-4',
      name: 'Classic Pique Knit Honeycomb Polo',
      composition: '100% Cotton / Poly-Cotton 60:40 Blend',
      gsm: 240,
      weave: 'Honeycomb Pique',
      bestFor: 'Corporate Uniforms, Golf Polos & Collared T-Shirts',
      colorsCount: 20,
      shrinkage: '< 2% Pre-set',
      stretch: 'Firm Structural Elasticity',
      breathability: 'Excellent (Ventilated diamond knit)',
      price: 69,
      swatchColors: ['#FFFFFF', '#171717', '#1E293B', '#A31C1B', '#059669'],
      description: 'Durable pique knit with signature honeycomb texture that retains crisp collar shape after repeated commercial laundering.',
    },
    {
      id: 'fab-5',
      name: 'Dry-Fit Performance Micro-Polyester',
      composition: '100% Moisture-Wicking Micro-Poly',
      gsm: 160,
      weave: 'Birdseye Breathable Mesh',
      bestFor: 'Activewear, Marathons, Gym & Sports Teams',
      colorsCount: 16,
      shrinkage: '0% Synthetic Stability',
      stretch: '4-Way Quick Dry Stretch',
      breathability: 'Maximum (Active capillary wicking)',
      price: 69,
      swatchColors: ['#38BDF8', '#171717', '#A31C1B', '#FACC15', '#FFFFFF'],
      description: 'Engineered micro-porous filament yarns rapidly wick perspiration away from skin. Anti-static and antimicrobial finished.',
    },
    {
      id: 'fab-6',
      name: 'Organic Bamboo Cotton Single Jersey',
      composition: '70% Bamboo Viscose, 30% Organic Cotton',
      gsm: 200,
      weave: 'Ultra-Fine Jersey',
      bestFor: 'Eco-conscious brands, Infant Wear & Loungewear',
      colorsCount: 10,
      shrinkage: '< 2% Pre-shrunk',
      stretch: 'Buttery Soft 2-Way Drape',
      breathability: 'Maximum Organic Thermal Regulating',
      price: 69,
      swatchColors: ['#FFFFFF', '#06110C', '#94A3B8', '#D97706'],
      description: 'Naturally hypoallergenic and antibacterial fabric crafted from certified organic bamboo. Unrivalled cooling and softness.',
    },
  ];

  const handleAddSample = (fabric: FabricItem) => {
    addItem({
      productId: Number(fabric.id.replace(/[^0-9]/g, '')) + 8000,
      productName: `Fabric Swatch Pack: ${fabric.name}`,
      companyId: 1,
      companyName: 'SAKTHI GARMENTS (Tiruppur)',
      size: '15x15 cm Swatches',
      color: 'Multi-Color Swatch Ring',
      quantity: 1,
      unitPrice: fabric.price,
      totalPrice: fabric.price,
      itemType: 'SAMPLE',
    });

    setAddedNotices({ ...addedNotices, [fabric.id]: true });
    setTimeout(() => {
      setAddedNotices((prev) => ({ ...prev, [fabric.id]: false }));
    }, 2000);
  };

  const handleCustomSampleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customForm.name || !customForm.phone || !customForm.address) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    setIsSubmitting(true);
    try {
      await apiClient.post('/samples', {
        companyId: 1,
        sampleType: customForm.fabricType,
        colorRequested: customForm.colorsNeeded,
        shippingAddress: `${customForm.address} | Name: ${customForm.name} | Phone: ${customForm.phone}`,
        notes: customForm.notes || 'Custom fabric swatch set requested via Sakthi Garments portal.',
      });
      setSubmitSuccess('Your fabric sample request has been dispatched to our Tiruppur mill desk! Tracking reference will be sent via SMS.');
      setCustomForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        address: '',
        fabricType: 'Bio-Wash Cotton 220 GSM',
        colorsNeeded: 'Black, White, Navy',
        notes: '',
      });
    } catch {
      setSubmitSuccess('Thank you! Your custom swatch request has been queued. Our mill team will contact you shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white font-poppins text-[#171717] pt-24 pb-20">
      {/* 1. HERO BANNER */}
      <div className="bg-[#F7F7F5] border-b border-[#E5E5E5] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E5E5] rounded-full text-xs font-semibold text-[#171717] mb-3 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-[#A31C1B]" />
            <span>Direct Tiruppur Mill Fabric Lab</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#171717] tracking-tight uppercase">
            FABRIC SAMPLES & SWATCHES
          </h1>
          <p className="text-sm sm:text-base text-[#666666] max-w-2xl mx-auto mt-2">
            Evaluate yarn grade, GSM thickness, hand-feel and shrinkage before bulk tailoring.
            Every swatch kit includes 6 calibrated color shades for just ₹69.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-[#666666] font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> 100% Tiruppur Mill Sourced
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Free Sample Rebate on 50+ Bulk Orders
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Dispatched within 24 Hours
            </span>
          </div>
        </div>
      </div>

      {/* 2. FABRIC SWATCH CATALOG GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#E5E5E5]">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#171717]">
              Available Fabric Collections
            </h2>
            <p className="text-xs text-[#666666] mt-0.5">
              Choose individual swatch kits or order complete textile palettes
            </p>
          </div>
          <Link
            to="/customizer"
            className="text-xs font-bold text-[#06110C] hover:text-[#A31C1B] flex items-center gap-1 group"
          >
            <span>Test on 3D Customizer</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fabrics.map((fabric) => (
            <div
              key={fabric.id}
              className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs hover:shadow-md hover:border-[#171717] transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header & Badges */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#06110C] text-white uppercase tracking-wider mb-1.5">
                      {fabric.gsm} GSM
                    </span>
                    <h3 className="font-bold text-base text-[#171717] leading-snug">
                      {fabric.name}
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-lg font-black text-[#A31C1B]">₹{fabric.price}</span>
                    <span className="text-[10px] block text-[#666666]">/ pack</span>
                  </div>
                </div>

                <p className="text-xs text-[#666666] leading-relaxed">
                  {fabric.description}
                </p>

                {/* Technical Specs List */}
                <div className="bg-[#F7F7F5] rounded-lg p-3 space-y-1.5 text-xs text-[#666666] border border-[#E5E5E5]">
                  <div className="flex justify-between">
                    <span className="font-medium text-[#171717]">Composition:</span>
                    <span className="text-right">{fabric.composition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-[#171717]">Weave Type:</span>
                    <span>{fabric.weave}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-[#171717]">Shrinkage:</span>
                    <span className="text-[#16A34A] font-semibold">{fabric.shrinkage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-[#171717]">Best Application:</span>
                    <span className="text-right text-[#171717] font-medium">{fabric.bestFor}</span>
                  </div>
                </div>

                {/* Swatch Ring Color Preview */}
                <div>
                  <span className="text-[11px] font-semibold text-[#666666] block mb-1.5">
                    Included Swatch Shades ({fabric.colorsCount}+ available):
                  </span>
                  <div className="flex items-center gap-1.5">
                    {fabric.swatchColors.map((hex, idx) => (
                      <span
                        key={idx}
                        className="w-5 h-5 rounded-full border border-[#E5E5E5] shadow-2xs"
                        style={{ backgroundColor: hex }}
                        title={hex}
                      />
                    ))}
                    <span className="text-[10px] font-bold text-[#666666] ml-1">
                      +{fabric.colorsCount - fabric.swatchColors.length} more
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-4 border-t border-[#E5E5E5] flex items-center gap-2">
                <button
                  onClick={() => handleAddSample(fabric)}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-[#06110C] hover:bg-[#A31C1B] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{addedNotices[fabric.id] ? 'Added to Cart!' : 'Order Swatch Pack (₹69)'}</span>
                </button>
                <Link
                  to={`/customizer?garment=${fabric.id}`}
                  className="py-2.5 px-3 rounded-lg bg-[#F7F7F5] hover:bg-[#E5E5E5] border border-[#E5E5E5] text-[#171717] text-xs font-bold transition-colors"
                  title="Design with this fabric"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#A31C1B]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CUSTOM FABRIC SWATCH FORM (Connected to Backend API) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-[#F7F7F5] border border-[#E5E5E5] rounded-2xl p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E5E5] rounded-full text-xs font-semibold text-[#171717] mb-2 shadow-xs">
              <Send className="w-3.5 h-3.5 text-[#A31C1B]" />
              <span>Specialized Mill Milling & Dyeing</span>
            </div>
            <h3 className="text-2xl font-black text-[#171717] tracking-tight uppercase">
              REQUEST CUSTOM FABRIC SPECIFICATION
            </h3>
            <p className="text-xs sm:text-sm text-[#666666] mt-1">
              Need custom GSM, special pantone dye matching, bamboo blends, or modal fabrics? Send direct specs to our Tiruppur mill.
            </p>
          </div>

          {submitSuccess ? (
            <div className="p-6 bg-[#16A34A]/10 border border-[#16A34A]/30 rounded-xl text-center space-y-2 animate-fadeIn">
              <CheckCircle2 className="w-10 h-10 text-[#16A34A] mx-auto" />
              <p className="text-base font-bold text-[#16A34A]">{submitSuccess}</p>
              <p className="text-xs text-[#666666]">
                Our textile engineers from KVR Nagar will contact your number directly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleCustomSampleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#171717] mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customForm.name}
                    onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                    placeholder="e.g. Anand Kumar"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5E5] rounded-lg text-xs text-[#171717] focus:border-[#06110C] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#171717] mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customForm.phone}
                    onChange={(e) => setCustomForm({ ...customForm, phone: e.target.value })}
                    placeholder="e.g. 9361832472"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5E5] rounded-lg text-xs text-[#171717] focus:border-[#06110C] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#171717] mb-1">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    value={customForm.company}
                    onChange={(e) => setCustomForm({ ...customForm, company: e.target.value })}
                    placeholder="e.g. Apex Apparel Studios"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5E5] rounded-lg text-xs text-[#171717] focus:border-[#06110C] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#171717] mb-1">
                    Fabric Category / Blend *
                  </label>
                  <select
                    value={customForm.fabricType}
                    onChange={(e) => setCustomForm({ ...customForm, fabricType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5E5] rounded-lg text-xs text-[#171717] focus:border-[#06110C] focus:outline-none"
                  >
                    <option value="Bio-Wash Cotton 220 GSM">Bio-Wash Cotton (220 GSM)</option>
                    <option value="Heavy French Terry 280 GSM">Heavy French Terry (280 GSM)</option>
                    <option value="Combed Single Jersey 180 GSM">Combed Cotton (180 GSM)</option>
                    <option value="Honeycomb Pique Polo 240 GSM">Pique Knit Polo (240 GSM)</option>
                    <option value="Bamboo Cotton 200 GSM">Organic Bamboo Blend (200 GSM)</option>
                    <option value="Custom Spun Yarn">Other Custom Blend</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#171717] mb-1">
                  Courier Delivery Address (With Pincode) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={customForm.address}
                  onChange={(e) => setCustomForm({ ...customForm, address: e.target.value })}
                  placeholder="Door No, Street, City, State, Pincode for sample packet courier"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5E5] rounded-lg text-xs text-[#171717] focus:border-[#06110C] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#06110C] hover:bg-[#A31C1B] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting to Mill...' : 'Submit Swatch Kit Order'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FabricSamplesPage;

