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

    if (!elements.length || !("IntersectionObserver" in window)) return;

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

    elements.forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 55}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);
}
