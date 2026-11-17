import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp, Radio } from 'lucide-react';
import { PRODUCT_SECTIONS, ProductCategorySection as IProductCategorySection } from '../data/productsData';
import { NoticeBar } from '../components/storefront/NoticeBar';
import { ProductCategorySection } from '../components/storefront/ProductCategorySection';
import { ContactSection } from '../components/storefront/ContactSection';
import { productsApi, mapBackendProductToItem } from '../api/productsApi';

export const ProductsCatalogPage: React.FC = () => {
  const location = useLocation();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [sections, setSections] = useState<IProductCategorySection[]>(PRODUCT_SECTIONS);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  // Load live sections from Spring Boot backend API with automatic fallback
  useEffect(() => {
    let isMounted = true;
    productsApi
      .getSections()
      .then((backendSections) => {
        if (!isMounted || !backendSections || backendSections.length === 0) return;

        // Check if backend returned populated products
        const hasProducts = backendSections.some((s) => s.products && s.products.length > 0);
        if (hasProducts) {
          // Merge backend data with local SVG graphics and ordering
          const merged = PRODUCT_SECTIONS.map((localSec) => {
            const backendMatch = backendSections.find(
              (bs) =>
                bs.id === localSec.containerId ||
                bs.title.toLowerCase() === localSec.title.toLowerCase() ||
                bs.id === localSec.sectionAnchor
            );

            if (backendMatch && backendMatch.products && backendMatch.products.length > 0) {
              const mappedProds = backendMatch.products.map((bp, idx) => {
                const localProd = localSec.products.find((lp) => lp.slug === bp.slug);
                const mapped = mapBackendProductToItem(bp, idx + 1);
                // Retain high-fidelity SVG graphics and color palettes if backend image is not an absolute CDN URL
                if (localProd) {
                  mapped.image = localProd.image;
                  mapped.imageHover = localProd.imageHover;
                  mapped.colors = localProd.colors;
                  mapped.sizes = localProd.sizes;
                  mapped.sectionAnchor = localProd.sectionAnchor;
                }
                return mapped;
              });

              return {
                ...localSec,
                products: mappedProds,
                productCount: mappedProds.length,
              };
            }
            return localSec;
          });

          setSections(merged);
          setIsLiveConnected(true);
        }
      })
      .catch((err) => {
        // Backend not ready or offline - graceful fallback to local data
        console.warn('Backend API sync notice: Using pre-rendered catalog while connecting...', err?.message);
        setIsLiveConnected(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle hash scrolling on page load / route navigation
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    }
  }, [location.hash]);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter sections if user clicks a quick filter
  const displayedSections =
    activeCategoryFilter === 'ALL'
      ? sections
      : sections.filter(
          (s) =>
            s.categoryGroup.toLowerCase().includes(activeCategoryFilter.toLowerCase()) ||
            s.subcategory.toLowerCase().includes(activeCategoryFilter.toLowerCase())
        );

  const filterTabs = [
    { label: 'ALL PRODUCTS', val: 'ALL' },
    { label: 'Polos', val: 'Polos' },
    { label: 'Round Neck', val: 'Round Neck' },
    { label: 'Oversized', val: 'Oversized' },
    { label: 'Shirts & Bottoms', val: 'Shirts' },
    { label: "Women's", val: "Women's" },
    { label: 'Kids', val: 'Kids' },
    { label: 'Jackets & Hoodies', val: 'Jackets' },
    { label: 'Accessories', val: 'Accessories' },
    { label: 'Mugs & Stationery', val: 'Miscellaneous' },
    { label: 'Branded', val: 'Branded' },
  ];

  return (
    <div className="w-full min-h-screen bg-white font-poppins text-[#171717]">
      {/* Volume Discount Notice Bar */}
      <NoticeBar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-16">
        {/* Page Title Section matching Reference (.section_title_tow) */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F7F7F5] border border-[#E5E5E5] rounded-full text-[11px] font-medium text-[#171717] mb-3">
            <Radio className={`w-3 h-3 ${isLiveConnected ? 'text-[#16A34A] animate-pulse' : 'text-[#A31C1B]'}`} />
            <span>{isLiveConnected ? 'Live API Connected to Spring Boot Mill Backend' : 'Tiruppur Catalog Engine Active'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] tracking-wide uppercase">
            ALL PRODUCTS
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] mt-1">
            Explore 65 factory-grade apparel styles manufactured in Tiruppur • Tiered bulk discounts from 10+ units
          </p>
        </div>

        {/* Quick Category Jump Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10 pb-4 border-b border-[#E5E5E5]">
          {filterTabs.map((tab) => (
            <button
              key={tab.val}
              onClick={() => setActiveCategoryFilter(tab.val)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategoryFilter === tab.val
                  ? 'bg-[#06110C] text-white shadow-sm'
                  : 'bg-[#F7F7F5] border border-[#E5E5E5] text-[#666666] hover:bg-[#E5E5E5] hover:text-[#171717]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sequential 15 Product Sections */}
        <div className="space-y-4">
          {displayedSections.map((section) => (
            <ProductCategorySection key={section.order} section={section} />
          ))}
        </div>
      </main>

      {/* Pre-Footer Contact Us Section */}
      <ContactSection />

      {/* Scroll to top floating button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-[#06110C] hover:bg-[#A31C1B] text-white shadow-lg transition-all z-40 cursor-pointer"
          title="Scroll to Top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ProductsCatalogPage;
