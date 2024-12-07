import useItemStore from "../../../store/useItemStore";
import useUserWalletStore from "../../../store/useUserWalletStore";
import { useState, useEffect } from "react";
import { calculateGas } from "../../../utils/Contract/calculateGas";
import useApi from "../../../customHooks/useApi";
import useUserStore from "../../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { toast, ToastContainer } from "react-toastify";
import buyNFT from "../../../utils/Contract/buyNFT";
import { getTokenOwner } from "../../../utils/Contract/contractConnector";

function PopupBuyNow({ close }: { close: () => void }) {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { item, setItem} = useItemStore();
    const { userWallet, setUserWallet } = useUserWalletStore();
    const { user } = useUserStore();
    const [gasCost, setGasCost] = useState<string | null>(null);
    const [totalCost, setTotalCost] = useState<string | null>(null);
    const [tokenOwner, setTokenOwner] = useState();
    const navigate = useNavigate();

    const { isLoading, response, error, fetchData: changeOwner } = useApi(apiUrl + "item/buy", "POST");

    useEffect(() => {
        const fetchTokenOwner = async () => {
            let tokenOwner = await getTokenOwner(item.tokenId);
            tokenOwner = tokenOwner.toLowerCase();
            setTokenOwner(tokenOwner);
        }

        fetchTokenOwner();
    })

    useEffect(() => {
        if (userWallet) {
            const fetchGasEstimate = async () => {
                try {
                    const {estimatedGas} = await calculateGas(item.tokenId, userWallet.ethAddress, item.value);
                    const gasEther = ethers.formatEther(estimatedGas)
                    setGasCost(gasEther);
                    const total = String(Number(item?.value) + Number(gasEther));
                    setTotalCost(total);
                } catch (error) {
                    console.error("Error fetching gas estimate:", error);
                    setGasCost(null);
                    setTotalCost(null);
                }
            };

            fetchGasEstimate();
        }
    }, [userWallet, item]);

    const buyNft = async () => {
        try {
            const data = {
                "buyerId": user?.id,
                "nftId": item?.id
            }

            await buyNFT(item.tokenId, userWallet.ethAddress);
            userWallet.balance -= item.value;
            setUserWallet(userWallet);
            await changeOwner(data);
        } catch (err) {
            const errorMessage = error?.message || "Something went wrong!";
            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        if (response) {
            setItem(response);
            navigate("/profile");
            window.location.reload();
        }
    }, [response]);

    return (
        <div className="p-4 border border-info rounded bg-info">
            <div className="d-flex justify-content-end">
                <button className="btn-close text-light" onClick={close}></button>
            </div>
            <div className="text-center">
                <h2 className="text-light mb-4">Buy NFT</h2>
            </div>
            <div className="px-3">
                <div className="text-light mb-3">
                    <p className="d-flex justify-content-between">
                        <span className="fw-bold">NFT Cost:</span>
                        <span>{item.value} ETH</span>
                    </p>
                    <p className="d-flex justify-content-between">
                        <span className="fw-bold">Gas Cost:</span>
                        <span>
                            {gasCost !== null 
                                ? `${gasCost} ETH`
                                : "Calculating..."}
                        </span>
                    </p>
                    <p className="d-flex justify-content-between fs-5 border-top pt-2">
                        <span className="fw-bold">Total Cost:</span>
                        <span>
                            {totalCost !== null 
                                ? `${totalCost} ETH`
                                : "Calculating..."}
                        </span>
                    </p>
                </div>
    
                <p className="text-warning small text-center mb-4">
                    Gas cost depends on network congestion. Please confirm before proceeding.
                </p>
    
                <button 
                    className={`btn btn-primary w-100 ${(userWallet?.ethAddress == tokenOwner || isLoading) && "disabled"}`}
                    onClick={() => buyNft()}
                >
                    {isLoading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        "Confirm Purchase"
                    )}
                </button>
            </div>
            <ToastContainer />
        </div>
    );  
}

export default PopupBuyNow;
