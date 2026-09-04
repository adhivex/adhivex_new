import { create } from "zustand";

interface UIState {
  isMobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  workFilter: string;
  setWorkFilter: (filter: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileNavOpen: false,
  setMobileNavOpen: (open) => set({ isMobileNavOpen: open }),
  workFilter: "all",
  setWorkFilter: (filter) => set({ workFilter: filter }),
}));
