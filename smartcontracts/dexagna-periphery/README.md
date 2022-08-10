
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
Wallet balance 0.27333479583934484
Deploying uniswapFactory contract
Awaiting confirmations
Completed
UniswapV2Router02 Contract deployed at 0xA0E5d323aF47117E5a6840Ee0354CC15A884Ab87
```


OLD CONTRACT
```
Using address 0xc046cB6389571B43D09008828D6bC25e9997904E
Wallet balance 0.28757326400189176
Deploying uniswapFactory contract
Awaiting confirmations
Completed
UniswapV2Router02 Contract deployed at 0x338D0d78d0bAE5E8Af185D523F38BedbdFf4d500

```


# understand

https://dev.to/francisldn/5-tips-tricks-in-uniswapv2-contracts-for-defi-developers-32oa

understand x*y>=k https://betterprogramming.pub/uniswap-v2-in-depth-98075c826254
