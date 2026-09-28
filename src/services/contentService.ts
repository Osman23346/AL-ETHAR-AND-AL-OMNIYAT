import { siteContent } from "../data/content";

export type SiteContent = typeof siteContent;

export const STORAGE_KEY = "business-services-site-content";
export const CONTENT_EVENT = "site-content-updated";

function mergeContent(fallback: unknown, value: unknown): unknown {
  if (Array.isArray(fallback)) {
    if (!Array.isArray(value)) return fallback;
    return value.map((item, index) => mergeContent(fallback[index] ?? fallback[0], item));
  }
  if (fallback && typeof fallback === "object") {
    const record = value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
    return Object.fromEntries(Object.entries(fallback).map(([key, item]) => [key, mergeContent(item, record[key])]));
  }
  return typeof value === typeof fallback ? value : fallback;
}

export function getSiteContent(): SiteContent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? mergeContent(siteContent, JSON.parse(stored)) as SiteContent : siteContent;
  } catch {
    return siteContent;
  }
}

export function saveSiteContent(content: SiteContent): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(content)
  );
  window.dispatchEvent(new Event(CONTENT_EVENT));
}

export function resetSiteContent(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(CONTENT_EVENT));
}
