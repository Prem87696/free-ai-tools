 import {
Bot, Mail, Image, Sparkles, FileImage
} from "lucide-react"
import { LucideIcon } from "lucide-react"

/* ---------- TYPES ---------- */

export interface ToolInput{
name:string
label:string
type:"text"|"textarea"|"select"
placeholder?:string
options?:string[]
}

export interface ToolConfig{
id:string
slug:string
name:string
description:string
icon:LucideIcon
path:string
promptTemplate:string
inputs:ToolInput[]
category:"social"|"business"|"writing"|"general"
tags?:string[]
image?:string
link?:string
featured?:boolean
trending?:boolean
}

/* ---------- STATIC TOOLS ---------- */

export const tools:ToolConfig[]=[

{
id:"ai-chatbot",
slug:"ai-chatbot",
name:"AI Chatbot",
description:"Ask anything and get instant AI answers.",
icon:Bot,
path:"/tools/ai-chatbot",
promptTemplate:"You are a helpful AI assistant. Answer: {{query}}",
inputs:[{name:"query",label:"Your Question",type:"textarea"}],
category:"general",
featured:true,
trending:true
},

{
id:"ai-caption-generator",
slug:"ai-caption-generator",
name:"AI Caption Generator",
description:"Generate captions for social media.",
icon:Image,
path:"/tools/ai-caption-generator",
promptTemplate:"Generate captions for {{platform}} about {{topic}} with {{tone}} tone.",
inputs:[
{name:"topic",label:"Post Topic",type:"textarea"},
{name:"platform",label:"Platform",type:"select",options:["Instagram","TikTok"]},
{name:"tone",label:"Tone",type:"select",options:["Funny","Professional"]}
],
category:"social",
trending:true
},

{
id:"ai-email-writer",
slug:"ai-email-writer",
name:"AI Email Writer",
description:"Generate emails.",
icon:Mail,
path:"/tools/ai-email-writer",
promptTemplate:"Write email to {{recipient}} about {{subject}}.",
inputs:[
{name:"recipient",label:"Recipient",type:"text"},
{name:"subject",label:"Subject",type:"text"}
],
category:"business",
featured:true
},

{
id:"image-compressor",
slug:"image-compressor",
name:"Image Compressor",
description:"Compress images.",
icon:FileImage,
path:"/tools/image-compressor",
promptTemplate:"",
inputs:[],
category:"general"
},

{
id:"ai-blog-writer",
slug:"ai-blog-writer",
name:"AI Blog Writer",
description:"Generate SEO optimized blog posts.",
icon:Sparkles,
path:"/tools/ai-blog-writer",
promptTemplate:"Write a blog about {{topic}}",
inputs:[{name:"topic",label:"Blog Topic",type:"textarea"}],
category:"writing",
trending:true
},

{
id:"ai-hashtag-generator",
slug:"ai-hashtag-generator",
name:"Hashtag Generator",
description:"Generate trending hashtags.",
icon:Sparkles,
path:"/tools/ai-hashtag-generator",
promptTemplate:"Generate hashtags for {{topic}}",
inputs:[{name:"topic",label:"Topic",type:"text"}],
category:"social"
},

{
id:"ai-product-description",
slug:"ai-product-description",
name:"Product Description Generator",
description:"Create product descriptions.",
icon:Sparkles,
path:"/tools/ai-product-description",
promptTemplate:"Write product description for {{product}}",
inputs:[{name:"product",label:"Product Name",type:"text"}],
category:"business"
},

{
id:"ai-youtube-title",
slug:"ai-youtube-title",
name:"YouTube Title Generator",
description:"Generate viral titles.",
icon:Sparkles,
path:"/tools/ai-youtube-title",
promptTemplate:"Generate youtube title for {{topic}}",
inputs:[{name:"topic",label:"Video Topic",type:"text"}],
category:"social"
},

{
id:"ai-instagram-bio",
slug:"ai-instagram-bio",
name:"Instagram Bio Generator",
description:"Create attractive bio.",
icon:Sparkles,
path:"/tools/ai-instagram-bio",
promptTemplate:"Write instagram bio for {{niche}}",
inputs:[{name:"niche",label:"Niche",type:"text"}],
category:"social"
},

{
id:"ai-story-generator",
slug:"ai-story-generator",
name:"Story Generator",
description:"Generate creative stories.",
icon:Sparkles,
path:"/tools/ai-story-generator",
promptTemplate:"Write a story about {{topic}}",
inputs:[{name:"topic",label:"Story Topic",type:"text"}],
category:"writing"
},

{
id:"ai-summary-tool",
slug:"ai-summary-tool",
name:"Text Summarizer",
description:"Summarize long text instantly.",
icon:Sparkles,
path:"/tools/ai-summary-tool",
promptTemplate:"Summarize this text: {{text}}",
inputs:[{name:"text",label:"Enter Text",type:"textarea"}],
category:"general"
},

{
id:"ai-rewrite-tool",
slug:"ai-rewrite-tool",
name:"Text Rewriter",
description:"Rewrite content in better way.",
icon:Sparkles,
path:"/tools/ai-rewrite-tool",
promptTemplate:"Rewrite this text: {{text}}",
inputs:[{name:"text",label:"Enter Text",type:"textarea"}],
category:"writing"
}

]

/* ---------- ADMIN (DYNAMIC TOOLS) ---------- */

export const getAllTools = ():ToolConfig[] => {

if (typeof window === "undefined") return tools

try{

const stored = localStorage.getItem("customTools")

if(!stored) return tools

const parsed:Partial<ToolConfig>[] = JSON.parse(stored)

/* SAFE MAP (NO DUPLICATE) */
const map = new Map<string,ToolConfig>()

tools.forEach(t=>map.set(t.id,t))

parsed.forEach((t,index)=>{

const id = t.id || `custom-${index}`

if(map.has(id)) return

map.set(id,{
id,
slug: t.slug || id,
name: t.name || "Custom Tool",
description: t.description || "User tool",
icon: Sparkles,
path: t.path || `/tools/${id}`,
promptTemplate: t.promptTemplate || "",
inputs: t.inputs || [],
category: (t.category as ToolConfig["category"]) || "general",
tags: t.tags || ["custom tool"],
image: t.image,
link: t.link,
featured: t.featured || false,
trending: t.trending || false
})

})

return Array.from(map.values())

}catch{
return tools
}

}

/* ---------- SEO MODIFIERS ---------- */

export const seoModifiers = {

"caption-generator":[
{slug:"instagram",name:"Instagram"}
],

"email-writer":[
{slug:"business",name:"Business"}
]

}
