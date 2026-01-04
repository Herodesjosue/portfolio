"use client";

import { create } from "zustand";

interface SectionState {
  activeIndex: number;
  sectionCount: number;
  setSectionData: (_index: number, _total: number) => void;
}

export const useSectionStore = create<SectionState>((set) => ({
  activeIndex: 0,
  sectionCount: 0,
  setSectionData: (index, total) => set({ activeIndex: index, sectionCount: total }),
}));
