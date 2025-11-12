
import { GoogleGenAI } from "@google/genai";

export async function generateMarketAnalysis(topic: string): Promise<string> {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error("API_KEY environment variable not set.");
    return "API Key is not configured. Please contact support.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Provide a brief, institutional-grade market analysis on "${topic}" for a proprietary trader. Focus on key levels, potential volatility, and a neutral outlook. Keep it under 100 words.`
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred while fetching analysis: ${error.message}`;
    }
    return "An unknown error occurred while fetching analysis.";
  }
}
