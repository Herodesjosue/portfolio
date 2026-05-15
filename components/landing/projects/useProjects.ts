"use client";

import { useState } from "react";

export function useProjects(defaultId: string) {
  const [activeId, setActiveId] = useState<string | null>(defaultId);

  const reset = () => setActiveId(defaultId);

  return { activeId, setActiveId, reset };
}
