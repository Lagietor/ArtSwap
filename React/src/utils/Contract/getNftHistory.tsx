import { ethers } from "ethers";
import { getContract } from "./contractConnector";

export async function getNftHistory(tokenId: bigint) {
    try {
        const contract = await getContract();

        const rawResult = await contract.getNftHistory(BigInt(tokenId));
        const history = Array.from(rawResult);

        return history.map(tx => ({
            buyer: tx.buyer,
            price: ethers.formatEther(tx.price),
            timestamp: new Date(Number(tx.timestamp) * 1000).toISOString()
        }));
    } catch (err) {
        throw new Error(
            (err as any).message || "An unexpected error occurred during NFT creation."
        );
    }
}

export default getNftHistory