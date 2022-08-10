# steps to be careful

Instead of deploying with Remix like in this [blogpost](https://medium.com/@maxime.atton/fork-uniswap-v2-smart-contracts-ui-on-remix-e885d6cea176), we will deploy using typescript scripts.

Need to add this line in tsconfig.json :   "resolveJsonModule": true,


Need to have `solidity: "0.5.16",` in `hardhat.config.ts`

Need to have this line in `UniswapV2Factory.sol` : 

```
bytes32 public constant INIT_CODE_HASH = keccak256(abi.encodePacked(type(UniswapV2Pair).creationCode));
```


Dans les fichiers typescript, remplacez 
```
import { UniswapV2Factory } from "../typechain";
``` 
par 
```
import { UniswapV2Factory } from "../typechain-types";
```

## Deploy
```
>yarn install
>yarn hardhat compile
>yarn ts-node --files scripts/1-deploy-factory.ts
```

```
Using address 0xc046cB6389571B43D09008828D6bC25e9997904E
Wallet balance 0.2775180123783882
Deploying uniswapFactory contract
Awaiting confirmations
Completed
UniswapFactory Contract deployed at 0xf2F343c63F94AfC159D16f603F33522deA1848b1
INIT_CODE_HASH is 0xae17ecc001cb9f1d2494d8c926f48cd66ea62d037cc4ae69a9d23ca456a8e680
globalBaseFees address is 0x03EE0cB6D1394fE86B80AcE897273fAf1E210C8F
```

OLD ONE without the fee contract
```
Using address 0xc046cB6389571B43D09008828D6bC25e9997904E
Wallet balance 0.29124845455579457
Deploying uniswapFactory contract
Awaiting confirmations
Completed
UniswapFactory Contract deployed at 0x073Fc578c8791b35454Ec4b62847d6766eb2Fc12
INIT_CODE_HASH is 0x8e5230e05502edb2bf1b369829a47de5e784ecfe21f752036fbba520ba4e459b

```

