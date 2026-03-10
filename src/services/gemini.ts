export async function geminiGenerate(prompt: string) {

try {

const API_KEY = process.env.GEMINI_API_KEY

if (!API_KEY) {
console.error("Missing GEMINI_API_KEY")
return null
}

const res = await fetch(
`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
contents: [
{
parts: [
{ text: prompt }
]
}
]
})
}
)

if (!res.ok) {
console.error("Gemini API error:", await res.text())
return null
}

const data = await res.json()

return data?.candidates?.[0]?.content?.parts?.[0]?.text || null

} catch (error) {

console.error("Gemini fetch error:", error)

return null

}

}
