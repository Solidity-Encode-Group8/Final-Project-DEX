# DEXagna smart contracts

DEXagna will be a fork of [Uniswap V2](https://github.com/Uniswap/v2-core) with some ideas taken from [Solidly](https://github.com/solidlyexchange/solidly).

`dexagna-core` is mostly inspired by uniswap-v2-core.
`dexagna-periphery` is mostly inspired by uniswap-v2-periphery.


# Main Changes

## fees distribution
The fees do not go into the liquidity pool pair like in uniswap V2. Instead the fees from all the pools are going into a specific smart contract. 

In solidly, for each pool, the fees go inside the `BaseV1Fees` contract and people can claim the fees. Each `BaseV1Fees` receives only the fees of the specific liquidity pool to which it is linked. A new `BaseV1Fees` is created by a base pair pool (`BaseV1Pair`) everytime a base pair pool is created, and `BaseV1Pair` are created by the factory contract.

In DEXagna, the `GlobalBaseV1Fees` contract recieves all the fees from all the pools and it is created by the factory contract (and not the pair contracts). 

## fees claims and $LASA token
TBD

### `claimFeesFor` function of GlobalBaseV1Fees
Only $LASA token holders can claim the amount they want of fees (they need to specify a token and an amount).

### `mint` function for $LASA
For the moment, each LP get 100000 $LASA token. (The amount is not important for the moment because in order to claim they just need a balance >0 )
Also everyone can mint $LASA token (to be improved).

# Deployment of the smart contracts
Check the README from the two different folders in order to see how to deploy the contracts
* `/dexagna-core` 
* `/dexagna-periphery`