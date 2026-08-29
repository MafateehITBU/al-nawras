"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/ui/page-header";
import { ImageUploadField } from "@/components/features/uploads/image-upload-field";
import { useUnsavedChanges } from "@/components/providers/unsaved-changes-provider";
import { CLOUDINARY_FOLDERS } from "@/constants";
import { apiClient } from "@/lib/api/client";
import type { WebsiteSettings } from "@prisma/client";
import { notify } from "@/lib/utils/notify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function GeneralSettingsSection({
  settings,
  onSaved,
}: {
  settings: WebsiteSettings;
  onSaved: (settings: WebsiteSettings) => void;
}) {
  const [businessHours, setBusinessHours] = useState(settings.businessHours ?? "");
  const [contactEmail, setContactEmail] = useState(settings.contactEmail ?? "");
  const [logoUrl, setLogoUrl] = useState<string | null>(settings.logoUrl);
  const [logoPublicId, setLogoPublicId] = useState<string | null>(
    settings.logoPublicId,
  );
  const [loading, setLoading] = useState(false);
  const { markDirty, markClean } = useUnsavedChanges(false);
  const router = useRouter();

  useEffect(() => {
    setBusinessHours(settings.businessHours ?? "");
    setContactEmail(settings.contactEmail ?? "");
    setLogoUrl(settings.logoUrl);
    setLogoPublicId(settings.logoPublicId);
    markClean();
  }, [settings, markClean]);

  const isDirty =
    businessHours !== (settings.businessHours ?? "") ||
    contactEmail !== (settings.contactEmail ?? "") ||
    logoUrl !== settings.logoUrl ||
    logoPublicId !== settings.logoPublicId;

  useEffect(() => {
    if (isDirty) markDirty();
    else markClean();
  }, [isDirty, markDirty, markClean]);

  async function handleSave() {
    setLoading(true);
    try {
      const updated = await apiClient<WebsiteSettings>("/api/admin/website/settings", {
        method: "PATCH",
        body: {
          businessHours: businessHours.trim() || null,
          contactEmail: contactEmail.trim() || null,
          logoUrl,
          logoPublicId,
        },
      });
      notify.success("General settings saved");
      onSaved(updated);
      markClean();
      router.refresh();
    } catch (error) {
      notify.fromError(error, "Failed to save settings");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <SectionHeader
          title="General"
          description="Site logo, business hours, and contact email for the public website."
          actions={
            <Button onClick={handleSave} loading={loading} disabled={!isDirty}>
              Save changes
            </Button>
          }
        />
      </CardHeader>
      <CardContent className="space-y-5">
        <ImageUploadField
          label="Site logo"
          folder={CLOUDINARY_FOLDERS.WEBSITE_LOGO}
          value={
            logoUrl && logoPublicId ? { url: logoUrl, publicId: logoPublicId } : null
          }
          onChange={(asset) => {
            setLogoUrl(asset?.url ?? null);
            setLogoPublicId(asset?.publicId ?? null);
          }}
        />
        <p className="text-xs text-dashboard-text-muted">
          Shown on the public website and admin sidebar after you save.
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Contact email" htmlFor="contactEmail">
            <Input
              id="contactEmail"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="info@alnawras.com"
            />
          </FormField>
          <FormField
            label="Business hours"
            htmlFor="businessHours"
            className="sm:col-span-2"
            hint="Free text — e.g. Sunday–Thursday, 9:00 AM – 5:00 PM"
          >
            <Textarea
              id="businessHours"
              value={businessHours}
              onChange={(e) => setBusinessHours(e.target.value)}
              placeholder="Sunday – Thursday, 9:00 AM – 5:00 PM"
              rows={3}
            />
          </FormField>
        </div>
      </CardContent>
    </Card>
  );
}
