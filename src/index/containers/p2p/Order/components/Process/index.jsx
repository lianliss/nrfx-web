import React, { useState } from 'react';

// Components
import { Row, Button } from 'ui';
import { CabinetBlock, AnswerPopup } from 'dapp';
import SVG from 'utils/svg-wrap';
import ChooseMethod from '../ChooseMethod';
import Step from './components/Step';
import Info from './components/Info';

// Utils
import processes from './constants/processes';

// Styles
import './index.less';

const steps = [
  { id: 1, type: processes.payment, title: 'Transfer payment to Seller' },
  {
    id: 2,
    type: processes.pending,
    title: 'Pending Seller to Realease Cryptos',
  },
  { id: 3, type: processes.completed, title: 'Completed' },
];

function Process() {
  const [step, setStep] = useState(steps[1].type);

  const renderInfo = () => (
    <div className="p2p-order-process-info">
      <h5 className="p2p-order-process__title">Confirm order info</h5>
      <Row className="p2p-order-process-info__items">
        <Info title="Amount" prefix="Rp" number={600812255} />
        <Info title="Price" prefix="Rp" number={15555000} />
        <Info title="Quantity" currency="USDT" number={389.88} />
      </Row>
    </div>
  );

  const renderMethod = () => (
    <div className="p2p-order-process-method">
      <Row className="p2p-order-process__title">
        <h5>Transfer the funds to the sellers account provided below</h5>
        <AnswerPopup>Answer</AnswerPopup>
      </Row>
      <Row className="p2p-order-process-method__warn" alignItems="center">
        <SVG src={require('src/asset/icons/status/warn-orange.svg')} />
        <p>Binance only supports real-name verified payment methods.</p>
      </Row>
      <ChooseMethod />
    </div>
  );

  const renderSubmit = () => (
    <div className="p2p-order-process-submit">
      <Row className="p2p-order-process__title">
        <h5>
          After transferring the funds, click on the “Transferred, <br />
          notify seller” button.
        </h5>
        <AnswerPopup>Answer</AnswerPopup>
      </Row>
      <Row className="p2p-order-process__buttons" gap={15}>
        <Button type="lightBlue">
          <span>Transferred notify seller</span>
        </Button>
        <Button type="secondary-light">
          <span className="light-blue-gradient-color">Cancel Order</span>
        </Button>
      </Row>
    </div>
  );

  const renderContent = () => (
    <div className="p2p-order-process-content">
      {renderInfo()}
      {renderMethod()}
      {renderSubmit()}
    </div>
  );

  return (
    <CabinetBlock className="p2p-order-process">
      <div className="p2p-order-process-steps">
        {steps.map(({ title, id, type }) => (
          <Step number={id} key={id} title={title} active={step === type} />
        ))}
      </div>
      {renderContent()}
    </CabinetBlock>
  );
}

export default Process;
