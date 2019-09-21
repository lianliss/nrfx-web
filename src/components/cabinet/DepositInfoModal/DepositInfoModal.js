import './DepositInfoModal.less';

import React from 'react';
import UI from '../../../ui';
import moment from 'moment/min/moment-with-locales';

import InfoRow, { InfoRowGroup } from '../../../components/cabinet/InfoRow/InfoRow';
import * as utils from '../../../utils';
import * as actions from '../../../actions';
import * as modalGroupActions from "../../../actions/modalGroup";

export default class DepositInfoModal extends React.Component {
  render() {
    if (!this.props.deposit) {
      return null;
    }

    const deposit = JSON.parse(this.props.deposit);
    const currency = deposit.currency.toUpperCase();
    const currencyInfo = actions.getCurrencyInfo(currency);
    console.log(1, deposit);
    return (
      <UI.Modal noSpacing isOpen={true} onClose={() => {this.props.close()}}>
        <UI.ModalHeader>
          {utils.getLang('cabinet_depositInfoModal_deposit')} {deposit.percent}% {deposit.description}
          <div className="DepositInfoModal__icon" style={{ backgroundImage: `url(${currencyInfo.icon})` }} />
        </UI.ModalHeader>
        <div className="DepositInfoModal__cont">
          <div className="DepositInfoModal__columns">
            <InfoRowGroup className="DepositInfoModal__column">
              <InfoRow label="ID">{deposit.localId}</InfoRow>
              <InfoRow label="Type">{utils.ucfirst(deposit.type)}</InfoRow>
              <InfoRow label="Status">{utils.ucfirst(deposit.status)}</InfoRow>
              <InfoRow label="Created">{moment(deposit.created_at).format('DD MMM YYYY h:mm a')}</InfoRow>
            </InfoRowGroup>
            <InfoRowGroup className="DepositInfoModal__column">
              <InfoRow label="Period">{deposit.passed_days} / {deposit.days} {utils.getLang('cabinet_openNewDeposit_days')}</InfoRow>
              <InfoRow label="Amount">{deposit.amount} {currency}</InfoRow>
              <InfoRow label="Profit">{utils.formatDouble(deposit.profit, 8)} {currency} ({utils.formatDouble(deposit.current_percent, 2)}%)</InfoRow>
              <InfoRow label="In Fiat">{utils.formatDouble(deposit.usd_profit, 2)} USD</InfoRow>
            </InfoRowGroup>
          </div>
          {/*<div className="DepositInfoModal__withdrawal_form" style={{display:'flex'}}>*/}
          {/*<UI.Input placeholder="Type amount" indicator={<div className="DepositInfoModal__withdrawal_form__currency">LTC</div>} />*/}
          {/*<UI.Button type="outline">Max</UI.Button>*/}
          {/*<UI.Button style={{width: 208, margin: 'auto'}} onClick={() => modalGroupActions.openModalPage('withdrawal', { currency })}>*/}
          {/*Withdraw*/}
          {/*</UI.Button>*/}
          {/*</div>*/}
        </div>
      </UI.Modal>
    )
  }
}
