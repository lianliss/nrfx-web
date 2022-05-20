import React from 'react';
import PropTypes from 'prop-types';

// Components
import SVG from 'utils/svg-wrap';

// Styles
import './DoubleWallets.less';

function DoubleWallets({ first, second }) {
  // Constants
  const [firstIcon, setFirstIcon] = React.useState(null);
  const [secondIcon, setSecondIcon] = React.useState(null);

  // Check first wallet svg exists;
  React.useEffect(() => {
    try {
      setFirstIcon(require(`src/asset/icons/wallets/${first}.svg`));
    } catch {
      console.warn(`${first}.svg is not defined`);
    }

    // Check second wallet svg exists;
    try {
      setSecondIcon(require(`src/asset/icons/wallets/${second}.svg`));
    } catch {
      console.warn(`${second}.svg is not defined`);
    }
  }, []);

  return (
    <div className="DoubleWallets">
      <div className="DoubleWallets__icons">
        {firstIcon && <SVG src={firstIcon} />}
        {secondIcon && <SVG src={secondIcon} />}
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
