import React from 'react';
import moment from 'moment/min/moment-with-locales';
import UI from '../../../../ui';

import * as utils from '../../../../utils';
import EmptyContentBlock from '../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';
import SVG from "react-inlinesvg";

export default function WithdrawalTable({ profits }) {
  if (!profits.items || !profits.items.length) {
    return (
      <EmptyContentBlock
        icon={require('../../../../asset/120/no_deposits.svg')}
        message="No Profit History"
      />
    )
  }

  const headings = [
    <UI.TableColumn align="center" highlighted style={{ width: 40 }}>
      <SVG src={require('../../../../asset/cabinet/filter.svg')} />
    </UI.TableColumn>,
    <UI.TableColumn>ID</UI.TableColumn>,
    <UI.TableColumn>Rate</UI.TableColumn>,
    <UI.TableColumn>Type</UI.TableColumn>,
    <UI.TableColumn>Invested</UI.TableColumn>,
    <UI.TableColumn align="right">Amount</UI.TableColumn>,
    <UI.TableColumn>Currency</UI.TableColumn>,
    <UI.TableColumn>Profit Type</UI.TableColumn>,
    <UI.TableColumn>Date</UI.TableColumn>,
  ];

  const rows = profits.items.map((item, i) => {
    return (
      <UI.TableCell key={i}>
        <UI.TableColumn />
        <UI.TableColumn>{utils.formatTableId(item.profit.id)}</UI.TableColumn>
        <UI.TableColumn sub="Standart">{item.plan.percent}</UI.TableColumn>
        <UI.TableColumn>{item.plan.description}</UI.TableColumn>
        <UI.TableColumn>{item.deposit.amount} {item.deposit.currency.toUpperCase()}</UI.TableColumn>
        <UI.TableColumn>{utils.formatDouble(item.profit.amount)}</UI.TableColumn>
        <UI.TableColumn>{item.deposit.currency.toUpperCase()}</UI.TableColumn>
        <UI.TableColumn>{item.profit.type}</UI.TableColumn>
        <UI.TableColumn>{moment(item.profit.date).format('DD MMM YYYY h:mm a')}</UI.TableColumn>
      </UI.TableCell>
    )
  });

  return (
    <div>
      <h2>Profit History</h2>
      <UI.Table headings={headings} className="Investment__profits_table">
        {rows}
      </UI.Table>
    </div>
  )
};