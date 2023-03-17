import React from 'react';

// Components
import { Button, NumberFormat, Row } from 'ui';
import SVG from 'utils/svg-wrap';

// Utils
import { classNames as cn } from 'utils';
import successIcon from 'src/asset/icons/status/check_circle_success.svg';

// Styles
import './index.less';

function Form({ isConnected = true, approved = true }) {
  return (
    <div className={cn('TokenMigrationLanding-form', { isConnected })}>
      <div className="TokenMigrationLanding-form__content">
        <h3>You exchange NRFX to NRFX V2</h3>
        <p className="TokenMigrationLanding-form__balance">
          <NumberFormat number={0.0} currency="NRFX" />
        </p>
        <p className="TokenMigrationLanding-form__description">
          If you experienced an error or believe your estimate is incorrect,
          please email us at support@narfex.com. Provide your wallet address, a
          clear explanation of your issue, and any relevant blockchain
          transactions. We will respond within 5 business days.
        </p>
      </div>
      <div className="TokenMigrationLanding-form__buttons">
        {isConnected ? (
          <>
            <Button
              type="secondary-light"
              style={{ pointerEvents: approved && 'none' }}
              size="ultra_large"
            >
              <Row alignItems="center">
                <span className="blue">Approve</span>
                <SVG src={successIcon} flex style={{ marginLeft: 5.56 }} />
              </Row>
            </Button>
            <Button type="lightBlue" disabled={!approved} size="ultra_large">
              Swap
            </Button>
          </>
        ) : (
          <Button type="lightBlue" size="ultra_large">
            Connect Wallet
          </Button>
        )}
      </div>
    </div>
  );
}

export default Form;
