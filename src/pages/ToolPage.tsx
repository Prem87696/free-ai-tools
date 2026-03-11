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

import { Loader2, Copy, Check, AlertCircle, Sparkles } from "lucide-react";

export function ToolPage() {

const { toolId } = useParams();
const tool = tools.find((t) => t.id === toolId);

const [formData, setFormData] = useState<Record<string,string>>({});
const [messages, setMessages] = useState<
{ role:"user"|"ai", text:string }[]
>([]);

const [result,setResult] = useState("");
const [isLoading,setIsLoading] = useState(false);
const [error,setError] = useState("");
const [copied,setCopied] = useState(false);

const chatRef = useRef<HTMLDivElement>(null);

useEffect(()=>{
setFormData({});
setMessages([]);
setResult("");
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

/* GENERATOR SUBMIT */

const handleGeneratorSubmit = async(e:React.FormEvent)=>{

e.preventDefault();

setIsLoading(true);
setError("");
setResult("");

try{

let prompt = tool.promptTemplate;

tool.inputs?.forEach((input)=>{
prompt = prompt.replace(`{{${input.name}}}`,formData[input.name]||"")
})

const generatedText = await generateContent(prompt);

setResult(generatedText);

}catch(err:any){
setError(err.message || "Something went wrong");
}

setIsLoading(false);

}

/* CHATBOT SUBMIT */

const handleChatSubmit = async(e:React.FormEvent)=>{

e.preventDefault()

const userInput = formData["message"] || ""
if(!userInput.trim()) return

setMessages(prev=>[
...prev,
{role:"user",text:userInput}
])

setIsLoading(true)

try{

const response = await generateContent(userInput)

setMessages(prev=>[
...prev,
{role:"ai",text:response}
])

}catch{

setMessages(prev=>[
...prev,
{role:"ai",text:"Error generating response"}
])

}

setFormData({message:""})
setIsLoading(false)

}

/* COPY */

const copyToClipboard=(text:string)=>{
navigator.clipboard.writeText(text)
setCopied(true)
setTimeout(()=>setCopied(false),2000)
}

/* ========================= */
/* CHATBOT UI */
/* ========================= */

if(tool.id==="ai-chatbot"){

return(

<>
<SEOHead
title={`${tool.name} - Free AI Chatbot`}
description={tool.description}
/>

<div className="max-w-4xl mx-auto">

<div className="text-center mb-8">

<div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-xl mb-4 text-indigo-600">
<tool.icon className="w-8 h-8"/>
</div>

<h1 className="text-3xl font-bold text-slate-900">{tool.name}</h1>

<p className="text-slate-600 mt-2">{tool.description}</p>

</div>

<div className="bg-white rounded-2xl border border-slate-200 flex flex-col h-[520px] overflow-hidden">

<div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">

{messages.length===0 &&(
<div className="text-center text-slate-400 text-sm">
Start chatting with AI
</div>
)}

{messages.map((msg,i)=>(

<div key={i}
className={`max-w-[75%] px-4 py-3 rounded-xl text-sm whitespace-pre-wrap ${
msg.role==="user"
? "ml-auto bg-indigo-600 text-white"
: "bg-white border border-slate-200"
}`}
>

{msg.text}

<button
onClick={()=>copyToClipboard(msg.text)}
className="text-xs text-slate-400 hover:text-indigo-600 flex items-center gap-1 mt-2"
>
{copied ? <Check size={14}/> : <Copy size={14}/>}
</button>

</div>

))}

{isLoading &&(
<div className="flex items-center gap-2 text-slate-500 text-sm">
<Loader2 className="w-4 h-4 animate-spin"/>
AI is thinking...
</div>
)}

</div>

<form
onSubmit={handleChatSubmit}
className="border-t border-slate-200 p-4 flex gap-3"
>

<textarea
rows={1}
placeholder="Type your message..."
value={formData["message"] || ""}
onChange={(e)=>handleInputChange("message",e.target.value)}
className="flex-1 resize-none px-4 py-3 rounded-lg border border-slate-300"
/>

<button
type="submit"
className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-lg"
>
Send
</button>

</form>

</div>

</div>

</>

)

}

/* ========================= */
/* GENERATOR UI */
/* ========================= */

return(

<>
<SEOHead
title={`${tool.name} - Free AI Tool`}
description={tool.description}
/>

<div className="max-w-4xl mx-auto">

<div className="text-center mb-8">

<div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-xl mb-4 text-indigo-600">
<tool.icon className="w-8 h-8"/>
</div>

<h1 className="text-3xl font-bold text-slate-900">{tool.name}</h1>

<p className="text-slate-600 mt-2">{tool.description}</p>

</div>

<div className="bg-white rounded-2xl border border-slate-200 p-8">

<form onSubmit={handleGeneratorSubmit} className="space-y-6">

{tool.inputs?.map((input)=>(

<div key={input.name}>

<label className="block text-sm font-medium mb-2">
{input.label}
</label>

<textarea
className="w-full px-4 py-3 border border-slate-300 rounded-lg"
placeholder={input.placeholder}
value={formData[input.name] || ""}
onChange={(e)=>handleInputChange(input.name,e.target.value)}
/>

</div>

))}

<button
type="submit"
className="w-full bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
>

{isLoading ? (
<>
<Loader2 className="w-5 h-5 animate-spin"/>
Generating...
</>
):(
<>
<Sparkles className="w-5 h-5"/>
Generate Content
</>
)}

</button>

</form>

{result &&(

<div className="mt-6 bg-slate-50 border border-slate-200 p-6 rounded-xl">

<div className="flex justify-between mb-3">

<strong>Generated Result</strong>

<button
onClick={()=>copyToClipboard(result)}
className="text-sm flex items-center gap-1"
>
{copied ? <Check size={16}/> : <Copy size={16}/>}
</button>

</div>

<div className="whitespace-pre-wrap text-sm text-slate-700">
{result}
</div>

</div>

)}

</div>

<AdPlaceholder slot="content" className="mt-8"/>

</div>

</>

)

}
