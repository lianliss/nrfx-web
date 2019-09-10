import './CabinetInvestmentsScreen.less';

import React from 'react';

import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import SummaryItem from './components/SummaryItem';
import WithdrawaHistorylTable from './components/WithdrawaHistorylTable';
import ProfitHistorylTable from './components/ProfitHistorylTable';
import DepositTable from './components/DepositTable';
import { ProfileSidebarItem } from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import Chart from '../../../components/cabinet/Chart/Chart';
import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';
import * as modalGroupActions from '../../../actions/modalGroup';

import * as storeUtils from "../../../storeUtils";
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
    console.log(3, this.props);
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
        <h2>Profit History</h2>
        <ProfitHistorylTable profits={profits} />
      </div>
    )
  }

  __renderWithdrawalHistory() {
    const { withdrawals } = this.props;

    return (
      <div>
        <h2>Withdrawal History</h2>
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
    //console.log(44, this.props.chart.usd_profit);
    //console.log(45, this.props.chart.data);

    //const chartCurrencies = {};
    // if (this.props.chart.hasOwnProperty('data') && this.props.chart.data) {
    //   this.props.chart.data.map(item => {
    //     switch (item.currency) {
    //       case 'btc':
    //         if (!chartCurrencies.hasOwnProperty(item.currency)) {
    //
    //         }
    //         break;
    //     }
    //     chartCurrencies[item.currency] = {
    //
    //     };
    //   });
    // }

    const series = [{
      data: [4000, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      type: 'spline',
      color: '#FF9E65',
      name: 'BTC',
      tooltip: {
        valueDecimals: 2
      },
      shadow: {
        color: '#FF9E65',
      }
    }, {
      name: 'ETH',
      data: [6, 7, 8, 9, 10],
      type: 'spline',
      color: '#98B1F1',
      tooltip: {
        valueDecimals: 11
      },
      shadow: {
        color: '#98B1F1',
      }
    }];

    return (
      <div className="Content_box Investment__profit">
        <div className="Investment__profit__header">
          <div className="Investment__profit__header__cont">
            <h3>Profit</h3>
            <div className="Investment__profit__header__period">30 Days</div>
          </div>
          <div className="Investment__profit__header__fiat">111$</div>
        </div>
        <div className="Investment__profit__chart">
          <Chart
            series={series}
          />
        </div>
      </div>
    )
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
