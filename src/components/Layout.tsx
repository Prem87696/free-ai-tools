import React from 'react';
import { Link, Outlet } from 'react-router-dom';
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
} from 'lucide-react';

import { AdPlaceholder } from './AdPlaceholder';
import PageTransition from './PageTransition';

export function Layout() {

const [isMenuOpen, setIsMenuOpen] = React.useState(false);

const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

const navLinks = [
{ name: 'Home', path: '/' },
{ name: 'Tools', path: '/tools' },
{ name: 'About', path: '/about' },
{ name: 'Contact', path: '/contact' },
];

const tools = [

{ name: 'AI Chatbot', icon: Bot, path: '/tools/ai-chatbot' },
{ name: 'Caption Generator', icon: FileText, path: '/tools/ai-caption-generator' },
{ name: 'Resume Builder', icon: User, path: '/tools/ai-resume-builder' },
{ name: 'Email Writer', icon: Mail, path: '/tools/ai-email-writer' },
{ name: 'Blog Writer', icon: PenTool, path: '/tools/ai-blog-writer' },
{ name: 'Hashtag Generator', icon: Hash, path: '/tools/ai-hashtag-generator' },

{ name: 'SVG to PNG', icon: Image, path: '/tools/svg-to-png' },
{ name: 'PNG to JPG', icon: Image, path: '/tools/png-to-jpg' },
{ name: 'WEBP to PNG', icon: Image, path: '/tools/webp-to-png' },
{ name: 'Image Compressor', icon: FileImage, path: '/tools/image-compressor' },

{ name: 'Image to PDF', icon: File, path: '/tools/image-to-pdf' },
{ name: 'JPG to PDF', icon: File, path: '/tools/jpg-to-pdf' },
{ name: 'Merge PDF', icon: File, path: '/tools/merge-pdf' },
{ name: 'Split PDF', icon: Scissors, path: '/tools/split-pdf' },
{ name: 'PDF to Image', icon: FileImage, path: '/tools/pdf-to-image' }

];

return (

<div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">

{/* Header */}

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

{/* Mobile Menu */}

<button

onClick={toggleMenu}

className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"

>

{isMenuOpen ? <X /> : <Menu />}

</button>

</div>

{/* Mobile Nav */}

{isMenuOpen && (

<div className="md:hidden bg-white border-t border-slate-200 p-4 absolute w-full shadow-lg">

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

{/* Header Ads */}

<div className="container mx-auto px-4">

<AdPlaceholder slot="header" />

</div>

{/* Main */}

<main className="flex-grow container mx-auto px-4 py-8">

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

{/* Content */}

<div className="lg:col-span-9">

<PageTransition>

<Outlet />

</PageTransition>

</div>

{/* Sidebar */}

<aside className="lg:col-span-3 space-y-8">

<div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">

<h3 className="font-bold text-lg mb-4">

Popular Tools

</h3>

<ul className="space-y-3">

{tools.map((tool) => (

<li key={tool.name}>

<Link

to={tool.path}

className="flex items-center gap-3 text-slate-600 hover:text-indigo-600"

>

<tool.icon className="w-4 h-4" />

<span className="text-sm">

{tool.name}

</span>

</Link>

</li>

))}

</ul>

</div>

<AdPlaceholder slot="sidebar" />

</aside>

</div>

</main>

{/* Footer Ads */}

<div className="container mx-auto px-4">

<AdPlaceholder slot="footer" />

</div>

{/* Footer */}

<footer className="bg-white border-t border-slate-200 py-12 mt-8">

<div className="container mx-auto px-4">

<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

{/* Brand */}
<div className="col-span-1 md:col-span-2">

<h3 className="text-xl font-bold text-indigo-600 mb-3">
AI Tools Platform
</h3>

<p className="text-slate-500 text-sm max-w-md">
Free AI Tools Platform provides powerful artificial intelligence tools
for creators, students, and professionals. Generate text, images and
content instantly.
</p>

</div>

{/* Tools */}
<div>

<h4 className="font-bold text-slate-900 mb-4">
Popular Tools
</h4>

<ul className="space-y-2 text-sm text-slate-500">

<li>
<a href="/tools/ai-chatbot" className="hover:text-indigo-600">
AI Chatbot
</a>
</li>

<li>
<a href="/tools/ai-caption-generator" className="hover:text-indigo-600">
Caption Generator
</a>
</li>

<li>
<a href="/tools/ai-blog-writer" className="hover:text-indigo-600">
Blog Writer
</a>
</li>

<li>
<a href="/tools/ai-hashtag-generator" className="hover:text-indigo-600">
Hashtag Generator
</a>
</li>

</ul>

</div>

{/* Legal */}
<div>

<h4 className="font-bold text-slate-900 mb-4">
Legal
</h4>

<ul className="space-y-2 text-sm text-slate-500">

<li>
<a href="/privacy-policy" className="hover:text-indigo-600">
Privacy Policy
</a>
</li>

<li>
<a href="/terms-and-conditions" className="hover:text-indigo-600">
Terms & Conditions
</a>
</li>

<li>
<a href="/disclaimer" className="hover:text-indigo-600">
Disclaimer
</a>
</li>

<li>
<a href="/contact" className="hover:text-indigo-600">
Contact
</a>
</li>

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
