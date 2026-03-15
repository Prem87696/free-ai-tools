import React,{useState} from "react";
import { jsPDF } from "jspdf";
import FileToolUI from "../FileToolUI";

export default function JpgToPdf(){

const [img,setImg]=useState<any>(null)
const [pdf,setPdf]=useState<string | null>(null)

const handleFile=(e:any)=>{

const reader=new FileReader()

reader.onload=()=>setImg(reader.result)

reader.readAsDataURL(e.target.files[0])

}

const convert=()=>{

if(!img) return

const pdfDoc=new jsPDF()

pdfDoc.addImage(img,"JPEG",10,10,180,160)

const blob=pdfDoc.output("blob")

setPdf(URL.createObjectURL(blob))

}

return(

<>

<FileToolUI
title="JPG to PDF"
description="Convert JPG images into high quality PDF documents instantly"
accept="image/jpeg"
onFileChange={handleFile}
onConvert={convert}
downloadUrl={pdf}
/>

{/* DESCRIPTION + FAQ */}

<section className="mt-16 border-t pt-10">

<h2 className="text-2xl font-bold mb-4">
About JPG to PDF Converter
</h2>

<p className="text-slate-600 mb-4">
JPG to PDF Converter is a simple and efficient online tool that allows
users to convert JPG images into professional PDF documents quickly.
This tool works directly inside your browser and does not require any
software installation or account registration.
</p>

<p className="text-slate-600 mb-4">
Many students, professionals, and office users frequently need to convert
images into PDF format for sharing, documentation, and printing purposes.
This converter provides a fast solution that transforms JPG images into
portable and universally compatible PDF files.
</p>

<p className="text-slate-600 mb-6">
All image processing happens locally inside your browser which ensures
better privacy and security. Your files are never uploaded to external
servers, making the conversion process both fast and safe.
</p>

<h3 className="text-xl font-semibold mb-3">
How to Use This Tool
</h3>

<ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
<li>Select a JPG image from your device.</li>
<li>Click the convert button to generate the PDF file.</li>
<li>The tool processes the image instantly.</li>
<li>Download the generated PDF document.</li>
</ul>

<h3 className="text-xl font-semibold mb-3">
Features
</h3>

<ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
<li>Fast JPG to PDF conversion</li>
<li>High quality PDF output</li>
<li>No server upload required</li>
<li>Privacy friendly processing</li>
<li>Works directly in modern browsers</li>
<li>Simple and easy to use interface</li>
</ul>

<h3 className="text-xl font-semibold mb-3">
Frequently Asked Questions
</h3>

<p className="mb-3">
<strong>Is this JPG to PDF converter free?</strong><br/>
Yes, the tool is completely free and accessible directly from your browser.
</p>

<p className="mb-3">
<strong>Are my images uploaded to a server?</strong><br/>
No. Images are processed locally inside your browser and are not stored on external servers.
</p>

<p className="mb-3">
<strong>What image formats are supported?</strong><br/>
This tool is specifically designed for JPG and JPEG images.
</p>

<p>
<strong>Will the image quality remain the same?</strong><br/>
The converter maintains high image quality while generating the PDF file.
</p>

</section>

</>

)

}
