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
  const { dateToBlockMoralis, getTokenPriceMoralis } =
    React.useContext(Web3Context);
  const [currentPrice, setCurrentPrice] = React.useState(0);
  const [priceDifference, setPriceDifference] = React.useState(null);

  const getYesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    return date;
  };

  const getPricesDifference = (currentPrice, prevPrice) => {
    const result = currentPrice / (prevPrice / 100) - 100;

    return {
      number: Math.abs(result.toFixed(2)),
      isPositive: result >= 0,
    };
  };

  React.useEffect(() => {
    (async () => {
      try {
        const { narfexToken } = networks[56];
        const yesterday = getYesterday();
        const block = await dateToBlockMoralis(yesterday);

        // Get prices
        const todayPrice = await getTokenPriceMoralis(narfexToken);
        const yesterdayPrice = await getTokenPriceMoralis(narfexToken, block);

        // set price and difference
        setCurrentPrice(todayPrice);
        setPriceDifference(getPricesDifference(todayPrice, yesterdayPrice));
      } catch {
        web3Backend.getTokenRate('nrfx').then((data) => {
          setCurrentPrice(data.price);
        });
      }
    })();
  }, []);

  return (
    <WalletsList>
      <WalletsListItem
        icon={<SVG src={require('src/asset/icons/wallets/nrfx.svg')} />}
        startTexts={['Narfex', 'NRFX']}
        endTexts={[
          <br />,
          <>
            {priceDifference ? (
              <RateIndicator
                number={priceDifference.number}
                type={priceDifference.isPositive ? 'up' : 'down'}
                procent
              />
            ) : (
              <RateIndicator type="noActive" />
            )}
            $<NumberFormat number={currentPrice.toFixed(2)} />
          </>,
        ]}
        border
      />
    </WalletsList>
  );
}

export default NarfexRate;

