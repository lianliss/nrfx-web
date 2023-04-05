import React from 'react';
import { useSelector } from 'react-redux';

// Components
import { CabinetModal, DappInput, CustomButton } from 'dapp';
import { Row, Button, NumberFormat } from 'ui';
import { UserOrdersInfo, PaymentItem } from 'src/index/components/p2p';

// Utils
import { adaptiveSelector } from 'src/selectors';

// Styles
import './CreateOrder.less';

const CurrencyIndicator = ({ currency }) => (
  <span className="moderate-fz medium-fw dark-black-color">{currency}</span>
);

const Label = ({ text }) => (
  <p className="cool-gray-color modal__label">{text}</p>
);

const OrderInfoWrapper = ({ title, children }) => (
  <div className="p2p-modal-create-order-info-item">
    <Row
      className="normal-fw moderate-fz"
      alignItems="center"
      gap="4px 10px"
      wrap
    >
      <span className="cool-gray-color">{title}</span>
      <div>{children}</div>
    </Row>
  </div>
);

function CreateOrder(props) {
  const adaptive = useSelector(adaptiveSelector);

  return (
    <CabinetModal className="p2p-modal-create-order__wrapper">
      <Row className="p2p-modal-create-order" wrap={adaptive}>
        <div>
          <UserOrdersInfo
            name="mail****@gmail.com"
            ordersNumber={287}
            completion={85.7}
          />
          <Row
            className="p2p-modal-create-order-info-items"
            justifyContent="space-between"
            wrap
          >
            <OrderInfoWrapper title="Price">
              <span className="green-color medium-fw">
                <NumberFormat number={39.93} currency="USDT" />
              </span>
            </OrderInfoWrapper>
            <OrderInfoWrapper title="Avaible">
              <span className="black-gunmetal-color medium-fw">
                <NumberFormat number={220.0} currency="USDT" />
              </span>
            </OrderInfoWrapper>
          </Row>
          <Row
            className="p2p-modal-create-order-info-items"
            justifyContent="space-between"
            wrap
          >
            <OrderInfoWrapper title="Payment Time Limit">
              <span className="black-gunmetal-color medium-fw">
                <NumberFormat number={15} /> Minutes
              </span>
            </OrderInfoWrapper>
            <OrderInfoWrapper title="Seller`s payment method">
              <Row gap="10px 12px" wrap>
                <PaymentItem title="Bank Transfer" />
                <PaymentItem title="Bank Transfer" />
                <PaymentItem title="Monobank" />
              </Row>
            </OrderInfoWrapper>
          </Row>
        </div>
        <div className="p2p-modal-create-order-form">
          <div>
            <Label text="I want to pay" />
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
            <Button
              Button
              type="lightBlue"
              size={adaptive ? 'big' : 'moderate'}
            >
              Buy USDT
            </Button>
          </Row>
        </div>
      </Row>
    </CabinetModal>
  );
}

export default CreateOrder;
