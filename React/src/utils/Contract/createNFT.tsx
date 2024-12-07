import { ethers } from 'ethers';
import { getContract } from './contractConnector';

export async function createNFT(userAddress: string, jsonData: object, price: string) {
    try {
        const tokenDataJson = JSON.stringify(jsonData);

        if (!(Number(price) > 0)) {
            throw new Error("Price must be greater than 0");
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(userAddress);
        const contract = (await getContract()).connect(signer);

        const tx = await contract.createNFT(userAddress, tokenDataJson, ethers.parseEther(price));
        await tx.wait();
        const filter = contract.filters.NFTCreated;
        const events = await contract.queryFilter(filter, -1);
        console.log(events);
        const tokenId = events[0].args.tokenId;
        console.log(tokenId);

        return tokenId;
    } catch (err) {
        throw new Error(
            (err as any).message || "An unexpected error occurred during NFT creation."
        );
    }
}

export default createNFT