import React from 'react';
import PropTypes from 'prop-types';

// Components
import TransactionModal from '../TransactionModal/TransactionModal';
import RecentTransactions from './components/RecentTransactions/RecentTransactions';
import SVG from 'utils/svg-wrap';
import { Button } from 'src/ui';

// Styles
import './YourWalletModal.less';

function YourWalletModal() {
  return (
    <TransactionModal title="Your Wallet" className="YourWalletModal">
      <div className="row">
        <div className="col">
          <span>Connected</span>
        </div>
        <div className="col">
          <Button type="lightBlue" size="extra_large">Change</Button>
        </div>
      </div>
      <div className="row">
        <p>0ghjddursnvk568690458ldjsdhdvu4453djksl</p>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col"></div>
      </div>
      <div className="row">
        <RecentTransactions />
      </div>
      <div className="row">
        <Button>Logout</Button>
      </div>
    </TransactionModal>
  );
}

export default YourWalletModal;
