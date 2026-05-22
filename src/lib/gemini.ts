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

// JSON 응답 파싱 - 마크다운 코드블록도 처리
export async function generateJson<T>(prompt: string): Promise<T> {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });
  const raw = response.text ?? ""; 
  const cleaned = raw.replace(/^```(?:json)?\s*/m, "").replace(/\s*```\s*$/m, "").trim();
  return JSON.parse(cleaned) as T;
}

export { ai };
