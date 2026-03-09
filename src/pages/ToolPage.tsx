import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { tools } from "../data/tools";
import { generateContent } from "../services/gemini";

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

import {
  Loader2,
  Copy,
  Check,
  AlertCircle,
  Sparkles
} from "lucide-react";

export function ToolPage() {

const { toolId } = useParams();

const tool = tools.find((t) => t.id === toolId);

const [formData, setFormData] = useState<Record<string, string>>({});
const [result, setResult] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");
const [copied, setCopied] = useState(false);

useEffect(() => {
setFormData({});
setResult("");
setError("");
}, [toolId]);

/* TOOL NOT FOUND */

if (!tool) {
return <Navigate to="/404" />;
}

/* FILE TOOL ROUTER */

const fileToolMap:any = {
"svg-to-png": <SvgToPng />,
"png-to-jpg": <PngToJpg />,
"webp-to-png": <WebpToPng />,
"image-compressor": <ImageCompressor />,
"image-to-pdf": <ImageToPdf />,
"jpg-to-pdf": <JpgToPdf />,
"merge-pdf": <MergePdf />,
"split-pdf": <SplitPdf />,
"pdf-to-image": <PdfToImage />
};

if (fileToolMap[tool.id]) {

return (
<>
<SEOHead
title={`${tool.name} - Free Tool`}
description={tool.description}
/>

<div className="max-w-4xl mx-auto">
{fileToolMap[tool.id]}
</div>
</>
);

}

/* INPUT CHANGE */

const handleInputChange = (name: string, value: string) => {

setFormData((prev) => ({
...prev,
[name]: value
}));

};

/* SUBMIT */

const handleSubmit = async (e: React.FormEvent) => {

e.preventDefault();

setIsLoading(true);
setError("");
setResult("");

try {

let prompt = tool.promptTemplate;

let missingFields: string[] = [];

tool.inputs?.forEach((input) => {

const value = formData[input.name];

if (!value) {
missingFields.push(input.label);
}

prompt = prompt.replace(`{{${input.name}}}`, value || "");

});

if (missingFields.length > 0) {
throw new Error(`Please fill in all fields: ${missingFields.join(", ")}`);
}

const generatedText = await generateContent(prompt);

setResult(generatedText);

} catch (err: any) {

setError(err.message || "Something went wrong");

} finally {

setIsLoading(false);

}

};

/* COPY RESULT */

const copyToClipboard = () => {

navigator.clipboard.writeText(result);

setCopied(true);

setTimeout(() => setCopied(false), 2000);

};

/* AI TOOL UI */

return (

<>

<SEOHead
title={`${tool.name} - Free AI Tool`}
description={tool.description}
keywords={`ai tool, ${tool.name.toLowerCase()}, free ai generator`}
/>

<div className="max-w-4xl mx-auto">

<div className="text-center mb-8">

<div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-xl mb-4 text-indigo-600">
<tool.icon className="w-8 h-8" />
</div>

<h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
{tool.name}
</h1>

<p className="text-slate-600 text-lg max-w-2xl mx-auto">
{tool.description}
</p>

</div>

<div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

<div className="p-6 md:p-8">

<form onSubmit={handleSubmit} className="space-y-6">

<div className="grid grid-cols-1 gap-6">

{tool.inputs?.map((input) => (

<div key={input.name}>

<label className="block text-sm font-medium text-slate-700 mb-2">
{input.label}
</label>

{input.type === "textarea" ? (

<textarea
className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
placeholder={input.placeholder}
value={formData[input.name] || ""}
onChange={(e) =>
handleInputChange(input.name, e.target.value)
}
/>

) : input.type === "select" ? (

<select
className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
value={formData[input.name] || ""}
onChange={(e) =>
handleInputChange(input.name, e.target.value)
}
>

<option value="">Select an option</option>

{input.options?.map((opt) => (
<option key={opt} value={opt}>
{opt}
</option>
))}

</select>

) : (

<input
type="text"
className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
placeholder={input.placeholder}
value={formData[input.name] || ""}
onChange={(e) =>
handleInputChange(input.name, e.target.value)
}
/>

)}

</div>

))}

</div>

{error && (

<div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2 text-sm">
<AlertCircle className="w-4 h-4" />
{error}
</div>

)}

<button
type="submit"
disabled={isLoading}
className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2"
>

{isLoading ? (

<>
<Loader2 className="w-5 h-5 animate-spin" />
Generating...
</>

) : (

<>
<Sparkles className="w-5 h-5" />
Generate Content
</>

)}

</button>

</form>

</div>

{result && (

<div className="border-t border-slate-100 bg-slate-50 p-6 md:p-8">

<div className="flex items-center justify-between mb-4">

<h3 className="font-bold text-slate-800 flex items-center gap-2">
<Check className="w-5 h-5 text-green-500" />
Generated Result
</h3>

<button
onClick={copyToClipboard}
className="text-slate-500 hover:text-indigo-600 flex items-center gap-1 text-sm font-medium"
>

{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
{copied ? "Copied!" : "Copy Text"}

</button>

</div>

<div className="bg-white p-6 rounded-xl border border-slate-200 whitespace-pre-wrap text-sm text-slate-700">
{result}
</div>

</div>

)}

</div>

<AdPlaceholder slot="content" className="mt-8" />

</div>

</>

);

}
