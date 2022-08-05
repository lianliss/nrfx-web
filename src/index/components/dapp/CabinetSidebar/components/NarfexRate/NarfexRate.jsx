import React from 'react';

// Components
import SVG from 'utils/svg-wrap';
import WalletsListItem from '../../../WalletsList/components/WalletsListItem/WalletsListItem';
import { NumberFormat } from 'src/ui';
import WalletsList from '../../../WalletsList/WalletsList';
import RateIndicator from 'src/ui/components/RateIndicator/RateIndicator';

// Utils
import networks from 'src/index/constants/networks';
import web3Backend from 'services/web3-backend';
import { simpleTokenPrice } from 'src/services/coingeckoApi';

function NarfexRate() {
  const [currentPrice, setCurrentPrice] = React.useState(0);
  const [priceDifference, setPriceDifference] = React.useState(null);

  const getNarfexRate = () => {
    const { narfexToken } = networks[56];

    simpleTokenPrice(narfexToken, true)
      .then((data) => {
        setCurrentPrice(data.usd);
        setPriceDifference(Number(data.usd_24h_change.toFixed(2)));
      })
      .catch(() => {
        web3Backend.getTokenRate('nrfx').then((data) => {
          setCurrentPrice(data.price);
          setPriceDifference(null);
        });
      });
  };

  React.useEffect(() => {
    getNarfexRate();

    // Set interval for auto update price.
    const narfexRateInterval = setInterval(() => getNarfexRate(), 60000);

    return () => clearInterval(narfexRateInterval);
  }, []);

  return (
    <WalletsList>
      <WalletsListItem
        icon={<SVG src={require('src/asset/icons/wallets/nrfx.svg')} />}
        startTexts={['Narfex', 'NRFX']}
        endTexts={[
          <br />,
          <>
            <RateIndicator
              number={priceDifference}
              type={RateIndicator.getType(priceDifference)}
              procent
            />
            $<NumberFormat number={currentPrice.toFixed(2)} />
          </>,
        ]}
        border
      />
    </WalletsList>
  );
}

export default NarfexRate;
