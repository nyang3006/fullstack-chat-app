import { create } from "zustand";

type ThemeState = {
    theme: string,
    setTheme: (theme: string) => void
}
export const useThemeStore = create<ThemeState>((set) => ({
    theme: localStorage.getItem("chat-theme") || "dark",
    setTheme: (theme: string) => {
        localStorage.setItem("chat-theme", theme);
        set({ theme });
    }
}));
