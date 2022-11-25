import React from 'react';

// Components
import { CabinetModal, CustomButton, AnswerPopup } from 'dapp';
import { Col, Row, Button, NumberFormat } from 'ui';
import Currency from './components/Currency/Currency';
import DexDescription from 'dapp/DexDescription/DexDescription.jsx';
import SVG from 'utils/svg-wrap';

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
          <span>You give</span>
          <Currency name="ethereum" currency="NRFX" amount={14293123.13123} />
        </Col>
        <Col className="ExchangerModal__Currency__container">
          <span>You receive</span>
          <Currency name="ethereum" currency="USDT" amount={14293123.13123} />
        </Col>
        <div className="ExchangerModal__rate">
          <ListItem
            title="Exchange rate"
            value={
              <>
                <span>0.0545 USD per NTFX</span>
                <SwapButton />
              </>
            }
          />
        </div>
        <Button type="lightBlue" size="extra_large" className="exchange">
          Exchange
        </Button>
        <DexDescription>
          <DexDescription.Item>
            <div>
              Minimum received
              <AnswerPopup>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem
                ipsum dolor sit amet, consectetur adipiscing elit
              </AnswerPopup>
            </div>
            <span>
              $<NumberFormat number={45.55} />
            </span>
          </DexDescription.Item>
          <DexDescription.Item>
            <div>
              Price Impact
              <AnswerPopup>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem
                ipsum dolor sit amet, consectetur adipiscing elit
              </AnswerPopup>
            </div>
            <span>
              <NumberFormat number={14.54} percent />
            </span>
          </DexDescription.Item>
          <DexDescription.Item>
            <div>
              Trade fee
              <AnswerPopup>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem
                ipsum dolor sit amet, consectetur adipiscing elit
              </AnswerPopup>
            </div>
            <span>$00.55 - BNB557483875475</span>
          </DexDescription.Item>
        </DexDescription>
      </div>
    </CabinetModal>
  );
}

export default Exchanger;
