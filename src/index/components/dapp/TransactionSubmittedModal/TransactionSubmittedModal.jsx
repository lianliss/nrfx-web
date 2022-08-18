import React from 'react';
import PropTypes from 'prop-types';
import { Web3Context } from 'services/web3Provider';

// Components
import TransactionModal from '../TransactionModal/TransactionModal';
import SVG from 'utils/svg-wrap';
import { Button } from 'src/ui';

// Styles
import './TransactionSubmittedModal.less';

function TransactionSubmittedModal(props) {
  const context = React.useContext(Web3Context);
  const {addTokenToWallet} = context;
  const {symbol, txLink, addToken, isInProgress, text, token} = props;
  return (
    <TransactionModal title="Transaction submitted" {...props}>
      <div className="TransactionSubmittedModal">
        <div className="TransactionSubmittedModal__icon">
          {isInProgress
            ? <SVG src={require('src/asset/icons/transaction/speed.svg')} />
            : <SVG src={require('src/asset/icons/transaction/submitted.svg')} />}
        </div>
        {!!text && <p className="default small secondary large-height">
          {text}
        </p>}
        {!!txLink && <a href={txLink} target="_blank" className="text-with-icon view_on_bac_scan">
          <span className="default-text">View on BscScan</span>
          <SVG
            src={require('src/asset/icons/export.svg')}
            style={{ width: 14, height: 14 }}
          />
        </a>}
        {(!!addToken || !!token) && (
          <Button type="secondary-blue" className="metaMask_button" onClick={() => {
            if (addToken) {
              addToken();
            } else {
              addTokenToWallet(token);
            }
          }}>
            <div className="text-with-icon">
              <span className="default-text">Add {symbol} to Metamask</span>
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
