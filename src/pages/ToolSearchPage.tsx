import React,{useState} from "react"
import {Link} from "react-router-dom"
import {Search} from "lucide-react"
import {SEOHead} from "../components/SEOHead"
import { getAllTools } from "../data/tools"

export function ToolSearchPage(){

const [query,setQuery]=useState("")

const allTools = getAllTools()

const results = query
? allTools.filter(tool =>
    tool.name.toLowerCase().includes(query.toLowerCase()) ||
    tool.description.toLowerCase().includes(query.toLowerCase())
  )
: []

const suggestions=[
"AI Chatbot",
"Blog Writer",
"Caption Generator",
"PNG to JPG",
"Image Compressor"
]

return(

<>

<SEOHead
title="Search AI Tools"
description="Search AI tools, image tools and PDF tools instantly."
/>

<div className="max-w-5xl mx-auto px-6 py-10">

{/* HEADER */}
<div className="text-center mb-10">
<h1 className="text-4xl font-bold text-slate-900">
Search Tools
</h1>

<p className="text-slate-500 mt-2">
Find AI tools, image tools and PDF tools instantly
</p>
</div>

{/* SEARCH */}
<div className="relative mb-6">

<Search className="absolute left-4 top-3.5 text-slate-400" size={18}/>

<input
type="text"
placeholder="Search AI tools..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
className="w-full border border-slate-200 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

</div>

{/* SUGGESTIONS */}
{!query &&(
<div className="flex flex-wrap gap-2 justify-center mb-8">
{suggestions.map((s,i)=>(
<button
key={i}
onClick={()=>setQuery(s)}
className="px-4 py-2 text-sm bg-slate-100 rounded-full"
>
{s}
</button>
))}
</div>
)}

{/* EMPTY */}
{query && results.length===0 &&(
<div className="text-center text-slate-500 py-12">
<p>No tools found</p>
</div>
)}

{/* RESULTS */}
<div className="grid md:grid-cols-2 gap-5">

{results.map(tool=>{

const Icon = tool.icon

return(

<Link
key={tool.id}
to={tool.path}
className="flex gap-4 border p-5 rounded-xl hover:shadow"
>

<div className="p-3 bg-slate-100 rounded-lg text-indigo-600">
<Icon size={20}/>
</div>

<div>
<h3 className="font-semibold">{tool.name}</h3>
<p className="text-sm text-slate-500">{tool.description}</p>
</div>

</Link>

)

})}

</div>

</div>

</>

)

}
