export async function generateAI(prompt: string) {

  const res = await fetch("/api/ai-router", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: prompt
    })
  });

  const data = await res.json();

  if (!data.result) {
    throw new Error("AI generation failed");
  }

  return data.result;

}
