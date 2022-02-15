pragma solidity ^0.8.11;

import "./ERC721Mintable.sol";
import "./ZokratesSquareVerifier.sol";


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721MintableComplete {

	// TODO define a mapping to store unique solutions submitted
	mapping(bytes32 => address) public _uniqueSolutions;

	// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
	Verifier _verifier;

	// TODO Create an event to emit when a solution is added
	event SolutionAdded(bytes32 proofKey, address to);


	constructor (string memory name, string memory symbol, string memory baseTokenURI, address verifierAddress)
	ERC721MintableComplete(name,symbol,baseTokenURI)
	{
		_verifier = Verifier(verifierAddress);
	}

	function getProofKey(Verifier.Proof memory proof, uint[2] memory input) public pure returns (bytes32){
		return keccak256(abi.encodePacked(proof.a.X,proof.a.Y, proof.b.X,proof.b.Y, proof.c.X,proof.c.Y, input[0], input[1]));
	}

	// TODO Create a function to add the solutions to the array and emit the event
	function addSolution(Verifier.Proof memory proof, uint[2] memory input, address to) internal {
		bytes32 proofKey = getProofKey(proof, input);
		require(_uniqueSolutions[proofKey] == address(0), "Solution already used");
		require(_verifier.verifyTx(proof, input) == true, "Solution couldn't be verified");
		_uniqueSolutions[proofKey] = to;
		emit SolutionAdded(proofKey,to);
	}

	// TODO Create a function to mint new NFT only after the solution has been verified
	//  - make sure the solution is unique (has not been used before)
	//  - make sure you handle metadata as well as tokenSuplly
	function mint(address to, uint256 tokenId, string memory tokenURI, Verifier.Proof memory proof, uint[2] memory input) 
	onlyOwner 
	whenNotPaused 
	public 
	returns(bool){
		addSolution(proof,input,to);
		return super._mint(to, tokenId, tokenURI);
	}

}








