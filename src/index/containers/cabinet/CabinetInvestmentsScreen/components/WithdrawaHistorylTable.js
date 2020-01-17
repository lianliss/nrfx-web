import React from 'react';
import UI from '../../../../../ui';

import * as utils from '../../../../../utils';
import EmptyContentBlock from '../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';

export default function WithdrawalTable({ withdrawals, withdrawalsTotalCount, adaptive }) {
  if (!withdrawals.items || !withdrawals.items.length) {
    return (
      <EmptyContentBlock
        icon={require('../../../../../asset/120/no_deposits.svg')}
        message={utils.getLang("cabinet_noWithdrawalHistory")}
      />
    )
  }

  let headings = [
    <UI.TableColumn>ID</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang("global_status")}</UI.TableColumn>,
    <UI.TableColumn align="right">{utils.getLang("global_amount")}</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang("cabinet_wallet")}</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang("global_date")}</UI.TableColumn>
  ];

  if (adaptive) {
    headings = [
      <UI.TableColumn sub={utils.getLang("cabinet_wallet")}>
        {utils.getLang("global_status")}
      </UI.TableColumn>,
      <UI.TableColumn sub={utils.getLang("global_date") + ' / ID'}>
        {utils.getLang("global_amount")}
      </UI.TableColumn>,
    ];
  }

  const rows = withdrawals.items.map((item, i) => {
    if (adaptive) {
      return (
        <UI.TableCell key={i}>
          <UI.TableColumn style={{width: "50%"}} sub={item.currency.toUpperCase()}>
            <span className={"Investment__withdrawal_table__status " + item.status}>
              {utils.getLang(`status_${item.status}`) || item.status}
            </span>
          </UI.TableColumn>
          <UI.TableColumn
            sub={utils.dateFormat(item.created_at) + ' / ' + utils.formatTableId(withdrawalsTotalCount - i)}
          >
            {utils.formatDouble(item.amount)} {item.currency.toUpperCase()}
          </UI.TableColumn>
        </UI.TableCell>
      )
    }
    return (
      <UI.TableCell key={i}>
        <UI.TableColumn>{utils.formatTableId(withdrawalsTotalCount - i)}</UI.TableColumn>
        <UI.TableColumn style={{width: "50%"}}>
          <span className={"Investment__withdrawal_table__status " + item.status}>{utils.getLang(`status_${item.status}`) || item.status}</span>
        </UI.TableColumn>
        <UI.TableColumn align="right">{utils.formatDouble(item.amount)}</UI.TableColumn>
        <UI.TableColumn>{item.currency.toUpperCase()}</UI.TableColumn>
        <UI.TableColumn>{utils.dateFormat(item.created_at)}</UI.TableColumn>
      </UI.TableCell>
    )
  });

  return (
    <UI.Table headings={headings} className="Investment__withdrawal_table" header={utils.getLang('cabinet_investmentsWithdrawalHistory')}>
      {rows}
    </UI.Table>
  )
}
