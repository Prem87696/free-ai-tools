import React,{useState,useRef} from "react"
import * as bodyPix from "@tensorflow-models/body-pix"
import "@tensorflow/tfjs"

export default function BackgroundRemover(){

const [image,setImage]=useState<string|null>(null)
const [result,setResult]=useState<string|null>(null)
const [loading,setLoading]=useState(false)

const imgRef=useRef<HTMLImageElement>(null)
const canvasRef=useRef<HTMLCanvasElement>(null)

const upload=(e:any)=>{
const file=e.target.files[0]
if(!file) return
setImage(URL.createObjectURL(file))
setResult(null)
}

const removeBg=async()=>{

if(!imgRef.current) return

setLoading(true)

const net=await bodyPix.load({
architecture:"MobileNetV1",
outputStride:16,
multiplier:0.75
})

const segmentation=await net.segmentPerson(imgRef.current,{
flipHorizontal:false,
internalResolution:"medium",
segmentationThreshold:0.7
})

const canvas=canvasRef.current!
const ctx=canvas.getContext("2d")!

canvas.width=imgRef.current.width
canvas.height=imgRef.current.height

const mask=bodyPix.toMask(segmentation)

bodyPix.drawMask(
canvas,
imgRef.current,
mask,
1,
0,
false
)

setResult(canvas.toDataURL("image/png"))

setLoading(false)

}

const download=()=>{
if(!result) return
const a=document.createElement("a")
a.href=result
a.download="removed-background.png"
a.click()
}

return(

<div className="bg-white border border-slate-200 rounded-2xl p-8">

<h2 className="text-2xl font-bold mb-6">
AI Background Remover
</h2>

<p className="text-slate-500 mb-6">
Remove background from images using browser AI. No upload required.
</p>

<input
type="file"
accept="image/*"
onChange={upload}
className="mb-6"
/>

{image &&(

<div className="grid md:grid-cols-2 gap-6">

<div>
<p className="font-semibold mb-2">Original</p>
<img ref={imgRef} src={image} className="rounded-lg border"/>
</div>

<div>
<p className="font-semibold mb-2">Result</p>

{result?( <img src={result} className="rounded-lg border"/>
):(

<div className="h-[300px] flex items-center justify-center border rounded-lg text-slate-400">
Preview
</div>
)}

</div>

</div>

)}

<canvas ref={canvasRef} className="hidden"/>

{image &&(

<div className="flex gap-4 mt-6">

<button
onClick={removeBg}
className="bg-indigo-600 text-white px-6 py-2 rounded-lg"

>

{loading?"Processing...":"Remove Background"}

</button>

{result &&(

<button
onClick={download}
className="bg-black text-white px-6 py-2 rounded-lg"

>

Download PNG

</button>

)}

</div>

)}

</div>

)

}
