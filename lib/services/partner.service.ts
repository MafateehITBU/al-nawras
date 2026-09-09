import { NotFoundError } from "@/lib/api/errors";
import prisma from "@/lib/db/prisma";
import type { PaginationQuery } from "@/lib/validations/common";
import type {
  CreatePartnerInput,
  UpdatePartnerInput,
} from "@/lib/validations/content";
import { Prisma } from "@prisma/client";

export async function listPartners() {
  return prisma.partner.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export async function listPartnersPaginated(query: PaginationQuery) {
  const { page, limit, search, sortOrder } = query;
  const skip = (page - 1) * limit;

  const where: Prisma.PartnerWhereInput = search
    ? { name: { contains: search, mode: "insensitive" } }
    : {};

  const [items, total] = await Promise.all([
    prisma.partner.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { name: sortOrder }],
      skip,
      take: limit,
    }),
    prisma.partner.count({ where }),
  ]);

  return { items, pagination: { page, limit, total } };
}

export async function getPartnerById(id: string) {
  const partner = await prisma.partner.findUnique({ where: { id } });
  if (!partner) throw new NotFoundError("Partner not found");
  return partner;
}

export async function createPartner(input: CreatePartnerInput) {
  return prisma.partner.create({
    data: {
      name: input.name,
      logoUrl: input.logoUrl,
      logoPublicId: input.logoPublicId,
      sortOrder: input.sortOrder ?? 0,
    },
  });
}

export async function updatePartner(id: string, input: UpdatePartnerInput) {
  await getPartnerById(id);
  return prisma.partner.update({ where: { id }, data: input });
}

export async function deletePartner(id: string) {
  await getPartnerById(id);
  await prisma.partner.delete({ where: { id } });
}
