import './CabinetWalletScreen.less';

import React from 'react';

import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import { ProfileSidebarItem } from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';
import WalletBox from '../../../components/cabinet/WalletBox/WalletBox';
import WalletBoxNew from '../../../components/cabinet/WalletBox/WalletBoxNew';
import CabinetBaseScreen from '../CabinetBaseScreen/CabinetBaseScreen';
import HistoryTable from './components/HistoryTable';
import WalletBalance from '../../../components/cabinet/WalletBalance/WalletBalance';
import * as PAGES from '../../../constants/pages';

import * as walletsActions from '../../../actions/cabinet/wallets';
import Paging from "../../../components/cabinet/Paging/Paging";
import * as modalGroupActions from "../../../actions/modalGroup";

import * as storeUtils from "../../../storeUtils";
import * as CLASSES from "../../../constants/classes";

import { ReactComponent as PlusCircleSvg } from '../../../asset/24px/plus-circle.svg';
import { ReactComponent as HistorySvg } from '../../../asset/24px/history.svg';
import { ReactComponent as SendSvg } from '../../../asset/24px/send.svg';
import { ReactComponent as ReceiveSvg } from '../../../asset/24px/receive.svg';
import * as utils from "../../../utils";
import UI from '../../../ui';
import router from "../../../router";

class CabinetWalletScreen extends CabinetBaseScreen {
  load = (section = null) => {
    switch (section || this.props.routerParams.section) {
      default:
        this.props.loadWallets();
        break;
    }
  };

  get wallets() {
    return this.props.wallets.sort((a, b) => {
      return (a.currency < b.currency) ? -1 : 1;
    });
  }

  componentDidMount() {
    this.props.setTitle(utils.getLang("cabinet_header_wallets"));
    this.load();
  }

  state = {
    walletSelected: null
  };

  render() {
    return (
      <div>
        <PageContainer
          leftContent={!this.props.adaptive && !this.props.routerParams.section  && !this.isLoading && this.__renderRightContent()}
          sidebarOptions={this.props.adaptive ? [
            <UI.FloatingButtonItem
              icon={require('../../../asset/24px/send.svg')}
              onClick={() => {modalGroupActions.openModalPage('send', {preset:'Bitcoin'})}}
            >{utils.getLang('site__contactSend')}</UI.FloatingButtonItem>,
            <UI.FloatingButtonItem
              icon={require('../../../asset/24px/receive.svg')}
              onClick={() => {modalGroupActions.openModalPage('receive')}}
            >{utils.getLang('cabinet_walletScreen_receive')}</UI.FloatingButtonItem>,
            <UI.FloatingButtonItem
              icon={require('../../../asset/24px/history.svg')}
              onClick={() => {
                router.navigate(PAGES.CABINET_WALLET, { section: 'transfers' })
              }}
            >{utils.getLang('cabinet_walletScreen_transfers')}</UI.FloatingButtonItem>,
            !!walletsActions.getNoGeneratedCurrencies().length && <UI.FloatingButtonItem
              icon={require('../../../asset/24px/plus-circle.svg')}
              onClick={() => {modalGroupActions.openModalPage('new_wallet')}}
            >{utils.getLang("cabinet_walletBox_create")}</UI.FloatingButtonItem>
          ] : [
            !!walletsActions.getNoGeneratedCurrencies().length && <ProfileSidebarItem
              onClick={() => {modalGroupActions.openModalPage('new_wallet')}}
              icon={<PlusCircleSvg />}
              label={utils.getLang("cabinet_walletBox_create")}
            />,
            <ProfileSidebarItem
              section={'transfers'}
              icon={<HistorySvg />}
              label={utils.getLang('cabinet_walletScreen_transfers')}
            />,
            <ProfileSidebarItem
              onClick={() => {modalGroupActions.openModalPage('send', {preset:'Bitcoin'})}}
              icon={<SendSvg />}
              label={utils.getLang('site__contactSend')}
            />,
            <ProfileSidebarItem
              onClick={() => {modalGroupActions.openModalPage('receive')}}
              icon={<ReceiveSvg />}
              label={utils.getLang('cabinet_walletScreen_receive')}
            />
          ]}
        >
          {this.props.adaptive && !this.props.routerParams.section  && !this.isLoading && this.__renderRightContent()}
          {this.__renderContent()}
        </PageContainer>
      </div>
    )
  }

  __renderRightContent = () => {
    return (
      <div>
        <WalletBalance adaptive={this.props.adaptive} wallets={this.wallets} walletSelected={this.state.walletSelected} />
        {this.props.adaptive && <div className="CabinetWalletScreen__height_padding"> </div>}
      </div>
    );
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
        {this.__renderTransfers()}
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
        <HistoryTable adaptive={this.props.adaptive} history={'items' in this.props.transactions ? this.props.transactions.items : []} />
      </Paging>
      <div className="CabinetWalletScreen__height_padding">
      </div>
    </div>
  };

  __renderTransfers = () => {
    return <div>
      <Paging
        isCanMore={!!this.props.transfers.next && !this.props.transfersLoadingMore}
        onMore={this.props.loadMoreTransfers}
        moreButton={!!this.props.transfers.next}
        isLoading={this.props.transfersLoadingMore}
      >
        <HistoryTable adaptive={this.props.adaptive} history={'items' in this.props.transfers ? this.props.transfers.items : []} />
      </Paging>
    </div>
  };

  __renderWallets = () => {
    const rows = this.wallets.map((wallet, i) => {
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
        {this.props.adaptive ? <div className="CabinetWalletsScreen__walletsContentBox">
          {rows}
        </div> : rows}
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
