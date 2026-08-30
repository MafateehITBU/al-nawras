import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js config — no Prisma, bcrypt, or Node-only deps.
 * Used by middleware. The Node config in `config.ts` adds Credentials.
 */
export const edgeAuthConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user?.admin) {
        token.admin = user.admin;
      }

      if (trigger === "update" && session?.admin) {
        token.admin = session.admin;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token.admin) {
        session.admin = token.admin;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
