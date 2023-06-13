var MyContract = artifacts.require("Voting");

module.exports = function(deployer) {
  deployer.deploy(MyContract);
};