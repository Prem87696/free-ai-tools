import React from "react"
import { Link } from "react-router-dom"
import { tools } from "../data/tools"
import { Star } from "lucide-react"

export function PopularTools(){

const popular = tools.slice(0,6)

return(

<section className="mt-20">

<div className="flex items-center gap-2 mb-6">

<Star className="text-indigo-600"/>

<h2 className="text-2xl font-bold">
Popular Tools
</h2>

</div>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{popular.map(tool=>{

const Icon = tool.icon

return(

<Link
key={tool.id}
to={tool.path}
className="bg-white border border-slate-200 p-6 rounded-xl hover:shadow-md hover:border-indigo-200 transition"
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

</section>

)

}
