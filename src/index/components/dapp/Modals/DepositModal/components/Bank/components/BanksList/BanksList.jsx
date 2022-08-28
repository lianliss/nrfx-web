import React from 'react';
import PropTypes from 'prop-types';

import CabinetScrollBlock from 'src/index/components/dapp/CabinetScrollBlock/CabinetScrollBlock';
import { Row, Col } from 'src/ui';
import SVG from 'utils/svg-wrap';

import './BanksList.less';

function BanksList({ items, onChange, adaptive, scrollEverywhere }) {
  const BanksWrapper =
    items.length > 5 && (!adaptive || scrollEverywhere)
      ? CabinetScrollBlock
      : Col;

  return (
    <BanksWrapper className="DepositModal__ChooseBank-items" noScrollX>
      {items.map((bank, key) => {
        let icon = null;

        try {
          icon = require(`src/asset/banks/${bank.code}.svg`).default;
        } catch {
          console.log('[BankList] Logo is not defined');
        }

        return (
          <Row
            className="DepositModal__ChooseBank-item"
            alignItems="center"
            onClick={() => onChange(bank)}
            key={key}
          >
            <div>
              <img src={icon} alt={bank.name} className="bankIcon" />
            </div>
            <Row alignItems="center" justifyContent="flex-end">
              <span className="secondary extra-small default">{bank.name}</span>
              <SVG src={require('src/asset/icons/list-arrow-large.svg')} />
            </Row>
          </Row>
        );
      })}
    </BanksWrapper>
  );
}

BanksList.propTypes = {
  items: PropTypes.array,
  onChange: PropTypes.func,
  adaptive: PropTypes.bool,
  scrollEverywhere: PropTypes.bool,
};

BanksList.defaultProps = {
  items: [],
  onChange: () => {},
  adaptive: false,
  scrollEverywhere: false,
};

export default BanksList;
