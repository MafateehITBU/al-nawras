"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Modal, ModalFooter } from "@/components/ui/modal";
import { SectionHeader } from "@/components/ui/page-header";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { useDeleteConfirm } from "@/components/providers/confirm-dialog-provider";
import { apiClient } from "@/lib/api/client";
import { notify } from "@/lib/utils/notify";
import type { WebsitePhone } from "@prisma/client";
import { Pencil, Phone, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface PhoneFormState {
  phoneNumber: string;
  label: string;
}

const emptyForm = (): PhoneFormState => ({
  phoneNumber: "",
  label: "",
});

export function PhonesSection({
  phones,
  onChange,
}: {
  phones: WebsitePhone[];
  onChange: (phones: WebsitePhone[]) => void;
}) {
  const confirmDelete = useDeleteConfirm();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<WebsitePhone | null>(null);
  const [form, setForm] = useState<PhoneFormState>(emptyForm());
  const [loading, setLoading] = useState(false);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm());
    setModalOpen(true);
  }

  function openEdit(phone: WebsitePhone) {
    setEditing(phone);
    setForm({
      phoneNumber: phone.phoneNumber,
      label: phone.label ?? "",
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
        phoneNumber: form.phoneNumber.trim(),
        label: form.label.trim() || null,
      };

      if (editing) {
        const updated = await apiClient<WebsitePhone>(
          `/api/admin/website/phones/${editing.id}`,
          { method: "PATCH", body },
        );
        onChange(phones.map((p) => (p.id === updated.id ? updated : p)));
        notify.success("Phone number updated");
      } else {
        const created = await apiClient<WebsitePhone>("/api/admin/website/phones", {
          method: "POST",
          body,
        });
        onChange([...phones, created]);
        notify.success("Phone number added");
      }
      closeModal();
    } catch (error) {
      notify.fromError(error, "Failed to save phone number");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(phone: WebsitePhone) {
    const confirmed = await confirmDelete(
      phone.label ? `"${phone.label}" phone number` : "this phone number",
    );
    if (!confirmed) return;

    try {
      await apiClient(`/api/admin/website/phones/${phone.id}`, { method: "DELETE" });
      onChange(phones.filter((p) => p.id !== phone.id));
      notify.success("Phone number deleted");
    } catch (error) {
      notify.fromError(error, "Failed to delete phone number");
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <SectionHeader
            title="Phone numbers"
            description="Contact numbers displayed on the website."
            actions={
              <Button size="sm" onClick={openCreate}>
                <Plus className="size-4" />
                Add phone
              </Button>
            }
          />
        </CardHeader>
        <CardContent>
          {phones.length === 0 ? (
            <EmptyState
              icon={Phone}
              title="No phone numbers"
              description="Add at least one phone number for visitors to reach you."
              actionLabel="Add phone"
              onAction={openCreate}
            />
          ) : (
            <Table>
              <THead>
                <TR>
                  <TH>Phone</TH>
                  <TH>Label</TH>
                  <TH className="w-24 text-right">Actions</TH>
                </TR>
              </THead>
              <TBody>
                {phones.map((phone) => (
                  <TR key={phone.id}>
                    <TD className="font-medium">{phone.phoneNumber}</TD>
                    <TD className="text-dashboard-text-muted">
                      {phone.label || "—"}
                    </TD>
                    <TD className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Edit phone"
                          onClick={() => openEdit(phone)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Delete phone"
                          onClick={() => handleDelete(phone)}
                        >
                          <Trash2 className="size-4 text-dashboard-error" />
                        </Button>
                      </div>
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit phone number" : "Add phone number"}
        description="Use international format, e.g. +966 12 345 6789"
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
          <FormField label="Phone number" htmlFor="phoneNumber" required>
            <Input
              id="phoneNumber"
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              placeholder="+966 12 345 6789"
            />
          </FormField>
          <FormField label="Label" htmlFor="phoneLabel" hint="Optional — e.g. Main office">
            <Input
              id="phoneLabel"
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              placeholder="Main office"
            />
          </FormField>
        </div>
      </Modal>
    </>
  );
}
