import React from 'react';

// Components
import { Row, Col, NumberFormat, HoverPopup } from 'ui';
import { CabinetBlock } from 'dapp';
import SVG from 'utils/svg-wrap';

// Utils
import { classNames as cn } from 'utils';

// Styles
import './index.less';

const steps = [
  { id: 1, title: 'Transfer payment to Seller' },
  { id: 2, title: 'Pending Seller to Realease Cryptos' },
  { id: 3, title: 'Completed' },
];

function Process() {
  const [step, setStep] = React.useState(2);

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

  return (
    <CabinetBlock className="p2p-order-process">
      <div className="p2p-order-process-steps">
        {steps.map(({ title, id }) => (
          <Step number={id} key={id} title={title} active={step === id} />
        ))}
      </div>
      <div className="p2p-order-process-content">
        <div className="p2p-order-process-info">
          <h5>Confirm order info</h5>
          <Row className="p2p-order-process-info__items">
            <Info title="Amount" prefix="Rp" number={600812255} />
            <Info title="Price" prefix="Rp" number={15555000} />
            <Info title="Quantity" currency="USDT" number={389.88} />
          </Row>
        </div>
        <div className="p2p-order-process-method">
          <Row alignItems="center">
            <h5>Transfer the funds to the sellers account provided below </h5>
            <HoverPopup content="Answer" size="small">
              <SVG
                src={require('src/asset/icons/cabinet/question-icon.svg')}
                className="question-icon"
                flex
                width="14"
                height="14"
              />
            </HoverPopup>
          </Row>
          <Row className="p2p-order-process-method__warn" alignItems="center">
            <SVG src={require('src/asset/icons/status/warn-orange.svg')} />
            <p>Binance only supports real-name verified payment methods.</p>
          </Row>
        </div>
      </div>
    </CabinetBlock>
  );
}

export default Process;
