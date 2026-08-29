import { handleApiError } from "@/lib/api/errors";
import { successResponse } from "@/lib/api/response";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    return successResponse({
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
