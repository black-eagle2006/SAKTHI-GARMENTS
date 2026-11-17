import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  ArrowLeft,
  Award,
  Radio,
} from 'lucide-react';
import { getProductBySlug, ALL_PRODUCTS, ProductItem } from '../data/productsData';
import { useCart } from '../context/CartContext';
import { ContactSection } from '../components/storefront/ContactSection';
import { NoticeBar } from '../components/storefront/NoticeBar';
import { productsApi, mapBackendProductToItem } from '../api/productsApi';
import { getAssetUrl } from '../utils/assetUrl';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const fallbackProduct = getProductBySlug(slug || '');
  const [product, setProduct] = useState<ProductItem | undefined>(fallbackProduct);
  const [backendId, setBackendId] = useState<number | null>(null);
  const [isLiveSynced, setIsLiveSynced] = useState(false);

  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [activeImageSide, setActiveImageSide] = useState<'front' | 'back'>('front');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  // Sync with live Spring Boot backend API
  useEffect(() => {
    if (!slug) return;
    const localFallback = getProductBySlug(slug);
    setProduct(localFallback);

    let isMounted = true;
    productsApi
      .getProductBySlug(slug)
      .then((backendProd) => {
        if (!isMounted || !backendProd) return;
        setBackendId(backendProd.id);

        setProduct((prev) => {
          const mapped = mapBackendProductToItem(backendProd);
          if (prev) {
            mapped.image = prev.image;
            mapped.imageHover = prev.imageHover;
            mapped.colors = prev.colors;
            mapped.sizes = prev.sizes;
            mapped.sectionAnchor = prev.sectionAnchor;
          }
          return mapped;
        });
        setIsLiveSynced(true);
      })
      .catch((err) => {
        console.warn('Live product sync note: Using local product profile.', err?.message);
        setIsLiveSynced(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center font-poppins text-center px-4 bg-white">
        <h2 className="text-2xl font-bold text-[#000000] mb-2">Product Not Found</h2>
        <p className="text-sm text-[#666666] mb-6">
          The requested product could not be located in the SAKTHI GARMENTS catalog.
        </p>
        <Link
          to="/products"
          className="px-6 py-2.5 bg-[#06110C] text-white rounded-lg text-sm font-medium hover:bg-[#A31C1B] transition-colors"
        >
          &larr; Back to All Products
        </Link>
      </div>
    );
  }

  // Related products from same subcategory
  const related = ALL_PRODUCTS.filter(
    (p) => p.subcategory === product.subcategory && p.id !== product.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    const resolvedId = backendId || Number(product.id.replace(/[^0-9]/g, '')) || 101;
    addItem({
      productId: resolvedId,
      productName: `${product.name} (${selectedSize})`,
      companyId: 1,
      companyName: 'SAKTHI GARMENTS (Tiruppur)',
      size: selectedSize,
      color: selectedColor,
      quantity,
      unitPrice: product.price,
      totalPrice: product.price * quantity,
      itemType: product.customizable ? 'CUSTOM' : 'PLAIN',
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleCustomizeIn3D = () => {
    navigate(
      `/customizer?garment=${product.slug}&name=${encodeURIComponent(
        product.name
      )}&price=${product.price}&color=${encodeURIComponent(selectedColor)}`
    );
  };

  return (
    <div className="w-full bg-white font-poppins text-[#212529]">
      <NoticeBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Nav */}
        <div className="flex items-center justify-between gap-2 text-xs text-[#666666] mb-6 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <Link to="/" className="hover:text-[#171717]">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-[#171717]">
              Products
            </Link>
            <span>/</span>
            <span className="text-[#171717]">{product.category}</span>
            <span>/</span>
            <span className="text-[#171717] font-semibold">{product.name}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F7F7F5] rounded-full text-[11px] font-medium text-[#171717] border border-[#E5E5E5]">
            <Radio className={`w-3 h-3 ${isLiveSynced ? 'text-green-500 animate-pulse' : 'text-[#A31C1B]'}`} />
            <span>{isLiveSynced ? 'Live Backend Connected' : 'Tiruppur Mill Catalog'}</span>
          </div>
        </div>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left: Image Showcase & View Switcher */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] overflow-hidden flex items-center justify-center p-6 shadow-sm">
              <img
                src={getAssetUrl(activeImageSide === 'front' ? product.image : product.imageHover || product.image)}
                alt={product.name}
                className="w-full h-full object-contain transition-all duration-300"
                onError={(e: any) => {
                  e.currentTarget.src = getAssetUrl('products/the-heavy-polo.jpg');
                }}
              />

              <div className="absolute top-4 left-4 px-2.5 py-1 bg-[#06110C] text-white text-[10px] font-semibold tracking-wider uppercase rounded">
                Tiruppur Manufacturing
              </div>
            </div>

            {/* View Selector Thumbnails */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveImageSide('front')}
                className={`flex-1 py-2 px-3 border rounded-lg text-xs font-semibold transition-all ${
                  activeImageSide === 'front'
                    ? 'border-[#06110C] bg-[#06110C] text-white'
                    : 'border-[#E5E5E5] hover:bg-[#F7F7F5] text-[#171717]'
                }`}
              >
                Front View
              </button>
              <button
                onClick={() => setActiveImageSide('back')}
                className={`flex-1 py-2 px-3 border rounded-lg text-xs font-semibold transition-all ${
                  activeImageSide === 'back'
                    ? 'border-[#06110C] bg-[#06110C] text-white'
                    : 'border-[#E5E5E5] hover:bg-[#F7F7F5] text-[#171717]'
                }`}
              >
                Back View
              </button>
            </div>
          </div>

          {/* Right: Product Details, Bulk Tiers & Actions */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A31C1B]">
                {product.subcategory}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] mt-1 mb-2">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-[#171717]">
                  ₹ {product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-[#A3A3A3] line-through">
                    ₹ {product.originalPrice}
                  </span>
                )}
                <span className="text-xs px-2 py-0.5 bg-[#DCFCE7] text-[#15803D] font-semibold rounded">
                  Direct Mill Price
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
              {product.description}
            </p>

            {/* Fabric Specifications */}
            <div className="bg-[#F7F7F5] p-4 rounded-lg border border-[#E5E5E5] text-xs space-y-1.5">
              <p className="font-semibold text-[#171717]">Fabric & Weave Specifications:</p>
              <p className="text-[#171717] font-medium">{product.fabric}</p>
              <p className="text-[#666666]">Origin: KVR Nagar (Near Chennai Bakes), Tiruppur, Tamil Nadu — 641604</p>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase text-[#171717]">
                Select Size:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-10 px-3 py-1.5 rounded border text-xs font-semibold transition-all ${
                      selectedSize === s
                        ? 'border-[#06110C] bg-[#06110C] text-white shadow-sm'
                        : 'border-[#E5E5E5] bg-white text-[#171717] hover:border-[#A31C1B]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase text-[#171717]">
                Garment Color:
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.hex)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      selectedColor === c.hex ? 'scale-110 border-[#06110C] shadow' : 'border-[#E5E5E5]'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="text-xs font-semibold uppercase text-[#171717]">Quantity:</label>
              <div className="flex items-center border border-[#E5E5E5] rounded bg-[#F7F7F5]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-sm text-[#666666] hover:bg-[#E5E5E5]"
                >
                  -
                </button>
                <span className="px-4 py-1 text-xs font-bold text-[#171717]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-sm text-[#666666] hover:bg-[#E5E5E5]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Bulk Volume Discount Table */}
            <div className="border border-[#E5E5E5] rounded-lg overflow-hidden text-xs">
              <div className="bg-[#F7F7F5] px-3 py-2 font-bold text-[#06110C] border-b border-[#E5E5E5]">
                Tiered Bulk Volume Discount Matrix (Factory Direct)
              </div>
              <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="bg-white p-2 rounded border border-[#E5E5E5]">
                  <p className="font-bold text-[#171717]">10 - 49 pcs</p>
                  <p className="text-[#16A34A] font-semibold">5% OFF</p>
                </div>
                <div className="bg-white p-2 rounded border border-[#E5E5E5]">
                  <p className="font-bold text-[#171717]">50 - 99 pcs</p>
                  <p className="text-[#16A34A] font-semibold">10% OFF</p>
                </div>
                <div className="bg-white p-2 rounded border border-[#E5E5E5]">
                  <p className="font-bold text-[#171717]">100 - 499 pcs</p>
                  <p className="text-[#16A34A] font-semibold">20% OFF</p>
                </div>
                <div className="bg-white p-2 rounded border border-[#E5E5E5]">
                  <p className="font-bold text-[#171717]">500+ pcs</p>
                  <p className="text-[#16A34A] font-semibold">30% OFF</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              {product.customizable && (
                <button
                  onClick={handleCustomizeIn3D}
                  className="w-full sm:flex-1 py-3 px-4 bg-[#06110C] hover:bg-[#171717] text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all group"
                >
                  <Sparkles className="w-4 h-4 text-[#A31C1B] group-hover:rotate-12 transition-transform" />
                  <span>Customize in 3D Studio</span>
                </button>
              )}

              <button
                onClick={handleAddToCart}
                className="w-full sm:flex-1 py-3 px-4 bg-[#A31C1B] hover:bg-[#851615] text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                {addedToast ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                <span>{addedToast ? 'Added to Cart!' : 'Add to Cart'}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-3 text-[11px] text-[#666666] text-center border-t border-[#E5E5E5]">
              <div className="flex flex-col items-center gap-1 p-2">
                <Truck className="w-4 h-4 text-[#A31C1B]" />
                <span>Express Courier Dispatched from Tiruppur</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2">
                <ShieldCheck className="w-4 h-4 text-[#06110C]" />
                <span>100% Bio-Wash Combed Cotton Guarantee</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2">
                <Award className="w-4 h-4 text-[#A31C1B]" />
                <span>GST Compliant Deterministic Pricing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#E5E5E5]">
            <h3 className="text-lg font-bold text-[#171717] mb-6">
              More in {product.subcategory}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/products/info/${rp.slug}`}
                  className="group bg-[#F7F7F5] border border-[#E5E5E5] rounded-xl p-4 hover:border-[#171717] transition-all"
                >
                  <div className="aspect-square w-full rounded-lg overflow-hidden bg-white mb-3 flex items-center justify-center p-2">
                    <img
                      src={getAssetUrl(rp.image)}
                      alt={rp.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      onError={(e: any) => {
                        e.currentTarget.src = getAssetUrl('products/the-heavy-polo.jpg');
                      }}
                    />
                  </div>
                  <h4 className="text-xs font-semibold text-[#171717] group-hover:text-[#A31C1B] transition-colors truncate">
                    {rp.name}
                  </h4>
                  <p className="text-xs font-bold text-[#171717] mt-1">₹ {rp.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <ContactSection />
    </div>
  );
};

export default ProductDetailPage;
