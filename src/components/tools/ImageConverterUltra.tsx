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
const [width,setWidth] = useState<number | null>(null)

const [rotate,setRotate] = useState(0)
const [flipH,setFlipH] = useState(false)
const [flipV,setFlipV] = useState(false)

const fileInputRef = useRef<HTMLInputElement>(null)

/* open picker */

const openPicker=()=>{
fileInputRef.current?.click()
}

/* handle files */

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

/* convert single */

const convertImage = async(img:Img)=>{

const image=new Image()
image.src=img.preview

await new Promise(res=>image.onload=res)

const canvas=document.createElement("canvas")

let w=image.width
let h=image.height

if(width){
w=width
h=image.height*(width/image.width)
}

canvas.width=w
canvas.height=h

const ctx=canvas.getContext("2d")

ctx?.save()

ctx?.translate(w/2,h/2)

if(flipH) ctx?.scale(-1,1)
if(flipV) ctx?.scale(1,-1)

ctx?.rotate((rotate*Math.PI)/180)

ctx?.drawImage(image,-w/2,-h/2,w,h)

ctx?.restore()

const mime = format === "jpeg"
? "image/jpeg"
: `image/${format}`

const converted=canvas.toDataURL(mime,quality)

const blob=await (await fetch(converted)).blob()

return {
...img,
converted,
convertedSize:blob.size
}

}

/* convert all */

const convertAll=async()=>{

const updated:Img=[]

for(const img of images){

const c = await convertImage(img)

updated.push(c)

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

/* download zip */

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

/* remove */

const remove=(i:number)=>{
setImages(images.filter((_,x)=>x!==i))
}

return(

<div className="bg-white border border-slate-200 rounded-2xl p-8">

<h2 className="text-2xl font-bold mb-6">
Ultra Image Converter
</h2>

{/* Upload */}

<div
className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition"
onClick={openPicker}
onDrop={(e)=>{
e.preventDefault()
handleFiles(e.dataTransfer.files)
}}
onDragOver={(e)=>e.preventDefault()}
>

<div className="text-5xl mb-4">📁</div>

<h3 className="text-lg font-semibold text-slate-700">
Upload Images
</h3>

<p className="text-slate-500 mt-1">
Drag & Drop OR Click to Upload
</p>

<p className="text-xs text-slate-400 mt-2">
PNG • JPG • JPEG • WEBP • GIF • BMP • TIFF
</p>

<input
ref={fileInputRef}
type="file"
multiple
accept=".png,.jpg,.jpeg,.webp,.gif,.bmp,.tiff"
onChange={(e)=>{
if(e.target.files) handleFiles(e.target.files)
}}
className="hidden"
/>

</div>

{/* Controls */}

<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

<div>

<label className="text-sm font-medium">
Format
</label>

<select
value={format}
onChange={(e)=>setFormat(e.target.value)}
className="w-full border rounded-lg px-3 py-2 mt-1"

>

<option value="webp">WEBP</option>
<option value="png">PNG</option>
<option value="jpeg">JPG</option>
<option value="gif">GIF</option>
<option value="bmp">BMP</option>

</select>

</div>

<div>

<label className="text-sm font-medium">
Quality {Math.round(quality*100)}%
</label>

<input
type="range"
min="0.1"
max="1"
step="0.1"
value={quality}
onChange={(e)=>setQuality(Number(e.target.value))}
className="w-full"
/>

</div>

<div>

<label className="text-sm font-medium">
Resize Width
</label>

<input
type="number"
placeholder="optional"
onChange={(e)=>setWidth(Number(e.target.value))}
className="w-full border rounded-lg px-3 py-2 mt-1"
/>

</div>

<div>

<label className="text-sm font-medium">
Rotate
</label>

<select
value={rotate}
onChange={(e)=>setRotate(Number(e.target.value))}
className="w-full border rounded-lg px-3 py-2 mt-1"

>

<option value="0">0°</option>
<option value="90">90°</option>
<option value="180">180°</option>
<option value="270">270°</option>

</select>

</div>

</div>

{/* Flip Controls */}

<div className="flex gap-4 mt-4">

<button
onClick={()=>setFlipH(!flipH)}
className="border px-4 py-2 rounded-lg"

>

Flip Horizontal </button>

<button
onClick={()=>setFlipV(!flipV)}
className="border px-4 py-2 rounded-lg"

>

Flip Vertical </button>

</div>

<button
onClick={convertAll}
className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"

>

Convert Images </button>

{/* Preview */}

<div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6">

{images.map((img,i)=>(

<div key={i} className="border rounded-xl p-4 shadow-sm">

<img
src={img.preview}
className="rounded-lg mb-3 w-full object-cover"
/>

<p className="text-xs text-slate-500">
Original {(img.originalSize/1024).toFixed(1)} KB
</p>

{img.converted &&(

<>

<img
src={img.converted}
className="rounded-lg mt-2 border"
/>

<p className="text-sm text-green-600">
Converted {(img.convertedSize!/1024).toFixed(1)} KB
</p>

</>

)}

<div className="flex gap-2 mt-3">

{img.converted &&(

<button
onClick={()=>download(img.converted!,`image.${format}`)}
className="bg-indigo-600 text-white px-3 py-1 rounded"

>

Download </button>

)}

<button
onClick={()=>remove(i)}
className="text-red-500 text-sm"

>

Remove </button>

</div>

</div>

))}

</div>

{/* ZIP */}

{images.some(i=>i.converted) &&(

<button
onClick={downloadAll}
className="mt-8 bg-black text-white px-6 py-2 rounded-lg"

>

Download All (ZIP) </button>

)}

</div>

)

}
