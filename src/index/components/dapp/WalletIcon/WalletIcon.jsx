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
  const { tokens } = context;
  const defaultSymbol = _.isObject(currency) ? '' : currency;
  const symbol = _.get(currency, 'symbol', defaultSymbol).toUpperCase();

  React.useEffect(() => {
    try {
      let logo = _.isObject(currency) && currency.logoURI;
      const token = !logo && tokens.find((t) => t.symbol === symbol);
      setIcon(logo ? logo : token.logoURI);
    } catch (error) {
      console.log(`${symbol} icon is not finded`);
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
      {icon ? (
        <img src={icon} onError={() => setIcon(null)} />
      ) : (
        <span className="WalletIcon__empty" />
      )}
    </span>
  );
}

WalletIcon.propTypes = {
  currency: PropTypes.any,
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
