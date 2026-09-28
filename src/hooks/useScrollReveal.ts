import { useEffect } from "react";

/**
 * Progressive enhancement for section/card entrance motion.
 * Elements remain visible when IntersectionObserver is unavailable.
 */
export function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -45px 0px" }
    );

    const watched = new WeakSet<HTMLElement>();
    const observe = (element: HTMLElement, index: number) => {
      if (watched.has(element)) return;
      watched.add(element);
      element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 55}ms`);
      observer.observe(element);
    };
    elements.forEach(observe);
    const mutations = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(observe);
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);
}
