import { generateGemini } from "./providers/gemini";

export default async function handler(req: any, res: any) {

  /* METHOD CHECK */
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    /* BODY PARSE */
    let body = req.body;

    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const { prompt } = body || {};

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt required"
      });
    }

    /* GEMINI PROVIDER */

    try {

      const result = await generateGemini(prompt);

      if (result) {
        return res.status(200).json({
          provider: "gemini",
          result
        });
      }

      return res.status(500).json({
        error: "Gemini returned empty response"
      });

    } catch (err) {

      console.error("Gemini failed:", err);

      return res.status(500).json({
        error: "AI generation failed"
      });

    }

  } catch (error) {

    console.error("Router error:", error);

    return res.status(500).json({
      error: "Internal server error"
    });

  }

}
