// Prisma 7 + PostgreSQL adapter 설정
// - DATABASE_URL: pgbouncer 트랜잭션 풀러 (앱 쿼리용)
// - 서버리스 환경에서 연결 누수 방지를 위한 싱글톤 패턴
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

function createPrismaClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

declare global {
  var prisma: ReturnType<typeof createPrismaClient> | undefined;
}

const prisma = globalThis.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export { prisma };
