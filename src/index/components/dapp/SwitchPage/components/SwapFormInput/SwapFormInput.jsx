import React from 'react';
import PropTypes from 'prop-types';

// Components.
import SVG from 'utils/svg-wrap';
import * as UI from 'src/ui';

// Utils
import { classNames as cn } from 'src/utils';

// Styles.
import './SwapFormInput.less';
import Options from './components/Options';

const SwapFormInput = (props) => {
  const {
    prefix,
    iconSize,
    value,
    onTextChange,
    currencies,
    onCurrencyChange,
    currency,
    inputId,
    className,
    onFocus,
    autoFocus,
    inputRef,
    disabled,
  } = props;

  // States
  const [isOptions, setIsOptions] = React.useState(false);

  // Refs
  const selectRef = React.useRef(null);

  // Handlers
  const handleInput = (newValue) => {
    onTextChange(newValue);
  };

  const handleContainerClick = (e) => {
    if (!selectRef.current.contains(e.target)) {
      inputRef.current.focus();
    }
  };

  // Render
  return (
    <div
      className={cn(
        'SwapFormInput',
        { [className]: className },
        { disabled: disabled }
      )}
      onClick={handleContainerClick}
    >
      <div className="SwapFormInput__container">
        <div
          className="SwapFormInput__select__wrap"
          ref={selectRef}
          onClick={() => setIsOptions(true)}
        >
          <div
            className="SwapFormInput__icon"
            style={{ width: iconSize, height: iconSize }}
          >
            <SVG src={require(`src/asset/icons/wallets/${currency}.svg`)} />
          </div>
          <div className="SwapFormInput__select">
            {prefix && <span>{currencies[currency].name}</span>}
            <div className="SwapFormInput__currency">
              <span>{currency.toUpperCase()}</span>
              <SVG
                src={require('src/asset/icons/cabinet/swap/select-arrow.svg')}
              />
            </div>
            {isOptions && (
              <Options
                currencies={currencies}
                currency={currency}
                onCurrencyChange={onCurrencyChange}
                onClose={() => setIsOptions(false)}
              />
            )}
          </div>
        </div>
        <div className="SwapFormInput__input">
          <UI.Input
            id={inputId}
            ref={inputRef}
            type="number"
            onTextChange={handleInput}
            value={value}
            onFocus={onFocus}
            autoFocus={autoFocus}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

SwapFormInput.propTypes = {
  prefix: PropTypes.bool,
  rate: PropTypes.number,
  iconSize: PropTypes.number,
  value: PropTypes.number,
  onTextChange: PropTypes.func,
  currencies: PropTypes.array,
  onCurrencyChange: PropTypes.func,
  currency: PropTypes.string,
  inputId: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

SwapFormInput.defaultProps = {
  rate: 0,
  prefix: false,
  iconSize: 41,
  value: 0,
  onTextChange: () => {},
  currencies: [],
  onCurrencyChange: () => {},
  currency: '',
  inputId: '',
  className: '',
  disabled: false,
  inputRef: null,
  selectRef: null,
};

export default SwapFormInput;
