// Next.js 16: middleware → proxy로 변경
// Node.js 런타임 기본 → pg 등 Node.js 모듈 사용 가능
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // /dashboard, /session 하위 경로는 로그인 필수
  const isProtected =
    pathname.startsWith("/dashboard") || pathname.startsWith("/session");

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
