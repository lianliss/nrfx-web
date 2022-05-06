import React from 'react';
import PropTypes from 'prop-types';

// Components.
import SVG from 'utils/svg-wrap';
import * as UI from 'src/ui';

// Styles.
import './DexSwapInput.less';

function DexSwapInput({ title, rate, manage, label }) {
  // States
  const [value, setValue] = React.useState('0');
  const [currency, setCurrency] = React.useState('usd');

  // Refs
  const inputRef = React.useRef(null);
  const selectRef = React.useRef(null);

  // Logic
  // -- filter rate to text.
  let displayRate = String(rate.toFixed(2)); // To string and fixed
  displayRate = displayRate
    .split('') // 1000.22 to 1 000.22
    .reverse()
    .join('')
    .replace(/\d\d\d/g, '$& ')
    .split('')
    .reverse()
    .join('');

  // Handlers
  const handleInput = (newValue) => {
    setValue(newValue);
  };

  const handleContainerClick = (e) => {
    if (!selectRef.current.contains(e.target)) {
      inputRef.current.focus();
    }
  };

  // Render
  return (
    <div className="SwapFormInput" onClick={handleContainerClick}>
      {label && (
        <div className="SwapFormInput__label">
          <div>
            <span className="SwapFormInput__title">{title}</span>
            {manage && (
              <div className="SwapFormInput__manage">
                <SVG src={require('src/asset/icons/cabinet/settings.svg')} />
              </div>
            )}
          </div>
          <div>
            <span className="SwapFormInput__rate">≈ ${displayRate}</span>
          </div>
        </div>
      )}
      <div className="SwapFormInput__container">
        <div className="SwapFormInput__icon">
          <SVG src={require(`src/asset/icons/wallets/${currency}.svg`)} />
        </div>
        <div className="SwapFormInput__select" ref={selectRef}>
          <span>Ethereum</span>
          <div className="SwapFormInput__currency">
            <span>{currency.toUpperCase()}</span>
            <SVG
              src={require('src/asset/icons/cabinet/swap/select-arrow.svg')}
            />
          </div>
        </div>
        <div className="SwapFormInput__input">
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
  rate: PropTypes.number,
  manage: PropTypes.bool,
  label: PropTypes.bool,
};

DexSwapInput.defaultProps = {
  title: '',
  rate: 0,
  manage: false,
  label: false,
};

export default DexSwapInput;
