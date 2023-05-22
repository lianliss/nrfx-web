import React from 'react';

// Components
import { AnswerPopup } from 'dapp';
import { ChooseMethod, ChoosedMethod } from '../';
import { Row } from 'ui';
import SVG from 'utils/svg-wrap';

// Utils
import { testPayments } from '../../../Orders/components/Filters/testItems';
import { orderProcesses as processes } from 'src/index/constants/dapp/types';
import warnIcon from 'src/asset/icons/status/warn-orange.svg';

const Title = ({ title, answerMessage, showWarn }) => (
  <>
    <Row className="p2p-order-process__title">
      <h5>
        {title}
        {!!answerMessage && <AnswerPopup>{answerMessage}</AnswerPopup>}
      </h5>
    </Row>
    {showWarn && (
      <Row className="p2p-order-process-method__warn" alignItems="center">
        <SVG src={warnIcon} />
        <p>Binance only supports real-name verified payment methods.</p>
      </Row>
    )}
  </>
);

function Method({ adaptive, process, selectedMethod }) {
  let title;
  let component;

  switch (process) {
    case processes.buy.payment:
      title = (
        <Title
          title="Transfer the funds to the sellers account provided below"
          answerMessage="Answer"
          showWarn
        />
      );
      component = (
        <ChooseMethod
          methods={testPayments}
          selectedMethod={selectedMethod}
          adaptive={adaptive}
        />
      );
      break;
    case processes.buy.pending:
    case processes.sell.pending:
      title = <Title title="Payment method" />;
      component = (
        <ChooseMethod selectedMethod={selectedMethod} adaptive={adaptive} />
      );
      console.log(12);
      break;
    case processes.sell.releasing:
      title = (
        <Title
          title="Confirm that the payment is
            made using the buyer`s real name
            (Alexandr Widodo Halim)."
          answerMessage="Answer"
          showWarn
        />
      );
      component = (
        <ChooseMethod selectedMethod={selectedMethod} adaptive={adaptive} />
      );
      break;
    default:
      title = <Title title="Payment method" />;
      component = <ChoosedMethod payment={selectedMethod} />;
      break;
  }

  return (
    <div className="p2p-order-process-method">
      {title}
      {component}
    </div>
  );
}

export default Method;
