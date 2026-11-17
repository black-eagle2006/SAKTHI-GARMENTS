import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageSquare, Facebook, Instagram } from 'lucide-react';
import { SAKTHI_BRAND_CONFIG, PRODUCT_SECTIONS } from '../../data/productsData';

export const Footer: React.FC = () => {
  // Grab top representative products for column 1
  const topProducts = PRODUCT_SECTIONS.flatMap((s) => s.products).slice(0, 18);

  return (
    <footer className="w-full bg-[#FFFFFF] border-t border-[#E5E5E5] font-poppins text-[#666666]">
      {/* 4 Multi-Tier Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: CUSTOMISE PRODUCTS */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[#171717] mb-4 border-b border-[#E5E5E5] pb-2">
              CUSTOMISE PRODUCTS
            </h3>
            <ul className="space-y-2 text-xs">
              {topProducts.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/products/info/${p.slug}`}
                    className="hover:text-[#A31C1B] transition-colors truncate block"
                    title={p.name}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link to="/products" className="font-semibold text-[#06110C] hover:text-[#A31C1B] hover:underline">
                  + View All 65 Products &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: ABOUT US */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[#171717] mb-4 border-b border-[#E5E5E5] pb-2">
              ABOUT US
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-[#A31C1B] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/about#team" className="hover:text-[#A31C1B] transition-colors">
                  Tiruppur Mill Heritage
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#A31C1B] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#A31C1B] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-[#A31C1B] transition-colors">
                  Return & Refunds
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-[#A31C1B] transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#A31C1B] transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#A31C1B] transition-colors">
                  FAQ & Sizing Charts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: WORK WITH US */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[#171717] mb-4 border-b border-[#E5E5E5] pb-2">
              WORK WITH US
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/fabric-samples" className="hover:text-[#A31C1B] transition-colors">
                  Fabric Swatch Packs (₹69)
                </Link>
              </li>
              <li>
                <Link to="/tiruppur-mills" className="hover:text-[#A31C1B] transition-colors">
                  Tiruppur Mills & Manufacturing
                </Link>
              </li>
              <li>
                <Link to="/customizer" className="hover:text-[#A31C1B] transition-colors">
                  3D Customizer Studio
                </Link>
              </li>
              <li>
                <Link to="/design-templates" className="hover:text-[#A31C1B] transition-colors">
                  Design Templates Gallery
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-[#A31C1B] transition-colors">
                  Order Tracking Desk
                </Link>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-[#E5E5E5] space-y-2 text-xs">
              <p className="font-semibold text-[#171717]">Direct Contact</p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#A31C1B]" />
                <a href={`tel:${SAKTHI_BRAND_CONFIG.phone}`} className="hover:text-[#171717]">
                  {SAKTHI_BRAND_CONFIG.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#A31C1B]" />
                <a href={`mailto:${SAKTHI_BRAND_CONFIG.email}`} className="hover:text-[#171717]">
                  {SAKTHI_BRAND_CONFIG.email}
                </a>
              </p>
            </div>
          </div>

          {/* Column 4: LOCATION (Interactive Map & Address) */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[#171717] mb-4 border-b border-[#E5E5E5] pb-2">
              LOCATION
            </h3>
            <div className="space-y-3">
              <p className="text-xs flex items-start gap-1.5 leading-relaxed text-[#666666]">
                <MapPin className="w-4 h-4 text-[#A31C1B] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#171717]">SAKTHI GARMENTS</strong>
                  <br />
                  {SAKTHI_BRAND_CONFIG.location}
                </span>
              </p>

              {/* Embedded Interactive Map for Tiruppur Hub */}
              <div className="w-full h-44 rounded-lg overflow-hidden border border-[#E5E5E5] shadow-inner relative">
                <iframe
                  title="Sakthi Garments Tiruppur Location Map"
                  src="https://maps.google.com/maps?width=300&height=300&hl=en&q=KVR%20Nagar%20Tiruppur%20Tamil%20Nadu&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-[#E5E5E5] bg-[#F7F7F5] py-4 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div>
            <p className="text-[#171717] font-medium">
              SAKTHI GARMENTS • <span className="text-[#A31C1B] font-semibold">{SAKTHI_BRAND_CONFIG.tagline}</span>
            </p>
            <p className="text-[#666666] text-[11px] mt-0.5">
              &copy; {new Date().getFullYear()} SAKTHI GARMENTS (KVR Nagar, Tiruppur). All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[#666666]">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#171717] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#A31C1B] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/91${SAKTHI_BRAND_CONFIG.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#16A34A] transition-colors"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
