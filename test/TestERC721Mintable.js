var ERC721MintableComplete = artifacts.require("ERC721MintableComplete");
const NUM_TOKENS = 5;

contract("TestERC721Mintable", (accounts) => {
	const account_one = accounts[0];
	const account_two = accounts[1];

	describe("match erc721 spec", function () {
		before(async function () {
			this.contract = await ERC721MintableComplete.new(
				"Capstone Real Estate",
				"CRE",
				"http://localhost/",
				{ from: account_one }
			);
			for (let i = 0; i < NUM_TOKENS; ++i){
				await this.contract._mint(account_one,i, i+"");
			}
		});

		it("should return total supply", async function () {
			let totalSupply = await this.contract.totalSupply();
			assert.equal(totalSupply,NUM_TOKENS, "Wrong totalSupply() return value");
		});

		it("should get token balance", async function () {
			let tokenBalance = await this.contract.balanceOf(account_one);
			assert.equal(tokenBalance,NUM_TOKENS, "Wrong balanceOf() return value");
		});

		// token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
		it("should return token uri", async function () {
			let tokenURI = await this.contract.tokenURI(0);
			assert.equal(tokenURI, "http://localhost/0", "Wrong tokenURI() return value");
		});

		it("should transfer token from one owner to another", async function () {
			await this.contract.transferFrom(account_one, account_two, 0);
			let newOwner = await this.contract.ownerOf(0);
			assert.equal(newOwner,account_two, "Token was not transferred.");
		});
	});

	describe("have ownership properties", function () {
		beforeEach(async function () {
			this.contract = await ERC721MintableComplete.new(
				"Capstone Real Estate",
				"CRE",
				"http://localhost/",
				{ from: account_one }
			);
		});

		it("should fail when minting when address is not contract owner", async function () {
			let reverted = false;
			try {
				let result = await this.contract._mint(account_two,"5","5",{from:account_two});
			} catch (error) {
				reverted = true;
			}
			assert.equal(reverted,true,"Only owner should be able to mint");
		});

		it("should return contract owner", async function () {
			let owner = await this.contract._owner.call();
			assert.equal(owner,account_one,"Returned different address as owner");
		});
	});
});
