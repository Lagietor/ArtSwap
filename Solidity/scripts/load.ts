// Skrypt wczytujący dane i odtwarzający stan
async function loadBlockchainData() {
    const fs = require('fs');
    const rawData = fs.readFileSync('./blockchainData.json');
    const savedData = JSON.parse(rawData);
  
    const nftContract = await ethers.getContractAt("MyNFT", savedData.contractAddress);
  
    console.log(`Załadowano kontrakt MyNFT z adresu: ${savedData.contractAddress}`);
    console.log(`Właściciel kontraktu: ${await nftContract.owner()}`);
  }
  
  loadBlockchainData();