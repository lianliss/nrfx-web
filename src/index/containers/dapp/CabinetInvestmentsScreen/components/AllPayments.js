import React from "react";
import * as UI from "../../../../../ui";

import * as utils from "../../../../../utils";
import * as actions from "../../../../../actions";

export default function CurrentPayments({ payments, adaptive }) {
  if (!payments.length) {
    return <></>;
  }

  const headings = [
    <UI.TableColumn></UI.TableColumn>,
    <UI.TableColumn align="right">
      {utils.getLang("global_invested")}
    </UI.TableColumn>,
    <UI.TableColumn align="right">
      {utils.getLang("cabinet_investmentsProfit")}
    </UI.TableColumn>,
    <UI.TableColumn align="right">
      {utils.getLang("global_withdrawn")}
    </UI.TableColumn>
  ];

  const rows = payments.map((item, i) => {
    const currencyInfo = actions.getCurrencyInfo(item.currency);
    const currency = item.currency.toUpperCase();
    return (
      <UI.TableCell key={Math.random()}>
        <UI.TableColumn
          align="right"
          style={{ width: 20, position: "relative" }}
        >
          <UI.CircleIcon size="small" currency={currencyInfo} />
        </UI.TableColumn>
        <UI.TableColumn align="right">
          {utils.formatDouble(item.total_invested_amount, 6) + " " + currency}
        </UI.TableColumn>
        <UI.TableColumn align="right">
          {utils.formatDouble(item.total_profit, 6) || 0}
        </UI.TableColumn>
        <UI.TableColumn align="right">
          {item.hasOwnProperty("total_paid")
            ? utils.formatDouble(item.total_paid, 6) || 0
            : 0}
        </UI.TableColumn>
      </UI.TableCell>
    );
  });

  return (
    <UI.Table
      hidden={true}
      adaptive={adaptive}
      headings={headings}
      header={utils.getLang("global_for_all_time")}
    >
      {rows}
    </UI.Table>
  );
}
