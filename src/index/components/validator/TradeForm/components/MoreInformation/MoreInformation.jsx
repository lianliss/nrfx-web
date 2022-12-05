import React from 'react';

// Components
import { Col, Row } from 'ui';
import { Select } from 'dapp';
import InputColumn from '../InputColumn/InputColumn';
import OpeningHours from '../OpeningHours/OpeningHours';
import ColumnTitle from '../ColumnTitle/ColumnTitle';
import Column from '../Column/Column';

// Utils
import defaultAnswer from '../../constants/defaultAnswer';

function MoreInformation() {
  return (
    <>
      <h2>More information</h2>
      <Col className="more-information">
        <div className="more-information__item">
          <Row className="ValidatorTradeForm-row">
            <Column>
              <ColumnTitle title="Currency" />
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
            </Column>
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
            <Column>
              <ColumnTitle title="Price equation" description={defaultAnswer} />
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
            </Column>
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
        <OpeningHours />
      </Col>
    </>
  );
}

export default MoreInformation;
