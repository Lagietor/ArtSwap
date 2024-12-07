import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyNFT - EditNFT", function () {
  let contract: any;
  let owner: any;
  let addr1: any;

  beforeEach(async () => {
    const MyNFT = await ethers.getContractFactory("MyNFT");
    contract = await MyNFT.deploy();

    [owner, addr1] = await ethers.getSigners();
  });

  it("should allow the owner to edit an NFT's data", async () => {
    const tokenData = "Initial Data";
    const newTokenData = "Updated Data";
    const price = ethers.parseEther("0.1");

    const tx = await contract.connect(owner).createNFT(owner.address, tokenData, price);
    await tx.wait();
    const filter = contract.filters.NFTCreated;
    const events = await contract.queryFilter(filter, -1);
    const tokenId = events[0].args.tokenId;

    expect(tokenId).to.not.be.undefined;

    const editTx = await contract.editNFT(tokenId, newTokenData);
    await editTx.wait();

    const storedData = await contract.getTokenData(tokenId);
    expect(storedData).to.equal(newTokenData);
  });

  it("should revert if a non-owner tries to edit an NFT", async () => {
    const tokenData = "Initial Data";
    const newTokenData = "Updated Data";
    const price = ethers.parseEther("0.1");

    const tx = await contract.connect(owner).createNFT(owner.address, tokenData, price);
    await tx.wait();
    const filter = contract.filters.NFTCreated;
    const events = await contract.queryFilter(filter, -1);
    const tokenId = events[0].args.tokenId;

    await expect(
      contract.connect(addr1).editNFT(tokenId, newTokenData)
    ).to.be.revertedWith("Only the owner can edit this NFT");
  });
});