import React from 'react';

import { Col, Row } from 'ui';
import { Select, AnswerPopup } from 'dapp';
import InputColumn from '../InputColumn/InputColumn';

function MoreInformation() {
  return (
    <>
      <h2>More information</h2>
      <Col className="more-information">
        <div className="more-information__item">
          <Row className="ValidatorTradeForm-row">
            <Col className="ValidatorTradeForm-col">
              <div className="ValidatorTradeForm-col__title">
                <h3>Currency</h3>
              </div>
              <Select
                value={'light'}
                onChange={() => {}}
                options={[
                  { value: 'light', label: 'Light' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'dark', label: 'Dark' },
                ]}
                type="simple"
                indicatorIcon={require('src/asset/icons/arrows/form-dropdown.svg')}
              />
            </Col>
            <InputColumn
              title="Bank name"
              description="Lorem ipsum dolor
            sit amet consectetur adipisicing
            elit. Quis quidem
            explicabo alias."
              placeholder="0"
              indicator="%"
            />
            <InputColumn
              title="Margin"
              description="Lorem ipsum dolor
            sit amet consectetur adipisicing
            elit. Quis quidem
            explicabo alias."
              placeholder="0"
              indicator="%"
            />
          </Row>
        </div>
        <div className="more-information__item">
          <Row className="ValidatorTradeForm-row">
            <Col className="ValidatorTradeForm-col">
              <div className="ValidatorTradeForm-col__title">
                <h3>Price equation</h3>
                <AnswerPopup>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
                  blanditiis cum tenetur.
                </AnswerPopup>
              </div>
              <Select
                value={'BTC/USD'}
                onChange={() => {}}
                options={[
                  { value: 'BTC/USD', label: 'BTC/USD' },
                  { value: 'RUB/NRFX', label: 'RUB/NRFX' },
                  { value: 'USD/BTC', label: 'BTC/USD' },
                ]}
                type="simple"
                indicatorIcon={require('src/asset/icons/arrows/form-dropdown.svg')}
              />
            </Col>
            <InputColumn
              title="Min. transaction limit"
              description="Lorem ipsum dolor
            sit amet consectetur adipisicing
            elit. Quis quidem
            explicabo alias."
              placeholder="0"
              indicator="USD"
            />
            <InputColumn
              title="Max. transaction limit"
              description="Lorem ipsum dolor
            sit amet consectetur adipisicing
            elit. Quis quidem
            explicabo alias."
              placeholder="0"
              indicator="USD"
            />
          </Row>
          <p className="trade-price">
            Trade price with current market value
            <br />
            <strong>16,190.20 USD / BTC</strong>
          </p>
        </div>
        <div className="more-information__item">
          <div className="ValidatorTradeForm-col__title">
            <h3>Opening hours</h3>
            <AnswerPopup>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
              blanditiis cum tenetur.
            </AnswerPopup>
          </div>
          <Row className="ValidatorTradeForm-row"></Row>
          <Row className="ValidatorTradeForm-row"></Row>
        </div>
      </Col>
    </>
  );
}

export default MoreInformation;
