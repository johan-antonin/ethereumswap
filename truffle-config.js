require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    amassetnet: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "4224"
    },
    rinkeby: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "4"
    },
    mainnet: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "1"
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
