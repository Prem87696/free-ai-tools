 import React from "react"
import { tools } from "../data/tools"
import { Link } from "react-router-dom"
import { Bot, Image, FileText, Sparkles } from "lucide-react"

export function ToolCategoriesPage(){

const categories=[...new Set(tools.map(t=>t.category))]

const iconMap:any={
general:Sparkles,
social:Bot,
business:FileText,
writing:FileText,
image:Image
}

return(

<div className="max-w-6xl mx-auto px-6 py-10">

{/* HEADER */}

<div className="text-center mb-12">

<h1 className="text-4xl font-bold text-slate-900">
Tool Categories
</h1>

<p className="text-slate-500 mt-2">
Browse AI tools, image tools and productivity utilities by category
</p>

</div>

{/* CATEGORY GRID */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

{categories.map(cat=>{

const Icon=iconMap[cat] || Sparkles

const count=tools.filter(t=>t.category===cat).length

return(

<Link
key={cat}
to={`/category/${cat}`}
className="bg-white border border-slate-200 p-8 rounded-2xl hover:shadow-md hover:border-indigo-200 transition flex flex-col items-center text-center"
>

<div className="p-4 rounded-xl bg-slate-100 text-indigo-600 mb-4">
<Icon size={26}/>
</div>

<h3 className="font-semibold text-lg capitalize">
{cat}
</h3>

<p className="text-sm text-slate-500 mt-1">
{count} tools available
</p>

</Link>

)

})}

</div>

</div>

)

}
