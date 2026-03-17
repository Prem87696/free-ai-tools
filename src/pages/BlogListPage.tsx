import React from "react"
import { Link } from "react-router-dom"
import { SEOHead } from "../components/SEOHead"
import { blogKeywords } from "../data/blogKeywords"

export function BlogListPage(){

return(

<div className="max-w-5xl mx-auto p-6">

<SEOHead
title="AI Blog - Free Guides"
description="Explore AI tools guides, tutorials and latest trends."
canonicalUrl="https://free-ai-tools-lac.vercel.app/blog"
/>

<h1 className="text-3xl font-bold mb-8">
AI Blog & Guides
</h1>

<div className="grid md:grid-cols-2 gap-6">

{blogKeywords.map((keyword,index)=>{

const slug=keyword.replaceAll(" ","-")

return(

<Link
key={index}
to={`/blog/${slug}`}
className="border p-5 rounded-xl hover:shadow transition"
>

<h2 className="text-lg font-semibold capitalize">
{keyword}
</h2>

<p className="text-sm text-slate-500 mt-2">
Read complete guide about {keyword}
</p>

</Link>

)

})}

</div>

</div>

)

}
