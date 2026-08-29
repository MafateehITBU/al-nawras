import { generateUniqueSlug } from "@/lib/utils/index";

export async function resolveUniqueSlug(
  baseText: string,
  fetchExistingSlugs: () => Promise<string[]>,
): Promise<string> {
  const existingSlugs = await fetchExistingSlugs();
  return generateUniqueSlug(baseText, existingSlugs);
}

export async function resolveUniqueSlugWithExclude(
  baseText: string,
  fetchExistingSlugs: () => Promise<string[]>,
  currentSlug?: string,
): Promise<string> {
  const existingSlugs = (await fetchExistingSlugs()).filter(
    (slug) => slug !== currentSlug,
  );

  return generateUniqueSlug(baseText, existingSlugs);
}
