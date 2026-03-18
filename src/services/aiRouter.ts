import { geminiGenerate } from "./gemini"
import { openaiGenerate } from "./openai"
import { huggingfaceGenerate } from "./huggingface"

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

/* 🔥 HUGGINGFACE (PRIMARY) */
try{
console.log("🚀 TRY HUGGINGFACE")

const res = await huggingfaceGenerate(prompt)

if(res && res.trim()){
console.log("✅ HF SUCCESS")
result = res
}else{
console.log("❌ HF EMPTY")
}

}catch(err){
console.error("❌ HF ERROR:", err)
}

/* 🔥 GEMINI (BACKUP) */
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

/* 🔥 OPENAI (FINAL BACKUP) */
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
