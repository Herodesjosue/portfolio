"use client";

import { useEffect, useState } from "react";
import { useUIStore } from "@/app/store/uiStore";
import { Phase } from "./types";

export function useIntroLoader() {
  const [phase, setPhase] = useState<Phase>("idle");
  const { initialLoadComplete, setInitialLoadComplete } = useUIStore();

  useEffect(() => {
    if (initialLoadComplete) {
      setPhase("done");
      return;
    }

    document.body.style.overflow = "hidden";
    setPhase("entering");

    const t1 = setTimeout(() => setPhase("holding"), 600);
    const t2 = setTimeout(() => {
      setPhase("leaving");
      document.body.style.overflow = "";
    }, 2300);
    const t3 = setTimeout(() => {
      setPhase("done");
      setInitialLoadComplete();
    }, 3100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { phase };
}
