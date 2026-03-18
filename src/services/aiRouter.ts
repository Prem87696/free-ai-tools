import { geminiGenerate } from "./gemini"
import { openaiGenerate } from "./openai"
import { groqGenerate } from "./groq"

import { getCache, setCache } from "./cache"

export async function generateContent(prompt: string){

/* 🛑 EMPTY PROMPT */
if(!prompt || !prompt.trim()){
return "Please enter valid input"
}

/* ✅ CACHE */
const cached = getCache(prompt)

if(cached){
console.log("✅ CACHE HIT")
return cached
}

console.log("❌ CACHE MISS")

let result:string | null = null

/* 🔥 GROQ */
try{
console.log("🚀 TRY GROQ")
const res = await groqGenerate(prompt)

if(res && res.trim()){
console.log("✅ GROQ SUCCESS")
result = res
}else{
console.log("❌ GROQ EMPTY")
}

}catch(err){
console.error("❌ GROQ ERROR:", err)
}

/* 🔥 GEMINI */
if(!result){
try{
console.log("🚀 TRY GEMINI")
const res = await geminiGenerate(prompt)

if(res && res.trim()){
console.log("✅ GEMINI SUCCESS")
result = res
}else{
console.log("❌ GEMINI EMPTY")
}

}catch(err){
console.error("❌ GEMINI ERROR:", err)
}
}

/* 🔥 OPENAI */
if(!result){
try{
console.log("🚀 TRY OPENAI")
const res = await openaiGenerate(prompt)

if(res && res.trim()){
console.log("✅ OPENAI SUCCESS")
result = res
}else{
console.log("❌ OPENAI EMPTY")
}

}catch(err){
console.error("❌ OPENAI ERROR:", err)
}
}

/* ❌ FINAL FAIL */
if(!result){
console.log("❌ ALL API FAILED")
result = "⚠️ Server busy. Please try again."
}

/* 💾 CACHE SAVE */
try{
setCache(prompt,result)
}catch(err){
console.error("❌ CACHE SAVE ERROR:", err)
}

return result

}
