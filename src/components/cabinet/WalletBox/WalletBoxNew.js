import './WalletBox.less';

import React from 'react';

import * as actions from '../../../actions';

export default function WalletBoxNew() {
  return (
    <div
      className="WalletBox"
      onClick={() => actions.openModal('new_wallet')}
    >
      <div className="WalletBox__content new">
        Create New Wallet
      </div>
    </div>
  )
}
