import { geminiGenerate } from "./gemini"
import { getCache, setCache } from "./cache"

export async function generateContent(prompt: string){

  const cached = getCache(prompt)

  if (cached) return cached

  let result: any = null

  try {
    result = await geminiGenerate(prompt)
  } catch (e) {
    console.error("Gemini error:", e)
  }

  if (!result) {
    result = "Server busy. Please try again."
  }

  setCache(prompt, result)

  return result
}
