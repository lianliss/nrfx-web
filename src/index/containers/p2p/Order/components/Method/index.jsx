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
        <p>Narfex only supports real-name verified payment methods.</p>
      </Row>
    )}
  </>
);

function Method({ adaptive, order, selectedMethod }) {
  let title;
  let component;

  component = <ChoosedMethod payment={selectedMethod} />;

  return (
    <div className="p2p-order-process-method">
      <Title title="Payment method" />
      {component}
    </div>
  );
}

export default Method;
