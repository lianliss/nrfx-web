import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Row, Col, NumberFormat } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Styles
import './ReferralList.less';

const testItems = [
  { login: 'Login', total: { nrfx: '212', usd: '21' } },
  { login: 'Login', total: { nrfx: '212', usd: '21' } },
  { login: 'Login', total: { nrfx: '212', usd: '21' } },
  { login: 'Login', total: { nrfx: '212', usd: '21' } },
  { login: 'Login', total: { nrfx: '212', usd: '21' } },
];

function ReferralList({ title, subtitle, items }) {
  return (
    <div className="Referral__ReferralList">
      <Row alignItems="flex-end" justifyContent="space-between">
        <Col>
          <h2>{title}</h2>
          <p className="subtitle">{subtitle}</p>
        </Col>
      </Row>
      <Col className="Referral__ReferralList__items">
        {!items.length ? (
          <Row justifyContent="center">
            <Col
              className="Referral__ReferralList__items-empty"
              alignItems="center"
            >
              <div className="logo">
                <SVG src={require('src/asset/icons/narfex/white-icon.svg')} />
              </div>
              <p>No Data</p>
            </Col>
          </Row>
        ) : (
          <Col className="Referral__ReferralList__items-exists">
            <Row justifyContent="space-between" className="title-row">
              <Col>Partner</Col>
              <Col>Total NRFX earned</Col>
              <Col>Total Fiat earned</Col>
            </Row>
            {items.map((item, index) => (
              <Row
                justifyContent="space-between"
                alignItems="center"
                key={item.login + index}
              >
                <Col>{item.login}</Col>
                <Col>
                  <NumberFormat number={item.total.nrfx} currency="nrfx" />
                </Col>
                <Col>
                  <NumberFormat number={item.total.usd} currency="usd" />
                </Col>
              </Row>
            ))}
          </Col>
        )}
      </Col>
    </div>
  );
}

ReferralList.propTypes = {
  items: PropTypes.array,
};

ReferralList.defaultProps = {
  items: testItems,
};

export default ReferralList;
