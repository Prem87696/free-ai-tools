import React from "react"
import { Link } from "react-router-dom"
import { tools } from "../data/tools"
import { Star } from "lucide-react"

export function PopularTools(){

const popular = tools.slice(0,6)

return(

<section className="mt-20">

{/* HEADER */}

<div className="flex items-center gap-2 mb-8">

<Star className="text-indigo-600 w-5 h-5"/>

<h2 className="text-2xl font-bold text-slate-900">
Popular Tools
</h2>

</div>

{/* GRID */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{popular.map(tool=>{

const Icon = tool.icon

return(

<Link
key={tool.id}
to={tool.path}
className="group bg-white border border-slate-200 p-6 rounded-xl hover:shadow-lg hover:border-indigo-200 transition-all duration-300 flex flex-col"
>

{/* TOOL HEADER */}

<div className="flex items-center gap-3 mb-3">

<div className="p-2 bg-slate-100 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">

<Icon size={18}/>

</div>

<h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">

{tool.name}

</h3>

</div>

{/* DESCRIPTION */}

<p className="text-sm text-slate-500 flex-grow">

{tool.description}

</p>

</Link>

)

})}

</div>

</section>

)

}
