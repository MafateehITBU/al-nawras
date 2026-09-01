"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal, ModalFooter } from "@/components/ui/modal";
import { PageHeader } from "@/components/ui/page-header";
import { Pagination } from "@/components/ui/pagination";
import { IconPicker } from "@/components/features/services/icon-picker";
import { LocaleTabs } from "@/components/features/shared/locale-tabs";
import {
  ListFiltersCard,
  ListSearchField,
} from "@/components/features/shared/list-filters-card";
import { SearchToolbar } from "@/components/features/shared/search-toolbar";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { useDeleteConfirm } from "@/components/providers/confirm-dialog-provider";
import { PAGINATION, type SupportedLocale } from "@/constants";
import { apiClient, apiClientPaginated } from "@/lib/api/client";
import { notify } from "@/lib/utils/notify";
import type { PaginatedResult, ServiceCategory } from "@/types";
import { Icon } from "@iconify/react";
import { FolderTree, Pencil, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface CategoryFormState {
  nameEn: string;
  nameAr: string;
  icon: string;
  descriptionEn: string;
  descriptionAr: string;
}

const emptyForm = (): CategoryFormState => ({
  nameEn: "",
  nameAr: "",
  icon: "mdi:briefcase-outline",
  descriptionEn: "",
  descriptionAr: "",
});

export function ServiceCategoriesPage() {
  const confirmDelete = useDeleteConfirm();
  const [data, setData] = useState<PaginatedResult<ServiceCategory> | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(PAGINATION.DEFAULT_PAGE);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ServiceCategory | null>(null);
  const [form, setForm] = useState<CategoryFormState>(emptyForm());
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGINATION.DEFAULT_LIMIT),
      });
      if (search) params.set("search", search);
      const result = await apiClientPaginated<ServiceCategory>(
        `/api/admin/service-categories?${params}`,
      );
      setData(result);
    } catch (error) {
      notify.fromError(error, "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    void load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm());
    setLocale("en");
    setModalOpen(true);
  }

  function openEdit(category: ServiceCategory) {
    setEditing(category);
    setForm({
      nameEn: category.nameEn,
      nameAr: category.nameAr,
      icon: category.icon,
      descriptionEn: category.descriptionEn,
      descriptionAr: category.descriptionAr,
    });
    setLocale("en");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
    setForm(emptyForm());
  }

  async function handleSubmit() {
    if (!form.icon.trim()) {
      notify.error("Choose an icon");
      return;
    }
    if (!form.nameEn.trim() || !form.nameAr.trim()) {
      notify.error("Name is required in both languages");
      return;
    }
    if (!form.descriptionEn.trim() || !form.descriptionAr.trim()) {
      notify.error("Description is required in both languages");
      return;
    }

    setSaving(true);
    try {
      const body = {
        nameEn: form.nameEn.trim(),
        nameAr: form.nameAr.trim(),
        icon: form.icon.trim(),
        descriptionEn: form.descriptionEn.trim(),
        descriptionAr: form.descriptionAr.trim(),
      };

      if (editing) {
        await apiClient(`/api/admin/service-categories/${editing.id}`, {
          method: "PATCH",
          body,
        });
        notify.success("Category updated");
      } else {
        await apiClient("/api/admin/service-categories", { method: "POST", body });
        notify.success("Category created");
      }
      closeModal();
      void load();
    } catch (error) {
      notify.fromError(error, "Failed to save category");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(category: ServiceCategory) {
    const confirmed = await confirmDelete(`"${category.nameEn}"`);
    if (!confirmed) return;

    try {
      await apiClient(`/api/admin/service-categories/${category.id}`, {
        method: "DELETE",
      });
      notify.success("Category deleted");
      void load();
    } catch (error) {
      notify.fromError(error, "Failed to delete category");
    }
  }

  return (
    <>
      <PageHeader
        title="Service Categories"
        description="Organize services into categories. Name, icon, and description are used on the home page Core Services cards."
        actions={
          <Button onClick={openCreate}>
            <Plus className="size-4" />
            Add category
          </Button>
        }
      />

      <ListFiltersCard>
        <ListSearchField>
          <SearchToolbar
            value={searchInput}
            onChange={setSearchInput}
            onSearch={() => {
              setPage(1);
              setSearch(searchInput.trim());
            }}
            placeholder="Search categories…"
          />
        </ListSearchField>
      </ListFiltersCard>

      <Card>
        <CardContent className="pt-5">
          {loading ? (
            <p className="py-8 text-center text-sm text-dashboard-text-muted">Loading…</p>
          ) : !data?.items.length ? (
            <EmptyState
              icon={FolderTree}
              title="No categories"
              description="Create a category before adding services."
              actionLabel="Add category"
              onAction={openCreate}
            />
          ) : (
            <>
              <Table>
                <THead>
                  <TR>
                    <TH className="w-14">Icon</TH>
                    <TH>Name (EN)</TH>
                    <TH>Name (AR)</TH>
                    <TH>Slug</TH>
                    <TH className="w-24 text-right">Actions</TH>
                  </TR>
                </THead>
                <TBody>
                  {data.items.map((category) => (
                    <TR key={category.id}>
                      <TD>
                        <span className="flex size-9 items-center justify-center rounded-lg bg-dashboard-bg text-dashboard-primary">
                          <Icon icon={category.icon} className="size-5" aria-hidden />
                        </span>
                      </TD>
                      <TD>{category.nameEn}</TD>
                      <TD dir="rtl">{category.nameAr}</TD>
                      <TD className="text-dashboard-text-muted">{category.slug}</TD>
                      <TD className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Edit category"
                            onClick={() => openEdit(category)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Delete category"
                            onClick={() => handleDelete(category)}
                          >
                            <Trash2 className="size-4 text-dashboard-error" />
                          </Button>
                        </div>
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
              {data.pagination && (
                <Pagination
                  pagination={data.pagination}
                  onPageChange={setPage}
                  className="mt-4"
                />
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit category" : "Add category"}
        description="Name, icon, and description appear on the home page Core Services cards."
        size="lg"
        footer={
          <ModalFooter
            onCancel={closeModal}
            onSubmit={handleSubmit}
            loading={saving}
            submitLabel={editing ? "Update" : "Create"}
          />
        }
      >
        <div className="space-y-4">
          <FormField label="Icon" htmlFor="svcCatIcon" required>
            <IconPicker
              value={form.icon}
              onChange={(icon) => setForm({ ...form, icon })}
            />
          </FormField>
          <LocaleTabs active={locale} onChange={setLocale} />
          {locale === "en" ? (
            <>
              <FormField label="Name (English)" htmlFor="svcCatNameEn" required>
                <Input
                  id="svcCatNameEn"
                  value={form.nameEn}
                  onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                />
              </FormField>
              <FormField label="Description (English)" htmlFor="svcCatDescEn" required>
                <Textarea
                  id="svcCatDescEn"
                  rows={4}
                  value={form.descriptionEn}
                  onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
                />
              </FormField>
            </>
          ) : (
            <>
              <FormField label="Name (Arabic)" htmlFor="svcCatNameAr" required>
                <Input
                  id="svcCatNameAr"
                  dir="rtl"
                  value={form.nameAr}
                  onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
                />
              </FormField>
              <FormField label="Description (Arabic)" htmlFor="svcCatDescAr" required>
                <Textarea
                  id="svcCatDescAr"
                  dir="rtl"
                  rows={4}
                  value={form.descriptionAr}
                  onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })}
                />
              </FormField>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
