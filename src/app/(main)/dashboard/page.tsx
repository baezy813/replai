import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  // 최근 면접 세션 10개 조회
  const sessions = await prisma.interviewSession.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { _count: { select: { questions: true } } },
  });

  return (
    <div className="space-y-8"> 
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">
          안녕하세요, {session?.user?.name}님 👋
        </h1>
        <p className="mt-1 text-zinc-500">오늘도 면접 준비해볼까요?</p>
      </div>

       
      <Link
        href="/session/new"
        className="flex items-center justify-between rounded-2xl bg-zinc-900 px-6 py-5 text-white transition hover:bg-zinc-700"
      >
        <div>
          <p className="font-semibold">새 면접 시작하기</p>
          <p className="mt-0.5 text-sm text-zinc-400">
            채용 공고를 붙여넣으면 맞춤 질문을 생성해드려요
          </p>
        </div>
        <span className="text-2xl">→</span>
      </Link>
 
      <div>
        <h2 className="mb-4 text-base font-semibold text-zinc-700">
          최근 면접 세션
        </h2>

        {sessions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-200 bg-white px-6 py-10 text-center text-sm text-zinc-400">
            아직 면접 세션이 없어요. 위 버튼으로 시작해보세요!
          </div>
        ) : (
          <ul className="space-y-3">
            {sessions.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/session/${s.id}`}
                  className="flex items-center justify-between rounded-xl border border-zinc-100 bg-white px-5 py-4 transition hover:border-zinc-300"
                >
                  <div>
                    <p className="font-medium text-zinc-900">{s.jobTitle}</p>
                    <p className="mt-0.5 text-xs text-zinc-400">
                      {new Date(s.createdAt).toLocaleDateString("ko-KR")} ·{" "}
                      {s._count.questions}개 질문
                    </p>
                  </div>
                  <span className="text-zinc-300">›</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
