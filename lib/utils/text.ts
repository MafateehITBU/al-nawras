/**
 * Strips HTML tags and returns a plain-text excerpt truncated to maxLength.
 */
export function excerptPlainText(content: string, maxLength = 120): string {
  const plain = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  if (plain.length <= maxLength) {
    return plain;
  }

  const truncated = plain.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > maxLength * 0.6) {
    return `${truncated.slice(0, lastSpace).trim()}…`;
  }

  return `${truncated.trim()}…`;
}
