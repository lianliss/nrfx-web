import React from 'react';
import PropTypes from 'prop-types';
import getFinePrice from 'src/utils/get-fine-price';
import { getLang } from 'utils';

// Components
import { Row, Col, NumberFormat } from 'src/ui';
import SVG from 'utils/svg-wrap';
import CabinetTable, { TD, TR } from '../../../CabinetTable/CabinetTable';

// Styles
import './ReferralList.less';

const testItems = [
  {
    login: 'Login 1',
    account: '124124214124124',
    amount: 123123,
    currency: 'RUB',
  },
  {
    login: 'Login 1',
    account: '124124214124124',
    amount: 123123,
    currency: 'RUB',
  },
  {
    login: 'Login 1',
    account: '124124214124124',
    amount: 123123,
    currency: 'RUB',
  },
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
              <CabinetTable
                header={
                  <TR>
                    <TD>{getLang('dapp_partner')}</TD>
                    <TD>{getLang('dapp_referral_total_currency_earned')}</TD>
                    <TD>
                      USD {getLang('dapp_global_equivalent').toLowerCase()}
                    </TD>
                  </TR>
                }
              >
                {rewards.slice(0, visibleNumber).map((item, index) => (
                  <TR
                    custom
                    background={
                      index === 0 || index % 2 === 0 ? '#fff' : 'transparent'
                    }
                    key={`${item.login}${index}`}
                  >
                    <TD
                      color="gray"
                      type="small"
                      dataLabel={getLang('dapp_partner')}
                    >
                      {item.account}
                    </TD>
                    <TD
                      dataLabel={getLang('dapp_referral_total_currency_earned')}
                    >
                      {getFinePrice(item.amount)} {item.currency}
                    </TD>
                    <TD
                      color="gray"
                      dataLabel={`USD ${getLang(
                        'dapp_global_equivalent'
                      ).toLowerCase()}`}
                    >
                      {getFinePrice(getUsdPrice(item.amount, item.currency))}{' '}
                      USD
                    </TD>
                  </TR>
                ))}
              </CabinetTable>
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
  items: [],
};

export default ReferralList;
