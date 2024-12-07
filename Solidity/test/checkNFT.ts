import { ethers } from "hardhat";
import { Contract } from "ethers";

async function checkOwnerOf(tokenId: number): Promise<void> {
  const [owner] = await ethers.getSigners();
  
  const nftContract: Contract = await ethers.getContractAt("MyNFT", "0x610178da211fef7d417bc0e6fed39f05609ad788");
  
  // Użyj funkcji ownerOf z ERC721
  try {
    const ownerOfToken: string = await nftContract.ownerOf(tokenId);
    console.log(`Token ID ${tokenId} is owned by ${ownerOfToken}`);
  } catch (error) {
    console.error(`Error getting owner of token ${tokenId}:`, error);
  }
}

async function checkUserNFT(userAddress: string): Promise<void> {
  const nftContract: Contract = await ethers.getContractAt("MyNFT", "0x610178da211fef7d417bc0e6fed39f05609ad788");
  
  const userTokens: number[] = [];
  const totalSupply = 100;  // Załóżmy, że wiesz, że tokeny mają numery od 1 do 100
  
  try {
    for (let tokenId = 1; tokenId <= totalSupply; tokenId++) {
      const ownerOfToken: string = await nftContract.ownerOf(tokenId);
      if (ownerOfToken.toLowerCase() === userAddress.toLowerCase()) {
        userTokens.push(tokenId);
      }
    }
    console.log(`User ${userAddress} owns the following tokens:`, userTokens);
  } catch (error) {
    console.error("Error checking user NFTs:", error);
  }
}

describe("NFT Ownership Checks", function () {
  it("should check the owner of a token", async function () {
    await checkOwnerOf(1); // Sprawdź właściciela tokenu o ID 1
  });

  it("should check which NFTs a user owns", async function () {
    await checkUserNFT("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"); // Sprawdź tokeny użytkownika podając adres
  });
});
