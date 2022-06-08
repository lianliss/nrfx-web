import React from 'react';
import PropTypes from 'prop-types';

// Components
import SVG from 'utils/svg-wrap';
import { Button, NumberFormat } from 'src/ui';
import WalletIcon from 'src/index/components/cabinet/WalletIcon/WalletIcon';
import LiquidityRange from '../LiquidityRange/LiquidityRange';

// Styles
import './LiquidityRemove.less';
import DoubleWallets from '../../../../../components/cabinet/DoubleWallets/DoubleWallets';

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
        <div className="icon__wrap">
          <SVG src={require('src/asset/icons/arrows/long-arrow.svg')} />
        </div>
        <div className="LiquidityRemove__result">
          <div className="LiquidityRemove__item">
            <span className="default-text-dark">
              <NumberFormat number={200.0155} />
            </span>
            <span className="default-text-dark">
              <WalletIcon currency="nrfx" size={24} marginRight={8} />
              BNB
            </span>
          </div>
          <div className="LiquidityRemove__item">
            <span className="default-text-dark">
              <NumberFormat number={200.0155} />
            </span>
            <span className="default-text-dark">
              <WalletIcon currency="nrfx" size={24} marginRight={8} />
              BNB
            </span>
          </div>
        </div>
        <div className="LiquidityRemove__prices">
          <div className="LiquidityRemove__item">
            <span className="default-text-dark">Price:</span>
            <span className="default-text-dark">
              <NumberFormat number={1} currency="bnb" />
              &nbsp;=&nbsp;
              <NumberFormat number={1} currency="nrfx" />
            </span>
          </div>
          <div className="LiquidityRemove__item">
            <span className="default-text-dark"></span>
            <span className="default-text-dark">
              <NumberFormat number={1} currency="bnb" />
              &nbsp;=&nbsp;
              <NumberFormat number={1} currency="nrfx" />
            </span>
          </div>
        </div>
        <Button type="lightBlue" size="extra_large" onClick={onClose}>
          Remove
        </Button>
        <div className="LiquidityRemove__result">
          <div className="LiquidityRemove__item">
            <span className="default-text-dark">
              <DoubleWallets
                first="bnb"
                second="nrfx"
                size={24}
                separator="/"
                className="default-text-dark"
              />
            </span>
            <span className="default-text-dark">
              <NumberFormat number={0.0} />
            </span>
          </div>
          <div className="LiquidityRemove__item">
            <span className="default-text-dark">BNB:</span>
            <span className="default-text-dark">
              <NumberFormat number={15.05} />
            </span>
          </div>
          <div className="LiquidityRemove__item">
            <span className="default-text-dark">BNB:</span>
            <span className="default-text-dark">
              <NumberFormat number={15.05} />
            </span>
          </div>
        </div>
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
