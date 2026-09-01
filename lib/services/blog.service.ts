import { NotFoundError } from "@/lib/api/errors";
import prisma from "@/lib/db/prisma";
import { calculateReadingTime } from "@/lib/utils/index";
import { resolveUniqueSlug, resolveUniqueSlugWithExclude } from "@/lib/utils/slug";
import type {
  CreateBlogInput,
  ListBlogsQuery,
  PublicBlogListQuery,
  UpdateBlogInput,
} from "@/lib/validations/content";
import { Prisma } from "@prisma/client";

const blogInclude = {
  category: {
    select: { id: true, nameEn: true, nameAr: true, slug: true },
  },
} as const;

const publicBlogListSelect = {
  id: true,
  slug: true,
  titleEn: true,
  titleAr: true,
  contentEn: true,
  contentAr: true,
  publishedAt: true,
  readingTimeMinutes: true,
  authorName: true,
  featuredImageUrl: true,
  category: {
    select: { id: true, nameEn: true, nameAr: true, slug: true },
  },
} as const;

export type PublicBlogListItem = Prisma.BlogGetPayload<{
  select: typeof publicBlogListSelect;
}>;

export type PublicBlogDetail = Prisma.BlogGetPayload<{
  include: typeof blogInclude;
}>;

export type RelatedBlogSummary = PublicBlogListItem;

function publishedBlogWhere(now = new Date()): Prisma.BlogWhereInput {
  return { publishedAt: { lte: now } };
}

function buildBlogSearchWhere(search: string): Prisma.BlogWhereInput {
  return {
    OR: [
      { titleEn: { contains: search, mode: "insensitive" } },
      { titleAr: { contains: search, mode: "insensitive" } },
      { contentEn: { contains: search, mode: "insensitive" } },
      { contentAr: { contains: search, mode: "insensitive" } },
      { authorName: { contains: search, mode: "insensitive" } },
      { category: { nameEn: { contains: search, mode: "insensitive" } } },
      { category: { nameAr: { contains: search, mode: "insensitive" } } },
    ],
  };
}

export async function listBlogs(query: ListBlogsQuery) {
  const { page, limit, search, sortBy, sortOrder, categoryId } = query;
  const skip = (page - 1) * limit;

  const where: Prisma.BlogWhereInput = {
    ...(categoryId && { categoryId }),
    ...(search && buildBlogSearchWhere(search)),
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
      attachmentName: input.attachmentName ?? null,
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
      ...(input.attachmentName !== undefined && {
        attachmentName: input.attachmentName,
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

export async function getFeaturedPublicBlog() {
  return prisma.blog.findFirst({
    where: publishedBlogWhere(),
    orderBy: { publishedAt: "desc" },
    select: publicBlogListSelect,
  });
}

export async function listPublicBlogs(query: PublicBlogListQuery) {
  const { page, limit, search, categoryId, excludeId } = query;
  const skip = (page - 1) * limit;

  const where: Prisma.BlogWhereInput = {
    ...publishedBlogWhere(),
    ...(categoryId && { categoryId }),
    ...(excludeId && { id: { not: excludeId } }),
    ...(search && buildBlogSearchWhere(search)),
  };

  const [items, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      select: publicBlogListSelect,
      orderBy: { publishedAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.blog.count({ where }),
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
  };
}

export async function getPublicBlogBySlug(slug: string) {
  const blog = await prisma.blog.findFirst({
    where: {
      slug,
      ...publishedBlogWhere(),
    },
    include: blogInclude,
  });

  if (!blog) throw new NotFoundError("Blog not found");
  return blog;
}

export async function getRelatedPublicBlogs(
  categoryId: string,
  excludeBlogId: string,
  limit = 3,
) {
  return prisma.blog.findMany({
    where: {
      ...publishedBlogWhere(),
      categoryId,
      id: { not: excludeBlogId },
    },
    select: publicBlogListSelect,
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getPublicBlogPageData(slug: string) {
  const blog = await getPublicBlogBySlug(slug);
  const relatedBlogs = await getRelatedPublicBlogs(blog.categoryId, blog.id);
  return { blog, relatedBlogs };
}

export async function getPopularBlogCategories() {
  const categories = await prisma.blogCategory.findMany({
    select: {
      id: true,
      nameEn: true,
      nameAr: true,
      slug: true,
      _count: {
        select: {
          blogs: {
            where: publishedBlogWhere(),
          },
        },
      },
    },
    orderBy: { nameEn: "asc" },
  });

  return categories
    .map((category) => ({
      id: category.id,
      nameEn: category.nameEn,
      nameAr: category.nameAr,
      slug: category.slug,
      blogCount: category._count.blogs,
    }))
    .filter((category) => category.blogCount > 0)
    .sort((a, b) => b.blogCount - a.blogCount || a.nameEn.localeCompare(b.nameEn));
}

export async function listPublicBlogSlugs() {
  return prisma.blog.findMany({
    where: publishedBlogWhere(),
    select: { slug: true, updatedAt: true },
    orderBy: { publishedAt: "desc" },
  });
}
