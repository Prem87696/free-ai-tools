export async function generateGrok(prompt: string) {

  try {

    const res = await fetch(
      "https://api.x.ai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROK_API_KEY}`
        },
        body: JSON.stringify({
          model: "grok-2-latest",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ]
        })
      }
    );

    const data = await res.json();

    return data?.choices?.[0]?.message?.content || null;

  } catch (error) {

    console.error("Grok error:", error);

    return null;

  }

}
