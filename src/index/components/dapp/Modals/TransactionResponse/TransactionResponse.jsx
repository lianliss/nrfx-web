import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Button, Col, Row } from 'ui';
import { CabinetModal } from 'dapp';
import SVG from 'utils/svg-wrap';

// Utils
import { getLang, classNames as cn } from 'utils';
import _ from 'lodash';
import { statusIcons, types } from './types';

// Styles
import './TransactionResponse.less';

function TransactionResponse({
  token,
  addTokenToWallet = true,
  title,
  description,
  type = types.ERROR,
  ...cabinetModalProps
}) {
  const [textAddTokenTo, setTextAddToTokenTo] = React.useState('');

  React.useEffect(() => {
    let textAddTokenTo = getLang('dapp_button_add_token_to');

    if (_.isFunction(textAddTokenTo.replace)) {
      textAddTokenTo = textAddTokenTo.replace(
        'token',
        _.get(token, 'symbol', '')
      );

      setTextAddToTokenTo(textAddTokenTo);
    }
  }, []);

  return (
    <CabinetModal
      className="TransactionResponse"
      closeButton
      closeOfRef
      {...cabinetModalProps}
    >
      <Col className="TransactionResponse__container" alignItems="center">
        <div
          className={cn({
            TransactionResponse__statusIcon: true,
            [type]: type,
          })}
        >
          <SVG src={statusIcons[type]} />
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        {addTokenToWallet && (
          <Button type="secondary-alice" size="extra_large">
            <Row alignItems="center" justifyContent="center" wrap>
              {textAddTokenTo}
              <SVG
                src={require('src/asset/icons/social/metamask-emblem.svg')}
              />
            </Row>
          </Button>
        )}
        <Button
          type="lightBlue"
          size="extra_large"
          onClick={cabinetModalProps.onClose}
        >
          <Row alignItems="center">{getLang('global_close')}</Row>
        </Button>
      </Col>
    </CabinetModal>
  );
}

TransactionResponse.propTypes = {
  token: PropTypes.object,
  addTokenToWallet: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.oneOf(Object.values(types)).isRequired,
};

TransactionResponse.defaultProps = {
  token: {},
  addTokenToWallet: null,
  title: '',
  description: '',
  type: types.ERROR,
};

export default TransactionResponse;
