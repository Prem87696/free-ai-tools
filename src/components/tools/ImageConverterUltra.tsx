import React, { useState, useRef } from "react"
import JSZip from "jszip"

type Img = {
file: File
preview: string
originalSize: number
converted?: string
convertedSize?: number
}

export default function ImageConverterUltra(){

const [images,setImages] = useState<Img[]>([])
const [format,setFormat] = useState("webp")
const [quality,setQuality] = useState(0.9)
const [zoom,setZoom] = useState(1)

const [rotate,setRotate] = useState(0)
const [flipH,setFlipH] = useState(false)
const [flipV,setFlipV] = useState(false)

const fileInputRef = useRef<HTMLInputElement>(null)

/* open picker */

const openPicker=()=>{
fileInputRef.current?.click()
}

/* upload */

const handleFiles=(files:FileList)=>{

const list:Img=[]

Array.from(files).forEach(file=>{

if(!file.type.startsWith("image")) return

list.push({
file,
preview:URL.createObjectURL(file),
originalSize:file.size
})

})

setImages(prev=>[...prev,...list])

}

/* apply transform instantly */

const applyTransform = async () => {

const updated: Img[] = []

for(const img of images){

const image = new Image()
image.src = img.preview

await new Promise(res=>image.onload=res)

const canvas = document.createElement("canvas")

let w = image.width
let h = image.height

canvas.width = w
canvas.height = h

const ctx = canvas.getContext("2d")

ctx?.save()

ctx?.translate(w/2,h/2)

ctx?.scale(zoom,zoom)

if(flipH) ctx?.scale(-1,1)
if(flipV) ctx?.scale(1,-1)

ctx?.rotate((rotate*Math.PI)/180)

ctx?.drawImage(image,-w/2,-h/2,w,h)

ctx?.restore()

const preview = canvas.toDataURL()

updated.push({
...img,
preview
})

}

setImages(updated)

}

/* convert */

const convertAll = async()=>{

const updated:Img=[]

for(const img of images){

const image=new Image()
image.src=img.preview

await new Promise(res=>image.onload=res)

const canvas=document.createElement("canvas")

canvas.width=image.width
canvas.height=image.height

const ctx=canvas.getContext("2d")

ctx?.drawImage(image,0,0)

const mime = format==="jpeg"
? "image/jpeg"
: `image/${format}`

const converted=canvas.toDataURL(mime,quality)

const blob=await (await fetch(converted)).blob()

updated.push({
...img,
converted,
convertedSize:blob.size
})

}

setImages(updated)

}

/* download */

const download=(data:string,name:string)=>{

const a=document.createElement("a")
a.href=data
a.download=name
a.click()

}

/* zip */

const downloadAll=async()=>{

const zip=new JSZip()

images.forEach((img,i)=>{

if(!img.converted) return

zip.file(`image-${i}.${format}`,img.converted.split(",")[1],{base64:true})

})

const blob=await zip.generateAsync({type:"blob"})

const a=document.createElement("a")
a.href=URL.createObjectURL(blob)
a.download="converted-images.zip"
a.click()

}

return(

<div className="max-w-6xl mx-auto px-6 py-10">

{/* HEADER */}

<div className="text-center mb-10">

<h1 className="text-4xl font-bold text-slate-900">
Ultra Image Converter
</h1>

<p className="text-slate-500 mt-2">
Convert, rotate, flip and optimize images instantly
</p>

</div>

{/* UPLOAD */}

<div
className="border-2 border-dashed border-indigo-300 rounded-2xl p-12 text-center cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition"
onClick={openPicker}
onDrop={(e)=>{
e.preventDefault()
handleFiles(e.dataTransfer.files)
}}
onDragOver={(e)=>e.preventDefault()}
>

<div className="text-5xl mb-3">📤</div>

<h3 className="text-lg font-semibold">
Drag & Drop Images
</h3>

<p className="text-sm text-slate-500 mt-1">
PNG • JPG • WEBP • GIF • BMP • TIFF
</p>

<input
ref={fileInputRef}
type="file"
multiple
accept="image/*"
onChange={(e)=>{
if(e.target.files) handleFiles(e.target.files)
}}
className="hidden"
/>

</div>

{/* TOOLBAR */}

<div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-10">

<select
value={format}
onChange={(e)=>setFormat(e.target.value)}
className="border rounded-lg px-3 py-2"

>

<option value="webp">WEBP</option>
<option value="png">PNG</option>
<option value="jpeg">JPG</option>
<option value="gif">GIF</option>
</select>

<input
type="range"
min="0.1"
max="1"
step="0.1"
value={quality}
onChange={(e)=>setQuality(Number(e.target.value))}
className="w-full"
/>

<input
type="range"
min="1"
max="3"
step="0.1"
value={zoom}
onChange={(e)=>{
setZoom(Number(e.target.value))
setTimeout(applyTransform,50)
}}
/>

<select
value={rotate}
onChange={(e)=>{
setRotate(Number(e.target.value))
setTimeout(applyTransform,50)
}}
className="border rounded-lg px-3 py-2"

>

<option value="0">0°</option>
<option value="90">90°</option>
<option value="180">180°</option>
<option value="270">270°</option>
</select>

<button
onClick={convertAll}
className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2"

>

Convert </button>

</div>

{/* FLIP */}

<div className="flex gap-4 mt-6">

<button
onClick={()=>{
setFlipH(!flipH)
setTimeout(applyTransform,50)
}}
className="border px-4 py-2 rounded-lg"

>

Flip Horizontal </button>

<button
onClick={()=>{
setFlipV(!flipV)
setTimeout(applyTransform,50)
}}
className="border px-4 py-2 rounded-lg"

>

Flip Vertical </button>

</div>

{/* PREVIEW */}

<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">

{images.map((img,i)=>(

<div key={i} className="bg-white rounded-xl shadow p-4">

<img
src={img.preview}
className="rounded-lg mb-3"
/>

<p className="text-xs text-slate-500">
{(img.originalSize/1024).toFixed(1)} KB
</p>

{img.converted &&(

<> <img
src={img.converted}
className="rounded-lg mt-2 border"
/>

<p className="text-green-600 text-sm">
{(img.convertedSize!/1024).toFixed(1)} KB
</p>

<button
onClick={()=>download(img.converted!,`image.${format}`)}
className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded"

>

Download </button>

</>

)}

</div>

))}

</div>

{/* ZIP */}

{images.some(i=>i.converted) &&(

<button
onClick={downloadAll}
className="mt-10 bg-black text-white px-6 py-3 rounded-lg"

>

Download All ZIP </button>

)}

{/* DESCRIPTION */}

<section className="mt-20 border-t pt-10">

<h2 className="text-2xl font-bold mb-4">
About Ultra Image Converter
</h2>

<p className="text-slate-600 mb-4">
Ultra Image Converter is an advanced browser based image processing tool
that allows users to convert, rotate, flip and optimize images instantly.
The tool supports multiple popular image formats including PNG, JPG, JPEG,
WEBP, GIF, BMP and TIFF.
</p>

<p className="text-slate-600 mb-6">
It is designed for designers, developers, content creators and everyday
internet users who need a fast and secure way to convert images without
installing software. All processing happens directly in your browser.
</p>

<h3 className="text-xl font-semibold mb-3">
Frequently Asked Questions
</h3>

<p className="mb-3">
<strong>Is this tool free?</strong><br/>
Yes. The tool is completely free to use without registration.
</p>

<p className="mb-3">
<strong>Are images uploaded to a server?</strong><br/>
No. All image processing happens locally in your browser.
</p>

<p>
<strong>Which formats are supported?</strong><br/>
PNG, JPG, JPEG, WEBP, GIF, BMP and TIFF.
</p>

</section>

</div>

)

}
