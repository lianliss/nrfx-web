import React from "react";
import * as UI from "../../../../../ui";

import * as utils from "../../../../../utils";
import * as actions from "../../../../../actions";
import { ReactComponent as WithdrawSvg } from "../../../../../asset/24px/withdraw.svg";

export default function CurrentPayments({ payments, adaptive }) {
  if (!payments.length) {
    return <></>;
  }

  let headings = [
    <UI.TableColumn></UI.TableColumn>,
    <UI.TableColumn align="right">
      {utils.getLang("global_invested")}
    </UI.TableColumn>,
    <UI.TableColumn align="right">
      {utils.getLang("cabinet_investmentsProfit")}
    </UI.TableColumn>,
    <UI.TableColumn align="right">
      {utils.getLang("global_available")}
    </UI.TableColumn>
  ];

  if (adaptive) {
    headings = [
      <UI.TableColumn></UI.TableColumn>,
      <UI.TableColumn
        align="left"
        sub={utils.getLang("cabinet_investmentsProfit")}
      >
        {utils.getLang("global_invested")}
      </UI.TableColumn>,
      <UI.TableColumn align="center">
        {utils.getLang("global_available")}
      </UI.TableColumn>
    ];
  }

  const rows = payments.map((item, i) => {
    const currencyInfo = actions.getCurrencyInfo(item.currency);
    const currency = item.currency.toUpperCase();
    if (adaptive) {
      return (
        <UI.TableCell key={i}>
          <UI.TableColumn
            align="right"
            style={{ width: 50, position: "relative" }}
          >
            <UI.CircleIcon
              size="small"
              className="Investments__CurrentPayments__item__icon"
              currency={currencyInfo}
            />
          </UI.TableColumn>
          <UI.TableColumn align="left" sub={utils.formatDouble(item.profit, 6)}>
            {utils.formatDouble(item.invested_amount, 6) + " " + currency}
          </UI.TableColumn>
          <UI.TableColumn align="center">
            {utils.formatDouble(item.available, 6)}
          </UI.TableColumn>
          <UI.TableColumn
            align="right"
            style={{ width: 20, position: "relative" }}
          >
            <UI.Button
              key="button"
              type="secondary"
              size="small"
              style={{ width: 15 }}
              onClick={() =>
                actions.openModal("withdrawal", { currency: item.currency })
              }
            >
              <WithdrawSvg />
            </UI.Button>
          </UI.TableColumn>
        </UI.TableCell>
      );
    }
    return (
      <UI.TableCell key={i}>
        <UI.TableColumn
          align="right"
          style={{ width: 20, position: "relative" }}
        >
          <UI.CircleIcon
            size="small"
            className="Investments__CurrentPayments__item__icon"
            currency={currencyInfo}
          />
        </UI.TableColumn>
        <UI.TableColumn align="right">
          {utils.formatDouble(item.invested_amount, 6) + " " + currency}
        </UI.TableColumn>
        <UI.TableColumn align="right">
          {utils.formatDouble(item.profit, 6)}
        </UI.TableColumn>
        <UI.TableColumn align="right">
          {utils.formatDouble(item.available, 6)}
        </UI.TableColumn>
        <UI.TableColumn
          align="right"
          style={{ width: 20, position: "relative" }}
        >
          <UI.Button
            key="button"
            type="secondary"
            size="small"
            style={{ width: 15 }}
            onClick={() =>
              actions.openModal("withdrawal", { currency: item.currency })
            }
          >
            <WithdrawSvg />
          </UI.Button>
        </UI.TableColumn>
      </UI.TableCell>
    );
  });

  return (
    <div>
      <UI.Table
        headings={headings}
        hidden={true}
        adaptive={adaptive}
        header={utils.getLang("global_current")}
      >
        {rows}
      </UI.Table>
    </div>
  );
}
