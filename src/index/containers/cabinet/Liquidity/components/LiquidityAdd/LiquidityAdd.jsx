import React from 'react';
import PropTypes from 'prop-types';

// Components
import DexSwapInput from '../../../DexSwap/components/DexSwapInput/DexSwapInput';
import SVG from 'utils/svg-wrap';
import { Button } from 'src/ui';

// Styles
import './LiquidityAdd.less';

function LiquidityAdd({ onClose }) {
  return (
    <>
      <div className="Liquidity__header LiquidityAdd">
        <div className="Liquidity__title">Add Liquidity</div>
        <div className="close" onClick={onClose}>
          <SVG src={require('src/asset/icons/close-popup.svg')} />
        </div>
      </div>
      <div className="Liquidity__body LiquidityAdd">
        <DexSwapInput
          onChange={() => {}}
          value={12}
          token={{ symbol: 'NRFX', name: 'Narfex' }}
          showBalance
          label
          title="Balance ≈ $1 454.55"
        />
        <div className="LiquidityAdd__icon">
          <span>+</span>
        </div>
        <DexSwapInput
          onChange={() => {}}
          value={12}
          token={{ symbol: 'NRFX', name: 'Narfex' }}
          showBalance
          label
          title="Balance ≈ $1 454.55"
        />
        <span className="default-text-light">Prices and pool share</span>
        <div className="LiquidityAdd__result">
          <div className="LiquidityAdd__item">
            <span>250.115</span>
            <span>BSW per BNB</span>
          </div>
          <div className="LiquidityAdd__item">
            <span>250.115</span>
            <span>BSW per BNB</span>
          </div>
          <div className="LiquidityAdd__item">
            <span>250.115</span>
            <span>BSW per BNB</span>
          </div>
        </div>
        <Button type="lightBlue" onClick={onClose}>
          Supply
        </Button>
      </div>
    </>
  );
}

LiquidityAdd.propTypes = {
  onClose: PropTypes.func,
};

LiquidityAdd.defaultProps = {
  onClose: () => {},
};

export default LiquidityAdd;
