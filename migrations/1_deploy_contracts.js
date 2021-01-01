const NamplCrowdSale = artifacts.require("NamplCrowdSale");
const TimeLock = artifacts.require("TimeLock");


module.exports = function (deployer) {
  deployer.then(async ()=> {
    // deployer.deploy(NamplCrowdSale);
    
    let config  = require(process.env.DEPLOY_CONFIG);

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

    await deployer.deploy(TimeLock);

  })
};
