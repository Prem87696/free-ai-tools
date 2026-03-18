export async function groqGenerate(prompt: string){

try{

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
model:"mixtral-8x7b-32768", // ✅ UPDATED MODEL
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

if(!res.ok){

const err = await res.text()
console.error("❌ Groq Response Error:", err)

return null
}

const data = await res.json()

return data?.choices?.[0]?.message?.content || null

}catch(error){

console.error("❌ Groq API Error:", error)

return null

}

}
