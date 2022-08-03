import React from 'react';

// Components
import SVG from 'utils/svg-wrap';
import WalletsListItem from '../../../WalletsList/components/WalletsListItem/WalletsListItem';
import { NumberFormat } from 'src/ui';
import WalletsList from '../../../WalletsList/WalletsList';
import RateIndicator from 'src/ui/components/RateIndicator/RateIndicator';

// Utils
import { Web3Context } from 'src/services/web3Provider';
import networks from 'src/index/constants/networks';
import web3Backend from 'services/web3-backend';

function NarfexRate() {
  const { getSomeTimePricesPairMoralis } = React.useContext(Web3Context);
  const [currentPrice, setCurrentPrice] = React.useState(0);
  const [priceDifference, setPriceDifference] = React.useState(null);

  const getYesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    return date;
  };

  const getNarfexRate = async () => {
    try {
      const { narfexToken } = networks[56];

      // Set price and difference
      getSomeTimePricesPairMoralis(narfexToken, getYesterday()).then((data) => {
        setCurrentPrice(data.priceTo);
        setPriceDifference(data.difference);
      });
    } catch {
      web3Backend.getTokenRate('nrfx').then((data) => {
        setCurrentPrice(data.price);
        setPriceDifference(null);
      });
    }
  };

  React.useEffect(() => {
    getNarfexRate();

    // Set interval for auto update price.
    const narfexRateInterval = setInterval(() => getNarfexRate(), 10000);

    return () => clearInterval(narfexRateInterval);
  }, []);

  return (
    <WalletsList>
      <WalletsListItem
        icon={<SVG src={require('src/asset/icons/wallets/nrfx.svg')} />}
        startTexts={['Narfex', 'NRFX']}
        onClick={getNarfexRate}
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
