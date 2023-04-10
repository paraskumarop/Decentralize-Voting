var MyContract = artifacts.require("Voting");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(MyContract);
};