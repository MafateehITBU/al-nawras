"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Modal, ModalFooter } from "@/components/ui/modal";
import { SectionHeader } from "@/components/ui/page-header";
import { Textarea } from "@/components/ui/textarea";
import { useDeleteConfirm } from "@/components/providers/confirm-dialog-provider";
import { apiClient } from "@/lib/api/client";
import { notify } from "@/lib/utils/notify";
import type { WebsiteAddress } from "@prisma/client";
import { MapPin, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface AddressFormState {
  addressEn: string;
  addressAr: string;
  label: string;
}

const emptyForm = (): AddressFormState => ({
  addressEn: "",
  addressAr: "",
  label: "",
});

export function AddressesSection({
  addresses,
  onChange,
}: {
  addresses: WebsiteAddress[];
  onChange: (addresses: WebsiteAddress[]) => void;
}) {
  const confirmDelete = useDeleteConfirm();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<WebsiteAddress | null>(null);
  const [form, setForm] = useState<AddressFormState>(emptyForm());
  const [loading, setLoading] = useState(false);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm());
    setModalOpen(true);
  }

  function openEdit(address: WebsiteAddress) {
    setEditing(address);
    setForm({
      addressEn: address.addressEn,
      addressAr: address.addressAr,
      label: address.label ?? "",
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
    setForm(emptyForm());
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const body = {
        addressEn: form.addressEn.trim(),
        addressAr: form.addressAr.trim(),
        label: form.label.trim() || null,
      };

      if (editing) {
        const updated = await apiClient<WebsiteAddress>(
          `/api/admin/website/addresses/${editing.id}`,
          { method: "PATCH", body },
        );
        onChange(addresses.map((a) => (a.id === updated.id ? updated : a)));
        notify.success("Address updated");
      } else {
        const created = await apiClient<WebsiteAddress>("/api/admin/website/addresses", {
          method: "POST",
          body,
        });
        onChange([...addresses, created]);
        notify.success("Address added");
      }
      closeModal();
    } catch (error) {
      notify.fromError(error, "Failed to save address");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(address: WebsiteAddress) {
    const confirmed = await confirmDelete(
      address.label ? `"${address.label}" address` : "this address",
    );
    if (!confirmed) return;

    try {
      await apiClient(`/api/admin/website/addresses/${address.id}`, {
        method: "DELETE",
      });
      onChange(addresses.filter((a) => a.id !== address.id));
      notify.success("Address deleted");
    } catch (error) {
      notify.fromError(error, "Failed to delete address");
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <SectionHeader
            title="Addresses"
            description="Physical office addresses in English and Arabic."
            actions={
              <Button size="sm" onClick={openCreate}>
                <Plus className="size-4" />
                Add address
              </Button>
            }
          />
        </CardHeader>
        <CardContent>
          {addresses.length === 0 ? (
            <EmptyState
              icon={MapPin}
              title="No addresses"
              description="Add office addresses for the contact page."
              actionLabel="Add address"
              onAction={openCreate}
            />
          ) : (
            <div className="grid gap-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="rounded-lg border border-dashboard-border p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1 space-y-2">
                      {address.label && (
                        <p className="text-sm font-semibold text-dashboard-text">
                          {address.label}
                        </p>
                      )}
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-dashboard-text-muted">
                            English
                          </p>
                          <p className="mt-1 whitespace-pre-wrap text-sm text-dashboard-text">
                            {address.addressEn}
                          </p>
                        </div>
                        <div dir="rtl">
                          <p className="text-xs font-medium uppercase tracking-wide text-dashboard-text-muted">
                            Arabic
                          </p>
                          <p className="mt-1 whitespace-pre-wrap text-sm text-dashboard-text">
                            {address.addressAr}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Edit address"
                        onClick={() => openEdit(address)}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete address"
                        onClick={() => handleDelete(address)}
                      >
                        <Trash2 className="size-4 text-dashboard-error" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit address" : "Add address"}
        className="max-w-2xl"
        footer={
          <ModalFooter
            onCancel={closeModal}
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel={editing ? "Update" : "Add"}
          />
        }
      >
        <div className="space-y-4">
          <FormField label="Label" htmlFor="addressLabel" hint="Optional — e.g. Riyadh office">
            <Input
              id="addressLabel"
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              placeholder="Head office"
            />
          </FormField>
          <FormField label="Address (English)" htmlFor="addressEn" required>
            <Textarea
              id="addressEn"
              value={form.addressEn}
              onChange={(e) => setForm({ ...form, addressEn: e.target.value })}
              rows={3}
            />
          </FormField>
          <FormField label="Address (Arabic)" htmlFor="addressAr" required>
            <Textarea
              id="addressAr"
              dir="rtl"
              value={form.addressAr}
              onChange={(e) => setForm({ ...form, addressAr: e.target.value })}
              rows={3}
            />
          </FormField>
        </div>
      </Modal>
    </>
  );
}
