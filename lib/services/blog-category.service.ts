import { ConflictError, NotFoundError } from "@/lib/api/errors";
import prisma from "@/lib/db/prisma";
import { resolveUniqueSlug, resolveUniqueSlugWithExclude } from "@/lib/utils/slug";
import type {
  CreateBlogCategoryInput,
  UpdateBlogCategoryInput,
} from "@/lib/validations/content";
import type { PaginationQuery } from "@/lib/validations/common";
import { Prisma } from "@prisma/client";

const categoryInclude = {
  _count: { select: { blogs: true } },
} as const;

export async function listBlogCategories(query: PaginationQuery) {
  const { page, limit, search, sortBy, sortOrder } = query;
  const skip = (page - 1) * limit;

  const where: Prisma.BlogCategoryWhereInput = search
    ? {
        OR: [
          { nameEn: { contains: search, mode: "insensitive" } },
          { nameAr: { contains: search, mode: "insensitive" } },
          { slug: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const orderBy: Prisma.BlogCategoryOrderByWithRelationInput =
    sortBy === "nameEn"
      ? { nameEn: sortOrder }
      : sortBy === "slug"
        ? { slug: sortOrder }
        : { createdAt: sortOrder };

  const [items, total] = await Promise.all([
    prisma.blogCategory.findMany({
      where,
      include: categoryInclude,
      orderBy,
      skip,
      take: limit,
    }),
    prisma.blogCategory.count({ where }),
  ]);

  return { items, pagination: { page, limit, total } };
}

export async function getBlogCategoryById(id: string) {
  const category = await prisma.blogCategory.findUnique({
    where: { id },
    include: categoryInclude,
  });
  if (!category) throw new NotFoundError("Blog category not found");
  return category;
}

async function resolveCategorySlug(nameEn: string, slug?: string, excludeId?: string) {
  if (slug) return slug;

  const fetchSlugs = async () => {
    const rows = await prisma.blogCategory.findMany({ select: { slug: true } });
    return rows.map((row) => row.slug);
  };

  if (excludeId) {
    const existing = await prisma.blogCategory.findUnique({ where: { id: excludeId } });
    return resolveUniqueSlugWithExclude(nameEn, fetchSlugs, existing?.slug);
  }

  return resolveUniqueSlug(nameEn, fetchSlugs);
}

export async function createBlogCategory(input: CreateBlogCategoryInput) {
  const slug = await resolveCategorySlug(input.nameEn);

  return prisma.blogCategory.create({
    data: { nameEn: input.nameEn, nameAr: input.nameAr, slug },
    include: categoryInclude,
  });
}

export async function updateBlogCategory(id: string, input: UpdateBlogCategoryInput) {
  const existing = await getBlogCategoryById(id);

  const slug = input.nameEn
    ? await resolveCategorySlug(input.nameEn, undefined, id)
    : undefined;

  return prisma.blogCategory.update({
    where: { id },
    data: {
      ...(input.nameEn !== undefined && { nameEn: input.nameEn }),
      ...(input.nameAr !== undefined && { nameAr: input.nameAr }),
      ...(slug !== undefined && { slug }),
    },
    include: categoryInclude,
  });
}

export async function deleteBlogCategory(id: string) {
  await getBlogCategoryById(id);

  const blogCount = await prisma.blog.count({ where: { categoryId: id } });
  if (blogCount > 0) {
    throw new ConflictError("Cannot delete category with existing blogs");
  }

  await prisma.blogCategory.delete({ where: { id } });
}
