import React from 'react';
import PropTypes from 'prop-types';

// Components
import DoubleWallets from 'src/index/components/cabinet/DoubleWallets/DoubleWallets';
import WalletIcon from 'src/index/components/cabinet/WalletIcon/WalletIcon';
import { DropdownElement, Button } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Utils
import { classNames as cn } from 'src/utils';

// Styles
import './LiquidityList.less';

// Main
function LiquidityList({ items = [], onAddClick, onRemoveClick }) {
  const ItemContent = ({ item }) => {
    return (
      <div className="ItemContent">
        <div className="ItemContent__body">
          <div>
            <span>Pooled {item.currencies[0].toUpperCase()}</span>
            <span>
              <span>{item.amounts[0]}</span>
              <WalletIcon currency={item.currencies[0]} size={16} />
            </span>
          </div>
          {item.currencies.length === 2 && (
            <div>
              <span>Pooled {item.currencies[1].toUpperCase()}</span>
              <span>
                <span>{item.amounts[1]}</span>
                <WalletIcon currency={item.currencies[1]} size={16} />
              </span>
            </div>
          )}
          <div>
            <span>Your pool tokens:</span>
            <span>{item.pool.tokens}</span>
          </div>
          <div>
            <span>Your pool share:</span>
            <span>{item.pool.share}</span>
          </div>
        </div>
        <div className="ItemContent__footer">
          <Button type="lightBlue" size="extra_large" onClick={onAddClick}>
            Add
          </Button>
          <Button type="dark" size="extra_large" onClick={onRemoveClick}>
            Remove
          </Button>
        </div>
      </div>
    );
  };

  return (
    <ul className={cn('LiquidityList', { empty: !items.length })}>
      {items.length ? (
        items.map((item) => (
          <li key={item.id} className="LiquidityList__item">
            <DropdownElement dropElement={<ItemContent item={item} />}>
              <div className="LiquidityList__item__container">
                <DoubleWallets
                  first={item.currencies[0]}
                  second={item.currencies[1]}
                />
                <div className="dropdown-icon">
                  <SVG
                    src={require('src/asset/icons/cabinet/select-arrow.svg')}
                  />
                </div>
              </div>
            </DropdownElement>
          </li>
        ))
      ) : (
        <li>No liquidity.</li>
      )}
    </ul>
  );
}

export default LiquidityList;
