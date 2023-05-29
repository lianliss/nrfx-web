import React from 'react';
import PropTypes from 'prop-types';

// Components
import { OrderCreatedTextCopy } from 'src/index/components/p2p';
import { Row, Radio } from 'ui';
import PaymentItem from 'src/index/components/p2p/components/PaymentItem';

// Utils
import paymentColors from '../../../constants/paymentColors';

// Styles
import './index.less';

const PaymentRadio = ({ title, code, selected, onChange }) => {
  return <Radio
    className="p2p-order-choose-method__item"
    value={code}
    onChange={onChange}
    selected={selected}
    type="malibu"
    size="extra_small"
    key={code}
  >
    <PaymentItem title={title} color={paymentColors.orange} />
  </Radio>
};

function ChooseMethod({
  adaptive,
  methods,
  selectedMethod,
  setSelectedMethod,
}) {
  const handleMethodChange = (code) => {
    setSelectedMethod(code);
  };

  const PaymentMethods = React.memo(() => (
    <div className="p2p-order-choose-method__items">
      {!!methods.length ? (
        methods
          .map((payment) => (
            <PaymentRadio
              title={payment.bankName ? `${payment.title}: ${payment.bankName}` : payment.title}
              code={payment.code}
              key={payment.code}
              selected={selectedMethod.id === payment.id}
              onChange={() => {}}
            />
          ))
      ) : (
        <PaymentRadio
          title={selectedMethod.bankName ? `${selectedMethod.title}: ${selectedMethod.bankName}` : selectedMethod.title}
          code={selectedMethod.code}
          selected={true}
        />
      )}
    </div>
  ));

  const OrderData = React.memo(() => (
    <div className="p2p-order-choose-method-data">
      <div className="p2p-order-choose-method-data__item">
        <div className="p2p-order-choose-method-data__title">Name</div>
        <OrderCreatedTextCopy text={selectedMethod.holder} />
      </div>
      <div className="p2p-order-choose-method-data__item">
        <div className="p2p-order-choose-method-data__title">
          {selectedMethod.type === 'card' ? 'Card number' : 'Account number'}
        </div>
        <OrderCreatedTextCopy text={selectedMethod.account} />
      </div>
      <div className="p2p-order-choose-method-data__item">
        <div className="p2p-order-choose-method-data__title">Bank name</div>
        <OrderCreatedTextCopy text={selectedMethod.bankName || selectedMethod.title} />
      </div>
    </div>
  ));

  return (
    <Row
      className="p2p-order-choose-method"
      alignItems="stretch"
      wrap={adaptive}
    >
      <PaymentMethods />
      <OrderData />
    </Row>
  );
}

export default ChooseMethod;
