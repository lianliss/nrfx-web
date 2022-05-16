import React from 'react';

// Components
import SVG from 'utils/svg-wrap';
import { Button, Range } from 'src/ui';
import WalletIcon from 'src/index/components/cabinet/WalletIcon/WalletIcon';

// Styles
import './LiquidityRemove.less';

function LiquidityRemove({ onClose }) {
  return (
    <>
      <div className="Liquidity__header LiquidityRemove">
        <div className="Liquidity__title">Remove Liquidity</div>
        <div className="close" onClick={onClose}>
          <SVG src={require('src/asset/icons/close-popup.svg')} />
        </div>
      </div>
      <div className="Liquidity__body LiquidityRemove">
        <span className="default-text">Prices and pool share</span>
        <div className="LiquidityRemove__result">
          <div className="LiquidityRemove__item">
            <span className="default-text-light">Earned BNB:</span>
            <span className="default-text-light">
              2,0155
              <WalletIcon currency="nrfx" size={16} />
            </span>
          </div>
          <div className="LiquidityRemove__item">
            <span className="default-text-light">Earned BNB:</span>
            <span className="default-text-light">
              2,0155
              <WalletIcon currency="nrfx" size={16} />
            </span>
          </div>
        </div>
        <Button type="lightBlue" onClick={onClose}>
          Supply
        </Button>
      </div>
    </>
  );
}

export default LiquidityRemove;
