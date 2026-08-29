"use client";

import { useCan } from "@/components/dashboard/admin-session-provider";
import { Card, CardContent } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/empty-state";
import { LoadingState } from "@/components/ui/loading";
import { PageHeader } from "@/components/ui/page-header";
import { apiClient } from "@/lib/api/client";
import type { DashboardStats } from "@/lib/services/stats.service";
import { Permission } from "@prisma/client";
import {
  FileText,
  FolderTree,
  Mail,
  Shield,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface StatCardProps {
  title: string;
  value: number;
  href: string;
  icon: React.ReactNode;
  highlight?: string;
}

function StatCard({ title, value, href, icon, highlight }: StatCardProps) {
  return (
    <Link href={href}>
      <Card className="transition-shadow hover:shadow-md">
        <CardContent className="flex items-start justify-between gap-4 pt-5">
          <div>
            <p className="text-sm font-medium text-dashboard-text-muted">{title}</p>
            <p className="mt-2 text-3xl font-semibold text-dashboard-text">{value}</p>
            {highlight && (
              <p className="mt-1 text-xs font-medium text-dashboard-warning">{highlight}</p>
            )}
          </div>
          <div className="flex size-11 items-center justify-center rounded-lg bg-dashboard-primary/10 text-dashboard-primary">
            {icon}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function DashboardHomePage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const canManageAdmins = useCan(Permission.MANAGE_ADMINS);
  const canManageBlogs = useCan(Permission.MANAGE_BLOGS);
  const canManageServices = useCan(Permission.MANAGE_SERVICES);
  const canManageEnquiries = useCan(Permission.MANAGE_CONTACT_ENQUIRIES);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await apiClient<DashboardStats>("/api/admin/stats");
      setStats(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const cards: StatCardProps[] = [];

  if (stats?.admins !== undefined && canManageAdmins) {
    cards.push({
      title: "Admins",
      value: stats.admins,
      href: "/admin/admins",
      icon: <Shield className="size-5" />,
    });
  }

  if (stats?.blogCategories !== undefined && canManageBlogs) {
    cards.push({
      title: "Blog categories",
      value: stats.blogCategories,
      href: "/admin/blog-categories",
      icon: <FolderTree className="size-5" />,
    });
  }

  if (stats?.blogs !== undefined && canManageBlogs) {
    cards.push({
      title: "Blogs",
      value: stats.blogs,
      href: "/admin/blogs",
      icon: <FileText className="size-5" />,
    });
  }

  if (stats?.serviceCategories !== undefined && canManageServices) {
    cards.push({
      title: "Service categories",
      value: stats.serviceCategories,
      href: "/admin/service-categories",
      icon: <FolderTree className="size-5" />,
    });
  }

  if (stats?.services !== undefined && canManageServices) {
    cards.push({
      title: "Services",
      value: stats.services,
      href: "/admin/services",
      icon: <Wrench className="size-5" />,
    });
  }

  if (stats?.contactEnquiries !== undefined && canManageEnquiries) {
    cards.push({
      title: "Contact enquiries",
      value: stats.contactEnquiries,
      href: "/admin/contact-enquiries",
      icon: <Mail className="size-5" />,
      highlight:
        stats.newContactEnquiries && stats.newContactEnquiries > 0
          ? `${stats.newContactEnquiries} new`
          : undefined,
    });
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your Al Nawras admin workspace."
      />

      {loading && <LoadingState message="Loading statistics…" />}
      {error && !loading && <ErrorState onRetry={load} />}

      {!loading && !error && cards.length === 0 && (
        <Card>
          <CardContent className="py-10 text-center text-sm text-dashboard-text-muted">
            <Users className="mx-auto mb-3 size-8 text-dashboard-primary" />
            No statistics available for your current permissions.
          </CardContent>
        </Card>
      )}

      {!loading && !error && cards.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>
      )}
    </>
  );
}
