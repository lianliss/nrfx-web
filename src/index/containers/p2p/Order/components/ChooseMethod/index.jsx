import React from 'react';

// Components
import { OrderCreatedTextCopy } from 'src/index/components/p2p';
import { Row, Radio } from 'ui';
import PaymentItem from 'src/index/components/p2p/components/PaymentItem';

// Utils
import paymentColors from '../../../constants/paymentColors';
import { testPayments } from '../../../Orders/components/Filters/testItems';

// Styles
import './index.less';

function ChooseMethod() {
  const [selectedMethod, setSelectedMethod] = React.useState(
    testPayments[0].code
  );

  const handleMethodChange = (code) => {
    setSelectedMethod(code);
  };

  const PaymentMethods = React.memo(() => (
    <div className="p2p-order-choose-method__items">
      {testPayments.slice(0, 3).map((payment) => (
        <Radio
          className="p2p-order-choose-method__item"
          value={payment.code}
          onChange={handleMethodChange}
          selected={selectedMethod === payment.code}
          type="malibu"
          size="extra_small"
        >
          <PaymentItem title={payment.title} color={paymentColors.orange} />
        </Radio>
      ))}
    </div>
  ));

  const OrderData = React.memo(() => (
    <div className="p2p-order-choose-method-data">
      <div className="p2p-order-choose-method-data__item">
        <div className="p2p-order-choose-method-data__title">Name</div>
        <OrderCreatedTextCopy text="Alexandr Widodo Halim" />
      </div>
      <div className="p2p-order-choose-method-data__item">
        <div className="p2p-order-choose-method-data__title">
          Bank account number
        </div>
        <OrderCreatedTextCopy text="999555844" />
      </div>
      <div className="p2p-order-choose-method-data__item">
        <div className="p2p-order-choose-method-data__title">Bank name</div>
        <OrderCreatedTextCopy text="BCA" />
      </div>
    </div>
  ));

  return (
    <Row className="p2p-order-choose-method" alignItems="stretch">
      <PaymentMethods />
      <OrderData />
    </Row>
  );
}

export default ChooseMethod;
