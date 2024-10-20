import { create } from "zustand";
import ItemType from "../types/ItemType";

interface ItemState {
    item: ItemType | null;
    setItem: (itemData: ItemType) => void;
    clearItem: () => void;
}

const useItemStore = create<ItemState>((set) => ({
    item: localStorage.getItem("item") ? JSON.parse(localStorage.getItem("item") as string) : null,
    setItem: (itemData: ItemType) => {
        localStorage.setItem("item", JSON.stringify(itemData));
        set({ item: itemData });
    },
    clearItem: () => {
        localStorage.removeItem("item");
        set({ item: null });
    },
}));

export default useItemStore;