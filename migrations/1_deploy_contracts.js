const NamplCrowdSale = artifacts.require("NamplCrowdSale");
const Wallet = require("@truffle/hdwallet-provider");
const Web3 =  require("web3");
const FS = require("fs");
const DEPLOY_CONFIG_FILE = process.env.DEPLOY_CONFIG;

module.exports = function (deployer) {
  deployer.then(async ()=> {
    // deployer.deploy(NamplCrowdSale);
    let configContent = FS.readFileSync(DEPLOY_CONFIG_FILE,{flag:'r'});
    let config  = JSON.parse(configContent);

    console.log("config "+ config);

    let configEnvIdx = process.argv.indexOf("--env");
    let configEnv = process.argv[configEnvIdx + 1];
    
    console.log("config deploy env:"+configEnv);

    await deployer.deploy(NamplCrowdSale);

    let sale = await NamplCrowdSale.deployed();

    var founderWallet = config[configEnv].founderWallet;

    console.log("founder wallet:"+founderWallet);
    await sale.initialize(founderWallet);

    founderWallet = await sale.getFounderWallet();
    
    console.log("founder wallet of contract:"+founderWallet);

  })
};
