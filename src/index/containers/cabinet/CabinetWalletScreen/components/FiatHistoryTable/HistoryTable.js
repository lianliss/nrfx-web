import './FiatHistoryTable.less'

import React from 'react';
import UI from '../../../../../../ui';

import * as utils from '../../../../../../utils';
import EmptyContentBlock from '../../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';

export default function HistoryTable({ history, adaptive, header}) {

  if (!history.length) {
    return (
      <EmptyContentBlock
        icon={require('../../../../../../asset/120/no_deposits.svg')}
        message={utils.getLang('no_transfers_history')}
      />
    )
  }

  let headings = [
    <UI.TableColumn>Валюты</UI.TableColumn>,
    <UI.TableColumn>Тип</UI.TableColumn>,
    <UI.TableColumn align="right">Сумма (Цена)</UI.TableColumn>,
    <UI.TableColumn align="right">Дата</UI.TableColumn>,
  ];

  if (adaptive) {
    headings = [
      <UI.TableColumn></UI.TableColumn>
    ];
  }

  const rows = history.map((item, i) => {
    if (adaptive) {
      return (
        <UI.TableCell key={i}>
        </UI.TableCell>
      )
    }

    return (
      <UI.TableCell key={i}>
        <UI.TableColumn sub={item.secondary_currency}>{item.primary_currency}</UI.TableColumn>
        <UI.TableColumn><span className={utils.classNames('FiatHistoryTable__status', item.type)}>{item.type_label}</span></UI.TableColumn>
        <UI.TableColumn align="right" sub={item.price}><UI.NumberFormat number={item.primary_amount} currency={item.primary_currency} /></UI.TableColumn>
        <UI.TableColumn align="right">
          <div className="FiatHistoryTable__time">
            <div>{utils.dateFormat(item.created_at, 'HH:mm')}</div>
            <div>{utils.dateFormat(item.created_at, 'DD MMM YYYY')}</div>
          </div>
        </UI.TableColumn>
      </UI.TableCell>
    )
  });

  return (
    <UI.Table headings={headings} header={header}>
      {rows}
    </UI.Table>
  )
}