 export async function openaiGenerate(prompt: string){

try{

/* ✅ VITE ENV FIX */
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY

if(!API_KEY){
console.error("❌ OPENAI API KEY missing")
return null
}

const res = await fetch(
"https://api.openai.com/v1/chat/completions",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${API_KEY}`
},
body: JSON.stringify({
model:"gpt-4o-mini",
messages:[
{ role:"user", content:prompt }
],
temperature:0.7
})
}
)

/* ❌ RESPONSE FAIL */
if(!res.ok){
const errText = await res.text()
console.error("❌ OpenAI API Error:", errText)
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

console.error("❌ OpenAI Fetch Error:", error)

return null

}

}
