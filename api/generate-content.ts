import { generateContent } from "../src/services/aiRouter"

export default async function handler(req:any,res:any){

if(req.method!=="POST"){
return res.status(405).json({error:"Method not allowed"})
}

try{

let body=req.body

if(typeof body==="string"){
body=JSON.parse(body)
}

const {prompt}=body||{}

const result = await generateContent(prompt)

// ✅ Vercel edge cache
res.setHeader("Cache-Control","s-maxage=86400, stale-while-revalidate")

return res.json({
provider:"ai-router",
result
})

}catch(err){

console.error(err)

return res.status(500).json({
error:"AI generation failed"
})

}

}
