import React from 'react';
import PropTypes from 'prop-types';

// Components
import SVG from 'utils/svg-wrap';
import { Button, NumberFormat } from 'src/ui';
import WalletIcon from 'src/index/components/cabinet/WalletIcon/WalletIcon';
import LiquidityRange from '../LiquidityRange/LiquidityRange';

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
        <LiquidityRange />
        <div className="LiquidityRemove__result">
          <div className="LiquidityRemove__item">
            <span className="default-text-light">Earned BNB:</span>
            <span className="default-text-light">
              <NumberFormat number={200.0155} />
              <WalletIcon currency="nrfx" size={16} />
            </span>
          </div>
          <div className="LiquidityRemove__item">
            <span className="default-text-light">Earned BNB:</span>
            <span className="default-text-light">
              <NumberFormat number={200.0155} />
              <WalletIcon currency="nrfx" size={16} />
            </span>
          </div>
        </div>
        <Button type="lightBlue" onClick={onClose}>
          Remove
        </Button>
      </div>
    </>
  );
}

LiquidityRemove.propTypes = {
  onClose: PropTypes.func,
};

LiquidityRemove.defaultProps = {
  onClose: () => {},
};

export default LiquidityRemove;
