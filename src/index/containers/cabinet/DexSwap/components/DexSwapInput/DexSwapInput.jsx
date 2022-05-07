import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Components.
import SVG from 'utils/svg-wrap';
import * as UI from 'src/ui';

// Styles.
import './DexSwapInput.less';

function DexSwapInput({
                        title,
                        rate,
                        manage,
                        label,
                        token,
                        onSelectToken = () => {},
                      }) {
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
          <div>
            <span className="DexSwapInput__rate">≈ ${displayRate}</span>
          </div>
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
  rate: PropTypes.number,
  manage: PropTypes.bool,
  label: PropTypes.bool,
  onSelectToken: PropTypes.func,
  token: PropTypes.object,
};

DexSwapInput.defaultProps = {
  title: '',
  rate: 0,
  manage: false,
  label: false,
};

export default DexSwapInput;
