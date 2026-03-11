import React, { useState, useEffect, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import { tools } from "../data/tools";
import { generateContent } from "../services/aiRouter";

import { SEOHead } from "../components/SEOHead";
import { AdPlaceholder } from "../components/AdPlaceholder";

/* FILE TOOLS */
import JpgToPdf from "../components/tools/JpgToPdf";
import SvgToPng from "../components/tools/SvgToPng";
import PngToJpg from "../components/tools/PngToJpg";
import WebpToPng from "../components/tools/WebpToPng";
import ImageCompressor from "../components/tools/ImageCompressor";
import ImageToPdf from "../components/tools/ImageToPdf";
import MergePdf from "../components/tools/MergePdf";
import SplitPdf from "../components/tools/SplitPdf";
import PdfToImage from "../components/tools/PdfToImage";

import { Loader2, Copy, Check, AlertCircle } from "lucide-react";

export function ToolPage() {

const { toolId } = useParams();
const tool = tools.find((t) => t.id === toolId);

const [formData, setFormData] = useState<Record<string,string>>({});
const [messages, setMessages] = useState<
{ role:"user"|"ai", text:string }[]
>([]);

const [isLoading,setIsLoading] = useState(false);
const [error,setError] = useState("");
const [copied,setCopied] = useState(false);

const chatRef = useRef<HTMLDivElement>(null);

useEffect(()=>{
setFormData({});
setMessages([]);
setError("");
},[toolId]);

useEffect(()=>{
chatRef.current?.scrollTo({
top:chatRef.current.scrollHeight,
behavior:"smooth"
});
},[messages]);

if(!tool){
return <Navigate to="/404"/>
}

/* FILE TOOL ROUTER */

const fileToolMap:any = {
"svg-to-png": <SvgToPng/>,
"png-to-jpg": <PngToJpg/>,
"webp-to-png": <WebpToPng/>,
"image-compressor": <ImageCompressor/>,
"image-to-pdf": <ImageToPdf/>,
"jpg-to-pdf": <JpgToPdf/>,
"merge-pdf": <MergePdf/>,
"split-pdf": <SplitPdf/>,
"pdf-to-image": <PdfToImage/>
}

if(fileToolMap[tool.id]){
return(
<>
<SEOHead
title={`${tool.name} - Free Tool`}
description={tool.description}
/>

<div className="max-w-4xl mx-auto">
{fileToolMap[tool.id]}
</div>
</>
)
}

/* INPUT CHANGE */

const handleInputChange = (name:string,value:string)=>{
setFormData(prev=>({
...prev,
[name]:value
}))
}

/* SUBMIT */

const handleSubmit = async(e:React.FormEvent)=>{

e.preventDefault()

const userInput = formData[tool.inputs?.[0].name] || ""

if(!userInput.trim()) return

setMessages(prev=>[
...prev,
{role:"user",text:userInput}
])

setIsLoading(true)
setError("")

try{

let prompt = tool.promptTemplate.replace(
`{{${tool.inputs?.[0].name}}}`,
userInput
)

const response = await generateContent(prompt)

setMessages(prev=>[
...prev,
{role:"ai",text:response}
])

}catch(err:any){

setMessages(prev=>[
...prev,
{role:"ai",text:"Error generating response"}
])

setError(err.message || "Something went wrong")

}

setFormData({[tool.inputs?.[0].name]:""})
setIsLoading(false)

}

/* COPY */

const copyToClipboard=(text:string)=>{
navigator.clipboard.writeText(text)
setCopied(true)
setTimeout(()=>setCopied(false),2000)
}

/* UI */

return(

<>

<SEOHead
title={`${tool.name} - Free AI Tool`}
description={tool.description}
/>

<div className="max-w-4xl mx-auto">

{/* HEADER */}

<div className="text-center mb-8">

<div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-xl mb-4 text-indigo-600">
<tool.icon className="w-8 h-8"/>
</div>

<h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
{tool.name}
</h1>

<p className="text-slate-600 text-lg max-w-2xl mx-auto">
{tool.description}
</p>

</div>

{/* CHAT BOX */}

<div className="bg-white rounded-2xl border border-slate-200 flex flex-col h-[520px] overflow-hidden">

{/* MESSAGES */}

<div
ref={chatRef}
className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50"
>

{messages.length===0 &&(
<div className="text-center text-slate-400 text-sm mt-10">
Start chatting with AI
</div>
)}

{messages.map((msg,i)=>(

<div
key={i}
className={`max-w-[75%] px-4 py-3 rounded-xl text-sm whitespace-pre-wrap ${
msg.role==="user"
? "ml-auto bg-indigo-600 text-white"
: "bg-white border border-slate-200"
}`}
>

{msg.text}

<div className="flex justify-end mt-2">

<button
onClick={()=>copyToClipboard(msg.text)}
className="text-xs text-slate-400 hover:text-indigo-600 flex items-center gap-1"
>

{copied ? <Check size={14}/> : <Copy size={14}/>}
{copied ? "Copied":"Copy"}

</button>

</div>

</div>

))}

{isLoading &&(

<div className="flex items-center gap-2 text-slate-500 text-sm">
<Loader2 className="w-4 h-4 animate-spin"/>
AI is thinking...
</div>

)}

</div>

{/* INPUT */}

<form
onSubmit={handleSubmit}
className="border-t border-slate-200 p-4 flex gap-3"
>

<textarea
rows={1}
placeholder="Type your message..."
value={formData[tool.inputs?.[0].name] || ""}
onChange={(e)=>
handleInputChange(tool.inputs?.[0].name,e.target.value)
}
onKeyDown={(e)=>{
if(e.key==="Enter" && !e.shiftKey){
e.preventDefault()
handleSubmit(e as any)
}
}}
className="flex-1 resize-none px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
/>

<button
type="submit"
disabled={isLoading}
className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-lg font-medium flex items-center justify-center"
>

{isLoading
? <Loader2 className="w-5 h-5 animate-spin"/>
: "Send"
}

</button>

</form>

</div>

{error &&(

<div className="mt-4 bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2 text-sm">
<AlertCircle className="w-4 h-4"/>
{error}
</div>

)}

<AdPlaceholder slot="content" className="mt-8"/>

</div>

</>

)

}
