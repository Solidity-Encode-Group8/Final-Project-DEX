import { ethers } from "ethers";
import "dotenv/config";
import * as uniswapV2FactoryJson from "../artifacts/contracts/UniswapV2Factory.sol/UniswapV2Factory.json";
//import * as uniswapV2ERC20Json from "../artifacts/contracts/UniswapV2ERC20.sol/UniswapV2ERC20.json";
//import * as uniswapV2PairJson from "../artifacts/contracts/UniswapV2Pair.sol/UniswapV2Pair.json";
import { UniswapV2Factory } from "../typechain-types";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

function setupProvider() {
  const infuraOptions = process.env.INFURA_API_KEY
    ? process.env.INFURA_API_SECRET
      ? {
          projectId: process.env.INFURA_API_KEY,
          projectSecret: process.env.INFURA_API_SECRET,
        }
      : process.env.INFURA_API_KEY
    : "";
  const options = {
    alchemy: process.env.ALCHEMY_API_KEY,
    infura: infuraOptions,
  };
  const provider = ethers.providers.getDefaultProvider("rinkeby", options);
  return provider;
}


async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);
      
  console.log(`Using address ${wallet.address}`);
  const provider = setupProvider();
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  //DEPLOYING CONTRACT
  /*
  console.log("Deploying uniswapFactory contract");
  const uniswapV2FactoryFactory = new ethers.ContractFactory(
    uniswapV2FactoryJson.abi,
    uniswapV2FactoryJson.bytecode,
    signer
  );

  const uniswapV2FactoryContract = await uniswapV2FactoryFactory.deploy("0xc046cB6389571B43D09008828D6bC25e9997904E");
  console.log("Awaiting confirmations");
  await uniswapV2FactoryContract.deployed();
  console.log("Completed");
  console.log(`UniswapFactory Contract deployed at ${uniswapV2FactoryContract.address}`);
  */
  
  const uniswapV2FactoryContract: UniswapV2Factory = new ethers.Contract(
    "0x20D47c652537cE01b6fee010e298825242b00c99", //0xc2b95CD41F80367dA3f86B563333F1DBfD91248E
    uniswapV2FactoryJson.abi,
    signer
  ) as UniswapV2Factory;

  console.log("calling smartcontract");


  //SOME IMPORTANT TRANSACTIONS
  
  //creation of a pair pool
  const timestamp = (await provider.getBlock("latest")).timestamp;
  console.log(`block timestamp is ${timestamp}`);
  const futur_timestamp = timestamp+10000000;

  const pasta_token_address = "0xbc54f78E5Fa3C60A6ACBD87C9468a88D89F045F4";
  const pizza_token_address = "0xF8A8a6625f89C5AaDaeACd42efC31aA10e75F4a4";
  const tx = await uniswapV2FactoryContract.createPair(
    pasta_token_address, 
    pizza_token_address,
    {
      gasLimit: 300000,
      nonce: undefined,
    });

  /*
  const tx = await nftCollectionContract.safeMint(mintToAddress, nftIndex,{value: ethers.utils.parseEther("0.0000001")});
  console.log("Awaiting confirmations");
  await tx.wait();
  console.log(`Mint operation completed. Hash: ${tx.hash}`);
  */

}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
