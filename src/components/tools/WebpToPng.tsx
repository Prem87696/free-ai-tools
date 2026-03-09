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

<FileToolUI
title="WEBP to PNG"
description="Convert WEBP image to PNG"
accept="image/webp"
onFileChange={handleFile}
downloadUrl={png}
/>

)

}
