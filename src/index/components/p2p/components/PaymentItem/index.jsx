import React from 'react';
import PropTypes from 'prop-types';

// Utils
import paymentColors from 'src/index/containers/p2p/constants/paymentColors';
import { classNames as cn } from 'utils';
import sizes from './constants/sizes';

// Styles
import './index.less';

function PaymentItem({
  title,
  color = paymentColors.orange,
  adaptive,
  className,
  size,
}) {
  return (
    <div
      className={cn('orders-list-payment-item', className, size)}
      style={{ background: adaptive && color }}
    >
      {!adaptive && (
        <div
          className="orders-list-payment-item__color"
          style={{ background: color }}
        />
      )}
      <span>{title}</span>
    </div>
  );
}

PaymentItem.propTypes = {
  size: PropTypes.oneOf(sizes),
  title: PropTypes.string,
  color: PropTypes.oneOf(Object.values(paymentColors)),
  adaptive: PropTypes.bool,
  className: PropTypes.string,
};

PaymentItem.defaultProps = {
  color: paymentColors.orange,
  size: sizes.medium,
  title: '',
  adaptive: false,
  className: '',
};

export default PaymentItem;
