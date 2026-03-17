import React from "react"
import { Link } from "react-router-dom"
import { getAllTools } from "../data/tools"
import { SEOHead } from "../components/SEOHead"

export function ToolsPage(){

const tools = getAllTools()

return(

<div className="max-w-6xl mx-auto px-6 py-10">

<SEOHead
title="All AI Tools - Free AI Tools Platform"
description="Browse all AI tools including writing, business, image and productivity tools."
canonicalUrl="https://free-ai-tools-lac.vercel.app/tools"
/>

<h1 className="text-3xl font-bold mb-8">
All AI Tools
</h1>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{tools.map(tool=>{

const Icon = tool.icon

return(

<Link
key={tool.id}
to={tool.path}
className="bg-white border p-6 rounded-xl hover:shadow transition"
>

<div className="flex items-center gap-3 mb-3">

<div className="p-2 bg-slate-100 rounded-lg text-indigo-600">
<Icon size={18}/>
</div>

<h3 className="font-semibold">
{tool.name}
</h3>

</div>

<p className="text-sm text-slate-500">
{tool.description}
</p>

</Link>

)

})}

</div>

</div>

)
}
