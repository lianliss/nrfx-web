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
  constructor(props) {
    super(props);
    this.content = this.__getWalletsPageContent;
  }

  load = (section = null) => {
    switch (section || this.props.routerParams.section) {
      case 'transactions':
        this.content = this.__getTransactionsPageContent;
        break;
      default:
        this.content = this.__getWalletsPageContent;
        break;
    }
    this.props.loadWallets();
  };

  state = {
    walletSelected: null
  };

  render() {
    return (
      <div>
        <PageContainer
          leftContent={!this.props.routerParams.section  && !this.isLoading && this.__renderRightContent()}
          sidebarOptions={{
            items: [
              <ProfileSidebarItem
                active={!this.props.routerParams.section}
                baselink={true}
                icon={require('../../../asset/24px/wallet.svg')}
                label="Wallets"
              />,
              <ProfileSidebarItem
                section={'transactions'}
                active={this.props.routerParams.section === 'transactions'}
                icon={require('../../../asset/24px/history.svg')}
                label="Transactions"
              />,
              <ProfileSidebarItem
                onClick={() => {modalGroupActions.openModalPage('new_wallet')}}
                icon={require('../../../asset/24px/plus-circle.svg')}
                label="New Wallet"
              />,
              <ProfileSidebarItem
                onClick={() => {modalGroupActions.openModalPage('send')}}
                icon={require('../../../asset/24px/send.svg')}
                label="Send"
              />,
              <ProfileSidebarItem
                onClick={() => {modalGroupActions.openModalPage('receive')}}
                icon={require('../../../asset/24px/receive.svg')}
                label="Receive"
              />
            ]
          }}
        >
          {this.__renderContent()}
        </PageContainer>
      </div>
    )
  }

  __renderRightContent = () => {
    console.log(3, this.props.wallets);
    return <WalletBalance wallets={this.props.wallets} walletSelected={this.state.walletSelected} />;
  };

  __renderContent = () => {
    if (this.isLoading) {
      return <LoadingStatus status={this.props.loadingStatus[this.section]} onRetry={() => this.load()} />;
    }
    return this.content();
  };

  __getTransactionsPageContent = () => {
    return (
      <div>
        {this.__getTransactions()}
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
        isCanMore={!!this.props.transactionsNext && !this.props.transactionsLoadingMore}
        onMore={this.props.loadMoreTransactions}
      >
        <HistoryTable history={'items' in this.props.transactions ? this.props.transactions.items : []} />
      </Paging>
      {this.props.transactionsNext && <LoadingMore status={this.props.transactionsLoadingMore} />}
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

export default storeUtils.getWithState(
  CLASSES.CABINET_WALLET_SCREEN,
  CabinetWalletScreen
);
