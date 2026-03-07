import { generateGemini } from "./providers/gemini";
import { generateOpenAI } from "./providers/openai";
import { generateGrok } from "./providers/grok";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt required" });
  }

  /* GEMINI */

  try {

    const result = await generateGemini(prompt);

    return res.json({
      provider: "gemini",
      result
    });

  } catch (err) {
    console.log("Gemini failed");
  }

  /* OPENAI */

  try {

    const result = await generateOpenAI(prompt);

    return res.json({
      provider: "openai",
      result
    });

  } catch (err) {
    console.log("OpenAI failed");
  }

  /* GROK */

  try {

    const result = await generateGrok(prompt);

    return res.json({
      provider: "grok",
      result
    });

  } catch (err) {
    console.log("Grok failed");
  }

  return res.status(500).json({
    error: "All providers failed"
  });

}
