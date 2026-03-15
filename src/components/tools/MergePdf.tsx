import React,{useState} from "react"
import {PDFDocument} from "pdf-lib"
import FileToolUI from "../FileToolUI"

export default function MergePdf(){

const [files,setFiles]=useState<any>(null)
const [pdf,setPdf]=useState<string | null>(null)

const handleFile=(e:any)=>{
setFiles(e.target.files)
}

const convert=async()=>{

if(!files || files.length===0) return

const mergedPdf=await PDFDocument.create()

for(let file of files){

const bytes=await file.arrayBuffer()

const pdf=await PDFDocument.load(bytes)

const pages=await mergedPdf.copyPages(pdf,pdf.getPageIndices())

pages.forEach(page=>mergedPdf.addPage(page))

}

const finalPdf=await mergedPdf.save()

const blob=new Blob([finalPdf],{type:"application/pdf"})

setPdf(URL.createObjectURL(blob))

}

return(

<>

<FileToolUI
title="Merge PDF"
description="Merge multiple PDF files into a single document instantly"
accept="application/pdf"
multiple
onFileChange={handleFile}
onConvert={convert}
downloadUrl={pdf}
/>

{/* DESCRIPTION + FAQ */}

<section className="mt-16 border-t pt-10">

<h2 className="text-2xl font-bold mb-4">
About Merge PDF Tool
</h2>

<p className="text-slate-600 mb-4">
Merge PDF is a powerful online tool that allows users to combine multiple
PDF documents into a single file quickly and efficiently. This tool is
designed to simplify document management by enabling users to organize
and merge several PDF files into one consolidated document.
</p>

<p className="text-slate-600 mb-4">
Many professionals, students, and office users frequently need to merge
multiple PDF files such as reports, scanned documents, invoices, or
presentation materials. This tool provides a convenient solution for
combining those files into one unified PDF document.
</p>

<p className="text-slate-600 mb-6">
All processing is performed directly inside your browser which ensures
your files remain private and secure. Your documents are never uploaded
to external servers, making the tool fast, reliable, and privacy-friendly.
</p>

<h3 className="text-xl font-semibold mb-3">
How to Use This Tool
</h3>

<ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
<li>Select multiple PDF files from your device.</li>
<li>Click the merge button to combine the files.</li>
<li>The tool will process the PDFs and merge all pages.</li>
<li>Download the final merged PDF document.</li>
</ul>

<h3 className="text-xl font-semibold mb-3">
Features
</h3>

<ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
<li>Merge multiple PDF files into one document</li>
<li>Fast and secure browser-based processing</li>
<li>No server upload required</li>
<li>Works on all modern browsers</li>
<li>High quality output document</li>
<li>Simple and user friendly interface</li>
</ul>

<h3 className="text-xl font-semibold mb-3">
Frequently Asked Questions
</h3>

<p className="mb-3">
<strong>Is this PDF merge tool free?</strong><br/>
Yes, this tool is completely free and can be used directly in your browser.
</p>

<p className="mb-3">
<strong>Are my PDF files uploaded to a server?</strong><br/>
No. All files are processed locally in your browser which keeps your
documents private and secure.
</p>

<p className="mb-3">
<strong>How many PDF files can I merge?</strong><br/>
You can merge multiple PDF files depending on your device performance
and browser memory.
</p>

<p>
<strong>Will the PDF quality change after merging?</strong><br/>
No. The original quality and content of the PDF files remain unchanged.
</p>

</section>

</>

)

}
