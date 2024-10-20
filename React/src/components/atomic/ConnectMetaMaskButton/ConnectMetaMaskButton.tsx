import './ConnectMetaMaskButton.css';
import { ethers } from "ethers";
import useApi from "../../../customHooks/useApi";
import { useEffect } from "react";
import useUserStore from "../../../store/useUserStore";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import useUserWalletStore from '../../../store/useUserWalletStore';

function ConnectMetaMaskButton() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { setUser, user } = useUserStore();
    const { isLoading, response, error, fetchData: connect } = useApi(apiUrl + `user/${user.id}/metamask-connect`, "POST");
    const { setUserWallet } = useUserWalletStore();

    const connectMetaMask = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await window.ethereum.request({ method: "eth_requestAccounts" });

                const accounts = await provider.send("eth_accounts", []);
                const userAddress = accounts[0];

                connect({"ethAddress": userAddress});
            } catch (error) {
                console.error("MetaMask connection error: " + error);
            }
        } else {
            console.log("MetaMask is not installed");
        }
    }

    const fetchWalletData = async (ethAddress: string) => {
        const provider = new ethers.BrowserProvider(window.ethereum);

        const balanceInWei = await provider.getBalance(ethAddress);
        const balanceInEther = ethers.formatEther(balanceInWei);

        const network = await provider.getNetwork();
        const networkName = network.name;
        const networkChainId = network.chainId;

        const walletData = {
            ethAddress,
            balance: balanceInEther,
            // network: {
            //     name: networkName,
            //     chainId: networkChainId
            // }
        };
        // TODO do naprawy (jest problem ze zmianą bigint na json)

        setUserWallet(walletData);
    };

    useEffect(() => {
        if (response) {
            const ethAddress = response.ethAddress;

            fetchWalletData(ethAddress);
            setUser(response);
            window.location.reload();
        }
    }, [response])

    return (
        <>
            {isLoading ? (
                <LoadingAnimation />
            ) : (
                <div className="metamask-container">
                    <button className="metamask-button" onClick={() => connectMetaMask()}>
                        Connect To MetaMask
                        <img src="/metamask-icon.png" alt="MetaMask Logo" />
                    </button>
                </div>
            )}
        </>
    )
}

export default ConnectMetaMaskButton