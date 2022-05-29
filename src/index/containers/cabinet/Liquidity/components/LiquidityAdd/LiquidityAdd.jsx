import React from 'react';
import PropTypes from 'prop-types';

// Components
import DexSwapInput from '../../../DexSwap/components/DexSwapInput/DexSwapInput';
import SVG from 'utils/svg-wrap';
import { Button } from 'src/ui';

// Styles
import './LiquidityAdd.less';
import TokenSelect from '../../../DexSwap/components/TokenSelect/TokenSelect';

function LiquidityAdd({ onClose, type }) {
  const isImport = type === 'import';
  const isAdd = type === 'add';

  return (
    <>
      <div className="Liquidity__header LiquidityAdd">
        <div className="Liquidity__title">
          {isImport ? 'Import pool' : 'Add Liquidity'}
        </div>
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
          title={isAdd ? `Balance ≈ $1 454.55` : ''}
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
          title={isAdd ? `Balance ≈ $1 454.55` : ''}
        />
        {isAdd && (
          <>
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
          </>
        )}
        {isImport && (
          <div className="LiquidityAdd__import__footer">
            <p className="LiquidityAdd__import__default_text">
              Select a token to find your liquidity.
            </p>
            <span className="LiquidityAdd__import__default_text link">Add liquidity</span>
          </div>
        )}
      </div>
      {/* <TokenSelect /> */}
    </>
  );
}

LiquidityAdd.propTypes = {
  onClose: PropTypes.func,
  type: PropTypes.string,
};

LiquidityAdd.defaultProps = {
  onClose: () => {},
  type: 'add',
};

export default LiquidityAdd;
