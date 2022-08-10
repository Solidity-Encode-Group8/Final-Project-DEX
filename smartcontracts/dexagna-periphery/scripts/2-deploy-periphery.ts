import { ethers } from "ethers";
import "dotenv/config";
import * as uniswapV2Router02Json from "../artifacts/contracts/UniswapV2Router02.sol/UniswapV2Router02.json";

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
  console.log("Deploying uniswapFactory contract");
  const uniswapV2Router02Factory = new ethers.ContractFactory(
    uniswapV2Router02Json.abi,
    uniswapV2Router02Json.bytecode,
    signer
  );

  const uniswapV2Router02Contract = await uniswapV2Router02Factory.deploy(
    "0x7734323B05DF796bB16FE169F28E16Ce13a860Af",
    "0xc778417E063141139Fce010982780140Aa0cD5Ab");
  console.log("Awaiting confirmations");
  await uniswapV2Router02Contract.deployed();
  console.log("Completed");
  console.log(`UniswapV2Router02 Contract deployed at ${uniswapV2Router02Contract.address}`);

  //SOME IMPORTANT TRANSACTIONS
  

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
