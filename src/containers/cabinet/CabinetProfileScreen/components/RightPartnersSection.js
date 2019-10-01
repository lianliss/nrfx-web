import React from 'react';
//
import WalletBalance from '../../../../components/cabinet/WalletBalance/WalletBalance';

class RightPartnersSection extends React.Component {
  render() {
    return <div>
      {this.__renderBalance()}
    </div>
  }

  __renderBalance = () => {
    return <WalletBalance
      adaptive={this.props.adaptive}
      wallets={this.props.wallets}
      walletSelected={this.props.walletSelected}
    />
  }
}

export default RightPartnersSection;