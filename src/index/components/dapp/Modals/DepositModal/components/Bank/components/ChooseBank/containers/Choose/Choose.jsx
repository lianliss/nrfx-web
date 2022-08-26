import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Button } from 'src/ui';
import SVG from 'utils/svg-wrap';
import Lang from 'src/components/Lang/Lang';
import BanksList from '../../../BanksList/BanksList';
import { classNames } from 'src/utils';

import './Choose.less';

function Choose({ items, onChange, onBack, adaptive, type }) {
  const className = classNames({
    DepositModal__ChooseBank: true,
    [type]: type,
  });

  return (
    <Col className={className}>
      {items.length ? (
        <>
          <Row
            alignItems="center"
            justifyContent="space-between"
            className="DepositModal__ChooseBank__title"
          >
            <h3 className="default dark medium">
              <Lang name="cabinet_fiatWithdrawalModal_chooseBank" />
            </h3>
            {type === 'withdrawal' && (
              <span
                className="DepositModal__ChooseBank__close"
                onClick={onBack}
              >
                <SVG src={require('src/asset/icons/close-popup.svg')} />
              </span>
            )}
          </Row>
          {items ? (
            <BanksList
              adaptive={adaptive}
              onChange={(b) => onChange(b.code)}
              items={items}
              scrollEverywhere={type === 'withdrawal'}
            />
          ) : (
            <LoadingStatus status={'loading'} />
          )}
        </>
      ) : (
        <div className="DepositModal__ChooseBank__empty">
          <h3 className="default blue extra-large-height">
            <Lang name="fiatRefillCard_status_not_available_cards" />
          </h3>
          <SVG src={require('src/asset/icons/transaction/empty-icon.svg')} />
        </div>
      )}
      {type !== 'withdrawal' && (
        <Row className="buttons" justifyContent="flex-end">
          <Button type="secondary-alice" shadow onClick={onBack}>
            <Lang name="global_back" />
          </Button>
        </Row>
      )}
    </Col>
  );
}

Choose.propTypes = {
  items: PropTypes.array,
  onChange: PropTypes.func,
  adaptive: PropTypes.bool,
  type: PropTypes.oneOf(['refill', 'withdrawal']),
  onBack: PropTypes.func,
};

Choose.defaultProps = {
  items: [],
  onChange: () => {},
  adaptive: false,
  type: 'refill',
  onBack: () => {},
};

export default Choose;
