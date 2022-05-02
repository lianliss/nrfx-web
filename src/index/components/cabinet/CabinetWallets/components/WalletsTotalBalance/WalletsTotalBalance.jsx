import React from 'react';
import PropTypes from 'prop-types';

import SVG from 'utils/svg-wrap';
import largeTotalArrow from 'src/asset/icons/total-arrow-large.svg';
import { RateIndicator } from 'src/ui';
import './WalletsTotalBalance.less';

function WalletsTotalBalance({ amount, total, totalType }) {
  return (
    <div className="WalletsTotalBalance">
      <div className="WalletsTotalBalance__icon">
        <div className="WalletsTotalBalance__icon-bg" />
        <SVG
          src={require('src/asset/icons/cabinet/sidebar/wallet.svg')}
        />
      </div>
      <div className="WalletsTotalBalance__content">
        <div className="WalletsTotalBalance__col">
          <span className="WalletsTotalBalance__text-medium">
            total balance
          </span>
          <span className="WalletsTotalBalance__text-large">${amount}</span>
        </div>
        <div className="WalletsTotalBalance__col">
          <div>
            <RateIndicator
              number={total}
              procent
              type={totalType}
              icon={largeTotalArrow}
            />
            <SVG
              src={require('src/asset/icons/cabinet/large-arrow-bottom.svg')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

WalletsTotalBalance.propTypes = {
  amount: PropTypes.number,
  total: PropTypes.number,
  totalType: PropTypes.oneOf(['up', 'down']),
};

WalletsTotalBalance.defaultProps = {
  amount: 0,
  total: 0,
  totalType: 'up',
};

export default WalletsTotalBalance;
