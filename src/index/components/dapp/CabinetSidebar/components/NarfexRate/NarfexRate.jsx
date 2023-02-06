import React from 'react';

// Components
import SVG from 'utils/svg-wrap';
import WalletsListItem from '../../../WalletsList/components/WalletsListItem/WalletsListItem';
import { NumberFormat } from 'src/ui';
import WalletsList from '../../../WalletsList/WalletsList';
import RateIndicator from 'src/ui/components/RateIndicator/RateIndicator';

// Utils
import { simpleTokenPrice } from 'src/services/coingeckoApi';
import { Web3Context } from 'src/services/web3Provider';
import { TOKENS } from 'src/services/multichain/initialTokens';

function NarfexRate() {
  const { network, getTokenContract } = React.useContext(Web3Context);
  const [currentPrice, setCurrentPrice] = React.useState(0);
  const [priceDifference, setPriceDifference] = React.useState(null);

  const getNarfexRate = () => {
    setPriceDifference(null);
    setCurrentPrice(0);
    const narfexAddress = network.contractAddresses.narfexToken;

    simpleTokenPrice(narfexAddress, true).then((r) => {
      const resultChange = r.usd_24h_change.toFixed(2);

      setPriceDifference(Number(resultChange));
    });

    fetchRate().then((rate) => setCurrentPrice(rate));
  };

  const fetchRate = async () => {
    const data = await getTokenContract(
      TOKENS[network.chainId].nrfx
    ).getOutAmount(TOKENS[network.chainId].usdc, 1);

    return _.get(data, 'outAmount', 0);
  };

  React.useEffect(() => {
    getNarfexRate();
  }, [network.chainId]);

  return (
    <WalletsList>
      <WalletsListItem
        icon={<SVG src={require('src/asset/icons/wallets/nrfx.svg')} />}
        startTexts={['Narfex', 'NRFX']}
        endTexts={[
          <span className="NarfexRate__large">
            $
            <NumberFormat number={currentPrice || 0} />
          </span>,
          <RateIndicator
            number={priceDifference}
            type={RateIndicator.getType(priceDifference)}
            procent
          />,
        ]}
        border
      />
    </WalletsList>
  );
}

export default NarfexRate;
