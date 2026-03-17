import React,{useState,useEffect} from "react"
import {useParams,Link} from "react-router-dom"
import {SEOHead} from "../components/SEOHead"
import {generateContent} from "../services/aiRouter"
import {Loader2} from "lucide-react"

export function BlogPage(){

const {slug}=useParams<{slug:string}>()

const [content,setContent]=useState("")
const [loading,setLoading]=useState(false)

/* TITLE */
const title = slug ? slug.replaceAll("-"," ") : "AI Guide"

/* GENERATE WITH CACHE */
const generateBlog=async(currentTitle:string)=>{

const key = "blog-" + currentTitle

const cached = localStorage.getItem(key)

if(cached){
setContent(cached)
return
}

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

localStorage.setItem(key,res)

setContent(res)

}catch{
setContent("Error generating blog")
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
title={`${title} - AI Guide`}
description={`Complete guide about ${title}. Learn benefits, usage and tips.`}
canonicalUrl={`https://free-ai-tools-lac.vercel.app/blog/${slug}`}
/>

<h1 className="text-3xl font-bold capitalize mb-4">
{title}
</h1>

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

{/* 💰 AFFILIATE CTA (HIGH CONVERSION) */}
<div className="mt-12 p-6 bg-indigo-50 border rounded-xl text-center">

<h2 className="text-xl font-bold mb-2">
Best AI Tool for this task
</h2>

<p className="text-sm text-slate-600 mb-4">
Get faster and more accurate results using premium AI tools
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

{/* 🔗 RELATED BLOGS */}
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
{item.replaceAll("-"," ")}
</Link>

))}

</div>

</div>

{/* 🔗 TOOL CTA */}
<div className="mt-12 text-center">

<h2 className="text-xl font-bold mb-4">
Try AI Tools
</h2>

<Link
to="/tools/ai-chatbot"
className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl"
>
Open AI Chatbot →
</Link>

</div>

</div>

)

}
