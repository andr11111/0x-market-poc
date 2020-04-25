const { SwapQuoter } = require('@0x/asset-swapper');
const { Web3Wrapper } = require('@0x/web3-wrapper');

const apiUrl = 'http://3.88.118.79/sra/';
const makerAssetData = '0x6b175474e89094c44da98b954eedeac495271d0f';
const takerAssetData = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

const quoter = SwapQuoter.getSwapQuoterForStandardRelayerAPIUrl(
  web3.provider,
  apiUrl
);

module.exports = async () => {
  // Get a quote to buy three units of DAI
  const quote = await quoter.getMarketBuySwapQuoteForAssetDataAsync(
    daiTokenAddress,
    wethTokenAddress,
    web3.utils.fromWei(3, 'ether'),
  );

  console.log('quote', quote);
}
