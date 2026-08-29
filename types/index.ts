// Shared TypeScript type definitions

export type { SupportedLocale } from "@/constants";
export type {
  Admin,
  AdminRole,
  Blog,
  BlogCategory,
  ContactEnquiry,
  EnquiryStatus,
  Permission,
  Service,
  ServiceCategory,
  ServiceStrategicBenefit,
  SocialPlatform,
  WebsiteAddress,
  WebsiteMapLocation,
  WebsitePhone,
  WebsiteSettings,
  WebsiteSocialLink,
} from "@prisma/client";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  items: T[];
  pagination: PaginationMeta;
}

import type { UploadResourceType } from "@/lib/cloudinary/validation";

export interface CloudinaryAsset {
  publicId: string;
  url: string;
  format?: string;
  bytes?: number;
  resourceType?: UploadResourceType;
  width?: number;
  height?: number;
}

export interface AdminPublic {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  profileImageUrl: string | null;
  profileImagePublicId: string | null;
  role: import("@prisma/client").AdminRole;
  permissions: import("@prisma/client").Permission[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
