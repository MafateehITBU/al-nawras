import { ValidationError } from "@/lib/api/errors";
import { FILE_UPLOAD } from "@/constants";

export type UploadResourceType = "image" | "raw";

export function validateImageFile(file: File): void {
  if (!(file instanceof File) || file.size === 0) {
    throw new ValidationError("A valid image file is required");
  }

  if (file.size > FILE_UPLOAD.MAX_IMAGE_SIZE_BYTES) {
    throw new ValidationError(
      `Image must be ${FILE_UPLOAD.MAX_IMAGE_SIZE_BYTES / (1024 * 1024)}MB or smaller`,
    );
  }

  if (
    !FILE_UPLOAD.ALLOWED_IMAGE_TYPES.includes(
      file.type as (typeof FILE_UPLOAD.ALLOWED_IMAGE_TYPES)[number],
    )
  ) {
    throw new ValidationError(
      `Invalid image type. Allowed: ${FILE_UPLOAD.ALLOWED_IMAGE_TYPES.join(", ")}`,
    );
  }
}

export function validateDocumentFile(file: File): void {
  if (!(file instanceof File) || file.size === 0) {
    throw new ValidationError("A valid document file is required");
  }

  if (file.size > FILE_UPLOAD.MAX_DOCUMENT_SIZE_BYTES) {
    throw new ValidationError(
      `Document must be ${FILE_UPLOAD.MAX_DOCUMENT_SIZE_BYTES / (1024 * 1024)}MB or smaller`,
    );
  }

  if (
    !FILE_UPLOAD.ALLOWED_DOCUMENT_TYPES.includes(
      file.type as (typeof FILE_UPLOAD.ALLOWED_DOCUMENT_TYPES)[number],
    )
  ) {
    throw new ValidationError(
      `Invalid document type. Allowed: PDF, DOC, DOCX`,
    );
  }
}

export async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export function getFileExtension(filename: string): string | undefined {
  const parts = filename.split(".");
  if (parts.length < 2) return undefined;
  return parts.at(-1)?.toLowerCase();
}
