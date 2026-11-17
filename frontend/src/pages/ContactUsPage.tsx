import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import apiClient from '../api/client';
import { SAKTHI_BRAND_CONFIG } from '../data/productsData';

export const ContactUsPage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General Enquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/support/tickets', form);
    } catch {}
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#F7F7F5] text-[#171717] font-poppins">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E5E5] text-[#171717] text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#A31C1B]" />
            <span>TIRUPPUR DIRECT DESK</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#171717] uppercase">Contact Us</h1>
          <p className="text-[#666666] text-base leading-relaxed">
            Have questions regarding our 3D customization, bulk wholesale manufacturing, or factory swatch kits?
            Our support and production desks in Tiruppur are ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E5E5] space-y-6 shadow-sm">
            <h3 className="font-bold text-lg text-[#171717]">Headquarters</h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#A31C1B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#171717]">SAKTHI GARMENTS</p>
                  <p className="text-[#666666]">KVR Nagar (Near Chennai Bakes), Tiruppur — 641604</p>
                  <p className="text-[#666666]">Tamil Nadu, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#06110C] shrink-0" />
                <div>
                  <p className="font-bold text-[#171717]">Customer Hotline</p>
                  <p className="text-[#666666]">{SAKTHI_BRAND_CONFIG.phoneDisplay}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#A31C1B] shrink-0" />
                <div>
                  <p className="font-bold text-[#171717]">Official Email</p>
                  <p className="text-[#666666]">{SAKTHI_BRAND_CONFIG.email}</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Actions */}
            <div className="pt-4 border-t border-[#E5E5E5] flex flex-wrap gap-2.5">
              <a
                href={`tel:${SAKTHI_BRAND_CONFIG.phone}`}
                className="py-2.5 px-4 rounded-xl bg-[#06110C] hover:bg-[#A31C1B] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
              <a
                href={`https://wa.me/91${SAKTHI_BRAND_CONFIG.phone}?text=Hello%20Sakthi%20Garments`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-[#16A34A] hover:bg-[#15803d] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`mailto:${SAKTHI_BRAND_CONFIG.email}`}
                className="py-2.5 px-4 rounded-xl bg-[#F7F7F5] hover:bg-[#E5E5E5] text-[#171717] border border-[#E5E5E5] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E5E5] shadow-sm">
            {submitted ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#16A34A] mx-auto" />
                <h3 className="font-bold text-lg text-[#171717]">Message Received</h3>
                <p className="text-xs text-[#666666]">
                  Our Tiruppur operations desk has received your enquiry and will respond promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-xl bg-[#06110C] hover:bg-[#A31C1B] text-xs text-white font-bold transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-[#666666] block mb-1 font-semibold">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C] focus:bg-white transition-colors"
                    placeholder="e.g. S. Arunkumar"
                  />
                </div>

                <div>
                  <label className="text-[#666666] block mb-1 font-semibold">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C] focus:bg-white transition-colors"
                    placeholder="name@example.com"
                  />
                </div>

                <div>
                  <label className="text-[#666666] block mb-1 font-semibold">Enquiry Category</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C] focus:bg-white transition-colors"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Bulk Order Quotation">Bulk Order Quotation</option>
                    <option value="Cloth Sample Queries">Cloth Sample Queries (₹69)</option>
                    <option value="Garment Mill Registration">Garment Mill Registration</option>
                    <option value="Technical 3D Support">Technical 3D Customizer Support</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#666666] block mb-1 font-semibold">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#F7F7F5] border border-[#E5E5E5] text-[#171717] focus:outline-none focus:border-[#06110C] focus:bg-white resize-none transition-colors"
                    placeholder="Provide details about your requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#06110C] hover:bg-[#A31C1B] text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
