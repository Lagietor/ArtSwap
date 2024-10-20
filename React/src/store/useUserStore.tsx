import { create } from "zustand";
import UserType from "../types/UserType";

interface UserState {
    user: UserType | null;
    setUser: (userData: UserType) => void;
    clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
    setUser: (userData: UserType) => {
        localStorage.setItem("user", JSON.stringify(userData));
        set({ user: userData });
    },
    clearUser: () => {
        localStorage.removeItem("user");
        set({ user: null });
    },
}));

export default useUserStore;