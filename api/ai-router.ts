import { generateGemini } from "./providers/gemini";
import { generateOpenAI } from "./providers/openai";
import { generateGrok } from "./providers/grok";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      error: "Prompt is required"
    });
  }

  /* ---------- TRY GEMINI ---------- */

  try {

    const result = await generateGemini(prompt);

    return res.status(200).json({
      provider: "gemini",
      result
    });

  } catch (err1) {

    console.log("Gemini failed → switching to OpenAI");

  }

  /* ---------- TRY OPENAI ---------- */

  try {

    const result = await generateOpenAI(prompt);

    return res.status(200).json({
      provider: "openai",
      result
    });

  } catch (err2) {

    console.log("OpenAI failed → switching to Grok");

  }

  /* ---------- TRY GROK ---------- */

  try {

    const result = await generateGrok(prompt);

    return res.status(200).json({
      provider: "grok",
      result
    });

  } catch (err3) {

    console.log("All providers failed");

  }

  return res.status(500).json({
    error: "All AI providers failed"
  });

}
