import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { auth } from "@/lib/auth/config";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: LayoutProps<"/admin">) {
  const session = await auth();
  const admin = session?.admin;

  if (!admin?.isActive) {
    redirect("/admin/login");
  }

  const settings = await prisma.websiteSettings.findUnique({
    where: { id: 1 },
    select: { logoUrl: true },
  });

  return (
    <DashboardShell admin={admin} logoUrl={settings?.logoUrl ?? null}>
      {children}
    </DashboardShell>
  );
}
