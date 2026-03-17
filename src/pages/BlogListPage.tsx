import React from "react"
import { Link } from "react-router-dom"
import { SEOHead } from "../components/SEOHead"
import { blogKeywords } from "../data/blogKeywords"
import { ArrowRight } from "lucide-react"

export function BlogListPage(){

/* SAFE SLUG */
const createSlug = (text:string)=>
text.toLowerCase().replace(/[^a-z0-9]+/g,"-")

return(

<>

<SEOHead
title="AI Blog - Free Guides & Tutorials"
description="Explore AI tools guides, tutorials, SEO tips and latest AI trends."
canonicalUrl="https://free-ai-tools-lac.vercel.app/blog"
/>

<div className="max-w-6xl mx-auto px-6 py-10">

{/* HEADER */}
<div className="text-center mb-12">

<h1 className="text-4xl font-bold mb-3">
AI Blog & Guides
</h1>

<p className="text-slate-500">
Learn AI tools, SEO strategies and productivity hacks
</p>

</div>

{/* GRID */}
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{blogKeywords.map((keyword,index)=>{

const slug = createSlug(keyword)

return(

<Link
key={index}
to={`/blog/${slug}`}
className="group bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-lg hover:border-indigo-200 transition flex flex-col"
>

<h2 className="text-lg font-semibold capitalize text-slate-900 group-hover:text-indigo-600">
{keyword}
</h2>

<p className="text-sm text-slate-500 mt-2 flex-grow">
Complete guide, tips and strategies for {keyword}
</p>

<div className="mt-4 text-indigo-600 text-sm flex items-center">
Read Guide <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition"/>
</div>

</Link>

)

})}

</div>

{/* 💰 CTA SECTION */}
<div className="mt-16 text-center bg-indigo-50 p-8 rounded-2xl border">

<h2 className="text-2xl font-bold mb-3">
🚀 Start Using AI Tools Today
</h2>

<p className="text-slate-600 mb-6">
Boost your productivity with powerful AI tools
</p>

<Link
to="/tools"
className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700"
>
Explore AI Tools →
</Link>

</div>

</div>

</>

)

}
