"use client";

import { useEffect } from "react";

/**
 * Global scroll-reveal animator.
 *
 * Drop this component once at page level. It observes every element
 * with a `data-reveal` attribute and adds the `.revealed` class
 * once visible.
 *
 * Usage on any element:
 *   data-reveal="fade-up | fade-down | fade-left | fade-right | scale-in | fade-in | clip-up"
 *   data-reveal-delay="200"   (optional, ms)
 */
export default function ScrollAnimator() {
  useEffect(() => {
    const attach = () => {
      const elements = document.querySelectorAll<HTMLElement>(
        "[data-reveal]:not(.revealed)"
      );
      if (elements.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              const delay = el.dataset.revealDelay || "0";
              el.style.transitionDelay = `${delay}ms`;
              el.classList.add("revealed");
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );

      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    };

    // Short delay ensures React tree is mounted
    const timer = setTimeout(attach, 80);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
