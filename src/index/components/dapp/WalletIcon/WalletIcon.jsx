import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Components
//import SVG from 'utils/svg-wrap';
import { Web3Context } from 'services/web3Provider';

// Styles
import './WalletIcon.less';

// Find icon, and if icon is not finded display
// basic circle.
function WalletIcon({ currency, size, marginLeft, marginRight, className }) {
  const [icon, setIcon] = React.useState(null);
  const context = React.useContext(Web3Context);
  const {tokens} = context;
  const symbol = _.get(currency, 'symbol', currency).toUpperCase();

  React.useEffect(() => {
    try {
      const token = tokens.find(t => t.symbol === symbol);
      setIcon(token.logoURI);
    } catch (error) {
      console.log(`${currency} icon is not finded`);
    }
  }, [currency]);

  return (
    <span
      className={`WalletIcon ${className}`}
      style={{
        width: size,
        height: size,
        marginLeft: marginLeft ? marginLeft : null,
        marginRight: marginRight ? marginRight : null,
      }}
    >
      {icon ? <img src={icon} /> : <span className="WalletIcon__empty" />}
    </span>
  );
}

WalletIcon.propTypes = {
  currency: PropTypes.string,
  size: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  className: PropTypes.string,
};

WalletIcon.defaultProps = {
  currency: '',
  size: 19,
  className: '',
};

export default WalletIcon;
