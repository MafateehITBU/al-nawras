"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { Pagination } from "@/components/ui/pagination";
import {
  ListFilterField,
  ListFiltersCard,
  ListSearchField,
} from "@/components/features/shared/list-filters-card";
import { SearchToolbar } from "@/components/features/shared/search-toolbar";
import { Select } from "@/components/ui/select";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { useDeleteConfirm } from "@/components/providers/confirm-dialog-provider";
import { PAGINATION } from "@/constants";
import { apiClient, apiClientPaginated } from "@/lib/api/client";
import { notify } from "@/lib/utils/notify";
import type { Blog, BlogCategory, PaginatedResult } from "@/types";
import { FileText, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type BlogListItem = Blog & {
  category: Pick<BlogCategory, "id" | "nameEn" | "nameAr" | "slug">;
};

export function BlogsPage() {
  const confirmDelete = useDeleteConfirm();
  const [data, setData] = useState<PaginatedResult<BlogListItem> | null>(null);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState<number>(PAGINATION.DEFAULT_PAGE);

  useEffect(() => {
    void apiClientPaginated<BlogCategory>("/api/admin/blog-categories?limit=100")
      .then((result) => setCategories(result.items))
      .catch(() => notify.error("Failed to load categories"));
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGINATION.DEFAULT_LIMIT),
      });
      if (search) params.set("search", search);
      if (categoryFilter) params.set("categoryId", categoryFilter);
      const result = await apiClientPaginated<BlogListItem>(
        `/api/admin/blogs?${params}`,
      );
      setData(result);
    } catch (error) {
      notify.fromError(error, "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }, [page, search, categoryFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleDelete(blog: BlogListItem) {
    const confirmed = await confirmDelete(`"${blog.titleEn}"`);
    if (!confirmed) return;

    try {
      await apiClient(`/api/admin/blogs/${blog.id}`, { method: "DELETE" });
      notify.success("Blog deleted");
      void load();
    } catch (error) {
      notify.fromError(error, "Failed to delete blog");
    }
  }

  return (
    <>
      <PageHeader
        title="Blogs"
        description="Manage blog posts for the public website."
        actions={
          <Link href="/admin/blogs/new">
            <Button>
              <Plus className="size-4" />
              Add blog
            </Button>
          </Link>
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
            placeholder="Search blogs…"
          />
        </ListSearchField>
        <ListFilterField label="Category" htmlFor="blogCategoryFilter">
          <Select
            id="blogCategoryFilter"
            value={categoryFilter}
            onChange={(e) => {
              setPage(1);
              setCategoryFilter(e.target.value);
            }}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nameEn}
              </option>
            ))}
          </Select>
        </ListFilterField>
      </ListFiltersCard>

      <Card>
        <CardContent className="pt-5">
          {loading ? (
            <p className="py-8 text-center text-sm text-dashboard-text-muted">Loading…</p>
          ) : !data?.items.length ? (
            <EmptyState
              icon={FileText}
              title="No blogs"
              description="Create your first blog post."
              actionLabel="Add blog"
              onAction={() => {
                window.location.assign("/admin/blogs/new");
              }}
            />
          ) : (
            <>
              <Table>
                <THead>
                  <TR>
                    <TH>Title</TH>
                    <TH>Category</TH>
                    <TH>Author</TH>
                    <TH>Published</TH>
                    <TH className="w-24 text-right">Actions</TH>
                  </TR>
                </THead>
                <TBody>
                  {data.items.map((blog) => (
                    <TR key={blog.id}>
                      <TD className="font-medium">{blog.titleEn}</TD>
                      <TD>{blog.category.nameEn}</TD>
                      <TD>{blog.authorName}</TD>
                      <TD>
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </TD>
                      <TD className="text-right">
                        <div className="flex justify-end gap-1">
                          <Link href={`/admin/blogs/${blog.id}/edit`}>
                            <Button variant="ghost" size="icon" aria-label="Edit blog">
                              <Pencil className="size-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Delete blog"
                            onClick={() => handleDelete(blog)}
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
