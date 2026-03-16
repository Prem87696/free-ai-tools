import React,{useState,useEffect,useRef} from "react"
import {useParams,Navigate} from "react-router-dom"
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

/* RESET WHEN TOOL CHANGES */

useEffect(()=>{
setFormData({})
setMessages([])
setResult("")
},[toolId])

/* AUTO SCROLL CHAT */

useEffect(()=>{
if(chatRef.current){
chatRef.current.scrollTop=chatRef.current.scrollHeight
}
},[messages])

if(!tool) return <Navigate to="/404"/>

/* FILE TOOL */

if(ToolComponent){

return(

<>
<SEOHead
title={`${tool.name} – Free AI Tool`}
description={`Use ${tool.name} online for free. Fast AI powered tool for generating results instantly. No signup required.`}
canonicalUrl={`https://free-ai-tools-lac.vercel.app/tools/${tool.id}`}
keywords={`${tool.name}, free ai tool, ai tools online, ${tool.category} ai tool`}
/>

<div className="max-w-6xl mx-auto">
<ToolComponent/>
</div>

</>

)

}

/* INPUT CHANGE */

const change=(name:string,value:string)=>{
setFormData(prev=>({...prev,[name]:value}))
}

/* GENERATOR */

const submit=async(e:React.FormEvent)=>{

e.preventDefault()

setLoading(true)
setResult("")

try{

let prompt=tool.promptTemplate || ""

tool.inputs?.forEach(input=>{
const value=formData[input.name] || ""
prompt=prompt.replaceAll(`{{${input.name}}}`,value)
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

const msg=formData["message"] || ""

if(!msg.trim()) return

setMessages(prev=>[...prev,{role:"user",text:msg}])

setFormData({message:""})

setLoading(true)

try{

let history=""

messages.slice(-10).forEach(m=>{
history+=`${m.role==="user"?"User":"AI"}: ${m.text}\n`
})

history+=`User: ${msg}\nAI:`

const res=await generateContent(history)

setMessages(prev=>[...prev,{role:"ai",text:res}])

}catch{

setMessages(prev=>[...prev,{role:"ai",text:"Error generating response"}])

}

setLoading(false)

}

/* COPY */

const copy=(text:string,index:number)=>{

navigator.clipboard?.writeText(text)

setCopied(index)

setTimeout(()=>setCopied(null),2000)

}

/* CHATBOT */

if(tool.id==="ai-chatbot"){

const Icon=tool.icon

return(

<>
<SEOHead
title={`${tool.name} – Free AI Tool`}
description={tool.description}
canonicalUrl={`https://free-ai-tools-lac.vercel.app/tools/${tool.id}`}
/>

<div className="max-w-6xl mx-auto">

{/* HERO */}

<div className="text-center mb-10">

<div className="inline-flex p-4 rounded-xl bg-slate-100 text-indigo-600 mb-4 border border-slate-200">
<Icon className="w-8 h-8"/>
</div>

<h1 className="text-4xl font-bold text-slate-900">
{tool.name}
</h1>

<p className="text-slate-500 mt-2 text-lg">
Smart AI assistant to help you generate content instantly
</p>

<div className="flex flex-wrap justify-center gap-3 mt-4 text-sm">

<span className="bg-slate-100 px-3 py-1 rounded-full">⚡ Fast AI</span>
<span className="bg-slate-100 px-3 py-1 rounded-full">🔒 Secure</span>
<span className="bg-slate-100 px-3 py-1 rounded-full">💰 Free</span>

</div>

</div>

{/* CHAT */}

<div className="bg-white border border-slate-200 rounded-2xl shadow-lg flex flex-col h-[540px] overflow-hidden">

<div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">

{messages.map((m,i)=>(

<div
key={i}
className={`max-w-[75%] px-4 py-3 rounded-xl text-sm ${
m.role==="user"
?"ml-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
:"bg-white border border-slate-200"
}`}
>

{m.text}

<button
onClick={()=>copy(m.text,i)}
className="text-xs mt-2 flex gap-1 opacity-70 hover:opacity-100"
>

{copied===i?<Check size={14}/>:<Copy size={14}/>}

</button>

</div>

))}

{loading &&(

<div className="flex items-center gap-2 text-sm text-slate-500">

<Loader2 className="w-4 h-4 animate-spin"/>

AI is typing...

</div>

)}

</div>

<form onSubmit={chat} className="p-4 border-t flex gap-3 bg-white">

<textarea
rows={1}
value={formData["message"]||""}
onChange={(e)=>change("message",e.target.value)}
placeholder="Ask anything..."
className="flex-1 bg-slate-100 rounded-xl px-4 py-3 outline-none resize-none"
/>

<button className="bg-indigo-600 text-white px-6 rounded-xl">
Send
</button>

</form>

</div>

<AdPlaceholder slot="content" className="mt-8"/>

{descriptionSection(tool.name)}

<RelatedTools currentId={tool.id} category={tool.category}/>

</div>

</>

)

}

/* GENERATOR TOOL */

const Icon=tool.icon

return(

<>
<SEOHead
title={`${tool.name} – Free AI Tool`}
description={tool.description}
canonicalUrl={`https://free-ai-tools-lac.vercel.app/tools/${tool.id}`}
/>

<div className="max-w-6xl mx-auto">

<div className="text-center mb-10">

<div className="inline-flex p-4 bg-indigo-100 rounded-xl text-indigo-600 mb-4">
<Icon className="w-8 h-8"/>
</div>

<h1 className="text-3xl font-bold">{tool.name}</h1>

<p className="text-slate-600">{tool.description}</p>

</div>

<div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">

<form onSubmit={submit} className="space-y-6">

{tool.inputs?.map(input=>(

<div key={input.name}>

<label className="block text-sm mb-2">
{input.label}
</label>

<textarea
className="w-full border border-slate-200 rounded-lg px-4 py-3"
value={formData[input.name]||""}
onChange={(e)=>change(input.name,e.target.value)}
/>

</div>

))}

<button className="w-full bg-indigo-600 text-white py-3 rounded-lg flex justify-center gap-2">

{loading ?(
<>
<Loader2 className="w-5 h-5 animate-spin"/>
Generating...
</>
):(
<>
<Sparkles className="w-5 h-5"/>
Generate Content
</>
)}

</button>

</form>

{result &&(

<div className="mt-6 border bg-slate-50 p-6 rounded-xl">

<div className="flex justify-between mb-3">

<strong>Generated Result</strong>

<button onClick={()=>copy(result,0)}>
{copied===0?<Check size={16}/>:<Copy size={16}/>}
</button>

</div>

<div className="text-sm whitespace-pre-wrap">
{result}
</div>

</div>

)}

</div>

<AdPlaceholder slot="content" className="mt-8"/>

{descriptionSection(tool.name)}

<RelatedTools currentId={tool.id} category={tool.category}/>

</div>

</>

)

}

/* DESCRIPTION */

function descriptionSection(name:string){

return(

<section className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 space-y-6">

<h2 className="text-2xl font-bold">
About {name}
</h2>

<p className="text-slate-600">
{name} helps users complete tasks faster using modern web technology.
No installation required and works instantly inside the browser.
</p>

<h3 className="text-xl font-semibold">
How to Use
</h3>

<ul className="list-disc pl-6 text-slate-600 space-y-2">
<li>Enter your input</li>
<li>Click generate</li>
<li>Copy the result</li>
</ul>

</section>

)

}
