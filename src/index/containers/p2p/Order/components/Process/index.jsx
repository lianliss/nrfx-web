import React from 'react';

// Components
import { Row, Col } from 'ui';
import { CabinetBlock, AnswerPopup } from 'dapp';
import SVG from 'utils/svg-wrap';
import ChooseMethod from '../ChooseMethod';
import Steps from './components/Steps';
import Info from './components/Info';
import OrderCreatedInfo from '../Info';
import Submit from './components/Submit';

// Utils
import { classNames as cn } from 'utils';
import {
  p2pMode,
  orderProcesses as processes,
} from 'src/index/constants/dapp/types';
import { testPayments } from '../../../Orders/components/Filters/testItems';
import warnIcon from 'src/asset/icons/status/warn-orange.svg';

// Styles
import './index.less';

const TitleWithWarn = ({ title, answerMessage }) => (
  <>
    <Row className="p2p-order-process__title">
      <h5>
        {title}
        <AnswerPopup>{answerMessage}</AnswerPopup>
      </h5>
    </Row>
    <Row className="p2p-order-process-method__warn" alignItems="center">
      <SVG src={warnIcon} />
      <p>Binance only supports real-name verified payment methods.</p>
    </Row>
  </>
);

function Process({ adaptive, mode, process }) {
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
    let title;

    switch (process) {
      case processes.buy.payment:
        title = (
          <TitleWithWarn
            title="Transfer the funds to the sellers account provided below"
            answerMessage="Answer"
          />
        );
        break;
      case processes.sell.releasing:
        title = (
          <TitleWithWarn
            title="Confirm that the payment is
                made using the buyer`s real name
                (Alexandr Widodo Halim)."
            answerMessage="Answer"
          />
        );
        break;
      default:
        title = (
          <Row className="p2p-order-process__title">
            <h5>Payment method</h5>
          </Row>
        );
    }

    return (
      <div className="p2p-order-process-method">
        {title}
        <ChooseMethod
          methods={
            // If precess is not -payment-
            // Keep selected payment, and remove others.
            process === processes.buy.payment
              ? testPayments
              : testPayments.filter((_paymentItem, index) => index === 0)
          }
          selectedMethod={testPayments[0].code}
          adaptive={adaptive}
        />
      </div>
    );
  };

  const renderContent = () => (
    <div
      className={cn('p2p-order-process-content', {
        sideline:
          process === processes.buy.payment ||
          process === processes.sell.releasing,
      })}
    >
      {renderInfo()}
      {renderMethod()}
      <Submit process={process} adaptive={adaptive} />
    </div>
  );

  return (
    <CabinetBlock className={cn('p2p-order-process', process)}>
      <Steps mode={mode} process={process} adaptive={adaptive} />
      {renderContent()}
    </CabinetBlock>
  );
}

export default Process;
