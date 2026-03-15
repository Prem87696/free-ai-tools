import React,{useState} from "react"
import * as pdfjs from "pdfjs-dist"
import FileToolUI from "../FileToolUI"

export default function PdfToImage(){

const [img,setImg]=useState<string | null>(null)

const handleFile=async(e:any)=>{

const file=e.target.files[0]

const buffer=await file.arrayBuffer()

const pdf=await pdfjs.getDocument({data:buffer}).promise

const page=await pdf.getPage(1)

const viewport=page.getViewport({scale:2})

const canvas=document.createElement("canvas")

const ctx=canvas.getContext("2d")

canvas.width=viewport.width
canvas.height=viewport.height

await page.render({
canvasContext:ctx!,
viewport
}).promise

setImg(canvas.toDataURL("image/png"))

}

return(

<>

<FileToolUI
title="PDF to Image"
description="Convert PDF pages into high quality images instantly"
accept="application/pdf"
onFileChange={handleFile}
downloadUrl={img}
/>

{/* DESCRIPTION + FAQ */}

<section className="mt-16 border-t pt-10">

<h2 className="text-2xl font-bold mb-4">
About PDF to Image Converter
</h2>

<p className="text-slate-600 mb-4">
PDF to Image Converter is a powerful online tool that allows users to
convert PDF documents into high-quality image files quickly and easily.
This tool extracts pages from a PDF document and converts them into
image format such as PNG, making it ideal for presentations, reports,
documentation, and design purposes.
</p>

<p className="text-slate-600 mb-4">
Many users need to convert PDF pages into images for sharing on social
media, embedding into documents, or using them in presentations.
This converter provides a simple and fast solution that works directly
in your browser without installing any software.
</p>

<p className="text-slate-600 mb-6">
All processing happens locally inside your browser which ensures that
your documents remain private and secure. Files are not uploaded to any
external servers, making the tool both safe and fast.
</p>

<h3 className="text-xl font-semibold mb-3">
How to Use This Tool
</h3>

<ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
<li>Select a PDF document from your device.</li>
<li>The tool automatically processes the first page of the PDF.</li>
<li>The page is converted into a high-quality image.</li>
<li>Download the generated image instantly.</li>
</ul>

<h3 className="text-xl font-semibold mb-3">
Features
</h3>

<ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
<li>Convert PDF pages to PNG images</li>
<li>High resolution image output</li>
<li>Fast browser-based conversion</li>
<li>No file upload required</li>
<li>Secure and privacy-friendly processing</li>
<li>Works in all modern browsers</li>
</ul>

<h3 className="text-xl font-semibold mb-3">
Frequently Asked Questions
</h3>

<p className="mb-3">
<strong>Is this PDF to Image tool free?</strong><br/>
Yes, the tool is completely free and works directly in your browser.
</p>

<p className="mb-3">
<strong>Are my PDF files uploaded to a server?</strong><br/>
No. All processing happens locally in your browser which keeps your
documents private and secure.
</p>

<p className="mb-3">
<strong>Which image format will I get?</strong><br/>
The converted output will be a high-quality PNG image.
</p>

<p>
<strong>Can I convert multiple PDF pages?</strong><br/>
Currently the tool converts the first page of the PDF into an image.
</p>

</section>

</>

)

}
