"use client";
import { useActionState } from "react";
import { createSession, type SessionActionState } from "@/actions/session";

export function JdForm() {
  const [state, action, isPending] = useActionState<SessionActionState, FormData>(
    createSession,
    null
  );

  return (
    <form action={action} className="space-y-6">
     
      <div className="space-y-1.5">
        <label htmlFor="jobTitle" className="text-sm font-medium text-zinc-700">
          포지션 / 직무명
        </label>
        <input
          id="jobTitle"
          name="jobTitle"
          type="text"
          required
          placeholder="예) 프론트엔드 개발자, 백엔드 엔지니어"
          className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
        />
      </div>
 
      <div className="space-y-1.5">
        <label htmlFor="jdText" className="text-sm font-medium text-zinc-700">
          채용 공고 (JD)
        </label>
        <textarea
          id="jdText"
          name="jdText"
          required
          rows={12}
          placeholder="채용 공고 전문을 붙여넣어 주세요..."
          className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 resize-none"
        />
        <p className="text-xs text-zinc-400">최소 50자 이상 입력해주세요.</p>
      </div>
 
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
          {state.error}
        </p>
      )}
 
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "AI가 질문을 생성 중이에요..." : "면접 질문 생성하기 →"}
      </button>
    </form>
  );
}
