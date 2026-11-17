import React from 'react';

export const PrivacyPolicyPage: React.FC = () => (
  <div className="pt-28 pb-20 min-h-screen bg-[#F7F7F5] text-[#171717] font-poppins">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#E5E5E5] space-y-6 shadow-sm">
      <h1 className="text-3xl font-black text-[#171717] uppercase">Privacy Policy</h1>
      <p className="text-xs text-[#A31C1B] font-semibold">Last updated: October 2026 • SAKTHI GARMENTS, KVR Nagar, Tiruppur — 641604</p>
      <div className="space-y-4 text-xs sm:text-sm text-[#666666] leading-relaxed">
        <p>
          SAKTHI GARMENTS (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy
          explains how personal information, custom 3D designs, delivery addresses, and payment identifiers are collected, used,
          and safeguarded.
        </p>
        <h3 className="text-base font-bold text-[#171717] pt-2">1. Information We Collect</h3>
        <p>
          We collect your name, email, phone number, physical delivery address, and uploaded graphics or artwork for the sole purpose
          of fulfilling 3D garment customization orders and facilitating manufacturer shipping from Tiruppur.
        </p>
        <h3 className="text-base font-bold text-[#171717] pt-2">2. AI Data Usage & Confidentiality</h3>
        <p>
          Prompts sent to the AI Design Assistant are processed securely through our server-side integration. Your design artwork is never
          sold or shared with unauthorized third parties.
        </p>
        <h3 className="text-base font-bold text-[#171717] pt-2">3. Payment Security</h3>
        <p>
          We do not store complete credit card or debit card numbers on our servers. Transactions are handled through PCI-DSS
          compliant payment gateways (Razorpay / UPI).
        </p>
      </div>
    </div>
  </div>
);

export const TermsPage: React.FC = () => (
  <div className="pt-28 pb-20 min-h-screen bg-[#F7F7F5] text-[#171717] font-poppins">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#E5E5E5] space-y-6 shadow-sm">
      <h1 className="text-3xl font-black text-[#171717] uppercase">Terms & Conditions</h1>
      <p className="text-xs text-[#A31C1B] font-semibold">Effective: October 2026 • SAKTHI GARMENTS Platform</p>
      <div className="space-y-4 text-xs sm:text-sm text-[#666666] leading-relaxed">
        <p>
          By accessing SAKTHI GARMENTS and using our 3D customization editor or multi-mill marketplace, you agree to comply with
          these terms.
        </p>
        <h3 className="text-base font-bold text-[#171717] pt-2">1. Intellectual Property & Artwork Rights</h3>
        <p>
          Users must own or possess valid licensing rights for any logos, trademarks, or copyrighted graphics uploaded for custom T-shirt
          printing. SAKTHI GARMENTS and partner mills reserve the right to cancel orders containing infringing material.
        </p>
        <h3 className="text-base font-bold text-[#171717] pt-2">2. Custom Production & Pricing Quotes</h3>
        <p>
          All customized orders undergo digital proofing before fabric printing. Transparent prices are calculated server-side based
          on base garment type, print zones, and quantities.
        </p>
      </div>
    </div>
  </div>
);

export const RefundPolicyPage: React.FC = () => (
  <div className="pt-28 pb-20 min-h-screen bg-[#F7F7F5] text-[#171717] font-poppins">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#E5E5E5] space-y-6 shadow-sm">
      <h1 className="text-3xl font-black text-[#171717] uppercase">Refund & Cancellation Policy</h1>
      <div className="space-y-4 text-xs sm:text-sm text-[#666666] leading-relaxed">
        <p>
          Because customized T-shirts are individually crafted to customer specifications, cancellation is permitted only prior to
          the &quot;In Production&quot; stage.
        </p>
        <h3 className="text-base font-bold text-[#171717] pt-2">Defective or Damaged Garments</h3>
        <p>
          If your garment arrives with a manufacturing defect, fabric flaw, or print misplacement, contact our Tiruppur support desk
          within 7 days of delivery for a free reprint or full refund.
        </p>
      </div>
    </div>
  </div>
);

export const ShippingPolicyPage: React.FC = () => (
  <div className="pt-28 pb-20 min-h-screen bg-[#F7F7F5] text-[#171717] font-poppins">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#E5E5E5] space-y-6 shadow-sm">
      <h1 className="text-3xl font-black text-[#171717] uppercase">Shipping & Fulfillment Policy</h1>
      <div className="space-y-4 text-xs sm:text-sm text-[#666666] leading-relaxed">
        <p>
          All orders are manufactured and dispatched directly from KVR Nagar (Near Chennai Bakes), Tiruppur, Tamil Nadu — 641604. Standard shipping delivers
          within 3 to 6 business days across India. Express courier tracking is provided immediately upon dispatch.
        </p>
        <p className="text-[#16A34A] font-semibold">
          Free shipping applies to all orders totaling ₹999 or above.
        </p>
      </div>
    </div>
  </div>
);
