import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Building2, Package, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Pick Blank Garment & Hue',
      desc: 'Select from certified 100% combed cotton, 220 GSM luxury heavyweights, or performance blends directly from Tiruppur mills.',
      icon: Package,
    },
    {
      num: '02',
      title: '3D Customization & AI Assistance',
      desc: 'Insert typography, upload logos, or prompt Google Gemini AI to synthesize bespoke design themes directly mapped to your 3D T-shirt.',
      icon: Sparkles,
    },
    {
      num: '03',
      title: 'Choose Direct Tiruppur Mill',
      desc: 'Select verified garment companies like SAKTHI GARMENTS. View real factory stock, transparent itemized pricing, and lead times.',
      icon: Building2,
    },
    {
      num: '04',
      title: 'Order Swatch (₹69) or Custom Garment',
      desc: 'Test fabric quality first with our ₹69 cloth sample pack, or complete secure checkout for single pieces or bulk runs.',
      icon: CheckCircle2,
    },
    {
      num: '05',
      title: 'Tiruppur Knitting, Print & Fast Dispatch',
      desc: 'Live production tracking from knitting and bio-wash to digital screen printing and express doorstep courier delivery.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white text-[#171717] font-poppins">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#A31C1B]" />
            <span>FULFILLMENT BLUEPRINT</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#171717] uppercase">
            How Sakthi Garments Works
          </h1>
          <p className="text-[#666666] text-base leading-relaxed">
            From 3D digital canvas to your doorstep. Powered by advanced web graphics, AI design assistance, and direct Tiruppur textile mills.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="bg-[#F7F7F5] p-6 sm:p-8 rounded-3xl border border-[#E5E5E5] hover:border-[#171717] transition-all flex flex-col sm:flex-row items-start sm:items-center gap-6 group shadow-xs"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#06110C] border border-[#171717] flex items-center justify-center font-black text-xl text-white shadow-xs shrink-0 group-hover:bg-[#A31C1B] transition-colors">
                  {st.num}
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-bold text-[#171717] group-hover:text-[#A31C1B] transition-colors">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                    {st.desc}
                  </p>
                </div>
                <Icon className="w-6 h-6 text-[#A31C1B] shrink-0 hidden sm:block opacity-60 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>

        <div className="text-center pt-6">
          <Link
            to="/customizer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#06110C] hover:bg-[#A31C1B] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#FACC15]" />
            <span>Experience the 3D Customizer Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
