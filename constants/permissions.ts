import { Permission } from "@prisma/client";

export const PERMISSION_LABELS: Record<Permission, string> = {
  MANAGE_ADMINS: "Manage admins",
  MANAGE_BLOGS: "Manage blogs",
  MANAGE_SERVICES: "Manage services",
  MANAGE_CONTACT_ENQUIRIES: "Manage contact enquiries",
  MANAGE_WEBSITE_SETTINGS: "Manage website settings",
};

export const ALL_PERMISSIONS = Object.values(Permission);
