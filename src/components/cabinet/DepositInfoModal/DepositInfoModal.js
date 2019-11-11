import './DepositInfoModal.less';

import React from 'react';
import UI from '../../../ui';
import moment from 'moment/min/moment-with-locales';

import InfoRow, { InfoRowGroup } from '../../../components/cabinet/InfoRow/InfoRow';
import * as utils from '../../../utils';
import * as actions from '../../../actions';

export default class DepositInfoModal extends React.Component {
  render() {
    const deposit = this.props.deposit;

    if (!deposit) {
      this.props.onClose();
      return null;
    }

    const adaptive = document.body.classList.contains('adaptive');
    const currency = deposit.currency.toUpperCase();
    const currencyInfo = actions.getCurrencyInfo(currency);
    return (
      <UI.Modal noSpacing className="DepositInfoModal__wrapper" isOpen={true} onClose={this.props.onClose}>
        <UI.ModalHeader>
          {utils.getLang('cabinet_depositInfoModal_deposit')} {deposit.plan_percent}% {deposit.description}
        </UI.ModalHeader>
        <div className="DepositInfoModal__cont">
          <div className="DepositInfoModal__icon" style={{ backgroundImage: `url(${currencyInfo.icon})` }} />
          {adaptive && <div className="DepositInfoModal__amount">
            <div className="DepositInfoModal__amount__label">{utils.getLang("site__headerInvestment")}</div>
            <div className="DepositInfoModal__amount__number">{deposit.amount} {currency}</div>
          </div> }
          <div className="DepositInfoModal__columns">
            <InfoRowGroup className="DepositInfoModal__column">
              <InfoRow label="ID">{deposit.localId}</InfoRow>
              <InfoRow label={utils.getLang("global_type")}>{utils.ucfirst(deposit.type)}</InfoRow>
              <InfoRow label={utils.getLang("global_status")}>{utils.ucfirst(deposit.status)}</InfoRow>
              <InfoRow label={utils.getLang("created")}>{utils.dateFormat(deposit.created_at)}</InfoRow>
            </InfoRowGroup>
            <InfoRowGroup className="DepositInfoModal__column">
              <InfoRow label={utils.getLang("period")}>{deposit.passed_days} / {deposit.days} {utils.getLang('cabinet_openNewDeposit_days')}</InfoRow>
              <InfoRow label={utils.getLang("global_amount")}>{deposit.amount} {currency}</InfoRow>
              <InfoRow label={utils.getLang("cabinet_investmentsScreen_profit")}>{utils.formatDouble(deposit.profit, 8)} {currency} ({utils.formatDouble(deposit.current_percent, 2)}%)</InfoRow>
              <InfoRow label={utils.getLang("in_fiat")}>{utils.formatDouble(deposit.usd_profit, 2)} USD</InfoRow>
              <InfoRow label={utils.getLang("global_estimated")}>{deposit.percent}%</InfoRow>
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
