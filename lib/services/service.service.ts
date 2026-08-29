import { ConflictError, NotFoundError } from "@/lib/api/errors";
import prisma from "@/lib/db/prisma";
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

async function ensureServiceCategoryExists(categoryId: string) {
  const category = await prisma.serviceCategory.findUnique({
    where: { id: categoryId },
  });
  if (!category) throw new NotFoundError("Service category not found");
}

export async function createService(input: CreateServiceInput) {
  await ensureServiceCategoryExists(input.categoryId);

  return prisma.service.create({
    data: {
      categoryId: input.categoryId,
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
      strategicBenefits:
        input.strategicBenefits.length > 0
          ? { create: input.strategicBenefits }
          : undefined,
    },
    include: serviceInclude,
  });
}

export async function updateService(id: string, input: UpdateServiceInput) {
  await getServiceById(id);

  if (input.categoryId) {
    await ensureServiceCategoryExists(input.categoryId);
  }

  return prisma.$transaction(async (tx) => {
    if (input.strategicBenefits) {
      await tx.serviceStrategicBenefit.deleteMany({ where: { serviceId: id } });
      if (input.strategicBenefits.length > 0) {
        await tx.serviceStrategicBenefit.createMany({
          data: input.strategicBenefits.map((benefit) => ({
            ...benefit,
            serviceId: id,
          })),
        });
      }
    }

    return tx.service.update({
      where: { id },
      data: {
        ...(input.categoryId !== undefined && { categoryId: input.categoryId }),
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
