import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "@/lib/turso";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      // cek user sudah ada
      const existingUser = await db.execute({
        sql: "SELECT * FROM users WHERE email = ?",
        args: [user.email],
      });

      // kalau belum ada -> insert
      if (existingUser.rows.length === 0) {
        await db.execute({
          sql: `
            INSERT INTO users (
              email,
              name,
              image
            )
            VALUES (?, ?, ?)
          `,
          args: [
            user.email,
            user.name ?? "",
            user.image ?? "",
          ],
        });
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };