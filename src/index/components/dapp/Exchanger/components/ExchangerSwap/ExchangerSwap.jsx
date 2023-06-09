import React from 'react';
import { getLang } from 'src/utils';
import getFinePrice from 'utils/get-fine-price';
import useSwap from 'src/hooks/dapp/useSwap';
import * as actions from 'src/actions';
import _ from 'lodash';

// Components
import SVG from 'utils/svg-wrap';
import { ContentBox, Button } from 'src/ui';
import TokenSelect from 'src/index/containers/dapp/DexSwap/components/TokenSelect/TokenSelect';
import DappInput from '../../../DappInput/DappInput';
import CabinetModal from '../../../Modals/CabinetModal/CabinetModal';

// Styles
import './ExchangerSwap.less';

function ExchangerSwap({
  fiats,
  fiat,
  coins,
  coin,
  setFiat,
  setCoin,
  fiatsLoaded,
}) {
  const {
    isAdaptive,
    fiatSelector,
    coinSelector,
    outputRate,
    fiatBalance,
    fiatAmount,
    coinAmount,
    fiatValue,
    handleCoinInput,
    handleFiatInput,
    isProcessing,
    isExactOut,
    isNoLiquidity,
    isSelectFiat,
    isSelectCoin,
    setIsSelectFiat,
    setIsSelectCoin,
    handleExchangeFocus,
    handleFiatChange,
    handleCoinChange,
    context,
  } = useSwap({
    fiats,
    fiat,
    coins,
    coin,
    setFiat,
    setCoin,
    fiatsLoaded,
  });
  const fiatSymbol = _.get(fiat, 'symbol', '');
  const coinSymbol = _.get(coin, 'symbol', '');

  return (
    <ContentBox className={`ExchangerSwap ${isAdaptive && 'adaptive'}`}>
      <div className="SwapForm__formWrapper">
        <div className="SwapForm__form">
          <div className="SwapForm__form__control">
            <div className="ExchangerSwap__dropdown" onClick={fiatSelector}>
              <div
                className="ExchangerSwap__icon"
                style={{
                  backgroundImage: `url('${_.get(fiat, 'logoURI', '')}')`,
                }}
              />
              <div className="ExchangerSwap__select">
                {/*<span>{_.get(fiat, 'name', 'Unknown')}</span>*/}
                <div className="ExchangerSwap__currency">
                  <span>{_.get(fiat, 'symbol', 'Unknown')}</span>
                  <SVG
                    src={require('src/asset/icons/cabinet/swap/select-arrow.svg')}
                  />
                </div>
              </div>
              <div className="ExchangerSwap__dropdown-rate">
                1 {fiatSymbol} ≈ {getFinePrice(outputRate)} {coinSymbol}
              </div>
            </div>
          </div>
          <div className="SwapForm__form__control">
            <div className="ExchangerSwap__fiat-amount">
              <DappInput
                placeholder="0.00"
                onChange={handleFiatInput}
                value={fiatValue}
                type="number"
                inputMode="decimal"
                onFocus={() => handleExchangeFocus('from')}
                textPosition="right"
              />
              <span
                className="ExchangerSwap__link"
                onClick={() => handleFiatInput(fiatBalance)}
              >
                {getLang('dapp_global_balance')}:&nbsp;
                {getFinePrice(fiatBalance)} {fiatSymbol}
              </span>
              {isAdaptive && (
                <div className="ExchangerSwap__rate">
                  1 {fiatSymbol} ≈ {getFinePrice(outputRate)} {coinSymbol}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="SwapForm__separator">
          <div
            className="ExchangerSwap__switchButton"
            onClick={() => {
              setFiat(coin);
              setCoin(fiat);
            }}
          >
            {isAdaptive ? (
              <SVG src={require('src/asset/icons/swap.svg')} />
            ) : (
              <SVG src={require('src/asset/24px/switch.svg')} />
            )}
          </div>
        </div>
        <div className="SwapForm__form">
          <div className="SwapForm__form__control">
            <div className="ExchangerSwap__dropdown" onClick={coinSelector}>
              <div
                className="ExchangerSwap__icon"
                style={{
                  backgroundImage: `url('${_.get(coin, 'logoURI', '')}')`,
                }}
              />
              <div className="ExchangerSwap__select">
                {/*<span>{_.get(coin, 'name', 'Unknown')}</span>*/}
                <div className="ExchangerSwap__currency">
                  <span>{_.get(coin, 'symbol', 'Unknown')}</span>
                  <SVG
                    src={require('src/asset/icons/cabinet/swap/select-arrow.svg')}
                  />
                </div>
              </div>
              <div className="ExchangerSwap__dropdown-rate">
                1 {coinSymbol} ≈ {getFinePrice(outputRate ? 1 / outputRate : 0)}{' '}
                {fiatSymbol}
              </div>
            </div>
          </div>
          <div className="SwapForm__form__control">
            <div className="ExchangerSwap__fiat-amount">
              <DappInput
                placeholder="0.00"
                value={coinAmount}
                onChange={handleCoinInput}
                type="number"
                inputMode="decimal"
                onFocus={() => handleExchangeFocus('to')}
                textPosition="right"
                error={false}
              />
            </div>
          </div>
        </div>
      </div>
      {context.isConnected ? (
        <div className="ExchangerSwap__actions-buy">
          <Button
            className=""
            disabled={!fiatAmount || !coinAmount}
            state={isProcessing ? 'loading' : ''}
            onClick={() =>
              actions.openStateModal('exchanger', {
                isExactOut,
                fiat,
                coin,
                fiatAmount,
                coinAmount,
              })
            }
          >
            {isNoLiquidity
              ? 'No liquidity found'
              : getLang('dapp_exchanger_exchange_button')}
          </Button>
        </div>
      ) : (
        <div className="ExchangerSwap__actions-buy">
          <Button
            className=""
            onClick={() => actions.openStateModal('connect_to_wallet')}
          >
            {getLang('dapp_global_connect_wallet')}
          </Button>
        </div>
      )}
      {isSelectFiat && (
        <CabinetModal onClose={() => setIsSelectFiat(false)}>
          <TokenSelect
            onChange={(value) => handleFiatChange(value)}
            onClose={() => setIsSelectFiat(false)}
            selected={fiat}
            commonBases={context.network.commonBases}
            isAdaptive={isAdaptive}
            {...context}
            defaultList="fiats"
            tokens={[...coins]}
            fiats={fiats}
            loadAccountBalances={context.loadAccountBalances}
          />
        </CabinetModal>
      )}
      {isSelectCoin && (
        <CabinetModal onClose={() => setIsSelectCoin(false)}>
          <TokenSelect
            onChange={(value) => handleCoinChange(value)}
            onClose={() => setIsSelectCoin(false)}
            selected={coin}
            commonBases={context.network.commonBases}
            isAdaptive={isAdaptive}
            {...context}
            tokens={[...coins]}
            fiats={fiats}
            loadAccountBalances={context.loadAccountBalances}
          />
        </CabinetModal>
      )}
    </ContentBox>
  );
}

export default ExchangerSwap;
