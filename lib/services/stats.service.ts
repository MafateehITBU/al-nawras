import { hasPermission, isSuperAdmin, type SessionAdmin } from "@/lib/authorization/permissions";
import prisma from "@/lib/db/prisma";
import { EnquiryStatus, Permission } from "@prisma/client";

export interface DashboardStats {
  admins?: number;
  blogCategories?: number;
  blogs?: number;
  serviceCategories?: number;
  services?: number;
  contactEnquiries?: number;
  newContactEnquiries?: number;
}

export async function getDashboardStats(actor: SessionAdmin): Promise<DashboardStats> {
  const stats: DashboardStats = {};

  const tasks: Promise<void>[] = [];

  if (hasPermission(actor, Permission.MANAGE_ADMINS)) {
    tasks.push(
      prisma.admin.count().then((count) => {
        stats.admins = count;
      }),
    );
  }

  if (hasPermission(actor, Permission.MANAGE_BLOGS)) {
    tasks.push(
      Promise.all([
        prisma.blogCategory.count(),
        prisma.blog.count(),
      ]).then(([blogCategories, blogs]) => {
        stats.blogCategories = blogCategories;
        stats.blogs = blogs;
      }),
    );
  }

  if (hasPermission(actor, Permission.MANAGE_SERVICES)) {
    tasks.push(
      Promise.all([
        prisma.serviceCategory.count(),
        prisma.service.count(),
      ]).then(([serviceCategories, services]) => {
        stats.serviceCategories = serviceCategories;
        stats.services = services;
      }),
    );
  }

  if (hasPermission(actor, Permission.MANAGE_CONTACT_ENQUIRIES)) {
    tasks.push(
      Promise.all([
        prisma.contactEnquiry.count(),
        prisma.contactEnquiry.count({ where: { status: EnquiryStatus.NEW } }),
      ]).then(([contactEnquiries, newContactEnquiries]) => {
        stats.contactEnquiries = contactEnquiries;
        stats.newContactEnquiries = newContactEnquiries;
      }),
    );
  }

  await Promise.all(tasks);

  if (isSuperAdmin(actor)) {
    // Super admin always sees admin count even if not explicitly checked above
    if (stats.admins === undefined) {
      stats.admins = await prisma.admin.count();
    }
  }

  return stats;
}
