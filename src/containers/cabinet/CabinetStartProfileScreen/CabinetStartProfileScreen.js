import './CabinetStartProfileScreen.less';

import React from 'react';

import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import { ProfileSidebarItem } from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import CabinetBaseScreen from '../CabinetBaseScreen/CabinetBaseScreen';
import WalletBox from '../../../components/cabinet/WalletBox/WalletBox';
import ActionCardBox from './components/ActionCardBox';
import WalletBoxNew from '../../../components/cabinet/WalletBox/WalletBoxNew';

import * as walletsActions from '../../../actions/cabinet/wallets';
import {connect} from "react-redux";

class CabinetStartProfileScreen extends CabinetBaseScreen {
  load = (section = null) => {
    switch (section || this.props.routerParams.section) {
      default:
        this.props.loadWallets();
        break;
    }
  };

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

  rightContentCards = [
    {
      icon: require('../../../asset/120/buy_currency.svg'),
      description: "Here will be your balance statistics",
      actionTitle: "Buy currency",
      action: () => {}
    }, {
      icon: require('../../../asset/120/start_invest.svg'),
      description: "Here will be your investment statistics",
      actionTitle: "Start Invest",
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
          {this.__renderWallets()}
          {this.__renderCards()}
        </PageContainer>
      </div>
    )
  }

  __renderRightContent() {
    return <div className="CabinetStartProfileScreen__actionCards CabinetStartProfileScreen__right">
      {this.rightContentCards.map((card, i) => {
        return <ActionCardBox
          height={344}
          key={i} {...card}
        />
      })}
    </div>
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
    const rows = this.props.wallets.map((wallet, i) => <WalletBox key={i} {...wallet} />);
    const isCanCreate = walletsActions.getNoGeneratedCurrencies().length > 0;
    return (
      <div className="CabinetStartProfileScreen__wallets">
        {rows}
        {isCanCreate && <WalletBoxNew />}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ ...state.wallets });

export default connect(mapStateToProps, {
  loadWallets: walletsActions.loadWallets
})(React.memo(CabinetStartProfileScreen));
