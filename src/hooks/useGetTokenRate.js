import React from 'react';
import { TOKENS } from '../services/multichain/initialTokens';
import { BSC_MAINNET } from '../services/multichain/chains';
import { Web3Context } from '../services/web3Provider';

/**
 * Hook gives only known tokens rate.
 * @param {string} tokenSymbol - Token symbol, one of TOKENS
 * @returns {number} rate - Token rate
 */
const useGetTokenRate = (tokenSymbol = '', switchToChain) => {
  const { network, getTokenContract, web3, isConnected } =
    React.useContext(Web3Context);
  const [rate, setRate] = React.useState(0);

  const fetchRate = async () => {
    try {
      let hops;
      switch (network.chainId) {
        case BSC_MAINNET: hops = 1; break;
        default: hops = 0;
      }
      const data = await getTokenContract(
        TOKENS[network.chainId][tokenSymbol.toLocaleLowerCase()]
      ).getOutAmount(TOKENS[network.chainId].usdc, 1, hops);

      return _.get(data, 'outAmount', 0);
    } catch (error) {
      console.log('[fetchRate]', error);
      return 0;
    }
  };

  React.useEffect(() => {
    if (!web3 && switchToChain) {
      network.setChain(switchToChain);
    }
  }, []);

  React.useEffect(() => {
    if (!tokenSymbol) return;

    fetchRate().then((rate) => setRate(rate));
  }, [network.chainId, isConnected]);

  return rate;
};

export default useGetTokenRate;
