import React,{useState,useEffect,useRef} from "react"
import {useParams,Navigate} from "react-router-dom"
import { getAllTools } from "../data/tools"
import {generateContent} from "../services/aiRouter"
import {toolEngine} from "../engine/toolEngine"
import {SEOHead} from "../components/SEOHead"
import {AdPlaceholder} from "../components/AdPlaceholder"
import {RelatedTools} from "../components/RelatedTools"
import {Loader2,Copy,Check} from "lucide-react"

type Msg={role:"user"|"ai";text:string}

export function ToolPage(){

const {toolId}=useParams<{toolId:string}>()

const tool = getAllTools().find(t=>t.id===toolId)

const ToolComponent=toolId ? toolEngine[toolId] : null

const [formData,setFormData]=useState<Record<string,string>>({})
const [result,setResult]=useState("")
const [loading,setLoading]=useState(false)
const [copied,setCopied]=useState<number|null>(null)

const chatRef=useRef<HTMLDivElement>(null)

/* RESET */
useEffect(()=>{
setFormData({})
setResult("")
},[toolId])

/* ANALYTICS */
useEffect(()=>{
if(!tool) return
try{
const stats = JSON.parse(localStorage.getItem("analytics") || "{}")
stats[tool.name] = (stats[tool.name] || 0) + 1
localStorage.setItem("analytics", JSON.stringify(stats))
}catch{}
},[tool])

if(!tool) return <Navigate to="/404"/>

/* 💰 HIGH-CONVERSION CTA */
const CTA=()=>(
tool.link ? (
<div className="mt-6 p-5 bg-indigo-50 border rounded-xl text-center">

<p className="text-sm text-slate-600 mb-2">
⚡ Want better & faster results?
</p>

<a
href={tool.link}
target="_blank"
rel="nofollow sponsored"
className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
>
🚀 Try Premium AI Tool
</a>

<p className="text-xs text-slate-400 mt-2">
Recommended for best results
</p>

</div>
):null
)

/* GENERATE */
const submit=async(e:React.FormEvent)=>{
e.preventDefault()
setLoading(true)
setResult("")

try{
let prompt=tool.promptTemplate || ""
tool.inputs?.forEach(input=>{
prompt=prompt.replaceAll(`{{${input.name}}}`,formData[input.name]||"")
})

const res=await generateContent(prompt)
setResult(res)

}catch{
setResult("Error generating result")
}

setLoading(false)
}

/* COPY */
const copy=(text:string,index:number)=>{
navigator.clipboard?.writeText(text)
setCopied(index)
setTimeout(()=>setCopied(null),2000)
}

const Icon=tool.icon

return(
<>
<SEOHead title={tool.name} description={tool.description}/>

<AdPlaceholder slot="top"/>

<div className="max-w-6xl mx-auto">

{/* HEADER */}
<div className="text-center mb-10">
<Icon className="w-8 h-8 mx-auto mb-4"/>
<h1 className="text-3xl font-bold">{tool.name}</h1>
<p className="text-slate-600">{tool.description}</p>

{/* CTA TOP */}
<CTA/>

</div>

{/* TOOL */}
<div className="bg-white border rounded-2xl p-8">

<form onSubmit={submit} className="space-y-6">

{tool.inputs?.map(input=>(
<textarea
key={input.name}
placeholder={input.label}
className="w-full border rounded-lg px-4 py-3"
value={formData[input.name]||""}
onChange={(e)=>setFormData({...formData,[input.name]:e.target.value})}
/>
))}

<button className="w-full bg-indigo-600 text-white py-3 rounded-lg flex justify-center items-center gap-2">

{loading ? (
<>
<Loader2 className="animate-spin w-5 h-5"/>
Generating...
</>
) : "Generate"}

</button>

</form>

{/* RESULT */}
{result &&(
<div className="mt-6 border p-6 rounded-xl">

<div className="flex justify-between mb-2">
<strong>Result</strong>

<button onClick={()=>copy(result,0)}>
{copied===0?<Check size={16}/>:<Copy size={16}/>}
</button>

</div>

<div className="text-sm whitespace-pre-wrap">
{result}
</div>

{/* 💰 CTA AFTER RESULT (BEST POSITION) */}
<CTA/>

</div>
)}

</div>

<AdPlaceholder slot="content"/>

<RelatedTools currentId={tool.id} category={tool.category}/>

<AdPlaceholder slot="bottom"/>

</div>
</>
)

}
