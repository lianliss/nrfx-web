import React from 'react';
import PropTypes from 'prop-types';

// Components
import TransactionModal from '../TransactionModal/TransactionModal';
import RecentTransactions from './components/RecentTransactions/RecentTransactions';
import SVG from 'utils/svg-wrap';
import { Button, CopyText } from 'src/ui';

// Styles
import './YourWalletModal.less';

function YourWalletModal(props) {
  const address = '0ghjddursnvk568690458ldjsdhdvu4453djkasdadasdsl';

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
        <p className="YourWalletModal__address">{address}</p>
      </div>
      <div className="row">
        <div className="col">
          <CopyText text={address}>
            <span className="action-text">
              Copy Address
              <SVG src={require('src/asset/icons/action/copy.svg')} />
            </span>
          </CopyText>
        </div>
        <div className="col">
          <div className="action-text">
            View on BacScan <SVG src={require('src/asset/icons/export.svg')} />
          </div>
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
