"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { cn } from "@/lib/utils";

export function ListFiltersCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="mb-6">
      <CardContent className="flex flex-col gap-4 pt-5 sm:flex-row sm:flex-wrap sm:items-end">
        {children}
      </CardContent>
    </Card>
  );
}

export function ListSearchField({ children }: { children: React.ReactNode }) {
  return <div className="min-w-0 flex-1 sm:min-w-[12rem]">{children}</div>;
}

export function ListFilterField({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <FormField label={label} htmlFor={htmlFor} className={cn("w-full sm:w-44", className)}>
      {children}
    </FormField>
  );
}
