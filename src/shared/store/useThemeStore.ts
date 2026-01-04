"use client";

import { create } from "zustand";

interface ThemeState {
  isDarkMode: boolean;
  setDarkMode: (_isDarkMode: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: true,
  setDarkMode: (isDarkMode: boolean) => set(() => ({ isDarkMode })),
}));
