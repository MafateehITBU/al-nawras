const ALLOWED_TAGS = new Set([
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "s",
  "ul",
  "ol",
  "li",
  "br",
  "blockquote",
  "code",
  "pre",
  "hr",
  "a",
]);

const VOID_TAGS = new Set(["br", "hr"]);

function stripDangerousBlocks(html: string) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[\s\S]*?>[\s\S]*?<\/object>/gi, "")
    .replace(/<embed[\s\S]*?>/gi, "");
}

function sanitizeAttributes(tagName: string, attrs: string): string {
  if (tagName === "a") {
    const hrefMatch = attrs.match(/\shref=(["'])(.*?)\1/i);
    if (!hrefMatch) return "";
    const href = hrefMatch[2] ?? "";
    if (/^(https?:|mailto:|tel:|#|\/)/i.test(href)) {
      return ` href="${href.replace(/"/g, "&quot;")}" rel="noopener noreferrer"`;
    }
    return "";
  }

  return attrs
    .replace(/\son\w+=(["']).*?\1/gi, "")
    .replace(/\sstyle=(["']).*?\1/gi, "");
}

/**
 * Allowlist sanitizer for TipTap HTML stored in blog content fields.
 */
export function sanitizeBlogHtml(html: string): string {
  const cleaned = stripDangerousBlocks(html);

  return cleaned.replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (match, rawTag, rawAttrs) => {
    const tag = String(rawTag).toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return "";

    const isClosing = match.startsWith("</");
    if (isClosing) {
      return VOID_TAGS.has(tag) ? "" : `</${tag}>`;
    }

    const attrs = sanitizeAttributes(tag, String(rawAttrs ?? ""));
    if (VOID_TAGS.has(tag)) {
      return `<${tag}${attrs}>`;
    }

    return `<${tag}${attrs}>`;
  });
}
