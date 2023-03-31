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

const PaymentRadio = ({ title, code, selected, onChange }) => (
  <Radio
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
);

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
          .slice(0, 3)
          .map((payment) => (
            <PaymentRadio
              title={payment.title}
              code={payment.code}
              key={payment.code}
              selected={selectedMethod.code === payment.code}
              onChange={handleMethodChange}
            />
          ))
      ) : (
        <PaymentRadio
          title={selectedMethod.title}
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

ChooseMethod.propTypes = {
  setSelectedMethod: PropTypes.func,
  methods: PropTypes.array,
};

ChooseMethod.defaultProps = {
  setSelectedMethod: () => {},
  methods: [],
};

export default ChooseMethod;
