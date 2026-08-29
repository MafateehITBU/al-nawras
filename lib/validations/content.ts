import { emailSchema, paginationQuerySchema, phoneSchema } from "@/lib/validations/common";
import { EnquiryStatus, SocialPlatform } from "@prisma/client";
import { z } from "zod";

export const optionalUrlSchema = z
  .string()
  .trim()
  .refine((value) => value === "" || z.string().url().safeParse(value).success, {
    message: "Invalid URL",
  });

export const requiredUrlSchema = z.string().trim().url("Invalid URL");

export const bilingualNameSchema = z.object({
  nameEn: z.string().trim().min(1, "English name is required").max(200),
  nameAr: z.string().trim().min(1, "Arabic name is required").max(200),
});

export const cloudinaryImageSchema = z.object({
  featuredImageUrl: requiredUrlSchema,
  featuredImagePublicId: z.string().trim().min(1, "Featured image public ID is required"),
});

export const cloudinaryAttachmentSchema = z
  .object({
    attachmentUrl: requiredUrlSchema,
    attachmentPublicId: z.string().trim().min(1),
    attachmentFormat: z.string().trim().optional().nullable(),
  })
  .optional()
  .nullable();

const nullableEmailFieldSchema = z.preprocess(
  (value) => (value === "" || value === undefined ? null : value),
  emailSchema.nullable().optional(),
);

export const updateWebsiteSettingsSchema = z.object({
  businessHours: z.string().trim().optional().nullable(),
  contactEmail: nullableEmailFieldSchema,
  logoUrl: z.preprocess(
    (value) => (value === "" || value === undefined ? null : value),
    z.union([requiredUrlSchema, z.null()]).optional(),
  ),
  logoPublicId: z.preprocess(
    (value) => (value === "" || value === undefined ? null : value),
    z.string().trim().nullable().optional(),
  ),
});

export const createWebsitePhoneSchema = z.object({
  phoneNumber: phoneSchema,
  label: z.string().trim().max(100).optional().nullable(),
  sortOrder: z.number().int().min(0).default(0),
});

export const updateWebsitePhoneSchema = createWebsitePhoneSchema.partial();

export const createWebsiteAddressSchema = z.object({
  addressEn: z.string().trim().min(1, "English address is required"),
  addressAr: z.string().trim().min(1, "Arabic address is required"),
  label: z.string().trim().max(100).optional().nullable(),
  sortOrder: z.number().int().min(0).default(0),
});

export const updateWebsiteAddressSchema = createWebsiteAddressSchema.partial();

export const createWebsiteMapLocationSchema = z.object({
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  label: z.string().trim().max(100).optional().nullable(),
  sortOrder: z.number().int().min(0).default(0),
});

export const updateWebsiteMapLocationSchema =
  createWebsiteMapLocationSchema.partial();

export const updateWebsiteSocialLinkSchema = z.object({
  url: optionalUrlSchema,
});

export const createBlogCategorySchema = bilingualNameSchema;

export const updateBlogCategorySchema = createBlogCategorySchema.partial();

export const listBlogCategoriesQuerySchema = paginationQuerySchema;

export const createBlogSchema = z.object({
  authorName: z.string().trim().min(1).max(200),
  publishedAt: z.coerce.date(),
  titleEn: z.string().trim().min(1),
  titleAr: z.string().trim().min(1),
  contentEn: z.string().trim().min(1),
  contentAr: z.string().trim().min(1),
  featuredImageUrl: requiredUrlSchema,
  featuredImagePublicId: z.string().trim().min(1),
  attachmentUrl: requiredUrlSchema.optional().nullable(),
  attachmentPublicId: z.string().trim().optional().nullable(),
  attachmentFormat: z.string().trim().optional().nullable(),
  categoryId: z.string().trim().min(1),
});

export const updateBlogSchema = createBlogSchema.partial();

export const listBlogsQuerySchema = paginationQuerySchema.extend({
  categoryId: z.string().trim().optional(),
});

export const createServiceCategorySchema = bilingualNameSchema;

export const updateServiceCategorySchema = createServiceCategorySchema.partial();

export const listServiceCategoriesQuerySchema = paginationQuerySchema;

export const strategicBenefitSchema = z.object({
  icon: z.string().trim().min(1).max(200),
  titleEn: z.string().trim().min(1),
  titleAr: z.string().trim().min(1),
  descriptionEn: z.string().trim().min(1),
  descriptionAr: z.string().trim().min(1),
  sortOrder: z.number().int().min(0).default(0),
});

export const createServiceSchema = z.object({
  categoryId: z.string().trim().min(1),
  nameEn: z.string().trim().min(1),
  nameAr: z.string().trim().min(1),
  heroTitleEn: z.string().trim().min(1),
  heroTitleAr: z.string().trim().min(1),
  heroDescriptionEn: z.string().trim().min(1),
  heroDescriptionAr: z.string().trim().min(1),
  overviewTitleEn: z.string().trim().min(1),
  overviewTitleAr: z.string().trim().min(1),
  overviewDescriptionEn: z.string().trim().min(1),
  overviewDescriptionAr: z.string().trim().min(1),
  strategicBenefits: z.array(strategicBenefitSchema).default([]),
});

export const updateServiceSchema = createServiceSchema.partial();

export const listServicesQuerySchema = paginationQuerySchema.extend({
  categoryId: z.string().trim().optional(),
});

export const createContactEnquirySchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: emailSchema,
  phoneNumber: phoneSchema,
  company: z.string().trim().max(200).optional().nullable(),
  serviceId: z.string().trim().min(1),
  country: z.string().trim().min(1).max(100),
  message: z.string().trim().min(1).max(5000),
});

export const updateContactEnquirySchema = z.object({
  status: z.nativeEnum(EnquiryStatus).optional(),
});

export const listContactEnquiriesQuerySchema = paginationQuerySchema.extend({
  status: z.nativeEnum(EnquiryStatus).optional(),
  serviceId: z.string().trim().optional(),
});

export type UpdateWebsiteSettingsInput = z.infer<typeof updateWebsiteSettingsSchema>;
export type CreateWebsitePhoneInput = z.infer<typeof createWebsitePhoneSchema>;
export type UpdateWebsitePhoneInput = z.infer<typeof updateWebsitePhoneSchema>;
export type CreateWebsiteAddressInput = z.infer<typeof createWebsiteAddressSchema>;
export type UpdateWebsiteAddressInput = z.infer<typeof updateWebsiteAddressSchema>;
export type CreateWebsiteMapLocationInput = z.infer<typeof createWebsiteMapLocationSchema>;
export type UpdateWebsiteMapLocationInput = z.infer<typeof updateWebsiteMapLocationSchema>;
export type UpdateWebsiteSocialLinkInput = z.infer<typeof updateWebsiteSocialLinkSchema>;
export type CreateBlogCategoryInput = z.infer<typeof createBlogCategorySchema>;
export type UpdateBlogCategoryInput = z.infer<typeof updateBlogCategorySchema>;
export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
export type CreateServiceCategoryInput = z.infer<typeof createServiceCategorySchema>;
export type UpdateServiceCategoryInput = z.infer<typeof updateServiceCategorySchema>;
export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
export type CreateContactEnquiryInput = z.infer<typeof createContactEnquirySchema>;
export type UpdateContactEnquiryInput = z.infer<typeof updateContactEnquirySchema>;
export type ListBlogsQuery = z.infer<typeof listBlogsQuerySchema>;
export type ListServicesQuery = z.infer<typeof listServicesQuerySchema>;
export type ListContactEnquiriesQuery = z.infer<typeof listContactEnquiriesQuerySchema>;

export { SocialPlatform };
