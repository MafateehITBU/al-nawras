"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { FormField } from "@/components/ui/form-field";
import { Modal, ModalFooter } from "@/components/ui/modal";
import { PageHeader } from "@/components/ui/page-header";
import { Pagination } from "@/components/ui/pagination";
import { SearchToolbar } from "@/components/features/shared/search-toolbar";
import { Select } from "@/components/ui/select";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { useDeleteConfirm } from "@/components/providers/confirm-dialog-provider";
import { PAGINATION } from "@/constants";
import { apiClient, apiClientPaginated } from "@/lib/api/client";
import { notify } from "@/lib/utils/notify";
import type { ContactEnquiry, PaginatedResult, Service } from "@/types";
import { EnquiryStatus } from "@prisma/client";
import { Eye, Mail, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type EnquiryListItem = ContactEnquiry & {
  service: Pick<Service, "id" | "nameEn" | "nameAr" | "heroTitleEn" | "heroTitleAr">;
};

const STATUS_LABELS: Record<EnquiryStatus, string> = {
  NEW: "New",
  READ: "Read",
  ARCHIVED: "Archived",
};

const STATUS_VARIANT: Record<
  EnquiryStatus,
  "default" | "success" | "warning" | "error" | "secondary"
> = {
  NEW: "warning",
  READ: "default",
  ARCHIVED: "secondary",
};

export function ContactEnquiriesPage() {
  const confirmDelete = useDeleteConfirm();
  const [data, setData] = useState<PaginatedResult<EnquiryListItem> | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<EnquiryStatus | "">("");
  const [page, setPage] = useState<number>(PAGINATION.DEFAULT_PAGE);
  const [selected, setSelected] = useState<EnquiryListItem | null>(null);
  const [detailStatus, setDetailStatus] = useState<EnquiryStatus>(EnquiryStatus.NEW);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGINATION.DEFAULT_LIMIT),
      });
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);
      const result = await apiClientPaginated<EnquiryListItem>(
        `/api/admin/contact-enquiries?${params}`,
      );
      setData(result);
    } catch (error) {
      notify.fromError(error, "Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  function openDetail(enquiry: EnquiryListItem) {
    setSelected(enquiry);
    setDetailStatus(enquiry.status);
  }

  function closeDetail() {
    setSelected(null);
  }

  async function handleStatusUpdate() {
    if (!selected) return;
    setSaving(true);
    try {
      await apiClient(`/api/admin/contact-enquiries/${selected.id}`, {
        method: "PATCH",
        body: { status: detailStatus },
      });
      notify.success("Enquiry updated");
      closeDetail();
      void load();
    } catch (error) {
      notify.fromError(error, "Failed to update enquiry");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(enquiry: EnquiryListItem) {
    const confirmed = await confirmDelete(`enquiry from "${enquiry.name}"`);
    if (!confirmed) return;

    try {
      await apiClient(`/api/admin/contact-enquiries/${enquiry.id}`, {
        method: "DELETE",
      });
      notify.success("Enquiry deleted");
      void load();
    } catch (error) {
      notify.fromError(error, "Failed to delete enquiry");
    }
  }

  return (
    <>
      <PageHeader
        title="Contact Enquiries"
        description="View and manage messages submitted through the contact form."
      />

      <Card className="mb-6">
        <CardContent className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-end">
          <div className="flex-1">
            <SearchToolbar
              value={searchInput}
              onChange={setSearchInput}
              onSearch={() => {
                setPage(1);
                setSearch(searchInput.trim());
              }}
              placeholder="Search by name, email, company…"
            />
          </div>
          <FormField label="Status" htmlFor="statusFilter" className="w-full sm:w-44">
            <Select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => {
                setPage(1);
                setStatusFilter(e.target.value as EnquiryStatus | "");
              }}
            >
              <option value="">All statuses</option>
              {Object.values(EnquiryStatus).map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </Select>
          </FormField>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          {loading ? (
            <p className="py-8 text-center text-sm text-dashboard-text-muted">Loading…</p>
          ) : !data?.items.length ? (
            <EmptyState
              icon={Mail}
              title="No enquiries"
              description="Contact form submissions will appear here."
            />
          ) : (
            <>
              <Table>
                <THead>
                  <TR>
                    <TH>Name</TH>
                    <TH>Email</TH>
                    <TH>Service</TH>
                    <TH>Status</TH>
                    <TH>Date</TH>
                    <TH className="w-24 text-right">Actions</TH>
                  </TR>
                </THead>
                <TBody>
                  {data.items.map((enquiry) => (
                    <TR key={enquiry.id}>
                      <TD className="font-medium">{enquiry.name}</TD>
                      <TD>{enquiry.email}</TD>
                      <TD>{enquiry.service.nameEn}</TD>
                      <TD>
                        <Badge variant={STATUS_VARIANT[enquiry.status]}>
                          {STATUS_LABELS[enquiry.status]}
                        </Badge>
                      </TD>
                      <TD>{new Date(enquiry.createdAt).toLocaleDateString()}</TD>
                      <TD className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="View enquiry"
                            onClick={() => openDetail(enquiry)}
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Delete enquiry"
                            onClick={() => handleDelete(enquiry)}
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
        open={Boolean(selected)}
        onClose={closeDetail}
        title="Enquiry details"
        className="max-w-2xl"
        footer={
          <ModalFooter
            onCancel={closeDetail}
            onSubmit={handleStatusUpdate}
            loading={saving}
            submitLabel="Update status"
          />
        }
      >
        {selected && (
          <div className="space-y-4 text-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <DetailField label="Name" value={selected.name} />
              <DetailField label="Email" value={selected.email} />
              <DetailField label="Phone" value={selected.phoneNumber} />
              <DetailField label="Company" value={selected.company || "—"} />
              <DetailField label="Country" value={selected.country} />
              <DetailField label="Service" value={selected.service.nameEn} />
              <DetailField
                label="Submitted"
                value={new Date(selected.createdAt).toLocaleString()}
              />
            </div>

            <div>
              <p className="mb-1 font-medium text-dashboard-text">Message</p>
              <p className="whitespace-pre-wrap rounded-lg bg-dashboard-bg p-3 text-dashboard-text">
                {selected.message}
              </p>
            </div>

            <FormField label="Status" htmlFor="detailStatus">
              <Select
                id="detailStatus"
                value={detailStatus}
                onChange={(e) => setDetailStatus(e.target.value as EnquiryStatus)}
              >
                {Object.values(EnquiryStatus).map((status) => (
                  <option key={status} value={status}>
                    {STATUS_LABELS[status]}
                  </option>
                ))}
              </Select>
            </FormField>
          </div>
        )}
      </Modal>
    </>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-dashboard-text-muted">
        {label}
      </p>
      <p className="mt-1 text-dashboard-text">{value}</p>
    </div>
  );
}
