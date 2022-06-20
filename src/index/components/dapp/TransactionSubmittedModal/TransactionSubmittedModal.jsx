import React from 'react';
import PropTypes from 'prop-types';

// Components
import TransactionModal from '../TransactionModal/TransactionModal';
import SVG from 'utils/svg-wrap';
import { Button } from 'src/ui';

// Styles
import './TransactionSubmittedModal.less';

function TransactionSubmittedModal({ metaMask, ...props }) {
  return (
    <TransactionModal title="Transaction submitted" {...props}>
      <div className="TransactionSubmittedModal">
        <div className="TransactionSubmittedModal__icon">
          <SVG src={require('src/asset/icons/transaction/submitted.svg')} />
        </div>
        <div className="text-with-icon view_on_bac_scan">
          <span className="default-text">View on BscScan</span>
          <SVG
            src={require('src/asset/icons/export.svg')}
            style={{ width: 14, height: 14 }}
          />
        </div>
        {metaMask && (
          <Button type="secondary-blue" className="metaMask_button">
            <div className="text-with-icon">
              <span className="default-text">Add BUSD to Metamask</span>
              <SVG src={require('src/asset/icons/social/metaMask.svg')} />
            </div>
          </Button>
        )}
        <Button type="lightBlue" size="extra_large" onClick={props.onClose}>
          Close
        </Button>
      </div>
    </TransactionModal>
  );
}

TransactionSubmittedModal.propTypes = {
  metaMask: PropTypes.bool,
};

TransactionSubmittedModal.defaultProps = {
  metaMask: false,
};

export default TransactionSubmittedModal;
