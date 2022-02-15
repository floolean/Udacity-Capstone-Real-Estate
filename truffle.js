require('dotenv').config();
var HDWalletProvider = require("@truffle/hdwallet-provider");
var infuraKey = process.env['INFURAKEY'] || '';
var privateKey = process.env['PRIVATEKEY'] || '';
var useDocker = process.env['DOCKER'] || false;

console.warn("INFURA KEY PROVIDED:", (infuraKey != ''));
console.warn("PRIVATE KEY PROVIDED:", (privateKey != ''));

let config = {
  networks: {
    development: {
      network_id: '*',
      gas: 6721975,
			host: "localhost",
			port: 7545
    },
		test: {
      network_id: '*',
      gas: 6721975,
			host: "localhost",
			port: 7545
    }
  },
  compilers: {
    solc: {
      version: "0.8.11",
			docker: useDocker,
			settings: {
				optimizer: {
					enabled: true,
					runs: 10
				}
			}	
    }
  }
};	

if (privateKey && infuraKey) {
	config.networks['rinkeby'] =
	{
		provider: function() { 
			return new HDWalletProvider([privateKey], infuraKey);
		 },
		 network_id: 4
	};
}

module.exports = config;