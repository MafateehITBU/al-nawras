import { ConflictError, NotFoundError } from "@/lib/api/errors";
import prisma from "@/lib/db/prisma";
import { resolveUniqueSlug, resolveUniqueSlugWithExclude } from "@/lib/utils/slug";
import type {
  CreateServiceCategoryInput,
  UpdateServiceCategoryInput,
} from "@/lib/validations/content";
import type { PaginationQuery } from "@/lib/validations/common";
import { Prisma } from "@prisma/client";

const categoryInclude = {
  _count: { select: { services: true } },
} as const;

export async function listServiceCategories(query: PaginationQuery) {
  const { page, limit, search, sortBy, sortOrder } = query;
  const skip = (page - 1) * limit;

  const where: Prisma.ServiceCategoryWhereInput = search
    ? {
        OR: [
          { nameEn: { contains: search, mode: "insensitive" } },
          { nameAr: { contains: search, mode: "insensitive" } },
          { slug: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const orderBy: Prisma.ServiceCategoryOrderByWithRelationInput =
    sortBy === "nameEn"
      ? { nameEn: sortOrder }
      : sortBy === "slug"
        ? { slug: sortOrder }
        : { createdAt: sortOrder };

  const [items, total] = await Promise.all([
    prisma.serviceCategory.findMany({
      where,
      include: categoryInclude,
      orderBy,
      skip,
      take: limit,
    }),
    prisma.serviceCategory.count({ where }),
  ]);

  return { items, pagination: { page, limit, total } };
}

export async function getServiceCategoryById(id: string) {
  const category = await prisma.serviceCategory.findUnique({
    where: { id },
    include: categoryInclude,
  });
  if (!category) throw new NotFoundError("Service category not found");
  return category;
}

async function resolveCategorySlug(nameEn: string, slug?: string, excludeId?: string) {
  if (slug) return slug;

  const fetchSlugs = async () => {
    const rows = await prisma.serviceCategory.findMany({ select: { slug: true } });
    return rows.map((row) => row.slug);
  };

  if (excludeId) {
    const existing = await prisma.serviceCategory.findUnique({ where: { id: excludeId } });
    return resolveUniqueSlugWithExclude(nameEn, fetchSlugs, existing?.slug);
  }

  return resolveUniqueSlug(nameEn, fetchSlugs);
}

export async function createServiceCategory(input: CreateServiceCategoryInput) {
  const slug = await resolveCategorySlug(input.nameEn);

  return prisma.serviceCategory.create({
    data: { nameEn: input.nameEn, nameAr: input.nameAr, slug },
    include: categoryInclude,
  });
}

export async function updateServiceCategory(
  id: string,
  input: UpdateServiceCategoryInput,
) {
  await getServiceCategoryById(id);

  const slug = input.nameEn
    ? await resolveCategorySlug(input.nameEn, undefined, id)
    : undefined;

  return prisma.serviceCategory.update({
    where: { id },
    data: {
      ...(input.nameEn !== undefined && { nameEn: input.nameEn }),
      ...(input.nameAr !== undefined && { nameAr: input.nameAr }),
      ...(slug !== undefined && { slug }),
    },
    include: categoryInclude,
  });
}

export async function deleteServiceCategory(id: string) {
  await getServiceCategoryById(id);

  const serviceCount = await prisma.service.count({ where: { categoryId: id } });
  if (serviceCount > 0) {
    throw new ConflictError("Cannot delete category with existing services");
  }

  await prisma.serviceCategory.delete({ where: { id } });
}
