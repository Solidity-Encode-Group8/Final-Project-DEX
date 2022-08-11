import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.5.16",
    settings: {
      optimizer: {
        enabled: false
      },
    },
  },
};

export default config;
