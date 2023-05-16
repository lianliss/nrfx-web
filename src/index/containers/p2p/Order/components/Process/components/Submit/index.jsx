import React from 'react';
import PropTypes from 'prop-types';

import { Button, Row, Timer } from 'ui';
import { CustomButton, AnswerPopup } from 'dapp';
import { orderProcesses as processes } from 'src/index/constants/dapp/types';

const TransactionTime = () => (
  <Row className="malibu-color malibu-text">
    Transaction issue; appeal after (
    <Timer time={new Date(new Date().getTime() + 1 * 60 * 1000)} hideHours />)
  </Row>
);

const ButtonsWrapper = ({ children, gap }) => (
  <Row className="p2p-order-process__buttons" alignItems="center" gap={gap}>
    {children}
  </Row>
);

function Submit({
  process,
  adaptive,
  onNotifySeller,
  onPaymentReceived,
  onCancel,
}) {
  let component = <></>;

  const CancelOrderButton = ({ type = 'default' }) => {
    if (type === 'custom-malibu') {
      return (
        <CustomButton className="malibu-color malibu-text" onClick={onCancel}>
          <span>Cancel Order</span>
        </CustomButton>
      );
    }

    return (
      <Button type="secondary-light" onClick={onCancel}>
        <span className="light-blue-gradient-color">Cancel Order</span>
      </Button>
    );
  };

  switch (process) {
    case processes.buy.payment:
      component = (
        <>
          <div className="p2p-order-process-submit__header">
            <Row className="p2p-order-process__title">
              <h5>
                After transferring the funds, click on the “Transferred, notify
                seller” button.
                <AnswerPopup>Answer</AnswerPopup>
              </h5>
            </Row>
          </div>
          <ButtonsWrapper gap={15}>
            <Button type="lightBlue" onClick={onNotifySeller}>
              <span>Transferred notify seller</span>
            </Button>
            <CancelOrderButton />
          </ButtonsWrapper>
        </>
      );
      break;
    case processes.buy.pending:
      component = (
        <ButtonsWrapper gap="15px 0">
          <TransactionTime />
          <CancelOrderButton type={adaptive ? 'default' : 'custom-malibu'} />
        </ButtonsWrapper>
      );
      brak;
    case processes.sell.releasing:
      component = (
        <>
          <div className="p2p-order-process-submit__header">
            <Row className="p2p-order-process__title">
              <h5>
                After confirming the payment, be sure to click the “Payment
                received” button.
                <AnswerPopup>Answer</AnswerPopup>
              </h5>
            </Row>
          </div>
          <ButtonsWrapper gap="0 15px">
            <Button type="lightBlue" onClick={onPaymentReceived}>
              <span>Payment received</span>
            </Button>
            {!adaptive && <TransactionTime />}
          </ButtonsWrapper>
        </>
      );
      break;
    case processes.buy.completed:
    case processes.sell.completed:
      component = (
        <ButtonsWrapper gap="10px 0">
          <CustomButton className="malibu-color malibu-text">
            <span>Have A Question</span>
          </CustomButton>
          <CustomButton className="malibu-color malibu-text">
            <span>View my balance</span>
          </CustomButton>
        </ButtonsWrapper>
      );
      break;
    case processes.sell.appeal:
    case processes.buy.appeal:
      component = (
        <>
          <div className="p2p-order-process-submit__header">
            <Row className="p2p-order-process__title">
              <h5>
                Pending response from respondent. Time
                remaining&nbsp;&nbsp;&nbsp;
                <span className="light-blue-gradient-color">
                  <Timer
                    time={new Date(new Date().getTime() + 10 * 60 * 1000)}
                    hideHours
                  />
                </span>
              </h5>
            </Row>
          </div>
          <ButtonsWrapper gap="0 15px">
            <Button
              type="secondary-light--light-blue"
              onClick={onPaymentReceived}
            >
              <span>Approve appeal</span>
            </Button>
            <Button type="lightBlue" onClick={onPaymentReceived}>
              <span>Not approve appeal</span>
            </Button>
          </ButtonsWrapper>
        </>
      );
      break;
    default:
      break;
  }

  return component;
}

Submit.propTypes = {
  adaptive: PropTypes.bool,
  process: PropTypes.oneOf([
    ...Object.values(processes.buy),
    ...Object.values(processes.sell),
  ]),
  onNotifySeller: PropTypes.func,
  onPaymentReceived: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Submit;
