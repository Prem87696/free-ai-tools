 export async function groqGenerate(prompt: string){

try{

/* ✅ VITE ENV FIX */
const API_KEY = import.meta.env.VITE_GROQ_API_KEY

if(!API_KEY){
console.error("❌ GROQ API KEY missing")
return null
}

const res = await fetch(
"https://api.groq.com/openai/v1/chat/completions",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${API_KEY}`
},
body: JSON.stringify({
model:"llama3-8b-8192",
messages:[
{
role:"user",
content:prompt
}
],
temperature:0.7
})
}
)

/* ❌ RESPONSE FAIL */
if(!res.ok){
console.error("❌ Groq Response Error:", res.status)
return null
}

const data = await res.json()

/* ✅ SAFE RETURN */
const text = data?.choices?.[0]?.message?.content

if(!text || !text.trim()){
return null
}

return text

}catch(error){

console.error("❌ Groq API Error:", error)

return null

}

}
