import React,{useState} from "react"
import { useParams, Navigate, Link } from "react-router-dom"
import { getAllTools, seoModifiers } from "../data/tools"
import { generateContent } from "../services/aiRouter"
import { SEOHead } from "../components/SEOHead"
import { AdPlaceholder } from "../components/AdPlaceholder"
import { Loader2, Copy, Check, AlertCircle, Sparkles } from "lucide-react"

export function DynamicSEOPage(){

const { slug } = useParams<{slug:string}>()

const tools = getAllTools()

let matchedTool:any = null
let matchedModifier:any = null

/* ✅ SAFE PARSER */
if (slug?.startsWith("ai-")){

const parts = slug.replace("ai-","").split("-for-")

if(parts.length===2){

const toolSlug = parts[0]
const modifierSlug = parts[1]

matchedTool = tools.find(t=>t.id === `ai-${toolSlug}`)

if(matchedTool && seoModifiers[toolSlug as keyof typeof seoModifiers]){

const modifiers = seoModifiers[toolSlug as keyof typeof seoModifiers]

matchedModifier = modifiers.find(m=>m.slug === modifierSlug)

}

}

}

if(!matchedTool || !matchedModifier){
return <Navigate to="/404"/>
}

/* STATE */
const [formData,setFormData]=useState<Record<string,string>>({})
const [result,setResult]=useState("")
const [loading,setLoading]=useState(false)
const [error,setError]=useState("")
const [copied,setCopied]=useState(false)

const pageTitle = `${matchedTool.name} for ${matchedModifier.name}`

/* INPUT */
const change=(name:string,value:string)=>{
setFormData(prev=>({...prev,[name]:value}))
}

/* SUBMIT */
const submit=async(e:React.FormEvent)=>{

e.preventDefault()
setLoading(true)
setError("")
setResult("")

try{

let prompt = matchedTool.promptTemplate || ""

/* ADD CONTEXT */
prompt += `\n\nIMPORTANT: Optimize content specifically ${matchedModifier.context || matchedModifier.name}.`

/* VALIDATION */
let missing:string[] = []

matchedTool.inputs?.forEach((input:any)=>{
const value = formData[input.name]

if(!value) missing.push(input.label)

prompt = prompt.replaceAll(`{{${input.name}}}`,value || "")
})

if(missing.length>0){
throw new Error(`Fill all fields: ${missing.join(", ")}`)
}

const res = await generateContent(prompt)

setResult(res)

}catch(err:any){
setError(err.message || "Something went wrong")
}

setLoading(false)
}

/* COPY */
const copy=()=>{
navigator.clipboard?.writeText(result)
setCopied(true)
setTimeout(()=>setCopied(false),2000)
}

const Icon = matchedTool.icon

return(

<>

<SEOHead
title={`${pageTitle} - Free AI Tool`}
description={`Generate ${matchedTool.name} optimized for ${matchedModifier.name}. Fast & free AI generator.`}
canonicalUrl={`https://free-ai-tools-lac.vercel.app/ai-${slug}`}
/>

<div className="max-w-4xl mx-auto">

{/* HEADER */}
<div className="text-center mb-8">

<div className="inline-flex p-3 bg-indigo-100 rounded-xl mb-4 text-indigo-600">
<Icon className="w-8 h-8"/>
</div>

<h1 className="text-3xl font-bold mb-2">
{pageTitle}
</h1>

<p className="text-slate-600">
Generate optimized content for {matchedModifier.name} instantly
</p>

</div>

{/* FORM */}
<div className="bg-white border rounded-2xl p-6">

<form onSubmit={submit} className="space-y-6">

{matchedTool.inputs?.map((input:any)=>(

input.type==="select" ? (

<select
key={input.name}
className="w-full border px-4 py-3 rounded-lg"
value={formData[input.name]||""}
onChange={(e)=>change(input.name,e.target.value)}
>
<option value="">Select {input.label}</option>
{input.options?.map((opt:string)=>(
<option key={opt}>{opt}</option>
))}
</select>

): input.type==="text" ? (

<input
key={input.name}
type="text"
placeholder={input.label}
className="w-full border px-4 py-3 rounded-lg"
value={formData[input.name]||""}
onChange={(e)=>change(input.name,e.target.value)}
/>

):(

<textarea
key={input.name}
placeholder={input.label}
className="w-full border px-4 py-3 rounded-lg"
value={formData[input.name]||""}
onChange={(e)=>change(input.name,e.target.value)}
/>

)

))}

{/* ERROR */}
{error && (
<div className="text-red-500 flex items-center gap-2">
<AlertCircle size={16}/> {error}
</div>
)}

<button
disabled={loading}
className="w-full bg-indigo-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
>
{loading ? (
<>
<Loader2 className="animate-spin"/> Generating...
</>
):(
<>
<Sparkles/> Generate Content
</>
)}
</button>

</form>

{/* RESULT */}
{result &&(

<div className="mt-6 border p-6 rounded-xl">

<div className="flex justify-between mb-2">
<strong>Result</strong>

<button onClick={copy}>
{copied?<Check size={16}/>:<Copy size={16}/>}
</button>

</div>

<div className="text-sm whitespace-pre-wrap">
{result}
</div>

</div>

)}

</div>

<AdPlaceholder slot="content" className="mt-8"/>

{/* SEO CONTENT */}
<div className="mt-12 prose max-w-none">

<h2>Best {matchedTool.name} for {matchedModifier.name}</h2>

<p>
Use this AI tool to generate optimized content specifically for {matchedModifier.name}.
Improve performance and save time using automation.
</p>

<h3>How it works</h3>

<ul>
<li>Enter your input</li>
<li>Generate content</li>
<li>Copy & use</li>
</ul>

</div>

</div>

</>

)

}
