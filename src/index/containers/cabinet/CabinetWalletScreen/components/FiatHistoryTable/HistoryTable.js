import './FiatHistoryTable.less'

import React from 'react';
import UI from '../../../../../../ui';

import * as utils from '../../../../../../utils';
import EmptyContentBlock from '../../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';
import {getCurrencyInfo} from '../../../../../../actions';
import { openModal } from '../../../../../../actions';

export default function HistoryTable({ history, adaptive, header}) {

  if (!history.length) {
    return (
      <EmptyContentBlock
        icon={require('../../../../../../asset/120/no_deposits.svg')}
        message={utils.getLang('no_operations_history')}
      />
    )
  }

  let headings = [
    <UI.TableColumn>{utils.getLang('global_currency')}</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang('global_type')}</UI.TableColumn>,
    <UI.TableColumn align="right">{`${utils.getLang('global_amount')} (${utils.getLang('global_price')})`}</UI.TableColumn>,
    <UI.TableColumn align="right">{utils.getLang('global_date')}</UI.TableColumn>,
  ];

  if (adaptive) {
    headings = [
      <UI.TableColumn sub={utils.getLang('global_currency')}>{utils.getLang('global_type')}</UI.TableColumn>,
      <UI.TableColumn align="right" sub={utils.getLang('global_date')}>{utils.getLang('global_amount')}</UI.TableColumn>
    ];
  }

  const rows = history.map((item, i) => {
    if (adaptive) {

      return (
        <UI.TableCell onClick={() => openModal('fiat_operation', { operation: item })} key={i}>
          <UI.TableColumn sub={
            getCurrencyInfo(item.primary_currency).name + ' / ' +
            getCurrencyInfo(item.secondary_currency).name
          }>
            <span className={utils.classNames('FiatHistoryTable__status', item.type)}>{item.type_label}</span>
          </UI.TableColumn>
          <UI.TableColumn sub={utils.dateFormat(item.created_at, 'DD MMM YYYY')} align="right">
            <div className="FiatHistoryTable__amount">
              <UI.NumberFormat number={item.primary_amount} currency={item.primary_currency} />
              {" / "}
              <UI.NumberFormat number={item.secondary_amount} currency={item.secondary_currency} />
            </div>
          </UI.TableColumn>
        </UI.TableCell>
      )
    }

    return (
      <UI.TableCell key={i}>
        <UI.TableColumn sub={item.secondary_currency}>{item.primary_currency}</UI.TableColumn>
        <UI.TableColumn><span className={utils.classNames('FiatHistoryTable__status', item.type)}>{item.type_label}</span></UI.TableColumn>
        <UI.TableColumn align="right" sub={<UI.NumberFormat number={item.secondary_amount} currency={item.secondary_currency} />}>
          <UI.NumberFormat number={item.primary_amount} currency={item.primary_currency} />
        </UI.TableColumn>
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
