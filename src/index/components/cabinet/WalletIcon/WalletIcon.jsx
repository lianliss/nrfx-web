import React from 'react';
import PropTypes from 'prop-types';

// Components
import SVG from 'utils/svg-wrap';

// Styles
import './WalletIcon.less';

// Find icon, and if icon is not finded display
// basic circle.
function WalletIcon({ currency, size }) {
  const [icon, setIcon] = React.useState(null);

  React.useEffect(() => {
    try {
      setIcon(require(`src/asset/icons/wallets/${currency}.svg`));
    } catch {
      console.warn(`${currency} icon is not finded`);
    }
  }, []);

  return (
    <span className="WalletIcon" style={{ width: size, height: size }}>
      {icon ? <SVG src={icon} /> : <span className="WalletIcon__empty" />}
    </span>
  );
}

WalletIcon.propTypes = {
  currency: PropTypes.string,
  size: PropTypes.number,
};

WalletIcon.defaultProps = {
  currency: '',
  size: 19,
};

export default WalletIcon;
