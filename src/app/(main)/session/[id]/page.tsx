import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

const categoryLabel: Record<string, { label: string; color: string }> = {
  tech:       { label: "기술/직무", color: "bg-blue-50 text-blue-600" },
  behavioral: { label: "경험/행동", color: "bg-green-50 text-green-600" },
  cs:         { label: "CS 기초",   color: "bg-purple-50 text-purple-600" },
};

export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const data = await prisma.interviewSession.findUnique({
    where: { id, userId: session!.user.id },
    include: { questions: { orderBy: { order: "asc" } } },
  });

  if (!data) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* 헤더 */}
      <div>
        <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-zinc-600">
          ← 대시보드
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-zinc-900">{data.jobTitle}</h1>
        <p className="mt-1 text-sm text-zinc-400">
          {new Date(data.createdAt).toLocaleDateString("ko-KR", {
            year: "numeric", month: "long", day: "numeric",
          })}
          · 질문 {data.questions.length}개
        </p>
      </div>

      {/* 질문 목록 */}
      <ul className="space-y-3">
        {data.questions.map((q, i) => {
          const cat = categoryLabel[q.category] ?? { label: q.category, color: "bg-zinc-100 text-zinc-500" };
          return (
            <li
              key={q.id}
              className="rounded-2xl border border-zinc-100 bg-white px-6 py-5 space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-400">Q{i + 1}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${cat.color}`}>
                  {cat.label}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-800">{q.content}</p>

              {/* 답변하기 버튼 - 다음 기능에서 구현 */}
              <Link
                href={`/session/${data.id}/question/${q.id}`}
                className="inline-block rounded-lg border border-zinc-200 px-4 py-1.5 text-xs font-medium text-zinc-600 transition hover:border-zinc-400"
              >
                답변하기 →
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
