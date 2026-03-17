import { geminiGenerate } from "./gemini"
import { openaiGenerate } from "./openai"
import { groqGenerate } from "./groq"
import { getCache, setCache } from "./cache"

export async function generateContent(prompt: string){

const cached = getCache(prompt)

if(cached){
console.log("CACHE HIT")
return cached
}

console.log("CACHE MISS")

let result:any = null

/* 🔥 TRY 1: GROQ (FAST & FREE) */
try{
result = await groqGenerate(prompt)
}catch(err){
console.error("Groq Error:", err)
}

/* 🔥 TRY 2: GEMINI */
if(!result){
try{
result = await geminiGenerate(prompt)
}catch(err){
console.error("Gemini Error:", err)
}
}

/* 🔥 TRY 3: OPENAI (FINAL BACKUP) */
if(!result){
try{
result = await openaiGenerate(prompt)
}catch(err){
console.error("OpenAI Error:", err)
}
}

/* ❌ FINAL FAIL */
if(!result){
result = "Server busy. Please try again."
}

setCache(prompt,result)

return result

}
