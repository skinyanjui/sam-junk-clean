
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AnalyticsProvider } from "@/providers/AnalyticsProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import SimpleErrorBoundary from "@/components/SimpleErrorBoundary";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingPhoneCTA from "@/components/mobile/FloatingPhoneCTA";
import { usePerformanceMonitoring } from "@/hooks/use-performance-monitoring";
import ABTestProvider from "@/components/testing/ABTestProvider";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Quote from "./pages/Quote";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import Locations from "./pages/Locations";
import Location from "./pages/Location";
import Careers from "./pages/Careers";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  console.log('AppContent starting to render');
  
  try {
    usePerformanceMonitoring();
    console.log('Performance monitoring hook executed');
  } catch (error) {
    console.error('Performance monitoring error:', error);
  }
  
  console.log('AppContent rendered successfully');
  
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services/:category" element={<Services />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/faq" element={<FAQ />} />
                 <Route path="/locations" element={<Locations />} />
         <Route path="/locations/:slug" element={<Location />} />
         <Route path="/careers" element={<Careers />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Mobile Floating Phone CTA */}
      <FloatingPhoneCTA />
    </>
  );
};

const App = () => {
  console.log('App component starting');
  console.log('React version:', React.version);
  console.log('Environment:', process.env.NODE_ENV);
  
  return (
    <SimpleErrorBoundary>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <SimpleErrorBoundary>
            <HelmetProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <SimpleErrorBoundary>
                    <AnalyticsProvider>
                      <ABTestProvider>
                        <AppContent />
                      </ABTestProvider>
                    </AnalyticsProvider>
                  </SimpleErrorBoundary>
                </BrowserRouter>
              </TooltipProvider>
            </HelmetProvider>
          </SimpleErrorBoundary>
        </QueryClientProvider>
      </ErrorBoundary>
    </SimpleErrorBoundary>
  );
};

export default App;
