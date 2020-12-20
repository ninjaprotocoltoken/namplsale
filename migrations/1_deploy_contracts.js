const NamplCrowdSale = artifacts.require("NamplCrowdSale");

module.exports = function (deployer) {
  deployer.deploy(NamplCrowdSale);
};
