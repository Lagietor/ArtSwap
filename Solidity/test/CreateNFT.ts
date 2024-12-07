import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract } from "ethers";

describe("MyNFT Contract", function () {
  let nftContract: Contract;
  let owner: any;
  let addr1: any;

  beforeEach(async function () {
    const MyNFT = await ethers.getContractFactory("MyNFT");
    nftContract = await MyNFT.deploy();

    [owner, addr1] = await ethers.getSigners();
  });

  it("should mint an NFT and emit the Transfer event with correct data", async function () {
    const tokenDataJson = JSON.stringify({
      name: "Test NFT",
      description: "This is a test NFT",
      image: "test-image-url",
    });
    const price = ethers.parseEther("1");
  
    // Mint the NFT
    const tx = await nftContract.connect(owner).createNFT(addr1.address, tokenDataJson, price);
    const receipt = await tx.wait();
  
    // ABI dla Transfer event
    const transferEventABI = [
      "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
    ];
  
    // Tworzymy Interface, aby dekodować logi
    const transferEventInterface = new ethers.Interface(transferEventABI);
  
    // Sprawdzamy logi transakcji
    for (const log of receipt.logs) {
      // Dekodujemy logi bez sprawdzania tematu
      try {
        const decodedData = transferEventInterface.decodeEventLog("Transfer", log.data, log.topics);
        
        // Sprawdzenie, czy dane są zgodne
        console.log("Decoded event data:", decodedData);
  
        expect(decodedData.to).to.equal(addr1.address); // Sprawdzamy, czy adres docelowy jest poprawny
        expect(decodedData.tokenId).to.be.a('bigint');  // Sprawdzamy, czy tokenId jest poprawnym bigint
        expect(await nftContract.tokenData(decodedData.tokenId)).to.equal(tokenDataJson); // Sprawdzamy, czy tokenData są zapisane
  
        return; // Koniec testu po znalezieniu i sprawdzeniu eventu
      } catch (err) {
        console.error("Error decoding log:", err);
      }
    }
  
    // Jeśli nie znaleziono zdarzenia, test nie przejdzie
    expect.fail("Transfer event not found in logs.");
  });

  it("should fail to mint an NFT with price less than or equal to 0", async function () {
    const tokenDataJson = JSON.stringify({
      name: "Test NFT",
      description: "This is a test NFT",
      image: "test-image-url",
    });
  
    const invalidPrice = ethers.parseEther("0"); // Cena = 0 ETH
  
    await expect(
      nftContract.connect(owner).createNFT(addr1.address, tokenDataJson, invalidPrice)
    ).to.be.revertedWith("Price must be greater than zero");
  
    // const negativePrice = ethers.parseEther("-1"); // Cena = -1 ETH
  
    // // Sprawdzamy, czy kontrakt wyrzuci błąd
    // await expect(
    //   nftContract.connect(owner).createNFT(addr1.address, tokenDataJson, negativePrice)
    // ).to.be.revertedWith("Price must be greater than zero");
  });
});
