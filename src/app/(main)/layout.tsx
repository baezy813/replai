// (main) 라우트 그룹 레이아웃
// 이 안의 모든 페이지는 로그인 필수 - 한 곳에서 통합 관리
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/header";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
    </div>
  );
}
