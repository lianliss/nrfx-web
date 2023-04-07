import React from 'react';

// Components
import { Radio, Row, Col } from 'ui';
import { ConfirmButtons } from '..';

// Utils
import { classNames as cn } from 'utils';
import { p2pMode } from 'src/index/constants/dapp/types';

// Styles
import './Sell.less';

const confirmations = [
  { value: 0, title: 'I have not receive payment from the buyer.' },
  {
    value: 1,
    title:
      "I have received the correct amount. Payment sender matches the buyer's verified name on Binance, and I agree to release my crypto to the buyer.",
  },
];

function Sell({ prefix, adaptive, ...props }) {
  const [confirmation, setConfirmation] = React.useState(null);

  const handleConfirmationChange = (value) => {
    setConfirmation(value);
  };

  return (
    <div className={cn(prefix, 'sell')}>
      <h2 className="dark-black-color">Confirm release</h2>
      <div className="sell__content">
        <Col gap={adaptive ? 18 : 40}>
          <div>
            {confirmations.map((option) => (
              <Radio
                onChange={handleConfirmationChange}
                value={option.value}
                selected={option.value === confirmation}
                type="light-blue"
                size="small"
                className
              >
                <p>{item.title}</p>
              </Radio>
            ))}
          </div>
          <div>
            <h3 className="dark-black-color">Tips:</h3>
            <p>
              1. Do not only check the buyer's payment proof. Make sure to log
              into your account and verify payment is received!
              <br />
              <br />
              2. If the payment is still processing, wait until you have
              received payment in your account before releasing the crypto!
              <br />
              <br />
              3. Do NOT accept payment from a third-party account. Refund the
              full amount immediately if you receive such payment to avoid
              financial losses caused by bank chargeback after you have released
              the crypto.
            </p>
          </div>
        </Col>
      </div>
      <ConfirmButtons adaptive={adaptive} prefix={prefix} mode={p2pMode.sell} />
    </div>
  );
}

export default Sell;
