import React from 'react';

// Components
import { Form, Radio, RadioGroup, Col, Row } from 'ui';
import { AnswerPopup } from 'dapp';

// Utils

// Styles
import './TradeForm.less';

function TradeForm() {
  const [tradeType, setTradeType] = React.useState('sell');

  return (
    <Form className="ValidatorTradeForm">
      <h2>Trade type</h2>
      <Row className="ValidatorTradeForm-row">
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
      </Row>
    </Form>
  );
}

export default TradeForm;
