import './CabinetInvestmentsScreen.less';

import React from 'react';
import SVG from 'react-inlinesvg';
import { connect } from 'react-redux';
import UI from '../../../ui';

import CabinetWrapper from '../../../wrappers/Cabinet/CabinetWrapper';
import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import SummaryItem from './components/SummaryItem';
import InfoRow, { InfoRowGroup } from '../../../components/cabinet/InfoRow/InfoRow';
import { ProfileSidebarItem } from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import Chart from '../../../components/cabinet/Chart/Chart';

class CabinetInvestmentsScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isDepositInfoModalShown: false,
      isOpenDepositModalShown: false
    };
  }

  render() {
    return (
      <CabinetWrapper>
        <PageContainer
          leftContent={!this.props.routerParams.section && this.__renderLeftContent()}
          sidebarOptions={{
            section: this.props.routerParams.section,
            appName: 'Investments',
            items: [
              <ProfileSidebarItem icon={require('../../../asset/24px/plus-circle.svg')} label="New" onClick={this.__showOpenDepositModal} />,
              <ProfileSidebarItem section="profits" icon={require('../../../asset/24px/invest.svg')} label="Profit" />,
              <ProfileSidebarItem section="withdrawals" icon={require('../../../asset/24px/send.svg')} label="Withdrawals" />
            ]
          }}
        >
          {this.__renderContent()}
        </PageContainer>
        {this.__renderDepositInfoModal()}
        {this.__renderOpenDepositModal()}
      </CabinetWrapper>
    )
  }

  __renderContent() {
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
    return (
      <h1>PROFITS</h1>
    )
  }

  __renderWithdrawalHistory() {
    return (
      <h1>withdrawal</h1>
    )
  }

  __renderLeftContent() {
    const series = [{
      data: [1, 30, 10, 2, 40],
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
      data: [1, 30, 10, 2, 40].reverse(),
      type: 'spline',
      color: '#98B1F1',
      tooltip: {
        valueDecimals: 2
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
          <div className="Investment__profit__header__fiat">+435.56$</div>
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
    const items = [{
      currency: 'BTC',
    }, {
      currency: 'ETH',
    }, {
      currency: 'LTC',
    }].map((item, i) => <SummaryItem key={i} {...item} />);

    return (
      <div className="Investments__summary">
        {items}
      </div>
    )
  }

  _renderDeposits() {
    const headings = [
      <UI.TableColumn align="center" highlighted style={{ width: 40 }}>
        <SVG src={require('../../../asset/cabinet/filter.svg')} />
      </UI.TableColumn>,
      <UI.TableColumn>ID</UI.TableColumn>,
      <UI.TableColumn>Type</UI.TableColumn>,
      <UI.TableColumn>Rate</UI.TableColumn>,
      <UI.TableColumn align="right">Invested</UI.TableColumn>,
      <UI.TableColumn>Profit</UI.TableColumn>,
    ];

    const rows = [{
      id: 1
    }, {
      id: 2
    }, {
      id: 3
    }, {
      id: 4
    }].map((item) => {
      return (
        <UI.TableCell key={item.id} onClick={() => this.__showDepositInfoModal(item)}>
          <UI.TableColumn align="center" highlighted style={{ width: 40 }}>
            <div className="Investments__deposit_indicator" />
          </UI.TableColumn>
          <UI.TableColumn>001</UI.TableColumn>
          <UI.TableColumn>Dynamic</UI.TableColumn>
          <UI.TableColumn sub="Standart">14%</UI.TableColumn>
          <UI.TableColumn align="right">100 BTC</UI.TableColumn>
          <UI.TableColumn sub="12 / 90 Days">10 BTC</UI.TableColumn>
        </UI.TableCell>
      )
    });

    return (
      <UI.Table headings={headings}>
        {rows}
      </UI.Table>
    )
  }

  __renderDepositInfoModal() {
    return (
      <UI.Modal noSpacing isOpen={this.state.isDepositInfoModalShown} onClose={() => this.setState({ isDepositInfoModalShown: false })}>
        <UI.ModalHeader>
          Deposit 78% Optimal
          <div className="Investments__deposit_info_modal__icon" />
        </UI.ModalHeader>
        <div className="Investments__deposit_info_modal__cont">
          <div className="Investments__deposit_info_modal__columns">
            <InfoRowGroup className="Investments__deposit_info_modal__column">
              <InfoRow label="ID">001</InfoRow>
              <InfoRow label="Type">Static</InfoRow>
              <InfoRow label="Status">Closed</InfoRow>
              <InfoRow label="Created">29 Mar 2019 9:51 PM</InfoRow>
              <InfoRow label="Withdrawals">None</InfoRow>
              <InfoRow label="W/ Amount">None</InfoRow>
            </InfoRowGroup>
            <InfoRowGroup className="Investments__deposit_info_modal__column">
              <InfoRow label="Period">35 / 365 Days</InfoRow>
              <InfoRow label="Amount">2000 LTC</InfoRow>
              <InfoRow label="Profit">120 LTC (78%)</InfoRow>
              <InfoRow label="Estimated">120 LTC (78%)</InfoRow>
              <InfoRow label="In Fiat">1456 USD</InfoRow>
              <InfoRow label="Avalible">120 LTC</InfoRow>
            </InfoRowGroup>
          </div>
          <div className="Investments__deposit_info_modal__withdrawal_form">
            <UI.Input placeholder="Type amount" indicator={<div className="Investments__deposit_info_modal__withdrawal_form__currency">LTC</div>} />
            <UI.Button type="outline">Max</UI.Button>
            <UI.Button style={{width: 208, flex: '0 0 auto'}}>Withdraw</UI.Button>
          </div>
        </div>
      </UI.Modal>
    )
  }

  __renderOpenDepositModal() {
    return (
      <UI.Modal noSpacing isOpen={this.state.isOpenDepositModalShown} onClose={() => this.setState({ isOpenDepositModalShown: false })}>
        <UI.ModalHeader>
          Open New Deposit
        </UI.ModalHeader>
        <div className="Investments__open_deposit_modal">
          <div className="Investments__open_deposit_modal__row">
            <UI.Input
              placeholder="Amount"
              indicator="min 0.04 BTC"
            />
          </div>
          <div className="Investments__open_deposit_modal__invest_btn_wrapper">
            <UI.Button>Invest</UI.Button>
          </div>
        </div>
      </UI.Modal>
    )
  }

  __showDepositInfoModal = (deposit) => {
    this.setState({ isDepositInfoModalShown: true });
  };

  __showOpenDepositModal = () => {
    this.setState({ isOpenDepositModalShown: true });
  };
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(CabinetInvestmentsScreen);