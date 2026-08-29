"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { Pagination } from "@/components/ui/pagination";
import { SearchToolbar } from "@/components/features/shared/search-toolbar";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { useDeleteConfirm } from "@/components/providers/confirm-dialog-provider";
import { PAGINATION } from "@/constants";
import { apiClient, apiClientPaginated } from "@/lib/api/client";
import { notify } from "@/lib/utils/notify";
import type { PaginatedResult, Service, ServiceCategory } from "@/types";
import { Pencil, Plus, Trash2, Wrench } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type ServiceListItem = Service & {
  category: Pick<ServiceCategory, "id" | "nameEn" | "nameAr" | "slug">;
};

export function ServicesPage() {
  const confirmDelete = useDeleteConfirm();
  const [data, setData] = useState<PaginatedResult<ServiceListItem> | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(PAGINATION.DEFAULT_PAGE);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGINATION.DEFAULT_LIMIT),
      });
      if (search) params.set("search", search);
      const result = await apiClientPaginated<ServiceListItem>(
        `/api/admin/services?${params}`,
      );
      setData(result);
    } catch (error) {
      notify.fromError(error, "Failed to load services");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleDelete(service: ServiceListItem) {
    const confirmed = await confirmDelete(`"${service.nameEn}"`);
    if (!confirmed) return;

    try {
      await apiClient(`/api/admin/services/${service.id}`, { method: "DELETE" });
      notify.success("Service deleted");
      void load();
    } catch (error) {
      notify.fromError(error, "Failed to delete service");
    }
  }

  return (
    <>
      <PageHeader
        title="Services"
        description="Manage IP services offered on the website."
        actions={
          <Link href="/admin/services/new">
            <Button>
              <Plus className="size-4" />
              Add service
            </Button>
          </Link>
        }
      />

      <Card className="mb-6">
        <CardContent className="pt-5">
          <SearchToolbar
            value={searchInput}
            onChange={setSearchInput}
            onSearch={() => {
              setPage(1);
              setSearch(searchInput.trim());
            }}
            placeholder="Search services…"
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          {loading ? (
            <p className="py-8 text-center text-sm text-dashboard-text-muted">Loading…</p>
          ) : !data?.items.length ? (
            <EmptyState
              icon={Wrench}
              title="No services"
              description="Create your first service."
              actionLabel="Add service"
              onAction={() => window.location.assign("/admin/services/new")}
            />
          ) : (
            <>
              <Table>
                <THead>
                  <TR>
                    <TH>Name</TH>
                    <TH>Category</TH>
                    <TH>Hero title</TH>
                    <TH className="w-24 text-right">Actions</TH>
                  </TR>
                </THead>
                <TBody>
                  {data.items.map((service) => (
                    <TR key={service.id}>
                      <TD className="font-medium">{service.nameEn}</TD>
                      <TD>{service.category.nameEn}</TD>
                      <TD className="text-dashboard-text-muted">{service.heroTitleEn}</TD>
                      <TD className="text-right">
                        <div className="flex justify-end gap-1">
                          <Link href={`/admin/services/${service.id}/edit`}>
                            <Button variant="ghost" size="icon" aria-label="Edit service">
                              <Pencil className="size-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Delete service"
                            onClick={() => handleDelete(service)}
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
    </>
  );
}
