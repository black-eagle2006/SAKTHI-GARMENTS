import React, { useState, useEffect } from 'react';
import { SAKTHI_BRAND_CONFIG } from '../../data/productsData';
import { productsApi } from '../../api/productsApi';

export const AnnouncementBar: React.FC = () => {
  const [announcement, setAnnouncement] = useState(SAKTHI_BRAND_CONFIG.announcementText);

  useEffect(() => {
    productsApi
      .getBrandConfig()
      .then((cfg) => {
        if (cfg && cfg.announcement) {
          setAnnouncement(cfg.announcement);
        }
      })
      .catch(() => {
        // keep fallback
      });
  }, []);

  return (
    <div className="w-full bg-[#06110C] text-white py-1.5 px-4 text-center text-xs font-poppins relative z-50 overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <p className="tracking-wide text-xs">
          <span className="font-bold text-[#A31C1B] bg-white px-2 py-0.5 rounded text-[11px] mr-2">OFFER</span>
          {announcement}
        </p>
      </div>
    </div>
  );
};

export default AnnouncementBar;
