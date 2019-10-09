import React from 'react';
//
import * as utils from '../../../../utils';
import WalletBalance from '../../../../components/cabinet/WalletBalance/WalletBalance';
import ChartProfit from "../../../../components/cabinet/ChartProfit/ChartProfit";
import ClientChart from '../../../../components/cabinet/ClientChart/ClientChart';

class RightPartnersSection extends React.Component {
  render() {
    return <div>
      {this.__renderBalance()}
      {this.props.profit_chart && Object.keys(this.props.profit_chart.data).length > 0 && <ChartProfit
        chart={this.props.profit_chart}
        adaptive={this.props.adaptive}
      />}
      {!this.props.adaptive && this.props.client_chart && this.props.client_chart.data.length > 0 && <ClientChart
        title={this.__getClientsChartTitle()}
        chart={this.props.client_chart}
      />}
    </div>
  }

  __renderBalance = () => {
    return <WalletBalance
      title={utils.getLang('cabinet_referralBalance')}
      emptyPlaceholder={utils.getLang('cabinet_balance_statistics_placeholder')}
      adaptive={this.props.adaptive}
      wallets={this.props.wallets}
      walletSelected={this.props.walletSelected}
    />
  };

  __getClientsChartTitle() {
    const level = this.props.level;
    if (level === 'agent') {
      return utils.getLang('cabinet_partners_customers');
    } else if (level === 'representation') {
      return utils.getLang('cabinet_partners_agents');
    } else {
      return utils.getLang('cabinet_partners');
    }
  }
}

export default RightPartnersSection;