import { Permission } from "@prisma/client";
import {
  FileText,
  FolderTree,
  Globe,
  LayoutDashboard,
  Mail,
  Shield,
  User,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  permission?: Permission;
  /** Shown to all authenticated admins when true */
  public?: boolean;
}

export interface DashboardNavGroup {
  label?: string;
  items: DashboardNavItem[];
}

export const dashboardNavGroups: DashboardNavGroup[] = [
  {
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        public: true,
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        label: "Admins",
        href: "/admin/admins",
        icon: Shield,
        permission: Permission.MANAGE_ADMINS,
      },
      {
        label: "Website Information",
        href: "/admin/website",
        icon: Globe,
        permission: Permission.MANAGE_WEBSITE_SETTINGS,
      },
    ],
  },
  {
    label: "Content",
    items: [
      {
        label: "Blog Categories",
        href: "/admin/blog-categories",
        icon: FolderTree,
        permission: Permission.MANAGE_BLOGS,
      },
      {
        label: "Blogs",
        href: "/admin/blogs",
        icon: FileText,
        permission: Permission.MANAGE_BLOGS,
      },
      {
        label: "Service Categories",
        href: "/admin/service-categories",
        icon: FolderTree,
        permission: Permission.MANAGE_SERVICES,
      },
      {
        label: "Services",
        href: "/admin/services",
        icon: Wrench,
        permission: Permission.MANAGE_SERVICES,
      },
    ],
  },
  {
    label: "Enquiries",
    items: [
      {
        label: "Contact Enquiries",
        href: "/admin/contact-enquiries",
        icon: Mail,
        permission: Permission.MANAGE_CONTACT_ENQUIRIES,
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        label: "Profile",
        href: "/admin/account",
        icon: User,
        public: true,
      },
    ],
  },
];

export function filterNavForAdmin(
  groups: DashboardNavGroup[],
  canAccess: (permission?: Permission) => boolean,
): DashboardNavGroup[] {
  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => item.public || (item.permission && canAccess(item.permission)),
      ),
    }))
    .filter((group) => group.items.length > 0);
}
