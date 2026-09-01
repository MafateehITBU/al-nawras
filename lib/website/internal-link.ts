export function isInternalWebsiteLink(anchor: HTMLAnchorElement) {
  if (anchor.target === "_blank" || anchor.hasAttribute("download")) {
    return false;
  }

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }

  try {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) {
      return false;
    }

    if (url.pathname.startsWith("/admin")) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
