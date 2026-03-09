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

<FileToolUI
title="Image to PDF"
description="Convert image into PDF"
accept="image/*"
onFileChange={handleFile}
onConvert={convert}
downloadUrl={pdf}
/>

)

}
