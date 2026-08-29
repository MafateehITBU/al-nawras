import { NotFoundError } from "@/lib/api/errors";
import prisma from "@/lib/db/prisma";
import type {
  CreateContactEnquiryInput,
  ListContactEnquiriesQuery,
  UpdateContactEnquiryInput,
} from "@/lib/validations/content";
import { Prisma } from "@prisma/client";

const enquiryInclude = {
  service: {
    select: { id: true, nameEn: true, nameAr: true, heroTitleEn: true, heroTitleAr: true },
  },
} as const;

export async function listContactEnquiries(query: ListContactEnquiriesQuery) {
  const { page, limit, search, sortBy, sortOrder, status, serviceId } = query;
  const skip = (page - 1) * limit;

  const where: Prisma.ContactEnquiryWhereInput = {
    ...(status && { status }),
    ...(serviceId && { serviceId }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
        { country: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const orderBy: Prisma.ContactEnquiryOrderByWithRelationInput =
    sortBy === "name"
      ? { name: sortOrder }
      : sortBy === "status"
        ? { status: sortOrder }
        : { createdAt: sortOrder };

  const [items, total] = await Promise.all([
    prisma.contactEnquiry.findMany({
      where,
      include: enquiryInclude,
      orderBy,
      skip,
      take: limit,
    }),
    prisma.contactEnquiry.count({ where }),
  ]);

  return { items, pagination: { page, limit, total } };
}

export async function getContactEnquiryById(id: string) {
  const enquiry = await prisma.contactEnquiry.findUnique({
    where: { id },
    include: enquiryInclude,
  });
  if (!enquiry) throw new NotFoundError("Contact enquiry not found");
  return enquiry;
}

async function ensureServiceExists(serviceId: string) {
  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) throw new NotFoundError("Service not found");
}

export async function createContactEnquiry(input: CreateContactEnquiryInput) {
  await ensureServiceExists(input.serviceId);

  return prisma.contactEnquiry.create({
    data: {
      name: input.name,
      email: input.email,
      phoneNumber: input.phoneNumber,
      company: input.company ?? null,
      serviceId: input.serviceId,
      country: input.country,
      message: input.message,
    },
    include: enquiryInclude,
  });
}

export async function updateContactEnquiry(
  id: string,
  input: UpdateContactEnquiryInput,
) {
  await getContactEnquiryById(id);

  return prisma.contactEnquiry.update({
    where: { id },
    data: input,
    include: enquiryInclude,
  });
}

export async function deleteContactEnquiry(id: string) {
  await getContactEnquiryById(id);
  await prisma.contactEnquiry.delete({ where: { id } });
}
