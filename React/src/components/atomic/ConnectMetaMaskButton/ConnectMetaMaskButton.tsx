import './ConnectMetaMaskButton.css';
import { ethers } from "ethers";
import useApi from "../../../customHooks/useApi";
import { useEffect, useState } from "react";
import useUserStore from "../../../store/useUserStore";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import useUserWalletStore from '../../../store/useUserWalletStore';

function ConnectMetaMaskButton() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { setUser, user } = useUserStore();
    const { isLoading, response, error, fetchData: connect } = useApi(apiUrl + `user/${user.id}/metamask-connect`, "POST");
    const { setUserWallet } = useUserWalletStore();
    const [connectionError, setConnectionError] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false); // Dodano stan do śledzenia, czy proces logowania trwa

    const fetchWalletData = async (ethAddress: string) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balanceInWei = await provider.getBalance(ethAddress);
        const balanceInEther = ethers.formatEther(balanceInWei);

        const walletData = {
            ethAddress,
            balance: balanceInEther,
        };

        setUserWallet(walletData);
    };

    const connectMetaMask = async () => {
        if (window.ethereum) {
            if (isConnecting) {
                console.log("Already processing eth_requestAccounts. Please wait.");
                return; // Zapobiega ponownemu kliknięciu podczas aktywnego procesu logowania
            }

            try {
                setIsConnecting(true); // Ustawiamy stan na "trwa łączenie"

                const provider = new ethers.BrowserProvider(window.ethereum);
                await window.ethereum.request({ method: "eth_requestAccounts" });

                const accounts = await provider.send("eth_accounts", []);
                const userAddress = accounts[0];

                connect({ "ethAddress": userAddress });
                setConnectionError(false);
            } catch (error) {
                console.error("MetaMask connection error: " + error);
                setConnectionError(true);
            } finally {
                setIsConnecting(false); // Po zakończeniu procesu (bez względu na wynik) ustawiamy stan na "nie łączymy"
            }
        } else {
            window.open('https://metamask.io/download/', '_blank');
        }
    };

    useEffect(() => {
        if (response) {
            const ethAddress = response.ethAddress;
            fetchWalletData(ethAddress);
            setUser(response);
        }
    }, [response]);

    return (
        <>
            {isLoading ? (
                <LoadingAnimation />
            ) : (
                <div className="metamask-container">
                    <button
                        className="metamask-button"
                        onClick={() => connectMetaMask()}
                        disabled={isConnecting} // Zablokowanie przycisku, gdy proces logowania jest w toku
                    >
                        Connect To MetaMask
                        <img src="/metamask-icon.png" alt="MetaMask Logo" />
                    </button>
                </div>
            )}
        </>
    );
}

export default ConnectMetaMaskButton;
