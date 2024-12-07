import { ethers } from "ethers";
import { getContract } from "./contractConnector";

export async function deleteNFT(tokenId: bigint, userAddress: string) {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(userAddress);
        const contract = (await getContract()).connect(signer);

        const tx = await contract.deleteNFT(tokenId, userAddress, { gasLimit: 500000 });
        await tx.wait();
        const filter = contract.filters.NFTDeleted;
        const events = await contract.queryFilter(filter, -1);
        console.log(events);
    } catch (err) {
        let errorMessage = '';

        if (err instanceof Error && !("error" in err)) {
            errorMessage = err.message;
        } else {
            errorMessage = err.error.data.reason;
        }
        
        throw new Error(
            errorMessage || "An unexpected error occurred during NFT creation."
        );
    }
}

export default deleteNFT