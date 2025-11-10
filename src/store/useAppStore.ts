// stores/useAppStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UIState = {
  selectedProjectId: number | null;
  sidebarCollapsed: boolean;
  setSelectedProject: (id: number | null) => void;
  toggleSidebar: () => void;
};

export const useAppStore = create<UIState>()(
  persist(
    (set) => ({
      selectedProjectId: null,
      sidebarCollapsed: false,
      setSelectedProject: (id) => set(() => ({ selectedProjectId: id })),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
    }),
    {
      name: "lc-dashboard-ui", // key in localStorage
    }
  )
);
