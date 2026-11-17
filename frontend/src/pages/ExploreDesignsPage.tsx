import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Sparkles, Search, ArrowRight } from 'lucide-react';
import { useCustomizer } from '../context/CustomizerContext';

export const ExploreDesignsPage: React.FC = () => {
  const navigate = useNavigate();
  const { loadTemplate } = useCustomizer();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'All',
    'Streetwear',
    'Minimalist',
    'Tamil Typography',
    'Anime & Cyber',
    'Sports & Fit',
    'Events & Startups',
  ];

  const templates = [
    {
      id: 1,
      title: 'Tiruppur Athletic 2026',
      category: 'Streetwear',
      tshirtColor: '#171717',
      tags: ['Athletic', 'Tiruppur', 'Streetwear'],
      frontLayers: [
        {
          id: 'tpl-1',
          type: 'text' as const,
          content: 'TIRUPPUR',
          x: 0.5,
          y: 0.38,
          scale: 1.2,
          rotation: 0,
          color: '#FFFFFF',
          fontFamily: 'Outfit, sans-serif',
          fontSize: 48,
          side: 'front' as const,
        },
        {
          id: 'tpl-2',
          type: 'text' as const,
          content: 'TEXTILE CAPITAL // 2026',
          x: 0.5,
          y: 0.52,
          scale: 0.8,
          rotation: 0,
          color: '#A31C1B',
          fontFamily: 'Outfit, sans-serif',
          fontSize: 24,
          side: 'front' as const,
        },
      ],
      backLayers: [],
    },
    {
      id: 2,
      title: 'Minimalist Bio-Wash Studio',
      category: 'Minimalist',
      tshirtColor: '#FFFFFF',
      tags: ['Minimalist', 'Clean', 'Cotton'],
      frontLayers: [
        {
          id: 'tpl-3',
          type: 'text' as const,
          content: 'SAKTHI GARMENTS',
          x: 0.5,
          y: 0.45,
          scale: 0.9,
          rotation: 0,
          color: '#171717',
          fontFamily: 'Cabinet Grotesk, sans-serif',
          fontSize: 32,
          side: 'front' as const,
        },
      ],
      backLayers: [],
    },
    {
      id: 3,
      title: 'Classic Heritage Tamil Weave',
      category: 'Tamil Typography',
      tshirtColor: '#06110C',
      tags: ['Tamil', 'Culture', 'Typography'],
      frontLayers: [
        {
          id: 'tpl-4',
          type: 'text' as const,
          content: 'தமிழ்',
          x: 0.5,
          y: 0.42,
          scale: 1.4,
          rotation: 0,
          color: '#FACC15',
          fontFamily: 'Outfit, sans-serif',
          fontSize: 64,
          side: 'front' as const,
        },
      ],
      backLayers: [],
    },
  ];

  const filtered = templates.filter((t) => {
    const matchesCat = activeCategory === 'All' || t.category === activeCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleApplyTemplate = (tpl: any) => {
    loadTemplate(tpl);
    navigate('/customizer');
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white text-[#171717] font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] text-xs font-semibold shadow-xs">
            <Compass className="w-3.5 h-3.5 text-[#A31C1B]" />
            <span>CURATED DESIGN ARCHIVE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#171717] leading-tight uppercase">
            Original Design <br />
            <span className="text-[#A31C1B]">Templates & Graphics</span>
          </h1>
          <p className="text-[#666666] text-base leading-relaxed">
            Select any editorial concept and customize it live in the 3D studio.
            Every design is print-aligned for bio-washed combed cotton knitwear.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#06110C] text-white shadow-xs'
                    : 'bg-[#F7F7F5] border border-[#E5E5E5] text-[#666666] hover:text-[#171717]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#A3A3A3] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search design themes..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] text-xs focus:outline-none focus:border-[#06110C]"
            />
          </div>
        </div>

        {/* Grid of Templates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-[#F7F7F5] rounded-3xl border border-[#E5E5E5] p-6 hover:border-[#171717] transition-all space-y-4 shadow-xs"
            >
              <div
                className="aspect-square rounded-2xl flex items-center justify-center p-6 border border-[#E5E5E5] shadow-inner"
                style={{ backgroundColor: tpl.tshirtColor }}
              >
                <div className="text-center">
                  {tpl.frontLayers.map((l: any, i: number) => (
                    <div
                      key={i}
                      style={{
                        color: l.color,
                        fontSize: `${l.fontSize * 0.4}px`,
                        fontFamily: l.fontFamily,
                      }}
                      className="font-bold tracking-tight"
                    >
                      {l.content}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A31C1B]">
                  {tpl.category}
                </span>
                <h3 className="text-base font-bold text-[#171717] mt-0.5">{tpl.title}</h3>
              </div>

              <button
                onClick={() => handleApplyTemplate(tpl)}
                className="w-full py-2.5 rounded-xl bg-[#06110C] hover:bg-[#A31C1B] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
                <span>Customize in 3D</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreDesignsPage;
