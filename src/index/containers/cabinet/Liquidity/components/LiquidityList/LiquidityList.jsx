import React from 'react';
import PropTypes from 'prop-types';

// Components
import DoubleWallets from 'src/index/components/cabinet/DoubleWallets/DoubleWallets';

// Utils
import { classNames as cn } from 'src/utils';

// Styles
import './LiquidityList.less';

// Main
function LiquidityList({ items = [] }) {
  return (
    <ul className={cn('LiquidityList', { empty: !items.length })}>
      {items.length ? (
        items.map((item) => (
          <li>
            <DoubleWallets
              first={item.currencies[0]}
              second={item.currencies[1]}
            />
          </li>
        ))
      ) : (
        <li>No liquidity.</li>
      )}
    </ul>
  );
}

export default LiquidityList;
