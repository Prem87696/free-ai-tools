export async function huggingfaceGenerate(prompt: string){

try{

const API_KEY = import.meta.env.VITE_HF_API_KEY

if(!API_KEY){
console.error("❌ HF API KEY missing")
return null
}

const res = await fetch(
"https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${API_KEY}`
},
body: JSON.stringify({
inputs: prompt
})
}
)

if(!res.ok){

const err = await res.text()
console.error("❌ HF Error:", err)

return null
}

const data = await res.json()

/* 🔥 HF RESPONSE FIX */
if(Array.isArray(data)){
return data[0]?.generated_text || null
}

return data?.generated_text || null

}catch(error){

console.error("❌ HF FETCH ERROR:", error)

return null

}

}
