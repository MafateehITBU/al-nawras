import { PAGINATION } from "@/constants";
import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Invalid email address")
  .transform((value) => value.toLowerCase());

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be at most 128 characters");

export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .refine((value) => isValidPhoneNumber(value), {
    message: "Invalid phone number",
  })
  .transform((value) => {
    const parsed = parsePhoneNumberFromString(value);
    if (!parsed) {
      throw new Error("Invalid phone number");
    }
    return parsed.format("E.164");
  });

export const paginationQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1)
    .default(PAGINATION.DEFAULT_PAGE),
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(PAGINATION.MAX_LIMIT)
    .default(PAGINATION.DEFAULT_LIMIT),
  search: z.string().trim().optional(),
  sortBy: z.string().trim().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

export function parseQueryParams(
  searchParams: URLSearchParams,
): Record<string, string | undefined> {
  const result: Record<string, string | undefined> = {};

  searchParams.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

export function parseSearchParams<T extends z.ZodType>(
  searchParams: URLSearchParams,
  schema: T,
): z.infer<T> {
  return schema.parse(parseQueryParams(searchParams));
}

export async function parseJsonBody<T extends z.ZodType>(
  request: Request,
  schema: T,
): Promise<z.infer<T>> {
  const body: unknown = await request.json();
  return schema.parse(body);
}
