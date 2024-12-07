import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("@nomicfoundation/hardhat-ignition");

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      // accounts: ['0xaf9014a7be543450ab894db5091715f742c41d9cbd63836e98e96d533f0109e6']
    },
  },
};

export default config;
