import React from 'react';

// Components
import SVG from 'utils/svg-wrap';
import WalletsListItem from '../../../WalletsList/components/WalletsListItem/WalletsListItem';
import { NumberFormat } from 'src/ui';
import WalletsList from '../../../WalletsList/WalletsList';
import RateIndicator from 'src/ui/components/RateIndicator/RateIndicator';

// Utils
import { useSelector } from 'react-redux';
import { simpleTokenPrice } from 'src/services/coingeckoApi';
import networks from 'src/index/constants/networks';

function NarfexRate() {
  const currentPrice = useSelector((state) => state.web3.rates.nrfx);
  const [priceDifference, setPriceDifference] = React.useState(null);

  const getNarfexRate = () => {
    setPriceDifference(null);
    const narfexAddress = networks[56]['narfexToken'];

    simpleTokenPrice(narfexAddress, true).then((r) => {
      const resultChange = r.usd_24h_change.toFixed(2);

      setPriceDifference(Number(resultChange));
    });
  };

  React.useEffect(() => {
    getNarfexRate();
  }, []);

  return (
    <WalletsList>
      <WalletsListItem
        icon={<SVG src={require('src/asset/icons/wallets/nrfx.svg')} />}
        startTexts={['Narfex', 'NRFX']}
        endTexts={[
          <span className="NarfexRate__large">
            $
            <NumberFormat number={currentPrice ? currentPrice.toFixed(2) : 0} />
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
