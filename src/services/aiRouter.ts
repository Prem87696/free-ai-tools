import { geminiGenerate } from "./gemini"
import { openaiGenerate } from "./openai"
import { grokGenerate } from "./grok"
import { replicateGenerate } from "./replicate"
import { getCache,setCache } from "./cache"

export async function generateContent(prompt:string){

const cached = getCache(prompt)

if(cached) return cached

let result = await geminiGenerate(prompt)

if(!result) result = await openaiGenerate(prompt)

if(!result) result = await grokGenerate(prompt)

if(!result) result = await replicateGenerate(prompt)

if(!result) result = "Server busy. Please try again."

setCache(prompt,result)

return result

}
