import { JdForm } from "@/components/session/jd-form";
import Link from "next/link";

export default function NewSessionPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-zinc-600">
          ← 대시보드
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-zinc-900">새 면접 시작</h1>
        <p className="mt-1 text-sm text-zinc-500">
          채용 공고를 붙여넣으면 AI가 맞춤 면접 질문 6개를 생성해드려요.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-100 bg-white p-6">
        <JdForm />
      </div>
    </div>
  );
}
