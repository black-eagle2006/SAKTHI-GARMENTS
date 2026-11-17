import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Layers,
  Check,
  ChevronRight,
  Filter,
  Palette,
  ArrowRight,
  Shirt,
} from 'lucide-react';
import { useCustomizer } from '../context/CustomizerContext';

interface TemplateCardItem {
  id: string;
  title: string;
  category: string;
  garmentColor: string;
  garmentColorName: string;
  garmentType: 'round-neck' | 'polo';
  tags: string[];
  frontLayers: any[];
  backLayers: any[];
}

export const DesignTemplatesPage: React.FC = () => {
  const navigate = useNavigate();
  const { loadTemplate, setGarmentType, setTshirtColor } = useCustomizer();
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const templates: TemplateCardItem[] = [
    {
      id: 'tpl-101',
      title: 'Tiruppur Textile Capital 2026',
      category: 'Streetwear',
      garmentColor: '#171717',
      garmentColorName: 'Pitch Black',
      garmentType: 'round-neck',
      tags: ['Streetwear', 'Tiruppur', 'Urban'],
      frontLayers: [
        {
          id: 'lyr-1',
          type: 'text',
          content: 'TIRUPPUR',
          x: 0.5,
          y: 0.38,
          scale: 1.25,
          rotation: 0,
          color: '#FFFFFF',
          fontFamily: 'Outfit, sans-serif',
          fontSize: 48,
          side: 'front',
        },
        {
          id: 'lyr-2',
          type: 'text',
          content: 'TEXTILE CAPITAL // EST. 1970',
          x: 0.5,
          y: 0.52,
          scale: 0.8,
          rotation: 0,
          color: '#A31C1B',
          fontFamily: 'Poppins, sans-serif',
          fontSize: 20,
          side: 'front',
        },
      ],
      backLayers: [],
    },
    {
      id: 'tpl-102',
      title: 'Sakthi Minimal Stitch Couture',
      category: 'Minimalist',
      garmentColor: '#FFFFFF',
      garmentColorName: 'Pure White',
      garmentType: 'round-neck',
      tags: ['Minimalist', 'Clean', 'Modern'],
      frontLayers: [
        {
          id: 'lyr-3',
          type: 'text',
          content: 'YOUR DESIGN. OUR STITCH.',
          x: 0.5,
          y: 0.45,
          scale: 0.9,
          rotation: 0,
          color: '#171717',
          fontFamily: 'Outfit, sans-serif',
          fontSize: 30,
          side: 'front',
        },
      ],
      backLayers: [],
    },
    {
      id: 'tpl-103',
      title: 'Tamil Pride Signature Crest',
      category: 'Cultural',
      garmentColor: '#06110C',
      garmentColorName: 'Forest Green',
      garmentType: 'round-neck',
      tags: ['Tamil', 'Culture', 'Heritage'],
      frontLayers: [
        {
          id: 'lyr-4',
          type: 'text',
          content: 'தமிழ்நாடு',
          x: 0.5,
          y: 0.40,
          scale: 1.35,
          rotation: 0,
          color: '#FACC15',
          fontFamily: 'Outfit, sans-serif',
          fontSize: 54,
          side: 'front',
        },
        {
          id: 'lyr-5',
          type: 'text',
          content: 'WEAVERS OF PRIDE',
          x: 0.5,
          y: 0.56,
          scale: 0.75,
          rotation: 0,
          color: '#FFFFFF',
          fontFamily: 'Poppins, sans-serif',
          fontSize: 18,
          side: 'front',
        },
      ],
      backLayers: [],
    },
    {
      id: 'tpl-104',
      title: 'Athletic Performance League 26',
      category: 'Sports',
      garmentColor: '#1E293B',
      garmentColorName: 'Deep Navy',
      garmentType: 'polo',
      tags: ['Sports', 'Marathon', 'Club'],
      frontLayers: [
        {
          id: 'lyr-6',
          type: 'text',
          content: 'ATHLETICS 26',
          x: 0.5,
          y: 0.40,
          scale: 1.15,
          rotation: 0,
          color: '#38BDF8',
          fontFamily: 'Impact, sans-serif',
          fontSize: 44,
          side: 'front',
        },
        {
          id: 'lyr-7',
          type: 'text',
          content: 'SPEED & ENDURANCE',
          x: 0.5,
          y: 0.54,
          scale: 0.7,
          rotation: 0,
          color: '#FFFFFF',
          fontFamily: 'Outfit, sans-serif',
          fontSize: 18,
          side: 'front',
        },
      ],
      backLayers: [],
    },
    {
      id: 'tpl-105',
      title: 'Corporate Executive Monogram',
      category: 'Corporate',
      garmentColor: '#FFFFFF',
      garmentColorName: 'Pure White',
      garmentType: 'polo',
      tags: ['Corporate', 'Uniform', 'Office'],
      frontLayers: [
        {
          id: 'lyr-8',
          type: 'text',
          content: 'GLOBAL TECH LABS',
          x: 0.35,
          y: 0.35,
          scale: 0.7,
          rotation: 0,
          color: '#06110C',
          fontFamily: 'Outfit, sans-serif',
          fontSize: 22,
          side: 'front',
        },
      ],
      backLayers: [],
    },
    {
      id: 'tpl-106',
      title: 'College Fest Euphoria 2026',
      category: 'Events',
      garmentColor: '#A31C1B',
      garmentColorName: 'Crimson Red',
      garmentType: 'round-neck',
      tags: ['College', 'Fest', 'Events'],
      frontLayers: [
        {
          id: 'lyr-9',
          type: 'text',
          content: 'CAMPUS VIBES',
          x: 0.5,
          y: 0.42,
          scale: 1.2,
          rotation: 0,
          color: '#FFFFFF',
          fontFamily: 'Impact, sans-serif',
          fontSize: 46,
          side: 'front',
        },
        {
          id: 'lyr-10',
          type: 'text',
          content: 'ANNUAL CULTURAL CONCLAVE',
          x: 0.5,
          y: 0.54,
          scale: 0.75,
          rotation: 0,
          color: '#FACC15',
          fontFamily: 'Poppins, sans-serif',
          fontSize: 18,
          side: 'front',
        },
      ],
      backLayers: [],
    },
  ];

  const categories = ['ALL', 'Streetwear', 'Minimalist', 'Cultural', 'Sports', 'Corporate', 'Events'];

  const filtered =
    selectedCategory === 'ALL'
      ? templates
      : templates.filter((t) => t.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleApplyTemplate = (tpl: TemplateCardItem) => {
    loadTemplate(tpl as any);
    setGarmentType(tpl.garmentType);
    setTshirtColor(tpl.garmentColor);
    navigate('/customizer');
  };

  return (
    <div className="w-full min-h-screen bg-white font-poppins text-[#171717] pt-24 pb-20">
      {/* 1. HERO SECTION */}
      <div className="bg-[#F7F7F5] border-b border-[#E5E5E5] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E5E5] rounded-full text-xs font-semibold text-[#171717] mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A31C1B]" />
            <span>Curated Apparel Graphics</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#171717] tracking-tight uppercase">
            DESIGN TEMPLATES GALLERY
          </h1>
          <p className="text-sm sm:text-base text-[#666666] max-w-2xl mx-auto mt-2">
            Pre-configured streetwear graphics, minimal typography, collegiate crests, and sports emblems.
            Load any template directly into the 3D Customizer with one click.
          </p>
        </div>
      </div>

      {/* 2. CATEGORY FILTER TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-center flex-wrap gap-2 pb-6 border-b border-[#E5E5E5]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#06110C] text-white shadow-xs'
                  : 'bg-[#F7F7F5] border border-[#E5E5E5] text-[#666666] hover:bg-[#E5E5E5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. TEMPLATES GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:border-[#171717] transition-all flex flex-col justify-between group"
            >
              {/* Graphic Mockup Box */}
              <div
                className="w-full h-56 flex items-center justify-center p-6 relative"
                style={{ backgroundColor: tpl.garmentColor }}
              >
                {/* Simulated T-shirt graphic layout */}
                <div className="text-center p-4 border border-white/20 rounded-xl bg-black/10 backdrop-blur-xs max-w-xs w-full">
                  {tpl.frontLayers.map((layer) => (
                    <p
                      key={layer.id}
                      style={{
                        color: layer.color,
                        fontFamily: layer.fontFamily,
                        fontSize: `${layer.fontSize / 2.2}px`,
                      }}
                      className="font-bold leading-tight uppercase tracking-wider"
                    >
                      {layer.content}
                    </p>
                  ))}
                </div>

                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-white/90 text-[10px] font-bold text-[#171717] uppercase">
                  {tpl.garmentColorName}
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#666666] mb-1">
                    <span className="font-semibold uppercase tracking-wider text-[#A31C1B]">
                      {tpl.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Shirt className="w-3.5 h-3.5" />
                      <span className="capitalize">{tpl.garmentType.replace('-', ' ')}</span>
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-[#171717] leading-snug">
                    {tpl.title}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {tpl.tags.map((tg, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-[#F7F7F5] rounded text-[10px] text-[#666666] border border-[#E5E5E5]"
                      >
                        #{tg}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleApplyTemplate(tpl)}
                  className="w-full py-2.5 rounded-lg bg-[#06110C] group-hover:bg-[#A31C1B] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Customize in 3D Studio</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignTemplatesPage;
