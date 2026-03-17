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

/* ✅ NEW (future ready) */
image?:string
link?:string
featured?:boolean
trending?:boolean
}

/* ---------- TOOLS ---------- */

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
tags:["ai","chatbot"],
featured:true,
trending:true
},

{
id:"ai-caption-generator",
slug:"ai-caption-generator",
name:"AI Caption Generator",
description:"Generate engaging captions for social media.",
icon:Image,
path:"/tools/ai-caption-generator",
promptTemplate:"Generate captions for {{platform}} about {{topic}} with {{tone}} tone.",
inputs:[
{name:"topic",label:"Post Topic",type:"textarea"},
{name:"platform",label:"Platform",type:"select",options:["Instagram","TikTok","Facebook"]},
{name:"tone",label:"Tone",type:"select",options:["Funny","Professional","Casual"]}
],
category:"social",
featured:true
},

{
id:"ai-resume-builder",
slug:"ai-resume-builder",
name:"AI Resume Builder",
description:"Create professional resume summaries.",
icon:User,
path:"/tools/ai-resume-builder",
promptTemplate:"Write resume summary for {{jobTitle}} with skills {{skills}}.",
inputs:[
{name:"jobTitle",label:"Job Title",type:"text"},
{name:"skills",label:"Skills",type:"textarea"}
],
category:"business"
},

{
id:"ai-email-writer",
slug:"ai-email-writer",
name:"AI Email Writer",
description:"Generate professional emails instantly.",
icon:Mail,
path:"/tools/ai-email-writer",
promptTemplate:"Write a {{type}} email to {{recipient}} about {{subject}}.",
inputs:[
{name:"recipient",label:"Recipient",type:"text"},
{name:"type",label:"Type",type:"select",options:["Formal","Casual"]},
{name:"subject",label:"Subject",type:"text"}
],
category:"business",
trending:true
},

{
id:"ai-blog-writer",
slug:"ai-blog-writer",
name:"AI Blog Writer",
description:"Generate blog outlines.",
icon:PenTool,
path:"/tools/ai-blog-writer",
promptTemplate:"Write blog about {{title}} for {{audience}}.",
inputs:[
{name:"title",label:"Title",type:"text"},
{name:"audience",label:"Audience",type:"text"}
],
category:"writing"
},

{
id:"ai-story-generator",
slug:"ai-story-generator",
name:"AI Story Generator",
description:"Generate creative stories.",
icon:Sparkles,
path:"/tools/ai-story-generator",
promptTemplate:"Write a {{genre}} story about {{topic}}.",
inputs:[
{name:"topic",label:"Topic",type:"textarea"},
{name:"genre",label:"Genre",type:"select",options:["Sci-Fi","Fantasy"]}
],
category:"writing"
},

{
id:"ai-hashtag-generator",
slug:"ai-hashtag-generator",
name:"AI Hashtag Generator",
description:"Generate viral hashtags.",
icon:Hash,
path:"/tools/ai-hashtag-generator",
promptTemplate:"Generate hashtags about {{topic}}.",
inputs:[{name:"topic",label:"Topic",type:"textarea"}],
category:"social"
},

{
id:"ai-product-description-generator",
slug:"ai-product-description-generator",
name:"AI Product Description",
description:"Generate product descriptions.",
icon:ShoppingBag,
path:"/tools/ai-product-description-generator",
promptTemplate:"Write product description for {{productName}}.",
inputs:[{name:"productName",label:"Product",type:"text"}],
category:"business"
},

/* FILE TOOLS */

{
id:"svg-to-png",
slug:"svg-to-png",
name:"SVG to PNG",
description:"Convert SVG to PNG.",
icon:FileImage,
path:"/tools/svg-to-png",
promptTemplate:"",
inputs:[],
category:"general"
},

{
id:"png-to-jpg",
slug:"png-to-jpg",
name:"PNG to JPG",
description:"Convert PNG to JPG.",
icon:FileImage,
path:"/tools/png-to-jpg",
promptTemplate:"",
inputs:[],
category:"general"
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
trending:true
},

{
id:"background-remover",
slug:"background-remover",
name:"Background Remover",
description:"Remove image background.",
icon:FileImage,
path:"/tools/background-remover",
promptTemplate:"",
inputs:[],
category:"general",
featured:true
},

{
id:"image-to-pdf",
slug:"image-to-pdf",
name:"Image to PDF",
description:"Convert image to PDF.",
icon:FilePlus,
path:"/tools/image-to-pdf",
promptTemplate:"",
inputs:[],
category:"general"
},

{
id:"merge-pdf",
slug:"merge-pdf",
name:"Merge PDF",
description:"Merge PDFs.",
icon:FilePlus,
path:"/tools/merge-pdf",
promptTemplate:"",
inputs:[],
category:"general"
}

]

/* ---------- SEO MODIFIERS ---------- */

export const seoModifiers={

"caption-generator":[
{slug:"instagram",name:"Instagram",context:"for Instagram posts"}
],

"resume-builder":[
{slug:"freshers",name:"Freshers",context:"for entry level"}
],

"email-writer":[
{slug:"business",name:"Business",context:"for business emails"}
]

}
