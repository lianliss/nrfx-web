import React from 'react';
import PropTypes from 'prop-types';
import { useRoute } from 'react-router5';

// Components
import CabinetScrollBlock from '../../../../../CabinetScrollBlock/CabinetScrollBlock';
import WalletsListItem from '../../../../../WalletsList/components/WalletsListItem/WalletsListItem';
import WalletsList from '../../../../../WalletsList/WalletsList';
import CabinetBlock from '../../../../../CabinetBlock/CabinetBlock';
import SVG from 'utils/svg-wrap';
import { RateIndicator, NumberFormat } from 'src/ui';

// Utils
import wei from 'utils/wei';
import * as PAGES from 'src/index/constants/pages';
import { simpleTokenPrice } from 'src/services/coingeckoApi';

function BalancesBlock({ balances, type, title, adaptive }) {
  const { router } = useRoute();
  const [priceDifferences, setPriceDifferences] = React.useState({});

  React.useEffect(() => {
    balances.forEach((token) => {
      if (!token.address) return;
      // The price difference exists in object.
      if (priceDifferences[token.address.toLowerCase()]) return;

      simpleTokenPrice(token.address, true).then((data) => {
        setPriceDifferences((state) => ({
          ...state,
          [data.address]: Number(data.usd_24h_change.toFixed(2)),
        }));
      });
    });
  }, [balances]);

  return (
    <CabinetBlock className="wallets-list">
      {!adaptive && (
        <div className="WalletsExists__items_header">
          <span>{title}</span>
          <div className="CabinetScrollBlock__headerTool"></div>
        </div>
      )}
      <CabinetScrollBlock>
        <WalletsList type="default">
          {balances.map((balanceItem, key) => {
            const currency = balanceItem.symbol.toLowerCase();

            // Data needs filter.
            const balanceAddress = balanceItem.address
              ? balanceItem.address.toLowerCase()
              : balanceItem.address;
            const priceDifference =
              balanceAddress && priceDifferences[balanceAddress]
                ? priceDifferences[balanceAddress]
                : null;

            let icon = balanceItem.logoURI;

            if (type === 'fiats') {
              // Set icon
              try {
                icon =
                  require(`src/asset/icons/wallets/${currency}.svg`).default;
              } catch {
                console.log('Icon is not defined');
              }
            }

            return (
              <WalletsListItem
                icon={<img src={icon} />}
                startTexts={[
                  balanceItem.name,
                  <span className="CabinetWallets__tokens-content">
                    <NumberFormat number={balanceItem.price} currency="usd" />
                    <RateIndicator
                      type={RateIndicator.getType(priceDifference)}
                      number={priceDifference}
                      procent
                    />
                  </span>,
                ]}
                controls={
                  <TokenItemControls
                    amount={
                      type === 'tokens'
                        ? wei.from(balanceItem.balance).toFixed(2)
                        : balanceItem.balance
                    }
                    currency={currency}
                    price={balanceItem.price}
                  />
                }
                key={key}
                type="reverse"
                onClick={() => {
                  router.navigate(PAGES.DAPP_CURRENCY, {
                    currency,
                  });
                }}
              />
            );
          })}
        </WalletsList>
      </CabinetScrollBlock>
      {adaptive && <div className="WalletsExists__items_footer"></div>}
    </CabinetBlock>
  );
}

BalancesBlock.propTypes = {
  balances: PropTypes.array,
  type: PropTypes.oneOf('tokens', 'fiats'),
  title: PropTypes.string,
  adaptive: PropTypes.bool,
};

BalancesBlock.defaultProps = {
  balances: [],
  type: 'tokens',
  title: 'tokens',
  adaptive: false,
};

const TokenItemControls = ({ price, amount, currency }) => (
  <div className="CabinetWallets__tokens-controls">
    <div>
      <p className="WalletsListItem__text-large">
        {amount} {currency.toUpperCase()}
      </p>
      <p className="WalletsListItem__text-medium">
        <NumberFormat number={price * amount} currency="usd" />
      </p>
    </div>
    <div>
      <SVG src={require('src/asset/icons/list-arrow-large.svg')} />
    </div>
  </div>
);

export default React.memo(BalancesBlock);
