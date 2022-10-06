import React from 'react';

// Components
import SVG from 'utils/svg-wrap';
import TransactionModal from '../../TransactionModal/TransactionModal';

// Utils
import { Web3Context } from 'services/web3Provider';
import { classNames as cn } from 'src/utils';

// Styles
import './ConnectToWalletModal.less';
import { useSelector } from 'react-redux';

function ConnectToWalletModal(props) {
  const context = React.useContext(Web3Context);
  const { isConnected, connectWallet } = context;
  const adaptive = useSelector((state) => state.default.adaptive);

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
          <Wallet
            title="Metamask"
            icon={require('src/asset/icons/social/metaMask.svg')}
            style={{ background: '#fff' }}
            onClick={() => connectWallet('metamask')}
          />
          <Wallet
            title="Trust Wallet"
            icon={require('src/asset/icons/social/walletConnect.svg')}
            style={{ background: '#3375bb' }}
            disabled={!adaptive}
          />
        </div>
        <div className="row">
          <Wallet
            title="WalletConnect"
            icon={require('src/asset/icons/social/walletConnect.svg')}
            style={{
              background:
                'radial-gradient(100% 100% at 0% 50%, #5D9DF6 0%, #006FFF 100%)',
            }}
            disabled
          />
          <Wallet
            title="Coinbase"
            icon={require('src/asset/icons/social/coinbase.svg')}
            style={{ background: '#0052ff' }}
            disabled
          />
        </div>
        <div className="row">
          <Wallet
            title="Binance Wallet"
            icon={require('src/asset/icons/social/binance-wallet.svg')}
            onClick={() => connectWallet('bsc')}
          />
        </div>
      </div>
      <span className="action-text">
        <SVG src={require('src/asset/icons/cabinet/question-icon.svg')} />
        &nbsp;Learn how to connect
      </span>
    </TransactionModal>
  );
}

const Wallet = ({
  icon = null,
  title = '',
  disabled = false,
  style = {},
  onClick = () => {},
}) => {
  return (
    <div
      className={cn({ ConnectToWalletModal__wallet: true, disabled })}
      onClick={onClick}
    >
      <div className="ConnectToWalletModal__wallet__icon" style={style}>
        <SVG src={icon} />
      </div>
      <div className="ConnectToWalletModal__title">{title}</div>
    </div>
  );
};

export default ConnectToWalletModal;
