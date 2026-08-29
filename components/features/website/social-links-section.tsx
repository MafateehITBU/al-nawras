"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/page-header";
import { useUnsavedChanges } from "@/components/providers/unsaved-changes-provider";
import { SOCIAL_PLATFORM_LABELS } from "@/components/features/website/types";
import { apiClient } from "@/lib/api/client";
import { notify } from "@/lib/utils/notify";
import type { WebsiteSocialLink } from "@prisma/client";
import { Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function SocialLinksSection({
  socialLinks,
  onSaved,
}: {
  socialLinks: WebsiteSocialLink[];
  onSaved: (links: WebsiteSocialLink[]) => void;
}) {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { markDirty, markClean } = useUnsavedChanges(false);

  useEffect(() => {
    const initial: Record<string, string> = {};
    for (const link of socialLinks) {
      initial[link.id] = link.url ?? "";
    }
    setUrls(initial);
    markClean();
  }, [socialLinks, markClean]);

  const isDirty = useMemo(() => {
    return socialLinks.some((link) => (urls[link.id] ?? "") !== (link.url ?? ""));
  }, [socialLinks, urls]);

  useEffect(() => {
    if (isDirty) markDirty();
    else markClean();
  }, [isDirty, markDirty, markClean]);

  async function handleSave() {
    setLoading(true);
    try {
      const updates = socialLinks.filter(
        (link) => (urls[link.id] ?? "") !== (link.url ?? ""),
      );

      const results = await Promise.all(
        updates.map((link) =>
          apiClient<WebsiteSocialLink>(`/api/admin/website/social-links/${link.id}`, {
            method: "PATCH",
            body: { url: urls[link.id]?.trim() || "" },
          }),
        ),
      );

      const updatedMap = new Map(results.map((r) => [r.id, r]));
      const merged = socialLinks.map((link) => updatedMap.get(link.id) ?? link);

      notify.success("Social links saved");
      onSaved(merged);
      markClean();
    } catch (error) {
      notify.fromError(error, "Failed to save social links");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <SectionHeader
          title="Social media"
          description="Profile URLs for social icons on the website. Leave blank to hide a platform."
          actions={
            <Button onClick={handleSave} loading={loading} disabled={!isDirty}>
              Save changes
            </Button>
          }
        />
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {socialLinks.map((link) => (
            <FormField
              key={link.id}
              label={SOCIAL_PLATFORM_LABELS[link.platform] ?? link.platform}
              htmlFor={`social-${link.id}`}
            >
              <Input
                id={`social-${link.id}`}
                type="url"
                value={urls[link.id] ?? ""}
                onChange={(e) =>
                  setUrls((prev) => ({ ...prev, [link.id]: e.target.value }))
                }
                placeholder={`https://${link.platform.toLowerCase()}.com/...`}
              />
            </FormField>
          ))}
        </div>
        {socialLinks.length === 0 && (
          <div className="flex items-center gap-2 text-sm text-dashboard-text-muted">
            <Share2 className="size-4" />
            No social platforms configured in the database.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
