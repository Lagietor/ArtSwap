import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("@nomicfoundation/hardhat-ignition");

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    location: {
      url: "localhost:8545",
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"]
      // url: "https://eth-sepolia.g.alchemy.com/v2/M5AbPKs-w6nflRdNuyZX5WFB--ResKRl",
      // accounts: ["4b53f60cb0e277198a6daac6baa74e1d16e4e3bdd6841e1e0f5d945b60483b5f"]
    },
  }
};

export default config;
