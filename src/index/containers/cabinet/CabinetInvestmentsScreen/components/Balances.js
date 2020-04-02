import React from "react";
import * as UI from "../../../../../ui";

import * as utils from "../../../../../utils";
import * as actions from "../../../../../actions";
import WalletBox from "../../../../components/cabinet/WalletBox/WalletBox";

function BalanceItem({ amount, currency }, key) {
  const currencyInfo = actions.getCurrencyInfo(currency);
  currency = currency.toUpperCase();

  return (
    <UI.ContentBox key={key} className="Investments__balances__item">
      <div className="Investments__balances__item__rows">
        <InfoRow label={utils.ucfirst(currencyInfo.name)}>
          {amount} {currency}
        </InfoRow>
      </div>
      {/*<div className="Investments__balances__item__actions empty disable_active_button">*/}
      {/*  <UI.Button*/}
      {/*    style={{background: currencyInfo.background}}*/}
      {/*    key="button"*/}
      {/*    type="normal"*/}
      {/*    size="middle"*/}
      {/*    onClick={() => actions.openModal('open_deposit', { currency })}*/}
      {/*  >*/}
      {/*    {utils.getLang('cabinet_profileScreen_actionCard_invest')}*/}
      {/*  </UI.Button>*/}
      {/*</div>*/}
      <UI.CircleIcon currency={currencyInfo} />
    </UI.ContentBox>
  );
}

function InfoRow({ label, children, highlighted }) {
  return (
    <div className="Investments__balances__item__info_row">
      <div className="Investments__balances__item__info_row__label">
        {label}
      </div>
      <div
        className={utils.classNames({
          Investments__balances__item__info_row__value: true,
          highlighted: !!highlighted
        })}
      >
        {children}
      </div>
    </div>
  );
}

export default function Balances({ data }) {
  return data.map((item, key) => {
    // return BalanceItem(item, key);
    return <WalletBox action={false} key={key} {...item} />;
  });
}
