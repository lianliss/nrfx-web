import React from 'react';
import { useSelector } from 'react-redux';

// Components
import DepositModal from '../../DepositModal';
import { Input, Button, Row } from 'src/ui';

// Utils
import { adaptiveSelector } from 'src/selectors';

// Styles
import './WithdrawalDetails.less';

function WithdrawalDetails(props) {
  const adaptive = useSelector(adaptiveSelector);

  const Label = ({ title, children }) => {
    return (
      <label className="DepositModal__WithdrawalDetails__label">
        <span>{title}</span>
        {children}
      </label>
    );
  };

  return (
    <DepositModal
      {...props}
      className="DepositModal__WithdrawalDetails"
      closeOfRef
    >
      <h3 className="DepositModal__WithdrawalDetails__title">
        Specify the details
      </h3>
      <Label title="Phone number">
        <Input type="text" placeholder="+7 (xxx) xxx-xxxx" />
      </Label>
      <Label title="Full name">
        <Input type="text" placeholder="Name" />
        <Input type="text" placeholder="Last name" />
      </Label>
      <Row className="DepositModal__WithdrawalDetails__buttons" wrap={adaptive}>
        <Button type="secondary-alice" shadow>
          Back
        </Button>
        <Button type="lightBlue">Сonfirm</Button>
      </Row>
    </DepositModal>
  );
}

export default WithdrawalDetails;
