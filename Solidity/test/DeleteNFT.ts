import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyNFT - DeleteNFT", function () {
  let contract: any;
  let owner: any;
  let addr1: any;

  beforeEach(async () => {
    const MyNFT = await ethers.getContractFactory("MyNFT");
    contract = await MyNFT.deploy();

    [owner, addr1] = await ethers.getSigners();
  });

  it("should allow the owner to delete an NFT", async () => {
    const tokenData = "Token Data";
    const price = ethers.parseEther("0.1");

    const tx = await contract.connect(owner).createNFT(owner.address, tokenData, price);
    await tx.wait();
    const filter = contract.filters.NFTCreated;
    const events = await contract.queryFilter(filter, -1);
    const tokenId = events[0].args.tokenId;

    // Delete the NFT
    const deleteTx = await contract.connect(owner).deleteNFT(tokenId);
    await deleteTx.wait();

    // Verify the token has been burned
    await expect(contract.ownerOf(tokenId)).to.be.revertedWithCustomError(contract, "ERC721NonexistentToken").withArgs(tokenId);

    // Verify the token data is cleared
    const tokenDataAfterDelete = await contract.getTokenData(tokenId);
    expect(tokenDataAfterDelete).to.equal("");
  });

  it("should revert if a non-owner tries to delete an NFT", async () => {
    const tokenData = "Token Data";
    const price = ethers.parseEther("0.1");

    // Mint an NFT
    const tx = await contract.connect(owner).createNFT(owner.address, tokenData, price);
    await tx.wait();
    const filter = contract.filters.NFTCreated;
    const events = await contract.queryFilter(filter, -1);
    const tokenId = events[0].args.tokenId;

    // Try deleting as a non-owner
    await expect(
      contract.connect(addr1).deleteNFT(tokenId)
    ).to.be.revertedWith("Only the owner can delete this NFT");
  });
});