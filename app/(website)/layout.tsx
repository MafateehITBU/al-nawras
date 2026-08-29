import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function WebsiteLayout({ children }: LayoutProps<"/">) {
  return <>{children}</>;
}
