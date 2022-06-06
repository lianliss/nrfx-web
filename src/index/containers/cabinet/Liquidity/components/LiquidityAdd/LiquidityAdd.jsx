import React from 'react';
import PropTypes from 'prop-types';

// Components
import DexSwapInput from '../../../DexSwap/components/DexSwapInput/DexSwapInput';
import SVG from 'utils/svg-wrap';
import { Button } from 'src/ui';
import { Web3Context } from 'services/web3Provider';

// Styles
import './LiquidityAdd.less';
import TokenSelect from '../../../DexSwap/components/TokenSelect/TokenSelect';
import { openStateModal } from '../../../../../../actions';

function LiquidityAdd({ onClose, type }) {
  // Constants
  const context = React.useContext(Web3Context);
  const [isImport, setIsImport] = React.useState(type === 'import');

  // States
  // --Inputs
  const [values, setValues] = React.useState(['0', '0']);
  // --Tokens
  const [selectedTokens, setSelectedTokens] = React.useState([{}, {}]);
  const [selectToken, setSelectToken] = React.useState(0);
  const [isToken, setIsToken] = React.useState(false);

  // Set default selected tokens
  React.useEffect(() => {
    const { tokens } = context;
    const firstToken = tokens.filter(
      (token) => token.symbol.toUpperCase() === 'NRFX'
    );
    const secondToken = tokens.filter(
      (token) => token.symbol.toUpperCase() === 'BNB'
    );

    setSelectedTokens([firstToken[0], secondToken[0]]);
  }, []);

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
          onChange={(value) => {
            setValues((state) => [value, state[1]]);
          }}
          onSelectToken={() => {
            setSelectToken(0);
            setIsToken(true);
          }}
          value={values[0]}
          token={selectedTokens[0]}
          showBalance
          label
          title={!isImport ? `Balance ≈ $1 454.55` : ''}
        />
        <div className="LiquidityAdd__icon">
          <span>+</span>
        </div>
        <DexSwapInput
          onChange={(value) => {
            setValues((state) => [state[0], value]);
          }}
          onSelectToken={() => {
            setSelectToken(1);
            setIsToken(true);
          }}
          value={values[1]}
          token={selectedTokens[1]}
          showBalance
          label
          title={!isImport ? `Balance ≈ $1 454.55` : ''}
        />
        {!isImport && (
          <>
            <span className="default-text-light">Prices and pool share</span>
            <div className="LiquidityAdd__result">
              <div className="LiquidityAdd__item">
                <span>250.115</span>
                <span>
                  {selectedTokens[0].symbol} per {selectedTokens[1].symbol}
                </span>
              </div>
              <div className="LiquidityAdd__item">
                <span>250.115</span>
                <span>
                  {selectedTokens[0].symbol} per {selectedTokens[1].symbol}
                </span>
              </div>
              <div className="LiquidityAdd__item">
                <span>250.115</span>
                <span>
                  {selectedTokens[0].symbol} per {selectedTokens[1].symbol}
                </span>
              </div>
            </div>
            <Button
              type="lightBlue"
              size="extra_large"
              onClick={() => openStateModal('liquidity_confirm_add')}
            >
              Supply
            </Button>
          </>
        )}
        {isImport && (
          <div className="LiquidityAdd__import__footer">
            <p className="LiquidityAdd__import__default_text">
              Select a token to find your liquidity.
            </p>
            <span
              className="LiquidityAdd__import__default_text link"
              onClick={() => {
                setIsImport(false);
                setValues(['0', '0']);
              }}
            >
              Add liquidity
            </span>
          </div>
        )}
      </div>
      {isToken && (
        <TokenSelect
          selected={selectToken === 0 ? selectedTokens[0] : selectedTokens[1]}
          onClose={() => setIsToken(false)}
          onChange={(token) => {
            if (selectToken === 0) {
              setSelectedTokens((state) => {
                return [token, state[1]];
              });
            } else {
              setSelectedTokens((state) => {
                return [state[0], token];
              });
            }

            setIsToken(false);
          }}
          {...context}
        />
      )}
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
