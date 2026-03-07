export async function generateGrok(prompt: string) {

  const response = await fetch("https://api.x.ai/v1/chat/completions", {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROK_API_KEY}`
    },

    body: JSON.stringify({
      model: "grok-beta",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    })

  });

  const data = await response.json();

  return data.choices?.[0]?.message?.content || "";

}
