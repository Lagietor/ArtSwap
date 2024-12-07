// Skrypt zapisujący dane kontraktu
async function saveBlockchainData() {
    const nftContract = await ethers.getContractAt("MyNFT", "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
    const data = {
      contractAddress: nftContract.target,
    //   owner: await ,
    };
  
    const fs = require('fs');
    fs.writeFileSync('./blockchainData.json', JSON.stringify(data, null, 2));
    console.log("Dane blockchain zapisane!");
  }
  
  saveBlockchainData();