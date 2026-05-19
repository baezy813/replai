// NextAuth Session 타입 확장 - user.id를 기본 세션에 포함
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
