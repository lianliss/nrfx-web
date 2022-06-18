import React from 'react';
import PropTypes from 'prop-types';

// Components
import SVG from 'utils/svg-wrap';

// Styles
import './WalletIcon.less';

// Find icon, and if icon is not finded display
// basic circle.
function WalletIcon({ currency, size, marginLeft, marginRight, className }) {
  const [icon, setIcon] = React.useState(null);

  React.useEffect(() => {
    try {
      setIcon(require(`src/asset/icons/wallets/${currency}.svg`));
    } catch {
      console.log(`${currency} icon is not finded`);
    }
  }, []);

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
      {icon ? <SVG src={icon} /> : <span className="WalletIcon__empty" />}
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
