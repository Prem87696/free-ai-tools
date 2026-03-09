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

<FileToolUI
title="PDF to Image"
description="Convert PDF page to image"
accept="application/pdf"
onFileChange={handleFile}
downloadUrl={img}
/>

)

}
