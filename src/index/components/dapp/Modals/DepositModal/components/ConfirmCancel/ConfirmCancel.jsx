import React from 'react';
import DepositModal from '../../DepositModal';

// Components
import { Button, Col } from 'src/ui';
import { getLang } from 'src/utils';
import FormattedText from 'src/index/components/dapp/FormattedText/FormattedText';

// Styles
import './ConfirmCancel.less';

function ConfirmCancel(props) {
  return (
    <DepositModal className="DepositModal__ConfirmCancel" {...props}>
      <h3>Cancel the deposit?</h3>
      <p className="secondary default medium">
        <FormattedText
          text={getLang(
            'Are you sure that you want to cancel \n the deposit? You risk losing the already transferred funds'
          )}
        />
      </p>
      <Col className="buttons">
        <Button type="lightBlue">Cancel the deposit</Button>
        <Button type="secondary-alice">Don’t cancel</Button>
      </Col>
    </DepositModal>
  );
}

export default ConfirmCancel;
