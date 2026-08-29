import { auth } from "@/lib/auth/config";
import type { SessionAdmin } from "@/lib/authorization/permissions";
import { NextResponse } from "next/server";

function isAuthenticated(session: { admin?: SessionAdmin } | null): boolean {
  return Boolean(session?.admin?.isActive);
}

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const isLoggedIn = isAuthenticated(request.auth);
  const isLoginPage = pathname === "/admin/login";
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isAdminPage && !isLoginPage && !isLoggedIn) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminApi && !isLoggedIn) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Unauthorized",
        },
      },
      { status: 401 },
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
