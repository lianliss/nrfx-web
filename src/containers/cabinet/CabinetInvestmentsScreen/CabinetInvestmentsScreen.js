import './CabinetInvestmentsScreen.less';

import React from 'react';

import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import SummaryItem from './components/SummaryItem';
import WithdrawaHistorylTable from './components/WithdrawaHistorylTable';
import ProfitHistorylTable from './components/ProfitHistorylTable';
import DepositTable from './components/DepositTable';
import { ProfileSidebarItem } from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import ChartProfit from "./components/ChartProfit";
import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';
import * as modalGroupActions from '../../../actions/modalGroup';

import * as storeUtils from "../../../storeUtils";
import * as utils from "../../../utils";
import * as CLASSES from "../../../constants/classes";
import Paging from "../../../components/cabinet/Paging/Paging";

class CabinetInvestmentsScreen extends React.PureComponent {
  get section() {
    return this.props.routerParams.section || 'default';
  }

  get isLoading() {
    return !!this.props.loadingStatus[this.section];
  }

  componentDidMount() {
    this.__load();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.routerParams.section !== this.props.routerParams.section) {
      this.__load(nextProps.routerParams.section || 'default');
    }
  }

  __load = (section = null) => {
    switch (section || this.props.routerParams.section) {
      case 'profits':
        this.props.loadProfitHistory();
        break;
      case 'withdrawals':
        this.props.loadWithdrawalHistory();
        break;
      default:
        this.props.loadInvestments();
        break;
    }
  };

  render() {
    return (
      <div>
        <PageContainer
          leftContent={!this.props.routerParams.section  && !this.isLoading && this.__renderLeftContent()}
          sidebarOptions={this.props.sidebarOptions}
        >
          {this.__renderContent()}
        </PageContainer>
      </div>
    )
  }

  __renderContent() {
    if (this.isLoading) {
      return <LoadingStatus status={this.props.loadingStatus[this.section]} onRetry={() => this.__load()} />;
    }

    switch (this.props.routerParams.section) {
      case 'profits':
        return this.__renderProfitHistory();
      case 'withdrawals':
        return this.__renderWithdrawalHistory();
      default:
        return this.__renderMainContent();
    }
  }

  __renderMainContent() {
    return (
      <div>
        {this.__renderSummary()}
        <DepositTable deposits={this.props.deposits} />
      </div>
    )
  }

  __renderProfitHistory() {
    const profits = this.props.profits;
    return (
      <div>
        <ProfitHistorylTable profits={profits} />
      </div>
    )
  }

  __renderWithdrawalHistory() {
    const { withdrawals } = this.props;

    return (
      <div>
        <h2>{utils.getLang('cabinet_investmentsWithdrawalHistory')}</h2>
        <Paging
          isCanMore={!!withdrawals.next && !withdrawals.isLoadingMore}
          onMore={this.props.loadMoreWithdrawalHistory}
          moreButton={!!withdrawals.next}
          isLoading={withdrawals.isLoadingMore}
        >
          <WithdrawaHistorylTable withdrawals={withdrawals} />
        </Paging>
      </div>
    )
  }

  __renderLeftContent() {
    if (!this.props.chart.hasOwnProperty('data')) {
      return <LoadingStatus />;
    }

    return <ChartProfit chart={{...this.props.chart}} />
  };

  __renderSummary() {
    if (!this.props.payments.length) {
      return null;
    }

    let existCurrencies = {};
    for (let item of this.props.payments) {
      existCurrencies[item.currency] = true;
    }

    let payments = this.props.payments;
    let allCurrencies = ['btc', 'eth', 'ltc'];
    for (let currency of allCurrencies) {
      if (existCurrencies[currency]) {
        continue;
      }

      payments.push({
        currency,
        isEmpty: true
      });
    }

    const items = payments.map((item, i) => <SummaryItem key={i} {...item} />);

    return (
      <div className="Investments__summary">
        {items}
      </div>
    )
  }
}

export const sidebarOptions = {
  items: [
    <ProfileSidebarItem
      onClick={() => {modalGroupActions.openModalPage('open_deposit', {})}}
      icon={require('../../../asset/24px/plus-circle.svg')}
      label="New"
    />,
    <ProfileSidebarItem section="profits" icon={require('../../../asset/24px/invest.svg')} label="Profit" />,
    <ProfileSidebarItem section="withdrawals" icon={require('../../../asset/24px/send.svg')} label="Withdrawals" />
  ]
};

export default storeUtils.getWithState(
  CLASSES.CABINET_INVESTMENTS_SCREEN,
  CabinetInvestmentsScreen
);
