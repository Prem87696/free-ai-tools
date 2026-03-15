import React,{useState} from "react";
import FileToolUI from "../FileToolUI";

export default function WebpToPng(){

const [png,setPng]=useState<string | null>(null)

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
title="WEBP to PNG"
description="Convert WEBP images into high quality PNG files instantly"
accept="image/webp"
onFileChange={handleFile}
downloadUrl={png}
/>

{/* DESCRIPTION + FAQ */}

<section className="mt-16 border-t pt-10">

<h2 className="text-2xl font-bold mb-4">
About WEBP to PNG Converter
</h2>

<p className="text-slate-600 mb-4">
WEBP to PNG Converter is a fast and easy online tool that allows users
to convert WEBP images into PNG format instantly. WEBP is a modern
image format developed by Google that provides better compression
for web images, while PNG format is widely supported and commonly
used for graphics, icons, and transparent images.
</p>

<p className="text-slate-600 mb-4">
Many designers, developers, and content creators need to convert
WEBP images into PNG format for compatibility with software tools,
image editors, presentations, and graphic design projects. This tool
makes the conversion process simple and fast.
</p>

<p className="text-slate-600 mb-6">
All file processing happens locally inside your browser which ensures
your images remain private and secure. The conversion is performed
directly on your device without uploading files to external servers.
</p>

<h3 className="text-xl font-semibold mb-3">
How to Use This Tool
</h3>

<ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
<li>Select a WEBP image from your device.</li>
<li>The tool automatically converts the image to PNG format.</li>
<li>Preview the converted PNG image.</li>
<li>Download the generated PNG file instantly.</li>
</ul>

<h3 className="text-xl font-semibold mb-3">
Features
</h3>

<ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
<li>Convert WEBP images to PNG format</li>
<li>High quality PNG export</li>
<li>Fast browser based conversion</li>
<li>No server upload required</li>
<li>Secure and privacy friendly</li>
<li>Works in all modern browsers</li>
</ul>

<h3 className="text-xl font-semibold mb-3">
Frequently Asked Questions
</h3>

<p className="mb-3">
<strong>Is this WEBP to PNG converter free?</strong><br/>
Yes, this tool is completely free and accessible directly in your browser.
</p>

<p className="mb-3">
<strong>Are my images uploaded to a server?</strong><br/>
No. All processing happens locally inside your browser which keeps
your files private and secure.
</p>

<p className="mb-3">
<strong>Will the image quality remain the same?</strong><br/>
Yes. The tool converts the WEBP image into a high quality PNG format.
</p>

<p>
<strong>Why convert WEBP to PNG?</strong><br/>
PNG format offers broader compatibility with many applications,
design tools, and operating systems.
</p>

</section>

</>

)

}
