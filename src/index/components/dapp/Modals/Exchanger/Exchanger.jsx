import React from 'react';

// Components
import { CabinetModal, CustomButton, AnswerPopup } from 'dapp';
import { Col, Row, Button, NumberFormat } from 'ui';
import Currency from './components/Currency/Currency';
import DexDescription from 'dapp/DexDescription/DexDescription.jsx';
import ExchangeRoute from './components/ExchangeRoute/ExchangeRoute';
import SVG from 'utils/svg-wrap';

// Utils
import { getLang } from 'utils';

// Styles
import './Exchanger.less';

function Exchanger({ ...props }) {
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
    <CustomButton className="swap">
      <SVG src={require('src/asset/icons/swap.svg')} />
    </CustomButton>
  );

  return (
    <CabinetModal className="ExchangerModal" closeOfRef closeButton {...props}>
      <div className="ExchangerModal__container">
        <h3>Exchange</h3>
        <Col className="ExchangerModal__Currency__container">
          <span>{getLang('dapp_exchanger_you_give')}</span>
          <Currency name="ethereum" currency="NRFX" amount={14293123.13123} />
        </Col>
        <Col className="ExchangerModal__Currency__container">
          <span>{getLang('dapp_exchanger_you_receive')}</span>
          <Currency name="ethereum" currency="USDT" amount={14293123.13123} />
        </Col>
        <div className="ExchangerModal__rate">
          <ListItem
            title={getLang('dapp_exchange_rate')}
            value={
              <>
                <span>
                  0.0545 USD {getLang('dapp_global_per').toLowerCase()} NTFX
                </span>
                <SwapButton />
              </>
            }
          />
        </div>
        <Button type="lightBlue" size="extra_large" className="exchange">
          {getLang('dapp_exchanger_exchange_button')}
        </Button>
        <DexDescription>
          <DexDescription.Item>
            <div>
              {getLang('dex_minimum_receive')}
              <AnswerPopup>{getLang('dex_notice_price_movement')}</AnswerPopup>
            </div>
            <span>
              $<NumberFormat number={45.55} />
            </span>
          </DexDescription.Item>
          <DexDescription.Item>
            <div>
              {getLang('dex_price_impact')}
              <AnswerPopup>{getLang('dex_price_impact_hint')}</AnswerPopup>
            </div>
            <span>
              <NumberFormat number={14.54} percent />
            </span>
          </DexDescription.Item>
          <DexDescription.Item>
            <div>
              {getLang('dex_trade_fee')}
              {/* <AnswerPopup>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem
                ipsum dolor sit amet, consectetur adipiscing elit
              </AnswerPopup> */}
            </div>
            <span>$00.55 - BNB557483875475</span>
          </DexDescription.Item>
        </DexDescription>
        <ExchangeRoute
          route={['NRFX', 'USDT', 'BNB', 'BUSD', 'NRFX', 'USDT', 'BNB', 'BUSD']}
        />
      </div>
    </CabinetModal>
  );
}

export default Exchanger;
