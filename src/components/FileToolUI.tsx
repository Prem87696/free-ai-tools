import React,{useRef,useState} from "react"
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
const [loading,setLoading]=useState(false)

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

const removeFile=()=>{

setPreview(null)

}

const convert=async()=>{

if(!onConvert)return

setLoading(true)

await onConvert()

setLoading(false)

}

return(

<div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">

<h1 className="text-3xl font-bold text-slate-900 mb-2">
{title}
</h1>

<p className="text-slate-500 mb-6">
{description}
</p>

{/* Upload Area */}

{!preview && (

<div
onDragOver={(e)=>e.preventDefault()}
onDrop={handleDrop}
onClick={()=>fileRef.current.click()}
className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-indigo-500 transition mb-6"
>

<Upload className="mx-auto mb-3 text-slate-400" size={40} />

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

{/* Uploaded Preview */}

{preview && (

<div className="mb-6 relative">

<img
src={preview}
className="max-h-64 mx-auto rounded-lg border"
/>

<button
onClick={removeFile}
className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
>

<X size={16}/>

</button>

</div>

)}

{/* Convert Button */}

{preview && onConvert && !downloadUrl && (

<button
onClick={convert}
className="bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
>

{loading ? <Loader2 className="animate-spin" size={18}/> : null}

Convert

</button>

)}

{/* Converted Result */}

{downloadUrl && (

<div className="mt-6 text-center">

<p className="font-semibold mb-3">
Converted Result
</p>

<img
src={downloadUrl}
className="max-h-64 mx-auto rounded-lg border mb-4"
/>

<a
href={downloadUrl}
download
className="bg-green-600 text-white px-6 py-3 rounded-lg"
>

Download File

</a>

</div>

)}

</div>

)

}
