import React, { useState } from "react";
import JSZip from "jszip";

type Img = {
name:string
original:string
webp:string
originalSize:number
webpSize:number
}

export default function ImageToWebp(){

const [images,setImages] = useState<Img[]>([])
const [quality,setQuality] = useState(0.9)

const convert = (file:File)=>{

return new Promise<Img>((resolve)=>{

const img = new Image()
const reader = new FileReader()

reader.onload=e=>{
img.src=e.target?.result as string
}

reader.readAsDataURL(file)

img.onload=()=>{

const canvas=document.createElement("canvas")
canvas.width=img.width
canvas.height=img.height

const ctx=canvas.getContext("2d")
ctx?.drawImage(img,0,0)

const webp=canvas.toDataURL("image/webp",quality)

fetch(webp)
.then(r=>r.blob())
.then(blob=>{

resolve({
name:file.name.replace(/\.[^/.]+$/,"")+".webp",
original:img.src,
webp:webp,
originalSize:file.size,
webpSize:blob.size
})

})

}

})

}

const handleFiles = async(files:FileList)=>{

const list:Img[]=[]

for(const file of Array.from(files)){

if(!file.type.startsWith("image")) continue

const result = await convert(file)

list.push(result)

}

setImages(prev=>[...prev,...list])

}

const downloadAll = async()=>{

const zip=new JSZip()

images.forEach((img,i)=>{

zip.file(img.name,img.webp.split(",")[1],{base64:true})

})

const blob = await zip.generateAsync({type:"blob"})

const a=document.createElement("a")
a.href=URL.createObjectURL(blob)
a.download="webp-images.zip"
a.click()

}

const size=(s:number)=>(s/1024).toFixed(1)+" KB"

return(

<div className="bg-white border border-slate-200 rounded-2xl p-8">

<h2 className="text-2xl font-bold mb-6">
Image to WebP Converter
</h2>

{/* QUALITY */}

<div className="mb-6">

<label className="text-sm font-medium">
Quality {Math.round(quality*100)}%
</label>

<input
type="range"
min="0.1"
max="1"
step="0.1"
value={quality}
onChange={e=>setQuality(Number(e.target.value))}
className="w-full mt-2"
/>

</div>

{/* UPLOAD */}

<input
type="file"
multiple
accept="image/*"
onChange={e=>{
if(e.target.files) handleFiles(e.target.files)
}}
/>

{/* RESULTS */}

{images.length>0 &&(

<div className="mt-8 space-y-6">

{images.map((img,i)=>(

<div key={i} className="grid md:grid-cols-3 gap-6 items-center">

<img src={img.original} className="border rounded-lg"/>

<div className="text-sm">

<p>Original: {size(img.originalSize)}</p>
<p>WebP: {size(img.webpSize)}</p>

<p className="text-green-600">
Saved {(100-(img.webpSize/img.originalSize)*100).toFixed(0)}%
</p>

</div>

<div>

<a
href={img.webp}
download={img.name}
className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
>
Download
</a>

</div>

</div>

))}

<button
onClick={downloadAll}
className="mt-4 bg-black text-white px-6 py-2 rounded-lg"
>

Download All (ZIP)

</button>

</div>

)}

</div>

)

}
