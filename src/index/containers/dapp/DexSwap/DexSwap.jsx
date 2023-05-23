import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { setSwap } from 'src/actions/dapp/swap';

// Components
import { Button, HoverPopup } from 'src/ui';
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
import useSwap from 'src/hooks/dapp/useSwap';

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
        button = (
          <>
            {/* {!swap.isAvailable && (
              <Button
                type={swap.isAvailable ? 'secondary' : 'lightBlue'}
                state={swap.isApproving ? 'loading' : ''}
                onClick={this.approve.bind(this)}
              >
                Approve
              </Button>
            )} */}
            <Button
              type="lightBlue"
              disabled={!swap.fiatAmount || !swap.coinAmount}
              state={swap.isProcessing ? 'loading' : ''}
              className="DexSwap__button-swap"
              onClick={() =>
                openStateModal('exchanger', {
                  isExactOut: swap.isExactOut,
                  fiat: swap.fiat,
                  coin: swap.coin,
                  fiatAmount: swap.fiatAmount,
                  coinAmount: swap.coinAmount,
                })
              }
            >
              <SVG src={require('src/asset/icons/convert-card.svg')} />
              {/* {priceImpactNumber >= 5
                ? getLang('dex_button_swap_anyway')
                : getLang('dex_button_buy')} */}
              {swap.isNoLiquidity
                ? 'No liquidity found'
                : getLang('dapp_exchanger_exchange_button')}
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
              'dex_pay_exact' || !exactIndex
                ? 'dex_pay_exact'
                : 'dex_pay_around'
            )}
            manage={
              <div
                className="DexSwap__manage"
                onClick={() => this.setState({ isSettings: true })}
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
              'dex_receive_around' || exactIndex
                ? 'dex_receive_exact'
                : 'dex_receive_around'
            )}
          />
          {/* {!!Number(executionPrice) && (
            <div className="DexSwap__Price">
              <span>{getLang('dex_price')}</span>
              <span>
                {getFinePrice(
                  Number(isSwappedPrice ? 1 / executionPrice : executionPrice)
                )}
                &nbsp;
                {pair[Number(!isSwappedPrice)].symbol} {getLang('dex_per')}{' '}
                {pair[Number(isSwappedPrice)].symbol}
              </span>
              <div
                className="DexSwap__Price-swap"
                onClick={() =>
                  this.setState({ isSwappedPrice: !isSwappedPrice })
                }
              >
                <SVG src={require('src/asset/icons/swap.svg')} />
              </div>
            </div>
          )} */}
          {button}

          {/* {!!this.trade && !!Number(swap.fiatAmount) && (
            <DexDescription>
              <DexDescription.Item>
                <span>
                  {isExactIn
                    ? getLang('dex_minimum_receive')
                    : getLang('dex_maximum_spend')}
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
                  {getFinePrice(
                    Number(
                      significant(isExactIn ? minimumReceive : maximumSpend)
                    )
                  )}
                  &nbsp;
                  {pair[Number(!exactIndex)].symbol}
                </span>
              </DexDescription.Item>
              <DexDescription.Item>
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
              </DexDescription.Item>
            </DexDescription>
          )} */}

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
          {/* {isSettings && (
            <DexSettingsModal
              slippageTolerance={this.state.slippageTolerance}
              deadline={this.state.deadline}
              setSlippage={(value) =>
                this.setState({ slippageTolerance: value })
              }
              setDeadline={(value) => this.setState({ deadline: value })}
              onClose={() => this.setState({ isSettings: false })}
              showTitle={true}
            />
          )} */}
        </div>
      </CabinetBlock>
      {/* {!!route && !!route.length && <DexRoute tokens={tokens} route={route} />} */}
    </div>
  );
};

const DexSwapWrapper = (props) => {
  const exchanger = useExchanger();

  return <DexSwap {...exchanger} {...props} />;
};

export default DexSwapWrapper;
