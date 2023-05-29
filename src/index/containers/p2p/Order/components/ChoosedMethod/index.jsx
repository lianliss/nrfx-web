import React from 'react';

import PaymentItem from 'src/index/components/p2p/components/PaymentItem';
import paymentColors from '../../../constants/paymentColors';

// Styles
import './index.less';

function ChoosedMethod({ payment }) {
  return (
    <div className="p2p-order-choosed-method">
      <div className="orders-list-payment-item">
        Method: {payment.bankName || payment.title}
      </div>
      <div className="orders-list-payment-item">
        Account: {payment.account}
      </div>
      <div className="orders-list-payment-item">
        Holder: {payment.holder}
      </div>
    </div>
  );
}

export default ChoosedMethod;
