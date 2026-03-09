import React,{useRef,useState,useEffect} from "react"
import { Upload, X, Loader2 } from "lucide-react"

export default function FileToolUI({
title,
description,
accept,
onFileChange,
onConvert,
downloadUrl,
multiple
}:any){

const fileRef=useRef<any>(null)

const [preview,setPreview]=useState<string | null>(null)
const [fileSize,setFileSize]=useState<number | null>(null)
const [convertedSize,setConvertedSize]=useState<number | null>(null)

const [loading,setLoading]=useState(false)
const [progress,setProgress]=useState(0)

const formatSize=(bytes:number)=>{
if(bytes<1024) return bytes+" B"
if(bytes<1024*1024) return (bytes/1024).toFixed(2)+" KB"
return (bytes/(1024*1024)).toFixed(2)+" MB"
}

const handleFile=(e:any)=>{

const file=e.target.files[0]

if(!file)return

setFileSize(file.size)

onFileChange(e)

const reader=new FileReader()

reader.onload=()=>{

setPreview(reader.result as string)

}

reader.readAsDataURL(file)

}

const handleDrop=(e:any)=>{

e.preventDefault()

const file=e.dataTransfer.files[0]

if(!file)return

const event={target:{files:[file]}}

handleFile(event)

}

const removeFile=()=>{

setPreview(null)
setFileSize(null)
setConvertedSize(null)

}

const convert=async()=>{

if(!onConvert)return

setLoading(true)
setProgress(30)

await new Promise(r=>setTimeout(r,200))

setProgress(60)

await onConvert()

setProgress(100)
setLoading(false)

}

useEffect(()=>{

if(downloadUrl){

fetch(downloadUrl)
.then(r=>r.blob())
.then(blob=>{
setConvertedSize(blob.size)
})

}

},[downloadUrl])

const compressionPercent=()=>{

if(!fileSize || !convertedSize) return null

const saved=fileSize-convertedSize

return ((saved/fileSize)*100).toFixed(1)

}

return(

<div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">

<h1 className="text-3xl font-bold text-slate-900 mb-2">
{title}
</h1>

<p className="text-slate-500 mb-6">
{description}
</p>

{/* Upload */}

{!preview && (

<div
onDragOver={(e)=>e.preventDefault()}
onDrop={handleDrop}
onClick={()=>fileRef.current.click()}
className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-indigo-500 mb-8"
>

<Upload className="mx-auto mb-3 text-slate-400" size={40}/>

<p className="text-slate-500">
Drag & Drop file here or click to upload
</p>

<input
type="file"
accept={accept}
multiple={multiple}
ref={fileRef}
onChange={handleFile}
className="hidden"
/>

</div>

)}

{/* Preview */}

{preview && (

<div className="grid md:grid-cols-2 gap-10 items-start mb-6">

{/* Before */}

<div className="text-center relative">

<p className="font-semibold mb-3">
Uploaded File
</p>

<img
src={preview}
className="max-h-72 mx-auto rounded-lg border"
/>

{fileSize && (

<p className="text-sm text-slate-500 mt-2">
Size: {formatSize(fileSize)}
</p>

)}

<button
onClick={removeFile}
className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
>

<X size={14}/>

</button>

</div>

{/* After */}

<div className="text-center">

{downloadUrl ? (

<>

<p className="font-semibold mb-3">
Converted Result
</p>

<img
src={downloadUrl}
className="max-h-72 mx-auto rounded-lg border"
/>

{convertedSize && (

<p className="text-sm text-slate-500 mt-2">
Size: {formatSize(convertedSize)}
</p>

)}

{compressionPercent() && (

<p className="text-green-600 font-semibold mt-2">
Saved {compressionPercent()}%
</p>

)}

<a
href={downloadUrl}
download
className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-lg"
>

Download File

</a>

</>

) : (

<button
onClick={convert}
className="bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 mt-16"
>

{loading ? <Loader2 className="animate-spin" size={18}/> : null}

Convert

</button>

)}

</div>

</div>

)}

{/* Progress */}

{loading && (

<div className="w-full bg-slate-200 rounded-full h-2">

<div
style={{width:`${progress}%`}}
className="bg-indigo-600 h-2 rounded-full transition-all"
/>

</div>

)}

</div>

)

}
