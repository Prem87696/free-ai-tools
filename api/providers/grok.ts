export async function generateGrok(prompt: string) {

  try {

    const response = await fetch(
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

    if (!response.ok) {
      console.error("Grok API error:", await response.text());
      return null;
    }

    const data = await response.json();

    return data?.choices?.[0]?.message?.content || null;

  } catch (error) {

    console.error("Grok failed:", error);
    return null;

  }

}
