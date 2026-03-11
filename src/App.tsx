import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ToolPage } from "./pages/ToolPage";
import { DynamicSEOPage } from "./pages/DynamicSEOPage";

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

import ScrollToTop from "./components/ScrollToTop";

export default function App() {

return (

<HelmetProvider>

<BrowserRouter>

<ScrollToTop />

<Routes>

<Route path="/" element={<Layout />}>

{/* HOME */}
<Route index element={<HomePage />} />

{/* TOOL PAGE */}
<Route path="tools/:toolId" element={<ToolPage />} />

{/* TOOL SEARCH */}
<Route path="search" element={<ToolSearchPage />} />

{/* TOOL CATEGORIES */}
<Route path="categories" element={<ToolCategoriesPage />} />

{/* STATIC PAGES */}
<Route path="about" element={<AboutPage />} />
<Route path="contact" element={<ContactPage />} />
<Route path="privacy-policy" element={<PrivacyPage />} />
<Route path="terms-and-conditions" element={<TermsPage />} />
<Route path="disclaimer" element={<DisclaimerPage />} />
<Route path="sitemap" element={<SitemapPage />} />

{/* PROGRAMMATIC SEO PAGES */}
<Route path="ai-:slug" element={<DynamicSEOPage />} />

{/* 404 */}
<Route path="404" element={<h1 style={{ padding: 40 }}>404 Page Not Found</h1>} />

<Route path="*" element={<Navigate to="/404" replace />} />

</Route>

</Routes>

</BrowserRouter>

</HelmetProvider>

);

}
