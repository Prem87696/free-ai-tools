import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

// Initialize the Gemini API client
// Note: We use a singleton pattern or initialize on demand.
// Since the key is from process.env, it's safe to init here if the key is present.
// However, to be safe against missing keys crashing the app, we'll do it inside the function.

export async function generateContent(prompt: string): Promise<string> {
  if (!apiKey) {
    throw new Error("Gemini API Key is missing. Please configure it in the environment.");
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate content. Please try again later.");
  }
}
