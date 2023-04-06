import React from 'react';

// Components
import { Button } from 'ui';

// Utils
import { p2pMode } from 'src/index/constants/dapp/types';

// Styles
import './ConfirmButtons.less';

function ConfirmButtons({ prefix = '', adaptive, mode }) {
  const buttonSize = adaptive ? 'big' : 'moderate';

  return (
    <div className={prefix + '__buttons'}>
      <Button type="secondary-light" size={buttonSize}>
        <span className="light-blue-gradient-color">Cancel</span>
      </Button>
      <Button type="lightBlue" size={buttonSize}>
        {mode === p2pMode.buy && 'Confirm payment'}
        {mode === p2pMode.sell && 'Confirm'}
      </Button>
    </div>
  );
}

export default ConfirmButtons;
