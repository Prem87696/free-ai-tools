import React,{useState} from "react"
import { SEOHead } from "../components/SEOHead"

export function AdminPage(){

const [name,setName]=useState("")
const [description,setDescription]=useState("")
const [id,setId]=useState("")

const saveTool=()=>{

const newTool={
id,
slug:id,
name,
description,
path:`/tools/${id}`,
category:"general",
promptTemplate:"",
inputs:[]
}

const existing=JSON.parse(localStorage.getItem("customTools")||"[]")

existing.push(newTool)

localStorage.setItem("customTools",JSON.stringify(existing))

alert("Tool Added Successfully")

setName("")
setDescription("")
setId("")
}

return(

<div className="max-w-xl mx-auto p-6">

<SEOHead
title="Admin Panel"
description="Add new AI tools"
/>

<h1 className="text-2xl font-bold mb-6">
Admin Panel
</h1>

<div className="space-y-4">

<input
placeholder="Tool ID (unique)"
value={id}
onChange={e=>setId(e.target.value)}
className="w-full border px-4 py-2 rounded"
/>

<input
placeholder="Tool Name"
value={name}
onChange={e=>setName(e.target.value)}
className="w-full border px-4 py-2 rounded"
/>

<textarea
placeholder="Description"
value={description}
onChange={e=>setDescription(e.target.value)}
className="w-full border px-4 py-2 rounded"
/>

<button
onClick={saveTool}
className="bg-indigo-600 text-white px-6 py-2 rounded"
>
Add Tool
</button>

</div>

</div>

)

}
