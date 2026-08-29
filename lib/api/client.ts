import type { ApiErrorResponse, ApiSuccessResponse } from "@/lib/api/response";

export class ApiClientError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

async function parseResponse<T>(response: Response): Promise<T> {
  const json: ApiSuccessResponse<T> | ApiErrorResponse = await response.json();

  if (!response.ok || !json.success) {
    const error = json.success === false ? json.error : null;
    throw new ApiClientError(
      error?.code ?? "REQUEST_FAILED",
      error?.message ?? "Request failed",
      response.status,
      error?.details,
    );
  }

  return json.data;
}

export async function apiClient<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, headers, ...rest } = options;

  const response = await fetch(path, {
    ...rest,
    headers: {
      ...(body !== undefined && !(body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
      ...headers,
    },
    body:
      body instanceof FormData
        ? body
        : body !== undefined
          ? JSON.stringify(body)
          : undefined,
  });

  return parseResponse<T>(response);
}

export async function apiUpload<T>(
  path: string,
  formData: FormData,
): Promise<T> {
  return apiClient<T>(path, { method: "POST", body: formData });
}

export async function apiClientPaginated<T>(
  path: string,
  options: RequestOptions = {},
): Promise<import("@/types").PaginatedResult<T>> {
  return apiClient(path, options);
}
