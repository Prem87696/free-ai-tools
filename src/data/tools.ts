import {
Bot,Mail,PenTool,Hash,ShoppingBag,User,Image,Sparkles,FileImage,FilePlus
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
tags:["ai chatbot","chatgpt alternative","ai assistant"],
featured:true,
trending:true,
link:"https://chat.openai.com"
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
tags:["instagram caption","social media ai","caption generator"],
link:"https://www.copy.ai"
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
tags:["email generator","business email ai","email writer"],
link:"https://writesonic.com"
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
category:"general",
tags:["image compress","optimize image","reduce size"],
link:"https://tinypng.com"
}

]

/* ---------- ADMIN (DYNAMIC TOOLS) ---------- */

export const getAllTools = ():ToolConfig[] => {

if (typeof window === "undefined") return tools

try{

const stored = localStorage.getItem("customTools")

if(!stored) return tools

const parsed = JSON.parse(stored)

/* FIX: icon fallback */
const fixed = parsed.map((t:any)=>({
...t,
icon:Sparkles,
tags: t.tags || ["custom ai tool"]
}))

return [...tools, ...fixed]

}catch{
return tools
}

}

/* ---------- SEO MODIFIERS ---------- */

export const seoModifiers={

"caption-generator":[
{slug:"instagram",name:"Instagram"}
],

"email-writer":[
{slug:"business",name:"Business"}
]

}
