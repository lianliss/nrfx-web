import React from 'react';

// Components
import { Button, NumberFormat, Row } from 'ui';
import SVG from 'utils/svg-wrap';

// Utils
import { classNames as cn, getLang } from 'utils';
import successIcon from 'src/asset/icons/status/check_circle_success.svg';

// Styles
import './index.less';

function Form({ isConnected = true, approved = true }) {
  return (
    <div className={cn('TokenMigrationLanding-form', { isConnected })}>
      <div className="TokenMigrationLanding-form__content">
        <h3>{getLang('token_migration_form_title')}</h3>
        <p className="TokenMigrationLanding-form__balance">
          <NumberFormat number={0.0} currency="NRFX" />
        </p>
        <p className="TokenMigrationLanding-form__description">
          {getLang('token_migration_form_description')}
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
                <span className="blue">
                  {approved
                    ? getLang('dapp_global_approved')
                    : getLang('dapp_global_approve')}
                </span>
                <SVG src={successIcon} flex style={{ marginLeft: 5.56 }} />
              </Row>
            </Button>
            <Button type="lightBlue" disabled={!approved} size="ultra_large">
              {getLang('dapp_swap_exchange')}
            </Button>
          </>
        ) : (
          <Button type="lightBlue" size="ultra_large">
            {getLang('dapp_global_connect_wallet')}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Form;
