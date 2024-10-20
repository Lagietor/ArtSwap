import { create } from "zustand";
import CollectionType from "../types/CollectionType";

interface CollectionState {
    collection: CollectionType | null;
    setCollection: (collectionData: CollectionType) => void;
    clearCollection: () => void;
}

const useCollectionStore = create<CollectionState>((set) => ({
    collection: localStorage.getItem("collection") ? JSON.parse(localStorage.getItem("collection") as string) : null,
    setCollection: (collectionData: CollectionType) => {
        localStorage.setItem("collection", JSON.stringify(collectionData));
        set({ collection: collectionData });
    },
    clearCollection: () => {
        localStorage.removeItem("collection");
        set({ collection: null });
    },
}));

export default useCollectionStore;