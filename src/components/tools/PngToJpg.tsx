import React,{useState} from "react";
import FileToolUI from "../FileToolUI";

export default function PngToJpg(){

const [jpg,setJpg]=useState<string | null>(null)

const handleFile=(e:any)=>{

const file=e.target.files[0]

const reader=new FileReader()

reader.onload=()=>{

const img=new Image()

img.onload=()=>{

const canvas=document.createElement("canvas")
canvas.width=img.width
canvas.height=img.height

const ctx=canvas.getContext("2d")

/* white background for transparent PNG */

ctx!.fillStyle="#ffffff"
ctx!.fillRect(0,0,canvas.width,canvas.height)

ctx?.drawImage(img,0,0)

setJpg(canvas.toDataURL("image/jpeg",0.95))

}

img.src=reader.result as string

}

reader.readAsDataURL(file)

}

return(

<>

<FileToolUI
title="PNG to JPG"
description="Convert PNG images into high quality JPG files instantly"
accept="image/png"
onFileChange={handleFile}
downloadUrl={jpg}
/>

{/* DESCRIPTION + FAQ */}

<section className="mt-16 border-t pt-10">

<h2 className="text-2xl font-bold mb-4">
About PNG to JPG Converter
</h2>

<p className="text-slate-600 mb-4">
PNG to JPG Converter is a fast and easy online tool that allows users
to convert PNG images into JPG format instantly. The conversion process
happens directly inside your browser without uploading files to any
external server.
</p>

<p className="text-slate-600 mb-4">
PNG images often contain transparency and larger file sizes, while JPG
format provides smaller file sizes and better compatibility for websites,
email attachments, and social media sharing. Converting PNG images to
JPG helps reduce file size while maintaining good visual quality.
</p>

<p className="text-slate-600 mb-6">
This tool is especially useful for designers, developers, students,
and professionals who need quick image format conversion without
installing software or using complex editing tools.
</p>

<h3 className="text-xl font-semibold mb-3">
How to Use This Tool
</h3>

<ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
<li>Select a PNG image from your device.</li>
<li>The tool automatically converts the image to JPG format.</li>
<li>Preview the converted image instantly.</li>
<li>Download the generated JPG file.</li>
</ul>

<h3 className="text-xl font-semibold mb-3">
Features
</h3>

<ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
<li>Convert PNG images to JPG format</li>
<li>Fast browser based conversion</li>
<li>No server upload required</li>
<li>High quality image output</li>
<li>Simple and easy to use interface</li>
<li>Works on all modern browsers</li>
</ul>

<h3 className="text-xl font-semibold mb-3">
Frequently Asked Questions
</h3>

<p className="mb-3">
<strong>Is this PNG to JPG converter free?</strong><br/>
Yes, this tool is completely free and works directly in your browser.
</p>

<p className="mb-3">
<strong>Are my images uploaded to a server?</strong><br/>
No. All image processing happens locally in your browser which ensures
your files remain private.
</p>

<p className="mb-3">
<strong>Why does the background become white?</strong><br/>
PNG images support transparency while JPG format does not. Transparent
areas are automatically replaced with a white background during conversion.
</p>

<p>
<strong>Will the image quality change?</strong><br/>
The tool maintains high image quality while converting the file to JPG format.
</p>

</section>

</>

)

}
