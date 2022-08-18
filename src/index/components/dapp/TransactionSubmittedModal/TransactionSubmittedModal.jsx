import React from 'react';
import PropTypes from 'prop-types';
import { Web3Context } from 'services/web3Provider';

// Components
import TransactionModal from '../TransactionModal/TransactionModal';
import SVG from 'utils/svg-wrap';
import { Button } from 'src/ui';
import { classNames as cn } from 'src/utils';

// Styles
import './TransactionSubmittedModal.less';

function TransactionSubmittedModal(props) {
  const context = React.useContext(Web3Context);
  const { symbol, txLink, addToken, isInProgress, text } = props;
  return (
    <TransactionModal title="Transaction submitted" {...props}>
      <div
        className={cn('TransactionSubmittedModal', {
          ['TransactionSubmittedModal__isInProgress']: isInProgress,
        })}
      >
        <div className="TransactionSubmittedModal__icon">
          {isInProgress ? (
            <SVG
              src={require('src/asset/icons/transaction/isInProgress.svg')}
            />
          ) : (
            <SVG src={require('src/asset/icons/transaction/submitted.svg')} />
          )}
        </div>
        {txLink && (
          <a
            href={txLink}
            target="_blank"
            className="text-with-icon view_on_bac_scan"
          >
            <span className="default-text">View on BscScan</span>
            <SVG
              src={require('src/asset/icons/export.svg')}
              style={{ width: 14, height: 14 }}
            />
          </a>
        )}
        {text && <p className="default-text text-with-icon">{text}</p>}
        <div className="TransactionSubmittedModal__buttons">
          {!!addToken && (
            <Button
              type={isInProgress ? 'secondary-light' : 'secondary-blue'}
              className="metaMask_button"
              onClick={addToken}
              shadow={isInProgress}
            >
              <div className="text-with-icon">
                <span
                  className={cn(
                    { ['default-text']: !isInProgress },
                    { ['dark-text']: isInProgress }
                  )}
                >
                  Add {symbol} to Metamask
                </span>
                <SVG src={require('src/asset/icons/social/metaMask.svg')} />
              </div>
            </Button>
          )}
          <Button type="lightBlue" size="extra_large" onClick={props.onClose}>
            Close
          </Button>
        </div>
      </div>
    </TransactionModal>
  );
}

TransactionSubmittedModal.propTypes = {
  metaMask: PropTypes.bool,
  isInProgress: PropTypes.bool,
  text: PropTypes.string,
};

TransactionSubmittedModal.defaultProps = {
  metaMask: false,
  isInProgress: false,
  text: null,
};

export default TransactionSubmittedModal;
