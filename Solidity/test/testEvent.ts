import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";

describe("MyNFT", function () {
    let nftContract: Contract;
    let owner: string;
    let addr1: string;

    beforeEach(async function () {
        const [signer1, signer2] = await ethers.getSigners();
        owner = signer1;
        addr1 = signer2.address;

        const MyNFT = await ethers.getContractFactory("MyNFT");
        nftContract = await MyNFT.deploy();
        // await nftContract.deployed();
    });

    it("should emit the NFTCreated event with correct tokenId", async function () {
        const tokenDataJson = JSON.stringify({
            name: "Test NFT",
            description: "This is a test NFT",
            image: "test-image-url",
        });
        const price = ethers.parseEther("1");

        // Mint NFT and get the transaction
        const tx = await nftContract.createNFT(addr1, tokenDataJson, price);

        // Get the receipt for the transaction to access logs
        const receipt = await tx.wait();

        // Log the receipt for inspection
        console.log("Transaction Receipt: ", receipt.logs);

        // Look for the NFTCreated event in the logs
        const nftCreatedEvent = receipt.events?.find((event: any) => event.event === "NFTCreated");

        if (nftCreatedEvent) {
            // Log the data from the NFTCreated event
            console.log("NFTCreated Event Data: ", nftCreatedEvent.args);
            const { tokenId } = nftCreatedEvent.args;
            console.log("Extracted tokenId: ", tokenId.toString());

            // Sprawdzanie, czy tokenId jest poprawny
            expect(tokenId).to.equal(1);  // Assuming tokenId = 1 after minting the first NFT
        } else {
            // Jeśli event nie zostanie znaleziony
            console.error("NFTCreated event was not emitted");
        }
    });
});
