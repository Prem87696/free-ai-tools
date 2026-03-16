import React,{useRef,useState,useEffect} from "react"
import {Upload,X,Loader2,FileText,ImageIcon,CheckCircle} from "lucide-react"

type Props={
title:string
description:string
accept?:string
onFileChange?:any
onConvert?:any
downloadUrl?:string | null
multiple?:boolean
}

export default function FileToolUI({
title,
description,
accept,
onFileChange,
onConvert,
downloadUrl,
multiple
}:Props){

const fileRef=useRef<HTMLInputElement | null>(null)

const [preview,setPreview]=useState<string | null>(null)
const [fileType,setFileType]=useState("")
const [fileName,setFileName]=useState("")
const [fileSize,setFileSize]=useState<number | null>(null)
const [convertedSize,setConvertedSize]=useState<number | null>(null)

const [loading,setLoading]=useState(false)
const [progress,setProgress]=useState(0)
const [drag,setDrag]=useState(false)

/* FORMAT SIZE */

const formatSize=(bytes:number)=>{

if(bytes<1024) return bytes+" B"

if(bytes<1024*1024) return (bytes/1024).toFixed(2)+" KB"

return (bytes/(1024*1024)).toFixed(2)+" MB"

}

/* HANDLE FILE */

const handleFile=(e:any)=>{

const file=e?.target?.files?.[0]

if(!file) return

setFileName(file.name)
setFileSize(file.size)
setFileType(file.type)

onFileChange?.(e)

if(file.type.startsWith("image")){

const reader=new FileReader()

reader.onload=()=>setPreview(reader.result as string)

reader.readAsDataURL(file)

}else{

setPreview("file")

}

}

/* DROP */

const handleDrop=(e:any)=>{

e.preventDefault()

setDrag(false)

const file=e.dataTransfer.files?.[0]

if(!file) return

handleFile({target:{files:[file]}})

}

/* REMOVE FILE */

const removeFile=()=>{

setPreview(null)
setFileType("")
setFileName("")
setFileSize(null)
setConvertedSize(null)
setProgress(0)

}

/* CONVERT */

const convert=async()=>{

if(!onConvert) return

setLoading(true)

setProgress(20)

await new Promise(r=>setTimeout(r,200))

setProgress(60)

await onConvert()

setProgress(100)

setTimeout(()=>setLoading(false),400)

}

/* CONVERTED FILE SIZE */

useEffect(()=>{

if(!downloadUrl) return

fetch(downloadUrl)
.then(r=>r.blob())
.then(blob=>setConvertedSize(blob.size))
.catch(()=>{})

},[downloadUrl])

/* COMPRESSION */

const compressionPercent=()=>{

if(!fileSize || !convertedSize) return null

const saved=fileSize-convertedSize

return ((saved/fileSize)*100).toFixed(1)

}

/* PREVIEW */

const renderPreview=(src:string,type:string)=>{

if(type.startsWith("image")){

return( <img
src={src}
className="max-h-72 mx-auto rounded-lg border"
/>
)

}

if(type.includes("pdf")){

return(

<div className="flex flex-col items-center justify-center h-48 border rounded-lg bg-slate-50">

<FileText size={46} className="text-red-500"/>

<p className="text-sm mt-2 font-medium">
PDF File
</p>

</div>

)

}

return(

<div className="flex flex-col items-center justify-center h-48 border rounded-lg bg-slate-50">

<ImageIcon size={46} className="text-slate-500"/>

<p className="text-sm mt-2 font-medium">
File Preview
</p>

</div>

)

}

/* UI */

return(

<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

<h1 className="text-3xl font-bold text-slate-900 mb-2">
{title}
</h1>

<p className="text-slate-500 mb-8">
{description}
</p>

{/* UPLOAD AREA */}

{!preview &&(

<div
onDragOver={(e)=>{e.preventDefault();setDrag(true)}}
onDragLeave={()=>setDrag(false)}
onDrop={handleDrop}
onClick={()=>fileRef.current?.click()}
className={`border-2 border-dashed rounded-xl p-14 text-center cursor-pointer transition
${drag?"border-indigo-500 bg-indigo-50":"border-slate-300"}
`}
>

<Upload className="mx-auto mb-4 text-slate-400" size={40}/>

<p className="text-slate-700 font-medium">
Drag & Drop file here
</p>

<p className="text-sm text-slate-400 mt-1">
or click to upload
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

{/* PREVIEW */}

{preview &&(

<div className="grid md:grid-cols-2 gap-10 items-start mb-6">

{/* BEFORE */}

<div className="text-center relative">

<p className="font-semibold mb-3">
Uploaded File
</p>

{renderPreview(preview,fileType)}

<p className="text-sm text-slate-600 mt-2">
{fileName}
</p>

{fileSize &&(

<p className="text-xs text-slate-400">
{formatSize(fileSize)}
</p>

)}

<button
onClick={removeFile}
className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"

>

<X size={14}/>

</button>

</div>

{/* AFTER */}

<div className="text-center">

{downloadUrl ?(

<>

<p className="font-semibold mb-3 flex items-center justify-center gap-2">

<CheckCircle size={18} className="text-green-600"/>

Converted Result

</p>

{renderPreview(downloadUrl,fileType)}

{convertedSize &&(

<p className="text-sm text-slate-500 mt-2">
{formatSize(convertedSize)}
</p>

)}

{compressionPercent() &&(

<p className="text-green-600 font-semibold mt-2">
Saved {compressionPercent()}%
</p>

)}

<a
href={downloadUrl}
download
className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"

>

Download File

</a>

</>

):(

<button
onClick={convert}
className="bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 mt-16 hover:bg-indigo-700 transition"

>

{loading && <Loader2 className="animate-spin" size={18}/>}

Convert File

</button>

)}

</div>

</div>

)}

{/* PROGRESS */}

{loading &&(

<div className="w-full bg-slate-200 rounded-full h-2 mt-4">

<div
style={{width:`${progress}%`}}
className="bg-indigo-600 h-2 rounded-full transition-all"
/>

</div>

)}

</div>

)

}
