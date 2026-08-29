import { ProfilePage } from "@/components/features/account/profile-page";
import { auth } from "@/lib/auth/config";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();
  const admin = session?.admin;

  if (!admin?.isActive) {
    redirect("/admin/login");
  }

  return <ProfilePage admin={admin} />;
}
