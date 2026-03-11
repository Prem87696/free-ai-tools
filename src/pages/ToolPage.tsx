import React, { useState, useEffect, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import { tools } from "../data/tools";
import { generateContent } from "../services/aiRouter";

import { toolEngine } from "../engine/toolEngine";

import { SEOHead } from "../components/SEOHead";
import { AdPlaceholder } from "../components/AdPlaceholder";

import { Loader2, Copy, Check, Sparkles } from "lucide-react";

export function ToolPage(){

const { toolId } = useParams();

const tool = tools.find(t => t.id === toolId);

const ToolComponent = toolId ? toolEngine[toolId] : null;

const [formData,setFormData] = useState<Record<string,string>>({});
const [messages,setMessages] = useState<{role:"user"|"ai",text:string}[]>([]);
const [result,setResult] = useState("");
const [loading,setLoading] = useState(false);
const [copied,setCopied] = useState(false);

const chatRef = useRef<HTMLDivElement>(null);

useEffect(()=>{
setFormData({});
setMessages([]);
setResult("");
},[toolId]);

useEffect(()=>{
chatRef.current?.scrollTo({
top:chatRef.current.scrollHeight,
behavior:"smooth"
});
},[messages]);

if(!tool) return <Navigate to="/404"/>;

/* FILE TOOL */

if(ToolComponent){

return(

<>
<SEOHead
title={`${tool.name} - Free Tool`}
description={tool.description}
/>

<div className="max-w-4xl mx-auto">

<ToolComponent/>

</div>

</>

)

}

/* INPUT */

const change=(name:string,value:string)=>{
setFormData(p=>({...p,[name]:value}));
};

/* GENERATOR */

const submit=async(e:React.FormEvent)=>{

e.preventDefault();

setLoading(true);
setResult("");

try{

let prompt = tool.promptTemplate;

tool.inputs?.forEach(input=>{
prompt = prompt.replace(`{{${input.name}}}`,formData[input.name] || "");
});

const res = await generateContent(prompt);

setResult(res);

}catch{

setResult("Something went wrong");

}

setLoading(false);

};

/* CHAT */

const chat=async(e:React.FormEvent)=>{

e.preventDefault();

const msg=formData["message"] || "";

if(!msg.trim()) return;

setMessages(p=>[...p,{role:"user",text:msg}]);

setLoading(true);

try{

const res = await generateContent(msg);

setMessages(p=>[...p,{role:"ai",text:res}]);

}catch{

setMessages(p=>[...p,{role:"ai",text:"Error generating response"}]);

}

setFormData({message:""});
setLoading(false);

};

const copy=(t:string)=>{
navigator.clipboard.writeText(t);
setCopied(true);
setTimeout(()=>setCopied(false),2000);
};

/* CHATBOT */

if(tool.id==="ai-chatbot"){

const Icon = tool.icon;

return(

<>
<SEOHead title={tool.name} description={tool.description}/>

<div className="max-w-4xl mx-auto">

<div className="text-center mb-8">

<div className="inline-flex p-3 bg-indigo-100 rounded-xl text-indigo-600 mb-4">
<Icon className="w-8 h-8"/>
</div>

<h1 className="text-3xl font-bold">{tool.name}</h1>

<p className="text-slate-600">{tool.description}</p>

</div>

<div className="bg-white border rounded-2xl flex flex-col h-[520px]">

<div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">

{messages.length===0 &&(

<div className="text-center text-slate-400 text-sm">
Start chatting with AI
</div>

)}

{messages.map((m,i)=>(
<div key={i}
className={`max-w-[75%] px-4 py-3 rounded-xl text-sm ${
m.role==="user"
? "ml-auto bg-indigo-600 text-white"
: "bg-white border"
}`}
>

{m.text}

<button
onClick={()=>copy(m.text)}
className="text-xs mt-2 flex gap-1"
>
{copied ? <Check size={14}/> : <Copy size={14}/>}
</button>

</div>
))}

{loading &&(

<div className="flex gap-2 text-sm text-slate-500">
<Loader2 className="w-4 h-4 animate-spin"/>
AI is thinking...
</div>

)}

</div>

<form onSubmit={chat} className="border-t p-4 flex gap-3">

<textarea
rows={1}
value={formData["message"] || ""}
onChange={(e)=>change("message",e.target.value)}
className="flex-1 border rounded-lg px-4 py-3"
/>

<button className="bg-indigo-600 text-white px-6 rounded-lg">
Send
</button>

</form>

</div>

</div>

</>

)

}

/* GENERATOR */

const Icon = tool.icon;

return(

<>
<SEOHead title={tool.name} description={tool.description}/>

<div className="max-w-4xl mx-auto">

<div className="text-center mb-8">

<div className="inline-flex p-3 bg-indigo-100 rounded-xl text-indigo-600 mb-4">
<Icon className="w-8 h-8"/>
</div>

<h1 className="text-3xl font-bold">{tool.name}</h1>

<p className="text-slate-600">{tool.description}</p>

</div>

<div className="bg-white border rounded-2xl p-8">

<form onSubmit={submit} className="space-y-6">

{tool.inputs?.map(input=>(
<div key={input.name}>

<label className="block text-sm mb-2">
{input.label}
</label>

<textarea
className="w-full border rounded-lg px-4 py-3"
value={formData[input.name] || ""}
onChange={(e)=>change(input.name,e.target.value)}
/>

</div>
))}

<button className="w-full bg-indigo-600 text-white py-3 rounded-lg flex justify-center gap-2">

{loading ? (
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

<div className="mt-6 border bg-slate-50 p-6 rounded-xl">

<div className="flex justify-between mb-3">

<strong>Generated Result</strong>

<button onClick={()=>copy(result)}>
{copied ? <Check size={16}/> : <Copy size={16}/>}
</button>

</div>

<div className="text-sm whitespace-pre-wrap">
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
