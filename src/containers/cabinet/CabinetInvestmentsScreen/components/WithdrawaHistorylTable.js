import React from 'react';
import moment from 'moment/min/moment-with-locales';
import UI from '../../../../ui';

import * as utils from '../../../../utils';
import EmptyContentBlock from '../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';
import * as modalGroupActions from "../../../../actions/modalGroup";
import SVG from "react-inlinesvg";

export default function WithdrawalTable({ withdrawals, withdrawalsTotalCount }) {
  if (!withdrawals.items || !withdrawals.items.length) {
    return (
      <EmptyContentBlock
        icon={require('../../../../asset/120/no_deposits.svg')}
        message="No Withdrawal History"
      />
    )
  }

  const headings = [
    <UI.TableColumn>ID</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang("global_status")}</UI.TableColumn>,
    <UI.TableColumn align="right">{utils.getLang("global_amount")}</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang("cabinet_wallet")}</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang("global_date")}</UI.TableColumn>
  ];

  const rows = withdrawals.items.map((item, i) => {
    return (
      <UI.TableCell key={i}>
        <UI.TableColumn>{utils.formatTableId(withdrawalsTotalCount - i)}</UI.TableColumn>
        <UI.TableColumn style={{width: "50%"}}>
          <span className={"Investment__withdrawal_table__status " + item.status}>{utils.getLang(`status_${item.status}`) || item.status}</span>
        </UI.TableColumn>
        <UI.TableColumn align="right">{utils.formatDouble(item.amount)}</UI.TableColumn>
        <UI.TableColumn>{item.currency.toUpperCase()}</UI.TableColumn>
        <UI.TableColumn>{moment(item.created_at).format('DD MMM YYYY HH:mm')}</UI.TableColumn>
      </UI.TableCell>
    )
  });

  return (
    <UI.Table headings={headings} className="Investment__withdrawal_table" header={utils.getLang('cabinet_investmentsWithdrawalHistory')}>
      {rows}
    </UI.Table>
  )
}
