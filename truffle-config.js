const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonic = process.env.DAPP_DEPLOY_KEY;
const ETHERSCAN_KEY = process.env.DAPP_EHER_SCAN_KEY;
module.exports = {

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none) 8545
     network_id: "*",       // Any network (default: none)
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/39943029b116455f9250ee54da86df71`),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    goerli: {
      provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/39943029b116455f9250ee54da86df71` ),
      network_id: 5,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },  
    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/39943029b116455f9250ee54da86df71`),
      network_id: 1,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },           
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    // ropsten: {
    // provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR-PROJECT-ID`),
    // network_id: 3,       // Ropsten's id
    // gas: 5500000,        // Ropsten has a lower block limit than mainnet
    // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },
    // Useful for private networks
    // private: {
    // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.7.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 200
       }
      //  ,
      //  evmVersion: "byzantium"
      }
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: ETHERSCAN_KEY
  }
};
