const Sevn = artifacts.require("Sevn");

module.exports = async function (deployer) {

    await deployer.deploy(Sevn, 'Sevn-TEST', "SEVN-T");
    let instanceSevn = await Sevn.deployed();
  };