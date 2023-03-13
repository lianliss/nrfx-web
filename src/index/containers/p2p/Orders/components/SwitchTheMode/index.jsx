import React from 'react';

// Components
import { SwitchTabs } from 'ui';

// Utils
import { p2pMode } from 'src/index/constants/dapp/types';
import { useDispatch } from 'react-redux';
import { setP2PMode } from 'src/actions/dapp/p2p.js';

function SwitchTheMode({ mode }) {
  const dispatch = useDispatch();

  const switchTabs = [
    { value: p2pMode.buy, label: 'Buy Crypto' },
    { value: p2pMode.sell, label: 'Sell Crypto' },
  ];

  return (
    <SwitchTabs
      selected={mode}
      tabs={switchTabs}
      onChange={(mode) => dispatch(setP2PMode(mode))}
      type="light-blue"
    />
  );
}

export default SwitchTheMode;
