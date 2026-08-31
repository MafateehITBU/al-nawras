"use client";

import { useAdminSession } from "@/components/dashboard/admin-session-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from "@/components/ui/empty-state";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Modal, ModalFooter } from "@/components/ui/modal";
import { PageHeader } from "@/components/ui/page-header";
import { Pagination } from "@/components/ui/pagination";
import {
  ListFilterField,
  ListFiltersCard,
  ListSearchField,
} from "@/components/features/shared/list-filters-card";
import { SearchToolbar } from "@/components/features/shared/search-toolbar";
import { ImageUploadField } from "@/components/features/uploads/image-upload-field";
import { Badge } from "@/components/ui/badge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { Select } from "@/components/ui/select";
import { useDeleteConfirm } from "@/components/providers/confirm-dialog-provider";
import { ALL_PERMISSIONS, PERMISSION_LABELS } from "@/constants/permissions";
import { CLOUDINARY_FOLDERS, PAGINATION } from "@/constants";
import { apiClient, apiClientPaginated } from "@/lib/api/client";
import { isSuperAdmin } from "@/lib/authorization/permissions";
import { notify } from "@/lib/utils/notify";
import type { AdminPublic, PaginatedResult } from "@/types";
import { AdminRole, Permission } from "@prisma/client";
import { Pencil, Plus, Shield, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface AdminFormState {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: AdminRole;
  permissions: Permission[];
  isActive: boolean;
  profileImageUrl: string | null;
  profileImagePublicId: string | null;
}

const emptyForm = (): AdminFormState => ({
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  role: AdminRole.ADMIN,
  permissions: [],
  isActive: true,
  profileImageUrl: null,
  profileImagePublicId: null,
});

export function AdminsPage() {
  const session = useAdminSession();
  const confirmDelete = useDeleteConfirm();
  const [data, setData] = useState<PaginatedResult<AdminPublic> | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<AdminRole | "">("");
  const [activeFilter, setActiveFilter] = useState<"" | "true" | "false">("");
  const [page, setPage] = useState<number>(PAGINATION.DEFAULT_PAGE);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminPublic | null>(null);
  const [form, setForm] = useState<AdminFormState>(emptyForm());
  const [saving, setSaving] = useState(false);

  const actorIsSuperAdmin = isSuperAdmin(session);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGINATION.DEFAULT_LIMIT),
      });
      if (search) params.set("search", search);
      if (roleFilter) params.set("role", roleFilter);
      if (activeFilter) params.set("isActive", activeFilter);
      const result = await apiClientPaginated<AdminPublic>(
        `/api/admin/admins?${params}`,
      );
      setData(result);
    } catch (error) {
      notify.fromError(error, "Failed to load admins");
    } finally {
      setLoading(false);
    }
  }, [page, search, roleFilter, activeFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm());
    setModalOpen(true);
  }

  function openEdit(admin: AdminPublic) {
    setEditing(admin);
    setForm({
      name: admin.name,
      email: admin.email,
      phoneNumber: admin.phoneNumber,
      password: "",
      role: admin.role,
      permissions: admin.permissions,
      isActive: admin.isActive,
      profileImageUrl: admin.profileImageUrl,
      profileImagePublicId: admin.profileImagePublicId,
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
    setForm(emptyForm());
  }

  function togglePermission(permission: Permission) {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  }

  async function handleSubmit() {
    setSaving(true);
    try {
      const body: Record<string, unknown> = {
        name: form.name.trim(),
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        role: form.role,
        permissions: form.role === AdminRole.SUPER_ADMIN ? [] : form.permissions,
        isActive: form.isActive,
        profileImageUrl: form.profileImageUrl,
        profileImagePublicId: form.profileImagePublicId,
      };

      if (form.password.trim()) {
        body.password = form.password.trim();
      }

      if (editing) {
        await apiClient(`/api/admin/admins/${editing.id}`, {
          method: "PATCH",
          body,
        });
        notify.success("Admin updated");
      } else {
        if (!form.password.trim()) {
          notify.error("Password is required for new admins");
          return;
        }
        body.password = form.password.trim();
        await apiClient("/api/admin/admins", { method: "POST", body });
        notify.success("Admin created");
      }
      closeModal();
      void load();
    } catch (error) {
      notify.fromError(error, "Failed to save admin");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(admin: AdminPublic) {
    if (admin.id === session.id) {
      notify.error("You cannot delete your own account");
      return;
    }
    const confirmed = await confirmDelete(`"${admin.name}"`);
    if (!confirmed) return;

    try {
      await apiClient(`/api/admin/admins/${admin.id}`, { method: "DELETE" });
      notify.success("Admin deleted");
      void load();
    } catch (error) {
      notify.fromError(error, "Failed to delete admin");
    }
  }

  const canEditAdmin = (admin: AdminPublic) =>
    actorIsSuperAdmin || admin.role !== AdminRole.SUPER_ADMIN;

  return (
    <>
      <PageHeader
        title="Admins"
        description="Manage admin accounts and permissions."
        actions={
          <Button onClick={openCreate}>
            <Plus className="size-4" />
            Add admin
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
            placeholder="Search by name, email, or phone…"
          />
        </ListSearchField>
        <ListFilterField label="Role" htmlFor="adminRoleFilter">
          <Select
            id="adminRoleFilter"
            value={roleFilter}
            onChange={(e) => {
              setPage(1);
              setRoleFilter(e.target.value as AdminRole | "");
            }}
          >
            <option value="">All roles</option>
            <option value={AdminRole.ADMIN}>Admin</option>
            <option value={AdminRole.SUPER_ADMIN}>Super admin</option>
          </Select>
        </ListFilterField>
        <ListFilterField label="Status" htmlFor="adminActiveFilter">
          <Select
            id="adminActiveFilter"
            value={activeFilter}
            onChange={(e) => {
              setPage(1);
              setActiveFilter(e.target.value as "" | "true" | "false");
            }}
          >
            <option value="">All statuses</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </Select>
        </ListFilterField>
      </ListFiltersCard>

      <Card>
        <CardContent className="pt-5">
          {loading ? (
            <p className="py-8 text-center text-sm text-dashboard-text-muted">Loading…</p>
          ) : !data?.items.length ? (
            <EmptyState
              icon={Shield}
              title="No admins found"
              description="Create an admin account to get started."
              actionLabel="Add admin"
              onAction={openCreate}
            />
          ) : (
            <>
              <Table>
                <THead>
                  <TR>
                    <TH>Name</TH>
                    <TH>Email</TH>
                    <TH>Role</TH>
                    <TH>Status</TH>
                    <TH className="w-24 text-right">Actions</TH>
                  </TR>
                </THead>
                <TBody>
                  {data.items.map((admin) => (
                    <TR key={admin.id}>
                      <TD className="font-medium">{admin.name}</TD>
                      <TD>{admin.email}</TD>
                      <TD>
                        <Badge variant={admin.role === AdminRole.SUPER_ADMIN ? "secondary" : "default"}>
                          {admin.role === AdminRole.SUPER_ADMIN ? "Super admin" : "Admin"}
                        </Badge>
                      </TD>
                      <TD>
                        <Badge variant={admin.isActive ? "success" : "error"}>
                          {admin.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TD>
                      <TD className="text-right">
                        <div className="flex justify-end gap-1">
                          {canEditAdmin(admin) && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Edit admin"
                                onClick={() => openEdit(admin)}
                              >
                                <Pencil className="size-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Delete admin"
                                onClick={() => handleDelete(admin)}
                              >
                                <Trash2 className="size-4 text-dashboard-error" />
                              </Button>
                            </>
                          )}
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
        title={editing ? "Edit admin" : "Add admin"}
        className="max-w-2xl"
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
          <ImageUploadField
            label="Profile image"
            folder={CLOUDINARY_FOLDERS.ADMIN_PROFILES}
            value={
              form.profileImageUrl && form.profileImagePublicId
                ? { url: form.profileImageUrl, publicId: form.profileImagePublicId }
                : null
            }
            onChange={(asset) =>
              setForm({
                ...form,
                profileImageUrl: asset?.url ?? null,
                profileImagePublicId: asset?.publicId ?? null,
              })
            }
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Name" htmlFor="adminName" required>
              <Input
                id="adminName"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </FormField>
            <FormField label="Email" htmlFor="adminEmail" required>
              <Input
                id="adminEmail"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </FormField>
            <FormField label="Phone" htmlFor="adminPhone" required>
              <Input
                id="adminPhone"
                value={form.phoneNumber}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              />
            </FormField>
            <FormField
              label={editing ? "New password" : "Password"}
              htmlFor="adminPassword"
              required={!editing}
              hint={editing ? "Leave blank to keep current password" : undefined}
            >
              <Input
                id="adminPassword"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </FormField>
          </div>

          {actorIsSuperAdmin && (
            <FormField label="Role" htmlFor="adminRole">
              <Select
                id="adminRole"
                value={form.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role: e.target.value as AdminRole,
                    permissions:
                      e.target.value === AdminRole.SUPER_ADMIN ? [] : form.permissions,
                  })
                }
              >
                <option value={AdminRole.ADMIN}>Admin</option>
                <option value={AdminRole.SUPER_ADMIN}>Super admin</option>
              </Select>
            </FormField>
          )}

          {form.role === AdminRole.ADMIN && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-dashboard-text">Permissions</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {ALL_PERMISSIONS.map((permission) => (
                  <label
                    key={permission}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashboard-border px-3 py-2 text-sm"
                  >
                    <Checkbox
                      checked={form.permissions.includes(permission)}
                      onChange={() => togglePermission(permission)}
                    />
                    {PERMISSION_LABELS[permission]}
                  </label>
                ))}
              </div>
            </div>
          )}

          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <Checkbox
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            />
            Active account
          </label>
        </div>
      </Modal>
    </>
  );
}
