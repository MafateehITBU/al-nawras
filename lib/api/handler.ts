import { handleApiError, UnauthorizedError, ForbiddenError } from "@/lib/api/errors";
import { auth as nextAuth } from "@/lib/auth/config";
import { validateSessionAdmin } from "@/lib/auth/session";
import {
  hasPermission,
  type SessionAdmin,
} from "@/lib/authorization/permissions";
import type { Permission } from "@prisma/client";
import type { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<Record<string, string>>;
};

type AuthenticatedHandler = (
  request: NextRequest,
  context: RouteContext,
  admin: SessionAdmin,
) => Promise<NextResponse>;

type PublicHandler = (
  request: NextRequest,
  context: RouteContext,
) => Promise<NextResponse>;

function getAdminFromAuth(auth: { admin?: SessionAdmin } | null): SessionAdmin | null {
  const admin = auth?.admin;
  if (!admin?.isActive) {
    return null;
  }
  return admin;
}

async function resolveAuthenticatedAdmin(
  auth: { admin?: SessionAdmin } | null,
): Promise<SessionAdmin> {
  const admin = getAdminFromAuth(auth);

  if (!admin) {
    throw new UnauthorizedError();
  }

  return validateSessionAdmin(admin);
}

export function withHandler(handler: PublicHandler) {
  return async (
    request: NextRequest,
    context: RouteContext,
  ): Promise<NextResponse> => {
    try {
      return await handler(request, context);
    } catch (error) {
      return handleApiError(error);
    }
  };
}

export function withAuth(handler: AuthenticatedHandler) {
  return nextAuth(async (request, context) => {
    try {
      const admin = await resolveAuthenticatedAdmin(request.auth);
      return await handler(request, context, admin);
    } catch (error) {
      return handleApiError(error);
    }
  });
}

export function withPermission(permission: Permission, handler: AuthenticatedHandler) {
  return nextAuth(async (request, context) => {
    try {
      const admin = await resolveAuthenticatedAdmin(request.auth);

      if (!hasPermission(admin, permission)) {
        throw new ForbiddenError("You do not have permission to perform this action");
      }

      return await handler(request, context, admin);
    } catch (error) {
      return handleApiError(error);
    }
  });
}
