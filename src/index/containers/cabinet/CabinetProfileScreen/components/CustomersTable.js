import React from "react";
import * as UI from "../../../../../ui";

import * as utils from "../../../../../utils";
import EmptyContentBlock from "../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock";
import * as actions from "../../../../../actions";

export default function CustomersTable({ customers, adaptive }) {
  if (!customers.length) {
    return (
      <EmptyContentBlock
        adaptive={adaptive}
        icon={require("../../../../../asset/120/invite.svg")}
        message={utils.getLang("cabinet_partners_customersTableEmpty")}
      />
    );
  }

  let headings = [
    <UI.TableColumn>{utils.getLang("cabinet_customers")}</UI.TableColumn>,
    <UI.TableColumn>
      {utils.getLang("cabinet_partners_deposits")}
    </UI.TableColumn>,
    <UI.TableColumn align="right">
      {utils.getLang("cabinet_investmentsScreen_profit")}
    </UI.TableColumn>,
    <UI.TableColumn align="right" style={{ width: 100 }}>
      {utils.getLang("cabinet_wallets_historyTable_date")}
    </UI.TableColumn>
  ];

  if (adaptive) {
    headings = [
      <UI.TableColumn sub={utils.getLang("cabinet_partners_deposits")}>
        {utils.getLang("cabinet_customers")}
      </UI.TableColumn>,
      <UI.TableColumn
        sub={utils.getLang("cabinet_wallets_historyTable_date")}
        align="right"
      >
        {utils.getLang("cabinet_investmentsScreen_profit")}
      </UI.TableColumn>
    ];
  }

  let rows;
  if (adaptive) {
    rows = customers.map((item, i) => {
      return (
        <UI.TableCell
          key={i}
          onClick={() =>
            actions.openModal("partner_info", { login: item.user.login })
          }
        >
          <UI.TableColumn sub={item.deposits_count}>
            {item.user.login.toUpperCase()}
          </UI.TableColumn>
          <UI.TableColumn
            align="right"
            sub={utils.dateFormat(item.user.created_at, "DD MMM YYYY")}
          >
            ~{utils.formatDouble(item.profit, 2)} USD
          </UI.TableColumn>
        </UI.TableCell>
      );
    });
  } else {
    rows = customers.map((item, i) => {
      return (
        <UI.TableCell
          key={i}
          onClick={() =>
            actions.openModal("partner_info", { login: item.user.login })
          }
        >
          <UI.TableColumn>{item.user.login.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn>{item.deposits_count}</UI.TableColumn>
          <UI.TableColumn align="right">
            ~{utils.formatDouble(item.profit, 2)} USD
          </UI.TableColumn>
          <UI.TableColumn align="right" style={{ width: 100 }}>
            {utils.dateFormat(item.user.created_at, "DD MMM YYYY")}
          </UI.TableColumn>
        </UI.TableCell>
      );
    });
  }

  return <UI.Table headings={headings}>{rows}</UI.Table>;
}
