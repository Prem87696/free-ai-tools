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

return (

<div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">

{/* HEADER */}

<header className="bg-white border-b border-slate-200 sticky top-0 z-50">

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

{/* Mobile Button */}

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

{/* PAGE CONTENT */}

<div className="lg:col-span-9">

<PageTransition>
<Outlet />
</PageTransition>

</div>

{/* SIDEBAR */}

<aside className="lg:col-span-3 space-y-8">

{/* AI TOOLS */}

<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

<h3 className="font-bold text-lg mb-5 text-slate-900">
AI Tools
</h3>

<div className="space-y-2">

<Link to="/tools/ai-chatbot" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50">
<Bot className="w-4 h-4"/>
<span className="text-sm font-medium">AI Chatbot</span>
</Link>

<Link to="/tools/ai-blog-writer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50">
<PenTool className="w-4 h-4"/>
<span className="text-sm font-medium">Blog Writer</span>
</Link>

<Link to="/tools/ai-caption-generator" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50">
<FileText className="w-4 h-4"/>
<span className="text-sm font-medium">Caption Generator</span>
</Link>

<Link to="/tools/ai-resume-builder" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50">
<User className="w-4 h-4"/>
<span className="text-sm font-medium">Resume Builder</span>
</Link>

<Link to="/tools/ai-email-writer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50">
<Mail className="w-4 h-4"/>
<span className="text-sm font-medium">Email Writer</span>
</Link>

<Link to="/tools/ai-hashtag-generator" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50">
<Hash className="w-4 h-4"/>
<span className="text-sm font-medium">Hashtag Generator</span>
</Link>

</div>

</div>

{/* IMAGE TOOLS */}

<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

<h3 className="font-bold text-lg mb-5 text-slate-900">
Image Tools
</h3>

<div className="space-y-2">

<Link to="/tools/image-converter-ultra" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50">
<Image className="w-4 h-4"/>
<span className="text-sm font-medium">Image Converter Ultra</span>
</Link>

<Link to="/tools/svg-to-png" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50">
<Image className="w-4 h-4"/>
<span className="text-sm font-medium">SVG to PNG</span>
</Link>

<Link to="/tools/png-to-jpg" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50">
<Image className="w-4 h-4"/>
<span className="text-sm font-medium">PNG to JPG</span>
</Link>

<Link to="/tools/webp-to-png" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50">
<Image className="w-4 h-4"/>
<span className="text-sm font-medium">WEBP to PNG</span>
</Link>

<Link to="/tools/image-compressor" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50">
<FileImage className="w-4 h-4"/>
<span className="text-sm font-medium">Image Compressor</span>
</Link>

</div>

</div>

{/* PDF TOOLS */}

<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

<h3 className="font-bold text-lg mb-5 text-slate-900">
PDF Tools
</h3>

<div className="space-y-2">

<Link to="/tools/image-to-pdf" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50">
<File className="w-4 h-4"/>
<span className="text-sm font-medium">Image to PDF</span>
</Link>

<Link to="/tools/jpg-to-pdf" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50">
<File className="w-4 h-4"/>
<span className="text-sm font-medium">JPG to PDF</span>
</Link>

<Link to="/tools/merge-pdf" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50">
<File className="w-4 h-4"/>
<span className="text-sm font-medium">Merge PDF</span>
</Link>

<Link to="/tools/split-pdf" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50">
<Scissors className="w-4 h-4"/>
<span className="text-sm font-medium">Split PDF</span>
</Link>

<Link to="/tools/pdf-to-image" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50">
<FileImage className="w-4 h-4"/>
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

{/* FOOTER */}

<footer className="bg-white border-t border-slate-200 py-12 mt-8">

<div className="container mx-auto px-4 text-center text-slate-400 text-sm">

© {new Date().getFullYear()} AI Tools Platform

</div>

</footer>

</div>

);

}
