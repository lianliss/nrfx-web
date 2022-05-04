import React from 'react';
import PropTypes from 'prop-types';

import SVG from 'utils/svg-wrap';
import { Button, Search } from 'src/ui';
import { getLang } from 'utils';
import { openModal } from 'src/actions';
import currencies from 'src/currencies';

import Block from '../Block/Block';
import WalletsList from 'src/index/components/cabinet/WalletsList/WalletsList';
import BalancesManage from './components/BalancesManage/BalancesManage';
import WalletsListItem from 'src/index/components/cabinet/WalletsList/components/WalletsListItem/WalletsListItem';
import './Balance.less';
import { connect } from 'react-redux';

const Balance = React.memo(({ balances, setActiveBalance }) => {
  // Manage page is open.
  const [isManage, setIsManage] = React.useState(false);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const title = isManage ? getLang('Manage') : getLang('global_balance');

  React.useEffect(() => {
    // If balances.length is false, then setIsEmpty(true).
    setIsEmpty(!balances.filter((balance) => balance.amount).length);
  }, []);

  const handleOpenBalances = () => {
    openModal('manage_balance');
  };

  const EmptyMessage = () => {
    return (
      <div className="Balances__isEmpty">
        <p className="simple-text">{getLang('exchange_emptyBalance')}</p>
        <Button type="lightBlue" onClick={handleOpenBalances}>
          <SVG src={require('src/asset/120/wallet-v2.svg')} />
          {getLang('cabinet_manage')}
        </Button>
      </div>
    );
  };

  const ManageButton = () => (
    <Button
      className="Balances__headerButton"
      type="secondary"
      onClick={() => {
        setIsManage((prevState) => !prevState);
      }}
      disabled={isEmpty}
    >
      {isManage ? (
        <p>
          <SVG
            src={require('src/asset/icons/close.svg')}
            className="isManage"
          />
          Close
        </p>
      ) : (
        <p>
          <SVG src={require('../../assets/settings.svg')} />
          {getLang('Manage')}
        </p>
      )}
    </Button>
  );

  return (
    <Block
      skipCollapse
      className="Balances"
      title={title}
      controls={<ManageButton isManage={isManage} setIsManage={setIsManage} />}
    >
      {isManage ? (
        <BalancesManage
          balances={balances}
          balancesHandler={setActiveBalance}
          emptyMessage={isEmpty ? <EmptyMessage /> : null}
        />
      ) : (
        <>
          <Search placeholder="Search" lite simple icon disabled={isEmpty} />
          <div className="Balances__content">
            <WalletsList type="default" items={balances}>
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
                    endTexts={['$' + item.price, item.amount]}
                    key={item.id}
                  />
                );
              })}
            </WalletsList>
            {isEmpty && <EmptyMessage />}
          </div>
        </>
      )}
    </Block>
  );
});

Balance.propTypes = {
  balances: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.string,
      amount: PropTypes.number,
      price: PropTypes.number,
      id: PropTypes.number,
      selected: PropTypes.bool,
    })
  ),
  setActiveBalance: PropTypes.func,
};

Balance.defaultProps = {
  balances: [],
  setActiveBalance: () => {},
};

export default connect((state) => ({
  balances: state.exchange.balances,
}))(Balance);
