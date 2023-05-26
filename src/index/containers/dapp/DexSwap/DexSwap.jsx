import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { setSwap } from 'src/actions/dapp/swap';

// Components
import { Button, HoverPopup, NumberFormat } from 'src/ui';
import DexSettingsModal from './components/DexSettingsModal/DexSettingsModal';
import SVG from 'utils/svg-wrap';
import CabinetBlock from 'src/index/components/cabinet/CabinetBlock/CabinetBlock';
import DexSwapInput from './components/DexSwapInput/DexSwapInput';
import TokenSelect from './components/TokenSelect/TokenSelect';
import getFinePrice from 'utils/get-fine-price';
import significant from 'utils/significant';
import { openStateModal } from 'src/actions';
import { getLang } from 'utils';
import { DexRoute, DexDescription, CabinetModal } from 'dapp';
import useExchanger from 'src/hooks/dapp/useExchanger';
import useSwap, { useSwapAction } from 'src/hooks/dapp/useSwap';

// Styles
import './DexSwap.less';

const DexSwap = ({
  fiatTokens,
  coins,
  fiatSelected,
  coinSelected,
  setFiat,
  setCoin,
  isAdaptive,
  fiatsLoaded,
  ...props
}) => {
  const { context, ...swap } = useSwap({
    fiats: fiatTokens,
    fiat: fiatSelected,
    coins,
    coin: coinSelected,
    setFiat,
    setCoin,
    fiatsLoaded,
  });
  const swapAction = useSwapAction({
    fiat: swap.fiat,
    coin: swap.coin,
    fiatAmount: swap.fiatAmount,
    coinAmount: swap.coinAmount,
    isExactOut: swap.isExactOut,
    context,
  });

  const [isSettings, setIsSettings] = React.useState(false);

  let button = (
    <Button
      type="lightBlue"
      onClick={() => openStateModal('connect_to_wallet')}
    >
      <SVG src={require('src/asset/token/wallet.svg')} />
      {getLang('dex_button_connect_wallet')}
    </Button>
  );
  if (context.isConnected) {
    if (Number(swap.fiatAmount)) {
      if (Number(swap.fiatAmount) > swap.fiatBalance) {
        button = (
          <Button type="secondary" disabled>
            {getLang('dex_button_insufficient_balance')}
          </Button>
        );
      } else {
        let buttonText;

        if (swap.isNoLiquidity) {
          buttonText = 'No liquidity found';
        } else if (swapAction.priceImpactPercents >= 5) {
          buttonText = getLang('dex_button_swap_anyway');
        } else {
          buttonText = getLang('dapp_exchanger_exchange_button');
        }

        button = (
          <>
            {!swapAction.isAvailable && (
              <Button
                type={swapAction.isAvailable ? 'secondary' : 'lightBlue'}
                state={swapAction.isApproving ? 'loading' : ''}
                onClick={swapAction.approve}
              >
                Approve
              </Button>
            )}
            <Button
              type="lightBlue"
              disabled={
                !swapAction.isAvailable || !swap.fiatAmount || !swap.coinAmount
              }
              state={swap.isProcessing ? 'loading' : ''}
              className="DexSwap__button-swap"
              onClick={swapAction.swap}
            >
              <SVG src={require('src/asset/icons/convert-card.svg')} />
              {buttonText}
            </Button>
          </>
        );
      }
    } else {
      button = (
        <Button type="secondary" disabled>
          {getLang('dex_button_enter_amount')}
        </Button>
      );
    }
  }

  return (
    <div className="DexSwap">
      <CabinetBlock>
        <div className="DexSwap__form">
          <DexSwapInput
            onSelectToken={swap.setIsSelectFiat}
            onChange={swap.handleFiatInput}
            onFocus={() => swap.handleExchangeFocus('from')}
            value={swap.fiatAmount}
            token={swap.fiat}
            showBalance
            label
            title={getLang(
              !swap.isExactOut ? 'dex_pay_exact' : 'dex_pay_around'
            )}
            manage={
              <div
                className="DexSwap__manage"
                onClick={() => setIsSettings(true)}
              >
                <SVG src={require('src/asset/icons/cabinet/settings.svg')} />
              </div>
            }
          />
          <SVG
            onClick={() => {
              setFiat(swap.coin);
              setCoin(swap.fiat);
            }}
            src={require('src/asset/icons/cabinet/swap/swap-icon.svg')}
          />
          <DexSwapInput
            onSelectToken={swap.setIsSelectCoin}
            onChange={swap.handleCoinInput}
            onFocus={() => swap.handleExchangeFocus('to')}
            value={swap.coinAmount}
            token={swap.coin}
            label
            title={getLang(
              swap.isExactOut ? 'dex_receive_exact' : 'dex_receive_around'
            )}
          />
          {swap.fiat && swap.coin && (
            <div className="DexSwap__Price">
              <span>{getLang('dex_price')}</span>
              <span>
                {getFinePrice(
                  swapAction.isRateReverse
                    ? 1 / swapAction.rate
                    : swapAction.rate
                )}
                &nbsp;
                {(swapAction.isRateReverse ? swap.fiat : swap.coin).symbol}
                &nbsp;
                {getLang('dex_per')}
                &nbsp;
                {(swapAction.isRateReverse ? swap.coin : swap.fiat).symbol}
              </span>
              <div
                className="DexSwap__Price-swap"
                onClick={() =>
                  swapAction.setIsRateReverse(!swapAction.isRateReverse)
                }
              >
                <SVG src={require('src/asset/icons/swap.svg')} />
              </div>
            </div>
          )}
          {button}

          {(!!Number(swapAction.inAmountMax) ||
            !!Number(swapAction.outAmountMin)) && (
            <DexDescription>
              <DexDescription.Item>
                <span>
                  {swap.isExactOut
                    ? getLang('dex_maximum_spend')
                    : getLang('dex_minimum_receive')}
                  <HoverPopup
                    content={
                      <div className="DexSwap__hint">
                        {getLang('dex_notice_price_movement')}
                      </div>
                    }
                  >
                    <SVG
                      src={require('src/asset/icons/cabinet/question-icon.svg')}
                      className="FarmingTableItem__action_icon"
                    />
                  </HoverPopup>
                </span>
                <span>
                  <NumberFormat
                    number={
                      swapAction.isExactOut
                        ? swapAction.inAmountMax
                        : swapAction.outAmountMin
                    }
                  />
                  &nbsp;
                  {swapAction.isExactOut
                    ? swap.fiat?.symbol
                    : swap.coin?.symbol}
                </span>
              </DexDescription.Item>
              {/* <DexDescription.Item>
                <span>
                  {getLang('dex_price_impact')}
                  <HoverPopup
                    content={
                      <div className="DexSwap__hint">
                        {getLang('dex_price_impact_hint')}
                      </div>
                    }
                    type="top"
                  >
                    <SVG
                      src={require('src/asset/icons/cabinet/question-icon.svg')}
                      className="FarmingTableItem__action_icon"
                    />
                  </HoverPopup>
                </span>
                <span className={priceImpactColor}>
                  {priceImpactNumber.toFixed(2)}%
                </span>
              </DexDescription.Item>
              <DexDescription.Item>
                <span>{getLang('dex_liquidity_fee')}</span>
                <span>
                  {getFinePrice(fee)} {_.get(this.state, 'pair[0].symbol', '')}
                </span>
              </DexDescription.Item> */}
            </DexDescription>
          )}

          {swap.isSelectFiat && (
            <CabinetModal onClose={() => swap.setIsSelectFiat(false)}>
              <TokenSelect
                onChange={swap.handleFiatChange}
                onClose={() => swap.setIsSelectFiat(false)}
                selected={swap.fiat}
                commonBases={context.network.commonBases}
                isAdaptive={isAdaptive}
                {...context}
                defaultList="fiats"
                tokens={[...coins]}
                fiats={fiatTokens}
                loadAccountBalances={context.loadAccountBalances}
              />
            </CabinetModal>
          )}
          {swap.isSelectCoin && (
            <CabinetModal onClose={() => swap.setIsSelectCoin(false)}>
              <TokenSelect
                onChange={swap.handleCoinChange}
                onClose={() => swap.setIsSelectCoin(false)}
                selected={swap.coin}
                commonBases={context.network.commonBases}
                isAdaptive={isAdaptive}
                {...context}
                tokens={[...coins]}
                fiats={fiatTokens}
                loadAccountBalances={context.loadAccountBalances}
              />
            </CabinetModal>
          )}
          {isSettings && (
            <DexSettingsModal
              slippageTolerance={swapAction.slippage}
              deadline={swapAction.deadline}
              setSlippage={swapAction.setSlippage}
              setDeadline={swapAction.setDeadline}
              onClose={() => setIsSettings(false)}
              showTitle={true}
            />
          )}
        </div>
      </CabinetBlock>
      {!!swapAction.path && !!swapAction.path.length && (
        <DexRoute
          tokens={[...fiatTokens, ...coins]}
          route={swapAction.path.map((token) => token.symbol)}
        />
      )}
    </div>
  );
};

const DexSwapWrapper = (props) => {
  const exchanger = useExchanger();

  return <DexSwap {...exchanger} {...props} />;
};

export default DexSwapWrapper;
