import React from 'react';
import PropTypes from 'prop-types';
import wei from 'utils/wei';
import getFinePrice from 'utils/get-fine-price';
import { getLang } from 'src/utils';

// Components
import DexSwapInput from '../../../DexSwap/components/DexSwapInput/DexSwapInput';
import SVG from 'utils/svg-wrap';
import { Button } from 'src/ui';
import { Web3Context } from 'services/web3Provider';

// Styles
import './LiquidityAdd.less';
import TokenSelect from '../../../DexSwap/components/TokenSelect/TokenSelect';
import { openStateModal } from 'src/actions';

let balanceInterval;
let token0;
let token1;
const TIMEOUT_BALANCE = 2000;

function LiquidityAdd({ onClose, type, addPool, currentPool, routerTokens }) {
  // Constants
  const context = React.useContext(Web3Context);
  const {
    getPairAddress, getReserves, getTokenBalance, getTokenContract,
    routerAddress, tokens,
  } = context;

  const [isImport, setIsImport] = React.useState(type === 'import');

  // States
  // --Inputs
  const [values, setValues] = React.useState(['0', '0']);
  // --Tokens
  const [selectedTokens, setSelectedTokens] = React.useState([
    tokens.find(t => t.symbol === 'NRFX'),
    tokens.find(t => t.symbol === 'BNB'),
  ]);
  const [selectToken, setSelectToken] = React.useState(0);
  const [reserves, setReserves] = React.useState([0,0]);
  const [balances, setBalances] = React.useState([0,0]);
  const [isToken, setIsToken] = React.useState(false);
  const [allowance, setAllowance] = React.useState([0, 0]);
  const [isApproving, setIsApproving] = React.useState(false);

  const amount0 = Number(values[0]) || 0;
  const amount1 = Number(values[1]) || 1;
  const pairAddress = selectedTokens[0].symbol && selectedTokens[1].symbol
    ? getPairAddress(selectedTokens[0], selectedTokens[1])
    : '';

  const updateBalances = () => {
    if (!selectedTokens[0]
      || !selectedTokens[1]
      || selectedTokens[0].symbol === selectedTokens[1].symbol) {
      setBalances([0, 0]);
    }

    Promise.all([
      getTokenBalance(selectedTokens[0].address),
      getTokenBalance(selectedTokens[1].address),
    ]).then(data => {
      selectedTokens[0].balance = data[0];
      selectedTokens[1].balance = data[1];
      setBalances([
        wei.from(data[0], selectedTokens[0].decimals),
        wei.from(data[1], selectedTokens[1].decimals),
      ])
    })
  };

  const approve = async () => {
    console.log('APPROVE');
    setIsApproving(true);
    const token = !!allowance[0] ? token1 : token0;
    try {
      const amount = await token.approve(routerAddress, 5 * 10**9);
      if (!!allowance[0]) {
        setAllowance([allowance[0], amount]);
      } else {
        setAllowance([amount, allowance[1]]);
      }
    } catch (error) {
      console.error('[LiquidityAdd][approve]', token);
    }
    setIsApproving(false);
  };

  // On tokens changed
  React.useEffect(() => {
    setReserves([0,0]);
    setAllowance([0,0]);
    if (!selectedTokens[0]
      || !selectedTokens[1]
      || selectedTokens[0].symbol === selectedTokens[1].symbol) {
      return;
    }

    token0 = getTokenContract(selectedTokens[0]);
    token1 = getTokenContract(selectedTokens[1]);

    Promise.allSettled([
      getReserves(selectedTokens[0], selectedTokens[1]),
      token0.getAllowance(routerAddress),
      token1.getAllowance(routerAddress),
    ]).then(data => {
      if (!!data[0].value) {
        setReserves([
          wei.from(data[0].value[0], selectedTokens[0].decimals),
          wei.from(data[0].value[1], selectedTokens[1].decimals),
        ]);
      }
      setAllowance([
        data[1].value,
        data[2].value,
      ])
    }).catch(error => {
      console.error('[LiquidityAdd]', error);
    });

    updateBalances();
    clearInterval(balanceInterval);
    balanceInterval = setInterval(updateBalances, TIMEOUT_BALANCE);
  }, [selectedTokens]);

  // Set default selected tokens
  React.useEffect(() => {
    const { tokens } = context;
    if (currentPool) {
      getReserves(currentPool).then(reserve => {
        setSelectedTokens([reserve[2].token0, reserve[2].token1]);
        clearInterval(balanceInterval);
        balanceInterval = setInterval(updateBalances, TIMEOUT_BALANCE);
      }).catch(error => {
        console.error("[LiquidityAdd] Can't set the current pool", currentPool, error);
      });
    } else {
      const firstToken = tokens.find(t => t.symbol === 'NRFX');
      const secondToken = tokens.find(t => t.symbol === 'BNB');

      setSelectedTokens([firstToken, secondToken]);
      clearInterval(balanceInterval);
      balanceInterval = setInterval(updateBalances, TIMEOUT_BALANCE);
    }

    return () => {
      clearInterval(balanceInterval);
    }
  }, []);

  React.useEffect(() => {
    if(routerTokens.isExists) {
      const tokensPair = [
        tokens.find(t => t.symbol === routerTokens.token0),
        tokens.find(t => t.symbol === routerTokens.token1),
      ];

      if (!tokensPair[0] || !tokensPair[1]) return;
      if(tokensPair[0] === tokensPair[1]) return;

      setSelectedTokens(tokensPair);
    }
  }, []);

  const rate0 = !!reserves[1]
    ? reserves[0] / reserves[1]
    : !!amount1
      ? amount0 / amount1
      : 0;
  const rate1 = !!reserves[0]
    ? reserves[1] / reserves[0]
    : !!amount0
      ? amount1 / amount0
      : 0;
  const share = !!reserves[0]
    ? amount0 / (amount0 + reserves[0]) * 100
    : 100;
  const isAvailable = !!allowance[0]
    && !!allowance[1]
    && amount0 <= balances[0]
    && amount1 <= balances[1]
    && amount0 > 0
    && amount1 > 0;
  
  const perLang = getLang('dex_per');
  const enableLang = getLang('dapp_global_enable');

  return (
    <>
      <div className="Liquidity__header LiquidityAdd">
        <div className="Liquidity__title">
          {isImport
            ? getLang('dapp_liquidity_import_page_title')
            : getLang('dapp_liquidity_add_page_title')}
        </div>
        <div className="close" onClick={onClose}>
          <SVG src={require('src/asset/icons/close-popup.svg')} />
        </div>
      </div>
      <div className="Liquidity__body LiquidityAdd">
        <DexSwapInput
          onChange={(value) => {
            const secondValue = !!reserves[0]
              ? reserves[1] / reserves[0] * (Number(value) || 0)
              : values[1];
            setValues((state) => [value, secondValue]);
          }}
          onSelectToken={() => {
            setSelectToken(0);
            setIsToken(true);
          }}
          value={values[0]}
          token={selectedTokens[0]}
          showBalance
          label
        />
        <div className="LiquidityAdd__icon">
          <span>+</span>
        </div>
        <DexSwapInput
          onChange={(value) => {
            const secondValue = !!reserves[1]
              ? reserves[0] / reserves[1] * (Number(value) || 0)
              : values[0];
            setValues((state) => [secondValue, value]);
          }}
          onSelectToken={() => {
            setSelectToken(1);
            setIsToken(true);
          }}
          value={values[1]}
          token={selectedTokens[1]}
          showBalance
          label
        />
        {!isImport && (
          <>
            <span className="default-text-light">
              {getLang('dapp_liquidity_add_info_title')}
            </span>
            <div className="LiquidityAdd__result">
              <div className="LiquidityAdd__item">
                <span>{getFinePrice(rate0)}</span>
                <span>
                  {selectedTokens[0].symbol}&nbsp;
                  {perLang}&nbsp;
                  {selectedTokens[1].symbol}
                </span>
              </div>
              <div className="LiquidityAdd__item">
                <span>{getFinePrice(rate1)}</span>
                <span>
                  {selectedTokens[1].symbol}&nbsp;
                  {perLang}&nbsp;
                  {selectedTokens[0].symbol}
                </span>
              </div>
              <div className="LiquidityAdd__item">
                <span>{getFinePrice(share)} %</span>
                <span>
                  {getLang('dapp_liquidity_add_info_3')}
                </span>
              </div>
            </div>
            {!allowance[0] && <Button
              type="lightBlue"
              state={isApproving ? 'loading' : ''}
              size="extra_large"
              onClick={approve}
            >
              {enableLang} {selectedTokens[0].symbol}
            </Button>}
            {(!!allowance[0] && !allowance[1]) && <Button
              type="lightBlue"
              state={isApproving ? 'loading' : ''}
              size="extra_large"
              onClick={approve}
            >
              {enableLang} {selectedTokens[1].symbol}
            </Button>}
            <Button
              type={!isAvailable ? 'secondary' : 'lightBlue'}
              disabled={!isAvailable}
              size="extra_large"
              onClick={() => openStateModal('liquidity_confirm_add', {
                selectedTokens,
                reserves,
                rate0,
                rate1,
                share,
                amount0,
                amount1,
                pairAddress,
              })}
            >
              {getLang('dapp_global_supply')}
            </Button>
          </>
        )}
        {isImport && (
          <div className="LiquidityAdd__import__footer">
            <p className="LiquidityAdd__import__default_text">
              {getLang('dapp_liquidity_import_page_instruction')}
            </p>
            <span
              className="LiquidityAdd__import__default_text link"
              onClick={() => {
                if (pairAddress.length) addPool(pairAddress);
                setIsImport(false);
                setValues(['0', '0']);
              }}
            >
              {getLang('dapp_liquidity_main_add_liquidity_button')}
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
  routerTokens: PropTypes.object,
};

LiquidityAdd.defaultProps = {
  onClose: () => {},
  type: 'add',
  routerTokens: { isExists: false },
};

export default LiquidityAdd;
