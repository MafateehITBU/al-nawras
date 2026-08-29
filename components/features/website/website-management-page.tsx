"use client";

import { AddressesSection } from "@/components/features/website/addresses-section";
import { GeneralSettingsSection } from "@/components/features/website/general-settings-section";
import { MapLocationsSection } from "@/components/features/website/map-locations-section";
import { PhonesSection } from "@/components/features/website/phones-section";
import { SocialLinksSection } from "@/components/features/website/social-links-section";
import type { WebsiteContent } from "@/components/features/website/types";
import { ErrorState } from "@/components/ui/empty-state";
import { LoadingState } from "@/components/ui/loading";
import { PageHeader } from "@/components/ui/page-header";
import { apiClient } from "@/lib/api/client";
import { useCallback, useEffect, useState } from "react";

export function WebsiteManagementPage() {
  const [data, setData] = useState<WebsiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const content = await apiClient<WebsiteContent>("/api/admin/website");
      setData(content);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) {
    return (
      <>
        <PageHeader
          title="Website Information"
          description="Manage contact details, addresses, map pins, and social links."
        />
        <LoadingState message="Loading website information…" />
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        <PageHeader title="Website Information" />
        <ErrorState onRetry={load} />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Website Information"
        description="Manage contact details, addresses, map pins, and social links shown on the public website."
      />

      <div className="space-y-6">
        <GeneralSettingsSection
          settings={data.settings}
          onSaved={(settings) => setData({ ...data, settings })}
        />
        <PhonesSection
          phones={data.phones}
          onChange={(phones) => setData({ ...data, phones })}
        />
        <AddressesSection
          addresses={data.addresses}
          onChange={(addresses) => setData({ ...data, addresses })}
        />
        <MapLocationsSection
          mapLocations={data.mapLocations}
          onChange={(mapLocations) => setData({ ...data, mapLocations })}
        />
        <SocialLinksSection
          socialLinks={data.socialLinks}
          onSaved={(socialLinks) => setData({ ...data, socialLinks })}
        />
      </div>
    </>
  );
}
