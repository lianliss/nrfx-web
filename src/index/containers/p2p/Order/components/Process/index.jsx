import React from 'react';

// Components
import { Row, Col, NumberFormat, Button } from 'ui';
import { CabinetBlock, AnswerPopup } from 'dapp';
import SVG from 'utils/svg-wrap';
import ChooseMethod from '../ChooseMethod';

// Utils
import { classNames as cn } from 'utils';

// Styles
import './index.less';

const steps = [
  { id: 1, title: 'Transfer payment to Seller' },
  { id: 2, title: 'Pending Seller to Realease Cryptos' },
  { id: 3, title: 'Completed' },
];

const Step = ({ number, title, active }) => (
  <div className={cn('p2p-order-process-step', { active })}>
    <div className="p2p-order-process-step__number">
      <div>{number}</div>
    </div>
    <p>{title}</p>
  </div>
);

const Info = ({ title, prefix, currency, number }) => (
  <Col className="p2p-order-process-info__item">
    <p>{title}</p>
    <NumberFormat
      prefix={prefix ? prefix + ' ' : ''}
      number={number}
      currency={currency}
    />
  </Col>
);

function Process() {
  const [step, setStep] = React.useState(2);

  const renderInfo = () => (
    <div className="p2p-order-process-info">
      <h5>Confirm order info</h5>
      <Row className="p2p-order-process-info__items">
        <Info title="Amount" prefix="Rp" number={600812255} />
        <Info title="Price" prefix="Rp" number={15555000} />
        <Info title="Quantity" currency="USDT" number={389.88} />
      </Row>
    </div>
  );

  const renderMethod = () => (
    <div className="p2p-order-process-method">
      <Row>
        <h5>Transfer the funds to the sellers account provided below </h5>
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
      <Row>
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
          <span className="light-blue-gradient-text">Cancel Order</span>
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
        {steps.map(({ title, id }) => (
          <Step number={id} key={id} title={title} active={step === id} />
        ))}
      </div>
      {renderContent()}
    </CabinetBlock>
  );
}

export default Process;
