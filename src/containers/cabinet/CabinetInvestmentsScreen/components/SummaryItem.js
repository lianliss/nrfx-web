import React from 'react';
import UI from '../../../../ui';

import * as utils from '../../../../utils';
import * as actions from '../../../../actions';

export default function SummaryItem({ currency, invested_amount, paid_amount, isEmpty }) {
  const currencyInfo = actions.getCurrencyInfo(currency);
  currency = currency.toUpperCase();

  const getCont = () => {
    if (isEmpty) {
      return [
        <div key="info" className="Investments__summary__item__rows">
          <InfoRow label="Invested">None</InfoRow>
        </div>,
        <UI.Button key="button" type="outline" size="small" onClick={() => actions.openModal('open_deposit', { currency })}>Invest</UI.Button>,
      ];
    } else {
      return [
        <div key="info" className="Investments__summary__item__rows">
          <InfoRow label="Invested">{utils.formatDouble(invested_amount)} {currency}</InfoRow>
          <InfoRow label="Available" highlighted>123 {currency}</InfoRow>
        </div>,
        <UI.Button key="button" type="outline" size="small" onClick={() => actions.openModal('withdrawal', { currency })}>Withdraw</UI.Button>,
      ]
    }
  };

  return (
    <div className="Investments__summary__item Content_box">
      {getCont()}
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
