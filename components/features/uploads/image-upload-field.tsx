"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/loading";
import { apiUpload } from "@/lib/api/client";
import { notify } from "@/lib/utils/notify";
import type { CloudinaryAsset } from "@/types";
import { ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export function ImageUploadField({
  label,
  value,
  onChange,
  folder,
  required,
}: {
  label: string;
  value: { url: string; publicId: string } | null;
  onChange: (asset: { url: string; publicId: string } | null) => void;
  folder: string;
  required?: boolean;
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
        "/api/admin/uploads/images",
        formData,
      );
      onChange({ url: asset.url, publicId: asset.publicId });
      notify.success("Image uploaded");
    } catch (error) {
      notify.fromError(error, "Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-dashboard-text">
          {label}
          {required && <span className="ml-0.5 text-dashboard-error">*</span>}
        </p>
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
        <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg border border-dashboard-border">
          <Image
            src={value.url}
            alt={label}
            fill
            className="object-cover"
            sizes="320px"
          />
        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex aspect-video w-full max-w-sm cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-dashboard-border bg-dashboard-bg text-sm text-dashboard-text-muted transition-colors hover:border-dashboard-primary hover:text-dashboard-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? <Spinner /> : <ImagePlus className="size-8" />}
          {uploading ? "Uploading…" : "Click to upload image"}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
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
