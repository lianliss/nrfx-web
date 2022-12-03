import React from 'react';

import { Col, Row } from 'ui';
import { Select, AnswerPopup } from 'dapp';
import InputColumn from '../InputColumn/InputColumn';

function MoreInformation() {
  return (
    <>
      <h2>More information</h2>
      <Col className="more-information">
        <Row className="ValidatorTradeForm-row">
          <Col className="ValidatorTradeForm-col">
            <Row className="ValidatorTradeForm-col__title" alignItems="center">
              <h3>Currency</h3>
            </Row>
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
        <Row className="ValidatorTradeForm-row">
          <Col className="ValidatorTradeForm-col">
            <Row className="ValidatorTradeForm-col__title" alignItems="center">
              <h3>Price equation</h3>
              <AnswerPopup>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
                blanditiis cum tenetur.
              </AnswerPopup>
            </Row>
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
            title="Bank name"
            description="Lorem ipsum dolor
            sit amet consectetur adipisicing
            elit. Quis quidem
            explicabo alias."
            placeholder="0"
            indicator="%"
          />
          <InputColumn
            title="Bank name"
            description="Lorem ipsum dolor
            sit amet consectetur adipisicing
            elit. Quis quidem
            explicabo alias."
            placeholder="0"
            indicator="%"
          />
        </Row>
      </Col>
    </>
  );
}

export default MoreInformation;
