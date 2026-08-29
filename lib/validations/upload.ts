import { CLOUDINARY_FOLDERS } from "@/constants";
import { z } from "zod";

export const imageUploadFolderSchema = z.enum([
  CLOUDINARY_FOLDERS.ADMIN_PROFILES,
  CLOUDINARY_FOLDERS.BLOG_IMAGES,
  CLOUDINARY_FOLDERS.WEBSITE_LOGO,
  CLOUDINARY_FOLDERS.SERVICE_IMAGES,
]);

export const documentUploadFolderSchema = z.enum([
  CLOUDINARY_FOLDERS.BLOG_ATTACHMENTS,
]);

export const deleteUploadSchema = z.object({
  publicId: z.string().trim().min(1, "Public ID is required"),
  resourceType: z.enum(["image", "raw"]).default("image"),
});

export type DeleteUploadInput = z.infer<typeof deleteUploadSchema>;
