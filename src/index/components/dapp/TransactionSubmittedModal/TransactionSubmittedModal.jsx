import React from 'react';
import PropTypes from 'prop-types';
import { Web3Context } from 'services/web3Provider';

// Components
import TransactionModal from '../TransactionModal/TransactionModal';
import SVG from 'utils/svg-wrap';
import { Button } from 'src/ui';

// Utils
import { classNames as cn, getLang } from 'src/utils';

// Styles
import './TransactionSubmittedModal.less';

function TransactionSubmittedModal(props) {
  const context = React.useContext(Web3Context);
  const { addTokenToWallet, ethereum, network } = context;
  const isMetaMask = ethereum.isMetaMask;
  const { symbol, txLink, addToken, isInProgress, text, coinForAddToWallet } =
    props;

  const AddToMetamaskButton = ({ onClick }) => {
    return (
      <Button
        type={isInProgress ? 'secondary-light' : 'secondary-blue'}
        className="metaMask_button"
        onClick={onClick}
        shadow={isInProgress}
      >
        <div className="text-with-icon">
          <span
            className={cn(
              { ['default-text']: !isInProgress },
              { ['dark-text']: isInProgress }
            )}
          >
            {getLang('dapp_global_add')}&nbsp;
            {symbol}&nbsp;
            {getLang('dapp_global_to_metamask')}
          </span>
          <SVG src={require('src/asset/icons/social/metaMask.svg')} />
        </div>
      </Button>
    );
  };
  return (
    <TransactionModal title={getLang('dapp_transaction_submitted')} {...props}>
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
            <span className="default-text">
              {getLang('dapp_view_on_scan').replace(
                '{scan}',
                network.scanTitle
              )}
            </span>
            <SVG
              src={require('src/asset/icons/export.svg')}
              style={{ width: 14, height: 14 }}
            />
          </a>
        )}
        {text && <p className="default-text text-with-icon">{text}</p>}
        <div className="TransactionSubmittedModal__buttons">
          {!!addToken && isMetaMask && (
            <AddToMetamaskButton onClick={addToken} />
          )}
          {!!coinForAddToWallet && isMetaMask && (
            <AddToMetamaskButton
              onClick={() => addTokenToWallet(coinForAddToWallet)}
            />
          )}
          <Button type="lightBlue" size="extra_large" onClick={props.onClose}>
            {getLang('global_close')}
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
