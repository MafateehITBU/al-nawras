import type { SessionAdmin } from "@/lib/authorization/permissions";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    admin: SessionAdmin;
  }

  interface Session {
    admin: SessionAdmin;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    admin?: SessionAdmin;
  }
}

export type { SessionAdmin };
