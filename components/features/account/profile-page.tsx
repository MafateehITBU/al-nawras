"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeader } from "@/components/ui/page-header";
import { ImageUploadField } from "@/components/features/uploads/image-upload-field";
import { useUnsavedChanges } from "@/components/providers/unsaved-changes-provider";
import { CLOUDINARY_FOLDERS } from "@/constants";
import { PERMISSION_LABELS } from "@/constants/permissions";
import { apiClient } from "@/lib/api/client";
import { isSuperAdmin, type SessionAdmin } from "@/lib/authorization/permissions";
import { notify } from "@/lib/utils/notify";
import type { AdminPublic } from "@/types";
import { AdminRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface ProfileFormState {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileImageUrl: string | null;
  profileImagePublicId: string | null;
}

function toFormState(admin: SessionAdmin): ProfileFormState {
  return {
    name: admin.name,
    email: admin.email,
    phoneNumber: admin.phoneNumber,
    password: "",
    confirmPassword: "",
    profileImageUrl: admin.profileImageUrl,
    profileImagePublicId: admin.profileImagePublicId,
  };
}

const ROLE_LABELS: Record<AdminRole, string> = {
  [AdminRole.SUPER_ADMIN]: "Super Admin",
  [AdminRole.ADMIN]: "Admin",
};

export function ProfilePage({ admin }: { admin: SessionAdmin }) {
  const router = useRouter();
  const { update: updateSession } = useSession();
  const [baseline, setBaseline] = useState<ProfileFormState>(() => toFormState(admin));
  const [form, setForm] = useState<ProfileFormState>(() => toFormState(admin));
  const [saving, setSaving] = useState(false);
  const { markDirty, markClean } = useUnsavedChanges(false);

  const isDirty = useMemo(() => {
    const profileChanged =
      form.name !== baseline.name ||
      form.email !== baseline.email ||
      form.phoneNumber !== baseline.phoneNumber ||
      form.profileImageUrl !== baseline.profileImageUrl ||
      form.profileImagePublicId !== baseline.profileImagePublicId;

    const passwordChanged = form.password.length > 0 || form.confirmPassword.length > 0;

    return profileChanged || passwordChanged;
  }, [baseline, form]);

  useEffect(() => {
    if (isDirty) markDirty();
    else markClean();
  }, [isDirty, markDirty, markClean]);

  async function handleSave() {
    if (form.password || form.confirmPassword) {
      if (form.password !== form.confirmPassword) {
        notify.error("Passwords do not match");
        return;
      }
    }

    setSaving(true);
    try {
      const body: Record<string, unknown> = {
        name: form.name.trim(),
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        profileImageUrl: form.profileImageUrl,
        profileImagePublicId: form.profileImagePublicId,
      };

      if (form.password.trim()) {
        body.password = form.password.trim();
      }

      const updated = await apiClient<AdminPublic>("/api/admin/me", {
        method: "PATCH",
        body,
      });

      const nextBaseline = toFormState(updated);
      setBaseline(nextBaseline);
      setForm(nextBaseline);
      markClean();

      await updateSession({ admin: updated });
      notify.success("Profile updated");
      router.refresh();
    } catch (error) {
      notify.fromError(error, "Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Profile"
        description="Manage your account details and password."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Profile" },
        ]}
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <SectionHeader title="Profile photo" />
          </CardHeader>
          <CardContent>
            <ImageUploadField
              label="Profile image"
              folder={CLOUDINARY_FOLDERS.ADMIN_PROFILES}
              value={
                form.profileImageUrl && form.profileImagePublicId
                  ? { url: form.profileImageUrl, publicId: form.profileImagePublicId }
                  : null
              }
              onChange={(asset) => {
                setForm((prev) => ({
                  ...prev,
                  profileImageUrl: asset?.url ?? null,
                  profileImagePublicId: asset?.publicId ?? null,
                }));
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SectionHeader title="Account details" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Full name" htmlFor="profileName" required>
                <Input
                  id="profileName"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  autoComplete="name"
                />
              </FormField>

              <FormField label="Email" htmlFor="profileEmail" required>
                <Input
                  id="profileEmail"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
                />
              </FormField>

              <FormField label="Phone number" htmlFor="profilePhone" required>
                <Input
                  id="profilePhone"
                  type="tel"
                  value={form.phoneNumber}
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                  autoComplete="tel"
                />
              </FormField>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SectionHeader
              title="Change password"
              description="Leave blank to keep your current password."
            />
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <FormField label="New password" htmlFor="profilePassword">
              <Input
                id="profilePassword"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                autoComplete="new-password"
              />
            </FormField>

            <FormField label="Confirm new password" htmlFor="profileConfirmPassword">
              <Input
                id="profileConfirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                autoComplete="new-password"
              />
            </FormField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SectionHeader title="Role & permissions" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-dashboard-text">Role</p>
              <Badge variant={isSuperAdmin(admin) ? "secondary" : "default"} className="mt-2">
                {ROLE_LABELS[admin.role]}
              </Badge>
            </div>

            {!isSuperAdmin(admin) && (
              <div>
                <p className="text-sm font-medium text-dashboard-text">Permissions</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {admin.permissions.length > 0 ? (
                    admin.permissions.map((permission) => (
                      <Badge key={permission} variant="default">
                        {PERMISSION_LABELS[permission]}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-dashboard-text-muted">No permissions assigned</p>
                  )}
                </div>
              </div>
            )}

            {isSuperAdmin(admin) && (
              <p className="text-sm text-dashboard-text-muted">
                Super admins have full access to all dashboard features.
              </p>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={() => void handleSave()} loading={saving} disabled={!isDirty}>
            Save changes
          </Button>
        </div>
      </div>
    </>
  );
}
