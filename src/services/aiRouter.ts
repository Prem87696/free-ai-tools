import { geminiGenerate } from "./gemini"
 
import { getCache, setCache } from "./cache"

export async function generateContent(prompt: string){

const cached = getCache(prompt)

if(cached) return cached

let result:any = null

try{
result = await geminiGenerate(prompt)
}catch{}

if(!result){
try{
result = await openaiGenerate(prompt)
}catch{}
}

if(!result){
try{
result = await grokGenerate(prompt)
}catch{}
}

if(!result){
result = "Server busy. Please try again."
}

setCache(prompt,result)

return result

}
