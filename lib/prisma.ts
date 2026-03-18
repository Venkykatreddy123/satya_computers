import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const url = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

const libsql = createClient({
  url: url!,
  authToken: authToken,
});

const adapter = new PrismaLibSql(libsql as any);
const prisma = new PrismaClient({ adapter });

export { libsql };
export default prisma;
