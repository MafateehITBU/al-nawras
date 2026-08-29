import { NextResponse } from "next/server";

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function successResponse<T>(
  data: T,
  options?: { message?: string; status?: number },
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json(
    {
      success: true as const,
      data,
      ...(options?.message && { message: options.message }),
    },
    { status: options?.status ?? 200 },
  );
}

export function errorResponse(
  code: string,
  message: string,
  options?: { status?: number; details?: unknown },
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      success: false as const,
      error: {
        code,
        message,
        ...(options?.details !== undefined && { details: options.details }),
      },
    },
    { status: options?.status ?? 400 },
  );
}

export function paginatedResponse<T>(
  data: T[],
  pagination: {
    page: number;
    limit: number;
    total: number;
  },
  options?: { message?: string },
): NextResponse<
  ApiSuccessResponse<{
    items: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>
> {
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return NextResponse.json({
    success: true as const,
    data: {
      items: data,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        totalPages,
      },
    },
    ...(options?.message && { message: options.message }),
  });
}
