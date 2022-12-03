import React from 'react';

import { Col, Row, Radio, Input, RadioGroup } from 'ui';
import { AnswerPopup } from 'dapp';

function TradeType() {
  const [tradeType, setTradeType] = React.useState('sell');

  return (
    <>
      <h2>Trade type</h2>
      <Row className="ValidatorTradeForm-row trade-type">
        <Col className="ValidatorTradeForm-col">
          <Row className="ValidatorTradeForm-col__title" alignItems="center">
            <h3>I want to...</h3>
            <AnswerPopup>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              quidem explicabo alias.
            </AnswerPopup>
          </Row>
          <RadioGroup selected={tradeType} onChange={setTradeType}>
            <Radio size="small" type="light-blue" value="sell">
              Sell bitcoins online
            </Radio>
            <Radio size="small" type="light-blue" value="buy">
              Buy bitcoins online
            </Radio>
          </RadioGroup>
        </Col>
        <Col className="ValidatorTradeForm-col">
          <Row className="ValidatorTradeForm-col__title" alignItems="center">
            <h3>Location</h3>
            <AnswerPopup>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              quidem explicabo alias.
            </AnswerPopup>
          </Row>
          <Input placeholder="Enter a location" />
        </Col>
        <Col className="ValidatorTradeForm-col"></Col>
      </Row>
    </>
  );
}

export default TradeType;
