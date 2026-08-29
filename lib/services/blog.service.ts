import { NotFoundError } from "@/lib/api/errors";
import prisma from "@/lib/db/prisma";
import { calculateReadingTime } from "@/lib/utils/index";
import { resolveUniqueSlug, resolveUniqueSlugWithExclude } from "@/lib/utils/slug";
import type { CreateBlogInput, ListBlogsQuery, UpdateBlogInput } from "@/lib/validations/content";
import { Prisma } from "@prisma/client";

const blogInclude = {
  category: {
    select: { id: true, nameEn: true, nameAr: true, slug: true },
  },
} as const;

export async function listBlogs(query: ListBlogsQuery) {
  const { page, limit, search, sortBy, sortOrder, categoryId } = query;
  const skip = (page - 1) * limit;

  const where: Prisma.BlogWhereInput = {
    ...(categoryId && { categoryId }),
    ...(search && {
      OR: [
        { titleEn: { contains: search, mode: "insensitive" } },
        { titleAr: { contains: search, mode: "insensitive" } },
        { authorName: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const orderBy: Prisma.BlogOrderByWithRelationInput =
    sortBy === "titleEn"
      ? { titleEn: sortOrder }
      : sortBy === "publishedAt"
        ? { publishedAt: sortOrder }
        : { createdAt: sortOrder };

  const [items, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      include: blogInclude,
      orderBy,
      skip,
      take: limit,
    }),
    prisma.blog.count({ where }),
  ]);

  return { items, pagination: { page, limit, total } };
}

export async function getBlogById(id: string) {
  const blog = await prisma.blog.findUnique({
    where: { id },
    include: blogInclude,
  });
  if (!blog) throw new NotFoundError("Blog not found");
  return blog;
}

async function ensureBlogCategoryExists(categoryId: string) {
  const category = await prisma.blogCategory.findUnique({ where: { id: categoryId } });
  if (!category) throw new NotFoundError("Blog category not found");
}

async function resolveBlogSlug(titleEn: string, slug?: string, excludeId?: string) {
  if (slug) return slug;

  const fetchSlugs = async () => {
    const rows = await prisma.blog.findMany({ select: { slug: true } });
    return rows.map((row) => row.slug);
  };

  if (excludeId) {
    const existing = await prisma.blog.findUnique({ where: { id: excludeId } });
    return resolveUniqueSlugWithExclude(titleEn, fetchSlugs, existing?.slug);
  }

  return resolveUniqueSlug(titleEn, fetchSlugs);
}

function computeReadingTime(contentEn: string, contentAr: string) {
  return Math.max(
    calculateReadingTime(contentEn),
    calculateReadingTime(contentAr),
  );
}

export async function createBlog(input: CreateBlogInput) {
  await ensureBlogCategoryExists(input.categoryId);

  const slug = await resolveBlogSlug(input.titleEn);
  const readingTimeMinutes = computeReadingTime(input.contentEn, input.contentAr);

  return prisma.blog.create({
    data: {
      authorName: input.authorName,
      publishedAt: input.publishedAt,
      readingTimeMinutes,
      titleEn: input.titleEn,
      titleAr: input.titleAr,
      contentEn: input.contentEn,
      contentAr: input.contentAr,
      featuredImageUrl: input.featuredImageUrl,
      featuredImagePublicId: input.featuredImagePublicId,
      attachmentUrl: input.attachmentUrl ?? null,
      attachmentPublicId: input.attachmentPublicId ?? null,
      attachmentFormat: input.attachmentFormat ?? null,
      slug,
      categoryId: input.categoryId,
    },
    include: blogInclude,
  });
}

export async function updateBlog(id: string, input: UpdateBlogInput) {
  const existing = await getBlogById(id);

  if (input.categoryId) {
    await ensureBlogCategoryExists(input.categoryId);
  }

  const contentEn = input.contentEn ?? existing.contentEn;
  const contentAr = input.contentAr ?? existing.contentAr;
  const titleEn = input.titleEn ?? existing.titleEn;

  const slug = input.titleEn
    ? await resolveBlogSlug(titleEn, undefined, id)
    : undefined;

  const readingTimeMinutes =
    input.contentEn !== undefined || input.contentAr !== undefined
      ? computeReadingTime(contentEn, contentAr)
      : undefined;

  return prisma.blog.update({
    where: { id },
    data: {
      ...(input.authorName !== undefined && { authorName: input.authorName }),
      ...(input.publishedAt !== undefined && { publishedAt: input.publishedAt }),
      ...(readingTimeMinutes !== undefined && { readingTimeMinutes }),
      ...(input.titleEn !== undefined && { titleEn: input.titleEn }),
      ...(input.titleAr !== undefined && { titleAr: input.titleAr }),
      ...(input.contentEn !== undefined && { contentEn: input.contentEn }),
      ...(input.contentAr !== undefined && { contentAr: input.contentAr }),
      ...(input.featuredImageUrl !== undefined && {
        featuredImageUrl: input.featuredImageUrl,
      }),
      ...(input.featuredImagePublicId !== undefined && {
        featuredImagePublicId: input.featuredImagePublicId,
      }),
      ...(input.attachmentUrl !== undefined && { attachmentUrl: input.attachmentUrl }),
      ...(input.attachmentPublicId !== undefined && {
        attachmentPublicId: input.attachmentPublicId,
      }),
      ...(input.attachmentFormat !== undefined && {
        attachmentFormat: input.attachmentFormat,
      }),
      ...(slug !== undefined && { slug }),
      ...(input.categoryId !== undefined && { categoryId: input.categoryId }),
    },
    include: blogInclude,
  });
}

export async function deleteBlog(id: string) {
  await getBlogById(id);
  await prisma.blog.delete({ where: { id } });
}
