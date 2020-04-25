const Web3 = require('web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonic = 'retire inject tray journey witness tomato reveal elegant much drastic outdoor impact spread guitar letter';

module.exports = {
  networks: {
    development: {
      host: process.env.TRUFFLE_DEVELOP_HOST || 'localhost',
      port: process.env.TRUFFLE_DEVELOP_PORT || 8545,
      network_id: '*' // Match any network id
    },
    kovan: {
      host: 'kovan.infura.io/v3/b1a05a95fe9f4babb3bb4a670552eb4f',
      port: 443,
      network_id: '42',
      provider: new HDWalletProvider(mnemonic, "https://kovan.infura.io/v3/b1a05a95fe9f4babb3bb4a670552eb4f"),
      gas: 9990236
    },
    coverage: {
      host: 'truffle-coverage',
      network_id: '*', // eslint-disable-line camelcase
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01
    },
    ganache: {
      host: 'localhost',
      port: 7545,
      network_id: '*' // Match any network id
    }
  },
  compilers: {
    solc: {
      version: '^0.5.9',
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
