 import React,{useEffect,useState} from "react"
import { SEOHead } from "../components/SEOHead"

export function AnalyticsPage(){

const [data,setData]=useState<any>({})

useEffect(()=>{

const stats = JSON.parse(localStorage.getItem("analytics") || "{}")
setData(stats)

},[])

return(

<div className="max-w-4xl mx-auto p-6">

<SEOHead
title="Analytics Dashboard"
description="Track tool usage and performance"
/>

<h1 className="text-3xl font-bold mb-6">
Analytics Dashboard
</h1>

{Object.keys(data).length === 0 ? (

<p className="text-slate-500">
No data yet. Use tools to generate stats.
</p>

):( 

<div className="space-y-4">

{Object.entries(data).map(([key,value]:any)=>(
<div
key={key}
className="border p-4 rounded-lg flex justify-between"
>
<span>{key}</span>
<strong>{value} uses</strong>
</div>
))}

</div>

)}

</div>

)

}
