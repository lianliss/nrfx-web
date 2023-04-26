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
import useGetTokenRate from 'src/hooks/useGetTokenRate';

function NarfexRate() {
  const { network } = React.useContext(Web3Context);
  const price = useGetTokenRate('NRFX');
  const [priceDifference, setPriceDifference] = React.useState(null);

  const getNarfexRateDifference = () => {
    setPriceDifference(null);
    const narfexAddress = network.contractAddresses.narfexToken;

    simpleTokenPrice(narfexAddress, true).then((r) => {
      const resultChange = r.usd_24h_change.toFixed(2);

      setPriceDifference(Number(resultChange));
    });
  };

  React.useEffect(() => {
    getNarfexRateDifference();
  }, [network.chainId]);

  return (
    <WalletsList>
      <WalletsListItem
        icon={<SVG src={require('src/asset/icons/wallets/nrfx.svg')} />}
        startTexts={['Narfex', 'NRFX']}
        endTexts={[
          <span className="NarfexRate__large">
            $
            <NumberFormat number={price || 0} />
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
