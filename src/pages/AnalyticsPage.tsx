import React,{useEffect,useState} from "react"
import { SEOHead } from "../components/SEOHead"

type StatsRecord = Record<string, number>

export function AnalyticsPage(){

const [views,setViews]=useState<StatsRecord>({})
const [clicks,setClicks]=useState<StatsRecord>({})
const [totalViews,setTotalViews]=useState(0)
const [totalClicks,setTotalClicks]=useState(0)

useEffect(()=>{

try{

if(typeof window === "undefined") return

const viewStats:StatsRecord = JSON.parse(localStorage.getItem("analytics") || "{}")
const clickStats:StatsRecord = JSON.parse(localStorage.getItem("clicks") || "{}")

setViews(viewStats)
setClicks(clickStats)

/* TOTAL */
const viewSum = Object.values(viewStats).reduce((a,b)=>a+b,0)
const clickSum = Object.values(clickStats).reduce((a,b)=>a+b,0)

setTotalViews(viewSum)
setTotalClicks(clickSum)

}catch{
setViews({})
setClicks({})
}

},[])

/* SORT */
const sortedViews = Object.entries(views).sort((a,b)=>b[1]-a[1])
const sortedClicks = Object.entries(clicks).sort((a,b)=>b[1]-a[1])

/* CTR CALC */
const getCTR=(name:string)=>{
const v = views[name] || 0
const c = clicks[name] || 0
if(v===0) return "0%"
return ((c/v)*100).toFixed(1)+"%"
}

return(

<div className="max-w-5xl mx-auto p-6">

<SEOHead
title="Analytics Dashboard"
description="Track tool usage, clicks, CTR and performance"
/>

<h1 className="text-3xl font-bold mb-6">
📊 Analytics Dashboard
</h1>

{/* SUMMARY */}
<div className="grid md:grid-cols-3 gap-4 mb-8">

<div className="p-4 bg-indigo-50 rounded-xl">
<h2 className="font-bold text-lg">
👁️ Views: {totalViews}
</h2>
</div>

<div className="p-4 bg-green-50 rounded-xl">
<h2 className="font-bold text-lg">
💰 Clicks: {totalClicks}
</h2>
</div>

<div className="p-4 bg-yellow-50 rounded-xl">
<h2 className="font-bold text-lg">
📈 CTR: {totalViews ? ((totalClicks/totalViews)*100).toFixed(1) : 0}%
</h2>
</div>

</div>

{/* EMPTY */}
{sortedViews.length === 0 ? (

<p className="text-slate-500">
No data yet. Use tools to generate stats.
</p>

):( 

<>

{/* TOP VIEWED */}
<div className="mb-10">

<h2 className="text-xl font-bold mb-4">
🔥 Top Viewed Tools
</h2>

{sortedViews.slice(0,5).map(([name,count],i)=>(

<div
key={i}
className="flex justify-between border p-3 rounded-lg mb-2"
>
<span>{name}</span>
<strong>{count}</strong>
</div>

))}

</div>

{/* TOP CLICKS */}
<div className="mb-10">

<h2 className="text-xl font-bold mb-4">
💰 Top Clicked Tools
</h2>

{sortedClicks.length === 0 ? (

<p className="text-slate-500">
No clicks tracked yet
</p>

):( 

sortedClicks.slice(0,5).map(([name,count],i)=>(

<div
key={i}
className="flex justify-between border p-3 rounded-lg mb-2"
>
<span>{name}</span>
<strong>{count}</strong>
</div>

))

)}

</div>

{/* ALL DATA */}
<div>

<h2 className="text-xl font-bold mb-4">
📋 All Tools Performance
</h2>

{sortedViews.map(([name,count],i)=>(

<div
key={i}
className="flex justify-between border p-3 rounded-lg mb-2"
>
<span>{name}</span>

<div className="text-right">
<p>{count} views</p>
<p className="text-xs text-slate-500">
CTR: {getCTR(name)}
</p>
</div>

</div>

))}

</div>

</>

)}

</div>

)

}
