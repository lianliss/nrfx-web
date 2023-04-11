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
  mode,
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
        {mode === p2pMode.buy && 'Confirm payment'}
        {mode === p2pMode.sell && 'Confirm'}
      </Button>
    </div>
  );
}

export default ConfirmButtons;
