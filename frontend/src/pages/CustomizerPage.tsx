import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Type,
  Image as ImageIcon,
  Sparkles,
  Layers as LayersIcon,
  RotateCcw,
  RotateCw,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Download,
  Save,
  ShoppingBag,
  Camera,
  Check,
  Building2,
  Sliders,
  CheckCircle2,
  AlignCenter,
  Move,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  ArrowUpToLine,
  ArrowDownToLine,
  Edit3,
  Lock,
  Unlock,
  AlignLeft,
  AlignRight,
} from 'lucide-react';
import { Customizer3DCanvas } from '../three/Customizer3DCanvas';
import { useCustomizer } from '../context/CustomizerContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/client';
import { SAKTHI_BRAND_CONFIG } from '../data/productsData';
import { generateAiArtworkGraphic } from '../utils/aiArtworkGenerator';

export const CustomizerPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { addItem } = useCart();
  const {
    garmentType,
    setGarmentType,
    tshirtColor,
    setTshirtColor,
    cameraView,
    setCameraView,
    activeSide,
    setActiveSide,
    frontLayers,
    backLayers,
    activeLayerId,
    setActiveLayerId,
    activeLayer,
    addTextLayer,
    addImageLayer,
    updateActiveLayer,
    deleteLayer,
    duplicateLayer,
    moveLayerOrder,
    bringToFront,
    sendToBack,
    undo,
    redo,
    canUndo,
    canRedo,
    resetDesign,
    loadTemplate,
    saveDesignToBackend,
    calculateCustomPrice,
  } = useCustomizer();

  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'ai' | 'templates' | 'layers' | 'garment'>('text');
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedCompanyId, setSelectedCompanyId] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [newTextInput, setNewTextInput] = useState('YOUR TEXT');
  const [isRotationLocked, setIsRotationLocked] = useState(false);
  const [mobileTab, setMobileTab] = useState<'preview' | 'tools' | 'garment'>('preview');

  // Check URL parameters (e.g. ?garment=performance-polo&name=Performance%20Polo)
  useEffect(() => {
    const garmentParam = searchParams.get('garment');
    if (garmentParam) {
      if (garmentParam.includes('polo')) {
        setGarmentType('polo');
      } else {
        setGarmentType('round-neck');
      }
    }
  }, [searchParams, setGarmentType]);

  // AI Assistant State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuccessMsg, setAiSuccessMsg] = useState<string | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<{
    concept?: string;
    suggestedColor?: string;
    typography?: string;
    suggestedText?: string;
    recommendedFabric?: string;
    modelUsed?: string;
  } | null>(null);
  const [generatedArtworkUrl, setGeneratedArtworkUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];

  const colorPalette = [
    { name: 'Pure White', hex: '#FFFFFF' },
    { name: 'Pitch Black', hex: '#171717' },
    { name: 'Deep Navy', hex: '#1E293B' },
    { name: 'Forest Green', hex: '#06110C' },
    { name: 'Crimson Red', hex: '#A31C1B' },
    { name: 'Sky Blue', hex: '#38BDF8' },
    { name: 'Royal Violet', hex: '#6D28D9' },
    { name: 'Sunset Amber', hex: '#D97706' },
    { name: 'Melange Heather', hex: '#94A3B8' },
    { name: 'Emerald Green', hex: '#059669' },
  ];

  const fonts = [
    { name: 'Outfit (Modern Bold)', value: 'Outfit, sans-serif' },
    { name: 'Poppins (Clean Sans)', value: 'Poppins, sans-serif' },
    { name: 'Plus Jakarta Sans', value: 'Plus Jakarta Sans, sans-serif' },
    { name: 'Impact (Heavy Display)', value: 'Impact, sans-serif' },
    { name: 'Courier New (Monospace)', value: 'Courier New, monospace' },
    { name: 'Playfair Display (Serif)', value: 'Playfair Display, serif' },
  ];

  const templatesList = [
    {
      id: 1,
      title: 'Tiruppur Textile Capital',
      category: 'Streetwear',
      tshirtColor: '#171717',
      tags: ['Streetwear', 'Tiruppur'],
      thumbnailUrl: '',
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
          content: 'TEXTILE CAPITAL OF INDIA',
          x: 0.5,
          y: 0.52,
          scale: 0.8,
          rotation: 0,
          color: '#A31C1B',
          fontFamily: 'Poppins, sans-serif',
          fontSize: 20,
          side: 'front' as const,
        },
      ],
      backLayers: [],
    },
    {
      id: 2,
      title: 'Sakthi Minimal Stitch',
      category: 'Minimalist',
      tshirtColor: '#FFFFFF',
      tags: ['Minimalist'],
      thumbnailUrl: '',
      frontLayers: [
        {
          id: 'tpl-3',
          type: 'text' as const,
          content: 'YOUR DESIGN. OUR STITCH.',
          x: 0.5,
          y: 0.45,
          scale: 0.9,
          rotation: 0,
          color: '#171717',
          fontFamily: 'Outfit, sans-serif',
          fontSize: 28,
          side: 'front' as const,
        },
      ],
      backLayers: [],
    },
    {
      id: 3,
      title: 'Tamil Pride Signature',
      category: 'Culture',
      tshirtColor: '#06110C',
      tags: ['Tamil', 'Culture'],
      thumbnailUrl: '',
      frontLayers: [
        {
          id: 'tpl-4',
          type: 'text' as const,
          content: 'தமிழ்நாடு',
          x: 0.5,
          y: 0.42,
          scale: 1.3,
          rotation: 0,
          color: '#FACC15',
          fontFamily: 'Outfit, sans-serif',
          fontSize: 54,
          side: 'front' as const,
        },
      ],
      backLayers: [],
    },
    {
      id: 4,
      title: 'Athletic Club 2026',
      category: 'Sports',
      tshirtColor: '#1E293B',
      tags: ['Sports', 'Club'],
      thumbnailUrl: '',
      frontLayers: [
        {
          id: 'tpl-5',
          type: 'text' as const,
          content: 'ATHLETICS 26',
          x: 0.5,
          y: 0.40,
          scale: 1.1,
          rotation: 0,
          color: '#38BDF8',
          fontFamily: 'Impact, sans-serif',
          fontSize: 44,
          side: 'front' as const,
        },
      ],
      backLayers: [],
    },
  ];

  // Handle image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Maximum image file size is 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      if (dataUrl) {
        addImageLayer(dataUrl);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Helper to determine text contrast
  const isLightShade = (hex: string) => {
    const c = (hex || '').replace('#', '');
    if (c.length !== 6) return true;
    const r = parseInt(c.slice(0, 2), 16);
    const g = parseInt(c.slice(2, 4), 16);
    const b = parseInt(c.slice(4, 6), 16);
    return 0.299 * r + 0.587 * g + 0.114 * b > 150;
  };

  // Handle Gemini AI Design Assistance & Generative Artwork Image Creation
  const handleGenerateAiConcept = async (customPrompt?: string) => {
    const promptToUse = customPrompt || aiPrompt;
    if (!promptToUse.trim()) return;
    setAiLoading(true);
    setAiSuccessMsg(null);

    // 1. Procedurally generate vector graphic artwork based on prompt
    const generatedGraphic = generateAiArtworkGraphic(promptToUse);
    setGeneratedArtworkUrl(generatedGraphic.svgDataUrl);

    const apiKey = localStorage.getItem('sg_gemini_api_key') || '';

    try {
      const res = await apiClient.post('/ai/suggest-design', {
        prompt: promptToUse,
        apiKey: apiKey.trim(),
      });
      const data = res.data;
      setAiSuggestions(data);

      const newGarmentColor = data.suggestedColor || generatedGraphic.recommendedGarmentColor || tshirtColor;
      if (data.suggestedColor) {
        setTshirtColor(data.suggestedColor);
      } else {
        setTshirtColor(generatedGraphic.recommendedGarmentColor);
      }

      // 2. APPLY THE GENERATED AI ARTWORK IMAGE DIRECTLY ONTO THE 3D T-SHIRT!
      addImageLayer(generatedGraphic.svgDataUrl);

      // 3. Add headline typography layer
      const textToAdd = data.suggestedText || generatedGraphic.headlineText;
      if (textToAdd) {
        const textColor = isLightShade(newGarmentColor) ? '#171717' : '#FFFFFF';
        addTextLayer(textToAdd, textColor);
      }

      setCameraView('front');
      setAiSuccessMsg(`✨ AI Generated Artwork Image & Slogan applied to 3D T-shirt!`);
      setTimeout(() => setAiSuccessMsg(null), 5000);
    } catch {
      // Offline fallback: intelligent heuristic suggestion
      const newGarmentColor = generatedGraphic.recommendedGarmentColor;
      setTshirtColor(newGarmentColor);

      // APPLY THE GENERATED AI ARTWORK IMAGE DIRECTLY ONTO THE 3D T-SHIRT!
      addImageLayer(generatedGraphic.svgDataUrl);

      const textColor = isLightShade(newGarmentColor) ? '#171717' : '#FFFFFF';
      addTextLayer(generatedGraphic.headlineText, textColor);

      const fallbackSuggestions = {
        concept: `AI Conceptualized: "${promptToUse}" with vector graphic emblem and high-contrast typography engineered for Tiruppur knitwear precision.`,
        suggestedColor: newGarmentColor,
        suggestedText: generatedGraphic.headlineText,
        typography: 'Outfit, sans-serif',
        recommendedFabric: '220 GSM Bio-Wash Single Jersey Cotton',
        modelUsed: 'Sakthi Generative Artwork Engine',
      };
      setAiSuggestions(fallbackSuggestions);
      setCameraView('front');
      setAiSuccessMsg(`✨ Applied AI Artwork Graphic: "${generatedGraphic.title}" onto 3D T-shirt!`);
      setTimeout(() => setAiSuccessMsg(null), 5000);
    } finally {
      setAiLoading(false);
    }
  };

  // Download 3D Customized T-Shirt as High-Resolution PNG Image
  const handleDownloadDesignImage = () => {
    try {
      // Query WebGL canvas from the 3D Customizer viewport
      const canvas = (document.getElementById('customizer-webgl-canvas') as HTMLCanvasElement) || document.querySelector('canvas');
      if (canvas) {
        const dataUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `sakthi_custom_tshirt_${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setSaveStatus('Downloaded 3D T-shirt design image (PNG)!');
        setTimeout(() => setSaveStatus(null), 3500);
        return;
      }
    } catch (err) {
      console.warn('Canvas direct download snapshot:', err);
    }
    // Fallback if canvas snapshot is blocked
    handleDownloadPrintSpec();
  };

  // Add customized item to cart
  const handleAddToCart = () => {
    const unitPrice = calculateCustomPrice();
    addItem({
      productId: 1,
      productName: 'Sakthi Custom 3D T-Shirt',
      companyId: selectedCompanyId,
      companyName: 'SAKTHI GARMENTS (KVR Nagar, Tiruppur)',
      size: selectedSize,
      color: tshirtColor,
      quantity,
      unitPrice,
      totalPrice: unitPrice * quantity,
      itemType: 'CUSTOM',
      designProject: {
        title: 'Customized 3D T-Shirt',
        tshirtColor,
        frontLayers,
        backLayers,
      },
    });
    navigate('/cart');
  };

  // Save design
  const handleSaveDesign = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    const res = await saveDesignToBackend('My Custom 3D T-Shirt');
    setIsSaving(false);
    if (res.success) {
      setSaveStatus('Design saved successfully to your Sakthi account!');
      setTimeout(() => setSaveStatus(null), 3500);
    }
  };

  // Download Print Specifications File (Production Ready JSON)
  const handleDownloadPrintSpec = () => {
    const spec = {
      brand: 'SAKTHI GARMENTS',
      facility: 'KVR Nagar (Near Chennai Bakes), Tiruppur, Tamil Nadu — 641604',
      contactPhone: SAKTHI_BRAND_CONFIG.phone,
      contactEmail: SAKTHI_BRAND_CONFIG.email,
      productionDpi: 300,
      garment: {
        type: garmentType,
        selectedSize,
        baseColorHex: tshirtColor,
      },
      printZones: {
        front: {
          widthMm: 300,
          heightMm: 400,
          layers: frontLayers,
        },
        back: {
          widthMm: 300,
          heightMm: 400,
          layers: backLayers,
        },
      },
      calculatedUnitPriceInr: calculateCustomPrice(),
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(spec, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sakthi_print_spec_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentLayers = activeSide === 'front' ? frontLayers : backLayers;
  const currentTextLayers = currentLayers.filter((l) => l.type === 'text');
  const currentImageLayers = currentLayers.filter((l) => l.type === 'image');
  const currentLayerIndex = activeLayer ? currentLayers.findIndex((l) => l.id === activeLayer.id) : -1;
  const isTopLayer = currentLayerIndex === currentLayers.length - 1;
  const isBottomLayer = currentLayerIndex === 0;

  // Auto-select corresponding layer when opening Text or Artwork tabs
  useEffect(() => {
    if (activeTab === 'text') {
      const isCurrentActiveText = activeLayer && activeLayer.type === 'text';
      if (!isCurrentActiveText && currentTextLayers.length > 0) {
        setActiveLayerId(currentTextLayers[currentTextLayers.length - 1].id);
      }
    } else if (activeTab === 'image') {
      const isCurrentActiveImage = activeLayer && activeLayer.type === 'image';
      if (!isCurrentActiveImage && currentImageLayers.length > 0) {
        setActiveLayerId(currentImageLayers[currentImageLayers.length - 1].id);
      }
    }
  }, [activeTab, activeSide, currentTextLayers.length, currentImageLayers.length, activeLayer, setActiveLayerId]);

  const handleAlign = (
    preset: 'center' | 'leftChest' | 'rightChest' | 'upperChest' | 'lowerTorso' | 'centerX' | 'centerY'
  ) => {
    if (!activeLayer || activeLayer.locked) return;
    switch (preset) {
      case 'center':
        updateActiveLayer({ x: 0.5, y: 0.5 });
        break;
      case 'leftChest':
        updateActiveLayer({ x: 0.35, y: 0.38 });
        break;
      case 'rightChest':
        updateActiveLayer({ x: 0.65, y: 0.38 });
        break;
      case 'upperChest':
        updateActiveLayer({ x: 0.5, y: 0.32 });
        break;
      case 'lowerTorso':
        updateActiveLayer({ x: 0.5, y: 0.65 });
        break;
      case 'centerX':
        updateActiveLayer({ x: 0.5 });
        break;
      case 'centerY':
        updateActiveLayer({ y: 0.5 });
        break;
    }
  };

  const handleNudge = (dx: number, dy: number) => {
    if (!activeLayer || activeLayer.locked) return;
    const newX = Math.min(0.9, Math.max(0.1, Number((activeLayer.x + dx).toFixed(2))));
    const newY = Math.min(0.9, Math.max(0.1, Number((activeLayer.y + dy).toFixed(2))));
    updateActiveLayer({ x: newX, y: newY });
  };

  const SAMPLE_GRAPHICS = [
    {
      name: 'Sakthi Tiruppur Crest',
      tag: 'Heritage Crest',
      svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><circle cx="100" cy="100" r="90" fill="%23171717" stroke="%23A31C1B" stroke-width="6"/><path d="M70 140 L100 60 L130 140 L110 140 L100 110 L90 140 Z" fill="%23FFFFFF"/><text x="100" y="165" font-family="sans-serif" font-weight="bold" font-size="14" fill="%23FFFFFF" text-anchor="middle">SAKTHI</text></svg>`,
    },
    {
      name: 'Tiruppur Knitwear Club',
      tag: 'Athletics Badge',
      svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect x="20" y="20" width="160" height="160" rx="20" fill="%2306110C" stroke="%23FFFFFF" stroke-width="4"/><circle cx="100" cy="90" r="40" fill="none" stroke="%23A31C1B" stroke-width="6"/><text x="100" y="155" font-family="sans-serif" font-weight="bold" font-size="13" fill="%23FFFFFF" text-anchor="middle">TIRUPPUR 26</text></svg>`,
    },
    {
      name: 'Crimson Geometric Star',
      tag: 'Minimalist Icon',
      svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><polygon points="100,20 125,75 185,80 140,120 155,180 100,148 45,180 60,120 15,80 75,75" fill="%23A31C1B"/><circle cx="100" cy="105" r="22" fill="%23171717"/></svg>`,
    },
  ];

  const unitPrice = calculateCustomPrice();

  return (
    // MANDATORY PURE WHITE BACKGROUND WORKSPACE
    <div className="pt-20 min-h-screen bg-white flex flex-col text-[#171717] font-poppins">
      {/* 1. TOP WORKSPACE TOOLBAR (Pure White, #E5E5E5 Border) */}
      <div className="min-h-14 py-2 bg-white border-b border-[#E5E5E5] px-2 sm:px-6 flex items-center justify-between z-30 shadow-xs flex-wrap sm:flex-nowrap gap-2">
        {/* Left Toolbar: Undo, Redo, Reset, Side View Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={undo}
            disabled={!canUndo}
            title="Undo"
            className="p-1.5 sm:p-2 rounded-lg bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] hover:bg-[#E5E5E5] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            title="Redo"
            className="p-1.5 sm:p-2 rounded-lg bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] hover:bg-[#E5E5E5] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={resetDesign}
            title="Reset Design"
            className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-[#F7F7F5] border border-[#E5E5E5] hover:bg-[#A31C1B]/10 hover:text-[#A31C1B] text-xs font-semibold text-[#171717] transition-colors"
          >
            Reset
          </button>

          <div className="h-4 w-px bg-[#E5E5E5] mx-0.5 sm:mx-1" />

          {/* Active Side Toggle (Front / Back) */}
          <div className="flex items-center bg-[#F7F7F5] p-0.5 rounded-lg border border-[#E5E5E5]">
            <button
              onClick={() => {
                setActiveSide('front');
                setCameraView('front');
              }}
              className={`px-2 sm:px-3 py-1 rounded-md text-xs font-bold transition-all ${
                activeSide === 'front' ? 'bg-[#06110C] text-white shadow-xs' : 'text-[#666666] hover:text-[#171717]'
              }`}
            >
              Front
            </button>
            <button
              onClick={() => {
                setActiveSide('back');
                setCameraView('back');
              }}
              className={`px-2 sm:px-3 py-1 rounded-md text-xs font-bold transition-all ${
                activeSide === 'back' ? 'bg-[#06110C] text-white shadow-xs' : 'text-[#666666] hover:text-[#171717]'
              }`}
            >
              Back
            </button>
          </div>
        </div>

        {/* Center: Camera Preset Angles */}
        <div className="hidden md:flex items-center gap-1 text-xs">
          <span className="text-[#666666] text-[11px] mr-1.5 flex items-center gap-1 font-medium">
            <Camera className="w-3.5 h-3.5 text-[#A31C1B]" /> Angles:
          </span>
          <button
            onClick={() => setCameraView('front')}
            className={`px-2.5 py-1 rounded-md transition-colors text-xs ${
              cameraView === 'front'
                ? 'bg-[#06110C] text-white font-bold'
                : 'bg-[#F7F7F5] border border-[#E5E5E5] text-[#666666] hover:text-[#171717]'
            }`}
          >
            Front
          </button>
          <button
            onClick={() => setCameraView('back')}
            className={`px-2.5 py-1 rounded-md transition-colors text-xs ${
              cameraView === 'back'
                ? 'bg-[#06110C] text-white font-bold'
                : 'bg-[#F7F7F5] border border-[#E5E5E5] text-[#666666] hover:text-[#171717]'
            }`}
          >
            Back
          </button>
          <button
            onClick={() => setCameraView('leftSleeve')}
            className={`px-2.5 py-1 rounded-md transition-colors text-xs ${
              cameraView === 'leftSleeve'
                ? 'bg-[#06110C] text-white font-bold'
                : 'bg-[#F7F7F5] border border-[#E5E5E5] text-[#666666] hover:text-[#171717]'
            }`}
          >
            Left Sleeve
          </button>
          <button
            onClick={() => setCameraView('rightSleeve')}
            className={`px-2.5 py-1 rounded-md transition-colors text-xs ${
              cameraView === 'rightSleeve'
                ? 'bg-[#06110C] text-white font-bold'
                : 'bg-[#F7F7F5] border border-[#E5E5E5] text-[#666666] hover:text-[#171717]'
            }`}
          >
            Right Sleeve
          </button>
        </div>

        {/* Right Toolbar: Pricing, Print Spec, Save, Add to Cart */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-wider text-[#666666] font-semibold hidden sm:block">Tiruppur Direct</p>
            <p className="text-sm sm:text-base font-black text-[#A31C1B]">₹{unitPrice}</p>
          </div>

          <button
            onClick={handleDownloadDesignImage}
            title="Download Customized 3D T-Shirt as PNG Image"
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#06110C] hover:bg-[#A31C1B] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">Download Image (PNG)</span>
            <span className="sm:hidden font-bold">PNG</span>
          </button>

          <button
            onClick={handleSaveDesign}
            disabled={isSaving}
            className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg bg-[#F7F7F5] hover:bg-[#E5E5E5] border border-[#E5E5E5] text-xs font-semibold text-[#171717] transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-[#06110C]" />
            <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save'}</span>
          </button>

          <button
            onClick={handleAddToCart}
            id="editor-add-to-cart-btn"
            className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#06110C] hover:bg-[#A31C1B] text-white font-bold text-xs shadow transition-all active:scale-95 whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Order ₹{unitPrice * quantity}</span>
          </button>
        </div>
      </div>

      {/* Save Notification alert */}
      {saveStatus && (
        <div className="bg-[#16A34A]/10 border-b border-[#16A34A]/30 px-4 py-2 text-center text-xs text-[#16A34A] font-semibold flex items-center justify-center gap-1.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* 2. MAIN 3-PANEL WORKSPACE (ALL THREE PANELS PURE WHITE #FFFFFF) */}
      {/* MOBILE / TABLET VIEW SWITCHER (Visible on screens < lg) */}
      <div className="lg:hidden flex items-center justify-around bg-[#F7F7F5] border-b border-[#E5E5E5] px-2 py-1.5 sticky top-14 z-30">
        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === 'preview'
              ? 'bg-white text-[#06110C] shadow-xs border border-[#E5E5E5]'
              : 'text-[#666666] hover:text-[#171717]'
          }`}
        >
          <Camera className="w-3.5 h-3.5 text-[#06110C]" />
          <span>3D View</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('tools')}
          className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === 'tools'
              ? 'bg-white text-[#06110C] shadow-xs border border-[#E5E5E5]'
              : 'text-[#666666] hover:text-[#171717]'
          }`}
        >
          <Type className="w-3.5 h-3.5 text-[#06110C]" />
          <span>Text & Decals</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('garment')}
          className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === 'garment'
              ? 'bg-white text-[#06110C] shadow-xs border border-[#E5E5E5]'
              : 'text-[#666666] hover:text-[#171717]'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-[#A31C1B]" />
          <span>Garment & Order</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row relative bg-white min-h-[640px] lg:min-h-[720px]">
        {/* PANEL 1: LEFT TOOLS PANEL (Pure White #FFFFFF, #E5E5E5 border) */}
        <div
          className={`w-full lg:w-96 bg-white border-r border-[#E5E5E5] flex-col z-20 shadow-xs min-h-[420px] lg:min-h-[720px] overflow-y-auto ${
            mobileTab === 'tools' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Tool Selector Tabs */}
          <div className="flex border-b border-[#E5E5E5] bg-[#F7F7F5] p-1 gap-1">
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold flex flex-col items-center gap-0.5 transition-all ${
                activeTab === 'text'
                  ? 'bg-white text-[#171717] shadow-xs border border-[#E5E5E5]'
                  : 'text-[#666666] hover:text-[#171717]'
              }`}
            >
              <Type className="w-3.5 h-3.5 text-[#06110C]" />
              <span>Text</span>
            </button>
            <button
              onClick={() => setActiveTab('image')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold flex flex-col items-center gap-0.5 transition-all ${
                activeTab === 'image'
                  ? 'bg-white text-[#171717] shadow-xs border border-[#E5E5E5]'
                  : 'text-[#666666] hover:text-[#171717]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#06110C]" />
              <span>Artwork</span>
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold flex flex-col items-center gap-0.5 transition-all ${
                activeTab === 'ai'
                  ? 'bg-white text-[#A31C1B] shadow-xs border border-[#E5E5E5]'
                  : 'text-[#666666] hover:text-[#171717]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A31C1B]" />
              <span>AI Studio</span>
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold flex flex-col items-center gap-0.5 transition-all ${
                activeTab === 'templates'
                  ? 'bg-white text-[#171717] shadow-xs border border-[#E5E5E5]'
                  : 'text-[#666666] hover:text-[#171717]'
              }`}
            >
              <LayersIcon className="w-3.5 h-3.5 text-[#06110C]" />
              <span>Templates</span>
            </button>
            <button
              onClick={() => setActiveTab('layers')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold flex flex-col items-center gap-0.5 transition-all ${
                activeTab === 'layers'
                  ? 'bg-white text-[#171717] shadow-xs border border-[#E5E5E5]'
                  : 'text-[#666666] hover:text-[#171717]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-[#06110C]" />
              <span>Layers</span>
            </button>
          </div>

          {/* TAB CONTENT AREAS */}
          <div className="p-5 flex-1 space-y-5 bg-white">
            {/* TAB 1: TEXT TOOLS */}
            {activeTab === 'text' && (
              <div className="space-y-4">
                {/* Text Items Selector / Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#666666]">
                      Text Elements ({currentTextLayers.length})
                    </label>
                    <button
                      type="button"
                      onClick={() => addTextLayer(newTextInput.trim() || 'NEW TEXT')}
                      className="text-xs font-bold text-[#A31C1B] hover:text-[#06110C] flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Text</span>
                    </button>
                  </div>

                  {/* Multi-Text Quick Selection Pills */}
                  {currentTextLayers.length > 0 && (
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                      {currentTextLayers.map((tl, idx) => {
                        const isSelected = activeLayerId === tl.id;
                        return (
                          <button
                            key={tl.id}
                            type="button"
                            onClick={() => setActiveLayerId(tl.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border shrink-0 ${
                              isSelected
                                ? 'bg-[#06110C] text-white border-[#06110C] shadow-xs'
                                : 'bg-[#F7F7F5] text-[#171717] border-[#E5E5E5] hover:border-[#171717]'
                            }`}
                          >
                            <Type className="w-3 h-3" />
                            <span className="max-w-[110px] truncate">{tl.content || `Text ${idx + 1}`}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* If there's an active text layer, show full editing controls */}
                {activeLayer && activeLayer.type === 'text' ? (
                  <div className="p-4 rounded-xl border border-[#E5E5E5] bg-[#F7F7F5] space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-[#06110C] uppercase tracking-wider">
                        Typography Properties
                      </p>
                      <div className="flex items-center gap-1.5">
                        {/* Lock / Unlock Position Toggle to prevent text moving */}
                        <button
                          type="button"
                          onClick={() => updateActiveLayer({ locked: !activeLayer.locked })}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 border transition-all ${
                            activeLayer.locked
                              ? 'bg-[#A31C1B] text-white border-[#A31C1B] shadow-xs'
                              : 'bg-white text-[#666666] border-[#E5E5E5] hover:text-[#171717]'
                          }`}
                          title={
                            activeLayer.locked
                              ? 'Text position is locked (Cannot be moved or nudged)'
                              : 'Click to lock text in position'
                          }
                        >
                          {activeLayer.locked ? (
                            <Lock className="w-3 h-3 text-white" />
                          ) : (
                            <Unlock className="w-3 h-3 text-[#666666]" />
                          )}
                          <span>{activeLayer.locked ? 'Locked' : 'Lock Pos'}</span>
                        </button>

                        <span className="text-[10px] font-mono text-[#666666] bg-white px-2 py-0.5 rounded border border-[#E5E5E5]">
                          {activeSide.toUpperCase()} Side
                        </span>
                      </div>
                    </div>

                    {/* Text Content Input + Transform Shortcuts + Alignment */}
                    <div>
                      <label className="text-xs text-[#666666] mb-1 block font-medium">Text Content</label>
                      <div className="space-y-1.5">
                        <input
                          type="text"
                          value={activeLayer.content}
                          onChange={(e) => updateActiveLayer({ content: e.target.value })}
                          placeholder="Type decal text..."
                          className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E5E5] text-[#171717] text-sm focus:border-[#06110C] focus:outline-none"
                        />
                        <div className="flex items-center justify-between flex-wrap gap-2 pt-0.5">
                          {/* Case conversions */}
                          <div className="flex items-center gap-1 text-[10px]">
                            <span className="text-[#666666] mr-0.5">Case:</span>
                            <button
                              type="button"
                              onClick={() => updateActiveLayer({ content: (activeLayer.content || '').toUpperCase() })}
                              className="px-2 py-0.5 rounded bg-white border border-[#E5E5E5] hover:border-[#06110C] font-semibold text-[#171717]"
                            >
                              UPPER
                            </button>
                            <button
                              type="button"
                              onClick={() => updateActiveLayer({ content: (activeLayer.content || '').toLowerCase() })}
                              className="px-2 py-0.5 rounded bg-white border border-[#E5E5E5] hover:border-[#06110C] font-semibold text-[#171717]"
                            >
                              lower
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                updateActiveLayer({
                                  content: (activeLayer.content || '')
                                    .toLowerCase()
                                    .replace(/(?:^|\s)\w/g, (m) => m.toUpperCase()),
                                })
                              }
                              className="px-2 py-0.5 rounded bg-white border border-[#E5E5E5] hover:border-[#06110C] font-semibold text-[#171717]"
                            >
                              Title
                            </button>
                          </div>

                          {/* Text Anchor Alignment */}
                          <div className="flex items-center gap-1 text-[10px]">
                            <span className="text-[#666666] mr-0.5">Align:</span>
                            <div className="flex items-center bg-white rounded border border-[#E5E5E5] p-0.5 gap-0.5">
                              <button
                                type="button"
                                onClick={() => updateActiveLayer({ textAlign: 'left' })}
                                className={`p-1 rounded transition-colors ${
                                  activeLayer.textAlign === 'left' ? 'bg-[#06110C] text-white' : 'text-[#666666] hover:text-[#171717]'
                                }`}
                                title="Align Left"
                              >
                                <AlignLeft className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => updateActiveLayer({ textAlign: 'center' })}
                                className={`p-1 rounded transition-colors ${
                                  (!activeLayer.textAlign || activeLayer.textAlign === 'center')
                                    ? 'bg-[#06110C] text-white'
                                    : 'text-[#666666] hover:text-[#171717]'
                                }`}
                                title="Align Center"
                              >
                                <AlignCenter className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => updateActiveLayer({ textAlign: 'right' })}
                                className={`p-1 rounded transition-colors ${
                                  activeLayer.textAlign === 'right' ? 'bg-[#06110C] text-white' : 'text-[#666666] hover:text-[#171717]'
                                }`}
                                title="Align Right"
                              >
                                <AlignRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Font Family Dropdown */}
                    <div>
                      <label className="text-xs text-[#666666] mb-1 block font-medium">Typography Style</label>
                      <select
                        value={activeLayer.fontFamily || 'Outfit, sans-serif'}
                        onChange={(e) => updateActiveLayer({ fontFamily: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E5E5] text-[#171717] text-xs focus:border-[#06110C] focus:outline-none"
                      >
                        {fonts.map((f) => (
                          <option key={f.value} value={f.value}>
                            {f.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Text Color Swatches & Picker */}
                    <div>
                      <label className="text-xs text-[#666666] mb-1 block font-medium">Text Color</label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {['#FFFFFF', '#171717', '#06110C', '#A31C1B', '#FACC15', '#38BDF8', '#94A3B8'].map(
                            (c) => (
                              <button
                                key={c}
                                type="button"
                                onClick={() => updateActiveLayer({ color: c })}
                                title={c}
                                className={`w-6 h-6 rounded-md border-2 transition-all ${
                                  (activeLayer.color || '').toLowerCase() === c.toLowerCase()
                                    ? 'border-[#A31C1B] scale-110 shadow-xs'
                                    : 'border-[#E5E5E5] hover:scale-105'
                                }`}
                                style={{ backgroundColor: c }}
                              />
                            )
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={activeLayer.color || '#171717'}
                            onChange={(e) => updateActiveLayer({ color: e.target.value })}
                            className="w-8 h-8 rounded-md bg-transparent cursor-pointer border border-[#E5E5E5]"
                          />
                          <span className="text-xs font-mono font-semibold text-[#171717]">
                            {activeLayer.color || '#171717'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Font Scale Slider */}
                    <div>
                      <div className="flex justify-between text-xs text-[#666666] mb-1">
                        <span className="font-medium">Font Scale</span>
                        <span className="font-semibold text-[#171717]">{Math.round(activeLayer.scale * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.3"
                        max="2.5"
                        step="0.05"
                        value={activeLayer.scale}
                        onChange={(e) => updateActiveLayer({ scale: parseFloat(e.target.value) })}
                        className="w-full accent-[#06110C] cursor-pointer"
                      />
                    </div>

                    {/* Rotation Slider + Reset */}
                    <div>
                      <div className="flex justify-between items-center text-xs text-[#666666] mb-1">
                        <span className="font-medium">Rotation</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[#171717]">{activeLayer.rotation}°</span>
                          {activeLayer.rotation !== 0 && (
                            <button
                              type="button"
                              onClick={() => updateActiveLayer({ rotation: 0 })}
                              className="text-[10px] text-[#A31C1B] underline hover:no-underline"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                      </div>
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        step="5"
                        value={activeLayer.rotation}
                        onChange={(e) => updateActiveLayer({ rotation: parseInt(e.target.value) })}
                        className="w-full accent-[#06110C] cursor-pointer"
                      />
                    </div>

                    {/* DIRECT POSITION ALIGNMENT PANEL */}
                    <div className="pt-3 border-t border-[#E5E5E5] space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Move className="w-3.5 h-3.5 text-[#06110C]" />
                          <span className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                            Align Position
                          </span>
                        </div>
                        <span className="text-[10px] text-[#666666] font-mono">
                          X: {Math.round(activeLayer.x * 100)}% | Y: {Math.round(activeLayer.y * 100)}%
                        </span>
                      </div>

                      {/* Locked Position Notice */}
                      {activeLayer.locked && (
                        <div className="p-2.5 rounded-lg bg-[#A31C1B]/10 border border-[#A31C1B]/30 flex items-center justify-between text-xs animate-fadeIn">
                          <div className="flex items-center gap-1.5 text-[#A31C1B] font-semibold">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Position is Locked (Text will not move)</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => updateActiveLayer({ locked: false })}
                            className="text-[11px] font-bold text-[#A31C1B] underline hover:no-underline"
                          >
                            Unlock
                          </button>
                        </div>
                      )}

                      {/* Quick Alignment Presets */}
                      <div className="grid grid-cols-3 gap-1.5 text-xs">
                        <button
                          type="button"
                          onClick={() => handleAlign('center')}
                          disabled={activeLayer.locked}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#06110C] hover:bg-[#F7F7F5] disabled:opacity-40 disabled:pointer-events-none font-semibold text-[#171717] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Align to exact center"
                        >
                          <AlignCenter className="w-3.5 h-3.5 text-[#A31C1B]" />
                          <span>Center</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAlign('leftChest')}
                          disabled={activeLayer.locked}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#06110C] hover:bg-[#F7F7F5] disabled:opacity-40 disabled:pointer-events-none font-semibold text-[#171717] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Left Pocket / Chest placement"
                        >
                          <span>Left Pocket</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAlign('rightChest')}
                          disabled={activeLayer.locked}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#06110C] hover:bg-[#F7F7F5] disabled:opacity-40 disabled:pointer-events-none font-semibold text-[#171717] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Right Chest placement"
                        >
                          <span>Right Chest</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAlign('upperChest')}
                          disabled={activeLayer.locked}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#06110C] hover:bg-[#F7F7F5] disabled:opacity-40 disabled:pointer-events-none font-semibold text-[#171717] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Upper Collar / Chest placement"
                        >
                          <span>Upper Collar</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAlign('lowerTorso')}
                          disabled={activeLayer.locked}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#06110C] hover:bg-[#F7F7F5] disabled:opacity-40 disabled:pointer-events-none font-semibold text-[#171717] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Lower Graphic placement"
                        >
                          <span>Lower Graphic</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAlign('centerX')}
                          disabled={activeLayer.locked}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#06110C] hover:bg-[#F7F7F5] disabled:opacity-40 disabled:pointer-events-none font-semibold text-[#171717] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Center horizontally"
                        >
                          <span>Center X</span>
                        </button>
                      </div>

                      {/* Directional Nudge Pad + Sliders */}
                      <div className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-[#E5E5E5]">
                        <div className="grid grid-cols-3 gap-1 w-24 shrink-0">
                          <div />
                          <button
                            type="button"
                            onClick={() => handleNudge(0, -0.02)}
                            disabled={activeLayer.locked}
                            title="Nudge Up"
                            className="p-1 rounded bg-[#F7F7F5] hover:bg-[#E5E5E5] border border-[#E5E5E5] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center text-[#171717]"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <div />
                          <button
                            type="button"
                            onClick={() => handleNudge(-0.02, 0)}
                            disabled={activeLayer.locked}
                            title="Nudge Left"
                            className="p-1 rounded bg-[#F7F7F5] hover:bg-[#E5E5E5] border border-[#E5E5E5] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center text-[#171717]"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAlign('center')}
                            disabled={activeLayer.locked}
                            title="Center Reset"
                            className="p-1 rounded bg-[#06110C] text-white disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center text-[10px] font-bold"
                          >
                            •
                          </button>
                          <button
                            type="button"
                            onClick={() => handleNudge(0.02, 0)}
                            disabled={activeLayer.locked}
                            title="Nudge Right"
                            className="p-1 rounded bg-[#F7F7F5] hover:bg-[#E5E5E5] border border-[#E5E5E5] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center text-[#171717]"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                          <div />
                          <button
                            type="button"
                            onClick={() => handleNudge(0, 0.02)}
                            disabled={activeLayer.locked}
                            title="Nudge Down"
                            className="p-1 rounded bg-[#F7F7F5] hover:bg-[#E5E5E5] border border-[#E5E5E5] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center text-[#171717]"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                          <div />
                        </div>

                        <div className="flex-1 space-y-1.5">
                          <div>
                            <div className="flex justify-between text-[10px] text-[#666666]">
                              <span>Horizontal (X)</span>
                              <span className="font-mono font-bold text-[#171717]">
                                {Math.round(activeLayer.x * 100)}%
                              </span>
                            </div>
                            <input
                              type="range"
                              min="0.1"
                              max="0.9"
                              step="0.01"
                              value={activeLayer.x}
                              disabled={activeLayer.locked}
                              onChange={(e) => updateActiveLayer({ x: parseFloat(e.target.value) })}
                              className="w-full h-1.5 accent-[#06110C] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between text-[10px] text-[#666666]">
                              <span>Vertical (Y)</span>
                              <span className="font-mono font-bold text-[#171717]">
                                {Math.round(activeLayer.y * 100)}%
                              </span>
                            </div>
                            <input
                              type="range"
                              min="0.1"
                              max="0.9"
                              step="0.01"
                              value={activeLayer.y}
                              disabled={activeLayer.locked}
                              onChange={(e) => updateActiveLayer({ y: parseFloat(e.target.value) })}
                              className="w-full h-1.5 accent-[#06110C] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ALTER LAYER STACK IN PROCESS */}
                    <div className="pt-3 border-t border-[#E5E5E5] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-[#06110C]" />
                          <span className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                            Alter Layer
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-[#666666] bg-white px-2 py-0.5 rounded border border-[#E5E5E5]">
                          Stack #{currentLayerIndex + 1} of {currentLayers.length} ({isTopLayer ? 'Top Layer' : isBottomLayer ? 'Base Layer' : 'Mid Layer'})
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-1.5 text-xs">
                        <button
                          type="button"
                          onClick={() => moveLayerOrder(activeLayer.id, 'up')}
                          disabled={isTopLayer}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#06110C] hover:bg-[#F7F7F5] disabled:opacity-30 disabled:pointer-events-none font-semibold text-[#171717] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Bring text forward (above other layers)"
                        >
                          <ArrowUp className="w-3 h-3 text-[#06110C]" />
                          <span>Forward</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => moveLayerOrder(activeLayer.id, 'down')}
                          disabled={isBottomLayer}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#06110C] hover:bg-[#F7F7F5] disabled:opacity-30 disabled:pointer-events-none font-semibold text-[#171717] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Send text backward (behind other layers)"
                        >
                          <ArrowDown className="w-3 h-3 text-[#06110C]" />
                          <span>Backward</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => duplicateLayer(activeLayer.id)}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#06110C] hover:bg-[#F7F7F5] font-semibold text-[#171717] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Duplicate this text"
                        >
                          <Copy className="w-3 h-3 text-[#06110C]" />
                          <span>Duplicate</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteLayer(activeLayer.id)}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#A31C1B] hover:text-[#A31C1B] hover:bg-[#A31C1B]/5 font-semibold text-[#A31C1B] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Delete this text"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* No Text Layer Active: Show Instant Creator */
                  <div className="p-4 rounded-xl border border-[#E5E5E5] bg-[#F7F7F5] space-y-3 text-center">
                    <p className="text-xs font-bold text-[#171717]">Ready to Add Typography?</p>
                    <p className="text-[11px] text-[#666666]">
                      Insert custom text to print onto the {activeSide} of the garment.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTextInput}
                        onChange={(e) => setNewTextInput(e.target.value)}
                        placeholder="e.g. YOUR DESIGN"
                        className="flex-1 px-3 py-2 rounded-lg bg-white border border-[#E5E5E5] text-xs text-[#171717] focus:outline-none focus:border-[#06110C]"
                      />
                      <button
                        type="button"
                        onClick={() => addTextLayer(newTextInput.trim() || 'NEW TEXT')}
                        className="px-4 py-2 rounded-lg bg-[#06110C] hover:bg-[#A31C1B] text-white text-xs font-bold transition-colors shrink-0"
                      >
                        Insert Text
                      </button>
                    </div>

                    <div className="pt-2 border-t border-[#E5E5E5]">
                      <span className="text-[10px] text-[#666666] block mb-1.5">Or tap a quick starter slogan:</span>
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {['YOUR DESIGN, OUR STITCH', 'SAKTHI GARMENTS', 'TIRUPPUR ATHLETICS', 'STRENGTH WITHIN'].map(
                          (phrase) => (
                            <button
                              key={phrase}
                              type="button"
                              onClick={() => addTextLayer(phrase)}
                              className="px-2 py-1 rounded-full bg-white border border-[#E5E5E5] hover:border-[#06110C] text-[10px] font-semibold text-[#171717] transition-colors"
                            >
                              + {phrase}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: ARTWORK (PHOTO) TOOLS */}
            {activeTab === 'image' && (
              <div className="space-y-4">
                {/* Header & Multi-Artwork Pills */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#666666]">
                      Artwork / Photo ({currentImageLayers.length})
                    </label>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-bold text-[#A31C1B] hover:text-[#06110C] flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Upload Image</span>
                    </button>
                  </div>

                  {currentImageLayers.length > 0 && (
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                      {currentImageLayers.map((il, idx) => {
                        const isSelected = activeLayerId === il.id;
                        return (
                          <button
                            key={il.id}
                            type="button"
                            onClick={() => setActiveLayerId(il.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border shrink-0 ${
                              isSelected
                                ? 'bg-[#06110C] text-white border-[#06110C] shadow-xs'
                                : 'bg-[#F7F7F5] text-[#171717] border-[#E5E5E5] hover:border-[#171717]'
                            }`}
                          >
                            <ImageIcon className="w-3 h-3" />
                            <span>Photo {idx + 1}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {/* If there's an active image layer, show full photo controls & alignment */}
                {activeLayer && activeLayer.type === 'image' ? (
                  <div className="p-4 rounded-xl border border-[#E5E5E5] bg-[#F7F7F5] space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-[#06110C] uppercase tracking-wider">
                        Photo / Artwork Controls
                      </p>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => updateActiveLayer({ locked: !activeLayer.locked })}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 border transition-all ${
                            activeLayer.locked
                              ? 'bg-[#A31C1B] text-white border-[#A31C1B] shadow-xs'
                              : 'bg-white text-[#666666] border-[#E5E5E5] hover:text-[#171717]'
                          }`}
                          title={
                            activeLayer.locked
                              ? 'Artwork position is locked (Cannot be moved or nudged)'
                              : 'Click to lock artwork in position'
                          }
                        >
                          {activeLayer.locked ? (
                            <Lock className="w-3 h-3 text-white" />
                          ) : (
                            <Unlock className="w-3 h-3 text-[#666666]" />
                          )}
                          <span>{activeLayer.locked ? 'Locked' : 'Lock Pos'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-[11px] font-semibold text-[#06110C] hover:text-[#A31C1B] underline"
                        >
                          Replace
                        </button>
                      </div>
                    </div>

                    {/* Image Thumbnail Preview */}
                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-[#E5E5E5]">
                      <div className="w-12 h-12 rounded bg-[#F7F7F5] border border-[#E5E5E5] flex items-center justify-center overflow-hidden shrink-0">
                        {activeLayer.content ? (
                          <img
                            src={activeLayer.content}
                            alt="Active Artwork"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-[#666666]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#171717] truncate">Active Image Decal</p>
                        <p className="text-[10px] text-[#666666]">
                          Scale: {Math.round(activeLayer.scale * 100)}% • Rotation: {activeLayer.rotation}°
                        </p>
                      </div>
                    </div>

                    {/* Scale Slider */}
                    <div>
                      <div className="flex justify-between text-xs text-[#666666] mb-1">
                        <span className="font-medium">Scale / Size</span>
                        <span className="font-semibold text-[#171717]">{Math.round(activeLayer.scale * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.2"
                        max="2.5"
                        step="0.05"
                        value={activeLayer.scale}
                        onChange={(e) => updateActiveLayer({ scale: parseFloat(e.target.value) })}
                        className="w-full accent-[#06110C] cursor-pointer"
                      />
                    </div>

                    {/* Rotation Slider + Reset */}
                    <div>
                      <div className="flex justify-between items-center text-xs text-[#666666] mb-1">
                        <span className="font-medium">Rotation</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[#171717]">{activeLayer.rotation}°</span>
                          {activeLayer.rotation !== 0 && (
                            <button
                              type="button"
                              onClick={() => updateActiveLayer({ rotation: 0 })}
                              className="text-[10px] text-[#A31C1B] underline hover:no-underline"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                      </div>
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        step="5"
                        value={activeLayer.rotation}
                        onChange={(e) => updateActiveLayer({ rotation: parseInt(e.target.value) })}
                        className="w-full accent-[#06110C] cursor-pointer"
                      />
                    </div>

                    {/* DIRECT POSITION ALIGNMENT PANEL */}
                    <div className="pt-3 border-t border-[#E5E5E5] space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Move className="w-3.5 h-3.5 text-[#06110C]" />
                          <span className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                            Align Position
                          </span>
                        </div>
                        <span className="text-[10px] text-[#666666] font-mono">
                          X: {Math.round(activeLayer.x * 100)}% | Y: {Math.round(activeLayer.y * 100)}%
                        </span>
                      </div>

                      {/* Locked Position Notice */}
                      {activeLayer.locked && (
                        <div className="p-2.5 rounded-lg bg-[#A31C1B]/10 border border-[#A31C1B]/30 flex items-center justify-between text-xs animate-fadeIn">
                          <div className="flex items-center gap-1.5 text-[#A31C1B] font-semibold">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Position is Locked (Artwork will not move)</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => updateActiveLayer({ locked: false })}
                            className="text-[11px] font-bold text-[#A31C1B] underline hover:no-underline"
                          >
                            Unlock
                          </button>
                        </div>
                      )}

                      {/* Quick Alignment Presets */}
                      <div className="grid grid-cols-3 gap-1.5 text-xs">
                        <button
                          type="button"
                          onClick={() => handleAlign('center')}
                          disabled={activeLayer.locked}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#06110C] hover:bg-[#F7F7F5] disabled:opacity-40 disabled:pointer-events-none font-semibold text-[#171717] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Align to exact center"
                        >
                          <AlignCenter className="w-3.5 h-3.5 text-[#A31C1B]" />
                          <span>Center</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAlign('leftChest')}
                          disabled={activeLayer.locked}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#06110C] hover:bg-[#F7F7F5] disabled:opacity-40 disabled:pointer-events-none font-semibold text-[#171717] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Left Pocket / Chest placement"
                        >
                          <span>Left Pocket</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAlign('rightChest')}
                          disabled={activeLayer.locked}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#06110C] hover:bg-[#F7F7F5] disabled:opacity-40 disabled:pointer-events-none font-semibold text-[#171717] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Right Chest placement"
                        >
                          <span>Right Chest</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAlign('upperChest')}
                          disabled={activeLayer.locked}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#06110C] hover:bg-[#F7F7F5] disabled:opacity-40 disabled:pointer-events-none font-semibold text-[#171717] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Upper Collar / Chest placement"
                        >
                          <span>Upper Collar</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAlign('lowerTorso')}
                          disabled={activeLayer.locked}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#06110C] hover:bg-[#F7F7F5] disabled:opacity-40 disabled:pointer-events-none font-semibold text-[#171717] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Lower Graphic placement"
                        >
                          <span>Lower Graphic</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAlign('centerX')}
                          disabled={activeLayer.locked}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#06110C] hover:bg-[#F7F7F5] disabled:opacity-40 disabled:pointer-events-none font-semibold text-[#171717] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Center horizontally"
                        >
                          <span>Center X</span>
                        </button>
                      </div>

                      {/* Directional Nudge Pad + Sliders */}
                      <div className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-[#E5E5E5]">
                        <div className="grid grid-cols-3 gap-1 w-24 shrink-0">
                          <div />
                          <button
                            type="button"
                            onClick={() => handleNudge(0, -0.02)}
                            disabled={activeLayer.locked}
                            title="Nudge Up"
                            className="p-1 rounded bg-[#F7F7F5] hover:bg-[#E5E5E5] border border-[#E5E5E5] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center text-[#171717]"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <div />
                          <button
                            type="button"
                            onClick={() => handleNudge(-0.02, 0)}
                            disabled={activeLayer.locked}
                            title="Nudge Left"
                            className="p-1 rounded bg-[#F7F7F5] hover:bg-[#E5E5E5] border border-[#E5E5E5] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center text-[#171717]"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAlign('center')}
                            disabled={activeLayer.locked}
                            title="Center Reset"
                            className="p-1 rounded bg-[#06110C] text-white disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center text-[10px] font-bold"
                          >
                            •
                          </button>
                          <button
                            type="button"
                            onClick={() => handleNudge(0.02, 0)}
                            disabled={activeLayer.locked}
                            title="Nudge Right"
                            className="p-1 rounded bg-[#F7F7F5] hover:bg-[#E5E5E5] border border-[#E5E5E5] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center text-[#171717]"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                          <div />
                          <button
                            type="button"
                            onClick={() => handleNudge(0, 0.02)}
                            disabled={activeLayer.locked}
                            title="Nudge Down"
                            className="p-1 rounded bg-[#F7F7F5] hover:bg-[#E5E5E5] border border-[#E5E5E5] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center text-[#171717]"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                          <div />
                        </div>

                        <div className="flex-1 space-y-1.5">
                          <div>
                            <div className="flex justify-between text-[10px] text-[#666666]">
                              <span>Horizontal (X)</span>
                              <span className="font-mono font-bold text-[#171717]">
                                {Math.round(activeLayer.x * 100)}%
                              </span>
                            </div>
                            <input
                              type="range"
                              min="0.1"
                              max="0.9"
                              step="0.01"
                              value={activeLayer.x}
                              disabled={activeLayer.locked}
                              onChange={(e) => updateActiveLayer({ x: parseFloat(e.target.value) })}
                              className="w-full h-1.5 accent-[#06110C] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between text-[10px] text-[#666666]">
                              <span>Vertical (Y)</span>
                              <span className="font-mono font-bold text-[#171717]">
                                {Math.round(activeLayer.y * 100)}%
                              </span>
                            </div>
                            <input
                              type="range"
                              min="0.1"
                              max="0.9"
                              step="0.01"
                              value={activeLayer.y}
                              disabled={activeLayer.locked}
                              onChange={(e) => updateActiveLayer({ y: parseFloat(e.target.value) })}
                              className="w-full h-1.5 accent-[#06110C] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ALTER LAYER STACK IN PROCESS */}
                    <div className="pt-3 border-t border-[#E5E5E5] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-[#06110C]" />
                          <span className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                            Alter Layer
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-[#666666] bg-white px-2 py-0.5 rounded border border-[#E5E5E5]">
                          Stack #{currentLayerIndex + 1} of {currentLayers.length} ({isTopLayer ? 'Top Layer' : isBottomLayer ? 'Base Layer' : 'Mid Layer'})
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-1.5 text-xs">
                        <button
                          type="button"
                          onClick={() => moveLayerOrder(activeLayer.id, 'up')}
                          disabled={isTopLayer}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#06110C] hover:bg-[#F7F7F5] disabled:opacity-30 disabled:pointer-events-none font-semibold text-[#171717] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Bring artwork forward (above other layers)"
                        >
                          <ArrowUp className="w-3 h-3 text-[#06110C]" />
                          <span>Forward</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => moveLayerOrder(activeLayer.id, 'down')}
                          disabled={isBottomLayer}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#06110C] hover:bg-[#F7F7F5] disabled:opacity-30 disabled:pointer-events-none font-semibold text-[#171717] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Send artwork backward (behind other layers)"
                        >
                          <ArrowDown className="w-3 h-3 text-[#06110C]" />
                          <span>Backward</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => duplicateLayer(activeLayer.id)}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#06110C] hover:bg-[#F7F7F5] font-semibold text-[#171717] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Duplicate this artwork"
                        >
                          <Copy className="w-3 h-3 text-[#06110C]" />
                          <span>Duplicate</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteLayer(activeLayer.id)}
                          className="py-1.5 px-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#A31C1B] hover:text-[#A31C1B] hover:bg-[#A31C1B]/5 font-semibold text-[#A31C1B] text-[11px] flex items-center justify-center gap-1 transition-colors"
                          title="Delete this artwork"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* No Image Layer: Show Upload Dropzone & Sample Artworks */
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-8 rounded-xl border-2 border-dashed border-[#E5E5E5] hover:border-[#06110C] bg-[#F7F7F5] flex flex-col items-center justify-center gap-2 transition-all group"
                    >
                      <ImageIcon className="w-8 h-8 text-[#06110C] group-hover:scale-105 transition-transform" />
                      <span className="text-xs font-bold text-[#171717]">Click to Upload Image / Logo</span>
                      <span className="text-[10px] text-[#666666]">PNG, JPG, SVG, WebP (Max 5MB)</span>
                    </button>

                    <div className="p-3.5 rounded-xl border border-[#E5E5E5] bg-[#F7F7F5] space-y-2.5">
                      <span className="text-[11px] font-bold text-[#171717] block">
                        Or insert a sample Tiruppur graphic:
                      </span>
                      <div className="grid grid-cols-1 gap-2">
                        {SAMPLE_GRAPHICS.map((sg) => (
                          <div
                            key={sg.name}
                            onClick={() => addImageLayer(sg.svg)}
                            className="p-2 bg-white rounded-lg border border-[#E5E5E5] hover:border-[#06110C] cursor-pointer flex items-center justify-between group transition-all"
                          >
                            <div className="flex items-center gap-2.5">
                              <img src={sg.svg} alt={sg.name} className="w-8 h-8 object-contain" />
                              <div>
                                <p className="text-xs font-bold text-[#171717] group-hover:text-[#A31C1B] transition-colors">
                                  {sg.name}
                                </p>
                                <p className="text-[10px] text-[#666666]">{sg.tag}</p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-[#06110C] group-hover:underline">
                              + Apply
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: GEMINI AI ASSISTANT */}
            {activeTab === 'ai' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#A31C1B]" />
                    <span className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                      Google Gemini AI Studio
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F7F7F5] border border-[#E5E5E5] text-[#16A34A] font-semibold">
                    Live
                  </span>
                </div>

                {/* Success alert */}
                {aiSuccessMsg && (
                  <div className="p-3 bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#16A34A] rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{aiSuccessMsg}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs text-[#666666] font-medium block">Describe your design theme:</label>
                  <textarea
                    rows={3}
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="e.g. Tamil Nadu Marathon 2026 athletic runner jersey in crimson and charcoal..."
                    className="w-full p-3 rounded-lg bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] text-xs focus:border-[#06110C] focus:bg-white focus:outline-none resize-none"
                  />

                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      { label: '🐉 Dragon Streetwear', prompt: 'Dragon Streetwear Tokyo Insignia' },
                      { label: '⚡ Cyberpunk Neon', prompt: 'Cyberpunk Neon Future Insignia' },
                      { label: '🐅 Tiger Beast', prompt: 'Savage Tiger Beast Emblem' },
                      { label: '🌸 Minimal Botanical', prompt: 'Minimalist Botanical Nature Flower' },
                      { label: '🏛️ Tiruppur Heritage', prompt: 'Tiruppur Heritage Cotton Crest 1989' },
                      { label: '🏋️ Iron Gym Club', prompt: 'Iron Gym Club Heavyweight Athletics' },
                    ].map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setAiPrompt(chip.prompt);
                          handleGenerateAiConcept(chip.prompt);
                        }}
                        className="px-2.5 py-1 rounded-full bg-[#F7F7F5] border border-[#E5E5E5] text-[10px] font-medium text-[#171717] hover:border-[#06110C] hover:bg-white transition-colors cursor-pointer"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleGenerateAiConcept()}
                    disabled={aiLoading || !aiPrompt.trim()}
                    className="w-full py-2.5 rounded-lg bg-[#06110C] hover:bg-[#A31C1B] disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors mt-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
                    <span>{aiLoading ? 'Synthesizing Graphic with Gemini...' : 'Synthesize Design & Artwork with Gemini'}</span>
                  </button>
                </div>

                {aiSuggestions && (
                  <div className="p-4 rounded-xl border border-[#E5E5E5] bg-[#F7F7F5] space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-[#A31C1B]">AI Concept Result</p>
                      {aiSuggestions.modelUsed && (
                        <span className="text-[9px] font-mono text-[#666666]">
                          {aiSuggestions.modelUsed}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#171717] leading-relaxed">{aiSuggestions.concept}</p>

                    {/* Visual Generated Artwork Graphic Decal Preview */}
                    {generatedArtworkUrl && (
                      <div className="p-3 bg-white rounded-lg border border-[#E5E5E5] flex flex-col items-center gap-2">
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[11px] font-bold text-[#06110C] flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-[#A31C1B]" />
                            Generated Decal Graphic:
                          </span>
                          <span className="text-[9px] bg-[#16A34A]/10 text-[#16A34A] px-1.5 py-0.5 rounded font-semibold">
                            Applied on 3D Shirt
                          </span>
                        </div>
                        <div className="w-28 h-28 bg-[#171717] rounded-lg p-2 flex items-center justify-center border border-[#E5E5E5] shadow-xs">
                          <img
                            src={generatedArtworkUrl}
                            alt="Generated AI Decal"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            addImageLayer(generatedArtworkUrl);
                            setAiSuccessMsg('Added AI Artwork Graphic to T-shirt canvas!');
                            setTimeout(() => setAiSuccessMsg(null), 3000);
                          }}
                          className="w-full py-1.5 px-3 bg-[#06110C] hover:bg-[#A31C1B] text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Insert AI Graphic Layer Again</span>
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-[#E5E5E5]">
                      {aiSuggestions.suggestedColor && (
                        <div>
                          <span className="text-[10px] text-[#666666] block">Garment Shade:</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-[#E5E5E5] inline-block shrink-0"
                              style={{ backgroundColor: aiSuggestions.suggestedColor }}
                            />
                            <span className="font-mono text-[11px] font-semibold">{aiSuggestions.suggestedColor}</span>
                          </div>
                        </div>
                      )}

                      {aiSuggestions.suggestedText && (
                        <div>
                          <span className="text-[10px] text-[#666666] block">Decal Slogan:</span>
                          <span className="font-bold text-[11px] text-[#06110C] font-mono truncate block mt-0.5">
                            "{aiSuggestions.suggestedText}"
                          </span>
                        </div>
                      )}
                    </div>

                    {aiSuggestions.recommendedFabric && (
                      <div className="text-[10px] text-[#666666] pt-1 border-t border-[#E5E5E5]">
                        <span className="font-semibold text-[#171717]">Recommended Fabric: </span>
                        <span>{aiSuggestions.recommendedFabric}</span>
                      </div>
                    )}

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => setActiveTab('text')}
                        className="flex-1 py-1.5 px-3 bg-white hover:bg-[#E5E5E5] border border-[#E5E5E5] rounded-lg text-xs font-semibold text-[#171717] transition-colors"
                      >
                        Adjust Text & Font
                      </button>
                      <button
                        onClick={() => setCameraView('front')}
                        className="flex-1 py-1.5 px-3 bg-[#06110C] hover:bg-[#A31C1B] text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Inspect 3D Model
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: TEMPLATES LIBRARY */}
            {activeTab === 'templates' && (
              <div className="space-y-3">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#666666]">
                  Select Pre-Engineered Template
                </span>
                <div className="space-y-2.5">
                  {templatesList.map((tpl) => (
                    <div
                      key={tpl.id}
                      onClick={() => loadTemplate(tpl as any)}
                      className="p-3 rounded-xl border border-[#E5E5E5] bg-[#F7F7F5] hover:border-[#06110C] cursor-pointer transition-all flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#171717] group-hover:text-[#A31C1B] transition-colors">
                          {tpl.title}
                        </p>
                        <p className="text-[10px] text-[#666666]">{tpl.category}</p>
                      </div>
                      <span className="text-[10px] font-bold text-[#06110C] group-hover:underline">
                        Apply &rarr;
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: LAYERS MANAGER */}
            {activeTab === 'layers' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#666666]">
                    {activeSide.toUpperCase()} Canvas Stack ({currentLayers.length})
                  </span>
                  <span className="text-[10px] text-[#666666] font-medium">
                    Click to edit directly
                  </span>
                </div>

                {currentLayers.length === 0 ? (
                  <p className="text-xs text-[#666666] p-4 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-center">
                    No active layers on {activeSide} print zone.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {/* Display layers from Top of stack (highest index) to Bottom of stack (index 0) */}
                    {[...currentLayers].reverse().map((layer, reverseIndex) => {
                      const actualIndex = currentLayers.length - 1 - reverseIndex;
                      const isSelected = activeLayerId === layer.id;
                      const isTop = actualIndex === currentLayers.length - 1;
                      const isBottom = actualIndex === 0;

                      return (
                        <div
                          key={layer.id}
                          onClick={() => {
                            setActiveLayerId(layer.id);
                            setActiveTab(layer.type === 'text' ? 'text' : 'image');
                          }}
                          className={`p-2.5 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#06110C] bg-white shadow-xs ring-1 ring-[#06110C]'
                              : 'border-[#E5E5E5] bg-[#F7F7F5] hover:border-[#171717]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate flex-1 min-w-0">
                            <div className="w-6 h-6 rounded bg-white border border-[#E5E5E5] flex items-center justify-center shrink-0">
                              {layer.type === 'text' ? (
                                <Type className="w-3.5 h-3.5 text-[#06110C]" />
                              ) : (
                                <ImageIcon className="w-3.5 h-3.5 text-[#A31C1B]" />
                              )}
                            </div>
                            <div className="truncate flex-1 min-w-0">
                              <p className="truncate font-semibold text-[#171717]">
                                {layer.type === 'text' ? layer.content || 'Text Layer' : 'Artwork / Photo'}
                              </p>
                              <p className="text-[10px] text-[#666666]">
                                {isTop ? 'Top Layer (Front)' : isBottom ? 'Base Layer (Back)' : `Position #${actualIndex + 1}`}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-[#666666] shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveLayerId(layer.id);
                                setActiveTab(layer.type === 'text' ? 'text' : 'image');
                              }}
                              title="Edit Properties & Align"
                              className="p-1 hover:text-[#06110C] hover:bg-white rounded transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                moveLayerOrder(layer.id, 'up');
                              }}
                              disabled={isTop}
                              title="Move Layer Up (Bring Forward)"
                              className="p-1 hover:text-[#171717] disabled:opacity-20 hover:bg-white rounded transition-colors"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                moveLayerOrder(layer.id, 'down');
                              }}
                              disabled={isBottom}
                              title="Move Layer Down (Send Backward)"
                              className="p-1 hover:text-[#171717] disabled:opacity-20 hover:bg-white rounded transition-colors"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                duplicateLayer(layer.id);
                              }}
                              title="Duplicate Layer"
                              className="p-1 hover:text-[#171717] hover:bg-white rounded transition-colors"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteLayer(layer.id);
                              }}
                              title="Delete Layer"
                              className="p-1 hover:text-[#A31C1B] text-[#A31C1B]/70 hover:bg-white rounded transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* PANEL 2: CENTER 3D STAGE (PURE WHITE #FFFFFF BACKGROUND) */}
        <div
          className={`flex-1 relative items-center justify-center bg-white min-h-[420px] sm:min-h-[520px] lg:min-h-[720px] w-full ${
            mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <Customizer3DCanvas
            garmentType={garmentType}
            tshirtColor={tshirtColor}
            frontLayers={frontLayers}
            backLayers={backLayers}
            cameraView={cameraView}
            isRotationLocked={isRotationLocked}
            onToggleRotationLock={() => setIsRotationLocked((prev) => !prev)}
          />

          {/* Interactive Hint Banner at bottom */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none px-4">
            <div className="px-4 py-1.5 rounded-full bg-white/95 shadow-md border border-[#E5E5E5] text-[11px] text-[#666666] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#06110C] animate-pulse" />
              <span>
                {isRotationLocked
                  ? '🔒 Garment rotation locked for precision text & decal editing'
                  : 'Drag to rotate 360° • Pinch / scroll to zoom into fabric texture'}
              </span>
            </div>
          </div>
        </div>

        {/* PANEL 3: RIGHT CONFIGURATION PANEL (PURE WHITE #FFFFFF, #E5E5E5 BORDER) */}
        <div
          className={`w-full lg:w-80 bg-white border-l border-[#E5E5E5] p-5 flex flex-col justify-between z-20 shadow-xs min-h-[420px] lg:min-h-[720px] overflow-y-auto ${
            mobileTab === 'garment' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <div className="space-y-5">
            {/* Garment Silhouette Selector (Round Neck vs Polo) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
                Garment Silhouette
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGarmentType('round-neck')}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all ${
                    garmentType === 'round-neck'
                      ? 'bg-[#06110C] text-white border-[#06110C] shadow-xs'
                      : 'bg-[#F7F7F5] text-[#171717] border-[#E5E5E5] hover:border-[#171717]'
                  }`}
                >
                  Round Neck Tee
                </button>
                <button
                  type="button"
                  onClick={() => setGarmentType('polo')}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all ${
                    garmentType === 'polo'
                      ? 'bg-[#06110C] text-white border-[#06110C] shadow-xs'
                      : 'bg-[#F7F7F5] text-[#171717] border-[#E5E5E5] hover:border-[#171717]'
                  }`}
                >
                  Collared Polo
                </button>
              </div>
            </div>

            {/* Garment Color Swatches */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
                Garment Shade
              </label>
              <div className="grid grid-cols-5 gap-2">
                {colorPalette.map((col) => (
                  <button
                    key={col.hex}
                    onClick={() => setTshirtColor(col.hex)}
                    title={col.name}
                    className={`h-8 rounded-lg border-2 transition-all ${
                      tshirtColor.toLowerCase() === col.hex.toLowerCase()
                        ? 'border-[#06110C] scale-110 shadow-sm'
                        : 'border-[#E5E5E5] hover:border-[#171717]'
                    }`}
                    style={{ backgroundColor: col.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#666666]">
                  Size Selection
                </label>
                <span className="text-[11px] text-[#A31C1B] font-medium">Standard Fit</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${
                      selectedSize === sz
                        ? 'bg-[#06110C] text-white shadow-xs'
                        : 'bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] hover:border-[#171717]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
                Order Quantity
              </label>
              <div className="flex items-center bg-[#F7F7F5] border border-[#E5E5E5] rounded-lg p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-8 rounded-md bg-white border border-[#E5E5E5] text-[#171717] font-bold text-sm hover:bg-[#E5E5E5]"
                >
                  -
                </button>
                <span className="flex-1 text-center font-bold text-sm text-[#171717]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-8 rounded-md bg-white border border-[#E5E5E5] text-[#171717] font-bold text-sm hover:bg-[#E5E5E5]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Manufacturer Details Card */}
            <div className="p-3.5 rounded-xl border border-[#E5E5E5] bg-[#F7F7F5] space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#A31C1B]" />
                <span className="text-xs font-bold text-[#171717]">SAKTHI GARMENTS</span>
              </div>
              <p className="text-[11px] text-[#666666]">KVR Nagar (Near Chennai Bakes), Tiruppur — 641604</p>
              <div className="text-[10px] text-[#16A34A] flex items-center gap-1 font-semibold">
                <Check className="w-3 h-3" />
                <span>Verified Direct Factory Partner</span>
              </div>
            </div>
          </div>

          {/* Pricing & Checkout summary */}
          <div className="pt-5 border-t border-[#E5E5E5] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#666666]">
                <span>Base Garment (100% Cotton):</span>
                <span>₹299</span>
              </div>
              <div className="flex justify-between text-[#666666]">
                <span>Front Print Artwork:</span>
                <span>₹{frontLayers.length > 0 ? (frontLayers.length - 1) * 50 : 0}</span>
              </div>
              {backLayers.length > 0 && (
                <div className="flex justify-between text-[#666666]">
                  <span>Back Print Area:</span>
                  <span>₹80</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-[#171717] pt-2 border-t border-[#E5E5E5]">
                <span>Total Amount:</span>
                <span className="text-[#A31C1B] text-base font-black">₹{unitPrice * quantity}</span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-3 rounded-lg bg-[#06110C] hover:bg-[#A31C1B] font-bold text-xs text-white shadow transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart & Checkout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizerPage;
