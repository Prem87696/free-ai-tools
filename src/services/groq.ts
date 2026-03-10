export async function grokGenerate(prompt: string) {

try {

if (!process.env.GROK_API_KEY) {
return null
}

const res = await fetch(
"https://api.groq.com/openai/v1/chat/completions",
{
method: "POST",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${process.env.GROK_API_KEY}`
},
body: JSON.stringify({
model: "llama3-8b-8192",
messages: [
{
role: "user",
content: prompt
}
],
temperature: 0.7
})
}
)

if (!res.ok) {
return null
}

const data = await res.json()

return data?.choices?.[0]?.message?.content || null

} catch (error) {

console.error("Groq API error:", error)

return null

}

}
