const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const mnemonicPhrase = "test test test test test test test test test test test junk";

let Provider = new HDWalletProvider({
    mnemonic: {
      phrase: mnemonicPhrase
    },
    providerOrUrl: 'http://127.0.0.1:8545'
  });
  
module.exports = {
    contracts_build_directory: './build-ovm',
    networks: {
      optimistic_ethereum: {
        provider: Provider,
        network_id: 420,
        host: '127.0.0.1',
        port: 8545,
        gasPrice: 0,
      },
      coverage: {
        host: "localhost",
        network_id: "*",
        port: 8555,
        gas: 0xffffffffffffffffffffff,
        gasPrice: 0x01,
      },
    },
    mocha: {
      reporter: "eth-gas-reporter",
      reporterOptions: {
        currency: "USD",
        gasPrice: 20,
        excludeContracts: ["Migrations"],
        src: "benchmark",
      },
    },
    compilers: {
        solc: {
            // Add path to the optimism solc fork
            version: "node_modules/@eth-optimism/solc",
            settings: {
              optimizer: {
                enabled: true,
                runs: 1
              },
      },
    },
  },
}  