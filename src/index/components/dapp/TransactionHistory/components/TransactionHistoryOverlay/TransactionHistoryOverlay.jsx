import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Col, Button } from 'src/ui';
import SVG from 'utils/svg-wrap';
import Overlay from '../../../ui/Overlay/Overlay';
import LoadingStatus from '../../../LoadingStatus/LoadingStatus';

// Utils
import { dataStatus } from 'src/index/constants/dapp/types';
import { openStateModal } from 'src/actions';
import { statusEqual } from '../../utils/actions';
import { getLang } from 'utils';

// Styles
import './TransactionHistoryOverlay.less';

function TransactionHistoryOverlay({
  transactionsStatus,
  isConnectWalletButton,
}) {
  return (
    <Overlay className="TransactionHistoryOverlay">
      <Col alignItems="center">
        {statusEqual(transactionsStatus, dataStatus.LOADING) ? (
          <LoadingStatus status="loading" />
        ) : (
          <>
            <h3 className="DappUI__Overlay-empty">
              {getLang('dapp_transactions_empty_yet')}
            </h3>
            {isConnectWalletButton && (
              <Button
                type="lightBlue"
                size="extra_large"
                onClick={() => openStateModal('connect_to_wallet')}
              >
                <SVG
                  src={require('src/asset/icons/cabinet/connect-wallet.svg')}
                />
                {getLang('dapp_global_connect_wallet')}
              </Button>
            )}
          </>
        )}
      </Col>
    </Overlay>
  );
}

TransactionHistoryOverlay.propTypes = {
  transactionsStatus: PropTypes.oneOf(Object.keys(dataStatus)),
  isConnectWalletButton: PropTypes.bool,
};

TransactionHistoryOverlay.defaultProps = {
  transactionsStatus: dataStatus.IDLE,
  isConnectWalletButton: false,
};

export default TransactionHistoryOverlay;
