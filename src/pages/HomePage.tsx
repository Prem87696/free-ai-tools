import React,{useState} from "react"
import {Link} from "react-router-dom"
import {tools} from "../data/tools"
import {SEOHead} from "../components/SEOHead"
import {TrendingTools} from "../components/TrendingTools"
import {PopularTools} from "../components/PopularTools"
import {ArrowRight,Sparkles,TrendingUp,Zap,Shield} from "lucide-react"

export function HomePage(){

const categories=["All","Social","Business","Writing","General"]

const [activeCategory,setActiveCategory]=useState("All")

const filteredTools =
activeCategory==="All"
? tools
: tools.filter(t =>
t.category?.toLowerCase()===activeCategory.toLowerCase()
)

return(

<>

<SEOHead
title="Free AI Tools Platform - Generate Content Instantly"
description="Use free AI tools for writing, business, social media and productivity. No signup required."
/>

{/* HERO */}

<section className="text-center py-16 md:py-24">

<div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
<Sparkles className="w-4 h-4"/>
<span>AI Powered Productivity Tools</span>
</div>

<h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
Free AI Tools for <span className="text-indigo-600">Creators</span>
</h1>

<p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
Boost productivity using powerful AI tools for writing,
business automation, social media, and productivity.
</p>

<div className="flex flex-wrap justify-center gap-4">

<Link
to="/tools"
className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition"
>
Explore Tools
</Link>

<Link
to="/tools/ai-chatbot"
className="bg-white border border-slate-200 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition"
>
Try AI Chatbot
</Link>

</div>

{/* STATS */}

<div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-14">

<div className="bg-white border border-slate-200 rounded-xl p-4">
<p className="text-2xl font-bold text-indigo-600">{tools.length}+</p>
<p className="text-sm text-slate-500">AI Tools</p>
</div>

<div className="bg-white border border-slate-200 rounded-xl p-4">
<p className="text-2xl font-bold text-indigo-600">100%</p>
<p className="text-sm text-slate-500">Free</p>
</div>

<div className="bg-white border border-slate-200 rounded-xl p-4">
<p className="text-2xl font-bold text-indigo-600">Fast</p>
<p className="text-sm text-slate-500">Processing</p>
</div>

<div className="bg-white border border-slate-200 rounded-xl p-4">
<p className="text-2xl font-bold text-indigo-600">Secure</p>
<p className="text-sm text-slate-500">Private</p>
</div>

</div>

</section>

{/* TRENDING TOOLS */}

<TrendingTools/>

{/* POPULAR TOOLS */}

<PopularTools/>

{/* CATEGORY FILTER */}

<div className="flex flex-wrap justify-center gap-3 mb-12 mt-16">

{categories.map(cat=>(

<button
key={cat}
onClick={()=>setActiveCategory(cat)}
className={`px-6 py-2 rounded-full text-sm font-medium transition ${
activeCategory===cat
?"bg-indigo-600 text-white shadow-lg shadow-indigo-200"
:"bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
}`}

>

{cat} </button>

))}

</div>

{/* TOOLS GRID */}

{filteredTools.length===0 ? (

<div className="text-center py-20 text-slate-500">
No tools available
</div>

):(

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{filteredTools.map(tool=>{

const Icon=tool.icon

return(

<Link
key={tool.id}
to={tool.path}
className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300 flex flex-col h-full"
>

<div className="flex items-start justify-between mb-4">

<div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
<Icon className="w-6 h-6"/>
</div>

<span className="bg-slate-100 text-slate-500 text-xs font-semibold px-2 py-1 rounded uppercase tracking-wide">
{tool.category}
</span>

</div>

<h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
{tool.name}
</h3>

<p className="text-slate-500 text-sm mb-6 flex-grow">
{tool.description}
</p>

<div className="flex items-center text-indigo-600 font-medium text-sm mt-auto">
Try Tool <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"/>
</div>

</Link>

)

})}

</div>

)}

{/* WHY USE */}

<section className="mt-20 bg-white p-10 rounded-2xl border border-slate-100">

<h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
Why Use Our Free AI Tools
</h2>

<div className="grid md:grid-cols-3 gap-10">

<div className="text-center">

<Zap className="mx-auto mb-3 text-indigo-600"/>

<h3 className="font-bold text-lg mb-2">
Instant Results
</h3>

<p className="text-slate-600 text-sm">
Generate content and automate tasks in seconds using AI.
</p>

</div>

<div className="text-center">

<TrendingUp className="mx-auto mb-3 text-indigo-600"/>

<h3 className="font-bold text-lg mb-2">
Boost Productivity
</h3>

<p className="text-slate-600 text-sm">
Improve efficiency for business, marketing and writing tasks.
</p>

</div>

<div className="text-center">

<Shield className="mx-auto mb-3 text-indigo-600"/>

<h3 className="font-bold text-lg mb-2">
Secure & Private
</h3>

<p className="text-slate-600 text-sm">
Your inputs are processed securely and not stored permanently.
</p>

</div>

</div>

</section>

</>

)

}
