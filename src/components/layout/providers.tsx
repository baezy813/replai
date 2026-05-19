"use client";
// SessionProvider는 클라이언트 컴포넌트여야 함 → 별도 래퍼로 분리
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
