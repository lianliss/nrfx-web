import './CabinetInvestmentsScreen.less';

import React from 'react';
import SVG from 'react-inlinesvg';
import UI from '../../../ui';
import moment from 'moment/min/moment-with-locales';

import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import SummaryItem from './components/SummaryItem';
import { ProfileSidebarItem } from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';
import * as utils from '../../../utils';
import EmptyContentBlock from '../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';
import * as modalGroupActions from '../../../actions/modalGroup';

import * as storeUtils from "../../../storeUtils";
import * as CLASSES from "../../../constants/classes";
import ChartProfit from "./components/ChartProfit";

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
        {this._renderDeposits()}
      </div>
    )
  }

  __renderProfitHistory() {
    const profits = this.props.profits;
    if (!profits.items) {
      return (
        <EmptyContentBlock
          icon={require('../../../asset/120/no_deposits.svg')}
          message="No Profit History"
        />
      )
    }

    const headings = [
      <UI.TableColumn align="center" highlighted style={{ width: 40 }}>
        <SVG src={require('../../../asset/cabinet/filter.svg')} />
      </UI.TableColumn>,
      <UI.TableColumn>ID</UI.TableColumn>,
      <UI.TableColumn>Rate</UI.TableColumn>,
      <UI.TableColumn>Type</UI.TableColumn>,
      <UI.TableColumn>Invested</UI.TableColumn>,
      <UI.TableColumn align="right">Amount</UI.TableColumn>,
      <UI.TableColumn>Currency</UI.TableColumn>,
      <UI.TableColumn>Profit Type</UI.TableColumn>,
      <UI.TableColumn>Date</UI.TableColumn>,
    ];

    const rows = profits.items.map((item, i) => {
      return (
        <UI.TableCell key={i}>
          <UI.TableColumn />
          <UI.TableColumn>{utils.formatTableId(item.profit.id)}</UI.TableColumn>
          <UI.TableColumn sub="Standart">{item.plan.percent}</UI.TableColumn>
          <UI.TableColumn>{item.plan.description}</UI.TableColumn>
          <UI.TableColumn>{item.deposit.amount} {item.deposit.currency.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn>{utils.formatDouble(item.profit.amount)}</UI.TableColumn>
          <UI.TableColumn>{item.deposit.currency.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn>{item.profit.type}</UI.TableColumn>
          <UI.TableColumn>{moment(item.profit.date).format('DD MMM YYYY h:mm a')}</UI.TableColumn>
        </UI.TableCell>
      )
    });

    return (
      <div>
        <h2>Profit History</h2>
        <UI.Table headings={headings} className="Investment__profits_table">
          {rows}
        </UI.Table>
      </div>
    )
  }

  __renderWithdrawalHistory() {
    return (
      <h1>withdrawal</h1>
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

  _renderDeposits() {
    if (!this.props.deposits.length) {
      return (
        <EmptyContentBlock
          icon={require('../../../asset/120/no_deposits.svg')}
          message="No Open Deposits"
          button={{
            text: 'Start Invest',
            onClick: () => modalGroupActions.openModalPage('open_deposit')
          }}
        />
      )
    }

    const headings = [
      <UI.TableColumn align="center" highlighted style={{ width: 40 }}>
        <SVG src={require('../../../asset/cabinet/filter.svg')} />
      </UI.TableColumn>,
      <UI.TableColumn>ID</UI.TableColumn>,
      <UI.TableColumn>Type</UI.TableColumn>,
      <UI.TableColumn>Rate</UI.TableColumn>,
      <UI.TableColumn align="right">Invested</UI.TableColumn>,
      <UI.TableColumn align="right">Profit</UI.TableColumn>,
    ];

    const rows = this.props.deposits.map((item, i) => {
      const progress = Math.max(0.01, item.passed_days / item.days);
      const pathLength = 69.12472534179688;
      const offset = pathLength * progress;
      const color = progress >= 1 ? '#BFBFBF' : '#24B383';

      item.localId = i + 1;
      return (
        <UI.TableCell key={item.id} onClick={() => {modalGroupActions.openModalPage('deposit_info', {
          deposit: JSON.stringify(item)
        })}}>
          <UI.TableColumn align="center" highlighted style={{ width: 40 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.2" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z" stroke="#24B383" strokeWidth="2"/>
              <path
                style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength - offset}
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </UI.TableColumn>
          <UI.TableColumn>{utils.formatTableId(this.props.deposits.length - i)}</UI.TableColumn>
          <UI.TableColumn>{utils.ucfirst(item.type)}</UI.TableColumn>
          <UI.TableColumn sub={item.description}>{item.percent}%</UI.TableColumn>
          <UI.TableColumn align="right">{item.amount} {item.currency.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn sub={`${item.passed_days} / ${item.days} Days`} align="right">10 {item.currency.toUpperCase()}</UI.TableColumn>
        </UI.TableCell>
      )
    });

    return (
      <UI.Table headings={headings}>
        {rows}
      </UI.Table>
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
    <ProfileSidebarItem
      section="profits"
      icon={require('../../../asset/24px/invest.svg')}
      label="Profit"
    />,
    <ProfileSidebarItem
      section="withdrawals"
      icon={require('../../../asset/24px/send.svg')}
      label="Withdrawals"
    />
  ]
};

export default storeUtils.getWithState(
  CLASSES.CABINET_INVESTMENTS_SCREEN,
  CabinetInvestmentsScreen
);
