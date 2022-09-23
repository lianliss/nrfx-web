import React from 'react';
import PropTypes from 'prop-types';
import { useRoute } from 'react-router5';

// Components
import CabinetScrollBlock from '../../../../../CabinetScrollBlock/CabinetScrollBlock';
import WalletsListItem from '../../../../../WalletsList/components/WalletsListItem/WalletsListItem';
import WalletsList from '../../../../../WalletsList/WalletsList';
import CabinetBlock from '../../../../../CabinetBlock/CabinetBlock';
import WalletIcon from '../../../../../WalletIcon/WalletIcon';
import SVG from 'utils/svg-wrap';
import { RateIndicator, NumberFormat } from 'src/ui';

// Utils
import wei from 'utils/wei';
import * as PAGES from 'src/index/constants/pages';

function BalancesBlock({ balances, type, title, adaptive }) {
  const { router } = useRoute();

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
            const priceDifference = null;
            const icon = balanceItem.logoURI;

            return (
              <WalletsListItem
                icon={<WalletImage icon={icon} />}
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
                    currency: currency.toUpperCase(),
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

const WalletImage = ({ icon }) => {
  const [isError, setIsError] = React.useState(false);

  return isError ? (
    <WalletIcon currency="" size={39} />
  ) : (
    <img src={icon} onError={() => setIsError(true)} />
  );
};

export default React.memo(BalancesBlock);
