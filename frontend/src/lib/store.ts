import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  activeModule: 'executive' | 'operations' | 'intelligence' | 'settings';
  setActiveModule: (module: 'executive' | 'operations' | 'intelligence' | 'settings') => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      activeModule: 'executive',
      setActiveModule: (module) => set({ activeModule: module }),
      theme: 'dark',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'tescosense-storage',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
