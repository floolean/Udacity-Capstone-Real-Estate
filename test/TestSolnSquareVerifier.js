// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates

// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps

// Test verification with incorrect proof

var Verifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const validProof = require('../proofs/1_proof.json');
const invalidProof = {
  "proof": {
    "a": [
      "0x288f27fdb1b0e46015b469888396e4d6979cdee81a1cd1c2ac7bafbbe54f746b",
      "0x0dcc0bf9461d0223766a0ec9e25c75715f35abc700480b4ae590bb8d2bdf2fdd"
    ],
    "b": [
      [
        "0x188a6d4d1a7ae078473d6c217a129dc99669b4b56330dfa9370d50fb61c3dee1",
        "0x1fbc3780266785f4c770f98dd24f4472add7c7226f28b0f35430b53ce8f895f5"
      ],
      [
        "0x25f66e325a75a04c9aad2f476c6a71added85b85c557f504d1dc726c959793ae",
        "0x19ed27034b027d2a46ad9f54a3f56503ff73fe2ce9c8ede358c0db63bdfa04ef"
      ]
    ],
    "c": [
      "0x1f5f3cc446b37e0feb630638e7d506ce4030d2b42a37092d9155f9f1ed51e569",
      "0x2206bd9e97a1f69ce6b84be49c9c76be7ae4e7e166b7df29e305ac5a0d8b0f22"
    ]
  },
  "inputs": [
    "0x0000000000000000000000000000000000000000000000000000000000000004",
    "0x0000000000000000000000000000000000000000000000000000000000000001"
  ]
};

contract("TestSolnSquareVerifier", (accounts) => {

	const account_one = accounts[0];
	const account_two = accounts[1];


	describe("test soln square verifier", function () {
		before(async function () {
			let verifier = await Verifier.new({from:account_one});
			this.contract = await SolnSquareVerifier.new(
				"Capstone Real Estate",
				"CRE",
				"http://localhost/",
				verifier.address,
				{ from: account_one }
			);
			this.proofKey = await this.contract.getProofKey(validProof.proof,validProof.inputs);
		});

		it("should be able to mint a token with a valid solution", async function () {
			await this.contract.mint(account_one,0,"0",validProof.proof,validProof.inputs);
			let proofAddress = await this.contract._uniqueSolutions.call(this.proofKey);
			assert.equal(proofAddress, account_one, "Solution was not added");
		});

		it("should not be able to mint a token with an invalid solution", async function () {
			let reverted = false;
			try {
				await this.contract.mint(account_one,1,"1",invalidProof.proof,invalidProof.inputs);
			} catch (err) {
				reverted = true;
			}
			assert.equal(reverted,true,"Was able to mint a token with an invalid solution");
		});

		it("should not be able to mint a token with an already used valid solution", async function () {
			let reverted = false;
			let proofAddress = await this.contract._uniqueSolutions.call(this.proofKey);
			try {
				await this.contract.mint(account_two,1,"1",validProof.proof,validProof.inputs);
			} catch (err) {
				reverted = true;
			}
			let afterMintProofAddress = await this.contract._uniqueSolutions.call(this.proofKey);
			assert.equal(proofAddress,afterMintProofAddress,"Proof key address has changed");
			assert.equal(reverted,true,"Was able to mint a token with an already used valid solution");
		});

	});
});


