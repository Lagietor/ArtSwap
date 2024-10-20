import { create } from "zustand";
import UserWalletType from "../types/UserWalletType";

interface UserWalletState {
    userWallet: UserWalletType | null;
    setUserWallet: (userWalletData: UserWalletType) => void;
    clearUserWallet: () => void;
}

const useUserWalletStore = create<UserWalletState>((set) => ({
    userWallet: localStorage.getItem("userWallet") ? JSON.parse(localStorage.getItem("userWallet") as string) : null,
    setUserWallet: (userWalletData: UserWalletType) => {
        localStorage.setItem("userWallet", JSON.stringify(userWalletData));
        set({ userWallet: userWalletData });
    },
    clearUserWallet: () => {
        localStorage.removeItem("userWallet");
        set({ userWallet: null });
    },
}));

export default useUserWalletStore;