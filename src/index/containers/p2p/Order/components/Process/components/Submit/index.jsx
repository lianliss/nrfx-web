import React from 'react';
import PropTypes from 'prop-types';

import { Button, Row, Timer } from 'ui';
import { CustomButton, AnswerPopup } from 'dapp';
import { orderProcesses as processes } from 'src/index/constants/dapp/types';
import { Web3Context } from 'services/web3Provider';

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
  order,
  adaptive,
  onNotifySeller,
  onPaymentReceived,
  onCancel,
}) {
  const context = React.useContext(Web3Context);
  const {
    accountAddress,
    chainId,
    getFiatsArray,
    getWeb3,
    network,
    getBSCScanLink,
    getTransactionReceipt,
    transaction,
    backendRequest,
  } = context;
  const isClient = accountAddress === order.clientAddress;
  const isOwner = accountAddress === order.ownerAddress;
  const isLawyer = accountAddress === order.lawyerAddress;
  
  const {
    fiat,
    fiatAmount,
    moneyAmount,
  } = order;
  
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

  if (order.isBuy && isClient) {
    return (
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
  }

  if (isClient) {
    return (
      <ButtonsWrapper gap="15px 0">
        <TransactionTime />
        <CancelOrderButton type={adaptive ? 'default' : 'custom-malibu'} />
      </ButtonsWrapper>
    );
  }

  if (order.isBuy && isOwner) {
    return (
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
  }

  if (
    order.status === 1
  ) {
    return (
      <ButtonsWrapper gap="10px 0">
        <CustomButton className="malibu-color malibu-text">
          <span>Have A Question</span>
        </CustomButton>
        <CustomButton className="malibu-color malibu-text">
          <span>View my balance</span>
        </CustomButton>
      </ButtonsWrapper>
    );
  }

  return <></>;
}

export default Submit;
