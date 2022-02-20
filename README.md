# Capstone Real Estate - ERC721 Contract

This project was the final exercise of the Udacity Blockchain Developer Nanodegree Program. The project aim was to apply the knowledge  during prior exercises/projects by implementing an ERC721 Contract with zero knowledge proof protection in the mint() function of the contract.

## OpenSea marketplace

- Open Sea Marketplace [Capstone Real Estate V2](https://testnets.opensea.io/collection/capstone-real-estate-v2-1)

## Deployed Contracts (rinkeby testnet)

### Square verifier contract
- The verifier contract has been deployed at address [0x601bc01e5c876f471ef969250c1312db9b69e90c](https://rinkeby.etherscan.io/address/0x601bc01e5c876f471ef969250c1312db9b69e90c)
- Contract creation transaction: [0xeccc9990492163ad878c53b46078f2c3ed70b1a5399a9d6e6ed2ceae846f9806](https://rinkeby.etherscan.io/tx/0xeccc9990492163ad878c53b46078f2c3ed70b1a5399a9d6e6ed2ceae846f9806) 

- The contracts ABI can be found [Here](build/contracts/Verifier.json)
### ERC721 NFT Contract
- The ERC721 contract has been deployed at address [0x1d575a4d170c49d31bfd262e572de63d2ac1af01](https://rinkeby.etherscan.io/address/0x1d575a4d170c49d31bfd262e572de63d2ac1af01)
- Contract creation transaction: [0x78c21908aa20da77368c57a9f7d663e5c648f1dc9caf3df5ebab96bd4fad1327](https://rinkeby.etherscan.io/tx/0x78c21908aa20da77368c57a9f7d663e5c648f1dc9caf3df5ebab96bd4fad1327)
- The contracts ABI can be found [Here](build/contracts/SolnSquareVerifier.json)


### Minted token transactions:
- [0xa1039d00f6da253fcfa9c283a8b4a8fe9131ef76854391b93d1541c36490609a](https://rinkeby.etherscan.io/tx/0xa1039d00f6da253fcfa9c283a8b4a8fe9131ef76854391b93d1541c36490609a)
- [0xf7c24ca1769393f7024cb71c6512e3af06b64df3ac15560b551eb784d96411f5](https://rinkeby.etherscan.io/tx/0xf7c24ca1769393f7024cb71c6512e3af06b64df3ac15560b551eb784d96411f5)
- [0x0f741a0ec0a4b39fdedb109c5772edfdc2dd3c4915bfd97b0c1c3f0b0d6c6c45](https://rinkeby.etherscan.io/tx/0x0f741a0ec0a4b39fdedb109c5772edfdc2dd3c4915bfd97b0c1c3f0b0d6c6c45)
- [0x0f42d3d290ceea31565d27bee28b465bb9c61878ae3dbbecd45a2d6fead14b57](https://rinkeby.etherscan.io/tx/0x0f42d3d290ceea31565d27bee28b465bb9c61878ae3dbbecd45a2d6fead14b57)
- [0xeb09689b078779bf0f1fdd6fb13005e49b6f4f7fd08490f34e7f60570b4765ad](https://rinkeby.etherscan.io/tx/0xeb09689b078779bf0f1fdd6fb13005e49b6f4f7fd08490f34e7f60570b4765ad)

### Sales transactions:
- [0xf49f7f89cf58a48f8364b5aaef90ed713170996ffbe5127e655a3a6a68681226](https://rinkeby.etherscan.io/tx/0xf49f7f89cf58a48f8364b5aaef90ed713170996ffbe5127e655a3a6a68681226)
- [0x27d58e28b143681d43fa372f4031675149693a4bb6f5a058d4eaac699a0009fd](https://rinkeby.etherscan.io/tx/0x27d58e28b143681d43fa372f4031675149693a4bb6f5a058d4eaac699a0009fd)



## Required and implemented functionality
- ERC721 Contract
- Zokrates (zero knowledge) proof verification Contract
- Tests of the functionality via unit tests

## Prerequsites
- Node ^v16
- Docker

## Install

This repository contains Smart Contract code written in Solidity for ethereum (using Truffle), tests (also using Truffle) and a minting program.

To install, download or clone the repo, then run:

`npm install`


## Run Ganache CLI

You can either run:

`npm run ganache`

or run a different ethereum blockchain at port `7545` with mnemonic: 

`candy maple cake sugar pudding cream honey rich smooth crumble sweet treat`

## Zokrates
The following command
```
npm run zokrates
```
spins up a docker container with image zokrates/zokrates, mounts the local zokrates folder into the container and executes the bash script under /home/zokrates/code/square/generate
This script generate all the needed files to use Zokrates in an ethereum environment, along with 5 proofs to be used later when minting tokens.
## Run tests

The following tests are provided:

```
npm run test:ERC721
```
Tests the functionality of the ERC721 Contract

```
npm run test:Zokrates
```
Tests the functionality of the Zokrates generated Verifier Contract

```
npm run test:Soln
```
Tests the functionality of the aggregated Contract with zero knowledge proof verification when minting a token

```
npm run test:all
```
Sequentially executes all of the above tests 

## Deployment

### Local
```
npm run deploy:local
```
Deploys the contracts on a local blockchain (development network in truffle.js) 

### Rinkeby testnet
```
npm run deploy:rinkeby
```
Deploys the contracts on the rinkeby testnet network (rinkeky network in truffle.js) 

Make sure to set the following environment variables for 
```
INFURAKEY="yourinfurakey"
PRIVATEKEY="yourprivatekey"
```
Alternatively you can use a .env file in the root folder.

## Minting tokens

You can either manually mint some tokens or use the provided mint.js node program, either by debugging it in vscode or by invoking the command
```
npm run mint
```
Be aware that the contracts need to be deployed before minting and that you need to provide the needed environment variables like above
```
INFURAKEY="yourinfurakey"
PRIVATEKEY="yourprivatekey"
```


