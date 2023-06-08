import React from 'react';

// Components
import { Row, Col, CheckBox } from 'ui';
import { ConfirmButtons } from '..';

// Utils
import { classNames as cn } from 'utils';
import successIcon from 'src/asset/icons/status/success-tick.svg';
import crossIcon from 'src/asset/icons/status/cross-18.svg';

// Styles
import './Buy.less';

function Buy({ prefix, adaptive, onConfirm, onCancel, onClose, order }) {
  const [checked, setChecked] = React.useState(false);

  const handleCheckChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div className={cn(prefix, 'buy')}>
      <h2 className="dark-black-color">Payment confirmation</h2>
      <div className="buy__content">
        <h4 className="dark-black-color">
          1. Confirm Payment <span className="orange-red-color">*</span>
        </h4>
        <Col gap="15px">
          <Row gap={adaptive ? '5px' : '7px'}>
            <img src={successIcon} alt="success" />
            <p>
              You must leave Binance’s platform to complete the transfer
              yourself. Binance will not automatically transfer the payment on
              your behalf.
            </p>
          </Row>
          <Row gap={adaptive ? '5px' : '7px'}>
            <img src={crossIcon} alt="cross" />
            <p>
              Do not click on the "Transferred, notify seller" button without
              first making the payment. Doing so, without making the payment
              first, may cause your account to be suspended. Please note that
              the platform reserves the right to seek damages.
            </p>
          </Row>
        </Col>
        <Row className="buy-checkbox-wrapper">
          <CheckBox
            type="simple"
            checked={checked}
            onChange={handleCheckChange}
          />
          <p onClick={handleCheckChange}>
            I have made payment from my real-name verified payment account
            consistent with my registered name on Narfex.
          </p>
        </Row>
      </div>
      <ConfirmButtons
        adaptive={adaptive}
        onConfirm={onConfirm}
        onCancel={onCancel}
        onClose={onClose}
        prefix={prefix}
        order={order}
      />
    </div>
  );
}

export default Buy;
