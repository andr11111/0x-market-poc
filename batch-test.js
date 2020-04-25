const {
  RPCSubprovider,
  Web3ProviderEngine,
} = require('@0x/subproviders');

const { generatePseudoRandomSalt, Order, orderHashUtils, signatureUtils, SignedOrder, assetDataUtils, orderUtils } = require('@0x/order-utils');
const { ContractWrappers } = require('@0x/contract-wrappers');
const { Web3Wrapper } = require('@0x/web3-wrapper');
const { BigNumber } = require('@0x/utils');

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

module.exports = async function() {
  try {
    const provider = web3.currentProvider;

    // Then use the provider
    const chainId = 1337;
    const contractWrappers = new ContractWrappers(provider, { chainId });
    const web3Wrapper = new Web3Wrapper(provider);

    const token1 = { address: '0x1Ff4e2A3330F8a7Eb2de6Cc50f4569cC4fDC77d8' };
    const token2 = { address: '0x973E5AFDDE356C2ae5c061FDD056Fb7E2F919b11' };

    const addresses = await web3Wrapper.getAvailableAddressesAsync();
    const makerAddress = addresses[0];
    const takerAddress = addresses[1];

    const makerAssetData = await contractWrappers.devUtils.encodeERC20AssetData(token1.address).callAsync();
    const takerAssetData = await contractWrappers.devUtils.encodeERC20AssetData(token2.address).callAsync();
    const makerAssetAmount = new BigNumber(1);
    const takerAssetAmount = new BigNumber(1);
    const exchangeAddress = contractWrappers.exchange.address;

    const order1 = {
      makerAddress, // maker is the first address
      takerAddress: NULL_ADDRESS, // taker is open and can be filled by anyone
      makerAssetAmount, // The maker asset amount
      takerAssetAmount, // The taker asset amount
      expirationTimeSeconds: new BigNumber(Math.round(Date.now() / 1000) + 10 * 60), // Time when this order expires
      makerFee: new BigNumber(0), // 0 maker fees
      takerFee: new BigNumber(0), // 0 taker fees
      feeRecipientAddress: NULL_ADDRESS, // No fee recipient
      senderAddress: NULL_ADDRESS, // Sender address is open and can be submitted by anyone
      salt: generatePseudoRandomSalt(), // Random value to provide uniqueness
      makerAssetData,
      takerAssetData,
      exchangeAddress,
      makerFeeAssetData: '0x',
      takerFeeAssetData: '0x',
      chainId,
    };

    const order2 = {
      makerAddress, // maker is the first address
      takerAddress: NULL_ADDRESS, // taker is open and can be filled by anyone
      makerAssetAmount, // The maker asset amount
      takerAssetAmount, // The taker asset amount
      expirationTimeSeconds: new BigNumber(Math.round(Date.now() / 1000) + 10 * 60), // Time when this order expires
      makerFee: new BigNumber(0), // 0 maker fees
      takerFee: new BigNumber(0), // 0 taker fees
      feeRecipientAddress: NULL_ADDRESS, // No fee recipient
      senderAddress: NULL_ADDRESS, // Sender address is open and can be submitted by anyone
      salt: generatePseudoRandomSalt(), // Random value to provide uniqueness
      makerAssetData,
      takerAssetData,
      exchangeAddress,
      makerFeeAssetData: '0x',
      takerFeeAssetData: '0x',
      chainId,
    };

    const signedOrder1 = await signatureUtils.ecSignOrderAsync(provider, order1, makerAddress);
    const signedOrder2 = await signatureUtils.ecSignOrderAsync(provider, order2, makerAddress);

    const tx = await contractWrappers.exchange
      .marketBuyOrdersFillOrKill([signedOrder1, signedOrder2], new BigNumber(2), [signedOrder1.signature, signedOrder2.signature])
    console.log('getABIEncodedTransactionData', tx.getABIEncodedTransactionData());
  } catch(e) {
    console.log(e);
  }

  process.exit();
}