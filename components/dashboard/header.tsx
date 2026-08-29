"use client";

import type { SessionAdmin } from "@/lib/authorization/permissions";
import { isSuperAdmin } from "@/lib/authorization/permissions";
import { LogOut, Menu, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { GuardedLink } from "@/components/dashboard/guarded-link";

export function DashboardHeader({
  title,
  onOpenMobileMenu,
}: {
  title?: string;
  onOpenMobileMenu: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-[var(--dashboard-header-height)] items-center justify-between border-b border-dashboard-border bg-dashboard-surface/95 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg p-2 text-dashboard-text-muted hover:bg-dashboard-bg focus-ring lg:hidden"
          onClick={onOpenMobileMenu}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
        {title && (
          <h1 className="text-lg font-semibold text-dashboard-text lg:hidden">
            {title}
          </h1>
        )}
      </div>
      <ProfileMenu />
    </header>
  );
}

function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState<SessionAdmin | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void fetch("/api/admin/me")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setAdmin(json.data);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = admin?.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-dashboard-bg focus-ring"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <div className="relative flex size-8 items-center justify-center overflow-hidden rounded-full bg-dashboard-primary/10 text-xs font-semibold text-dashboard-primary">
          {admin?.profileImageUrl ? (
            <Image
              src={admin.profileImageUrl}
              alt=""
              fill
              className="object-cover"
            />
          ) : (
            initials ?? "AD"
          )}
        </div>
        <span className="hidden max-w-[8rem] truncate text-sm font-medium text-dashboard-text sm:block">
          {admin?.name ?? "Admin"}
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 rounded-xl border border-dashboard-border bg-dashboard-surface py-1 shadow-lg"
        >
          <div className="border-b border-dashboard-border px-4 py-3">
            <p className="truncate text-sm font-medium text-dashboard-text">
              {admin?.name}
            </p>
            <p className="truncate text-xs text-dashboard-text-muted">
              {admin?.email}
            </p>
            {admin && isSuperAdmin(admin) && (
              <p className="mt-1 text-xs font-medium text-dashboard-primary">
                Super Admin
              </p>
            )}
          </div>
          <GuardedLink
            href="/admin/account"
            role="menuitem"
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-dashboard-text hover:bg-dashboard-bg"
            onClick={() => setOpen(false)}
          >
            <User className="size-4" />
            Profile
          </GuardedLink>
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-dashboard-error hover:bg-red-50"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
          >
            <LogOut className="size-4" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
