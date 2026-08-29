import { ValidationError } from "@/lib/api/errors";
import {
  deleteCloudinaryAsset,
  uploadDocument,
  uploadImage,
} from "@/lib/cloudinary/upload";
import type { UploadResourceType } from "@/lib/cloudinary/validation";
import {
  documentUploadFolderSchema,
  imageUploadFolderSchema,
} from "@/lib/validations/upload";
import { CLOUDINARY_FOLDERS } from "@/constants";

function parseFileFromFormData(formData: FormData): File {
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    throw new ValidationError("A valid file is required");
  }

  return file;
}

export async function handleImageUpload(formData: FormData) {
  const file = parseFileFromFormData(formData);
  const folderInput = formData.get("folder");
  const folder =
    typeof folderInput === "string" && folderInput.length > 0
      ? imageUploadFolderSchema.parse(folderInput)
      : CLOUDINARY_FOLDERS.BLOG_IMAGES;

  const asset = await uploadImage(file, folder);
  return asset;
}

export async function handleDocumentUpload(formData: FormData) {
  const file = parseFileFromFormData(formData);
  const folderInput = formData.get("folder");
  const folder =
    typeof folderInput === "string" && folderInput.length > 0
      ? documentUploadFolderSchema.parse(folderInput)
      : CLOUDINARY_FOLDERS.BLOG_ATTACHMENTS;

  const asset = await uploadDocument(file, folder);
  return asset;
}

export async function handleAssetDeletion(
  publicId: string,
  resourceType: UploadResourceType,
) {
  await deleteCloudinaryAsset(publicId, resourceType);
  return { publicId };
}
