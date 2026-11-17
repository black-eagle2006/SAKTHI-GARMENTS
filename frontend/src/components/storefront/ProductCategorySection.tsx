import React from 'react';
import { ProductCategorySection as SectionType } from '../../data/productsData';
import { ProductCard } from './ProductCard';

interface ProductCategorySectionProps {
  section: SectionType;
}

export const ProductCategorySection: React.FC<ProductCategorySectionProps> = ({ section }) => {
  return (
    <section id={section.sectionAnchor} className="mb-10 sm:mb-14 scroll-mt-36">
      {/* Category Section Breadcrumb Heading (Image 1 reference) */}
      <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-2 mb-5">
        <h3 className="font-poppins text-xs sm:text-[13px] font-semibold tracking-wider text-[#171717] uppercase">
          <span className="text-[#666666]">{section.categoryGroup} &gt;</span>{' '}
          <span className="text-[#06110C] font-bold">{section.subcategory}</span>
        </h3>
        <span className="text-[11px] text-[#A3A3A3] font-normal tracking-normal">
          {section.productCount} {section.productCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* 3-Column Desktop Grid / 2-Column Mobile Grid matching Image 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-x-3 sm:gap-x-3.5 gap-y-5 sm:gap-y-6 max-w-3xl mx-auto">
        {section.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductCategorySection;
