import React from 'react';

// Components
import SVG from 'utils/svg-wrap';
import WalletsListItem from '../../../WalletsList/components/WalletsListItem/WalletsListItem';
import { NumberFormat } from 'src/ui';
import WalletsList from '../../../WalletsList/WalletsList';
import RateIndicator from 'src/ui/components/RateIndicator/RateIndicator';

// Utils
import { useSelector } from 'react-redux';

function NarfexRate() {
  const currentPrice = useSelector((state) => state.web3.rates.nrfx);
  const [priceDifference, setPriceDifference] = React.useState(null);

  const getNarfexRate = () => {
    setPriceDifference(null);
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
          <br />,
          <>
            <RateIndicator
              number={priceDifference}
              type={RateIndicator.getType(priceDifference)}
              procent
            />
            $
            <NumberFormat number={currentPrice ? currentPrice.toFixed(2) : 0} />
          </>,
        ]}
        border
      />
    </WalletsList>
  );
}

export default NarfexRate;
