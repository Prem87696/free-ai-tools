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

<FileToolUI
title="Merge PDF"
description="Merge multiple PDF files into one"
accept="application/pdf"
multiple
onFileChange={handleFile}
onConvert={convert}
downloadUrl={pdf}
/>

)

}
