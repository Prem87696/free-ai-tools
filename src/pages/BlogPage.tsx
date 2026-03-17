import React,{useState,useEffect} from "react"
import {useParams} from "react-router-dom"
import {SEOHead} from "../components/SEOHead"
import {generateContent} from "../services/aiRouter"
import {Loader2} from "lucide-react"

export function BlogPage(){

const {slug}=useParams<{slug:string}>()

const [content,setContent]=useState("")
const [loading,setLoading]=useState(false)

/* SAFE TITLE */
const title = slug ? slug.replaceAll("-"," ") : "AI Guide"

/* GENERATE BLOG */
const generateBlog=async(currentTitle:string)=>{

setLoading(true)

try{

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

setContent(res)

}catch{
setContent("Error generating blog")
}

setLoading(false)

}

/* AUTO GENERATE */
useEffect(()=>{
if(title){
generateBlog(title)
}
},[title])

return(

<div className="max-w-4xl mx-auto p-6">

<SEOHead
title={`${title} - AI Guide`}
description={`Complete guide about ${title}. Learn benefits, usage and tips.`}
canonicalUrl={`https://free-ai-tools-lac.vercel.app/blog/${slug}`}
/>

<h1 className="text-3xl font-bold capitalize mb-4">
{title}
</h1>

{/* BUTTON */}
<button
onClick={()=>generateBlog(title)}
className="bg-indigo-600 text-white px-6 py-2 rounded-lg mb-6"
>
{loading ? <Loader2 className="animate-spin"/> : "Regenerate Article"}
</button>

{/* CONTENT */}
<div className="prose max-w-none whitespace-pre-wrap">

{loading ? (
<div className="flex items-center gap-2 text-slate-500">
<Loader2 className="animate-spin"/>
Generating content...
</div>
) : content}

</div>

{/* 🔥 RELATED BLOGS */}
<div className="mt-10">
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

<a
key={i}
href={`/blog/${item}`}
className="border p-4 rounded-xl hover:shadow"
>
{item.replaceAll("-"," ")}
</a>

))}

</div>
</div>

{/* 🔗 TOOL CTA */}
<div className="mt-10 text-center">

<h2 className="text-xl font-bold mb-4">
Try AI Tools
</h2>

<a
href="/tools/ai-chatbot"
className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl"
>
Open AI Chatbot →
</a>

</div>

</div>

)

}
