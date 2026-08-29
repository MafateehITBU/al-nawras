import { getEnv } from "@/lib/env";
import prisma from "@/lib/db/prisma";
import { verifyPassword } from "@/lib/auth/password";
import {
  toAdminPublic,
  type SessionAdmin,
} from "@/lib/authorization/permissions";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/validations/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: getEnv().AUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        const admin = await prisma.admin.findUnique({
          where: { email },
        });

        if (!admin || !admin.isActive) {
          return null;
        }

        const isValidPassword = await verifyPassword(password, admin.passwordHash);
        if (!isValidPassword) {
          return null;
        }

        return {
          id: admin.id,
          email: admin.email,
          admin: toAdminPublic(admin),
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user?.admin) {
        token.admin = user.admin as SessionAdmin;
      }

      if (trigger === "update" && session?.admin) {
        token.admin = session.admin as SessionAdmin;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token.admin) {
        session.admin = token.admin as SessionAdmin;
      }

      return session;
    },
  },
});
