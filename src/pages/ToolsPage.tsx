import React,{useState,useMemo} from "react"
import { Link } from "react-router-dom"
import { getAllTools, ToolConfig } from "../data/tools"
import { SEOHead } from "../components/SEOHead"
import { Sparkles } from "lucide-react"

export function ToolsPage(){

const allTools:ToolConfig[] = getAllTools()

/* CATEGORY FILTER */
const categories = ["All","Social","Business","Writing","General"]

const [active,setActive] = useState("All")

const filtered = useMemo(()=>{

if(active==="All") return allTools

return allTools.filter(t =>
t.category?.toLowerCase() === active.toLowerCase()
)

},[active,allTools])

return(

<>

<SEOHead
title="All AI Tools - Free AI Tools Platform"
description="Browse all AI tools including writing, business, image and productivity tools."
canonicalUrl="https://free-ai-tools-lac.vercel.app/tools"
/>

<div className="max-w-6xl mx-auto px-6 py-10">

{/* HEADER */}
<div className="text-center mb-10">

<h1 className="text-4xl font-bold mb-3">
All AI Tools
</h1>

<p className="text-slate-500">
Explore powerful AI tools to boost your productivity
</p>

</div>

{/* FILTER */}
<div className="flex flex-wrap justify-center gap-3 mb-10">

{categories.map(cat=>(

<button
key={cat}
onClick={()=>setActive(cat)}
className={`px-5 py-2 rounded-full text-sm ${
active===cat
?"bg-indigo-600 text-white"
:"bg-white border text-slate-600"
}`}
>
{cat}
</button>

))}

</div>

{/* GRID */}
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{filtered.map(tool=>{

const Icon = tool.icon

return(

<div
key={tool.id}
className="group bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-lg transition flex flex-col"
>

{/* TOP */}
<div className="flex items-center gap-3 mb-3">

<div className="p-2 bg-slate-100 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
<Icon size={20}/>
</div>

<h3 className="font-semibold text-slate-900 group-hover:text-indigo-600">
{tool.name}
</h3>

</div>

<p className="text-sm text-slate-500 mb-5 flex-grow">
{tool.description}
</p>

{/* CTA BUTTON (IMPORTANT 💰) */}
<Link
to={tool.path}
className="mt-auto bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700 transition"
>
Use Tool →
</Link>

</div>

)

})}

</div>

{/* EMPTY */}
{filtered.length===0 &&(
<div className="text-center py-16 text-slate-500">
No tools found
</div>
)}

{/* CTA SECTION (BIG MONEY 💰) */}
<div className="mt-16 text-center bg-indigo-50 p-8 rounded-2xl border">

<h2 className="text-2xl font-bold mb-3">
⚡ Boost Your Productivity with AI
</h2>

<p className="text-slate-600 mb-6">
Use smart AI tools to automate your work and save time
</p>

<Link
to="/tools/ai-chatbot"
className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700"
>
Try AI Chatbot →
</Link>

</div>

</div>

</>

)

}
