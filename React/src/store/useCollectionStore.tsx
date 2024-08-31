import { create } from "zustand";

const useCollectionStore = create((set) => ({
    collection: JSON.parse(localStorage.getItem("collection")) || null,
    setCollection: (collectionData) => {
        localStorage.setItem("collection", JSON.stringify(collectionData));
        set({ collection: collectionData });
    },
    clearCollection: () => {
        localStorage.removeItem("collection");
        set({ collection: null });
    },
}));

export default useCollectionStore;