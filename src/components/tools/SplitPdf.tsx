import React,{useState} from "react"
import {PDFDocument} from "pdf-lib"
import JSZip from "jszip"
import FileToolUI from "../FileToolUI"

export default function SplitPdf(){

const [file,setFile]=useState<any>(null)
const [range,setRange]=useState("")
const [zipUrl,setZipUrl]=useState<string | null>(null)

const handleFile=(e:any)=>{
setFile(e.target.files[0])
}

const splitPdf=async()=>{

if(!file) return

const bytes=await file.arrayBuffer()

const pdf=await PDFDocument.load(bytes)

const total=pdf.getPageCount()

let pages:number=[]

if(range.trim()===""){

for(let i=0;i<total;i++){
pages.push(i)
}

}else{

range.split(",").forEach(part=>{

if(part.includes("-")){

const [start,end]=part.split("-").map(Number)

for(let i=start;i<=end;i++){
pages.push(i-1)
}

}else{

pages.push(Number(part)-1)

}

})

}

const zip=new JSZip()

for(let p of pages){

const newPdf=await PDFDocument.create()

const [page]=await newPdf.copyPages(pdf,[p])

newPdf.addPage(page)

const bytes=await newPdf.save()

zip.file(`page-${p+1}.pdf`,bytes)

}

const blob=await zip.generateAsync({type:"blob"})

setZipUrl(URL.createObjectURL(blob))

}

return(

<>

<FileToolUI
title="Split PDF"
description="Split PDF pages or extract page ranges easily"
accept="application/pdf"
onFileChange={handleFile}
onConvert={splitPdf}
downloadUrl={zipUrl}
/>

<div className="mt-6">

<label className="text-sm font-medium">
Page Range (example: 1-3,5,8)
</label>

<input
type="text"
value={range}
onChange={e=>setRange(e.target.value)}
placeholder="Leave empty to split all pages"
className="w-full border rounded-lg px-4 py-2 mt-2"
/>

</div>

{/* DESCRIPTION */}

<section className="mt-16 border-t pt-10">

<h2 className="text-2xl font-bold mb-4">
About Split PDF Tool
</h2>

<p className="text-slate-600 mb-4">
Split PDF is a powerful document tool that allows users to divide
large PDF files into smaller individual documents. With this tool
you can extract specific pages or split every page into a separate
PDF file quickly and easily.
</p>

<p className="text-slate-600 mb-4">
This tool works directly inside your browser using modern web
technology which means your files never leave your device.
This ensures better privacy, faster performance, and a secure
conversion experience.
</p>

<p className="text-slate-600 mb-6">
Many professionals, students, and businesses use PDF splitting
to separate reports, extract invoices, or divide long documents
into smaller sections that are easier to share and manage.
</p>

<h3 className="text-xl font-semibold mb-3">
How to Use
</h3>

<ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
<li>Upload a PDF document.</li>
<li>Enter page range such as 1-3,5,8.</li>
<li>Click convert to split the PDF.</li>
<li>Download the extracted pages as ZIP.</li>
</ul>

<h3 className="text-xl font-semibold mb-3">
Features
</h3>

<ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
<li>Split PDF into individual pages</li>
<li>Extract custom page ranges</li>
<li>Download multiple pages as ZIP</li>
<li>Fast browser based processing</li>
<li>No server upload required</li>
</ul>

<h3 className="text-xl font-semibold mb-3">
Frequently Asked Questions
</h3>

<p className="mb-3">
<strong>Is this PDF splitter free?</strong><br/>
Yes, the tool is completely free and works directly in your browser.
</p>

<p className="mb-3">
<strong>Are my documents uploaded to a server?</strong><br/>
No. All files are processed locally inside your browser.
</p>

<p>
<strong>Can I split multiple pages?</strong><br/>
Yes. You can extract individual pages or page ranges such as 1-5 or 3,7,9.
</p>

</section>

</>

)

}
