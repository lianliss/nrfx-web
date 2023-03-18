import React from 'react';
import PropTypes from 'prop-types';

// Components
import { SwitchTabs } from 'ui';

// Utils
import { p2pMode } from 'src/index/constants/dapp/types';
import { useDispatch } from 'react-redux';
import { setP2PMode } from 'src/actions/dapp/p2p.js';

function SwitchTheMode({ mode, size }) {
  const dispatch = useDispatch();
  const switchTabs = [
    { value: p2pMode.buy, label: size === 'small' ? 'Buy' : 'Buy Crypto' },
    { value: p2pMode.sell, label: size === 'small' ? 'Sell' : 'Sell Crypto' },
  ];

  return (
    <SwitchTabs
      selected={mode}
      tabs={switchTabs}
      onChange={(mode) => dispatch(setP2PMode(mode))}
      type={mode === p2pMode.sell ? 'orange' : 'light-blue'}
      size={size}
    />
  );
}

SwitchTheMode.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

SwitchTheMode.defaultProps = {
  size: 'medium',
};

export default SwitchTheMode;
