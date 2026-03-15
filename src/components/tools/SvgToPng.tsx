import React,{useState} from "react";
import FileToolUI from "../FileToolUI";

export default function SvgToPng(){

const [png,setPng]=useState<string | null>(null)

const handleFile=(e:any)=>{

const file=e.target.files[0]

const reader=new FileReader()

reader.onload=()=>{

const img=new Image()

img.onload=()=>{

const canvas=document.createElement("canvas")

canvas.width=img.width || 1024
canvas.height=img.height || 1024

const ctx=canvas.getContext("2d")

ctx!.fillStyle="#ffffff"
ctx!.fillRect(0,0,canvas.width,canvas.height)

ctx?.drawImage(img,0,0)

setPng(canvas.toDataURL("image/png"))

}

img.src=reader.result as string

}

reader.readAsDataURL(file)

}

return(

<>

<FileToolUI
title="SVG to PNG"
description="Convert SVG vector images into high quality PNG files instantly"
accept="image/svg+xml"
onFileChange={handleFile}
downloadUrl={png}
/>

{/* DESCRIPTION + FAQ */}

<section className="mt-16 border-t pt-10">

<h2 className="text-2xl font-bold mb-4">
About SVG to PNG Converter
</h2>

<p className="text-slate-600 mb-4">
SVG to PNG Converter is a fast and reliable online tool that allows
users to convert scalable vector graphics (SVG) into high quality
PNG images instantly. SVG images are vector based which means they
can scale infinitely without losing quality, while PNG images are
widely supported raster graphics used for websites, design projects,
and digital content.
</p>

<p className="text-slate-600 mb-4">
This converter helps designers, developers, and content creators
transform SVG icons, logos, and illustrations into PNG format that
can be easily shared, uploaded, or embedded into documents and
presentations.
</p>

<p className="text-slate-600 mb-6">
All processing happens directly in your browser which means your
files remain private and secure. The SVG file is never uploaded
to external servers, ensuring faster conversion and better privacy.
</p>

<h3 className="text-xl font-semibold mb-3">
How to Use This Tool
</h3>

<ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
<li>Select an SVG file from your device.</li>
<li>The tool automatically renders the SVG image.</li>
<li>The vector graphic is converted into PNG format.</li>
<li>Download the generated PNG image instantly.</li>
</ul>

<h3 className="text-xl font-semibold mb-3">
Features
</h3>

<ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
<li>Convert SVG files to PNG format</li>
<li>High quality PNG export</li>
<li>Fast browser based conversion</li>
<li>No file upload required</li>
<li>Secure and privacy friendly</li>
<li>Works in all modern browsers</li>
</ul>

<h3 className="text-xl font-semibold mb-3">
Frequently Asked Questions
</h3>

<p className="mb-3">
<strong>Is this SVG to PNG converter free?</strong><br/>
Yes, this tool is completely free and accessible directly in your browser.
</p>

<p className="mb-3">
<strong>Are my SVG files uploaded to a server?</strong><br/>
No. All files are processed locally in your browser which keeps
your data private and secure.
</p>

<p className="mb-3">
<strong>Will the image quality remain high?</strong><br/>
Yes. SVG images are vector based and the tool converts them into
high quality PNG output.
</p>

<p>
<strong>Can I use this tool for icons and logos?</strong><br/>
Yes. This tool works perfectly for converting SVG icons,
logos, and vector graphics into PNG images.
</p>

</section>

</>

)

}
