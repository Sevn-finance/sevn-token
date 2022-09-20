const Sevn = artifacts.require("Sevn");

module.exports = async function (deployer) {

    await deployer.deploy(Sevn, 'Sevn', "SEVN");
    let instanceSevn = await Sevn.deployed();
  };