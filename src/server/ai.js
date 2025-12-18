import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function callGemini(prompt) {
  const response = await genAI.models.generateContent({
    model: "gemini-flash-latest",
    systemInstruction: `
You are a travel planning assistant.
Return ONLY valid JSON.
`,
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  return response.text;
}