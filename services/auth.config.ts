// services/auth.config.ts
// Konfigurasi NextAuth — dipakai bersama oleh route API & halaman admin (getServerSession).

import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { findOrCreateUser } from "@/services/user.service";
import type { UserRole } from "@/domain/user";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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

      // cek user sudah ada, kalau belum -> insert; kembalikan role
      user.role = await findOrCreateUser({
        email: user.email,
        name: user.name,
        image: user.image,
      });

      return true;
    },

    async jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as UserRole) ?? "user";
      }
      return session;
    },
  },
};
