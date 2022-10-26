import React from 'react';

import SVG from 'utils/svg-wrap';
import { getLang } from 'src/utils';
import { NumberFormat } from 'src/ui';
import { Web3Context } from 'src/services/web3Provider';
import { wei } from 'src/utils';

import './WalletsTotalBalance.less';

function WalletsTotalBalance() {
  const { balances } = React.useContext(Web3Context);
  const { tokens, fiats } = balances;
  const [totalBalance, setTotalBalance] = React.useState(0);

  const getTotalBalance = () => {
    const fiatsTotalBalance = fiats.reduce((value, fiat) => {
      const currentValue = wei.from(fiat.balance) * fiat.price || 0;

      return value + currentValue;
    }, 0);
    const tokensTotalBalance = tokens.reduce((value, token) => {
      const currentValue = wei.from(token.balance) * token.price || 0;

      return value + currentValue;
    }, 0);

    setTotalBalance(fiatsTotalBalance + tokensTotalBalance);
  };

  React.useEffect(() => {
    getTotalBalance();
  }, [balances]);

  return (
    <div className="WalletsTotalBalance">
      <div className="WalletsTotalBalance__icon">
        <div className="WalletsTotalBalance__icon-bg" />
        <SVG src={require('src/asset/icons/cabinet/sidebar/wallet.svg')} />
      </div>
      <div className="WalletsTotalBalance__content">
        <span className="WalletsTotalBalance__text-medium">
          {getLang('dapp_wallet_page_total_balance')}
        </span>
        <div className="WalletsTotalBalance__row">
          <span className="WalletsTotalBalance__text-large">
            $ <NumberFormat number={totalBalance} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default WalletsTotalBalance;
