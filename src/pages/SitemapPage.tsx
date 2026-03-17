import React from "react"
import { Link } from "react-router-dom"
import { getAllTools, seoModifiers } from "../data/tools"
import { SEOHead } from "../components/SEOHead"
import { blogKeywords } from "../data/blogKeywords"

export function SitemapPage(){

const tools = getAllTools()

const generatedLinks:any[] = []

/* ---------- TOOL + SEO LINKS ---------- */
tools.forEach(tool=>{

// TOOL PAGE
generatedLinks.push({
name: tool.name,
path: tool.path,
type: "tool"
})

// SEO PAGES
const toolSlug = tool.id.replace("ai-","")

const modifiers = seoModifiers[toolSlug as keyof typeof seoModifiers]

if(modifiers){

modifiers.forEach(mod=>{
generatedLinks.push({
name: `${tool.name} for ${mod.name}`,
path: `/ai-${toolSlug}-for-${mod.slug}`,
type: "seo"
})
})

}

})

/* ---------- STATIC ---------- */
const staticPages = [
{ name:"Home", path:"/" },
{ name:"All Tools", path:"/tools" },
{ name:"Categories", path:"/categories" },
{ name:"Search", path:"/search" },
{ name:"About", path:"/about" },
{ name:"Contact", path:"/contact" },
{ name:"Privacy Policy", path:"/privacy-policy" },
{ name:"Terms", path:"/terms-and-conditions" },
{ name:"Disclaimer", path:"/disclaimer" }
]

/* ---------- CATEGORY ---------- */
const categories = [
{ name:"Social Tools", path:"/category/social" },
{ name:"Business Tools", path:"/category/business" },
{ name:"Writing Tools", path:"/category/writing" },
{ name:"General Tools", path:"/category/general" }
]

/* ---------- BLOG AUTO ---------- */
const blogPages = blogKeywords.map(k=>({
name: k,
path: `/blog/${k.replace(/ /g,"-")}`
}))

return(

<>

<SEOHead
title="Sitemap - Free AI Tools Platform"
description="Browse all AI tools, categories, blog guides and SEO pages."
canonicalUrl="https://free-ai-tools-lac.vercel.app/sitemap"
/>

<div className="max-w-6xl mx-auto px-6 py-10">

<h1 className="text-3xl font-bold mb-10">
Sitemap
</h1>

<div className="grid md:grid-cols-2 gap-12">

{/* LEFT */}
<div>

{/* CORE */}
<h2 className="text-xl font-bold mb-4 text-indigo-600">
Core Pages
</h2>

<ul className="space-y-2">
{staticPages.map(p=>(
<li key={p.path}>
<Link to={p.path} className="text-slate-600 hover:text-indigo-600">
{p.name}
</Link>
</li>
))}
</ul>

{/* CATEGORY */}
<h2 className="text-xl font-bold mt-8 mb-4 text-indigo-600">
Categories
</h2>

<ul className="space-y-2">
{categories.map(c=>(
<li key={c.path}>
<Link to={c.path} className="text-slate-600 hover:text-indigo-600">
{c.name}
</Link>
</li>
))}
</ul>

{/* BLOG */}
<h2 className="text-xl font-bold mt-8 mb-4 text-indigo-600">
Blog Guides
</h2>

<ul className="space-y-2">
{blogPages.map(b=>(
<li key={b.path}>
<Link to={b.path} className="text-slate-600 hover:text-indigo-600">
{b.name}
</Link>
</li>
))}
</ul>

</div>

{/* RIGHT */}
<div>

{/* TOOLS */}
<h2 className="text-xl font-bold mb-4 text-indigo-600">
All Tools
</h2>

<ul className="space-y-2">
{generatedLinks
.filter(l=>l.type==="tool")
.map(link=>(
<li key={link.path}>
<Link to={link.path} className="text-slate-600 hover:text-indigo-600">
{link.name}
</Link>
</li>
))}
</ul>

{/* SEO */}
<h2 className="text-xl font-bold mt-8 mb-4 text-indigo-600">
SEO Pages
</h2>

<ul className="space-y-2">
{generatedLinks
.filter(l=>l.type==="seo")
.map(link=>(
<li key={link.path}>
<Link to={link.path} className="text-slate-600 hover:text-indigo-600">
{link.name}
</Link>
</li>
))}
</ul>

</div>

</div>

</div>

</>

)

}
