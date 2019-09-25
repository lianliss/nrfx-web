import './CabinetInvestmentsScreen.less';

import React from 'react';

import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import Balances from './components/Balances';
import WithdrawaHistorylTable from './components/WithdrawaHistorylTable';
import ProfitHistorylTable from './components/ProfitHistorylTable';
import DepositTable from './components/DepositTable';
import CurrentPayments from './components/CurrentPayments';
import AllPayments from './components/AllPayments';
import { ProfileSidebarItem } from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import ChartProfit from "../../../components/cabinet/ChartProfit/ChartProfit";
import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';
import * as modalGroupActions from '../../../actions/modalGroup';

import * as storeUtils from "../../../storeUtils";
import * as utils from "../../../utils";
import * as CLASSES from "../../../constants/classes";
import Paging from "../../../components/cabinet/Paging/Paging";

import { ReactComponent as PlusCircleSvg } from '../../../asset/24px/plus-circle.svg';
import { ReactComponent as InvestSvg } from '../../../asset/24px/invest.svg';
import { ReactComponent as SendSvg } from '../../../asset/24px/send.svg';
import UI from '../../../ui';
import router from '../../../router';
import * as PAGES from '../../../constants/pages';


class CabinetInvestmentsScreen extends React.PureComponent {
  get section() {
    return this.props.routerParams.section || 'default';
  }

  get isLoading() {
    return !!this.props.loadingStatus[this.section];
  }

  componentDidMount() {
    this.__load();
    this.props.setTitle(utils.getLang("site__headerInvestment"));
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
          sidebarOptions={this.props.adaptive ? [
            <UI.FloatingButtonItem
              icon={require('../../../asset/24px/plus-circle.svg')}
              onClick={() => {modalGroupActions.openModalPage('open_deposit', {})}}
            >{utils.getLang('cabinet_investmentsScreen_new')}</UI.FloatingButtonItem>,
            <UI.FloatingButtonItem
              icon={require('../../../asset/24px/invest.svg')}
              onClick={() => { router.navigate(PAGES.INVESTMENTS, { section: 'profits' })}}
            >{utils.getLang('cabinet_investmentsProfit')}</UI.FloatingButtonItem>,
            <UI.FloatingButtonItem
              onClick={() => { router.navigate(PAGES.INVESTMENTS, { section: 'withdrawals' })}}
              icon={require('../../../asset/24px/invest.svg')}
            >{utils.getLang('cabinet_investmentsScreen_withdrawals')}</UI.FloatingButtonItem>,
          ] : [
            <ProfileSidebarItem
              onClick={() => {modalGroupActions.openModalPage('open_deposit', {})}}
              icon={<PlusCircleSvg />}
              label={utils.getLang('cabinet_investmentsScreen_new')}
            />,
            <ProfileSidebarItem section="profits" icon={<InvestSvg />} label={utils.getLang('cabinet_investmentsProfit')} />,
            <ProfileSidebarItem section="withdrawals" icon={<SendSvg />} label={utils.getLang('cabinet_investmentsScreen_withdrawals')} />
          ]}
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
        {this.__renderBalances()}
        <DepositTable deposits={this.props.deposits} />
      </div>
    )
  }

  __renderProfitHistory() {
    const { profits } = this.props;
    const total = this.props.profitsTotal;
    return (
      <div>
        <Paging
          isCanMore={!!profits.next && !(this.props.loadingStatus.profitsAppend === "loading")}
          onMore={this.props.loadMoreProfitHistory}
          moreButton={!!profits.next}
          isLoading={this.props.loadingStatus.profitsAppend === "loading"}
        >
          <ProfitHistorylTable profits={profits} total={total} />
        </Paging>
      </div>
    )
  }

  __renderWithdrawalHistory() {
    const { withdrawals, withdrawalsTotalCount } = this.props;

    return (
      <div>
        <Paging
          isCanMore={!!withdrawals.next && !withdrawals.isLoadingMore}
          onMore={this.props.loadMoreWithdrawalHistory}
          moreButton={!!withdrawals.next}
          isLoading={withdrawals.isLoadingMore}
        >
          <WithdrawaHistorylTable withdrawals={withdrawals} withdrawalsTotalCount={withdrawalsTotalCount} />
        </Paging>
      </div>
    )
  }

  __renderLeftContent() {
    if (!this.props.chart.hasOwnProperty('data')) {
      return <LoadingStatus status="loading" />;
    }

    return [
      <ChartProfit chart={{...this.props.chart}} />,
      this.__renderCurrentPayments(),
      <div className="Investment__heightPadding">
      </div>,
      this.__renderAllPayments()
    ];
  };

  __renderBalances() {
    if (!this.props.balances.length) {
      return null;
    }

    return (
      <div className="Investments__balances">
        <Balances data={this.props.balances} />
      </div>
    )
  }

  __renderAllPayments = () => {
    if (!this.props.payments.length) {
      return null;
    }

    const notEmptyPayments = this.props.payments.filter(item => item.total_invested_amount > 0);
    if (notEmptyPayments.length === 0) {
      return null;
    }

    return (
      <div className="Investments__summary">
        <AllPayments payments={notEmptyPayments} />
      </div>
    )
  };

  __renderCurrentPayments = () => {
    if (!this.props.payments.length) {
      return null;
    }

    const notEmptyPayments = this.props.payments.filter(item => item.invested_amount > 0);
    if (notEmptyPayments.length === 0) {
      return null;
    }

    return [
      <div className="Investment__heightPadding">
      </div>,
      <div className="Investments__payments">
        <CurrentPayments payments={notEmptyPayments} />
      </div>
    ]
  };
}

export default storeUtils.getWithState(
  CLASSES.CABINET_INVESTMENTS_SCREEN,
  CabinetInvestmentsScreen
);
