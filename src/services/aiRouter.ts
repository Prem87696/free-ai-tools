import { geminiGenerate } from "./gemini"
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

/* 🔥 GEMINI (MAIN ENGINE) */
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

/* ❌ FINAL FAIL */
if(!result){
console.log("❌ ALL FAILED")
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
