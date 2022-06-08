import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './DoubleWallets.less';
import WalletIcon from '../WalletIcon/WalletIcon';

function DoubleWallets({ first, second, separator, className }) {
  return (
    <div className={`DoubleWallets ${className}`}>
      <div className="DoubleWallets__icons">
        <WalletIcon currency={first} size={23} />
        <WalletIcon currency={second} size={23} />
      </div>
      <span>
        {first && first.toUpperCase()}
        {first && second && separator}
        {second && second.toUpperCase()}
      </span>
    </div>
  );
}

DoubleWallets.propTypes = {
  first: PropTypes.string,
  second: PropTypes.string,
  separator: PropTypes.string,
  className: PropTypes.string,
};

DoubleWallets.defaultProps = {
  first: '',
  second: '',
  separator: '-',
  className: '',
};

export default DoubleWallets;
