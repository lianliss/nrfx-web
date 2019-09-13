import './CabinetWalletScreen.less';

import React from 'react';

import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import { ProfileSidebarItem } from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';
import WalletBox from '../../../components/cabinet/WalletBox/WalletBox';
import WalletBoxNew from '../../../components/cabinet/WalletBox/WalletBoxNew';
import CabinetBaseScreen from '../CabinetBaseScreen/CabinetBaseScreen';
import HistoryTable from './components/HistoryTable';
import LoadingMore from '../../../components/cabinet/LoadingMore/LoadingMore';
import WalletBalance from '../../../components/cabinet/WalletBalance/WalletBalance';

import * as walletsActions from '../../../actions/cabinet/wallets';
import Paging from "../../../components/cabinet/Paging/Paging";
import * as modalGroupActions from "../../../actions/modalGroup";

import * as storeUtils from "../../../storeUtils";
import * as CLASSES from "../../../constants/classes";

class CabinetWalletScreen extends CabinetBaseScreen {
  load = (section = null) => {
    switch (section || this.props.routerParams.section) {
      default:
        this.props.loadWallets();
        break;
    }
  };

  state = {
    walletSelected: null
  };

  render() {
    return (
      <div>
        <PageContainer
          leftContent={!this.props.routerParams.section  && !this.isLoading && this.__renderRightContent()}
          sidebarOptions={this.props.sidebarOptions}
        >
          {this.__renderContent()}
        </PageContainer>
      </div>
    )
  }

  __renderRightContent = () => {
    return <WalletBalance wallets={this.props.wallets} walletSelected={this.state.walletSelected} />;
  };

  __renderContent = () => {
    if (this.isLoading) {
      return <LoadingStatus status={this.props.loadingStatus[this.section]} onRetry={() => this.load()} />;
    }

    switch (this.props.routerParams.section) {
      case 'transfers': {
        return this.__getTransfersPageContent();
      }
      default: {
        return this.__getWalletsPageContent();
      }
    }
  };

  __getTransfersPageContent = () => {
    return (
      <div>
        {this.__getTransfers()}
      </div>
    )
  };

  __getWalletsPageContent = () => {
    return (
      <div>
        {this.__renderWallets()}
        <div className="CabinetWalletScreen__transactions_padding">
          {this.__getTransactions()}
        </div>
      </div>
    )
  };

  __getTransactions = () => {
    return <div>
      <Paging
        isCanMore={!!this.props.transactions.next && !this.props.transactionsLoadingMore}
        onMore={this.props.loadMoreTransactions}
        moreButton={!!this.props.transactions.next}
        isLoading={this.props.transactionsLoadingMore}
      >
        <HistoryTable history={'items' in this.props.transactions ? this.props.transactions.items : []} />
      </Paging>
    </div>
  };

  __getTransfers = () => {
    return <div>
      <Paging
        isCanMore={!!this.props.transfers.next && !this.props.transfersLoadingMore}
        onMore={this.props.loadMoreTransfers}
        moreButton={!!this.props.transfers.next}
        isLoading={this.props.transfersLoadingMore}
      >
        <HistoryTable history={'items' in this.props.transfers ? this.props.transfers.items : []} />
      </Paging>
    </div>
  };

  __renderWallets = () => {
    const rows = this.props.wallets.map((wallet, i) => {
      return <WalletBox
        key={i}
        {...wallet}
        onClick={() => {this.__walletSelect(wallet)}}
        walletSelected={this.state.walletSelected}
      />
    });
    const isCanCreate = walletsActions.getNoGeneratedCurrencies().length > 0;
    return (
      <div className="CabinetWalletScreen__wallets">
        {rows}
        {isCanCreate && <WalletBoxNew />}
      </div>
    )
  };

  __walletSelect = (wallet) => {
    let walletSelected = wallet;
    if (wallet === this.state.walletSelected) {
      walletSelected = null;
    }

    this.setState({walletSelected});
  }
}

export const sidebarOptions = {
  items: [
    <ProfileSidebarItem
      onClick={() => {modalGroupActions.openModalPage('new_wallet')}}
      icon={require('../../../asset/24px/plus-circle.svg')}
      label="New Wallet"
    />,
    <ProfileSidebarItem
      section={'transfers'}
      icon={require('../../../asset/24px/history.svg')}
      label="Transfers"
    />,
    <ProfileSidebarItem
      onClick={() => {modalGroupActions.openModalPage('send', {preset:'Bitcoin'})}}
      icon={require('../../../asset/24px/send.svg')}
      label="Send"
    />,
    <ProfileSidebarItem
      onClick={() => {modalGroupActions.openModalPage('receive')}}
      icon={require('../../../asset/24px/receive.svg')}
      label="Receive"
    />
  ]
};

export default storeUtils.getWithState(
  CLASSES.CABINET_WALLET_SCREEN,
  CabinetWalletScreen
);
