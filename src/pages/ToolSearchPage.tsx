import React,{useState} from "react"
import {searchTools} from "../engine/toolSearch"
import {Link} from "react-router-dom"
import {Search} from "lucide-react"
import {SEOHead} from "../components/SEOHead"

export function ToolSearchPage(){

const [query,setQuery]=useState("")

const results=query ? searchTools(query) : []

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

{/* SEARCH BOX */}

<div className="relative mb-6">

<Search
className="absolute left-4 top-3.5 text-slate-400"
size={18}
/>

<input
type="text"
placeholder="Search AI tools, PDF tools, image tools..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
className="w-full border border-slate-200 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

</div>

{/* SEARCH SUGGESTIONS */}

{!query &&(

<div className="flex flex-wrap gap-2 justify-center mb-8">

{suggestions.map((s,i)=>(

<button
key={i}
onClick={()=>setQuery(s)}
className="px-4 py-2 text-sm bg-slate-100 rounded-full hover:bg-slate-200 transition"

>

{s}

</button>

))}

</div>

)}

{/* EMPTY STATE */}

{query && results.length===0 &&(

<div className="text-center text-slate-500 py-12">

<p className="text-lg">
No tools found
</p>

<p className="text-sm mt-2">
Try searching: AI Chatbot, Blog Writer, PNG to JPG
</p>

</div>

)}

{/* RESULTS */}

<div className="grid md:grid-cols-2 gap-5">

{results.map(tool=>{

const Icon=tool.icon

return(

<Link
key={tool.id}
to={tool.path}
className="flex items-start gap-4 border border-slate-200 p-5 rounded-xl hover:shadow-md hover:border-indigo-200 transition"
>

<div className="p-3 bg-slate-100 rounded-lg text-indigo-600">
<Icon size={20}/>
</div>

<div>

<h3 className="font-semibold text-slate-900">
{tool.name}
</h3>

<p className="text-sm text-slate-500 mt-1">
{tool.description}
</p>

</div>

</Link>

)

})}

</div>

</div>

</>

)

}
