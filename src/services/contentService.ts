import { siteContent } from "../data/content";

export type SiteContent = typeof siteContent;

const STORAGE_KEY = "business-services-site-content";

export function getSiteContent(): SiteContent {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return siteContent;
  }

  try {
    return JSON.parse(stored) as SiteContent;
  } catch {
    return siteContent;
  }
}

export function saveSiteContent(content: SiteContent): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(content)
  );
}

export function resetSiteContent(): void {
  localStorage.removeItem(STORAGE_KEY);
}