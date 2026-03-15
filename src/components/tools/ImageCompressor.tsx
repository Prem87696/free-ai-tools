import React,{useState} from "react"
import imageCompression from "browser-image-compression"
import FileToolUI from "../FileToolUI"
import ToolDescription from "../components/ToolDescription";

export default function ImageCompressor(){

const [file,setFile]=useState<any>(null)
const [compressed,setCompressed]=useState<string | null>(null)

const handleFile=(e:any)=>{

setFile(e.target.files[0])

}

const convert=async()=>{

const options={
maxSizeMB:1,
maxWidthOrHeight:1920,
useWebWorker:true
}

const compressedFile=await imageCompression(file,options)

setCompressed(URL.createObjectURL(compressedFile))

}

return(

<FileToolUI
title="Image Compressor"
description="Reduce image size online"
accept="image/*"
onFileChange={handleFile}
onConvert={convert}
downloadUrl={compressed}
/>

)

}
