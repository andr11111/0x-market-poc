const AssetDataUtils = artifacts.require('./honeylemon/AssetDataUtils.sol');

module.exports = async function(deployer) {
  await deployer.deploy(AssetDataUtils);
};
