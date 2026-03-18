 import { geminiGenerate } from "./gemini"
import { openaiGenerate } from "./openai"
import { groqGenerate } from "./groq"

import { getCache, setCache } from "./cache"

export async function generateContent(prompt: string){

/* 🛑 EMPTY PROMPT PROTECTION */
if(!prompt || !prompt.trim()){
return "Please enter valid input"
}

/* ✅ CACHE CHECK */
const cached = getCache(prompt)

if(cached){
console.log("✅ CACHE HIT")
return cached
}

console.log("❌ CACHE MISS")

let result:string | null = null

/* 🔥 TRY 1: GROQ (FASTEST) */
try{
const res = await groqGenerate(prompt)
if(res && res.trim()) result = res
}catch(err){
console.error("❌ Groq Error:", err)
}

/* 🔥 TRY 2: GEMINI */
if(!result){
try{
const res = await geminiGenerate(prompt)
if(res && res.trim()) result = res
}catch(err){
console.error("❌ Gemini Error:", err)
}
}

/* 🔥 TRY 3: OPENAI */
if(!result){
try{
const res = await openaiGenerate(prompt)
if(res && res.trim()) result = res
}catch(err){
console.error("❌ OpenAI Error:", err)
}
}

/* ❌ FINAL FAIL SAFE */
if(!result){
result = "⚠️ Server busy. Please try again."
}

/* ✅ SAVE CACHE */
try{
setCache(prompt,result)
}catch(err){
console.error("Cache Save Error:", err)
}

return result

}
