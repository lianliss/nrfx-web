import React from 'react';

// Components
import SVG from 'utils/svg-wrap';
import TransactionModal from '../../TransactionModal/TransactionModal';

// Utils
import { Web3Context } from 'services/web3Provider';

// Styles
import './ConnectToWalletModal.less';

function ConnectToWalletModal(props) {
  const context = React.useContext(Web3Context);
  const { isConnected, connectWallet } = context;

  React.useEffect(() => {
    if (isConnected) {
      props.onClose();
    }
  }, [isConnected]);

  return (
    <TransactionModal
      title="Connect to a wallet"
      className="ConnectToWalletModal"
      {...props}
    >
      <div className="ConnectToWalletModal__wallets">
        <div className="row">
          <div
            className="ConnectToWalletModal__wallet"
            onClick={() => connectWallet('metamask')}
          >
            <div
              className="ConnectToWalletModal__wallet__icon"
              style={{ background: '#fff' }}
            >
              <SVG src={require('src/asset/icons/social/metaMask.svg')} />
            </div>
            <div className="ConnectToWalletModal__title">Metamask</div>
          </div>
          <div
            className="ConnectToWalletModal__wallet"
            onClick={() => connectWallet('bsc')}
          >
            <div
              className="ConnectToWalletModal__wallet__icon"
              style={{ background: '#3375bb' }}
            >
              <SVG src={require('src/asset/icons/social/trustWallet.svg')} />
            </div>
            <div className="ConnectToWalletModal__title">Binance Chain</div>
          </div>
        </div>
        <div className="row">
          <div className="ConnectToWalletModal__wallet">
            <div
              className="ConnectToWalletModal__wallet__icon"
              style={{
                background:
                  'radial-gradient(100% 100% at 0% 50%, #5D9DF6 0%, #006FFF 100%)',
              }}
            >
              <SVG src={require('src/asset/icons/social/walletConnect.svg')} />
            </div>
            <div className="ConnectToWalletModal__title">WalletConnect</div>
          </div>
          <div className="ConnectToWalletModal__wallet">
            <div
              className="ConnectToWalletModal__wallet__icon"
              style={{ background: '#0052ff' }}
            >
              <SVG src={require('src/asset/icons/social/coinbase.svg')} />
            </div>
            <div className="ConnectToWalletModal__title">Coinbase</div>
          </div>
        </div>
      </div>
      <span className="action-text">
        <SVG src={require('src/asset/icons/cabinet/question-icon.svg')} /> Learn
        how to connect
      </span>
    </TransactionModal>
  );
}

export default ConnectToWalletModal;
