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
const [messages,setMessages]=useState<Msg[]>([])
const [result,setResult]=useState("")
const [loading,setLoading]=useState(false)
const [copied,setCopied]=useState<number|null>(null)

const chatRef=useRef<HTMLDivElement>(null)

/* RESET */
useEffect(()=>{
setFormData({})
setMessages([])
setResult("")
},[toolId])

/* SCROLL */
useEffect(()=>{
if(chatRef.current){
chatRef.current.scrollTop=chatRef.current.scrollHeight
}
},[messages])

/* ✅ ANALYTICS TRACKING */
useEffect(()=>{

if(!tool) return

try{
const stats = JSON.parse(localStorage.getItem("analytics") || "{}")
stats[tool.name] = (stats[tool.name] || 0) + 1
localStorage.setItem("analytics", JSON.stringify(stats))
}catch{}

},[tool])

if(!tool) return <Navigate to="/404"/>

/* CTA */
const CTA=()=>(
tool.link ? (
<div className="mt-4 text-center">
<a href={tool.link} target="_blank" rel="nofollow sponsored"
className="bg-indigo-600 text-white px-6 py-3 rounded-xl">
🚀 Try {tool.name}
</a>
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
setResult("Error")
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

<div className="text-center mb-10">
<Icon className="w-8 h-8 mx-auto mb-4"/>
<h1 className="text-3xl font-bold">{tool.name}</h1>
<p>{tool.description}</p>
<CTA/>
</div>

<div className="bg-white border rounded-2xl p-8">

<form onSubmit={submit} className="space-y-6">

{tool.inputs?.map(input=>(
<textarea
key={input.name}
className="w-full border rounded-lg px-4 py-3"
value={formData[input.name]||""}
onChange={(e)=>setFormData({...formData,[input.name]:e.target.value})}
/>
))}

<button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
{loading?"Generating...":"Generate"}
</button>

</form>

{result &&(
<div className="mt-6 border p-6 rounded-xl">
<div className="flex justify-between">
<strong>Result</strong>
<button onClick={()=>copy(result,0)}>
{copied===0?<Check size={16}/>:<Copy size={16}/>}
</button>
</div>

<div className="text-sm mt-2 whitespace-pre-wrap">{result}</div>

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
