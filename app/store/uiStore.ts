import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UIState {
  initialLoadComplete: boolean;
  setInitialLoadComplete: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      initialLoadComplete: false,
      setInitialLoadComplete: () => set({ initialLoadComplete: true }),
    }),
    {
      name: "herodes-ui-storage",
      // sessionStorage: aparece solo UNA vez por sesión de pestaña.
      // Si el usuario recarga, no vuelve a ver el loader.
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? sessionStorage : localStorage
      ),
    }
  )
);
