
### periph deployement

Need to change line 24 in “libraries/UniswapV2Library.sol” 


Need to optimize in hardhat.config.ts :
```
const config: HardhatUserConfig = {
  solidity: {
    version: "0.6.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
```

# Deploy
```
>yarn install
>yarn hardhat compile
>yarn ts-node --files scripts/2-deploy-periphery.ts
```

```
Using address 0xc046cB6389571B43D09008828D6bC25e9997904E
Wallet balance 0.10969781006309745
Deploying uniswapFactory contract
Awaiting confirmations
Completed
UniswapV2Router02 Contract deployed at 0xeE5406F2fb96e663B2A68B1b9b4038D5A8D744dE

```


# understand

https://dev.to/francisldn/5-tips-tricks-in-uniswapv2-contracts-for-defi-developers-32oa

understand x*y>=k https://betterprogramming.pub/uniswap-v2-in-depth-98075c826254
