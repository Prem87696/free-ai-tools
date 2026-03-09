import React,{useRef,useState} from "react"

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

const handleFile=(e:any)=>{

const file=e.target.files[0]

if(!file)return

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

return(

<div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">

<h1 className="text-3xl font-bold text-slate-900 mb-2">
{title}
</h1>

<p className="text-slate-500 mb-6">
{description}
</p>

{/* Drag Drop Area */}

<div
onDragOver={(e)=>e.preventDefault()}
onDrop={handleDrop}
onClick={()=>fileRef.current.click()}
className="border-2 border-dashed border-slate-300 rounded-xl p-10 text-center cursor-pointer hover:border-indigo-500 mb-6"
>

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

{/* Preview Uploaded */}

{preview && (

<div className="mb-6">

<p className="font-semibold mb-2">Uploaded File</p>

<img
src={preview}
className="max-h-64 rounded-lg border"
/>

</div>

)}

{/* Convert Button */}

{onConvert && (

<button
onClick={onConvert}
className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
>

Convert

</button>

)}

{/* Converted Preview */}

{downloadUrl && (

<div className="mt-6">

<p className="font-semibold mb-2">Converted Result</p>

<img
src={downloadUrl}
className="max-h-64 rounded-lg border mb-4"
/>

<a
href={downloadUrl}
download
className="bg-green-600 text-white px-6 py-3 rounded-lg"
>

Download

</a>

</div>

)}

</div>

)

}
