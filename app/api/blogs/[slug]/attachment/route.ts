import { handleApiError } from "@/lib/api/errors";
import { getPublicBlogBySlug } from "@/lib/services/blog.service";
import type { PublicBlogDetail } from "@/lib/services/blog.service";
import type { NextRequest } from "next/server";

const MIME_BY_FORMAT: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  zip: "application/zip",
};

function resolveAttachmentFilename(blog: PublicBlogDetail) {
  const format = blog.attachmentFormat?.trim().toLowerCase();
  const rawName = blog.attachmentName?.trim();

  if (rawName) {
    if (format && !rawName.toLowerCase().endsWith(`.${format}`)) {
      return `${rawName}.${format}`;
    }
    return rawName;
  }

  return format ? `report.${format}` : "report";
}

function resolveAttachmentContentType(format: string | null | undefined, upstreamType: string | null) {
  if (upstreamType && upstreamType !== "application/octet-stream") {
    return upstreamType;
  }

  const normalizedFormat = format?.trim().toLowerCase();
  if (normalizedFormat && MIME_BY_FORMAT[normalizedFormat]) {
    return MIME_BY_FORMAT[normalizedFormat];
  }

  return upstreamType ?? "application/octet-stream";
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await context.params;
    const blog = await getPublicBlogBySlug(slug);

    if (!blog.attachmentUrl) {
      return new Response("Attachment not found", { status: 404 });
    }

    const upstream = await fetch(blog.attachmentUrl);
    if (!upstream.ok) {
      return new Response("Failed to fetch attachment", { status: 502 });
    }

    const filename = resolveAttachmentFilename(blog);
    const contentType = resolveAttachmentContentType(
      blog.attachmentFormat,
      upstream.headers.get("content-type"),
    );

    return new Response(upstream.body, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename.replace(/"/g, "")}"`,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
