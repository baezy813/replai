// 대시보드 헤더 - 서버 컴포넌트 (로그아웃은 서버 액션)
import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export async function Header() {
  const session = await auth();

  return (
    <header className="border-b border-zinc-100 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link href="/dashboard" className="text-lg font-bold text-zinc-900">
          Replai
        </Link>

        <div className="flex items-center gap-3">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt={session.user.name ?? ""}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <span className="text-sm text-zinc-600">{session?.user?.name}</span>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="text-sm text-zinc-400 transition hover:text-zinc-700"
            >
              로그아웃
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
