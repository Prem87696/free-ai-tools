import { generateGemini } from "./providers/gemini";
import { generateOpenAI } from "./providers/openai";
import { generateGrok } from "./providers/grok";

export default async function handler(req, res) {

  const prompt = req.body.prompt;

  try {

    const result = await generateGemini(prompt);

    return res.json({
      provider: "gemini",
      result
    });

  } catch (err1) {

    try {

      const result = await generateOpenAI(prompt);

      return res.json({
        provider: "openai",
        result
      });

    } catch (err2) {

      try {

        const result = await generateGrok(prompt);

        return res.json({
          provider: "grok",
          result
        });

      } catch (err3) {

        return res.status(500).json({
          error: "All AI providers failed"
        });

      }

    }

  }

}
