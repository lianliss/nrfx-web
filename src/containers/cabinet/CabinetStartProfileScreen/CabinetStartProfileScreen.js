import './CabinetStartProfileScreen.less';

import React from 'react';

import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import { ProfileSidebarItem } from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import CabinetBaseScreen from '../CabinetBaseScreen/CabinetBaseScreen';
import EmptyWalletBox from './components/EmptyWalletBox';
import ActionCardBox from './components/ActionCardBox';
import WalletBoxNew from '../../../components/cabinet/WalletBox/WalletBoxNew';

import * as walletsActions from '../../../actions/cabinet/wallets';

class CabinetStartProfileScreen extends CabinetBaseScreen {
  wallets = [{name: "btc"}, {name: "eth"}, {name: "ltc"}];
  cards = [
    {
      icon: require('../../../asset/120/invest.svg'),
      description: "Invest your financials to get more profit",
      actionTitle: "Invest",
      action: () => {}
    },
    {
      icon: require('../../../asset/120/trade.svg'),
      description: "Use our bots to get more profit",
      actionTitle: "Trade",
      action: () => {}
    },
    {
      icon: require('../../../asset/120/bots.svg'),
      description: "Trade on our awesome exchange",
      actionTitle: "Coming Soon",
      action: () => {}
    }
  ];

  render() {
    return (
      <div>
        <PageContainer
          leftContent={this.__renderRightContent()}
          sidebarOptions={{
            section: !this.props.routerParams.section,
            appName: 'Welcome',
            items: [
              <ProfileSidebarItem icon={require('../../../asset/24px/send.svg')} label="Verification" />,
              <ProfileSidebarItem icon={require('../../../asset/24px/settings.svg')} label="Settings" />,
              <ProfileSidebarItem icon={require('../../../asset/24px/id-badge.svg')} label="Customers" />,
              <ProfileSidebarItem icon={require('../../../asset/24px/user.svg')} label="Partners" />
            ]
          }}
        >
          {this.__renderMainContent()}
        </PageContainer>
      </div>
    )
  }

  __renderRightContent() {
    return <>
      <div>
        123
      </div>
    </>;
  }

  __renderMainContent() {
    return (
      <div>
        {this.__renderWallets()}
        {this.__renderCards()}
      </div>
    )
  }

  __renderCards() {
    return (
      <div className="CabinetStartProfileScreen__actionCards">
        {this.cards.map((card, i) => {
          return <ActionCardBox key={i} {...card} />
        })}
      </div>
    )
  }
  __renderWallets() {
    const rows = this.wallets.map((wallet, i) => <EmptyWalletBox key={i} {...wallet} />);
    const isCanCreate = walletsActions.getNoGeneratedCurrencies().length > 0;

    return (
      <div className="CabinetStartProfileScreen__wallets">
        {rows}
        {isCanCreate && <WalletBoxNew />}
      </div>
    )
  }
}

export default React.memo(CabinetStartProfileScreen);
