export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateUniqueSlug(
  baseText: string,
  existingSlugs: string[],
): string {
  const baseSlug = slugify(baseText);
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 2;
  let candidate = `${baseSlug}-${counter}`;
  while (existingSlugs.includes(candidate)) {
    counter++;
    candidate = `${baseSlug}-${counter}`;
  }

  return candidate;
}

export function calculateReadingTime(
  content: string,
  wordsPerMinute = 200,
): number {
  const plainText = content.replace(/<[^>]*>/g, "").trim();
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function getPaginationParams(searchParams: URLSearchParams): {
  page: number;
  limit: number;
  skip: number;
} {
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("limit") ?? "10", 10) || 10),
  );

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
}
