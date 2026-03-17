import React,{useState} from "react"
import {useParams} from "react-router-dom"
import {SEOHead} from "../components/SEOHead"
import {generateContent} from "../services/aiRouter"
import {Loader2} from "lucide-react"

export function BlogPage(){

const {slug}=useParams()

const [content,setContent]=useState("")
const [loading,setLoading]=useState(false)

const title = slug?.replaceAll("-"," ") || ""

const generateBlog=async()=>{

setLoading(true)

try{

const prompt = `Write a detailed SEO optimized blog article about "${title}".
Include headings, subheadings, FAQs and conclusion.`

const res = await generateContent(prompt)

setContent(res)

}catch{
setContent("Error generating blog")
}

setLoading(false)

}

return(

<div className="max-w-4xl mx-auto p-6">

<SEOHead
title={`${title} - AI Guide`}
description={`Learn about ${title} with this complete guide.`}
canonicalUrl={`https://free-ai-tools-lac.vercel.app/blog/${slug}`}
/>

<h1 className="text-3xl font-bold capitalize mb-4">
{title}
</h1>

<button
onClick={generateBlog}
className="bg-indigo-600 text-white px-6 py-2 rounded-lg mb-6"
>
{loading ? <Loader2 className="animate-spin"/> : "Generate Article"}
</button>

<div className="prose max-w-none whitespace-pre-wrap">
{content}
</div>

</div>

)

}
