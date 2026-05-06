"use client";

import { useEffect } from "react";

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

    const timer = setTimeout(attach, 80);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
