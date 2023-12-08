import { create } from "zustand";

export const useBearStore = create<{
	pageTitle: string;
	changePage: (page: string) => void;
}>((set) => ({
	pageTitle: "home",
	changePage: (pageName: string) => set(() => ({ pageTitle: pageName })),
	// removeAllBears: () => set({ bears: 0 }),
}));
