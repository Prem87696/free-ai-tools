import type { VercelRequest, VercelResponse } from "@vercel/node";

import { generateGemini } from "./providers/gemini";
import { generateOpenAI } from "./providers/openai";
import { generateGrok } from "./providers/grok";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {

  /* METHOD CHECK */

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    /* BODY PARSE */

    let body: any = req.body;

    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const { prompt } = body;

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

    } catch (err) {
      console.error("Gemini failed:", err);
    }

    /* OPENAI PROVIDER */

    try {

      const result = await generateOpenAI(prompt);

      if (result) {
        return res.status(200).json({
          provider: "openai",
          result
        });
      }

    } catch (err) {
      console.error("OpenAI failed:", err);
    }

    /* GROK PROVIDER */

    try {

      const result = await generateGrok(prompt);

      if (result) {
        return res.status(200).json({
          provider: "grok",
          result
        });
      }

    } catch (err) {
      console.error("Grok failed:", err);
    }

    /* ALL PROVIDERS FAILED */

    return res.status(500).json({
      error: "All providers failed"
    });

  } catch (error) {

    console.error("Router error:", error);

    return res.status(500).json({
      error: "Internal server error"
    });

  }

}
