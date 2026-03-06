import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ToolPage } from './pages/ToolPage';
import { DynamicSEOPage } from './pages/DynamicSEOPage';
import { AboutPage, ContactPage, PrivacyPage, TermsPage, DisclaimerPage } from './pages/StaticPages';
import { SitemapPage } from './pages/SitemapPage';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            
            {/* Core Tool Routes */}
            <Route path="tools" element={<Navigate to="/" replace />} />
            <Route path="tools/:toolId" element={<ToolPage />} />
            
            {/* Static Pages */}
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy-policy" element={<PrivacyPage />} />
            <Route path="terms-and-conditions" element={<TermsPage />} />
            <Route path="disclaimer" element={<DisclaimerPage />} />
            <Route path="sitemap" element={<SitemapPage />} />

            {/* Programmatic SEO Routes (Catch-all for generated pages) */}
            {/* Matches /ai-caption-generator-for-instagram, etc. */}
            <Route path=":slug" element={<DynamicSEOPage />} />
            
            {/* 404 */}
            <Route path="404" element={
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">404 - Page Not Found</h1>
                <p className="text-slate-600">The page you are looking for does not exist.</p>
              </div>
            } />
            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
