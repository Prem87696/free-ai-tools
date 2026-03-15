import React,{useState,useRef} from "react"
import * as bodyPix from "@tensorflow-models/body-pix"
import "@tensorflow/tfjs"

export default function BackgroundRemover(){

const [image,setImage]=useState<string|null>(null)
const [result,setResult]=useState<string|null>(null)
const [loading,setLoading]=useState(false)

const canvasRef=useRef<HTMLCanvasElement>(null)

const upload=(e:any)=>{

const file=e.target.files[0]

if(!file) return

setImage(URL.createObjectURL(file))
setResult(null)

}

const removeBackground=async()=>{

if(!image) return

setLoading(true)

const img=new Image()
img.src=image

await new Promise(res=>img.onload=res)

const net=await bodyPix.load({
architecture:"ResNet50",
outputStride:32,
quantBytes:2
})

const segmentation=await net.segmentPerson(img,{
internalResolution:"high",
segmentationThreshold:0.7
})

const canvas=canvasRef.current!
canvas.width=img.width
canvas.height=img.height

const ctx=canvas.getContext("2d")!

ctx.drawImage(img,0,0)

const imageData=ctx.getImageData(0,0,canvas.width,canvas.height)

for(let i=0;i<segmentation.data.length;i++){

if(segmentation.data[i]===0){

imageData.data[i*4+3]=0

}

}

ctx.putImageData(imageData,0,0)

const png=canvas.toDataURL("image/png")

setResult(png)

setLoading(false)

}

const download=()=>{

if(!result) return

const a=document.createElement("a")
a.href=result
a.download="background-removed.png"
a.click()

}

return(

<div className="bg-white border border-slate-200 rounded-2xl p-8">

<h2 className="text-2xl font-bold mb-6">
Ultra AI Background Remover
</h2>

<div className="border-2 border-dashed border-slate-300 rounded-xl p-10 text-center mb-6 hover:border-indigo-500">

<input
type="file"
accept="image/*"
onChange={upload}
/>

<p className="text-sm text-slate-500 mt-3">
Upload image to remove background instantly
</p>

</div>

{image&&(

<div className="mb-6">

<h3 className="font-semibold mb-2">
Original Image
</h3>

<img
src={image}
className="rounded-lg border max-w-full"
/>

</div>

)}

<button
onClick={removeBackground}
className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
>

{loading?"Processing AI...":"Remove Background"}

</button>

<canvas ref={canvasRef} className="hidden"/>

{result&&(

<div className="mt-8">

<h3 className="font-semibold mb-3">
Result
</h3>

<img
src={result}
className="rounded-lg border mb-4"
/>

<button
onClick={download}
className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
>

Download PNG

</button>

</div>

)}

</div>

)

}
