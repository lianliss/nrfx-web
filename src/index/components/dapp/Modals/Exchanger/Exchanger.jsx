import React from 'react';

// Components
import { CabinetModal, CustomButton, AnswerPopup } from 'dapp';
import { Col, Row, Button, NumberFormat } from 'ui';
import Currency from './components/Currency/Currency';
import DexDescription from 'dapp/DexDescription/DexDescription.jsx';
import ExchangeRoute from './components/ExchangeRoute/ExchangeRoute';
import ExchangerSettings from './components/ExchangerSettings/ExchangerSettings';
import SVG from 'utils/svg-wrap';

// Utils
import _ from 'lodash';
import { getLang } from 'utils';
import { useSelector } from 'react-redux';
import getFinePrice from 'utils/get-fine-price';
import { useSwapAction } from 'src/hooks/dapp/useSwap';

// Styles
import './Exchanger.less';

function Exchanger({ ...props }) {
  const adaptive = useSelector((state) => state.default.adaptive);
  const { fiat, coin, fiatAmount, coinAmount, isExactOut } = props;
  const swapAction = useSwapAction({
    fiat,
    coin,
    fiatAmount,
    coinAmount,
    isExactOut,
  });

  const ListItem = ({ title, value }) => (
    <Row
      className="ExchangerModal-ListItem"
      justifyContent="space-between"
      alignItems="center"
    >
      <div className="ExchangerModal-ListItem__title">{title}</div>
      <div className="ExchangerModal-ListItem__value">{value}</div>
    </Row>
  );

  const SwapButton = () => (
    <CustomButton
      onClick={() => swapAction.setIsRateReverse(!swapAction.isRateReverse)}
      className="swap"
    >
      <SVG src={require('src/asset/icons/swap.svg')} />
    </CustomButton>
  );

  return (
    <CabinetModal className="ExchangerModal" closeOfRef closeButton {...props}>
      <div className="ExchangerModal__container">
        <h3>Exchange</h3>
        <Col className="ExchangerModal__Currency__container">
          <span>{getLang('dapp_exchanger_you_give')}</span>
          <Currency
            adaptive={adaptive}
            name={swapAction.networkName}
            currency={swapAction.fiat}
            amount={swapAction.inAmount}
          />
        </Col>
        <Col className="ExchangerModal__Currency__container">
          <span>{getLang('dapp_exchanger_you_receive')}</span>
          <Currency
            adaptive={adaptive}
            name={swapAction.networkName}
            currency={swapAction.coin}
            amount={swapAction.outAmount}
          />
        </Col>
        <div className="ExchangerModal__rate">
          <ListItem
            title={getLang('dapp_exchange_rate')}
            value={
              <>
                <span>
                  {getFinePrice(
                    swapAction.isRateReverse
                      ? 1 / swapAction.rate
                      : swapAction.rate
                  )}
                  &nbsp;
                  {
                    (swapAction.isRateReverse
                      ? swapAction.fiat
                      : swapAction.coin
                    ).symbol
                  }
                  &nbsp;{getLang('dapp_global_per').toLowerCase()}
                  &nbsp;
                  {
                    (swapAction.isRateReverse
                      ? swapAction.coin
                      : swapAction.fiat
                    ).symbol
                  }
                </span>
                <SwapButton />
              </>
            }
          />
        </div>
        <div>
          {!swapAction.isAvailable && (
            <Button
              type="lightBlue"
              size="extra_large"
              onClick={() => swapAction.approve()}
              state={swapAction.isApproving ? 'loading' : ''}
              className="exchange"
            >
              Approve
            </Button>
          )}
          <Button
            type="lightBlue"
            size="extra_large"
            onClick={() => swapAction.swap()}
            disabled={!swapAction.isAvailable}
            state={swapAction.isProcess ? 'loading' : ''}
            className="exchange"
          >
            {getLang('dapp_exchanger_exchange_button')}
          </Button>
        </div>
        <DexDescription>
          <DexDescription.Item>
            <div>
              {getLang(
                swapAction.isExactOut
                  ? 'dex_maximum_spend'
                  : 'dex_minimum_receive'
              )}
              <AnswerPopup>{getLang('dex_notice_price_movement')}</AnswerPopup>
            </div>
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
                ? swapAction.fiat.symbol
                : swapAction.coin.symbol}
            </span>
          </DexDescription.Item>
          <DexDescription.Item>
            <div>
              {getLang('dex_price_impact')}
              <AnswerPopup>{getLang('dex_price_impact_hint')}</AnswerPopup>
            </div>
            <span className={swapAction.priceImpactColor}>
              <NumberFormat
                number={swapAction.priceImpactPercents.toFixed(2)}
                percent
              />
            </span>
          </DexDescription.Item>
          {/*<DexDescription.Item>*/}
          {/*<div>*/}
          {/*{getLang('dex_trade_fee')}*/}
          {/*/!* <AnswerPopup>*/}
          {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem*/}
          {/*ipsum dolor sit amet, consectetur adipiscing elit*/}
          {/*</AnswerPopup> *!/*/}
          {/*</div>*/}
          {/*<span>$00.55 - BNB557483875475</span>*/}
          {/*</DexDescription.Item>*/}
        </DexDescription>
        <ExchangeRoute route={swapAction.path.map((token) => token.symbol)} />
        <ExchangerSettings
          {...{
            slippage: swapAction.slippage,
            setSlippage: swapAction.setSlippage,
            deadline: swapAction.deadline,
            setDeadline: swapAction.setDeadline,
          }}
        />
      </div>
    </CabinetModal>
  );
}

export default Exchanger;
