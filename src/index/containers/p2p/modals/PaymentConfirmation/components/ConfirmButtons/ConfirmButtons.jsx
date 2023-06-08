import React from 'react';

// Components
import { Button } from 'ui';

// Utils
import { p2pMode } from 'src/index/constants/dapp/types';

// Styles
import './ConfirmButtons.less';

function ConfirmButtons({
  prefix = '',
  onConfirm,
  onCancel,
  onClose,
  adaptive,
  order,
}) {
  const buttonSize = adaptive ? 'big' : 'moderate';

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onCancel();
    onClose();
  };

  return (
    <div className={prefix + '__buttons'}>
      <Button type="secondary-light" size={buttonSize} onClick={handleCancel}>
        <span className="light-blue-gradient-color">Cancel</span>
      </Button>
      <Button type="lightBlue" size={buttonSize} onClick={handleConfirm}>
        {order.isBuy && 'Confirm payment'}
        {!order.isBuy && 'Confirm'}
      </Button>
    </div>
  );
}

export default ConfirmButtons;
