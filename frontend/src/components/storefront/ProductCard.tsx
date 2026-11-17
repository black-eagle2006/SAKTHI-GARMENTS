import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ShoppingBag, Check } from 'lucide-react';
import { ProductItem } from '../../data/productsData';
import { useCart } from '../../context/CartContext';
import { getAssetUrl } from '../../utils/assetUrl';

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [addedNotice, setAddedNotice] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [backImgError, setBackImgError] = useState(false);

  const fallbackImg = getAssetUrl('products/the-heavy-polo.jpg');
  const frontSrc = imgError
    ? fallbackImg
    : getAssetUrl(product.image || `products/${product.slug}.jpg`);

  const backSrc = backImgError
    ? frontSrc
    : getAssetUrl(product.imageHover || `products/${product.slug}-back.jpg`);

  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: Number(product.id.replace(/[^0-9]/g, '')) || 101,
      productName: product.name,
      companyId: 1,
      companyName: 'SAKTHI GARMENTS (Tiruppur)',
      size: 'L',
      color: '#FFFFFF',
      quantity: 1,
      unitPrice: product.price,
      totalPrice: product.price,
      itemType: product.customizable ? 'CUSTOM' : 'PLAIN',
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleQuickCustomize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(
      `/customizer?garment=${product.slug}&name=${encodeURIComponent(
        product.name
      )}&price=${product.price}`
    );
  };

  return (
    <div className="group font-poppins flex flex-col items-center w-full max-w-[165px] sm:max-w-[180px] mx-auto transition-all duration-200">
      {/* 1:1 Aspect Ratio Compact Square Product Image (150-170px Image 1 reference) */}
      <div className="relative w-full aspect-square rounded-sm overflow-hidden bg-white flex items-center justify-center cursor-pointer shadow-none">
        <Link
          to={`/products/info/${product.slug}`}
          className="block w-full h-full relative"
          title={product.name}
        >
          {/* Front / Top Real Product Photography */}
          <img
            src={frontSrc}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center absolute inset-0 transition-all duration-300 ease-out group-hover:scale-105 group-hover:opacity-0"
            loading="lazy"
          />

          {/* Back Real Product Photography on Hover */}
          <img
            src={backSrc}
            alt={`${product.name} back view`}
            onError={() => setBackImgError(true)}
            className="w-full h-full object-cover object-center absolute inset-0 opacity-0 transition-all duration-300 ease-out group-hover:scale-105 group-hover:opacity-100"
            loading="lazy"
          />
        </Link>

        {/* Minimal Hover Action Pill Bar (Fades in subtly on desktop hover) */}
        <div className="absolute bottom-1.5 left-0 right-0 px-1.5 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none">
          {product.customizable && (
            <button
              onClick={handleQuickCustomize}
              className="pointer-events-auto py-0.5 px-2 bg-[#06110C] hover:bg-[#171717] text-white rounded text-[9px] font-semibold flex items-center gap-1 shadow transition-colors backdrop-blur-sm"
              title="Customize in 3D Studio"
            >
              <Sparkles className="w-2.5 h-2.5 text-[#A31C1B]" />
              <span>3D</span>
            </button>
          )}

          <button
            onClick={handleQuickAddToCart}
            className="pointer-events-auto py-0.5 px-2 bg-[#A31C1B] hover:bg-[#851615] text-white rounded text-[9px] font-semibold flex items-center gap-1 shadow transition-colors"
            title="Quick Add to Cart"
          >
            {addedNotice ? <Check className="w-2.5 h-2.5" /> : <ShoppingBag className="w-2.5 h-2.5" />}
            <span>{addedNotice ? 'Added' : 'Add'}</span>
          </button>
        </div>
      </div>

      {/* Product Information: Clean typography, centered directly below image (Image 1 reference) */}
      <div className="w-full pt-1.5 text-center">
        {/* 1. Product Name */}
        <Link
          to={`/products/info/${product.slug}`}
          className="block text-xs sm:text-[13px] font-normal text-[#171717] hover:text-[#A31C1B] transition-colors leading-snug line-clamp-2 px-0.5"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* 2. Selling Price & Original Price with strikethrough */}
        <div className="product-price-row flex items-center justify-center gap-1.5 mt-0.5">
          <span className="text-xs sm:text-[13px] font-bold text-[#171717]">
            ₹{product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-[10px] sm:text-[11px] text-[#A3A3A3] line-through font-normal">
              ₹{product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
