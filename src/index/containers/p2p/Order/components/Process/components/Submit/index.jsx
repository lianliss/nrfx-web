import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import wait from 'utils/wait';

import { Button, Row, Timer } from 'ui';
import { CustomButton, AnswerPopup } from 'dapp';
import { orderProcesses as processes } from 'src/index/constants/dapp/types';
import { Web3Context } from 'services/web3Provider';
import { toastPush } from 'src/actions/toasts';

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
  const dispatch = useDispatch();
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
  const addressFormatted = getWeb3().utils.toChecksumAddress(accountAddress);
  const isClient = addressFormatted === order.clientAddress;
  const isOwner = addressFormatted === order.ownerAddress;
  const isLawyer = addressFormatted === order.lawyerAddress;
  const isPayed = _.get(order, 'cache.isPayed', false);
  const isCancel = _.get(order, 'cache.isCancel', false);
  const [isProcess, setIsProcess] = React.useState(false);
  
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
      <Button type="secondary-light" onClick={async () => {
        setIsProcess(true);
        await onCancel();
        setIsProcess(false);
      }}>
        <span className="light-blue-gradient-color">Cancel Order</span>
      </Button>
    );
  };
  
  const setAsPayed = async () => {
    setIsProcess(true);
    try {
      await backendRequest({
        chat: order.chatRoom,
      }, ``, 'offers/payed', 'post');
      await wait(4000);
      dispatch(toastPush(
        'Marked as payed',
        "success"
      ));
    } catch (error) {
      console.error('[setAsPayed]', error);
    }
    setIsProcess(false);
  };
  
  if (order.status === 0) {
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
  
  console.log('SUBM', order.isBuy, isClient, isOwner);

  if (!isPayed && ((order.isBuy && isClient) || (!order.isBuy && isOwner))) {
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
          <Button type="lightBlue"
                  state={isProcess ? "loading" : ''}
                  disabled={isProcess}
                  onClick={setAsPayed}>
            <span>Transferred notify seller</span>
          </Button>
          <CancelOrderButton state={isProcess ? "loading" : ''}
                             onClick={async () => {
                               setIsProcess(true);
                               await onCancel();
                               setIsProcess(false);
                             }}
                             disabled={isProcess} />
        </ButtonsWrapper>
      </>
    );
  }
  
  if (isPayed && ((order.isBuy && isOwner) || (!order.isBuy && isClient))) {
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
        <Button type="lightBlue" state={isProcess ? "loading" : ''}
                disabled={isProcess} onClick={onPaymentReceived}>
          <span>Payment received</span>
        </Button>
        {!adaptive && <TransactionTime />}
      </ButtonsWrapper>
      </>
    );
  }

  if (isPayed && ((order.isBuy && isClient) || (!order.isBuy && isOwner))) {
    return (
      <ButtonsWrapper gap="15px 0">
        <TransactionTime />
        <CancelOrderButton state={isProcess ? "loading" : ''}
                           onClick={async () => {
                             setIsProcess(true);
                             await onCancel();
                             setIsProcess(false);
                           }}
                           disabled={isProcess}
                           type={adaptive ? 'default' : 'custom-malibu'} />
      </ButtonsWrapper>
    );
  }

  return <></>;
}

export default Submit;
