import { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";
import useUserWalletStore from "../store/useUserWalletStore";

export default function useMetaMaskStatus() {
    const { userWallet, setUserWallet, clearUserWallet } = useUserWalletStore();
    const [isChecking, setIsChecking] = useState(false);

    const checkMetaMaskConnection = useCallback(async () => {
        setIsChecking(true);
        try {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);

                const accounts = await provider.send("eth_accounts", []);
                if (accounts.length > 0) {
                    const userAddress = accounts[0];

                    if (!userWallet || userWallet.ethAddress !== userAddress) {
                        const balanceInWei = await provider.getBalance(userAddress);
                        const balanceInEther = ethers.formatEther(balanceInWei);

                        setUserWallet({
                            ethAddress: userAddress,
                            balance: balanceInEther,
                        });
                    }
                } else {
                    clearUserWallet();
                }
            }
        } catch (error) {
            console.error("Błąd podczas sprawdzania połączenia MetaMask:", error);
        } finally {
            setIsChecking(false);
        }
    }, [userWallet, setUserWallet, clearUserWallet]);

    useEffect(() => {
        if (window.ethereum) {
            const handleAccountsChanged = async (accounts: string[]) => {
                if (accounts.length > 0) {
                    await checkMetaMaskConnection();
                } else {
                    clearUserWallet();
                }
            };

            const handleDisconnect = () => {
                console.log("MetaMask disconnected");
                clearUserWallet();
            };

            window.ethereum.on("accountsChanged", handleAccountsChanged);
            window.ethereum.on("disconnect", handleDisconnect);

            return () => {
                window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
                window.ethereum.removeListener("disconnect", handleDisconnect);
            };
        }
    }, [checkMetaMaskConnection, clearUserWallet]);

    return { checkMetaMaskConnection, isChecking };
}
