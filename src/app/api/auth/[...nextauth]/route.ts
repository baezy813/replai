// NextAuth v5 API 핸들러 - GET/POST 요청을 auth.ts로 위임
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
