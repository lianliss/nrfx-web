import './DepositInfoModal.less';

import React from 'react';
import UI from '../../../ui';
import moment from 'moment/min/moment-with-locales';

import InfoRow, { InfoRowGroup } from '../../../components/cabinet/InfoRow/InfoRow';
import * as utils from '../../../utils';
import * as actions from '../../../actions';

export default class DepositInfoModal extends React.Component {
  render() {
    if (!this.props.deposit) {
      return null;
    }

    const deposit = JSON.parse(this.props.deposit);
    const currency = deposit.currency.toUpperCase();
    const currencyInfo = actions.getCurrencyInfo(currency);

    return (
      <UI.Modal noSpacing isOpen={true} onClose={() => {this.props.close()}}>
        <UI.ModalHeader>
          Deposit {deposit.percent}% {deposit.description}
          <div className="DepositInfoModal__icon" style={{ backgroundImage: `url(${currencyInfo.icon})` }} />
        </UI.ModalHeader>
        <div className="DepositInfoModal__cont">
          <div className="DepositInfoModal__columns">
            <InfoRowGroup className="DepositInfoModal__column">
              <InfoRow label="ID">{deposit.localId}</InfoRow>
              <InfoRow label="Type">{utils.ucfirst(deposit.type)}</InfoRow>
              <InfoRow label="Status">{utils.ucfirst(deposit.status)}</InfoRow>
              <InfoRow label="Created">{moment(deposit.created_at).format('DD MMM YYYY h:mm a')}</InfoRow>
              <InfoRow label="Withdrawals">None</InfoRow>
              <InfoRow label="W/ Amount">None</InfoRow>
            </InfoRowGroup>
            <InfoRowGroup className="DepositInfoModal__column">
              <InfoRow label="Period">{deposit.passed_days} / {deposit.days} Days</InfoRow>
              <InfoRow label="Amount">{deposit.amount} {currency}</InfoRow>
              <InfoRow label="Profit">{deposit.profit.toFixed(4)} {currency} (78%)</InfoRow>
              <InfoRow label="Estimated">120 {currency} (78%)</InfoRow>
              <InfoRow label="In Fiat">1456 USD</InfoRow>
              <InfoRow label="Avalible">120 {currency}</InfoRow>
            </InfoRowGroup>
          </div>
          {/*<div className="DepositInfoModal__withdrawal_form">
            <UI.Input placeholder="Type amount" indicator={<div className="DepositInfoModal__withdrawal_form__currency">LTC</div>} />
            <UI.Button type="outline">Max</UI.Button>
            <UI.Button style={{width: 208, flex: '0 0 auto'}}>Withdraw</UI.Button>
          </div>*/}
        </div>
      </UI.Modal>
    )
  }
}
