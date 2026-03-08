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

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[{text:prompt}]
}
]
})
}
)

const data = await response.json()

const result =
data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response"

return res.json({
provider:"gemini",
result
})

}catch(err){

console.error(err)

return res.status(500).json({
error:"AI generation failed"
})

}

}
