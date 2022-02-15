// migrating the appropriate contracts
var SquareVerifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const fs = require('fs');

module.exports = async function(deployer,network,accounts) {
	
	console.warn("Network",network);

	if (network == "test") return;

	await deployer.deploy(SquareVerifier);
	await deployer.deploy(SolnSquareVerifier, "Capstone Real Estate", "CRE", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", SquareVerifier.address);

	let instance = await SolnSquareVerifier.deployed();

	fs.writeFileSync('deployment.'+network+'.json',JSON.stringify({
		network: network,
		contract: instance.address
	},"\t"));
	console.log("Contract deployed at", instance.address);

};
