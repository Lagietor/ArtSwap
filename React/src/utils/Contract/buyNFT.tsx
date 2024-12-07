import { ethers } from 'ethers';
import { getContract } from './contractConnector';

export async function buyNFT(tokenId: bigint, buyerAddress: string) {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(buyerAddress);
        const contract = (await getContract()).connect(signer);
        const price = await contract.tokenPrices(tokenId);

        const tx = await contract.buyNFT(tokenId, buyerAddress, {
            value: price,
            gasLimit: 500000
        });
        await tx.wait();
        const filter = contract.filters.NFTBought;
        const events = await contract.queryFilter(filter, -1);
        console.log(events);
    } catch (err) {
        console.error(err);
        throw new Error(
            (err as any).message || "An unexpected error occurred during NFT creation."
        );
    }
}

export default buyNFT