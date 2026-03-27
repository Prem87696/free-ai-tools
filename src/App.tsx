import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import ToolPage from "./pages/ToolPage";;
import { ToolsPage } from "./pages/ToolsPage";
import { DynamicSEOPage } from "./pages/DynamicSEOPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogListPage } from "./pages/BlogListPage";
import { AdminPage } from "./pages/AdminPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";

import {
AboutPage,
ContactPage,
PrivacyPage,
TermsPage,
DisclaimerPage
} from "./pages/StaticPages";

import { SitemapPage } from "./pages/SitemapPage";
import { ToolCategoriesPage } from "./pages/ToolCategoriesPage";
import { ToolSearchPage } from "./pages/ToolSearchPage";
import { CategoryPage } from "./pages/CategoryPage";

/* 🔥 NEW (Supabase data page) */
import { ContactData } from "./pages/ContactData";

import ScrollToTop from "./components/ScrollToTop";

export default function App() {

/* 🔁 Redirect old tool URL */
function ToolRedirect() {
const { toolId } = useParams();
return <Navigate to={`/tools/${toolId}`} replace />;
}

/* ❌ 404 Page */
function NotFound() {
return ( <div className="flex flex-col items-center justify-center py-20 text-center"> <h1 className="text-4xl font-bold mb-4">404</h1> <p className="text-slate-500 mb-6">Page Not Found</p> <a href="/" className="text-indigo-600 font-medium">
Go Home → </a> </div>
);
}

return ( <HelmetProvider> <BrowserRouter> <ScrollToTop />
 
    <Routes>

      <Route path="/" element={<Layout />}>

        {/* HOME */}
        <Route index element={<HomePage />} />

        {/* TOOLS */}
        <Route path="tools" element={<ToolsPage />} />
        <Route path="tools/:toolId" element={<ToolPage />} />
        <Route path="tool/:toolId" element={<ToolRedirect />} />

        {/* SEARCH */}
        <Route path="search" element={<ToolSearchPage />} />

        {/* CATEGORIES */}
        <Route path="categories" element={<ToolCategoriesPage />} />
        <Route path="category/:category" element={<CategoryPage />} />

        {/* BLOG */}
        <Route path="blog" element={<BlogListPage />} />
        <Route path="blog/:slug" element={<BlogPage />} />

        {/* ADMIN */}
        <Route path="admin" element={<AdminPage />} />

        {/* 📊 NEW: CONTACT DATA (Admin Messages Page) */}
        <Route path="messages" element={<ContactData />} />

        {/* ANALYTICS */}
        <Route path="analytics" element={<AnalyticsPage />} />

        {/* STATIC */}
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy-policy" element={<PrivacyPage />} />
        <Route path="terms-and-conditions" element={<TermsPage />} />
        <Route path="disclaimer" element={<DisclaimerPage />} />
        <Route path="sitemap" element={<SitemapPage />} />

        {/* PROGRAMMATIC SEO */}
        <Route path="ai-:slug" element={<DynamicSEOPage />} />

        {/* 404 */}
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />

      </Route>

    </Routes>

  </BrowserRouter>
</HelmetProvider>
 
);
}
