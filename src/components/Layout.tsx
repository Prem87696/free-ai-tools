import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
Menu,
X,
Bot,
FileText,
Mail,
PenTool,
Hash,
User,
Image,
FileImage,
File,
Scissors
} from "lucide-react";

import { AdPlaceholder } from "./AdPlaceholder";
import PageTransition from "./PageTransition";

export function Layout() {

const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

const navLinks = [
{ name: "Home", path: "/" },
{ name: "Tools", path: "/tools" },
{ name: "About", path: "/about" },
{ name: "Contact", path: "/contact" }
];

const toolItem =
"flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-indigo-200 hover:bg-indigo-50 transition";

const iconBox =
"p-2 rounded-lg bg-slate-100";

return (

<div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">

{/* HEADER */}

<header className="bg-white border-b border-slate-100 sticky top-0 z-50">

<div className="container mx-auto px-4 h-16 flex items-center justify-between">

<Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">

<Bot className="w-8 h-8" />
<span>AI Tools Platform</span>

</Link>

{/* Desktop Nav */}

<nav className="hidden md:flex items-center gap-6">

{navLinks.map((link) => (

<Link
key={link.name}
to={link.path}
className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
>

{link.name}

</Link>

))}

<Link
to="/tools"
className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
>

Get Started

</Link>

</nav>

<button
onClick={toggleMenu}
className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"

>

{isMenuOpen ? <X /> : <Menu />}

</button>

</div>

{/* Mobile Menu */}

{isMenuOpen && (

<div className="md:hidden bg-white border-t border-slate-200 p-4">

<nav className="flex flex-col gap-4">

{navLinks.map((link) => (

<Link
key={link.name}
to={link.path}
className="text-slate-600 hover:text-indigo-600 font-medium py-2"
onClick={() => setIsMenuOpen(false)}
>

{link.name}

</Link>

))}

</nav>

</div>

)}

</header>

{/* HEADER ADS */}

<div className="container mx-auto px-4">
<AdPlaceholder slot="header" />
</div>

{/* MAIN */}

<main className="flex-grow container mx-auto px-4 py-8">

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

{/* CONTENT */}

<div className="lg:col-span-9">

<PageTransition>
<Outlet />
</PageTransition>

</div>

{/* SIDEBAR */}

<aside className="lg:col-span-3 space-y-8">

{/* AI TOOLS */}

<div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-lg transition">

<h3 className="font-bold text-lg mb-5 text-slate-900">
AI Tools
</h3>

<div className="space-y-2">

<Link to="/tools/ai-chatbot" className={toolItem}>
<div className={iconBox}><Bot size={16}/></div>
<span className="text-sm font-medium">AI Chatbot</span>
</Link>

<Link to="/tools/ai-blog-writer" className={toolItem}>
<div className={iconBox}><PenTool size={16}/></div>
<span className="text-sm font-medium">Blog Writer</span>
</Link>

<Link to="/tools/ai-caption-generator" className={toolItem}>
<div className={iconBox}><FileText size={16}/></div>
<span className="text-sm font-medium">Caption Generator</span>
</Link>

<Link to="/tools/ai-resume-builder" className={toolItem}>
<div className={iconBox}><User size={16}/></div>
<span className="text-sm font-medium">Resume Builder</span>
</Link>

<Link to="/tools/ai-email-writer" className={toolItem}>
<div className={iconBox}><Mail size={16}/></div>
<span className="text-sm font-medium">Email Writer</span>
</Link>

<Link to="/tools/ai-hashtag-generator" className={toolItem}>
<div className={iconBox}><Hash size={16}/></div>
<span className="text-sm font-medium">Hashtag Generator</span>
</Link>

</div>

</div>

{/* IMAGE TOOLS */}

<div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-lg transition">

<h3 className="font-bold text-lg mb-5 text-slate-900">
Image Tools
</h3>

<div className="space-y-2">

<Link to="/tools/image-converter-ultra" className={toolItem}>
<div className={iconBox}><Image size={16}/></div>
<span className="text-sm font-medium">Image Converter Ultra</span>
</Link>

<Link to="/tools/svg-to-png" className={toolItem}>
<div className={iconBox}><Image size={16}/></div>
<span className="text-sm font-medium">SVG to PNG</span>
</Link>

<Link to="/tools/png-to-jpg" className={toolItem}>
<div className={iconBox}><Image size={16}/></div>
<span className="text-sm font-medium">PNG to JPG</span>
</Link>

<Link to="/tools/webp-to-png" className={toolItem}>
<div className={iconBox}><Image size={16}/></div>
<span className="text-sm font-medium">WEBP to PNG</span>
</Link>

<Link to="/tools/image-compressor" className={toolItem}>
<div className={iconBox}><FileImage size={16}/></div>
<span className="text-sm font-medium">Image Compressor</span>
</Link>

</div>

</div>

{/* PDF TOOLS */}

<div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-lg transition">

<h3 className="font-bold text-lg mb-5 text-slate-900">
PDF Tools
</h3>

<div className="space-y-2">

<Link to="/tools/image-to-pdf" className={toolItem}>
<div className={iconBox}><File size={16}/></div>
<span className="text-sm font-medium">Image to PDF</span>
</Link>

<Link to="/tools/jpg-to-pdf" className={toolItem}>
<div className={iconBox}><File size={16}/></div>
<span className="text-sm font-medium">JPG to PDF</span>
</Link>

<Link to="/tools/merge-pdf" className={toolItem}>
<div className={iconBox}><File size={16}/></div>
<span className="text-sm font-medium">Merge PDF</span>
</Link>

<Link to="/tools/split-pdf" className={toolItem}>
<div className={iconBox}><Scissors size={16}/></div>
<span className="text-sm font-medium">Split PDF</span>
</Link>

<Link to="/tools/pdf-to-image" className={toolItem}>
<div className={iconBox}><FileImage size={16}/></div>
<span className="text-sm font-medium">PDF to Image</span>
</Link>

</div>

</div>

<AdPlaceholder slot="sidebar"/>

</aside>

</div>

</main>

{/* FOOTER ADS */}

<div className="container mx-auto px-4">
<AdPlaceholder slot="footer" />
</div>

<footer className="bg-white border-t border-slate-100 mt-16">

<div className="container mx-auto px-4 py-14">

<div className="grid md:grid-cols-4 gap-10">

{/* BRAND */}

<div>

<h3 className="text-xl font-bold text-indigo-600 mb-3">
AI Tools Platform
</h3>

<p className="text-sm text-slate-500 leading-relaxed">
AI Tools Platform is a powerful collection of modern
online utilities designed to help creators, developers,
students, freelancers, and businesses complete digital
tasks faster using artificial intelligence and smart
automation tools.
</p>

<p className="text-sm text-slate-500 mt-4 leading-relaxed">
Our platform provides advanced AI content generators,
image converters, and document tools that work directly
inside your browser without requiring software installation.
</p>

</div>

{/* AI TOOLS */}

<div>

<h4 className="font-semibold text-slate-900 mb-4">
AI Writing Tools
</h4>

<ul className="space-y-2 text-sm text-slate-500">

<li><Link to="/tools/ai-chatbot" className="hover:text-indigo-600">AI Chatbot</Link></li>

<li><Link to="/tools/ai-blog-writer" className="hover:text-indigo-600">AI Blog Writer</Link></li>

<li><Link to="/tools/ai-caption-generator" className="hover:text-indigo-600">Caption Generator</Link></li>

<li><Link to="/tools/ai-email-writer" className="hover:text-indigo-600">AI Email Writer</Link></li>

<li><Link to="/tools/ai-resume-builder" className="hover:text-indigo-600">Resume Builder</Link></li>

<li><Link to="/tools/ai-hashtag-generator" className="hover:text-indigo-600">Hashtag Generator</Link></li>

</ul>

</div>

{/* IMAGE TOOLS */}

<div>

<h4 className="font-semibold text-slate-900 mb-4">
Image Tools
</h4>

<ul className="space-y-2 text-sm text-slate-500">

<li><Link to="/tools/image-converter-ultra" className="hover:text-indigo-600">Image Converter Ultra</Link></li>

<li><Link to="/tools/svg-to-png" className="hover:text-indigo-600">SVG to PNG</Link></li>

<li><Link to="/tools/png-to-jpg" className="hover:text-indigo-600">PNG to JPG</Link></li>

<li><Link to="/tools/webp-to-png" className="hover:text-indigo-600">WEBP to PNG</Link></li>

<li><Link to="/tools/image-compressor" className="hover:text-indigo-600">Image Compressor</Link></li>

</ul>

</div>

{/* LEGAL */}

<div>

<h4 className="font-semibold text-slate-900 mb-4">
Company
</h4>

<ul className="space-y-2 text-sm text-slate-500">

<li><Link to="/about" className="hover:text-indigo-600">About Us</Link></li>

<li><Link to="/contact" className="hover:text-indigo-600">Contact</Link></li>

<li><Link to="/privacy-policy" className="hover:text-indigo-600">Privacy Policy</Link></li>

<li><Link to="/terms-and-conditions" className="hover:text-indigo-600">Terms & Conditions</Link></li>

<li><Link to="/disclaimer" className="hover:text-indigo-600">Disclaimer</Link></li>

</ul>

</div>

</div>

{/* BOTTOM */}

<div className="border-t border-slate-100 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between">

<p className="text-sm text-slate-400">
© {new Date().getFullYear()} AI Tools Platform. All rights reserved.
</p>

<p className="text-xs text-slate-400 mt-2 md:mt-0">
Free AI tools for content generation, image conversion, and productivity.
</p>

</div>

</div>

</footer>


</div>

);

}
