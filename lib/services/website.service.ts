import { NotFoundError } from "@/lib/api/errors";
import prisma from "@/lib/db/prisma";
import type {
  CreateWebsiteAddressInput,
  CreateWebsiteMapLocationInput,
  CreateWebsitePhoneInput,
  UpdateWebsiteAddressInput,
  UpdateWebsiteMapLocationInput,
  UpdateWebsitePhoneInput,
  UpdateWebsiteSettingsInput,
  UpdateWebsiteSocialLinkInput,
} from "@/lib/validations/content";
import { Prisma } from "@prisma/client";

export async function getWebsiteContent() {
  const [settings, phones, addresses, mapLocations, socialLinks] =
    await Promise.all([
      prisma.websiteSettings.findUnique({ where: { id: 1 } }),
      prisma.websitePhone.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.websiteAddress.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.websiteMapLocation.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.websiteSocialLink.findMany({ orderBy: { platform: "asc" } }),
    ]);

  return {
    settings: settings ?? {
      id: 1,
      businessHours: null,
      contactEmail: null,
      logoUrl: null,
      logoPublicId: null,
      updatedAt: new Date(),
    },
    phones,
    addresses,
    mapLocations,
    socialLinks,
  };
}

export async function updateWebsiteSettings(input: UpdateWebsiteSettingsInput) {
  return prisma.websiteSettings.upsert({
    where: { id: 1 },
    update: input,
    create: {
      id: 1,
      businessHours: input.businessHours ?? null,
      contactEmail: input.contactEmail ?? null,
      logoUrl: input.logoUrl ?? null,
      logoPublicId: input.logoPublicId ?? null,
    },
  });
}

export async function listWebsitePhones() {
  return prisma.websitePhone.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getWebsitePhoneById(id: string) {
  const phone = await prisma.websitePhone.findUnique({ where: { id } });
  if (!phone) throw new NotFoundError("Phone number not found");
  return phone;
}

export async function createWebsitePhone(input: CreateWebsitePhoneInput) {
  return prisma.websitePhone.create({ data: input });
}

export async function updateWebsitePhone(id: string, input: UpdateWebsitePhoneInput) {
  await getWebsitePhoneById(id);
  return prisma.websitePhone.update({ where: { id }, data: input });
}

export async function deleteWebsitePhone(id: string) {
  await getWebsitePhoneById(id);
  await prisma.websitePhone.delete({ where: { id } });
}

export async function listWebsiteAddresses() {
  return prisma.websiteAddress.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getWebsiteAddressById(id: string) {
  const address = await prisma.websiteAddress.findUnique({ where: { id } });
  if (!address) throw new NotFoundError("Address not found");
  return address;
}

export async function createWebsiteAddress(input: CreateWebsiteAddressInput) {
  return prisma.websiteAddress.create({ data: input });
}

export async function updateWebsiteAddress(
  id: string,
  input: UpdateWebsiteAddressInput,
) {
  await getWebsiteAddressById(id);
  return prisma.websiteAddress.update({ where: { id }, data: input });
}

export async function deleteWebsiteAddress(id: string) {
  await getWebsiteAddressById(id);
  await prisma.websiteAddress.delete({ where: { id } });
}

export async function listWebsiteMapLocations() {
  return prisma.websiteMapLocation.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getWebsiteMapLocationById(id: string) {
  const location = await prisma.websiteMapLocation.findUnique({ where: { id } });
  if (!location) throw new NotFoundError("Map location not found");
  return location;
}

export async function createWebsiteMapLocation(input: CreateWebsiteMapLocationInput) {
  return prisma.websiteMapLocation.create({
    data: {
      latitude: new Prisma.Decimal(input.latitude),
      longitude: new Prisma.Decimal(input.longitude),
      label: input.label ?? null,
      sortOrder: input.sortOrder,
    },
  });
}

export async function updateWebsiteMapLocation(
  id: string,
  input: UpdateWebsiteMapLocationInput,
) {
  await getWebsiteMapLocationById(id);

  return prisma.websiteMapLocation.update({
    where: { id },
    data: {
      ...(input.latitude !== undefined && {
        latitude: new Prisma.Decimal(input.latitude),
      }),
      ...(input.longitude !== undefined && {
        longitude: new Prisma.Decimal(input.longitude),
      }),
      ...(input.label !== undefined && { label: input.label }),
      ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
    },
  });
}

export async function deleteWebsiteMapLocation(id: string) {
  await getWebsiteMapLocationById(id);
  await prisma.websiteMapLocation.delete({ where: { id } });
}

export async function listWebsiteSocialLinks() {
  return prisma.websiteSocialLink.findMany({ orderBy: { platform: "asc" } });
}

export async function getWebsiteSocialLinkById(id: string) {
  const link = await prisma.websiteSocialLink.findUnique({ where: { id } });
  if (!link) throw new NotFoundError("Social link not found");
  return link;
}

export async function updateWebsiteSocialLink(
  id: string,
  input: UpdateWebsiteSocialLinkInput,
) {
  await getWebsiteSocialLinkById(id);
  return prisma.websiteSocialLink.update({ where: { id }, data: input });
}
