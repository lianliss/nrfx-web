import React from 'react';
import UI from '../../../../ui';

import * as utils from '../../../../utils';
import * as actions from '../../../../actions';
import * as modalGroupActions from '../../../../actions/modalGroup';

function BalanceItem({ amount, currency }) {
  const currencyInfo = actions.getCurrencyInfo(currency);
  currency = currency.toUpperCase();

  return (
    <div className="Investments__summary__item Content_box">
      <div key="info" className="Investments__summary__item__rows">
        <InfoRow label={utils.getLang("global_invested")}>{amount} {currency}</InfoRow>
      </div>
      <div className="Investments__summary__item__actions empty">
        <UI.Button key="button" type="default" size="small" onClick={() => modalGroupActions.openModalPage('open_deposit', { currency })}>
          {utils.getLang('cabinet_profileScreen_actionCard_invest')}
        </UI.Button>
      </div>
      <div className="Investments__summary__item__icon" style={{backgroundImage: `url(${currencyInfo.icon})`}} />
    </div>
  )
}

function InfoRow({ label, children, highlighted }) {
  return (
    <div className="Investments__summary__item__info_row">
      <div className="Investments__summary__item__info_row__label">{label}</div>
      <div className={utils.classNames({
        Investments__summary__item__info_row__value: true,
        highlighted: !!highlighted
      })}>{children}</div>
    </div>
  )
}

export default function Balances({data}) {
  /*
align:  0.0146764
amount: 0.0146764
currency: "btc"
   */
  return data.map(item => {
    return BalanceItem(item);
  });

}
