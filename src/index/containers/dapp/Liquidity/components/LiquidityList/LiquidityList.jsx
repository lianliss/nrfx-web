import React from 'react';
import PropTypes from 'prop-types';

// Components
import DoubleWallets from 'src/index/components/dapp/DoubleWallets/DoubleWallets';
import WalletIcon from 'src/index/components/dapp/WalletIcon/WalletIcon';
import { DropdownElement, Button } from 'src/ui';
import SVG from 'utils/svg-wrap';
import _ from 'lodash';
import { Web3Context } from 'services/web3Provider';

// Utils
import { classNames as cn, getLang } from 'src/utils';
import wei from 'utils/wei';
import getFinePrice from 'utils/get-fine-price';

// Styles
import './LiquidityList.less';

let updateBalanceInterval;
const UPDATE_BALANCE_TIMEOUT = 5000;

// Main
function LiquidityList({ onAddClick, onRemoveClick, poolsList, emptyText }) {

  const context = React.useContext(Web3Context);
  const {
    getReserves, getTokenContract, accountAddress, chainId,
  } = context;
  const [pools, setPools] = React.useState([]);
  const [balances, setBalances] = React.useState({});

  const updateBalance = () => {
    Promise.allSettled(poolsList.map(address => getReserves(address))).then(data => {
      setPools(data.map(d => _.get(d, 'value[2]')).filter(d => d));
    });
    if (accountAddress) {
      Promise.allSettled(poolsList.map(address => getTokenContract({
        address,
        decimals: 18,
      }, true).getBalance()))
        .then(data => {
          const balances = {};
          data.map((b, i) => {
            balances[poolsList[i]] = b.value;
          });
          setBalances(balances);
        });
    }
  };

  React.useEffect(() => {
    updateBalance();
    clearInterval(updateBalanceInterval);
    setInterval(updateBalance, UPDATE_BALANCE_TIMEOUT);
    return () => {
      clearInterval(updateBalanceInterval);
    }
  }, [poolsList, accountAddress, chainId]);

  const ItemContent = ({ item }) => {

    const symbol0 = _.get(item, 'token0.symbol', '');
    const symbol1 = _.get(item, 'token1.symbol', '');
    const decimals0 = _.get(item, 'token0.decimals', 18);
    const decimals1 = _.get(item, 'token1.decimals', 18);
    const reserve0 = wei.from(item[symbol0] || '0', decimals0);
    const reserve1 = wei.from(item[symbol1] || '0', decimals1);
    const totalSupply = wei.from(_.get(item, 'totalSupply', '0'));
    const balance = balances[item.address];
    const share = totalSupply ? balance / totalSupply : 0;
    const userAmount0 = reserve0 * share;
    const userAmount1 = reserve1 * share;

    return (
      <div className="ItemContent">
        <div className="ItemContent__body">
          <div>
            <span>{getLang('dapp_liquidity_common_pool_balance')}</span>
            <span>
              <span>{getFinePrice(reserve0)}</span>
              <WalletIcon currency={item.token0} size={16} />
              &nbsp;+&nbsp;
              <span>{getFinePrice(reserve1)}</span>
              <WalletIcon currency={item.token1} size={16} />
            </span>
          </div>
          {!!balance && <>
          <div>
            <span>{getLang('dapp_liquidity_you_pooled')}</span>
            <span>
              <span>{getFinePrice(userAmount0)}</span>
              <WalletIcon currency={item.token0} size={16} />
              &nbsp;+&nbsp;
              <span>{getFinePrice(userAmount1)}</span>
              <WalletIcon currency={item.token1} size={16} />
            </span>
          </div>
          <div>
            <span>{getLang('dapp_liquidity_your_lp_tokens')}:</span>
            <span>{getFinePrice(balance)}</span>
          </div>
          <div>
            <span>{getLang('dapp_liquidity_your_share')}:</span>
            <span>{getFinePrice(share * 100)}%</span>
          </div>
          </>}
        </div>
        <div className="ItemContent__footer">
          <Button type="lightBlue" size="extra_large" onClick={() => onAddClick(item.address)}>
            {getLang('dapp_global_add')}
          </Button>
          <Button type="dark" disabled={!balance}
                  size="extra_large" onClick={() => onRemoveClick(item.address)}>
            {getLang('dapp_global_remove')}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <ul className={cn('LiquidityList', { empty: !pools.length })}>
      {pools.length ? (
        pools.map((item, index) => (
          <li key={index} className="LiquidityList__item">
            <DropdownElement dropElement={<ItemContent item={item} />}>
              <div className="LiquidityList__item__container">
                <DoubleWallets
                  first={item.token0}
                  second={item.token1}
                  pair={item}
                />
                <div className="dropdown-icon">
                  <SVG
                    src={require('src/asset/icons/cabinet/select-arrow.svg')}
                  />
                </div>
              </div>
            </DropdownElement>
          </li>
        ))
      ) : (
        <li>{getLang(emptyText)}</li>
      )}
    </ul>
  );
}

LiquidityList.propTypes = {
  emptyText: PropTypes.string,
  onAddClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
};

LiquidityList.defaultProps = {
  emptyText: 'dapp_liquidity_list_no_liquidity',
  onAddClick: () => {},
  onRemoveClick: () => {},
};

export default LiquidityList;
