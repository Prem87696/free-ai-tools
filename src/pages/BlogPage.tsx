import React,{useState,useEffect} from "react"
import {useParams,Link} from "react-router-dom"
import {SEOHead} from "../components/SEOHead"
import {generateContent} from "../services/aiRouter"
import {Loader2} from "lucide-react"

export function BlogPage(){

const {slug}=useParams<{slug:string}>()

const [content,setContent]=useState("")
const [loading,setLoading]=useState(false)

/* ✅ CLEAN TITLE */
const title = slug
? slug.replace(/-/g," ").toLowerCase()
: "ai guide"

/* CACHE TIME */
const CACHE_TIME = 24 * 60 * 60 * 1000

/* GENERATE BLOG */
const generateBlog=async(currentTitle:string,force=false)=>{

const key = "blog-" + currentTitle

try{

if(typeof window !== "undefined" && !force){

const cached = localStorage.getItem(key)

if(cached){
try{
const parsed = JSON.parse(cached)

if(parsed?.data && Date.now() - parsed.time < CACHE_TIME){
setContent(parsed.data)
return
}
}catch{}
}

}

setLoading(true)

const prompt = `
Write a detailed SEO optimized blog article about "${currentTitle}".

Include:
- Proper H1, H2, H3 headings
- Bullet points
- FAQs section
- Conclusion
- Minimum 800-1200 words
- Easy English language
`

const res = await generateContent(prompt)

/* SAVE CACHE */
if(typeof window !== "undefined"){
localStorage.setItem(key, JSON.stringify({
data: res,
time: Date.now()
}))
}

setContent(res)

}catch{
setContent("ERROR")
}

setLoading(false)
}

/* AUTO LOAD */
useEffect(()=>{
if(title){
generateBlog(title)
}
},[title])

return(

<div className="max-w-4xl mx-auto p-6">

<SEOHead
title={`${title} - Complete AI Guide`}
description={`Learn everything about ${title}. Tips, tools and strategies explained.`}
canonicalUrl={`https://free-ai-tools-lac.vercel.app/blog/${slug}`}
/>

<h1 className="text-3xl font-bold capitalize mb-4">
{title}
</h1>

{/* BUTTON */}
<button
onClick={()=>generateBlog(title,true)}
className="bg-indigo-600 text-white px-6 py-2 rounded-lg mb-6"
>
{loading ? <Loader2 className="animate-spin"/> : "Regenerate Article"}
</button>

{/* CONTENT */}
<div className="prose max-w-none whitespace-pre-wrap">

{loading ? (

<div className="space-y-3 animate-pulse">
<div className="h-4 bg-slate-200 rounded w-3/4"></div>
<div className="h-4 bg-slate-200 rounded"></div>
<div className="h-4 bg-slate-200 rounded w-5/6"></div>
</div>

) : content === "ERROR" ? (

<div className="text-red-500">
Something went wrong. Please try again.
</div>

) : content}

</div>

{/* 💰 AFFILIATE CTA */}
<div className="mt-12 p-6 bg-indigo-50 border rounded-xl text-center">

<h2 className="text-xl font-bold mb-2">
Best AI Tool for this task
</h2>

<p className="text-sm text-slate-600 mb-4">
Get faster and better results using premium AI tools
</p>

<a
href="https://your-affiliate-link.com"
target="_blank"
rel="nofollow sponsored"
className="bg-indigo-600 text-white px-6 py-3 rounded-xl inline-block hover:bg-indigo-700"
>
🚀 Try Premium AI Tool
</a>

</div>

{/* RELATED BLOGS */}
<div className="mt-12">

<h2 className="text-xl font-bold mb-4">
Related Guides
</h2>

<div className="grid md:grid-cols-2 gap-4">

{[
"ai-tools-for-students",
"best-free-ai-tools",
"ai-tools-for-business",
"ai-content-generator-free"
].map((item,i)=>(

<Link
key={i}
to={`/blog/${item}`}
className="border p-4 rounded-xl hover:shadow"
>
{item.replace(/-/g," ")}
</Link>

))}

</div>

</div>

{/* TOOL CTA */}
<div className="mt-12 text-center">

<h2 className="text-xl font-bold mb-4">
Try AI Tools
</h2>

<Link
to="/tools"
className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl"
>
Explore AI Tools →
</Link>

</div>

</div>

)

}
