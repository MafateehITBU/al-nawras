"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { LoadingState } from "@/components/ui/loading";
import { PageHeader } from "@/components/ui/page-header";
import { Select } from "@/components/ui/select";
import { RichTextEditor } from "@/components/features/editor/rich-text-editor";
import { LocaleTabs } from "@/components/features/shared/locale-tabs";
import { useFormGuard } from "@/components/features/shared/use-form-guard";
import { DocumentUploadField } from "@/components/features/uploads/document-upload-field";
import { ImageUploadField } from "@/components/features/uploads/image-upload-field";
import { CLOUDINARY_FOLDERS, type SupportedLocale } from "@/constants";
import { apiClient, apiClientPaginated } from "@/lib/api/client";
import { notify } from "@/lib/utils/notify";
import type { Blog, BlogCategory } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BlogFormState {
  authorName: string;
  publishedAt: string;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  categoryId: string;
  featuredImageUrl: string;
  featuredImagePublicId: string;
  attachmentUrl: string | null;
  attachmentPublicId: string | null;
  attachmentFormat: string | null;
}

function toDateInputValue(date: Date | string) {
  const d = new Date(date);
  return d.toISOString().slice(0, 10);
}

const emptyForm = (): BlogFormState => ({
  authorName: "",
  publishedAt: toDateInputValue(new Date()),
  titleEn: "",
  titleAr: "",
  contentEn: "",
  contentAr: "",
  categoryId: "",
  featuredImageUrl: "",
  featuredImagePublicId: "",
  attachmentUrl: null,
  attachmentPublicId: null,
  attachmentFormat: null,
});

export function BlogFormPage({ blogId }: { blogId?: string }) {
  const router = useRouter();
  const isEditing = Boolean(blogId);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [form, setForm] = useState<BlogFormState>(emptyForm());
  const { navigateAway, resetBaseline } = useFormGuard(form, { enabled: !loading });

  useEffect(() => {
    void apiClientPaginated<BlogCategory>("/api/admin/blog-categories?limit=100").then(
      (result) => setCategories(result.items),
    );
  }, []);

  useEffect(() => {
    if (!blogId) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    void (async () => {
      try {
        const blog = await apiClient<Blog>(`/api/admin/blogs/${blogId}`);
        if (cancelled) return;

        setForm({
          authorName: blog.authorName,
          publishedAt: toDateInputValue(blog.publishedAt),
          titleEn: blog.titleEn,
          titleAr: blog.titleAr,
          contentEn: blog.contentEn,
          contentAr: blog.contentAr,
          categoryId: blog.categoryId,
          featuredImageUrl: blog.featuredImageUrl,
          featuredImagePublicId: blog.featuredImagePublicId,
          attachmentUrl: blog.attachmentUrl,
          attachmentPublicId: blog.attachmentPublicId,
          attachmentFormat: blog.attachmentFormat,
        });
      } catch (error) {
        if (!cancelled) {
          notify.fromError(error, "Failed to load blog");
          router.push("/admin/blogs");
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
  }, [blogId, router]);

  useEffect(() => {
    if (!loading && isEditing) {
      resetBaseline();
    }
  }, [loading, isEditing, resetBaseline]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        authorName: form.authorName.trim(),
        publishedAt: form.publishedAt,
        titleEn: form.titleEn.trim(),
        titleAr: form.titleAr.trim(),
        contentEn: form.contentEn.trim(),
        contentAr: form.contentAr.trim(),
        categoryId: form.categoryId,
        featuredImageUrl: form.featuredImageUrl,
        featuredImagePublicId: form.featuredImagePublicId,
        attachmentUrl: form.attachmentUrl,
        attachmentPublicId: form.attachmentPublicId,
        attachmentFormat: form.attachmentFormat,
      };

      if (isEditing && blogId) {
        await apiClient(`/api/admin/blogs/${blogId}`, { method: "PATCH", body });
        notify.success("Blog updated");
      } else {
        await apiClient("/api/admin/blogs", { method: "POST", body });
        notify.success("Blog created");
      }
      resetBaseline();
      void navigateAway("/admin/blogs");
    } catch (error) {
      notify.fromError(error, "Failed to save blog");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <LoadingState message="Loading blog…" />;

  return (
    <form onSubmit={handleSubmit}>
      <PageHeader
        title={isEditing ? "Edit blog" : "Add blog"}
        breadcrumbs={[
          { label: "Blogs", href: "/admin/blogs" },
          { label: isEditing ? "Edit" : "New" },
        ]}
        actions={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => void navigateAway("/admin/blogs")}
            >
              Cancel
            </Button>
            <Button type="submit" loading={saving}>
              {isEditing ? "Save changes" : "Create blog"}
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="space-y-4 pt-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-dashboard-text">Content</p>
                <LocaleTabs active={locale} onChange={setLocale} />
              </div>

              {locale === "en" ? (
                <>
                  <FormField label="Title (English)" htmlFor="titleEn" required>
                    <Input
                      id="titleEn"
                      value={form.titleEn}
                      onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                    />
                  </FormField>
                  <FormField label="Content (English)" htmlFor="contentEn" required>
                    <RichTextEditor
                      value={form.contentEn}
                      onChange={(contentEn) => setForm({ ...form, contentEn })}
                    />
                  </FormField>
                </>
              ) : (
                <>
                  <FormField label="Title (Arabic)" htmlFor="titleAr" required>
                    <Input
                      id="titleAr"
                      dir="rtl"
                      value={form.titleAr}
                      onChange={(e) => setForm({ ...form, titleAr: e.target.value })}
                    />
                  </FormField>
                  <FormField label="Content (Arabic)" htmlFor="contentAr" required>
                    <RichTextEditor
                      value={form.contentAr}
                      onChange={(contentAr) => setForm({ ...form, contentAr })}
                      dir="rtl"
                    />
                  </FormField>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-4 pt-5">
              <FormField label="Author" htmlFor="authorName" required>
                <Input
                  id="authorName"
                  value={form.authorName}
                  onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                />
              </FormField>
              <FormField label="Published date" htmlFor="publishedAt" required>
                <Input
                  id="publishedAt"
                  type="date"
                  value={form.publishedAt}
                  onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
                />
              </FormField>
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
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 pt-5">
              <ImageUploadField
                label="Featured image"
                required
                folder={CLOUDINARY_FOLDERS.BLOG_IMAGES}
                value={
                  form.featuredImageUrl
                    ? {
                        url: form.featuredImageUrl,
                        publicId: form.featuredImagePublicId,
                      }
                    : null
                }
                onChange={(asset) =>
                  setForm({
                    ...form,
                    featuredImageUrl: asset?.url ?? "",
                    featuredImagePublicId: asset?.publicId ?? "",
                  })
                }
              />
              <DocumentUploadField
                label="Attachment (optional)"
                folder={CLOUDINARY_FOLDERS.BLOG_ATTACHMENTS}
                value={
                  form.attachmentUrl && form.attachmentPublicId
                    ? {
                        url: form.attachmentUrl,
                        publicId: form.attachmentPublicId,
                        format: form.attachmentFormat,
                      }
                    : null
                }
                onChange={(asset) =>
                  setForm({
                    ...form,
                    attachmentUrl: asset?.url ?? null,
                    attachmentPublicId: asset?.publicId ?? null,
                    attachmentFormat: asset?.format ?? null,
                  })
                }
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
