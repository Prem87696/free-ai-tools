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

const tools = [

{ name: "AI Chatbot", icon: Bot, path: "/tools/ai-chatbot" },
{ name: "Caption Generator", icon: FileText, path: "/tools/ai-caption-generator" },
{ name: "Resume Builder", icon: User, path: "/tools/ai-resume-builder" },
{ name: "Email Writer", icon: Mail, path: "/tools/ai-email-writer" },
{ name: "Blog Writer", icon: PenTool, path: "/tools/ai-blog-writer" },
{ name: "Hashtag Generator", icon: Hash, path: "/tools/ai-hashtag-generator" },

{ name: "SVG to PNG", icon: Image, path: "/tools/svg-to-png" },
{ name: "PNG to JPG", icon: Image, path: "/tools/png-to-jpg" },
{ name: "WEBP to PNG", icon: Image, path: "/tools/webp-to-png" },
{ name: "Image Compressor", icon: FileImage, path: "/tools/image-compressor" },

{ name: "Image to PDF", icon: File, path: "/tools/image-to-pdf" },
{ name: "JPG to PDF", icon: File, path: "/tools/jpg-to-pdf" },
{ name: "Merge PDF", icon: File, path: "/tools/merge-pdf" },
{ name: "Split PDF", icon: Scissors, path: "/tools/split-pdf" },
{ name: "PDF to Image", icon: FileImage, path: "/tools/pdf-to-image" }

];

return (

<div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">

{/* HEADER */}

<header className="bg-white border-b border-slate-200 sticky top-0 z-50">

<div className="container mx-auto px-4 h-16 flex items-center justify-between">

<Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">

<Bot className="w-8 h-8" />

<span>AI Tools Platform</span>

</Link>

{/* Desktop Navigation */}

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

{/* Mobile Menu Button */}

<button
onClick={toggleMenu}
className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"

>

{isMenuOpen ? <X /> : <Menu />}

</button>

</div>

{/* Mobile Navigation */}

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

<p className="text-xs font-semibold text-slate-400 uppercase mt-3">
Popular Tools
</p>

<div className="grid grid-cols-2 gap-2">

{tools.slice(0, 6).map((tool) => (

<Link
key={tool.name}
to={tool.path}
className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600"
onClick={() => setIsMenuOpen(false)}
>

<tool.icon className="w-4 h-4" />

{tool.name}

</Link>

))}

</div>

</nav>

</div>

)}

</header>

{/* HEADER ADS */}

<div className="container mx-auto px-4">
<AdPlaceholder slot="header" />
</div>

{/* MAIN CONTENT */}

<main className="flex-grow container mx-auto px-4 py-8">

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

{/* Content Area */}

<div className="lg:col-span-9">

<PageTransition>
<Outlet />
</PageTransition>

</div>

{/* Sidebar */}

<aside className="lg:col-span-3 space-y-8">

<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

<h3 className="font-bold text-lg mb-5 text-slate-900">
Popular Tools
</h3>

<div className="space-y-2">

{tools.map((tool) => (

<Link
key={tool.name}
to={tool.path}
className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50"
>

<div className="p-2 rounded-lg bg-slate-100">

<tool.icon className="w-4 h-4" />

</div>

<span className="text-sm font-medium text-slate-700">

{tool.name}

</span>

</Link>

))}

</div>

</div>

<AdPlaceholder slot="sidebar" />

</aside>

</div>

</main>

{/* FOOTER ADS */}

<div className="container mx-auto px-4">
<AdPlaceholder slot="footer" />
</div>

{/* FOOTER */}

<footer className="bg-white border-t border-slate-200 py-12 mt-8">

<div className="container mx-auto px-4">

<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

{/* Brand */}

<div className="md:col-span-2">

<h3 className="text-xl font-bold text-indigo-600 mb-3">
AI Tools Platform
</h3>

<p className="text-slate-500 text-sm max-w-md">
Free AI Tools Platform provides powerful artificial intelligence tools
for creators, students, freelancers, and professionals. Our platform
helps users generate text, images, and digital content instantly.
</p>

</div>

{/* Popular Tools */}

<div>

<h4 className="font-bold text-slate-900 mb-4">
Popular Tools
</h4>

<ul className="space-y-2 text-sm text-slate-500">

<li><Link to="/tools/ai-chatbot">AI Chatbot</Link></li>
<li><Link to="/tools/ai-caption-generator">Caption Generator</Link></li>
<li><Link to="/tools/ai-blog-writer">Blog Writer</Link></li>
<li><Link to="/tools/ai-hashtag-generator">Hashtag Generator</Link></li>

</ul>

</div>

{/* Legal */}

<div>

<h4 className="font-bold text-slate-900 mb-4">
Legal
</h4>

<ul className="space-y-2 text-sm text-slate-500">

<li><Link to="/about">About</Link></li>
<li><Link to="/privacy-policy">Privacy Policy</Link></li>
<li><Link to="/terms">Terms & Conditions</Link></li>
<li><Link to="/disclaimer">Disclaimer</Link></li>
<li><Link to="/contact">Contact</Link></li>

</ul>

</div>

</div>

<div className="border-t border-slate-100 pt-8 text-center text-slate-400 text-sm">

© {new Date().getFullYear()} AI Tools Platform

</div>

</div>

</footer>

</div>

);
}
