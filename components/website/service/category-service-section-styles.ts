/** Alternating white + secondary backgrounds for category service sections. */
export const categoryServiceSectionBackgrounds = [
  "bg-website-surface",
  "bg-website-bg",
] as const;

export function getCategoryServiceSectionBackground(index: number): string {
  return categoryServiceSectionBackgrounds[index % categoryServiceSectionBackgrounds.length];
}
