import React from 'react';
import PropTypes from 'prop-types';
import getFinePrice from 'src/utils/get-fine-price';
import { getLang } from 'utils';

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
];

function ReferralList(params) {
  const { title, subtitle, items, rewards, getUsdPrice } = params;
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
        {!rewards.length ? (
          <Row justifyContent="center">
            <Col
              className="Referral__ReferralList__items-empty"
              alignItems="center"
            >
              <div className="logo">
                <SVG src={require('src/asset/icons/narfex/white-icon.svg')} />
              </div>
              <p>{getLang('dapp_global_no_data')}</p>
            </Col>
          </Row>
        ) : (
          <>
            <Col className="Referral__ReferralList__items-exists">
              <Row justifyContent="space-between" className="title-row">
                <Col>{getLang('dapp_partner')}</Col>
                <Col>{getLang('dapp_referral_total_currency_earned')}</Col>
                <Col>USD {getLang('dapp_global_equivalent').toLowerCase()}</Col>
              </Row>
              {rewards.slice(0, visibleNumber).map((item, index) => (
                <Row
                  justifyContent="space-between"
                  alignItems="center"
                  key={item.login + index}
                >
                  <Col>{item.account}</Col>
                  <Col>
                    {getFinePrice(item.amount)} {item.currency}
                  </Col>
                  <Col>
                    {getFinePrice(getUsdPrice(item.amount, item.currency))} USD
                  </Col>
                </Row>
              ))}
            </Col>
            <Row alignItems="center" className="smoothShow">
              {visibleNumber <= rewards.length && (
                <div
                  onClick={() => {
                    setVisibleNumber((prevState) => prevState + 10);
                  }}
                  className="show-more"
                >
                  <span>{getLang('site__technologyReadMore')}</span>
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
