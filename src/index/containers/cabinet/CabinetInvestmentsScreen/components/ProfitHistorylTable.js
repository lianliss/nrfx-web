import React from 'react';
import moment from 'moment/min/moment-with-locales';
import UI from '../../../../../ui';

import * as utils from '../../../../../utils';
import EmptyContentBlock from '../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';
import SVG from "react-inlinesvg";

export default function WithdrawalTable({ profits, total, adaptive }) {
  if (!profits.items || !profits.items.length) {
    return (
      <EmptyContentBlock
        icon={require('../../../../../asset/120/no_deposits.svg')}
        message={utils.getLang("cabinet_noProfitHistory")}
      />
    )
  }

  let headings = [
    <UI.TableColumn align="center" highlighted style={{ width: 40 }}>
      {/*<SVG src={require('../../../../../asset/cabinet/filter.svg')} />*/}
    </UI.TableColumn>,
    <UI.TableColumn>ID</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang("rate")}</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang("global_type")}</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang("global_invested")}</UI.TableColumn>,
    <UI.TableColumn align="right">{utils.getLang("global_amount")}</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang("global_currency")}</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang("global_profitType")}</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang("global_date")}</UI.TableColumn>,
  ];

  if (adaptive) {
    headings = [
      <UI.TableColumn sub={utils.getLang("rate") + ' / ' + utils.getLang("global_type")}>
        {utils.getLang("global_invested")}
      </UI.TableColumn>,
      <UI.TableColumn align="right" sub={utils.getLang("global_date") + ' / ' + 'ID'}>
        {utils.getLang("cabinet_investmentsScreen_profit")}
      </UI.TableColumn>,
    ];
  }

  const rows = profits.items.map((item, i) => {
    if (adaptive) {
      return (
        <UI.TableCell key={i}>
          <UI.TableColumn
            sub={ item.deposit.percent + '% ' + item.plan.description + ' / ' + utils.ucfirst(item.deposit.type)}
          >
            {item.deposit.amount} {item.deposit.currency.toUpperCase()}
          </UI.TableColumn>
          <UI.TableColumn align="right" sub={utils.dateFormat(item.profit.date) + ' / ' + utils.formatTableId(total - i)}>
            {utils.formatDouble(item.profit.amount)} {item.deposit.currency.toUpperCase()}
          </UI.TableColumn>
        </UI.TableCell>
      )
    }
    return (
      <UI.TableCell key={i}>
        <UI.TableColumn />
        <UI.TableColumn>{utils.formatTableId(total - i)}</UI.TableColumn>
        <UI.TableColumn sub={item.plan.description}>{item.deposit.plan_percent}</UI.TableColumn>
        <UI.TableColumn>{utils.ucfirst(item.deposit.type)}</UI.TableColumn>
        <UI.TableColumn>{item.deposit.amount} {item.deposit.currency.toUpperCase()}</UI.TableColumn>
        <UI.TableColumn align="right">{utils.formatDouble(item.profit.amount)}</UI.TableColumn>
        <UI.TableColumn>{item.deposit.currency.toUpperCase()}</UI.TableColumn>
        <UI.TableColumn>{utils.getLang(`type_${item.profit.type}`)}</UI.TableColumn>
        <UI.TableColumn>{utils.dateFormat(item.profit.date)}</UI.TableColumn>
      </UI.TableCell>
    )
  });

  return (
    <div>
      <UI.Table headings={headings} className="Investment__profits_table" header={utils.getLang('cabinet_investmentsProfit')}>
        {rows}
      </UI.Table>
    </div>
  )
};