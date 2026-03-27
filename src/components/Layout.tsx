import React,{useState,KeyboardEvent,useMemo} from "react"
import {Link,Outlet,useNavigate} from "react-router-dom"
import {
Menu,X,Bot,Search
} from "lucide-react"

import {AdPlaceholder} from "./AdPlaceholder"
import PageTransition from "./PageTransition"
import { getAllTools } from "../data/tools"

/* 🔥 NEW */
import LoginModal from "../components/LoginModal"

export function Layout(){

const [isMenuOpen,setIsMenuOpen]=useState(false)
const [search,setSearch]=useState("")
const [showLogin,setShowLogin]=useState(false) // 🔥

const navigate=useNavigate()

const toggleMenu=()=>setIsMenuOpen(prev=>!prev)

/* ✅ DYNAMIC TOOLS */
const tools = useMemo(()=>getAllTools(),[])
const topTools = tools.slice(0,5)

const navLinks=[
{name:"Home",path:"/"},
{name:"Tools",path:"/tools"},
{name:"Blog",path:"/blog"},
{name:"Contact",path:"/contact"}
]

const toolItem="flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-indigo-200 hover:bg-indigo-50 transition"
const iconBox="p-2 rounded-lg bg-slate-100"

/* SEARCH */
const handleSearch=(e:KeyboardEvent<HTMLInputElement>)=>{
if(e.key==="Enter" && search.trim()){
navigate(`/search?q=${encodeURIComponent(search.trim())}`)
setIsMenuOpen(false)
}
}

return(

<div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">

{/* HEADER */}

<header className="bg-white border-b sticky top-0 z-50">

<div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

<Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
<Bot className="w-8 h-8"/>
<span>AI Tools Platform</span>
</Link>

{/* SEARCH */}

<div className="hidden md:flex items-center bg-slate-100 px-3 py-2 rounded-lg w-72">
<Search size={18} className="text-slate-400 mr-2"/>
<input
value={search}
onChange={(e)=>setSearch(e.target.value)}
onKeyDown={handleSearch}
placeholder="Search tools..."
className="bg-transparent outline-none text-sm w-full"
/>
</div>

{/* NAV */}

<nav className="hidden md:flex items-center gap-6">

{navLinks.map(link=>(

<Link key={link.name} to={link.path} className="text-slate-600 hover:text-indigo-600">
{link.name}
</Link>
))}

{/* 🔥 LOGIN BUTTON */}
<button
onClick={()=>setShowLogin(true)}
className="border px-4 py-2 rounded-lg hover:bg-slate-100"

>

Login </button>

<Link to="/tools" className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
Explore
</Link>

</nav>

<button onClick={toggleMenu} className="md:hidden p-2">
{isMenuOpen?<X/>:<Menu/>}
</button>

</div>

{/* MOBILE */}
{isMenuOpen &&(

<div className="md:hidden bg-white border-t p-4 space-y-4">

<div className="flex items-center bg-slate-100 px-3 py-2 rounded-lg">
<Search size={18} className="text-slate-400 mr-2"/>
<input
value={search}
onChange={(e)=>setSearch(e.target.value)}
onKeyDown={handleSearch}
placeholder="Search..."
className="bg-transparent outline-none w-full"
/>
</div>

<nav className="flex flex-col gap-3">

{navLinks.map(link=>(

<Link
key={link.name}
to={link.path}
onClick={()=>setIsMenuOpen(false)}
>
{link.name}
</Link>
))}

{/* 🔥 MOBILE LOGIN */}
<button
onClick={()=>setShowLogin(true)}
className="text-left"

>

Login </button>

</nav>

</div>

)}

</header>

{/* 🔥 LOGIN MODAL */}
{showLogin && (
<LoginModal onClose={()=>setShowLogin(false)} />
)}

{/* HEADER ADS */}

<div className="max-w-7xl mx-auto px-4">
<AdPlaceholder slot="header"/>
</div>

{/* MAIN */}

<main className="flex-grow max-w-7xl mx-auto px-4 py-8">

<div className="grid lg:grid-cols-12 gap-8">

{/* CONTENT */}

<div className="lg:col-span-9">
<PageTransition>
<Outlet/>
</PageTransition>
</div>

{/* SIDEBAR */}

<aside className="lg:col-span-3 space-y-6 sticky top-24">

<div className="bg-white p-6 rounded-2xl border">

<h3 className="font-bold mb-4">
🔥 Top Tools
</h3>

<div className="space-y-2">

{topTools.map(tool=>{

const Icon = tool.icon

return(

<Link key={tool.id} to={tool.path} className={toolItem}>

<div className={iconBox}>
<Icon size={16}/>
</div>

<span className="text-sm">{tool.name}</span>

</Link>

)

})}

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

{/* FOOTER */}

<footer className="bg-white border-t mt-16">

<div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-10 text-sm">

<div>
<h3 className="font-bold text-indigo-600 mb-2">
AI Tools Platform
</h3>
<p className="text-slate-500">
Free AI tools for creators & businesses.
</p>
</div>

<div>
<h4 className="font-semibold mb-2">Links</h4>
<ul className="space-y-2">
<li><Link to="/">Home</Link></li>
<li><Link to="/tools">Tools</Link></li>
<li><Link to="/blog">Blog</Link></li>
<li><Link to="/categories">Categories</Link></li>
</ul>
</div>

<div>
<h4 className="font-semibold mb-2">Top Tools</h4>
<ul className="space-y-2">
{topTools.slice(0,4).map(t=>(
<li key={t.id}>
<Link to={t.path}>{t.name}</Link>
</li>
))}
</ul>
</div>

<div>
<h4 className="font-semibold mb-2">Legal</h4>
<ul className="space-y-2">
<li><Link to="/privacy-policy">Privacy</Link></li>
<li><Link to="/terms-and-conditions">Terms</Link></li>
<li><Link to="/disclaimer">Disclaimer</Link></li>
</ul>
</div>

</div>

<div className="text-center py-6 text-xs text-slate-400 border-t">
© {new Date().getFullYear()} AI Tools Platform
</div>

</footer>

</div>

)
}
