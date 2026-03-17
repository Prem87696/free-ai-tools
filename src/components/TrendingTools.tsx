import React,{useEffect,useState} from "react"
import { Link } from "react-router-dom"
import { getAllTools } from "../data/tools"
import { TrendingUp } from "lucide-react"

export function TrendingTools(){

const [trending,setTrending]=useState<any[]>([])

useEffect(()=>{

const allTools = getAllTools()

const stats = JSON.parse(localStorage.getItem("analytics") || "{}")

/* SORT BY USAGE */
const sorted = [...allTools].sort((a,b)=>{
return (stats[b.name] || 0) - (stats[a.name] || 0)
})

setTrending(sorted.slice(0,6))

},[])

if(trending.length === 0) return null

return(

<section className="mt-20">

<div className="flex items-center gap-2 mb-6">

<TrendingUp className="text-indigo-600"/>

<h2 className="text-2xl font-bold">
🔥 Trending Tools
</h2>

</div>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{trending.map(tool=>{

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
