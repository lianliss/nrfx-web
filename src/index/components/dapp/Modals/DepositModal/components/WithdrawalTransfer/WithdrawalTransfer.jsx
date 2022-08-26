import React from 'react';

// Components
import DepositModal from '../../DepositModal';
import { Button, Col } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Styles
import './WithdrawalTransfer.less';

function WithdrawalTransfer(props) {
  return (
    <DepositModal
      className="DepositModal__WithdrawalTransfer"
      {...props}
      closeOfRef
    >
      <Col
        className="DepositModal__WithdrawalTransfer-content"
        alignItems="center"
      >
        <h3 className="DepositModal__WithdrawalTransfer__title">
          Your order has been accepted, please wait for funds to arrive
        </h3>
        <span className="DepositModal__WithdrawalTransfer__icon">
          <SVG
            src={require('src/asset/icons/transaction/isInProgress-selected-time.svg')}
          />
        </span>
        <p className="DepositModal__WithdrawalTransfer__subtitle">
          If the funds are not received within 30 minutes, contact the buyer
          via:
        </p>
        <Button size="middle" type="secondary-alice" shadow>
          Telegram
        </Button>
        <Button size="middle" type="secondary-alice" shadow>
          Online chat
        </Button>
        <Button
          size="extra_large"
          type="lightBlue"
          shadow
          onClick={props.onClose}
        >
          Ok
        </Button>
      </Col>
    </DepositModal>
  );
}

export default WithdrawalTransfer;
