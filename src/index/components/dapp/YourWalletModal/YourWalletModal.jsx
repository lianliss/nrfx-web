import React from 'react';
import PropTypes from 'prop-types';

// Components
import TransactionModal from '../TransactionModal/TransactionModal';
import RecentTransactions from './components/RecentTransactions/RecentTransactions';
import SVG from 'utils/svg-wrap';
import { Button, CopyText } from 'src/ui';

// Utils
import { Web3Context } from 'services/web3Provider';

// Styles
import './YourWalletModal.less';

function YourWalletModal(props) {
  const context = React.useContext(Web3Context);
  const { isConnected, chainId, accountAddress } = context;

  React.useEffect(() => {
    if (!isConnected) {
      props.onClose();
    }
  }, []);

  return (
    <TransactionModal
      title="Your Wallet"
      className="YourWalletModal"
      {...props}
    >
      <div className="row">
        <div className="col">
          <span>Connected</span>
        </div>
        <div className="col">
          <Button type="lightBlue" size="extra_large">
            Change
          </Button>
        </div>
      </div>
      <div className="row">
        <p className="YourWalletModal__address">{accountAddress}</p>
      </div>
      <div className="row">
        <div className="col">
          <CopyText text={accountAddress}>
            <span className="action-text">
              Copy Address
              <SVG src={require('src/asset/icons/action/copy.svg')} />
            </span>
          </CopyText>
        </div>
        <div className="col">
          <a href={`https://${chainId !== 56 && 'testnet.'}bscscan.com/address/${accountAddress}`}
             className="action-text">
            View on BscScan <SVG src={require('src/asset/icons/export.svg')} />
          </a>
        </div>
      </div>
      <div className="row">
        <RecentTransactions items={[1, 2]} />
      </div>
      <div className="row">
        <Button type="secondary-light" size="big">
          Logout
        </Button>
      </div>
    </TransactionModal>
  );
}

export default YourWalletModal;
