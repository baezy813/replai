import { defineConfig } from "prisma/config";

// Node.js 20.12+ 내장 - dotenv 없이 .env.local 로드
try { (process as any).loadEnvFile(".env.local"); } catch {}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // 마이그레이션엔 pgbouncer 미지원 → DIRECT_URL(세션 풀러) 사용
    url: process.env["DIRECT_URL"],
  },
});
