import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Web3 from 'web3/dist/web3.min.js';
import getFinePrice from 'utils/get-fine-price';

// Components.
import SVG from 'utils/svg-wrap';
import * as UI from 'src/ui';

// Styles.
import './DexSwapInput.less';

function DexSwapInput({
                        title,
                        manage,
                        label,
                        token,
                        showBalance,
                        onSelectToken = () => {},
                      }) {
  // States
  const [value, setValue] = React.useState('0');
  const [currency, setCurrency] = React.useState('usd');

  // Refs
  const inputRef = React.useRef(null);
  const selectRef = React.useRef(null);

  // Logic
  const web3 = new Web3();
  const balance = web3.utils.toBN(_.get(token, 'balance', "0"));
  //const decimals = 10**_.get(token, 'decimals', 18); // TODO use decimals parameter if token have not 18 decimals
  const balanceNumber = Number(web3.utils.fromWei(balance));

  // Handlers
  const handleInput = newValue => {
    setValue(newValue);
  };

  const handleContainerClick = (e) => {
    if (!selectRef.current.contains(e.target)) {
      inputRef.current.focus();
    }
  };

  const handleBalanceClick = () => {
    handleInput(balanceNumber);
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
          {(!!balanceNumber && showBalance) && <div>
            <span className={`DexSwapInput__balance ${balanceNumber === value
              ? 'active'
              : ''}`}
                  onClick={handleBalanceClick}>
              Balance ≈ {getFinePrice(balanceNumber)}
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
  token: PropTypes.object,
};

DexSwapInput.defaultProps = {
  title: '',
  manage: false,
  label: false,
  showBalance: false,
};

export default DexSwapInput;
