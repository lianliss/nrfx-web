import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Components
import SVG from 'utils/svg-wrap';
import { Web3Context } from 'services/web3Provider';
import KNOWN_FIATS from '../../../constants/knownFiats';

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
      const findToken = (t) => t.symbol === symbol;
      const token =
        (!logo && tokens.find(findToken)) || KNOWN_FIATS.find(findToken);
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
        <span className="WalletIcon__empty">
          <SVG src={require('src/asset/icons/cabinet/question-icon.svg')} />
        </span>
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
