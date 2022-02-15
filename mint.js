require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Deployment = require('./deployment.rinkeby.json');
const SolnSquareVerifier = require('./build/contracts/SolnSquareVerifier.json');
const { Console } = require('console');

var infuraKey = process.env['INFURAKEY'] || '';
var privateKey = process.env['PRIVATEKEY'] || '';

console.warn("INFURA KEY PROVIDED:", (infuraKey != ''));
console.warn("PRIVATE KEY PROVIDED:", (privateKey != ''));

if (infuraKey == '' || privateKey == '') return console.error("Provide infura key and private key");

const provider = new HDWalletProvider([privateKey], infuraKey);
const web3 = new Web3(provider);

const contract = new web3.eth.Contract(SolnSquareVerifier.abi, Deployment.contract);

const proofsFolder = path.join(__dirname,'proofs');
const proofFiles = fs.readdirSync(proofsFolder).map(filename=>path.join(proofsFolder,filename));

async function awaitConfirmations(txHash,numConfirmations=3){
	console.log('Awaiting',numConfirmations,'confirmations for', txHash);
	let intialBlock = await web3.eth.getBlockNumber();
	let lastBlock = await web3.eth.getBlockNumber();
	process.stdout.write("Confirming: ");
	do {
		process.stdout.write('.');
		await new Promise(r => setTimeout(r, 2500));
		lastBlock = await web3.eth.getBlockNumber();
	} while(lastBlock - intialBlock < numConfirmations);
	console.log("Confirmed.");
}

(async function main(){

	const accounts = await web3.eth.getAccounts();
	const account = accounts[0];

	for (let i = 1; i < proofFiles.length; ++i){
		let proofFile = proofFiles[i];
		let proof = require(proofFile);
		
		console.log("Minting NFT with tokenId",i,' ...');

		let result = await contract.methods.mint(account,i,i+"",proof.proof,proof.inputs).send({from:account});
		await awaitConfirmations(result.transactionHash);
		console.log("Minted NFT with tokenId",i);
	}

	Console.log('Done.');
	process.exit(0);

})();



