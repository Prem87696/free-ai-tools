 export async function geminiGenerate(prompt: string){

try{

/* ✅ VITE ENV FIX */
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

if(!API_KEY){
console.error("❌ GEMINI API KEY missing")
return null
}

const res = await fetch(
`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
contents:[
{
parts:[
{ text: prompt }
]
}
]
})
}
)

/* ❌ RESPONSE FAIL */
if(!res.ok){
const errText = await res.text()
console.error("❌ Gemini API Error:", errText)
return null
}

const data = await res.json()

/* ✅ SAFE RETURN */
const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

if(!text || !text.trim()){
return null
}

return text

}catch(error){

console.error("❌ Gemini Fetch Error:", error)

return null

}

}
