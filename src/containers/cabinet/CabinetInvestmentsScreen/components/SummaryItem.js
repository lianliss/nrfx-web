import React from 'react';
import UI from '../../../../ui';

import * as utils from '../../../../utils';
import * as actions from '../../../../actions';
import * as modalGroupActions from '../../../../actions/modalGroup';
import { ReactComponent as WithdrawSvg } from '../../../../asset/24px/withdraw.svg';

export default function SummaryItem({ available, currency, invested_amount, paid_amount }) {
  const currencyInfo = actions.getCurrencyInfo(currency);
  currency = currency.toUpperCase();

  const getCont = () => {
    if (!(invested_amount > 0)) {
      return [
        <div key="info" className="Investments__summary__item__rows">
          <InfoRow label="Invested">None</InfoRow>
        </div>,
        <div className="Investments__summary__item__actions empty">
          <UI.Button key="button" type="default" size="small" onClick={() => modalGroupActions.openModalPage('open_deposit', { currency })}>
            {utils.getLang('cabinet_profileScreen_actionCard_invest')}
          </UI.Button>
        </div>
      ];
    } else {
      return [
        <div key="info" className="Investments__summary__item__rows">
          <InfoRow label="Invested">{utils.formatDouble(invested_amount)} {currency}</InfoRow>
          <InfoRow label="Available" highlighted>{available} {currency}</InfoRow>
        </div>,
        <div className="Investments__summary__item__actions">
          <UI.Button key="button" type="default" size="small" onClick={() => modalGroupActions.openModalPage('open_deposit', { currency })}>
            {utils.getLang('cabinet_profileScreen_actionCard_invest')}
          </UI.Button>
          <UI.Button key="button" type="secondary" size="small" onClick={() => modalGroupActions.openModalPage('withdrawal', { currency })}>
            <WithdrawSvg />
          </UI.Button>
        </div>
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
