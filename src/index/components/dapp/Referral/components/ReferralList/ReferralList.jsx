import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Row, Col, NumberFormat } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Styles
import './ReferralList.less';

const testItems = [
  { login: 'Login 1', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 2', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 3', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 4', total: { nrfx: '2121212', usd: '21122212121111' } },
  { login: 'Login 5', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 6', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 7', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 8', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 9', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 10', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212122', usd: '21211' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
  { login: 'Login 11', total: { nrfx: '212', usd: '21' } },
];

function ReferralList({ title, subtitle, items }) {
  const [visibleNumber, setVisibleNumber] = React.useState(10);

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
          <>
            <Col className="Referral__ReferralList__items-exists">
              <Row justifyContent="space-between" className="title-row">
                <Col>Partner</Col>
                <Col>Total NRFX earned</Col>
                <Col>Total Fiat earned</Col>
              </Row>
              {items.slice(0, visibleNumber).map((item, index) => (
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
            <Row alignItems="center" className="smoothShow">
              {visibleNumber <= items.length && (
                <div
                  onClick={() => {
                    setVisibleNumber((prevState) => prevState + 10);
                  }}
                  className="show-more"
                >
                  <span>Show more</span>
                  <SVG
                    src={require('src/asset/icons/arrows/form-dropdown.svg')}
                  />
                </div>
              )}
            </Row>
          </>
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
