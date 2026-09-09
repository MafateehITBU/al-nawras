"use client";

import { ImageUploadField } from "@/components/features/uploads/image-upload-field";
import {
  ListFiltersCard,
  ListSearchField,
} from "@/components/features/shared/list-filters-card";
import { SearchToolbar } from "@/components/features/shared/search-toolbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState, ErrorState } from "@/components/ui/empty-state";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { LoadingState } from "@/components/ui/loading";
import { Modal, ModalFooter } from "@/components/ui/modal";
import { PageHeader } from "@/components/ui/page-header";
import { Pagination } from "@/components/ui/pagination";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { useDeleteConfirm } from "@/components/providers/confirm-dialog-provider";
import { CLOUDINARY_FOLDERS, PAGINATION } from "@/constants";
import { apiClient, apiClientPaginated } from "@/lib/api/client";
import { notify } from "@/lib/utils/notify";
import type { PaginatedResult } from "@/types";
import type { Partner } from "@prisma/client";
import { Building2, Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface PartnerFormState {
  name: string;
  logoUrl: string;
  logoPublicId: string;
}

const emptyForm = (): PartnerFormState => ({
  name: "",
  logoUrl: "",
  logoPublicId: "",
});

export function PartnersPage() {
  const confirmDelete = useDeleteConfirm();
  const [data, setData] = useState<PaginatedResult<Partner> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(PAGINATION.DEFAULT_PAGE);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [form, setForm] = useState<PartnerFormState>(emptyForm());
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGINATION.DEFAULT_LIMIT),
      });
      if (search) params.set("search", search);
      const result = await apiClientPaginated<Partner>(`/api/admin/partners?${params}`);
      setData(result);
    } catch {
      setError(true);
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
    setModalOpen(true);
  }

  function openEdit(partner: Partner) {
    setEditing(partner);
    setForm({
      name: partner.name,
      logoUrl: partner.logoUrl,
      logoPublicId: partner.logoPublicId,
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
    setForm(emptyForm());
  }

  async function handleSubmit() {
    if (!form.name.trim()) {
      notify.error("Name is required");
      return;
    }
    if (!form.logoUrl || !form.logoPublicId) {
      notify.error("Partner logo is required");
      return;
    }

    setSaving(true);
    try {
      const body = {
        name: form.name.trim(),
        logoUrl: form.logoUrl,
        logoPublicId: form.logoPublicId,
      };

      if (editing) {
        await apiClient<Partner>(`/api/admin/partners/${editing.id}`, {
          method: "PATCH",
          body,
        });
        notify.success("Partner updated");
      } else {
        await apiClient<Partner>("/api/admin/partners", {
          method: "POST",
          body,
        });
        notify.success("Partner added");
        setPage(1);
      }
      closeModal();
      void load();
    } catch (err) {
      notify.fromError(err, "Failed to save partner");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(partner: Partner) {
    const confirmed = await confirmDelete(`"${partner.name}"`);
    if (!confirmed) return;

    try {
      await apiClient(`/api/admin/partners/${partner.id}`, { method: "DELETE" });
      notify.success("Partner deleted");
      if (data?.items.length === 1 && page > 1) {
        setPage((current) => current - 1);
      } else {
        void load();
      }
    } catch (err) {
      notify.fromError(err, "Failed to delete partner");
    }
  }

  if (error && !data) {
    return (
      <>
        <PageHeader title="Partners" />
        <ErrorState onRetry={load} />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Partners"
        description="Manage partner names and logos shown on the homepage."
        actions={
          <Button size="sm" onClick={openCreate}>
            <Plus className="size-4" />
            Add partner
          </Button>
        }
      />

      <ListFiltersCard>
        <ListSearchField>
          <SearchToolbar
            value={search}
            onChange={(next) => {
              setPage(1);
              setSearch(next);
            }}
            placeholder="Search partners…"
          />
        </ListSearchField>
      </ListFiltersCard>

      <Card>
        <CardContent className="pt-6">
          {loading && !data ? (
            <LoadingState message="Loading partners…" />
          ) : !data?.items.length ? (
            <EmptyState
              icon={Building2}
              title="No partners yet"
              description="Add a partner name and logo to show on the homepage."
              actionLabel="Add partner"
              onAction={openCreate}
            />
          ) : (
            <>
              <Table>
                <THead>
                  <TR>
                    <TH>Logo</TH>
                    <TH>Name</TH>
                    <TH className="w-24 text-right">Actions</TH>
                  </TR>
                </THead>
                <TBody>
                  {data.items.map((partner) => (
                    <TR key={partner.id}>
                      <TD>
                        <div className="relative h-10 w-16 overflow-hidden rounded border border-dashboard-border bg-white">
                          <Image
                            src={partner.logoUrl}
                            alt={partner.name}
                            fill
                            className="object-contain p-1"
                            sizes="64px"
                          />
                        </div>
                      </TD>
                      <TD className="font-medium">{partner.name}</TD>
                      <TD className="text-right">
                        <div className="inline-flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={`Edit ${partner.name}`}
                            onClick={() => openEdit(partner)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={`Delete ${partner.name}`}
                            onClick={() => void handleDelete(partner)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
              {data.pagination ? (
                <Pagination
                  pagination={data.pagination}
                  onPageChange={setPage}
                  className="mt-4"
                />
              ) : null}
            </>
          )}
        </CardContent>
      </Card>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit partner" : "Add partner"}
        description="Add a partner name and logo for the homepage."
        footer={
          <ModalFooter
            onCancel={closeModal}
            onSubmit={() => void handleSubmit()}
            loading={saving}
            submitLabel={editing ? "Save changes" : "Add partner"}
          />
        }
      >
        <div className="space-y-4">
          <FormField label="Name" htmlFor="partnerName" required>
            <Input
              id="partnerName"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Organisation name"
            />
          </FormField>

          <ImageUploadField
            label="Logo"
            folder={CLOUDINARY_FOLDERS.PARTNER_LOGOS}
            required
            value={
              form.logoUrl && form.logoPublicId
                ? { url: form.logoUrl, publicId: form.logoPublicId }
                : null
            }
            onChange={(asset) =>
              setForm({
                ...form,
                logoUrl: asset?.url ?? "",
                logoPublicId: asset?.publicId ?? "",
              })
            }
          />
        </div>
      </Modal>
    </>
  );
}
