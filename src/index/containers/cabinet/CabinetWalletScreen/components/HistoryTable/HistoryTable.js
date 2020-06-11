import React from "react";
import * as UI from "../../../../../../ui";

import * as utils from "../../../../../../utils";
import EmptyContentBlock from "../../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock";
import { openModal } from "../../../../../../actions";

export default function HistoryTable({ history, adaptive, header, type }) {
  if (!history.length) {
    return (
      <EmptyContentBlock
        icon={require("../../../../../../asset/120/no_deposits.svg")}
        message={utils.getLang("no_transfers_history")}
      />
    );
  }

  let headings = [
    <UI.TableColumn align="center" highlighted style={{ width: 40 }}>
      {/*<SVG src={require('../../../../../../asset/cabinet/filter.svg')} />*/}
    </UI.TableColumn>,
    <UI.TableColumn>
      {utils.getLang("cabinet_wallets_historyTable_addressLogin")}
    </UI.TableColumn>,
    <UI.TableColumn align="right">
      {utils.getLang("cabinet_openNewDeposit_amount")}
    </UI.TableColumn>,
    <UI.TableColumn>
      {utils.getLang("cabinet_wallets_historyTable_wallet")}
    </UI.TableColumn>,
    <UI.TableColumn>
      {utils.getLang("cabinet_wallets_historyTable_type")}
    </UI.TableColumn>,
    <UI.TableColumn>
      {utils.getLang("cabinet_wallets_historyTable_date")}
    </UI.TableColumn>
  ];

  if (adaptive) {
    headings = [
      <UI.TableColumn
        sub={<div>{utils.getLang("cabinet_wallets_historyTable_type")}</div>}
      >
        <div>{utils.getLang("cabinet_wallets_historyTable_addressLogin")}</div>
      </UI.TableColumn>,
      <UI.TableColumn
        align="right"
        sub={<div>{utils.getLang("cabinet_wallets_historyTable_date")}</div>}
      >
        <div>{utils.getLang("cabinet_openNewDeposit_amount")}</div>
      </UI.TableColumn>
    ];
  }

  const rows = history.map((item, i) => {
    let status;

    status = item.type.includes("send")
      ? utils.getLang("cabinet_wallets_historyTable_sent")
      : utils.getLang("cabinet_wallets_historyTable_received");

    let address = item.address
      ? utils.clipTextMiddle(item.address)
      : utils.getLang("cabinet_wallets_historyTable_unknown");

    if (item.type === "transaction_receive") {
      address = (
        <span>
          {utils.getLang("cabinet_walletTransactionModal_my")}{" "}
          {item.currency.toUpperCase()} {utils.getLang("global_wallet")}
        </span>
      );
    }

    const createdAt = utils.dateFormat(item.created_at, null);

    if (adaptive) {
      return (
        <UI.TableCell
          key={i}
          onClick={() => openModal("transaction", { id: item.id, type })}
        >
          <UI.TableColumn>
            <div className="Wallets__history__address">
              <UI.WalletAddress
                isUser={item.type === "transfer"}
                address={address}
              />
            </div>
            <div
              className={utils.classNames(
                "Wallets__history__status",
                item.type
              )}
            >
              {status}
            </div>
          </UI.TableColumn>
          <UI.TableColumn align="right">
            <div>
              {utils.formatDouble(item.amount)} {item.currency.toUpperCase()}
            </div>
            <div className="Wallets__history__date">
              {utils.dateFormat(item.created_at)}
            </div>
          </UI.TableColumn>
        </UI.TableCell>
      );
    }

    return (
      <UI.TableCell
        key={i}
        onClick={() => openModal("transaction", { id: item.id, type })}
      >
        <UI.TableColumn align="center">
          <div
            className={utils.classNames({
              Wallets__history_indicator: true,
              [item.status]: true
            })}
          />
        </UI.TableColumn>
        <UI.TableColumn>
          <div className="Wallets__history__address">
            <UI.WalletAddress
              isUser={item.type.includes("transfer")}
              address={address}
            />
          </div>
        </UI.TableColumn>
        <UI.TableColumn align="right">
          {utils.formatDouble(item.amount)}
        </UI.TableColumn>
        <UI.TableColumn>{item.currency.toUpperCase()}</UI.TableColumn>
        <UI.TableColumn>
          <div
            className={utils.classNames("Wallets__history__status", item.type)}
          >
            {status}
          </div>
        </UI.TableColumn>
        <UI.TableColumn>
          <div className="Wallets__history__date">
            {createdAt.format("DD MMM YYYY")} <br />
            {createdAt.format("HH:mm")}
          </div>
        </UI.TableColumn>
      </UI.TableCell>
    );
  });

  return (
    <UI.Table headings={headings} header={header}>
      {rows}
    </UI.Table>
  );
}
