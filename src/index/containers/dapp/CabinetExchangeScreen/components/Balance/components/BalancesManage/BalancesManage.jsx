import React from 'react';
import PropTypes from 'prop-types';

import { Switch, SwitchTabs, Search } from 'src/ui';
import { getLang } from 'utils';
import SVG from 'utils/svg-wrap';
import WalletsListItem from 'src/index/components/cabinet/WalletsList/components/WalletsListItem/WalletsListItem';
import WalletsList from 'src/index/components/cabinet/WalletsList/WalletsList';
import currencies from 'src/currencies';

import './BalancesManage.less';

function BalancesManage({ balances, balancesHandler }) {
  const [currentPage, setCurrentPage] = React.useState('list'); // Selected on manage page

  const balanceChecked = (id) => {
    balancesHandler((state) => {
      const filteredResult = state.map((item) => {
        if (item.id === id) {
          item.selected = !item.selected;
        }

        return item;
      });

      return filteredResult;
    });
  };

  return (
    <div className="BalancesManage">
      <SwitchTabs
        selected={currentPage}
        onChange={setCurrentPage}
        tabs={[
          { value: 'list', label: getLang('exchange_balance_list_label') },
          { value: 'tokens', label: getLang('exchange_balance_tokens_label') },
        ]}
        type="light-blue"
      />
      {currentPage === 'list' && (
        <>
          <Search placeholder="Search" lite simple icon />
          <div className="Balances__content">
            <WalletsList type="checkbox">
              {balances.map((item) => {
                if (!item.currency) {
                  return;
                }

                const { name } = currencies[item.currency];
                let icon = '';

                try {
                  icon = require(`src/asset/icons/wallets/${item.currency}.svg`);
                } catch {
                  console.log('Icon is not defined');
                }

                return (
                  <WalletsListItem
                    icon={<SVG src={icon} />}
                    startTexts={[name, item.currency.toUpperCase()]}
                    controls={
                      <Switch
                        on={item.selected}
                        onChange={() => balanceChecked(item.id)}
                        type="light-blue"
                      />
                    }
                    key={item.id}
                  />
                );
              })}
            </WalletsList>
          </div>
        </>
      )}
      {currentPage === 'tokens' && (
        <>
          <Search placeholder="0x000" lite simple icon />
          <div className="Balances__content">
            <p className="simple-text">
              {getLang('exchange_balance_tokens_tip')}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

BalancesManage.propTypes = {
  balances: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.string,
      amount: PropTypes.number,
      price: PropTypes.number,
      id: PropTypes.number,
      selected: PropTypes.bool,
    })
  ),
  balancesHandler: PropTypes.func,
  emptyMessage: PropTypes.element,
};

BalancesManage.defaultProps = {
  balances: [],
  balancesHandler: () => {},
  emptyMessage: null,
};

export default BalancesManage;