import { generateGemini } from "./providers/gemini";
import { generateOpenAI } from "./providers/openai";
import { generateGrok } from "./providers/grok";

export default async function handler(req, res) {

const prompt = req.body.prompt;

try {

return res.json({
result: await generateGemini(prompt)
});

} catch (err1) {

try {

return res.json({
result: await generateOpenAI(prompt)
});

} catch (err2) {

try {

return res.json({
result: await generateGrok(prompt)
});

} catch (err3) {

return res.status(500).json({
error: "All AI providers failed"
});

}

}

}

}
