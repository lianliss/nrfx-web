import React from 'react';
import { useSelector } from 'react-redux';

// Components
import SVG from 'utils/svg-wrap';
import TransactionModal from '../../TransactionModal/TransactionModal';

// Utils
import { Web3Context } from 'services/web3Provider';
import { classNames as cn, getLang } from 'src/utils';
import * as CONNECTORS from 'services/multiwallets/connectors';
import { getConnectorObject } from 'services/multiwallets/multiwalletsDifference';

// Styles
import './ConnectToWalletModal.less';

function ConnectToWalletModal(props) {
  const context = React.useContext(Web3Context);
  const { isConnected, connectWallet } = context;
  const adaptive = useSelector((state) => state.default.adaptive);

  const handleTrustWallet = () => {
    if (!adaptive) {
      connectWallet(CONNECTORS.TRUST_WALLET);
      return;
    }

    const isTrust = getConnectorObject(CONNECTORS.TRUST_WALLET);
    if (isTrust) {
      connectWallet(CONNECTORS.TRUST_WALLET);
      return;
    }

    window.open(
      `trust://open_url?coin_id=60&url=${window.location.href}`,
      '_blank'
    );
  };

  React.useEffect(() => {
    if (isConnected) {
      props.onClose();
    }

    // if (!isConnected && adaptive) {
    //   connectWallet(getCurrentConnector(adaptive));
    //   props.onClose();
    // }
  }, [isConnected, adaptive]);

  return (
    <TransactionModal
      title={getLang('dapp_connet_wallet_modal_title')}
      className="ConnectToWalletModal"
      {...props}
    >
      <div className="ConnectToWalletModal__wallets">
        <div className="row">
          <Wallet
            title="Metamask"
            icon={require('src/asset/icons/social/metaMask.svg')}
            style={{ background: '#fff' }}
            onClick={() => connectWallet(CONNECTORS.METAMASK)}
          />
          <Wallet
            title="Trust Wallet"
            icon={require('src/asset/icons/social/trustWallet.svg')}
            style={{ background: '#3375bb' }}
            onClick={handleTrustWallet}
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
            onClick={() => connectWallet(CONNECTORS.WALLET_CONNECT)}
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
            onClick={() => connectWallet(CONNECTORS.BSC)}
            style={{ background: '#1e2026' }}
          />
          {/* <Wallet
            title="OKX Wallet"
            icon={require('src/asset/icons/social/okx-wallet.svg')}
            onClick={() => connectWallet(CONNECTORS.OKX_WALLET)}
            style={{ background: '#000' }}
          /> */}
        </div>
      </div>
      <span className="action-text">
        <SVG src={require('src/asset/icons/cabinet/question-icon.svg')} />
        &nbsp;{getLang('dapp_learn_how_to_connect')}
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
