import React,{useState} from "react"
import {Link,Outlet,useNavigate} from "react-router-dom"
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
Scissors,
Search
} from "lucide-react"

import {AdPlaceholder} from "./AdPlaceholder"
import PageTransition from "./PageTransition"

export function Layout(){

const [isMenuOpen,setIsMenuOpen]=useState(false)
const [search,setSearch]=useState("")

const navigate=useNavigate()

const toggleMenu=()=>setIsMenuOpen(!isMenuOpen)

const navLinks=[
{name:"Home",path:"/"},
{name:"Tools",path:"/tools"},
{name:"About",path:"/about"},
{name:"Contact",path:"/contact"}
]

const toolItem=
"flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-indigo-200 hover:bg-indigo-50 transition"

const iconBox=
"p-2 rounded-lg bg-slate-100"

/* SEARCH */

const handleSearch=(e:any)=>{
if(e.key==="Enter" && search.trim()){
navigate(`/search?q=${search}`)
}
}

return(

<div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">

{/* HEADER */}

<header className="bg-white border-b border-slate-100 sticky top-0 z-50">

<div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

<Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">

<Bot className="w-8 h-8"/>
<span>AI Tools Platform</span>

</Link>

{/* SEARCH */}

<div className="hidden md:flex items-center bg-slate-100 px-3 py-2 rounded-lg w-72">

<Search size={18} className="text-slate-400 mr-2"/>

<input
type="text"
value={search}
onChange={(e)=>setSearch(e.target.value)}
onKeyDown={handleSearch}
placeholder="Search tools..."
className="bg-transparent outline-none text-sm w-full"
/>

</div>

{/* Desktop Nav */}

<nav className="hidden md:flex items-center gap-6">

{navLinks.map(link=>(

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
className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
>

Get Started

</Link>

</nav>

<button
onClick={toggleMenu}
className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
>

{isMenuOpen?<X/>:<Menu/>}

</button>

</div>

{/* MOBILE MENU */}

{isMenuOpen&&(

<div className="md:hidden bg-white border-t border-slate-200 p-4 space-y-4">

{/* MOBILE SEARCH */}

<div className="flex items-center bg-slate-100 px-3 py-2 rounded-lg">

<Search size={18} className="text-slate-400 mr-2"/>

<input
type="text"
value={search}
onChange={(e)=>setSearch(e.target.value)}
onKeyDown={handleSearch}
placeholder="Search tools..."
className="bg-transparent outline-none text-sm w-full"
/>

</div>

<nav className="flex flex-col gap-4">

{navLinks.map(link=>(

<Link
key={link.name}
to={link.path}
className="text-slate-600 hover:text-indigo-600 font-medium py-2"
onClick={()=>setIsMenuOpen(false)}
>

{link.name}

</Link>

))}

</nav>

</div>

)}

</header>

{/* HEADER ADS */}

<div className="max-w-7xl mx-auto px-4">
<AdPlaceholder slot="header"/>
</div>

{/* MAIN */}

<main className="flex-grow max-w-7xl mx-auto px-4 py-8">

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

{/* CONTENT */}

<div className="lg:col-span-9">

<PageTransition>
<Outlet/>
</PageTransition>

</div>

{/* SIDEBAR */}

<aside className="lg:col-span-3 space-y-8 sticky top-24 h-fit">

{/* AI TOOLS */}

<div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md">

<h3 className="font-bold text-lg mb-5">
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

<div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md">

<h3 className="font-bold text-lg mb-5">
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

<div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md">

<h3 className="font-bold text-lg mb-5">
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

<div className="max-w-7xl mx-auto px-4">
<AdPlaceholder slot="footer"/>
</div>

<footer className="bg-white border-t border-slate-100 mt-16">

<div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">

{/* BRAND */}

<div>
<h3 className="font-bold text-lg text-indigo-600 mb-3">
AI Tools Platform
</h3>

<p className="text-slate-500">
Free AI tools for content creation, business, and productivity.
No signup required.
</p>
</div>

{/* QUICK LINKS */}

<div>
<h4 className="font-semibold mb-3 text-slate-800">
Quick Links
</h4>

<ul className="space-y-2 text-slate-500">

<li><Link to="/">Home</Link></li>
<li><Link to="/tools">All Tools</Link></li>
<li><Link to="/blog">Blog</Link></li>
<li><Link to="/categories">Categories</Link></li>

</ul>
</div>

{/* TOP TOOLS */}

<div>
<h4 className="font-semibold mb-3 text-slate-800">
Top Tools
</h4>

<ul className="space-y-2 text-slate-500">

<li><Link to="/tools/ai-chatbot">AI Chatbot</Link></li>
<li><Link to="/tools/ai-caption-generator">Caption Generator</Link></li>
<li><Link to="/tools/ai-email-writer">Email Writer</Link></li>
<li><Link to="/tools/image-compressor">Image Compressor</Link></li>

</ul>
</div>

{/* LEGAL */}

<div>
<h4 className="font-semibold mb-3 text-slate-800">
Legal
</h4>

<ul className="space-y-2 text-slate-500">

<li><Link to="/privacy-policy">Privacy Policy</Link></li>
<li><Link to="/terms-and-conditions">Terms</Link></li>
<li><Link to="/disclaimer">Disclaimer</Link></li>
<li><Link to="/contact">Contact</Link></li>

</ul>
</div>

</div>

{/* BOTTOM */}

<div className="border-t border-slate-100 text-center py-6 text-xs text-slate-400">

© {new Date().getFullYear()} AI Tools Platform • All rights reserved

</div>

</footer>
</div>

)

}
