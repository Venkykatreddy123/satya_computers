import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma, { libsql as client } from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.log("Auth: Missing credentials");
          return null;
        }

        // 1. Try to find admin in Database via Direct SQL
        try {
          const result = await client.execute({
            sql: 'SELECT id, username, password, role FROM "Admin" WHERE username = ?',
            args: [credentials.username]
          });

          if (result.rows && result.rows.length > 0) {
            const dbAdmin = result.rows[0];
            console.log("Auth: Found admin in DB via SQL");
            
            const isValid = await compare(credentials.password, dbAdmin.password as string);
            if (isValid) {
              return { 
                id: dbAdmin.id as string, 
                name: "Admin", 
                email: "admin@satyacomputers.com",
                role: dbAdmin.role as string
              };
            }
          }
        } catch (dbError) {
          console.error("Auth DB Error:", dbError);
        }

        // 2. Fallback to .env for legacy support
        const adminUser = process.env.ADMIN_USERNAME;
        const adminHash = process.env.ADMIN_PASSWORD_HASH;

        if (credentials.username === adminUser) {
          const isValid = await compare(credentials.password, adminHash || "");
          if (isValid) {
            return { 
              id: "1", 
              name: "Admin (Env)", 
              email: "admin@satyacomputers.com",
              role: "admin"
            };
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours as per plan
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-ignore
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
