 import React,{useState,useMemo} from "react"
import {Link} from "react-router-dom"
import { getAllTools, ToolConfig } from "../data/tools"
import {SEOHead} from "../components/SEOHead"
import {ArrowRight,Sparkles,TrendingUp,Zap,Shield} from "lucide-react"

export function HomePage(){

/* LOAD TOOLS */
const allTools:ToolConfig[] = useMemo(()=>getAllTools(),[])

/* CATEGORY */
const categories = ["All","Social","Business","Writing","General"]

const [activeCategory,setActiveCategory]=useState<string>("All")

/* FILTER */
const filteredTools = useMemo(()=>{
if(activeCategory==="All") return allTools
return allTools.filter(t =>
t.category?.toLowerCase()===activeCategory.toLowerCase()
)
},[activeCategory,allTools])

/* 🔥 TRENDING + POPULAR (FIXED) */
const trendingTools = useMemo(()=>allTools.filter(t=>t.trending),[allTools])
const popularTools = useMemo(()=>allTools.filter(t=>t.featured),[allTools])

return(

<>

<SEOHead
title="Free AI Tools Platform - Generate Content Instantly"
description="Use free AI tools for writing, business, social media and productivity. No signup required."
/>

{/* HERO */}
<section className="text-center py-16 md:py-24">

<div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm mb-6">
<Sparkles className="w-4 h-4"/>
<span>AI Powered Productivity Tools</span>
</div>

<h1 className="text-4xl md:text-6xl font-extrabold mb-6">
Free AI Tools for <span className="text-indigo-600">Creators</span>
</h1>

<p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
Boost productivity using powerful AI tools for writing,
business automation, social media, and productivity.
</p>

<div className="flex flex-wrap justify-center gap-4">

<Link
to="/tools"
className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
>
Explore Tools
</Link>

<Link
to="/tools/ai-chatbot"
className="bg-white border px-6 py-3 rounded-xl hover:bg-slate-50 transition"
>
Try AI Chatbot
</Link>

</div>

{/* STATS */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-14">

<div className="bg-white border p-4 rounded-xl">
<p className="text-2xl font-bold text-indigo-600">{allTools.length}+</p>
<p className="text-sm text-slate-500">AI Tools</p>
</div>

<div className="bg-white border p-4 rounded-xl">
<p className="text-2xl font-bold text-indigo-600">100%</p>
<p className="text-sm text-slate-500">Free</p>
</div>

<div className="bg-white border p-4 rounded-xl">
<p className="text-2xl font-bold text-indigo-600">Fast</p>
<p className="text-sm text-slate-500">Processing</p>
</div>

<div className="bg-white border p-4 rounded-xl">
<p className="text-2xl font-bold text-indigo-600">Secure</p>
<p className="text-sm text-slate-500">Private</p>
</div>

</div>

</section>

{/* 🔥 TRENDING */}
{trendingTools.length > 0 && (
<section className="mt-16">
<h2 className="text-2xl font-bold mb-6">🔥 Trending Tools</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{trendingTools.map(tool=>{
const Icon = tool.icon
return(
<Link key={tool.id} to={tool.path} className="bg-white p-6 rounded-xl border hover:shadow">
<Icon className="mb-3"/>
<h3 className="font-semibold">{tool.name}</h3>
<p className="text-sm text-slate-500">{tool.description}</p>
</Link>
)
})}

</div>
</section>
)}

{/* ⭐ POPULAR */}
{popularTools.length > 0 && (
<section className="mt-16">
<h2 className="text-2xl font-bold mb-6">⭐ Popular Tools</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{popularTools.map(tool=>{
const Icon = tool.icon
return(
<Link key={tool.id} to={tool.path} className="bg-white p-6 rounded-xl border hover:shadow">
<Icon className="mb-3"/>
<h3 className="font-semibold">{tool.name}</h3>
<p className="text-sm text-slate-500">{tool.description}</p>
</Link>
)
})}

</div>
</section>
)}

{/* CATEGORY FILTER */}
<div className="flex flex-wrap justify-center gap-3 mt-16 mb-10">

{categories.map(cat=>(

<button
key={cat}
onClick={()=>setActiveCategory(cat)}
className={`px-6 py-2 rounded-full text-sm transition ${
activeCategory===cat
?"bg-indigo-600 text-white"
:"bg-white border text-slate-600 hover:bg-slate-50"
}`}
>
{cat}
</button>

))}

</div>

{/* GRID */}
{filteredTools.length===0 ? (

<div className="text-center py-20 text-slate-500">
No tools available
</div>

):( 

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{filteredTools.map(tool=>{

const Icon = tool.icon

return(

<Link
key={tool.id}
to={tool.path}
className="group bg-white p-6 rounded-2xl border hover:shadow-lg hover:border-indigo-200 transition"
>

<div className="flex justify-between mb-4">

<div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition">
<Icon className="w-6 h-6"/>
</div>

<span className="text-xs bg-slate-100 px-2 py-1 rounded uppercase">
{tool.category}
</span>

</div>

<h3 className="text-lg font-bold mb-2 group-hover:text-indigo-600">
{tool.name}
</h3>

<p className="text-sm text-slate-500 mb-4 line-clamp-2">
{tool.description}
</p>

<div className="text-indigo-600 text-sm flex items-center">
Try Tool <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition"/>
</div>

</Link>

)

})}

</div>

)}

{/* WHY */}
<section className="mt-20 bg-white p-10 rounded-2xl border">

<h2 className="text-3xl font-bold text-center mb-8">
Why Use Our Free AI Tools
</h2>

<div className="grid md:grid-cols-3 gap-10">

<div className="text-center">
<Zap className="mx-auto mb-3 text-indigo-600"/>
<h3 className="font-bold">Instant Results</h3>
<p className="text-sm text-slate-600">
Generate content instantly
</p>
</div>

<div className="text-center">
<TrendingUp className="mx-auto mb-3 text-indigo-600"/>
<h3 className="font-bold">Boost Productivity</h3>
<p className="text-sm text-slate-600">
Improve efficiency using AI
</p>
</div>

<div className="text-center">
<Shield className="mx-auto mb-3 text-indigo-600"/>
<h3 className="font-bold">Secure</h3>
<p className="text-sm text-slate-600">
Your data stays private
</p>
</div>

</div>

</section>

</>

)

}
