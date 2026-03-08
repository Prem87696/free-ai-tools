import { generateGemini } from "./providers/gemini.js";
import { generateOpenAI } from "./providers/openai.js";
import { generateGrok } from "./providers/grok.js";

export default async function handler(req: any, res: any) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    let body = req.body;

    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const { prompt } = body || {};

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" });
    }

    try {
      const result = await generateGemini(prompt);
      if (result) {
        return res.json({ provider: "gemini", result });
      }
    } catch (err) {
      console.error("Gemini failed:", err);
    }

    try {
      const result = await generateOpenAI(prompt);
      if (result) {
        return res.json({ provider: "openai", result });
      }
    } catch (err) {
      console.error("OpenAI failed:", err);
    }

    try {
      const result = await generateGrok(prompt);
      if (result) {
        return res.json({ provider: "grok", result });
      }
    } catch (err) {
      console.error("Grok failed:", err);
    }

    return res.status(500).json({ error: "All providers failed" });

  } catch (error) {

    console.error("Router error:", error);

    return res.status(500).json({ error: "Internal server error" });

  }

}
