import { create } from "zustand";

const useItemStore = create((set) => ({
    item: JSON.parse(localStorage.getItem("item")) || null,
    setItem: (itemData) => {
        localStorage.setItem("item", JSON.stringify(itemData));
        set({ item: itemData });
    },
    clearItem: () => {
        localStorage.removeItem("item");
        set({ item: null });
    },
}));

export default useItemStore;