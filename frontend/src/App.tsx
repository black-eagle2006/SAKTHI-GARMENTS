import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { CustomizerProvider } from './context/CustomizerContext';

// Cinematic Brand Video Intro Animation (Plays before Home Page)
import { CinematicIntro } from './components/common/CinematicIntro';

// Layout & Common
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsCatalogPage } from './pages/ProductsCatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CustomizerPage } from './pages/CustomizerPage';
import { FabricSamplesPage } from './pages/FabricSamplesPage';
import { TiruppurMillsPage } from './pages/TiruppurMillsPage';
import { DesignTemplatesPage } from './pages/DesignTemplatesPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentPage } from './pages/PaymentPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { FaqPage } from './pages/FaqPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { SignUpPage } from './pages/auth/SignUpPage';

// Dashboards
import { CustomerDashboardPage } from './pages/customer/CustomerDashboardPage';
import { CompanyDashboardPage } from './pages/company/CompanyDashboardPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

// Legal Pages
import {
  PrivacyPolicyPage,
  TermsPage,
  RefundPolicyPage,
  ShippingPolicyPage,
} from './pages/legal/LegalPages';

// Scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  // Video Animation: Plays BEFORE the Home Page
  const [showIntro, setShowIntro] = useState<boolean>(true);

  // Watchdog timer: Ensures smooth transition to Home Page even on slow hardware
  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 5500);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <CustomizerProvider>
            {/* 5-SECOND CINEMATIC BRAND INTRO ANIMATION: Plays BEFORE Home Page */}
            {showIntro && (
              <CinematicIntro onComplete={() => setShowIntro(false)} forcePlay={true} />
            )}

            <div className="flex flex-col min-h-screen bg-white text-[#171717] selection:bg-[#A31C1B] selection:text-white font-poppins animate-fadeIn">
              <ScrollToTop />
              <Navbar />

              <main className="flex-grow">
                <Routes>
                  {/* Public Core Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/home" element={<HomePage />} />
                    <Route path="/products" element={<ProductsCatalogPage />} />
                    <Route path="/products/info/:slug" element={<ProductDetailPage />} />
                    <Route path="/showcase-3d" element={<HomePage />} />
                    <Route path="/customizer" element={<CustomizerPage />} />
                    <Route path="/tiruppur-mills" element={<TiruppurMillsPage />} />
                    <Route path="/marketplace" element={<TiruppurMillsPage />} />
                    <Route path="/fabric-samples" element={<FabricSamplesPage />} />
                    <Route path="/design-templates" element={<DesignTemplatesPage />} />
                    <Route path="/explore" element={<DesignTemplatesPage />} />
                    <Route path="/ai-assistant" element={<AiAssistantPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/order-success" element={<OrderSuccessPage />} />
                    <Route path="/track" element={<OrderTrackingPage />} />
                    <Route path="/track/:orderNumber" element={<OrderTrackingPage />} />
                    <Route path="/how-it-works" element={<HowItWorksPage />} />
                    <Route path="/about" element={<AboutUsPage />} />
                    <Route path="/contact" element={<ContactUsPage />} />
                    <Route path="/faq" element={<FaqPage />} />

                    {/* Auth Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />

                    {/* Legal & Compliance */}
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/refund-policy" element={<RefundPolicyPage />} />
                    <Route path="/shipping-policy" element={<ShippingPolicyPage />} />

                    {/* Protected Dashboards */}
                    <Route
                      path="/customer/dashboard"
                      element={
                        <ProtectedRoute allowedRoles={['CUSTOMER', 'ADMIN']}>
                          <CustomerDashboardPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/customer/orders"
                      element={
                        <ProtectedRoute allowedRoles={['CUSTOMER', 'ADMIN']}>
                          <CustomerDashboardPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/customer/profile"
                      element={
                        <ProtectedRoute allowedRoles={['CUSTOMER', 'ADMIN']}>
                          <CustomerDashboardPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/company/dashboard"
                      element={
                        <ProtectedRoute allowedRoles={['COMPANY', 'ADMIN']}>
                          <CompanyDashboardPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/dashboard"
                      element={
                        <ProtectedRoute allowedRoles={['ADMIN']}>
                          <AdminDashboardPage />
                        </ProtectedRoute>
                      }
                    />

                    {/* Fallback Catch-all Route */}
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </main>

                <Footer />
              </div>
            </CustomizerProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
  );
};

export default App;
