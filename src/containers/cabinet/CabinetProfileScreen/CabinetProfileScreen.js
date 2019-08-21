import './CabinetProfileScreen.less';

import React from 'react';

import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import {ProfileSidebarItem} from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import CabinetBaseScreen from '../CabinetBaseScreen/CabinetBaseScreen';
import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';

import WalletBox from '../../../components/cabinet/WalletBox/WalletBox';
import * as pages from '../../../constants/pages';
import * as storeUtils from "../../../storeUtils";
import * as CLASSES from "../../../constants/classes";
import WalletBalance from '../../../components/cabinet/WalletBalance/WalletBalance';
import * as walletsActions from "../../../actions/cabinet/wallets";

class CabinetProfileScreen extends CabinetBaseScreen {
  constructor(props) {
    super(props);
    this.content = this.__getProfilePageContent;
  }

  state = {
    walletSelected: null
  };

  load = (section = null) => {
    switch (section || this.props.routerParams.section) {
      case 'partners':
        this.content = 'partners';
        break;
      case 'customers':
        this.content = 'customers';
        break;
      default:
        this.content = this.__getProfilePageContent;
        break;
    }
    this.props.loadWallets();
  };

  render() {
    return (
      <div>
        <PageContainer
          leftContent={!this.props.routerParams.section  && !this.isLoading && this.__renderRightContent()}
          sidebarOptions={{
            items: [
              <ProfileSidebarItem
                onClick={
                  () => {this.props.router.navigate(pages.SETTINGS)}
                }
                icon={require('../../../asset/24px/settings.svg')}
                label="Settings"
              />,
              <ProfileSidebarItem icon={require('../../../asset/24px/id-badge.svg')} label="Customers" />,
              <ProfileSidebarItem icon={require('../../../asset/24px/user.svg')} label="Partners" />
            ]
          }}
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
    return this.content();
  };

  __getProfilePageContent = () => {
    return (
      <div>
        {this.__renderWallets()}
      </div>
    )
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
    return (
      <div className="CabinetWalletScreen__wallets">
        {rows}
      </div>
    )
  };

  __walletSelect = (wallet) => {
    let walletSelected = wallet;
    if (wallet === this.state.walletSelected) {
      walletSelected = null;
    }

    this.setState({walletSelected});
  };
}

export default storeUtils.getWithState(
  CLASSES.CABINET_PFOFILE_SCREEN,
  CabinetProfileScreen
);