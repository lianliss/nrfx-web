import React from 'react';
import DepositModal from '../../DepositModal';

// Components
import { Button, Col } from 'src/ui';

// Styles
import './ConfirmCancel.less';

function ConfirmCancel(props) {
  return (
    <DepositModal className="DepositModal__ConfirmCancel" {...props}>
      <h3>Cancel the deposit?</h3>
      <p className="secondary default medium">
        Are you sure that you want to cancel the deposit? You risk losing the
        already transferred funds
      </p>
      <Col className="buttons">
        <Button type="lightBlue">Cancel the deposit</Button>
        <Button type="secondary-alice">Don’t cancel</Button>
      </Col>
    </DepositModal>
  );
}

export default ConfirmCancel;
