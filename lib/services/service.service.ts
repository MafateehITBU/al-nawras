import { ConflictError, NotFoundError } from "@/lib/api/errors";
import prisma from "@/lib/db/prisma";
import { resolveUniqueSlug, resolveUniqueSlugWithExclude } from "@/lib/utils/slug";
import type {
  CreateServiceInput,
  ListServicesQuery,
  UpdateServiceInput,
} from "@/lib/validations/content";
import { Prisma } from "@prisma/client";

const serviceInclude = {
  category: {
    select: { id: true, nameEn: true, nameAr: true, slug: true },
  },
  strategicBenefits: {
    orderBy: { sortOrder: "asc" as const },
  },
} as const;

export type PublicServicesMenuCategory = Awaited<
  ReturnType<typeof getPublicServicesMenu>
>[number];

export async function getPublicServicesMenu() {
  return prisma.serviceCategory.findMany({
    orderBy: { nameEn: "asc" },
    select: {
      id: true,
      nameEn: true,
      nameAr: true,
      slug: true,
      services: {
        select: {
          id: true,
          slug: true,
          nameEn: true,
          nameAr: true,
        },
        orderBy: { nameEn: "asc" },
      },
    },
  });
}

export async function listServices(query: ListServicesQuery) {
  const { page, limit, search, sortBy, sortOrder, categoryId } = query;
  const skip = (page - 1) * limit;

  const where: Prisma.ServiceWhereInput = {
    ...(categoryId && { categoryId }),
    ...(search && {
      OR: [
        { nameEn: { contains: search, mode: "insensitive" } },
        { nameAr: { contains: search, mode: "insensitive" } },
        { heroTitleEn: { contains: search, mode: "insensitive" } },
        { heroTitleAr: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const orderBy: Prisma.ServiceOrderByWithRelationInput =
    sortBy === "nameEn"
      ? { nameEn: sortOrder }
      : sortBy === "createdAt"
        ? { createdAt: sortOrder }
        : { createdAt: sortOrder };

  const [items, total] = await Promise.all([
    prisma.service.findMany({
      where,
      include: serviceInclude,
      orderBy,
      skip,
      take: limit,
    }),
    prisma.service.count({ where }),
  ]);

  return { items, pagination: { page, limit, total } };
}

export async function getServiceById(id: string) {
  const service = await prisma.service.findUnique({
    where: { id },
    include: serviceInclude,
  });
  if (!service) throw new NotFoundError("Service not found");
  return service;
}

export async function getServiceBySlug(slug: string) {
  const service = await prisma.service.findUnique({
    where: { slug },
    include: serviceInclude,
  });
  if (!service) throw new NotFoundError("Service not found");
  return service;
}

const relatedServiceSelect = {
  id: true,
  slug: true,
  nameEn: true,
  nameAr: true,
  heroDescriptionEn: true,
  heroDescriptionAr: true,
  overviewImageUrl: true,
} as const;

export type RelatedServiceSummary = Prisma.ServiceGetPayload<{
  select: typeof relatedServiceSelect;
}>;

export async function getRelatedServices(
  categoryId: string,
  excludeServiceId: string,
  limit = 3,
) {
  return prisma.service.findMany({
    where: {
      categoryId,
      id: { not: excludeServiceId },
    },
    select: relatedServiceSelect,
    orderBy: { nameEn: "asc" },
    take: limit,
  });
}

export async function getPublicServicePageData(slug: string) {
  const service = await getServiceBySlug(slug);
  const relatedServices = await getRelatedServices(service.categoryId, service.id);
  return { service, relatedServices };
}

export async function listPublicServiceSlugs() {
  return prisma.service.findMany({
    select: { slug: true, updatedAt: true },
    orderBy: { nameEn: "asc" },
  });
}

async function resolveServiceSlug(nameEn: string, excludeId?: string) {
  const fetchSlugs = async () => {
    const rows = await prisma.service.findMany({ select: { slug: true } });
    return rows.map((row) => row.slug);
  };

  if (excludeId) {
    const existing = await prisma.service.findUnique({ where: { id: excludeId } });
    return resolveUniqueSlugWithExclude(nameEn, fetchSlugs, existing?.slug);
  }

  return resolveUniqueSlug(nameEn, fetchSlugs);
}

async function ensureServiceCategoryExists(categoryId: string) {
  const category = await prisma.serviceCategory.findUnique({
    where: { id: categoryId },
  });
  if (!category) throw new NotFoundError("Service category not found");
}

export async function createService(input: CreateServiceInput) {
  await ensureServiceCategoryExists(input.categoryId);
  const slug = await resolveServiceSlug(input.nameEn);

  return prisma.service.create({
    data: {
      categoryId: input.categoryId,
      slug,
      nameEn: input.nameEn,
      nameAr: input.nameAr,
      heroTitleEn: input.heroTitleEn,
      heroTitleAr: input.heroTitleAr,
      heroDescriptionEn: input.heroDescriptionEn,
      heroDescriptionAr: input.heroDescriptionAr,
      overviewTitleEn: input.overviewTitleEn,
      overviewTitleAr: input.overviewTitleAr,
      overviewDescriptionEn: input.overviewDescriptionEn,
      overviewDescriptionAr: input.overviewDescriptionAr,
      overviewImageUrl: input.overviewImageUrl,
      overviewImagePublicId: input.overviewImagePublicId,
      strategicBenefitsImageUrl: input.strategicBenefitsImageUrl,
      strategicBenefitsImagePublicId: input.strategicBenefitsImagePublicId,
      strategicBenefits: { create: input.strategicBenefits },
    },
    include: serviceInclude,
  });
}

export async function updateService(id: string, input: UpdateServiceInput) {
  await getServiceById(id);

  if (input.categoryId) {
    await ensureServiceCategoryExists(input.categoryId);
  }

  const slug = input.nameEn ? await resolveServiceSlug(input.nameEn, id) : undefined;

  return prisma.$transaction(async (tx) => {
    if (input.strategicBenefits) {
      await tx.serviceStrategicBenefit.deleteMany({ where: { serviceId: id } });
      await tx.serviceStrategicBenefit.createMany({
        data: input.strategicBenefits.map((benefit) => ({
          ...benefit,
          serviceId: id,
        })),
      });
    }

    return tx.service.update({
      where: { id },
      data: {
        ...(input.categoryId !== undefined && { categoryId: input.categoryId }),
        ...(slug !== undefined && { slug }),
        ...(input.nameEn !== undefined && { nameEn: input.nameEn }),
        ...(input.nameAr !== undefined && { nameAr: input.nameAr }),
        ...(input.heroTitleEn !== undefined && { heroTitleEn: input.heroTitleEn }),
        ...(input.heroTitleAr !== undefined && { heroTitleAr: input.heroTitleAr }),
        ...(input.heroDescriptionEn !== undefined && {
          heroDescriptionEn: input.heroDescriptionEn,
        }),
        ...(input.heroDescriptionAr !== undefined && {
          heroDescriptionAr: input.heroDescriptionAr,
        }),
        ...(input.overviewTitleEn !== undefined && {
          overviewTitleEn: input.overviewTitleEn,
        }),
        ...(input.overviewTitleAr !== undefined && {
          overviewTitleAr: input.overviewTitleAr,
        }),
        ...(input.overviewDescriptionEn !== undefined && {
          overviewDescriptionEn: input.overviewDescriptionEn,
        }),
        ...(input.overviewDescriptionAr !== undefined && {
          overviewDescriptionAr: input.overviewDescriptionAr,
        }),
        ...(input.overviewImageUrl !== undefined && {
          overviewImageUrl: input.overviewImageUrl,
        }),
        ...(input.overviewImagePublicId !== undefined && {
          overviewImagePublicId: input.overviewImagePublicId,
        }),
        ...(input.strategicBenefitsImageUrl !== undefined && {
          strategicBenefitsImageUrl: input.strategicBenefitsImageUrl,
        }),
        ...(input.strategicBenefitsImagePublicId !== undefined && {
          strategicBenefitsImagePublicId: input.strategicBenefitsImagePublicId,
        }),
      },
      include: serviceInclude,
    });
  });
}

export async function deleteService(id: string) {
  await getServiceById(id);

  const enquiryCount = await prisma.contactEnquiry.count({
    where: { serviceId: id },
  });

  if (enquiryCount > 0) {
    throw new ConflictError("Cannot delete service linked to contact enquiries");
  }

  await prisma.service.delete({ where: { id } });
}
