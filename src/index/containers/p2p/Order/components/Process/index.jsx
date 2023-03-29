import React, { useState } from 'react';

// Components
import { Row, Col, Button } from 'ui';
import { CabinetBlock, AnswerPopup } from 'dapp';
import SVG from 'utils/svg-wrap';
import ChooseMethod from '../ChooseMethod';
import Step from './components/Step';
import Info from './components/Info';
import OrderCreatedInfo from '../Info';

// Utils
import processes from './constants/processes';
import { p2pMode } from 'src/index/constants/dapp/types';

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

function Process({ adaptive, mode }) {
  const [step, setStep] = useState(steps[1].type);

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

  const renderMethod = () => (
    <div className="p2p-order-process-method">
      <Row className="p2p-order-process__title">
        <h5>
          Transfer the funds to the sellers account provided below
          <AnswerPopup>Answer</AnswerPopup>
        </h5>
      </Row>
      <Row className="p2p-order-process-method__warn" alignItems="center">
        <SVG src={require('src/asset/icons/status/warn-orange.svg')} />
        <p>Binance only supports real-name verified payment methods.</p>
      </Row>
      <ChooseMethod adaptive={adaptive} />
    </div>
  );

  const renderSubmit = () => (
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
        <Button type="secondary-light">
          <span className="light-blue-gradient-color">Cancel Order</span>
        </Button>
      </Row>
    </>
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
      {!adaptive && (
        <div className="p2p-order-process-steps">
          {steps.map(({ title, id, type }) => (
            <Step number={id} key={id} title={title} active={step === type} />
          ))}
        </div>
      )}
      {renderContent()}
    </CabinetBlock>
  );
}

export default Process;
