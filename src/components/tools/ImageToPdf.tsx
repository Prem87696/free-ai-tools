import React,{useState} from "react"
import {jsPDF} from "jspdf"
import FileToolUI from "../FileToolUI"

export default function ImageToPdf(){

const [img,setImg]=useState<any>(null)
const [pdf,setPdf]=useState<string | null>(null)

const handleFile=(e:any)=>{

const reader=new FileReader()

reader.onload=()=>setImg(reader.result)

reader.readAsDataURL(e.target.files[0])

}

const convert=()=>{

const pdfDoc=new jsPDF()

pdfDoc.addImage(img,"JPEG",10,10,180,160)

const blob=pdfDoc.output("blob")

setPdf(URL.createObjectURL(blob))

}

return(

<> <FileToolUI
title="Image to PDF"
description="Convert images into high-quality PDF files instantly"
accept="image/*"
onFileChange={handleFile}
onConvert={convert}
downloadUrl={pdf}
/>

{/* DESCRIPTION + FAQ */}

<section className="mt-16 border-t pt-10">

<h2 className="text-2xl font-bold mb-4">
About Image to PDF Converter
</h2>

<p className="text-slate-600 mb-4">
Image to PDF Converter is a simple and powerful online tool that allows
users to convert images into PDF documents instantly. This tool works
directly inside your browser and does not require any software installation.
Users can upload an image and generate a downloadable PDF file within seconds.
</p>

<p className="text-slate-600 mb-4">
The converter is useful for students, professionals, designers, and
business users who need to quickly transform image files into portable
PDF documents. Whether you want to submit assignments, create reports,
or store scanned images as PDF files, this tool provides a fast solution.
</p>

<p className="text-slate-600 mb-6">
All image processing happens locally inside your browser which means
your files are never uploaded to external servers. This makes the
tool faster and more privacy-friendly compared to many online converters.
</p>

<h3 className="text-xl font-semibold mb-3">
How to Use This Tool
</h3>

<ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
<li>Select or upload an image file from your device.</li>
<li>Click the convert button to generate the PDF file.</li>
<li>The tool will process the image and create a PDF document.</li>
<li>Download the generated PDF file instantly.</li>
</ul>

<h3 className="text-xl font-semibold mb-3">
Features
</h3>

<ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
<li>Fast image to PDF conversion</li>
<li>Works directly inside your browser</li>
<li>No file upload to external servers</li>
<li>High quality PDF output</li>
<li>Simple and easy to use interface</li>
</ul>

<h3 className="text-xl font-semibold mb-3">
Frequently Asked Questions
</h3>

<p className="mb-3">
<strong>Is this tool free to use?</strong><br/>
Yes, this Image to PDF converter is completely free and accessible from any browser.
</p>

<p className="mb-3">
<strong>Are my images uploaded to a server?</strong><br/>
No. All images are processed locally in your browser which keeps your files private.
</p>

<p className="mb-3">
<strong>Which image formats are supported?</strong><br/>
Most common formats including JPG, PNG, JPEG and WEBP images are supported.
</p>

<p>
<strong>Will the image quality change?</strong><br/>
The tool keeps the image quality high while converting it into a PDF file.
</p>

</section>

</>

)

}
