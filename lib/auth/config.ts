import { getEnv } from "@/lib/env";
import prisma from "@/lib/db/prisma";
import { edgeAuthConfig } from "@/lib/auth/edge-config";
import { verifyPassword } from "@/lib/auth/password";
import { toAdminPublic } from "@/lib/authorization/permissions";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/validations/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...edgeAuthConfig,
  secret: getEnv().AUTH_SECRET,
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
});
