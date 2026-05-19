import { GoogleGenAI } from "@google/genai";

//AI 클라이언트 객체 생성 (싱글톤)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const MODEL = "gemini-2.5-flash";
 
export async function generateText(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });
  return response.text ?? "";
}

export { ai };
