import { geminiGenerate } from "./gemini"
import { getCache, setCache } from "./cache"

export async function generateContent(prompt: string){

const cached = getCache(prompt)

if(cached){
console.log("CACHE HIT")
return cached
}

console.log("CACHE MISS")

let result:any = null

try{
result = await geminiGenerate(prompt)
}catch{}

if(!result){
result = "Server busy. Please try again."
}

setCache(prompt,result)

return result

}
