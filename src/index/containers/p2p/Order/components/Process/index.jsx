import React from 'react';

// Components
import { Row, Col, Button, Timer } from 'ui';
import { CabinetBlock, AnswerPopup, CustomButton } from 'dapp';
import SVG from 'utils/svg-wrap';
import ChooseMethod from '../ChooseMethod';
import Step from './components/Step';
import Info from './components/Info';
import OrderCreatedInfo from '../Info';

// Utils
import { classNames as cn } from 'utils';
import processes from '../../constants/processes';
import { p2pMode } from 'src/index/constants/dapp/types';
import { testPayments } from '../../../Orders/components/Filters/testItems';
import warnIcon from 'src/asset/icons/status/warn-orange.svg';

// Styles
import './index.less';

const steps = [
  { id: 1, type: processes.payment, title: 'Transfer payment to Seller' },
  {
    id: 2,
    type: processes.pending,
    title: 'Pending Seller to Realease Cryptos',
    answerMessage:
      'Waiting for payment confirmation. ' +
      'Please do not cancel the order if payment has' +
      ' been made. Once the counterparty confirms the payment,' +
      ' the crypto will be realeased to your wallet.',
  },
  { id: 3, type: processes.completed, title: 'Completed' },
];

function Process({ adaptive, mode, process }) {
  const processStep = steps.find((step) => step.type === process);

  const CancelOrderButton = ({ type = 'default' }) => {
    if (type === 'custom-malibu') {
      return (
        <CustomButton className="malibu-color malibu-text">
          <span>Cancel Order</span>
        </CustomButton>
      );
    }

    return (
      <Button type="secondary-light">
        <span className="light-blue-gradient-color">Cancel Order</span>
      </Button>
    );
  };

  const renderSteps = () => {
    const { pending, payment } = processes;
    const processIsFine = process === payment || process === pending;

    if (!adaptive && processIsFine) {
      return (
        <div className="p2p-order-process-steps">
          {steps.map(({ title, id, answerMessage }) => (
            <Step
              number={id}
              key={id}
              title={title}
              active={id <= processStep.id}
              answerMessage={answerMessage}
            />
          ))}
        </div>
      );
    }

    return <></>;
  };

  const renderInfo = () => {
    const ItemsComponent = adaptive ? Col : Row;

    return (
      <div className="p2p-order-process-info">
        <h5 className="p2p-order-process__title">Confirm order info</h5>
        <ItemsComponent className="p2p-order-process-info__items">
          <Info
            adaptive={adaptive}
            title="Amount"
            prefix="Rp"
            number={600812255}
            className={
              mode === p2pMode.buy ? 'green-color' : 'orange-red-color'
            }
          />
          <Info
            adaptive={adaptive}
            title="Price"
            prefix="Rp"
            number={15555000}
          />
          <Info
            adaptive={adaptive}
            title="Quantity"
            currency="USDT"
            number={389.88}
          />
          {adaptive && (
            <>
              <div className="p2p-order-process-info__line" />
              <OrderCreatedInfo adaptive={adaptive} />
              <div className="p2p-order-process-info__line" />
            </>
          )}
        </ItemsComponent>
      </div>
    );
  };

  const renderMethod = () => {
    return (
      <div className="p2p-order-process-method">
        {process === processes.payment ? (
          <>
            <Row className="p2p-order-process__title">
              <h5>
                Transfer the funds to the sellers account provided below
                <AnswerPopup>Answer</AnswerPopup>
              </h5>
            </Row>
            <Row className="p2p-order-process-method__warn" alignItems="center">
              <SVG src={warnIcon} />
              <p>Binance only supports real-name verified payment methods.</p>
            </Row>
          </>
        ) : (
          <Row className="p2p-order-process__title">
            <h5>Payment method</h5>
          </Row>
        )}
        <ChooseMethod
          methods={
            // If precess is not -payment-
            // Keep selected payment, and remove others.
            process === processes.payment
              ? testPayments
              : testPayments.filter((_paymentItem, index) => index === 0)
          }
          selectedMethod={testPayments[0].code}
          adaptive={adaptive}
        />
      </div>
    );
  };

  const renderSubmit = () => {
    if (process === processes.payment) {
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
          <Row className="p2p-order-process__buttons" gap={15}>
            <Button type="lightBlue">
              <span>Transferred notify seller</span>
            </Button>
            <CancelOrderButton />
          </Row>
        </>
      );
    }

    if (process === processes.pending) {
      return (
        <Row
          className="p2p-order-process__buttons"
          alignItems="center"
          gap={'15px 0'}
        >
          <Row className="malibu-color malibu-text">
            Transaction issue; appeal after (
            <Timer
              time={new Date(new Date().getTime() + 1 * 60 * 60 * 1000)}
              hideHours
            />
            )
          </Row>
          <CancelOrderButton type={adaptive ? 'default' : 'custom-malibu'} />
        </Row>
      );
    }
  };

  const renderContent = () => (
    <div className="p2p-order-process-content">
      {renderInfo()}
      {renderMethod()}
      {renderSubmit()}
    </div>
  );

  return (
    <CabinetBlock className={cn('p2p-order-process', process)}>
      {renderSteps()}
      {renderContent()}
    </CabinetBlock>
  );
}

export default Process;
