import { ethers } from "ethers";
import { getContract } from "./contractConnector";

export async function calculateGas(
    tokenId: bigint,
    buyerAddress: string,
    price: number
) {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = await getContract();

        const txData = await contract.interface.encodeFunctionData("buyNFT", [tokenId, buyerAddress]);

        const txRequest = {
            to: contract.target,
            data: txData,
            value: ethers.parseEther(String(price)),
        };

        const estimatedGas = await provider.estimateGas(txRequest);
        const gasCostInEth = parseFloat(ethers.formatEther(estimatedGas));

        return {estimatedGas, gasCostInEth};
    } catch (error) {
        console.error("Error calculating purchase gas:", error);
        throw new Error("Failed to calculate gas cost for purchase. Please try again.");
    }
}