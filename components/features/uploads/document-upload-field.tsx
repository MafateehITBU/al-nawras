"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/loading";
import { apiUpload } from "@/lib/api/client";
import { notify } from "@/lib/utils/notify";
import type { CloudinaryAsset } from "@/types";
import { FileText, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";

export function DocumentUploadField({
  label,
  value,
  onChange,
  folder,
}: {
  label: string;
  value: { url: string; publicId: string; format?: string | null } | null;
  onChange: (
    asset: { url: string; publicId: string; format?: string | null } | null,
  ) => void;
  folder: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      const asset = await apiUpload<CloudinaryAsset>(
        "/api/admin/uploads/documents",
        formData,
      );
      onChange({
        url: asset.url,
        publicId: asset.publicId,
        format: asset.format ?? null,
      });
      notify.success("Document uploaded");
    } catch (error) {
      notify.fromError(error, "Document upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-dashboard-text">{label}</p>
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange(null)}
          >
            <Trash2 className="size-4 text-dashboard-error" />
            Remove
          </Button>
        )}
      </div>

      {value ? (
        <a
          href={value.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-dashboard-border px-4 py-3 text-sm text-dashboard-primary hover:bg-dashboard-bg"
        >
          <FileText className="size-5 shrink-0" />
          <span className="truncate">
            {value.format ? `Attachment.${value.format}` : "View attachment"}
          </span>
        </a>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex w-full max-w-sm cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-dashboard-border bg-dashboard-bg px-4 py-6 text-sm text-dashboard-text-muted transition-colors hover:border-dashboard-primary hover:text-dashboard-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? <Spinner /> : <Upload className="size-5" />}
          {uploading ? "Uploading…" : "Click to upload PDF or Word document"}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
