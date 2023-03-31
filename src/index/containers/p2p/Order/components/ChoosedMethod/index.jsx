import React from 'react';

import PaymentItem from 'src/index/components/p2p/components/PaymentItem';
import paymentColors from '../../../constants/paymentColors';

// Styles
import './index.less';

function ChoosedMethod({ payment }) {
  return (
    <div className="p2p-order-choosed-method">
      <PaymentItem title={payment.title} color={paymentColors.orange} />
    </div>
  );
}

export default ChoosedMethod;
