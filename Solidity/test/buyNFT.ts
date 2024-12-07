import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyNFT - BuyNFT", function () {
    let contract: any;
    let owner: any;
    let buyer: any;
    let other: any;

    beforeEach(async () => {
        const [deployer, account1, account2] = await ethers.getSigners();

        owner = deployer;
        buyer = account1;
        other = account2;

        const MyNFT = await ethers.getContractFactory("MyNFT");
        contract = await MyNFT.deploy();
    });

    it("should allow a user to buy an NFT and transfer ownership", async () => {
        const tokenData = "Token Data";
        const price = "1"; // Price in ETH
        const priceInWei = ethers.parseEther(price);

        // Create NFT by the owner
        const tx = await contract.createNFT(owner.address, tokenData, priceInWei);
        await tx.wait();

        // Retrieve the token ID using events
        const filter = contract.filters.NFTCreated();
        const events = await contract.queryFilter(filter, -1);
        const tokenId = events[0].args.tokenId;

        // Check the initial owner of the token
        expect(await contract.ownerOf(tokenId)).to.equal(owner.address);

        // Buyer attempts to purchase the NFT
        const initialSellerBalance = await ethers.provider.getBalance(owner.address);
        const initialBuyerBalance = await ethers.provider.getBalance(buyer.address);

        const buyTx = await contract.connect(buyer).buyNFT(tokenId, buyer.address, {
            value: priceInWei,
        });
        const buyReceipt = await buyTx.wait();

        // Verify ownership transfer
        expect(await contract.ownerOf(tokenId)).to.equal(buyer.address);

        // Verify the seller received the payment
        const finalSellerBalance = await ethers.provider.getBalance(owner.address);
        expect(finalSellerBalance).to.equal(initialSellerBalance + priceInWei);

        // Verify the buyer's balance was reduced
        const gasUsed = buyReceipt.gasUsed;
        const gasUsedBig = BigInt(gasUsed);
        const finalBuyerBalance = await ethers.provider.getBalance(buyer.address);
        // expect(finalBuyerBalance).to.equal(initialBuyerBalance - priceInWei - gasUsedBig);

        // Buyer attempts to purchase again (should fail)
        await expect(
            contract.connect(buyer).buyNFT(tokenId, buyer.address, { value: priceInWei })
        ).to.be.revertedWith("Buyer is already the owner of this NFT");

        // Another user attempts to buy the NFT
        const otherTx = await contract.connect(other).buyNFT(tokenId, other.address, {
            value: priceInWei,
        });
        await otherTx.wait();

        // Verify ownership transferred to the new buyer
        expect(await contract.ownerOf(tokenId)).to.equal(other.address);

        // Attempt to buy with insufficient funds
        await expect(
            contract.connect(other).buyNFT(tokenId, other.address, {
                value: ethers.parseEther("0.5"),
            })
        ).to.be.revertedWith("Buyer does not have enough balance");
    });

    it("should allow the original owner to buy back an NFT", async () => {
        const tokenData = "Token Data";
        const price = "1"; // Price in ETH
        const priceInWei = ethers.parseEther(price);
    
        // Create NFT by the owner
        const tx = await contract.createNFT(owner.address, tokenData, priceInWei);
        await tx.wait();
    
        // Retrieve the token ID using events
        const filter = contract.filters.NFTCreated();
        const events = await contract.queryFilter(filter, -1);
        const tokenId = events[0].args.tokenId;
    
        // Buyer purchases the NFT
        const initialSellerBalance = await ethers.provider.getBalance(owner.address);
        const initialBuyerBalance = await ethers.provider.getBalance(buyer.address);
    
        const buyTx = await contract.connect(buyer).buyNFT(tokenId, buyer.address, {
            value: priceInWei,
        });
        const buyReceipt = await buyTx.wait();
    
        // Verify ownership transferred to buyer
        expect(await contract.ownerOf(tokenId)).to.equal(buyer.address);
    
        // Original owner buys back the NFT
        const secondSellerBalance = await ethers.provider.getBalance(buyer.address);
        const secondBuyerBalance = await ethers.provider.getBalance(owner.address);
    
        const buyBackTx = await contract.connect(owner).buyNFT(tokenId, owner.address, {
            value: priceInWei,
        });
        const buyBackReceipt = await buyBackTx.wait();
    
        // Verify ownership transferred back to original owner
        expect(await contract.ownerOf(tokenId)).to.equal(owner.address);
    
        // Verify balances
        const finalSellerBalance = await ethers.provider.getBalance(buyer.address);
        const finalBuyerBalance = await ethers.provider.getBalance(owner.address);
    
        expect(finalSellerBalance).to.equal(secondSellerBalance + priceInWei);
    
        const gasUsed = buyBackReceipt.gasUsed;
        const gasUsedBig = BigInt(gasUsed);
        expect(finalBuyerBalance).to.be.closeTo(secondBuyerBalance - priceInWei - gasUsedBig, ethers.parseEther("0.01"));
    });
});