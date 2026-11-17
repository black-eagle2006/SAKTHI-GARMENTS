import React from 'react';
import { SAKTHI_BRAND_CONFIG } from '../../data/productsData';

export const NoticeBar: React.FC = () => {
  return (
    <div className="w-full bg-[#F7F7F5] border-b border-[#E5E5E5] py-2.5 text-center text-xs sm:text-sm font-poppins text-[#171717]">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#A31C1B]"></span>
        <span className="font-semibold tracking-wide">
          {SAKTHI_BRAND_CONFIG.bulkNoticeText}
        </span>
      </div>
    </div>
  );
};

export default NoticeBar;

