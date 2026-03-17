import React,{useState,useEffect,useRef} from "react"
import {useParams,Navigate} from "react-router-dom"
import { Helmet } from "react-helmet-async"
import {tools} from "../data/tools"
import {generateContent} from "../services/aiRouter"
import {toolEngine} from "../engine/toolEngine"
import {SEOHead} from "../components/SEOHead"
import {AdPlaceholder} from "../components/AdPlaceholder"
import {RelatedTools} from "../components/RelatedTools"
import { ToolStats } from "../components/ToolStats"
import {Loader2,Copy,Check,Sparkles} from "lucide-react"

type Msg={role:"user"|"ai";text:string}

export function ToolPage(){

const {toolId}=useParams<{toolId:string}>()
const tool=tools.find(t=>t.id===toolId)
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

if(!tool) return <Navigate to="/404"/>

/* STRUCTURED DATA */
const StructuredData=()=>(
<Helmet>
<script type="application/ld+json">
{JSON.stringify({
"@context":"https://schema.org",
"@type":"SoftwareApplication",
name:tool.name,
description:tool.description,
applicationCategory:"AI Tool",
operatingSystem:"All",
offers:{
"@type":"Offer",
price:"0",
priceCurrency:"USD"
}
})}
</script>
</Helmet>
)

/* FILE TOOL */
if(ToolComponent){
return(
<>
<SEOHead
title={`${tool.name} – Free AI Tool`}
description={`Use ${tool.name} online for free.`}
canonicalUrl={`https://free-ai-tools-lac.vercel.app/tools/${tool.id}`}
/>

<StructuredData/>

<AdPlaceholder slot="top" className="mb-6"/>

<div className="max-w-6xl mx-auto">
<ToolComponent/>
</div>

<AdPlaceholder slot="bottom" className="mt-10"/>

</>
)
}

/* INPUT */
const change=(name:string,value:string)=>{
setFormData(prev=>({...prev,[name]:value}))
}

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
setResult("Something went wrong")
}
setLoading(false)
}

/* CHAT */
const chat=async(e:React.FormEvent)=>{
e.preventDefault()
const msg=formData["message"]||""
if(!msg.trim()) return

setMessages(p=>[...p,{role:"user",text:msg}])
setFormData({message:""})
setLoading(true)

try{
let history=""
messages.slice(-10).forEach(m=>{
history+=`${m.role==="user"?"User":"AI"}: ${m.text}\n`
})
history+=`User: ${msg}\nAI:`

const res=await generateContent(history)
setMessages(p=>[...p,{role:"ai",text:res}])
}catch{
setMessages(p=>[...p,{role:"ai",text:"Error"}])
}

setLoading(false)
}

/* COPY */
const copy=(text:string,index:number)=>{
navigator.clipboard?.writeText(text)
setCopied(index)
setTimeout(()=>setCopied(null),2000)
}

/* CTA BUTTON */
const CTA=()=>(
tool.link ? (
<div className="mt-4 text-center">
<a
href={tool.link}
target="_blank"
rel="nofollow sponsored"
className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700"
>
🚀 Try {tool.name}
</a>
</div>
):null
)

/* CHATBOT */
if(tool.id==="ai-chatbot"){

const Icon=tool.icon

return(
<>
<SEOHead title={tool.name} description={tool.description} canonicalUrl={`https://free-ai-tools-lac.vercel.app/tools/${tool.id}`}/>
<StructuredData/>
<AdPlaceholder slot="top"/>

<div className="max-w-6xl mx-auto">

<div className="text-center mb-10">
<Icon className="w-8 h-8 mx-auto mb-4"/>
<h1 className="text-4xl font-bold">{tool.name}</h1>
<p className="text-slate-500 mt-2">{tool.description}</p>
<ToolStats/>
<CTA/>
</div>

<div className="bg-white border rounded-2xl flex flex-col h-[540px] overflow-hidden">

<div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">

{messages.map((m,i)=>(
<div key={i} className={`max-w-[75%] px-4 py-3 rounded-xl ${
m.role==="user"?"ml-auto bg-indigo-600 text-white":"bg-white border"
}`}>
{m.text}
<button onClick={()=>copy(m.text,i)} className="text-xs mt-2">
{copied===i?<Check size={14}/>:<Copy size={14}/>}
</button>
</div>
))}

{loading && <Loader2 className="animate-spin"/>}

</div>

<form onSubmit={chat} className="p-4 flex gap-3">
<textarea
value={formData["message"]||""}
onChange={(e)=>change("message",e.target.value)}
className="flex-1 bg-slate-100 rounded-xl px-4 py-2"
/>
<button className="bg-indigo-600 text-white px-6 rounded-xl">
Send
</button>
</form>

</div>

<AdPlaceholder slot="content" className="mt-8"/>

{descriptionSection(tool.name)}
<RelatedTools currentId={tool.id} category={tool.category}/>

<AdPlaceholder slot="bottom" className="mt-10"/>

</div>
</>
)
}

/* GENERATOR */

const Icon=tool.icon

return(
<>
<SEOHead title={tool.name} description={tool.description} canonicalUrl={`https://free-ai-tools-lac.vercel.app/tools/${tool.id}`}/>
<StructuredData/>

<AdPlaceholder slot="top" className="mb-6"/>

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
onChange={(e)=>change(input.name,e.target.value)}
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

{/* 💰 CTA BELOW RESULT */}
<CTA/>

</div>
)}

</div>

<AdPlaceholder slot="content" className="mt-8"/>

{descriptionSection(tool.name)}
<RelatedTools currentId={tool.id} category={tool.category}/>

<AdPlaceholder slot="bottom" className="mt-10"/>

</div>
</>
)

}

/* DESCRIPTION */
function descriptionSection(name:string){
return(
<section className="mt-12 bg-white border rounded-2xl p-8 space-y-6">
<h2 className="text-2xl font-bold">About {name}</h2>
<p>{name} helps users complete tasks faster using modern AI tools.</p>
<ul className="list-disc pl-6">
<li>Enter input</li>
<li>Generate</li>
<li>Copy result</li>
</ul>
</section>
)
}
