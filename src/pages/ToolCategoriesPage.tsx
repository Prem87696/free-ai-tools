 import React from "react"
import {tools} from "../data/tools"
import {Link} from "react-router-dom"
import {Bot,Image,FileText,Sparkles} from "lucide-react"

export function ToolCategoriesPage(){

const categories=[...new Set(tools.map(t=>t.category))].sort()

const iconMap:Record<string,any>={
general:Sparkles,
social:Bot,
business:FileText,
writing:FileText,
image:Image
}

return(

<div className="max-w-6xl mx-auto px-6 py-12">

{/* HEADER */}

<div className="text-center mb-14">

<h1 className="text-4xl md:text-5xl font-bold text-slate-900">
Tool Categories
</h1>

<p className="text-slate-500 mt-3 text-lg">
Browse AI tools, image utilities and productivity tools by category
</p>

</div>

{/* GRID */}

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

{categories.map(cat=>{

const Icon=iconMap[cat] || Sparkles

const count=tools.filter(t=>t.category===cat).length

return(

<Link
key={cat}
to={`/category/${cat}`}
className="group bg-white border border-slate-200 p-8 rounded-2xl hover:shadow-lg hover:border-indigo-200 transition flex flex-col items-center text-center"
>

<div className="p-4 rounded-xl bg-indigo-50 text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition">

<Icon size={28}/>

</div>

<h3 className="font-semibold text-lg capitalize text-slate-900 group-hover:text-indigo-600 transition">
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
