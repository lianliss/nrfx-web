import './CabinetWalletScreen.less';

import React from 'react';
import { connect } from 'react-redux';

import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import { ProfileSidebarItem } from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';
import WalletBox from '../../../components/cabinet/WalletBox/WalletBox';
import WalletBoxNew from '../../../components/cabinet/WalletBox/WalletBoxNew';
import CabinetBaseScreen from '../CabinetBaseScreen/CabinetBaseScreen';
import HistoryTable from './components/HistoryTable';
import LoadingMore from '../../../components/cabinet/LoadingMore/LoadingMore';
import WalletBalance from './components/WalletBalance';

import * as walletsActions from '../../../actions/cabinet/wallets';
import Paging from "../../../components/cabinet/Paging/Paging";
import * as modalGroupActions from "../../../actions/modalGroup";

class CabinetWalletScreen extends CabinetBaseScreen {
  load = (section = null) => {
    switch (section || this.props.routerParams.section) {
      default:
        this.props.loadWallets();
        break;
    }
  };

  render() {
    return (
      <div>
        <PageContainer
          leftContent={!this.props.routerParams.section  && !this.isLoading && this.__renderLeftContent()}
          sidebarOptions={{
            section: this.props.routerParams.section,
            appName: 'Wallets',
            items: [
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

  __renderLeftContent() {
    return <WalletBalance wallets={this.props.wallets} />;
  }

  __renderContent() {

    if (this.isLoading) {
      return <LoadingStatus status={this.props.loadingStatus[this.section]} onRetry={() => this.load()} />;
    }

    switch (this.props.routerParams.section) {
      default:
        return this.__renderMainContent();
    }
  }

  __renderMainContent() {
    return (
      <div>
        {this.__renderWallets()}
        <Paging
          isCanMore={!!this.props.transactionsNext && !this.props.transactionsLoadingMore}
          onMore={this.props.loadMoreTransactions}
        >
          <HistoryTable history={'items' in this.props.transactions ? this.props.transactions.items : []} />
        </Paging>
        {this.props.transactionsNext && <LoadingMore status={this.props.transactionsLoadingMore} />}
      </div>
    )
  }

  __renderWallets() {
    const rows = this.props.wallets.map((wallet, i) => <WalletBox key={i} {...wallet} />);
    const isCanCreate = walletsActions.getNoGeneratedCurrencies().length > 0;
    return (
      <div className="CabinetWalletScreen__wallets">
        {rows}
        {isCanCreate && <WalletBoxNew />}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ ...state.wallets });

export default connect(mapStateToProps, {
  loadWallets: walletsActions.loadWallets,
  loadMoreTransactions: walletsActions.loadMoreTransactions,
  modalGroupSetActiveModal: modalGroupActions.modalGroupSetActiveModal
})(React.memo(CabinetWalletScreen));
