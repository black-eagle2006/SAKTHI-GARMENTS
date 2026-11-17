import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_SECTIONS } from '../../data/productsData';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Group sections into 4 logical columns matching the reference layout
  const col1Sections = PRODUCT_SECTIONS.slice(0, 3); // Polos, Round Neck, Oversized
  const col2Sections = PRODUCT_SECTIONS.slice(3, 7); // Other Styles, Shirts, Bottoms, Women's
  const col3Sections = PRODUCT_SECTIONS.slice(7, 12); // Infant, Kids & Teens, Adults Pullovers, Kids Pullovers
  const col4Sections = PRODUCT_SECTIONS.slice(12, 15); // Stationery, Miscellaneous, Branded

  const renderSectionColumn = (sections: typeof PRODUCT_SECTIONS) => (
    <div className="space-y-6">
      {sections.map((sec) => (
        <div key={sec.order} className="space-y-2">
          <Link
            to={`/products#${sec.sectionAnchor}`}
            onClick={onClose}
            className="block text-xs font-bold uppercase tracking-wider text-[#06110C] hover:text-[#A31C1B] border-b border-[#E5E5E5] pb-1 transition-colors"
          >
            {sec.title}
          </Link>
          <ul className="space-y-1.5 pl-1">
            {sec.products.map((prod) => (
              <li key={prod.id}>
                <Link
                  to={`/products/info/${prod.slug}`}
                  onClick={onClose}
                  className="text-xs text-[#666666] hover:text-[#171717] hover:font-medium transition-all block truncate"
                  title={prod.name}
                >
                  {prod.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white text-[#171717] shadow-2xl border-t border-[#E5E5E5] border-b-2 border-b-[#A31C1B] z-50 animate-fadeIn"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E5E5E5]">
          <div>
            <h3 className="font-poppins font-semibold text-base text-[#171717]">
              Complete Garment Catalog • SAKTHI GARMENTS
            </h3>
            <p className="text-xs text-[#666666]">
              Direct from KVR Nagar (Near Chennai Bakes), Tiruppur — 65 customizable product lines with tiered bulk discounting
            </p>
          </div>
          <Link
            to="/products"
            onClick={onClose}
            className="text-xs font-semibold text-[#A31C1B] hover:text-[#06110C] underline flex items-center gap-1"
          >
            View All Products &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {renderSectionColumn(col1Sections)}
          {renderSectionColumn(col2Sections)}
          {renderSectionColumn(col3Sections)}
          {renderSectionColumn(col4Sections)}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;

