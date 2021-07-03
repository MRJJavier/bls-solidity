const wrapProvider = require('arb-ethers-web3-bridge').wrapProvider
const HDWalletProvider = require('@truffle/hdwallet-provider')

const mnemonic =
  'jar deny prosper gasp flush glass core corn alarm treat leg smart'
const arbProviderUrl = 'http://localhost:8547/'


module.exports = {
  networks: {
    local: {
      host: '127.0.0.1',
      port: 8545, // default: 7545
      network_id: '*', // Match any network id
      gasPrice: 0,
    },
    arbitrum: {
      provider: function () {
        return wrapProvider(
          new HDWalletProvider(mnemonic, 'https://rinkeby.arbitrum.io/rpc')
        )
      },
      network_id: '*', // Match any network id
      gasPrice: 0,
    },
    remote_arbitrum: {
      provider: function () {
        return wrapProvider(
          new HDWalletProvider(mnemonic, 'https://kovan5.arbitrum.io/rpc')
        )
      },
      network_id: '*', // Match any network id
      gasPrice: 0,
    },
  },
  compilers: {
    solc: {
      version: '0.6.8', // Fetch exact version from solc-bin (default: truffle's version)
      docker: false, // Use "0.5.3" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
}
