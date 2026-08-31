"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { LoadingState } from "@/components/ui/loading";
import { PageHeader } from "@/components/ui/page-header";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IconPicker } from "@/components/features/services/icon-picker";
import { LocaleTabs } from "@/components/features/shared/locale-tabs";
import { useFormGuard } from "@/components/features/shared/use-form-guard";
import { ImageUploadField } from "@/components/features/uploads/image-upload-field";
import { CLOUDINARY_FOLDERS, type SupportedLocale } from "@/constants";
import { apiClient, apiClientPaginated } from "@/lib/api/client";
import { notify } from "@/lib/utils/notify";
import type { Service, ServiceCategory, ServiceStrategicBenefit } from "@/types";
import { Icon } from "@iconify/react";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BenefitFormState {
  icon: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

interface ServiceFormState {
  categoryId: string;
  nameEn: string;
  nameAr: string;
  heroTitleEn: string;
  heroTitleAr: string;
  heroDescriptionEn: string;
  heroDescriptionAr: string;
  overviewTitleEn: string;
  overviewTitleAr: string;
  overviewDescriptionEn: string;
  overviewDescriptionAr: string;
  overviewImageUrl: string;
  overviewImagePublicId: string;
  strategicBenefitsImageUrl: string;
  strategicBenefitsImagePublicId: string;
  strategicBenefits: BenefitFormState[];
}

const emptyBenefit = (): BenefitFormState => ({
  icon: "mdi:shield-check",
  titleEn: "",
  titleAr: "",
  descriptionEn: "",
  descriptionAr: "",
});

const emptyForm = (): ServiceFormState => ({
  categoryId: "",
  nameEn: "",
  nameAr: "",
  heroTitleEn: "",
  heroTitleAr: "",
  heroDescriptionEn: "",
  heroDescriptionAr: "",
  overviewTitleEn: "",
  overviewTitleAr: "",
  overviewDescriptionEn: "",
  overviewDescriptionAr: "",
  overviewImageUrl: "",
  overviewImagePublicId: "",
  strategicBenefitsImageUrl: "",
  strategicBenefitsImagePublicId: "",
  strategicBenefits: [emptyBenefit()],
});

type ServiceDetail = Service & {
  category: Pick<ServiceCategory, "id" | "nameEn" | "nameAr" | "slug">;
  strategicBenefits: ServiceStrategicBenefit[];
};

function validateForm(form: ServiceFormState): string | null {
  if (!form.categoryId) return "Category is required";
  if (!form.nameEn.trim() || !form.nameAr.trim()) return "Service name is required in both languages";
  if (!form.heroTitleEn.trim() || !form.heroTitleAr.trim()) {
    return "Hero title is required in both languages";
  }
  if (!form.heroDescriptionEn.trim() || !form.heroDescriptionAr.trim()) {
    return "Hero description is required in both languages";
  }
  if (!form.overviewTitleEn.trim() || !form.overviewTitleAr.trim()) {
    return "Overview title is required in both languages";
  }
  if (!form.overviewDescriptionEn.trim() || !form.overviewDescriptionAr.trim()) {
    return "Overview description is required in both languages";
  }
  if (!form.overviewImageUrl || !form.overviewImagePublicId) {
    return "Overview image is required";
  }
  if (!form.strategicBenefitsImageUrl || !form.strategicBenefitsImagePublicId) {
    return "Strategic benefits image is required";
  }
  if (form.strategicBenefits.length === 0) {
    return "At least one strategic benefit is required";
  }

  for (const [index, benefit] of form.strategicBenefits.entries()) {
    if (
      !benefit.icon.trim() ||
      !benefit.titleEn.trim() ||
      !benefit.titleAr.trim() ||
      !benefit.descriptionEn.trim() ||
      !benefit.descriptionAr.trim()
    ) {
      return `Strategic benefit ${index + 1} is incomplete`;
    }
  }

  return null;
}

export function ServiceFormPage({ serviceId }: { serviceId?: string }) {
  const router = useRouter();
  const isEditing = Boolean(serviceId);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [form, setForm] = useState<ServiceFormState>(emptyForm());
  const [benefitIndex, setBenefitIndex] = useState<number | null>(null);
  const { navigateAway, resetBaseline } = useFormGuard(form, { enabled: !loading });

  useEffect(() => {
    void apiClientPaginated<ServiceCategory>(
      "/api/admin/service-categories?limit=100&sortOrder=asc",
    ).then((result) => setCategories(result.items));
  }, []);

  useEffect(() => {
    if (!serviceId) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    void (async () => {
      try {
        const service = await apiClient<ServiceDetail>(`/api/admin/services/${serviceId}`);
        if (cancelled) return;

        setForm({
          categoryId: service.categoryId,
          nameEn: service.nameEn,
          nameAr: service.nameAr,
          heroTitleEn: service.heroTitleEn,
          heroTitleAr: service.heroTitleAr,
          heroDescriptionEn: service.heroDescriptionEn,
          heroDescriptionAr: service.heroDescriptionAr,
          overviewTitleEn: service.overviewTitleEn,
          overviewTitleAr: service.overviewTitleAr,
          overviewDescriptionEn: service.overviewDescriptionEn,
          overviewDescriptionAr: service.overviewDescriptionAr,
          overviewImageUrl: service.overviewImageUrl,
          overviewImagePublicId: service.overviewImagePublicId,
          strategicBenefitsImageUrl: service.strategicBenefitsImageUrl,
          strategicBenefitsImagePublicId: service.strategicBenefitsImagePublicId,
          strategicBenefits:
            service.strategicBenefits.length > 0
              ? service.strategicBenefits.map((b) => ({
                  icon: b.icon,
                  titleEn: b.titleEn,
                  titleAr: b.titleAr,
                  descriptionEn: b.descriptionEn,
                  descriptionAr: b.descriptionAr,
                }))
              : [emptyBenefit()],
        });
      } catch (error) {
        if (!cancelled) {
          notify.fromError(error, "Failed to load service");
          router.push("/admin/services");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [serviceId, router]);

  useEffect(() => {
    if (!loading && isEditing) {
      resetBaseline();
    }
  }, [loading, isEditing, resetBaseline]);

  function updateBenefit(index: number, patch: Partial<BenefitFormState>) {
    setForm((prev) => ({
      ...prev,
      strategicBenefits: prev.strategicBenefits.map((b, i) =>
        i === index ? { ...b, ...patch } : b,
      ),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationError = validateForm(form);
    if (validationError) {
      notify.error(validationError);
      return;
    }

    setSaving(true);
    try {
      const body = {
        categoryId: form.categoryId,
        nameEn: form.nameEn.trim(),
        nameAr: form.nameAr.trim(),
        heroTitleEn: form.heroTitleEn.trim(),
        heroTitleAr: form.heroTitleAr.trim(),
        heroDescriptionEn: form.heroDescriptionEn.trim(),
        heroDescriptionAr: form.heroDescriptionAr.trim(),
        overviewTitleEn: form.overviewTitleEn.trim(),
        overviewTitleAr: form.overviewTitleAr.trim(),
        overviewDescriptionEn: form.overviewDescriptionEn.trim(),
        overviewDescriptionAr: form.overviewDescriptionAr.trim(),
        overviewImageUrl: form.overviewImageUrl,
        overviewImagePublicId: form.overviewImagePublicId,
        strategicBenefitsImageUrl: form.strategicBenefitsImageUrl,
        strategicBenefitsImagePublicId: form.strategicBenefitsImagePublicId,
        strategicBenefits: form.strategicBenefits.map((benefit, index) => ({
          icon: benefit.icon.trim(),
          titleEn: benefit.titleEn.trim(),
          titleAr: benefit.titleAr.trim(),
          descriptionEn: benefit.descriptionEn.trim(),
          descriptionAr: benefit.descriptionAr.trim(),
          sortOrder: index,
        })),
      };

      if (isEditing && serviceId) {
        await apiClient(`/api/admin/services/${serviceId}`, { method: "PATCH", body });
        notify.success("Service updated");
      } else {
        await apiClient("/api/admin/services", { method: "POST", body });
        notify.success("Service created");
      }
      resetBaseline();
      void navigateAway("/admin/services");
    } catch (error) {
      notify.fromError(error, "Failed to save service");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <LoadingState message="Loading service…" />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PageHeader
        title={isEditing ? "Edit service" : "Add service"}
        breadcrumbs={[
          { label: "Services", href: "/admin/services" },
          { label: isEditing ? "Edit" : "New" },
        ]}
        actions={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => void navigateAway("/admin/services")}
            >
              Cancel
            </Button>
            <Button type="submit" loading={saving}>
              {isEditing ? "Save changes" : "Create service"}
            </Button>
          </>
        }
      />

      <Card>
        <CardContent className="space-y-4 pt-5">
          <FormField label="Category" htmlFor="categoryId" required>
            <Select
              id="categoryId"
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nameEn}
                </option>
              ))}
            </Select>
          </FormField>

          <div className="flex items-center justify-between pt-2">
            <p className="text-sm font-medium text-dashboard-text">Service content</p>
            <LocaleTabs active={locale} onChange={setLocale} />
          </div>

          {locale === "en" ? (
            <div className="space-y-4">
              <FormField label="Name (English)" htmlFor="nameEn" required>
                <Input
                  id="nameEn"
                  value={form.nameEn}
                  onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                />
              </FormField>
              <FormField label="Hero title (English)" htmlFor="heroTitleEn" required>
                <Input
                  id="heroTitleEn"
                  value={form.heroTitleEn}
                  onChange={(e) => setForm({ ...form, heroTitleEn: e.target.value })}
                />
              </FormField>
              <FormField
                label="Hero description (English)"
                htmlFor="heroDescriptionEn"
                required
              >
                <Textarea
                  id="heroDescriptionEn"
                  value={form.heroDescriptionEn}
                  onChange={(e) =>
                    setForm({ ...form, heroDescriptionEn: e.target.value })
                  }
                  rows={3}
                />
              </FormField>
              <FormField label="Overview title (English)" htmlFor="overviewTitleEn" required>
                <Input
                  id="overviewTitleEn"
                  value={form.overviewTitleEn}
                  onChange={(e) =>
                    setForm({ ...form, overviewTitleEn: e.target.value })
                  }
                />
              </FormField>
              <FormField
                label="Overview description (English)"
                htmlFor="overviewDescriptionEn"
                required
              >
                <Textarea
                  id="overviewDescriptionEn"
                  value={form.overviewDescriptionEn}
                  onChange={(e) =>
                    setForm({ ...form, overviewDescriptionEn: e.target.value })
                  }
                  rows={5}
                />
              </FormField>
            </div>
          ) : (
            <div className="space-y-4">
              <FormField label="Name (Arabic)" htmlFor="nameAr" required>
                <Input
                  id="nameAr"
                  dir="rtl"
                  value={form.nameAr}
                  onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
                />
              </FormField>
              <FormField label="Hero title (Arabic)" htmlFor="heroTitleAr" required>
                <Input
                  id="heroTitleAr"
                  dir="rtl"
                  value={form.heroTitleAr}
                  onChange={(e) => setForm({ ...form, heroTitleAr: e.target.value })}
                />
              </FormField>
              <FormField
                label="Hero description (Arabic)"
                htmlFor="heroDescriptionAr"
                required
              >
                <Textarea
                  id="heroDescriptionAr"
                  dir="rtl"
                  value={form.heroDescriptionAr}
                  onChange={(e) =>
                    setForm({ ...form, heroDescriptionAr: e.target.value })
                  }
                  rows={3}
                />
              </FormField>
              <FormField label="Overview title (Arabic)" htmlFor="overviewTitleAr" required>
                <Input
                  id="overviewTitleAr"
                  dir="rtl"
                  value={form.overviewTitleAr}
                  onChange={(e) =>
                    setForm({ ...form, overviewTitleAr: e.target.value })
                  }
                />
              </FormField>
              <FormField
                label="Overview description (Arabic)"
                htmlFor="overviewDescriptionAr"
                required
              >
                <Textarea
                  id="overviewDescriptionAr"
                  dir="rtl"
                  value={form.overviewDescriptionAr}
                  onChange={(e) =>
                    setForm({ ...form, overviewDescriptionAr: e.target.value })
                  }
                  rows={5}
                />
              </FormField>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 pt-5">
          <p className="text-sm font-medium text-dashboard-text">Service images</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <ImageUploadField
              label="Overview image"
              required
              folder={CLOUDINARY_FOLDERS.SERVICE_IMAGES}
              value={
                form.overviewImageUrl
                  ? {
                      url: form.overviewImageUrl,
                      publicId: form.overviewImagePublicId,
                    }
                  : null
              }
              onChange={(asset) =>
                setForm({
                  ...form,
                  overviewImageUrl: asset?.url ?? "",
                  overviewImagePublicId: asset?.publicId ?? "",
                })
              }
            />
            <ImageUploadField
              label="Strategic benefits image"
              required
              folder={CLOUDINARY_FOLDERS.SERVICE_IMAGES}
              value={
                form.strategicBenefitsImageUrl
                  ? {
                      url: form.strategicBenefitsImageUrl,
                      publicId: form.strategicBenefitsImagePublicId,
                    }
                  : null
              }
              onChange={(asset) =>
                setForm({
                  ...form,
                  strategicBenefitsImageUrl: asset?.url ?? "",
                  strategicBenefitsImagePublicId: asset?.publicId ?? "",
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 pt-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-dashboard-text">
              Strategic benefits <span className="text-dashboard-error">*</span>
            </p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  strategicBenefits: [...prev.strategicBenefits, emptyBenefit()],
                }))
              }
            >
              <Plus className="size-4" />
              Add benefit
            </Button>
          </div>

          {form.strategicBenefits.map((benefit, index) => (
            <div
              key={index}
              className="space-y-3 rounded-lg border border-dashboard-border p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                  {benefit.icon && (
                    <Icon icon={benefit.icon} className="size-5 text-dashboard-primary" />
                  )}
                  Benefit {index + 1}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Remove benefit"
                  disabled={form.strategicBenefits.length === 1}
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      strategicBenefits: prev.strategicBenefits.filter((_, i) => i !== index),
                    }))
                  }
                >
                  <Trash2 className="size-4 text-dashboard-error" />
                </Button>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setBenefitIndex(benefitIndex === index ? null : index)}
              >
                {benefitIndex === index ? "Hide icon picker" : "Choose icon"}
              </Button>

              {benefitIndex === index && (
                <IconPicker
                  value={benefit.icon}
                  onChange={(icon) => updateBenefit(index, { icon })}
                />
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <FormField label="Title (EN)" htmlFor={`benefit-titleEn-${index}`} required>
                  <Input
                    id={`benefit-titleEn-${index}`}
                    value={benefit.titleEn}
                    onChange={(e) => updateBenefit(index, { titleEn: e.target.value })}
                  />
                </FormField>
                <FormField label="Title (AR)" htmlFor={`benefit-titleAr-${index}`} required>
                  <Input
                    id={`benefit-titleAr-${index}`}
                    dir="rtl"
                    value={benefit.titleAr}
                    onChange={(e) => updateBenefit(index, { titleAr: e.target.value })}
                  />
                </FormField>
                <FormField
                  label="Description (EN)"
                  htmlFor={`benefit-descEn-${index}`}
                  required
                >
                  <Textarea
                    id={`benefit-descEn-${index}`}
                    value={benefit.descriptionEn}
                    onChange={(e) =>
                      updateBenefit(index, { descriptionEn: e.target.value })
                    }
                    rows={2}
                  />
                </FormField>
                <FormField
                  label="Description (AR)"
                  htmlFor={`benefit-descAr-${index}`}
                  required
                >
                  <Textarea
                    id={`benefit-descAr-${index}`}
                    dir="rtl"
                    value={benefit.descriptionAr}
                    onChange={(e) =>
                      updateBenefit(index, { descriptionAr: e.target.value })
                    }
                    rows={2}
                  />
                </FormField>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </form>
  );
}
