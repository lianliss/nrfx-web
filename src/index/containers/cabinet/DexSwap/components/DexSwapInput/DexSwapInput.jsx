import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import wei from 'utils/wei';
import getFinePrice from 'utils/get-fine-price';

// Components.
import SVG from 'utils/svg-wrap';
import * as UI from 'src/ui';
import { getLang } from "utils";

// Styles.
import './DexSwapInput.less';

function DexSwapInput({
                        title,
                        manage,
                        label,
                        token,
                        showBalance,
                        value,
                        onChange,
                        onSelectToken,
                        setExact,
                      }) {
  // States
  const [currency, setCurrency] = React.useState('usd');

  // Refs
  const inputRef = React.useRef(null);
  const selectRef = React.useRef(null);

  // Logic
  const balanceNumber = Number(wei.from(_.get(token, 'balance', "0"), _.get(token, 'decimals', 18)));

  // Handlers
  const handleInput = newValue => {
    onChange(newValue);
  };

  const handleContainerClick = (e) => {
    if (!selectRef.current.contains(e.target)) {
      inputRef.current.focus();
      setExact();
    }
  };

  const handleBalanceClick = () => {
    handleInput(balanceNumber);
  };

  const tokenAddress = _.get(token, 'address');
  React.useEffect(() => {
    onChange('0');
  }, [tokenAddress]);

  // Render
  return (
    <div className="DexSwapInput" onClick={handleContainerClick}>
      {label && (
        <div className="DexSwapInput__label">
          <div>
            <span className="DexSwapInput__title">{title}</span>
            {manage && (
              <div className="DexSwapInput__manage">
                <SVG src={require('src/asset/icons/cabinet/settings.svg')} />
              </div>
            )}
          </div>
          {(!!balanceNumber && showBalance) && <div>
            <span className={`DexSwapInput__balance ${balanceNumber === value
              ? 'active'
              : ''}`}
                  onClick={handleBalanceClick}>
              {getLang('dex_balance')} ≈ {getFinePrice(balanceNumber)}
            </span>
          </div>}
        </div>
      )}
      <div className="DexSwapInput__container">
        <div className="DexSwapInput__icon" style={{
          backgroundImage: `url('${_.get(token, 'logoURI', '')}')`
        }} onClick={onSelectToken} />
        <div className="DexSwapInput__select" onClick={onSelectToken} ref={selectRef}>
          <span>{_.get(token, 'name', 'Unknown')}</span>
          <div className="DexSwapInput__currency">
            <span>{_.get(token, 'symbol', 'Unknown')}</span>
            <SVG
              src={require('src/asset/icons/cabinet/swap/select-arrow.svg')}
            />
          </div>
        </div>
        <div className="DexSwapInput__input">
          <UI.Input
            ref={inputRef}
            type="number"
            onTextChange={handleInput}
            value={value}
          />
        </div>
      </div>
    </div>
  );
}

DexSwapInput.propTypes = {
  title: PropTypes.string,
  manage: PropTypes.bool,
  label: PropTypes.bool,
  showBalance: PropTypes.bool,
  onSelectToken: PropTypes.func,
  onChange: PropTypes.func,
  setExact: PropTypes.func,
  value: PropTypes.any,
  token: PropTypes.object,
};

DexSwapInput.defaultProps = {
  title: '',
  manage: false,
  label: false,
  value: 0,
  showBalance: false,
  onSelectToken: () => {},
  setExact: () => {},
};

export default DexSwapInput;
