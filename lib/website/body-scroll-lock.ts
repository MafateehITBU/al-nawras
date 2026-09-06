let lockCount = 0;

export function lockBodyScroll() {
  if (typeof document === "undefined") return;
  lockCount += 1;
  if (lockCount === 1) {
    document.body.style.overflow = "hidden";
  }
}

export function unlockBodyScroll() {
  if (typeof document === "undefined") return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = "";
  }
}

/** Clears any leftover scroll locks (e.g. after client navigation races). */
export function resetBodyScrollLock() {
  lockCount = 0;
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
  }
}
