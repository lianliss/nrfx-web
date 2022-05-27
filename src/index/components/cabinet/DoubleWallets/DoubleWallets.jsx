import React from 'react';
import PropTypes from 'prop-types';

// Components
import SVG from 'utils/svg-wrap';

// Styles
import './DoubleWallets.less';
import WalletIcon from '../WalletIcon/WalletIcon';

function DoubleWallets({ first, second }) {
  return (
    <div className="DoubleWallets">
      <div className="DoubleWallets__icons">
        <WalletIcon currency={first} size={23} />
        <WalletIcon currency={second} size={23} />
      </div>
      <span>
        {first && first.toUpperCase()}
        {first && second && '-'}
        {second && second.toUpperCase()}
      </span>
    </div>
  );
}

DoubleWallets.propTypes = {
  first: PropTypes.string,
  second: PropTypes.string,
};

DoubleWallets.defaultProps = {
  first: '',
  second: '',
};

export default DoubleWallets;
