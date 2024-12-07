import { ethers } from "ethers"
import { getContract } from "./contractConnector";

export async function editNFT(tokenId: bigint, userAddress: string, newJsonData: object, price: string) {
    try {
        if (!(Number(price) > 0)) {
            throw new Error("Price must be greater than 0");
        }

        const newDataJson = JSON.stringify(newJsonData);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(userAddress);
        const contract = (await getContract()).connect(signer);

        const tx = await contract.editNFT(tokenId, userAddress, newDataJson, ethers.parseEther(price), { gasLimit: 500000 });
        await tx.wait();
        const filter = contract.filters.NFTEdited;
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

export default editNFT