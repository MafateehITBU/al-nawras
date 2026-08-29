import { AppError } from "@/lib/api/errors";
import { getCloudinaryClient } from "@/lib/cloudinary/client";
import {
  fileToBuffer,
  getFileExtension,
  validateDocumentFile,
  validateImageFile,
  type UploadResourceType,
} from "@/lib/cloudinary/validation";
import type { CloudinaryAsset } from "@/types";
import type { UploadApiResponse } from "cloudinary";

function mapUploadResult(result: UploadApiResponse): CloudinaryAsset {
  return {
    publicId: result.public_id,
    url: result.secure_url,
    format: result.format,
    bytes: result.bytes,
    resourceType: result.resource_type as UploadResourceType,
    width: result.width,
    height: result.height,
  };
}

async function uploadBuffer(
  buffer: Buffer,
  options: {
    folder: string;
    resourceType: UploadResourceType;
    filename?: string;
  },
): Promise<CloudinaryAsset> {
  const cloudinary = getCloudinaryClient();

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        resource_type: options.resourceType,
        ...(options.filename && { public_id: undefined }),
      },
      (error, uploadResult) => {
        if (error || !uploadResult) {
          reject(
            error ??
              new AppError(
                "UPLOAD_FAILED",
                "File upload failed",
                500,
              ),
          );
          return;
        }
        resolve(uploadResult);
      },
    );

    upload.end(buffer);
  });

  return mapUploadResult(result);
}

export async function uploadImage(
  file: File,
  folder: string,
): Promise<CloudinaryAsset> {
  validateImageFile(file);
  const buffer = await fileToBuffer(file);

  return uploadBuffer(buffer, {
    folder,
    resourceType: "image",
    filename: file.name,
  });
}

export async function uploadDocument(
  file: File,
  folder: string,
): Promise<CloudinaryAsset> {
  validateDocumentFile(file);
  const buffer = await fileToBuffer(file);
  const extension = getFileExtension(file.name);

  const asset = await uploadBuffer(buffer, {
    folder,
    resourceType: "raw",
    filename: file.name,
  });

  return {
    ...asset,
    format: asset.format ?? extension,
  };
}

export async function deleteCloudinaryAsset(
  publicId: string,
  resourceType: UploadResourceType = "image",
): Promise<void> {
  const cloudinary = getCloudinaryClient();

  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });

  if (result.result !== "ok" && result.result !== "not found") {
    throw new AppError(
      "DELETE_FAILED",
      "Failed to delete file from Cloudinary",
      500,
      result,
    );
  }
}

export async function replaceCloudinaryAsset(
  oldPublicId: string | null | undefined,
  file: File,
  folder: string,
  resourceType: UploadResourceType,
): Promise<CloudinaryAsset> {
  const uploaded =
    resourceType === "image"
      ? await uploadImage(file, folder)
      : await uploadDocument(file, folder);

  if (oldPublicId && oldPublicId !== uploaded.publicId) {
    try {
      await deleteCloudinaryAsset(oldPublicId, resourceType);
    } catch {
      // Replacement succeeded; old asset cleanup is best-effort.
    }
  }

  return uploaded;
}
