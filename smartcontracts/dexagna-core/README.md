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
Wallet balance 0.11878688840768786
Deploying uniswapFactory contract
Awaiting confirmations
Completed
UniswapFactory Contract deployed at 0x20D47c652537cE01b6fee010e298825242b00c99
INIT_CODE_HASH is 0x71bccf26330e73b52c875ccb859474f176fae7bdf30e386673da83cc82167c8e
globalBaseFees address is 0x33CbBAd815B59EcE2212321D7D4450e911571b95
LASA token address is 0xFFE4297581A5972f6883D5Ec26d75cCA5ad714cB
```

