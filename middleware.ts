import { edgeAuthConfig } from "@/lib/auth/edge-config";
import NextAuth from "next-auth";
import { NextResponse, type NextRequest } from "next/server";

const DEFAULT_LOCALE = "en";
const SUPPORTED_LOCALES = new Set(["en", "ar"]);
const PUBLIC_FILE = /\.(?!html)[^.]+$/;

const { auth } = NextAuth(edgeAuthConfig);

function isAuthenticated(session: { admin?: { isActive?: boolean } } | null) {
  return Boolean(session?.admin?.isActive);
}

function handleLocaleRedirect(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return null;
  }

  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (firstSegment && SUPPORTED_LOCALES.has(firstSegment)) {
    return null;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export default auth((request) => {
  const localeRedirect = handleLocaleRedirect(request);
  if (localeRedirect) {
    return localeRedirect;
  }

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
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|ttf|woff|woff2)$).*)",
  ],
};
