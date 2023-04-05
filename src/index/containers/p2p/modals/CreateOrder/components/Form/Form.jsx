import React from 'react';
import { p2pMode } from 'src/index/constants/dapp/types';

// Components
import { Row, Button, NumberFormat } from 'ui';
import { DappInput, CustomButton } from 'dapp';
import { TermsAndConditions, PaymentItems } from '..';

const CurrencyIndicator = ({ currency }) => (
  <span className="moderate-fz medium-fw dark-black-color">{currency}</span>
);

const Label = ({ text }) => (
  <p className="cool-gray-color modal__label">{text}</p>
);

function Form({ mode, adaptive }) {
  const buttonSize = adaptive ? 'big' : 'moderate';

  return (
    <div className="p2p-modal-create-order-form">
      <div>
        <Label
          text={mode === p2pMode.buy ? 'I want to pay' : 'I want to sell'}
        />
        <DappInput
          placeholder="0.00"
          inputMode="decimal"
          indicator={
            <Row alignItems="center" gap={8}>
              <CustomButton>
                <span className="light-blue-gradient-color">ALL</span>
              </CustomButton>
              <CurrencyIndicator currency="IDR" />
            </Row>
          }
          className="moderate-fz medium-fw"
        />
        {!adaptive && (
          <p className="cool-gray-color moderate-fz normal-fw modal-balance">
            Balance: <NumberFormat number={0.0} currency="USDT" />
          </p>
        )}
      </div>
      <div>
        <Label text="I will receive" />
        <DappInput
          placeholder="1,000.00 - 8,999.60"
          indicator={<CurrencyIndicator currency="IDR" />}
          className="moderate-fz medium-fw"
          inputMode="decimal"
          type="number"
        />
      </div>
      <Row className="modal-buttons" gap="15px 6px">
        {!adaptive && (
          <Button type="secondary-light" size="moderate">
            <span className="light-blue-gradient-color">Cancel</span>
          </Button>
        )}
        {mode === p2pMode.buy ? (
          <Button type="lightBlue" size={buttonSize}>
            Buy USDT
          </Button>
        ) : (
          <Button type="orange" size={buttonSize}>
            Sell USDT
          </Button>
        )}
      </Row>
      {adaptive && <PaymentItems mode={mode} adaptive={adaptive} />}
      {mode === p2pMode.sell && adaptive && <TermsAndConditions />}
    </div>
  );
}

export default Form;
