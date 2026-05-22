"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { generateJson } from "@/lib/gemini";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  jobTitle: z.string().min(1, "직무명을 입력해주세요.").max(100),
  jdText: z.string().min(50, "채용 공고를 50자 이상 입력해주세요.").max(5000),
});

type GeminiQuestion = { content: string; category: "tech" | "behavioral" | "cs" };
type GeminiResponse = { questions: GeminiQuestion[] };

export type SessionActionState = { error: string } | null;

export async function createSession(
  _prev: SessionActionState,
  formData: FormData
): Promise<SessionActionState> {
  const session = await auth();
  if (!session) return { error: "로그인이 필요합니다." };

  const parsed = schema.safeParse({
    jobTitle: formData.get("jobTitle"),
    jdText: formData.get("jdText"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { jobTitle, jdText } = parsed.data;

  // Gemini 프롬프트 - 채용 공고 분석 → 6개 질문 생성
  const prompt = `
면접 전문가로서 아래 채용 공고를 분석해 면접 질문 6개를 생성해주세요.

포지션: ${jobTitle}

채용 공고:
${jdText}

규칙:
- tech (기술/직무): 3개 — JD에 명시된 기술 스택과 직무 역량 관련
- behavioral (경험/행동): 2개 — STAR 방식으로 답할 수 있는 경험 질문
- cs (CS 기초): 1개 — 해당 직무에 필요한 핵심 CS 개념

아래 JSON 형식으로만 응답하세요:
{"questions":[{"content":"질문 내용","category":"tech"}]}
`.trim();

  let questions: GeminiQuestion[];
  try {
    const result = await generateJson<GeminiResponse>(prompt);
    questions = result.questions;
    if (!Array.isArray(questions) || questions.length === 0) throw new Error("questions 배열이 비어있음");
  } catch (e) {
    console.error("[createSession] Gemini 에러:", e);
    return { error: "질문 생성에 실패했습니다. 다시 시도해주세요." };
  }

  // DB에 세션 + 질문 한 번에 저장
  const created = await prisma.interviewSession.create({
    data: {
      userId: session.user.id,
      jobTitle,
      jdText,
      questions: {
        create: questions.map((q, i) => ({
          content: q.content,
          category: q.category,
          order: i + 1,
        })),
      },
    },
  });

  redirect(`/session/${created.id}`);
}
