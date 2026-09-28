import { useEffect, useState } from "react";
import { CONTENT_EVENT, getSiteContent, STORAGE_KEY } from "../services/contentService";

export function useSiteContent() {
  const [content, setContent] = useState(getSiteContent);
  useEffect(() => {
    const refresh = () => setContent(getSiteContent());
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) refresh();
    };
    window.addEventListener(CONTENT_EVENT, refresh);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(CONTENT_EVENT, refresh);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return content;
}
