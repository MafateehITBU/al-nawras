import { errorResponse } from "@/lib/api/response";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number = 400,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super("UNAUTHORIZED", message, 401);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super("FORBIDDEN", message, 403);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super("NOT_FOUND", message, 404);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends AppError {
  constructor(message = "Resource already exists") {
    super("CONFLICT", message, 409);
    this.name = "ConflictError";
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation failed", details?: unknown) {
    super("VALIDATION_ERROR", message, 422, details);
    this.name = "ValidationError";
  }
}

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof AppError) {
    return errorResponse(error.code, error.message, {
      status: error.status,
      details: error.details,
    });
  }

  if (error instanceof ZodError) {
    return errorResponse("VALIDATION_ERROR", "Validation failed", {
      status: 422,
      details: error.flatten(),
    });
  }

  console.error("[API Error]", error);

  return errorResponse(
    "INTERNAL_SERVER_ERROR",
    "An unexpected error occurred",
    { status: 500 },
  );
}
