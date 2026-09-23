import { DashboardProviders } from "@/components/providers/dashboard-providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
  icons: {
    icon: [{ url: "/images/favicon.png", type: "image/png" }],
    shortcut: "/images/favicon.png",
    apple: [{ url: "/images/favicon.png", type: "image/png" }],
  },
};

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return <DashboardProviders>{children}</DashboardProviders>;
}
