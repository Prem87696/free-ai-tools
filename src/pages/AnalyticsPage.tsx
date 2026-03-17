import React,{useEffect,useState} from "react"
import { SEOHead } from "../components/SEOHead"

export function AnalyticsPage(){

const [data,setData]=useState<any>({})
const [total,setTotal]=useState(0)

useEffect(()=>{

try{

const stats = JSON.parse(localStorage.getItem("analytics") || "{}")

setData(stats)

/* TOTAL COUNT */
const sum = Object.values(stats).reduce((a:any,b:any)=>a+b,0)
setTotal(sum)

}catch{
setData({})
}

},[])

/* SORT */
const sorted = Object.entries(data).sort((a:any,b:any)=>b[1]-a[1])

return(

<div className="max-w-5xl mx-auto p-6">

<SEOHead
title="Analytics Dashboard"
description="Track tool usage and performance"
/>

<h1 className="text-3xl font-bold mb-6">
📊 Analytics Dashboard
</h1>

{/* TOTAL */}
<div className="mb-6 p-4 bg-indigo-50 rounded-xl">
<h2 className="font-bold text-lg">
Total Tool Usage: {total}
</h2>
</div>

{/* EMPTY */}
{sorted.length === 0 ? (

<p className="text-slate-500">
No data yet. Use tools to generate stats.
</p>

):( 

<>

{/* TOP TOOLS */}
<div className="mb-8">

<h2 className="text-xl font-bold mb-4">
🔥 Top Tools
</h2>

{sorted.slice(0,5).map(([name,count]:any,i)=>(
<div
key={i}
className="flex justify-between border p-3 rounded-lg mb-2"
>
<span>{name}</span>
<strong>{count}</strong>
</div>
))}

</div>

{/* ALL DATA */}
<div>

<h2 className="text-xl font-bold mb-4">
All Tools Data
</h2>

{sorted.map(([name,count]:any,i)=>(
<div
key={i}
className="flex justify-between border p-3 rounded-lg mb-2"
>
<span>{name}</span>
<span>{count}</span>
</div>
))}

</div>

</>

)}

</div>

)

}
